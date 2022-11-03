import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useBlockNumber } from '@web3modal/react'

export function useInvalidateOnBlock({
  enabled,
  queryKey,
}: {
  enabled?: boolean
  queryKey: QueryKey
}) {
  const queryClient = useQueryClient()
  useBlockNumber()
  if (enabled) {
    return queryClient.invalidateQueries(queryKey)
  }
}
