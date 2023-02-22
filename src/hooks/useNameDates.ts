import { useQuery } from 'wagmi'

import { labelhash } from '@ensdomains/ensjs/utils/labels'

import { useEns } from '@app/utils/EnsProvider'
import { checkETH2LDFromName } from '@app/utils/utils'

const query = `
  query getNameDates($id: String!) {
    registration(id: $id) {
      registrationDate
    }
  }
`

const useRegistrationDate = (name: string) => {
  const { ready, gqlInstance } = useEns()
  const is2LDEth = checkETH2LDFromName(name)
  const {
    data,
    isLoading,
    status,
    internal: { isFetchedAfterMount },
    isFetched,
    // don't remove this line, it updates the isCachedData state (for some reason) but isn't needed to verify it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching: _isFetching,
  } = useQuery(
    ['graph', 'getRegistrationDate', name],
    async () =>
      gqlInstance.client.request<{
        registration?: {
          registrationDate: string
        }
      }>(query, {
        id: labelhash(name.split('.')[0]),
      }),
    {
      enabled: ready && is2LDEth,
      select: (queryResult) => {
        if (!queryResult?.registration) return null
        return new Date(parseInt(queryResult.registration.registrationDate) * 1000)
      },
    },
  )

  return {
    data: is2LDEth ? data : null,
    isLoading,
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
  }
}

export default useRegistrationDate
