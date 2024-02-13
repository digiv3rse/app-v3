import { renderHook } from '@app/test-utils'

import { checkETH2LDFromName } from '@app/utils/utils'

import { useExpiryDetails } from './useExpiryDetails'

const mockUseNameType = jest.fn()
jest.mock('@app/hooks/useNameType', () => ({
  useNameType: () => mockUseNameType(),
}))

const mockUseBasicName = jest.fn()
jest.mock('@app/hooks/useBasicName', () => ({
  useBasicName: ({ enabled }: any) => {
    return enabled ? mockUseBasicName() : { isLoading: false }
  },
}))

const mockUseRegistrationData = jest.fn().mockReturnValue({
  data: {
    registrationDate: new Date(3255803954000),
    transactionHash: '0xhash',
  },
  isLoading: false,
})
jest.mock(
  '@app/hooks/useRegistrationData',
  () =>
    ({ name, enabled }: any) =>
      enabled && checkETH2LDFromName(name) ? mockUseRegistrationData() : { isLoading: false },
)

jest.mock('@app/hooks/chain/useChainName', () => ({
  useChainName: () => 'goerli',
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useExpiryDetails', () => {
  describe('eth 2lds', () => {
    ;['eth-unwrapped-2ld', 'eth-emancipated-2ld', 'eth-locked-2ld'].forEach((nameType) => {
      it(`should return expiry, grace-period and `, () => {
        mockUseNameType.mockReturnValue({
          data: nameType,
          isLoading: false,
        })
        const { result } = renderHook(() =>
          useExpiryDetails({
            name: 'test.eth',
            details: {
              expiryDate: new Date(3255803954000),
              isLoading: false,
            } as any,
          }),
        )

        expect(mockUseRegistrationData).toHaveBeenCalled()
        expect(mockUseBasicName).not.toHaveBeenCalled()
        expect(result.current.data).toEqual(
          expect.arrayContaining([expect.objectContaining({ type: 'expiry' })]),
        )
        expect(result.current.data).toEqual(
          expect.arrayContaining([expect.objectContaining({ type: 'grace-period' })]),
        )
        expect(result.current.data).toEqual(
          expect.arrayContaining([expect.objectContaining({ type: 'registration' })]),
        )
      })
    })
  })

  describe('pcc burned eth subnamess', () => {
    ;['eth-emancipated-subname', 'eth-locked-subname'].forEach((nameType) => {
      it(`should return expiry, grace-period and `, () => {
        mockUseNameType.mockReturnValue({
          data: nameType,
          isLoading: false,
        })
        mockUseBasicName.mockReturnValue({
          wrapperData: {
            expiry: { date: new Date(3255803954000) },
          },
          isLoading: false,
        })

        const { result } = renderHook(() =>
          useExpiryDetails({
            name: 'sub.test.eth',
            details: {
              wrapperData: {
                expiry: { date: new Date(3255803954000) },
              },
              isLoading: false,
            } as any,
          }),
        )

        expect(mockUseRegistrationData).not.toHaveBeenCalled()
        expect(mockUseBasicName).toHaveBeenCalled()
        expect(result.current.data).toEqual(
          expect.arrayContaining([expect.objectContaining({ type: 'expiry' })]),
        )
        expect(result.current.data).toEqual(
          expect.arrayContaining([expect.objectContaining({ type: 'parent-expiry' })]),
        )
      })
    })
  })

  describe('pcc not burned eth subnamess', () => {
    ;['eth-unwrapped-subname', 'eth-wrapped-subname', 'eth-pcc-expired-subname'].forEach(
      (nameType) => {
        it(`should return expiry, grace-period and `, () => {
          mockUseNameType.mockReturnValue({
            data: nameType,
            isLoading: false,
          })
          mockUseBasicName.mockReturnValue({
            expiryDate: new Date(3255803954000),
            isLoading: false,
          })

          const { result } = renderHook(() =>
            useExpiryDetails({
              name: 'sub.test.eth',
              details: {
                expiryDate: new Date(3255803954000),
                isLoading: false,
              } as any,
            }),
          )

          expect(mockUseRegistrationData).not.toHaveBeenCalled()
          expect(mockUseBasicName).toHaveBeenCalled()
          expect(result.current.data).toEqual(
            expect.arrayContaining([expect.objectContaining({ type: 'parent-grace-period' })]),
          )
          expect(result.current.data).toEqual(
            expect.arrayContaining([expect.objectContaining({ type: 'parent-expiry' })]),
          )
        })
      },
    )
  })
})
