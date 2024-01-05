import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { P, match } from 'ts-pattern'

import { InnerDialog } from '@app/components/@atoms/InnerDialog'
import { useAbilities } from '@app/hooks/abilities/useAbilities'
import useRoles, { Role, RoleRecord } from '@app/hooks/ownership/useRoles/useRoles'
import { getAvailableRoles } from '@app/hooks/ownership/useRoles/utils/getAvailableRoles'
import { useAccountSafely } from '@app/hooks/useAccountSafely'
import { useBasicName } from '@app/hooks/useBasicName'
import { makeTransactionItem } from '@app/transaction-flow/transaction'
import { TransactionDialogPassthrough } from '@app/transaction-flow/types'

import { EditRoleView } from './views/EditRoleView/EditRoleView'
import { MainView } from './views/MainView/MainView'

const StyledInnerDialog = styled(InnerDialog)(
  ({ theme }) => css`
    flex: 1;
    min-height: ${theme.space[72]};
  `,
)

export type EditRolesForm = {
  roles: RoleRecord[]
}

type Data = {
  name: string
}

export type Props = {
  data: Data
} & TransactionDialogPassthrough

const EditRoles = ({ data: { name }, dispatch, onDismiss }: Props) => {
  const ref = useRef<HTMLFormElement>(null)
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null)

  const roles = useRoles(name)
  const abilities = useAbilities(name)
  const basic = useBasicName(name)
  const account = useAccountSafely()
  const isLoading = roles.isLoading || abilities.isLoading || basic.isLoading

  const form = useForm<EditRolesForm>({
    defaultValues: {
      roles: [],
    },
  })

  // Set form data when data is loaded and prevent reload on modal refresh
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    if (roles.data && abilities.data && !isLoading && !isLoaded) {
      const availableRoles = getAvailableRoles({
        roles: roles.data,
        abilities: abilities.data,
      })
      form.reset({ roles: availableRoles })
      setIsLoaded(true)
    }
  }, [isLoading, roles.data, abilities.data, form, isLoaded])

  const onSubmit = () => {
    const dirtyValues = form
      .getValues('roles')
      .filter((_, i) => {
        return form.getFieldState(`roles.${i}.address`)?.isDirty
      })
      .reduce<{ [key in Role]?: string }>((acc, { role, address }) => {
        return {
          ...acc,
          [role]: address,
        }
      }, {})

    const isOwnerOrManager = [basic.ownerData?.owner, basic.ownerData?.registrant].includes(
      account.address,
    )
    const transactions = [
      dirtyValues['eth-record']
        ? makeTransactionItem('updateEthAddress', { name, address: dirtyValues['eth-record'] })
        : null,
      dirtyValues.manager && !!abilities.data?.sendNameFunctionCallDetails?.sendManager?.contract
        ? makeTransactionItem(isOwnerOrManager ? 'transferName' : 'transferSubname', {
            name,
            newOwner: dirtyValues.manager,
            contract: abilities.data?.sendNameFunctionCallDetails?.sendManager?.contract,
            sendType: 'sendManager',
            reclaim: abilities.data?.sendNameFunctionCallDetails?.sendManager?.method === 'reclaim',
          })
        : null,
      dirtyValues.owner && !!abilities.data?.sendNameFunctionCallDetails?.sendOwner?.contract
        ? makeTransactionItem('transferName', {
            name,
            newOwner: dirtyValues.owner,
            contract: abilities.data?.sendNameFunctionCallDetails?.sendOwner?.contract,
            sendType: 'sendOwner',
          })
        : null,
      dirtyValues['parent-owner'] &&
      abilities.data?.sendNameFunctionCallDetails?.sendOwner?.contract
        ? makeTransactionItem(isOwnerOrManager ? 'transferName' : 'transferSubname', {
            name,
            newOwner: dirtyValues['parent-owner'],
            contract: abilities.data?.sendNameFunctionCallDetails?.sendOwner?.contract,
            sendType: 'sendOwner',
          })
        : null,
    ].filter((t) => !!t)

    dispatch({
      name: 'setTransactions',
      payload: transactions,
    })

    dispatch({
      name: 'setFlowStage',
      payload: 'transaction',
    })
  }

  return (
    <FormProvider {...form}>
      <StyledInnerDialog as="form" ref={ref} onSubmit={form.handleSubmit(onSubmit)}>
        {match(selectedRoleIndex)
          .with(P.number, (index) => (
            <EditRoleView
              index={index}
              onBack={() => {
                form.trigger()
                setSelectedRoleIndex(null)
              }}
            />
          ))
          .otherwise(() => (
            <MainView
              onSelectIndex={(index) => setSelectedRoleIndex(index)}
              onCancel={onDismiss}
              onSave={() => {
                ref.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
              }}
            />
          ))}
      </StyledInnerDialog>
    </FormProvider>
  )
}

export default EditRoles
