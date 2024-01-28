import { encodeFunctionData, } from 'viem';
import { ethRegistrarControllerRegisterSnippet } from '../../contracts/ethRegistrarController.js';
import { getChainContractAddress } from '../../contracts/getChainContractAddress.js';
import { UnsupportedNameTypeError } from '../../errors/general.js';
import { getNameType } from '../../utils/getNameType.js';
import { makeRegistrationTuple, } from '../../utils/registerHelpers.js';
import { wrappedLabelLengthCheck } from '../../utils/wrapper.js';
export const makeFunctionData = (wallet, { value, ...args }) => {
    const nameType = getNameType(args.name);
    if (nameType !== 'eth-2ld')
        throw new UnsupportedNameTypeError({
            nameType,
            supportedNameTypes: ['eth-2ld'],
            details: 'Only 2ld-eth name registration is supported',
        });
    const labels = args.name.split('.');
    wrappedLabelLengthCheck(labels[0]);
    return {
        to: getChainContractAddress({
            client: wallet,
            contract: 'ensEthRegistrarController',
        }),
        data: encodeFunctionData({
            abi: ethRegistrarControllerRegisterSnippet,
            functionName: 'register',
            args: makeRegistrationTuple(args),
        }),
        value,
    };
};
/**
 * Registers a name on ENS
 * @param wallet - {@link WalletWithEns}
 * @param parameters - {@link RegisterNameParameters}
 * @returns Transaction hash. {@link RegisterNameReturnType}
 *
 * @example
 * import { createPublicClient, createWalletClient, http, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { addEnsContracts } from '@ensdomains/ensjs'
 * import { getPrice } from '@ensdomains/ensjs/public'
 * import { randomSecret } from '@ensdomains/ensjs/utils'
 * import { commitName, registerName } from '@ensdomains/ensjs/wallet'
 *
 * const mainnetWithEns = addEnsContracts(mainnet)
 * const client = createPublicClient({
 *   chain: mainnetWithEns,
 *   transport: http(),
 * })
 * const wallet = createWalletClient({
 *   chain: mainnetWithEns,
 *   transport: custom(window.ethereum),
 * })
 * const secret = randomSecret()
 * const params = {
 *   name: 'example.eth',
 *   owner: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
 *   duration: 31536000, // 1 year
 *   secret,
 * }
 *
 * const commitmentHash = await commitName(wallet, params)
 * await client.waitForTransactionReceipt({ hash: commitmentHash }) // wait for commitment to finalise
 * await new Promise((resolve) => setTimeout(resolve, 60 * 1_000)) // wait for commitment to be valid
 *
 * const { base, premium } = await getPrice(client, { nameOrNames: params.name, duration: params.duration })
 * const value = (base + premium) * 110n / 100n // add 10% to the price for buffer
 * const hash = await registerName(wallet, { ...params, value })
 * // 0x...
 */
async function registerName(wallet, { name, owner, duration, secret, resolverAddress, records, reverseRecord, fuses, value, ...txArgs }) {
    const data = makeFunctionData(wallet, {
        name,
        owner,
        duration,
        secret,
        resolverAddress,
        records,
        reverseRecord,
        fuses,
        value,
    });
    const writeArgs = {
        ...data,
        ...txArgs,
    };
    return wallet.sendTransaction(writeArgs);
}
registerName.makeFunctionData = makeFunctionData;
export default registerName;
//# sourceMappingURL=registerName.js.map