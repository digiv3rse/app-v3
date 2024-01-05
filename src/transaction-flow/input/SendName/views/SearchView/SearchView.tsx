import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { P, match } from 'ts-pattern'

import { Button, Dialog, Input, MagnifyingGlassSimpleSVG, mq } from '@ensdomains/thorin'

import { useSimpleSearch } from '@app/transaction-flow/input/EditRoles/hooks/useSimpleSearch'

import type { SendNameForm } from '../../SendName-flow'
import { SearchViewErrorView } from './views/SearchViewErrorView'
import { SearchViewIntroView } from './views/SearchViewIntroView'
import { SearchViewLoadingView } from './views/SearchViewLoadingView'
import { SearchViewNoResultsView } from './views/SearchViewNoResultsView'
import { SearchViewResultsView } from './views/SearchViewResultsView'

const Content = styled.div(({ theme }) => [
  css`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  mq.sm.min(css`
    margin: 0 -${theme.space['6']};
  `),
])

const SubviewContainer = styled.div(({ theme }) => [
  css`
    flex: 1;
    width: calc(100% + 2 * ${theme.space['4']});
    margin: 0 -${theme.space['4']};
    min-height: ${theme.space['40']};
  `,
  mq.sm.min(css`
    width: calc(100% + 2 * ${theme.space['6']});
    margin: 0 -${theme.space['6']};
  `),
])

const FooterWrapper = styled.div(({ theme }) => [
  css`
    width: calc(100% + 2 * ${theme.space['4']});
    margin: 0 -${theme.space['4']};
    padding: ${theme.space[4]} ${theme.space['4']} 0;
    border-top: 1px solid ${theme.colors.border};
  `,
  mq.sm.min(css`
    width: calc(100% + 2 * ${theme.space['6']});
    margin: 0 -${theme.space['6']};
  `),
])

type Props = {
  name: string
  senderRole?: 'owner' | 'manager' | null
  onSelect: (address: string) => void
  onCancel: () => void
}

export const SearchView = ({ name, senderRole, onCancel, onSelect }: Props) => {
  const { t } = useTranslation('transactionFlow')
  const { register, watch, setValue } = useFormContext<SendNameForm>()
  const query = watch('query')
  const search = useSimpleSearch()

  // Set search results when coming back from summary view
  useEffect(() => {
    if (query.length > 2) search.mutate(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Dialog.Heading title="Send Name" />
      <Content>
        <Input
          data-testid="send-name-search-input"
          label="Name"
          size="medium"
          hideLabel
          icon={<MagnifyingGlassSimpleSVG />}
          clearable
          {...register('query', {
            onChange: (e) => {
              const newQuery = e.currentTarget.value
              if (newQuery.length < 3) return
              search.mutate(newQuery)
            },
          })}
          placeholder={t('input.sendName.views.search.placeholder')}
          onClickAction={() => {
            setValue('query', '')
          }}
        />
        <SubviewContainer>
          {match([query, search])
            .with([P._, { isError: true }], () => <SearchViewErrorView />)
            .with([P.when((s) => s.length < 3), P._], () => <SearchViewIntroView />)
            .with([P._, { isSuccess: false }], () => <SearchViewLoadingView />)
            .with(
              [P._, { isSuccess: true, data: P.when((d) => !!d && d.length > 0) }],
              ([, { data }]) => (
                <SearchViewResultsView
                  name={name}
                  results={data}
                  senderRole={senderRole}
                  onSelect={onSelect}
                />
              ),
            )
            .with([P._, { isSuccess: true, data: P.when((d) => !d || d.length === 0) }], () => (
              <SearchViewNoResultsView />
            ))
            .otherwise(() => null)}
        </SubviewContainer>
        <FooterWrapper>
          <Dialog.Footer
            trailing={
              <Button colorStyle="accentSecondary" onClick={onCancel}>
                {t('action.cancel', { ns: 'common' })}
              </Button>
            }
          />
        </FooterWrapper>
      </Content>
    </>
  )
}
