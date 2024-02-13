import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { labelhash } from 'viem'

import { useAccountSafely } from '@app/hooks/account/useAccountSafely'
import { useChainId } from '@app/hooks/chain/useChainId'
import { useQueryKeyFactory } from '@app/hooks/useQueryKeyFactory'
import useRegistrationReducer from '@app/hooks/useRegistrationReducer'
import { MOONPAY_WORKER_URL } from '@app/utils/constants'
import { getLabelFromName } from '@app/utils/utils'

import { MoonpayTransactionStatus, SelectedItemProperties } from './types'

export const useMoonpayRegistration = (
  dispatch: ReturnType<typeof useRegistrationReducer>['dispatch'],
  normalisedName: string,
  selected: SelectedItemProperties,
  item: ReturnType<typeof useRegistrationReducer>['item'],
) => {
  const chainId = useChainId()
  const { address } = useAccountSafely()
  const [hasMoonpayModal, setHasMoonpayModal] = useState(false)
  const [moonpayUrl, setMoonpayUrl] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const currentExternalTransactionId = item.externalTransactionId

  const initiateMoonpayRegistrationMutation = useMutation({
    mutationFn: async (duration: number = 1) => {
      const label = getLabelFromName(normalisedName)
      const tokenId = labelhash(label)

      const requestUrl = `${MOONPAY_WORKER_URL[chainId]}/signedurl?tokenId=${tokenId}&name=${normalisedName}&duration=${duration}&walletAddress=${address}`
      const response = await fetch(requestUrl)
      const textResponse = await response.text()
      setMoonpayUrl(textResponse)

      const params = new URLSearchParams(textResponse)
      const externalTransactionId = params.get('externalTransactionId') || ''

      dispatch({
        name: 'setExternalTransactionId',
        externalTransactionId,
        selected,
      })
      setHasMoonpayModal(true)
    },
  })

  const queryKey = useQueryKeyFactory({
    params: { externalTransactionId: currentExternalTransactionId },
    functionName: 'getMoonpayStatus',
    queryDependencyType: 'standard',
  })

  // Monitor current transaction
  const { data: transactionData } = useQuery({
    queryKey,
    queryFn: async ({ queryKey: [{ externalTransactionId }] }) => {
      const response = await fetch(
        `${MOONPAY_WORKER_URL[chainId]}/transactionInfo?externalTransactionId=${externalTransactionId}`,
      )
      const jsonResult = (await response.json()) as Array<{ status: MoonpayTransactionStatus }>
      const result = jsonResult?.[0]

      if (result?.status === 'completed' && !isCompleted) {
        setIsCompleted(true)
        setHasMoonpayModal(false)
        dispatch({
          name: 'moonpayTransactionCompleted',
          selected,
        })
      }

      return result || {}
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
    enabled: !!currentExternalTransactionId && !isCompleted,
  })

  return {
    moonpayUrl,
    initiateMoonpayRegistrationMutation,
    hasMoonpayModal,
    setHasMoonpayModal,
    currentExternalTransactionId,
    moonpayTransactionStatus: transactionData?.status as MoonpayTransactionStatus,
  }
}
