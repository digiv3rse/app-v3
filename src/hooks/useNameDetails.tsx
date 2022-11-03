import { useQuery } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useEns } from '@app/utils/EnsProvider'

import { useBasicName } from './useBasicName'
import { useProfile } from './useProfile'

export const useNameDetails = (name: string) => {
  const { t } = useTranslation('profile')
  const { ready, getDNSOwner } = useEns()

  const {
    valid,
    normalisedName,
    isLoading: basicLoading,
    isCachedData: basicIsCachedData,
    registrationStatus,
    ...basicName
  } = useBasicName(name)

  const {
    profile,
    loading: profileLoading,
    status,
    isCachedData: profileIsCachedData,
  } = useProfile(normalisedName, !normalisedName)

  const {
    data: dnsOwner,
    status: dnsOwnerStatus,
    isFetched: dnsOwnerIsFetched,
  } = useQuery(['getDNSOwner', normalisedName], () => getDNSOwner(normalisedName), {
    enabled: !!(normalisedName && valid) && !normalisedName?.endsWith('.eth'),
  })
  const dnsOwnerIsCachedData = dnsOwnerStatus === 'success' && dnsOwnerIsFetched

  const error: string | ReactNode | null = useMemo(() => {
    if (valid === false) {
      return t('errors.invalidName')
    }
    if (profile && !profile.isMigrated && typeof profile.isMigrated === 'boolean') {
      return (
        <>
          {t('errors.migrationNotAvailable')}
          <a href={`https://app.ens.domains/name/${normalisedName}`}>
            {t('errors.migrationNotAvailableLink')}
          </a>
        </>
      )
    }
    if (profile && profile.message) {
      return profile.message
    }
    if (registrationStatus === 'available' || registrationStatus === 'premium') {
      return (
        <>
          {t('errors.featureNotAvailable')}
          <a href={`https://app.ens.domains/name/${normalisedName}`}>
            {t('errors.featureNotAvailableLink')}
          </a>
        </>
      )
    }
    if (registrationStatus === 'invalid') {
      return t('errors.invalidName')
    }
    if (registrationStatus === 'gracePeriod') {
      return t('errors.expiringSoon')
    }
    if (!profile && !profileLoading && ready && status !== 'loading') {
      return t('errors.unknown')
    }
    return null
  }, [normalisedName, profile, profileLoading, ready, registrationStatus, status, t, valid])

  const isLoading = !ready || profileLoading || basicLoading

  return {
    error,
    normalisedName,
    valid,
    profile,
    isLoading,
    dnsOwner,
    basicIsCachedData: basicIsCachedData || dnsOwnerIsCachedData,
    profileIsCachedData,
    registrationStatus,
    ...basicName,
  }
}
