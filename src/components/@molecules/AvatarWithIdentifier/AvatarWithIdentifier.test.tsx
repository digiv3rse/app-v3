import { render, screen} from '@app/test-utils'

import { AvatarWithIdentifier } from './AvatarWithIdentifier'

const mockUsePrimary = jest.fn().mockImplementation((address) => {
  return ({
  data: address === '0xaddressWithoutAPrimaryName' ? undefined : { beautifiedName: 'test.eth', name: 'test.eth' },
  isLoading: false
})})
jest.mock('@app/hooks/usePrimary', () => ({
  usePrimary: (address: unknown, skip: boolean) => skip ? {isLoading: false} : mockUsePrimary(address)
}))

jest.mock('@app/components/AvatarWithZorb', () => ({
  AvatarWithZorb: () => <div>ZORB</div>
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('AvatarWithIdentifier', () => {
  it('should render', async () => {
    render(<AvatarWithIdentifier address="0x1234" />)
  })

  it('should render name and address', async () => {
    render(<AvatarWithIdentifier address="0x1234" />)
    expect(screen.getByText('test.eth')).toBeVisible()
    expect(screen.getByText('0x1234')).toBeVisible()
  })

  it('should overwrite subtitle if prop is provided', async () => {
    render(<AvatarWithIdentifier address="0x1234" subtitle='subtitle'/>)
    expect(screen.getByText('test.eth')).toBeVisible()
    expect(screen.getByText('subtitle')).toBeVisible()
    expect(screen.queryByText('0x1234')).toEqual(null)
  })

  it('should display shortened address as title if address does not have primary name', async () => {
    render(<AvatarWithIdentifier address="0xaddressWithoutAPrimaryName"/>)
    expect(screen.getByTestId('avatar-label-title')).toHaveTextContent('0xadd...yName')
  })

  it('should display full address as title if address does not have primary name and shortenAddressAsTitle is false', async () => {
    render(<AvatarWithIdentifier address="0xaddressWithoutAPrimaryName" shortenAddressAsTitle={false}/>)
    expect(screen.getByTestId('avatar-label-title')).toHaveTextContent('0xaddressWithoutAPrimaryName')
  })

  it('should display subtitle and address as title if address does not have primary name and subtitle is provided', async () => {
    render(<AvatarWithIdentifier address="0xaddressWithoutAPrimaryName" subtitle='subtitle'/>)
    expect(screen.getByTestId('avatar-label-title')).toHaveTextContent('0xadd...yName')
    expect(screen.getByText('subtitle')).toBeVisible()
  })

  it('should not call usePrimary if name is provided', async () => {
    render(<AvatarWithIdentifier address="0x1234" name="name.eth" />)
    expect(mockUsePrimary).not.toHaveBeenCalled()
    expect(screen.getByText('name.eth')).toBeVisible()
  })
})