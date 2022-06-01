import DownDirectionSVG from '@app/assets/DownDirection.svg'
import GridSVG from '@app/assets/Grid.svg'
import ListSVG from '@app/assets/List.svg'
import UpDirectionSVG from '@app/assets/UpDirection.svg'
import { NameGridView } from '@app/components/names/NameGridView'
import { NameListView } from '@app/components/names/NameListView'
import { TabWrapper } from '@app/components/profile/TabWrapper'
import { useNamesFromAddress } from '@app/hooks/useNamesFromAddress'
import { useProtectedRoute } from '@app/hooks/useProtectedRoute'
import { Basic } from '@app/layouts/Basic'
import mq from '@app/mediaQuery'
import {
  Button,
  Heading,
  PageButtons,
  Select,
  Typography,
} from '@ensdomains/thorin'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { useAccount, useNetwork } from 'wagmi'

const EmptyDetailContainer = styled.div`
  padding: ${({ theme }) => theme.space['4']};
  display: flex;
  justify-content: center;
  align-items: center;
`
const PageButtonsContainer = styled.div`
  ${({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: ${theme.space['2']} ${theme.space['4']};
  `}
`

const TabWrapperWithButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: flex-start;
  width: 100%;
  ${({ theme }) => css`
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
  `}
`

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  ${({ theme }) => css`
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
    ${mq.md.min`
      gap: ${theme.space['8']};
      flex-gap: ${theme.space['8']};
    `}
  `}
`

const ViewButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
  `}
`

const SelectWrapper = styled.div`
  ${({ theme }) => css`
    width: ${theme.space['32']};
    & [role='listbox'] {
      background: ${theme.colors.background};
      z-index: 5;
    }
    ${mq.md.min`
      width: ${theme.space['48']};
    `}
  `}
`

const FilterDropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${({ theme }) => `
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `
    width: 100%;
    max-width: ${theme.space['320']};
    margin: 0 auto;
    gap: ${theme.space['4']};
    flex-gap: ${theme.space['4']};
  `}
`

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  ${({ theme }) => `
    gap: ${theme.space['4']};
    flex-gap: ${theme.space['4']};
  `}
  ${mq.md.min`
    flex-direction: row;
  `}
`

const SortAndDirections = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  ${({ theme }) => `
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
  `}
`

type SortType = 'expiryDate' | 'labelName' | 'creationDate'
type SortDirection = 'asc' | 'desc'
type ViewType = 'grid' | 'list'
type FilterType = 'domain' | 'registration' | 'none'

const NamesPage: NextPage = () => {
  const { t } = useTranslation('names')
  const router = useRouter()
  const { data: addressData, isLoading, status } = useAccount()
  const address = (router.query.address as string) || addressData?.address
  const isSelf = address === addressData?.address
  const { activeChain: chain } = useNetwork()

  const [viewType, setViewType] = useState<ViewType>('list')
  const [sortType, setSortType] = useState<SortType>('expiryDate')
  const [orderDirection, setOrderDirection] = useState<SortDirection>('desc')
  const [filter] = useState<FilterType>('none')
  const [page, setPage] = useState(1)

  const {
    currentPage,
    isLoading: namesLoading,
    status: namesStatus,
    pageLength,
  } = useNamesFromAddress({
    address,
    sort: {
      type: sortType,
      orderDirection,
    },
    page,
    resultsPerPage: 10,
    filter: filter === 'none' ? undefined : filter,
  })

  const loading =
    isLoading ||
    status === 'loading' ||
    namesLoading ||
    namesStatus === 'loading'

  useProtectedRoute('/', loading ? true : address && address !== '')

  return (
    <Basic title="Names -" loading={loading}>
      <Container>
        <TopContainer>
          <SectionHeader>
            <Heading>{t('title')}</Heading>
            <Typography>
              {`${t('subtitle.start')} ${
                isSelf ? t('subtitle.your') : t('subtitle.this')
              } ${t('subtitle.wallet')}`}
            </Typography>
          </SectionHeader>
          <FilterContainer>
            <SortAndDirections>
              <FilterDropdownContainer>
                <SelectWrapper>
                  <Select
                    value={sortType}
                    size="small"
                    label="Sort by"
                    onChange={(e) =>
                      e?.currentTarget?.value &&
                      setSortType(e.currentTarget.value as SortType)
                    }
                    options={[
                      { label: t('sortTypes.expiryDate'), value: 'expiryDate' },
                      {
                        label: t('sortTypes.creationDate'),
                        value: 'creationDate',
                      },
                      { label: t('sortTypes.labelName'), value: 'labelName' },
                    ]}
                  />
                </SelectWrapper>
              </FilterDropdownContainer>
              <Button
                pressed={orderDirection === 'desc'}
                onClick={() => setOrderDirection('desc')}
                variant="transparent"
                shadowless
                size="extraSmall"
              >
                <div style={{ height: '24px' }}>
                  <DownDirectionSVG width="24" height="24" />
                </div>
              </Button>
              <Button
                pressed={orderDirection === 'asc'}
                onClick={() => setOrderDirection('asc')}
                variant="transparent"
                shadowless
                size="extraSmall"
              >
                <div style={{ height: '24px' }}>
                  <UpDirectionSVG width="24" height="24" />
                </div>
              </Button>
            </SortAndDirections>
            <ViewButtons>
              <Button
                pressed={viewType === 'grid'}
                onClick={() => setViewType('grid')}
                variant="transparent"
                shadowless
                size="extraSmall"
              >
                <div style={{ height: '24px' }}>
                  <GridSVG width="24" height="24" />
                </div>
              </Button>
              <Button
                pressed={viewType === 'list'}
                onClick={() => setViewType('list')}
                variant="transparent"
                shadowless
                size="extraSmall"
              >
                <div style={{ height: '24px' }}>
                  <ListSVG width="24" height="24" />
                </div>
              </Button>
            </ViewButtons>
          </FilterContainer>
        </TopContainer>
        <TabWrapperWithButtons>
          {currentPage &&
            pageLength > 0 &&
            (viewType === 'list' ? (
              <NameListView currentPage={currentPage} network={chain?.name!} />
            ) : (
              <NameGridView currentPage={currentPage} network={chain?.name!} />
            ))}
          {pageLength < 1 && (!currentPage || currentPage.length === 0) && (
            <TabWrapper>
              <EmptyDetailContainer>{t('names.empty')}</EmptyDetailContainer>
            </TabWrapper>
          )}
          {pageLength > 0 && (
            <PageButtonsContainer>
              <PageButtons
                current={page}
                onChange={(value) => setPage(value)}
                total={pageLength}
                max={5}
                alwaysShowFirst
                alwaysShowLast
              />
            </PageButtonsContainer>
          )}
        </TabWrapperWithButtons>
      </Container>
    </Basic>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  }
}

export default NamesPage
