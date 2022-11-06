/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-await-in-loop */
import { namehash } from 'ethers/lib/utils'
import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { PublicResolver__factory } from '@ensdomains/ensjs/generated/factories/PublicResolver__factory'
import { RecordOptions } from '@ensdomains/ensjs/utils/recordHelpers'
import {
  RegistrationParams,
  makeCommitment as generateCommitment,
  makeRegistrationData,
} from '@ensdomains/ensjs/utils/registerHelpers'

import { nonceManager } from './.utils/nonceManager'

type Name = {
  name: string
  namedOwner: string
  reverseRecord?: boolean
  records?: RecordOptions
  fuses?: {
    cannotUnwrap: true
    cannotBurnFuses?: boolean
    cannotTransfer?: boolean
    cannotSetResolver?: boolean
    cannotSetTtl?: boolean
    cannotCreateSubdomain?: boolean
    parentCannotControl?: boolean
  }
  customDuration?: number
  subnames?: {
    label: string
    namedOwner: string
  }[]
}

type ProcessedSubname = {
  label: string
  owner: string
  expiry: number
  fuses: number
}

const names: Name[] = [
  {
    name: 'wrapped.eth',
    namedOwner: 'owner',
    subnames: [{ label: 'sub', namedOwner: 'deployer' }],
  },
]

type ProcessedNameData = RegistrationParams & {
  label: string
  subnames: ProcessedSubname[]
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, network } = hre
  const allNamedAccts = await getNamedAccounts()

  const controller = await ethers.getContract('ETHRegistrarController')
  const publicResolver = await ethers.getContract('PublicResolver')
  const nameWrapper = await ethers.getContract('NameWrapper')

  const makeData = ({ namedOwner, customDuration, fuses, name, subnames, ...rest }: Name) => {
    const resolver = PublicResolver__factory.connect(publicResolver.address, ethers.provider)
    const secret = '0x0000000000000000000000000000000000000000000000000000000000000000'
    const duration = customDuration || 31536000
    // 1659467455 is the approximate time of the transaction, this is for keeping block hashes the same
    const wrapperExpiry = 1659467455 + duration
    const owner = allNamedAccts[namedOwner]

    const processedSubnames: ProcessedSubname[] =
      subnames?.map(({ label, namedOwner: subNamedOwner }) => ({
        label,
        owner: allNamedAccts[subNamedOwner],
        expiry: wrapperExpiry,
        fuses: 0,
      })) || []

    return {
      resolver,
      secret,
      duration,
      wrapperExpiry,
      owner,
      name,
      label: name.split('.')[0],
      subnames: processedSubnames,
      ...rest,
    }
  }

  const makeCommitment =
    (nonce: number) =>
    async ({ owner, name, ...rest }: ProcessedNameData, index: number) => {
      const { commitment } = generateCommitment({ owner, name, ...rest })

      const _controller = controller.connect(await ethers.getSigner(owner))
      const commitTx = await _controller.commit(commitment, { nonce: nonce + index })
      console.log(`Commiting commitment for ${name} (tx: ${commitTx.hash})...`)
      return 1
    }

  const makeRegistration =
    (nonce: number) =>
    async ({ owner, name, duration, label, ...rest }: ProcessedNameData, index: number) => {
      const [price] = await controller.rentPrice(label, duration)

      const _controller = controller.connect(await ethers.getSigner(owner))

      const registerTx = await _controller.register(
        ...makeRegistrationData({ owner, name, duration, ...rest }),
        {
          value: price,
          nonce: nonce + index,
        },
      )
      console.log(`Registering name ${name} (tx: ${registerTx.hash})...`)

      return 1
    }

  const makeSubname =
    (nonce: number) =>
    async ({ name, subnames, owner }: ProcessedNameData, index: number) => {
      for (let i = 0; i < subnames.length; i += 1) {
        const { label, owner: subOwner, fuses, expiry } = subnames[i]
        const _nameWrapper = nameWrapper.connect(await ethers.getSigner(owner))
        const subnameTx = await _nameWrapper.setSubnodeOwner(
          namehash(name),
          label,
          subOwner,
          fuses,
          expiry,
          {
            nonce: nonce + index + i,
          },
        )
        console.log(`Creating subname ${label}.${name} (tx: ${subnameTx.hash})...`)
      }
      return subnames.length
    }

  const allNameData = names.map(makeData)

  const getNonceAndApply = nonceManager(ethers, allNamedAccts, allNameData)

  await network.provider.send('evm_setAutomine', [false])
  await getNonceAndApply('owner', makeCommitment)
  await network.provider.send('evm_mine')
  const oldTimestamp = (await ethers.provider.getBlock('latest')).timestamp
  await network.provider.send('evm_setNextBlockTimestamp', [oldTimestamp + 60])
  await network.provider.send('evm_mine')
  await getNonceAndApply('owner', makeRegistration)
  await network.provider.send('evm_mine')
  await getNonceAndApply('owner', makeSubname)
  await network.provider.send('evm_mine')

  await network.provider.send('evm_setAutomine', [true])
  await network.provider.send('anvil_setBlockTimestampInterval', [1])
  await network.provider.send('evm_mine')

  return true
}

func.id = 'register-wrapped-names'
func.tags = ['register-wrapped-names']
func.dependencies = ['ETHRegistrarController']
func.runAtTheEnd = true

export default func
