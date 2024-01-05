import { P, match } from 'ts-pattern'

import type { NameType } from '@app/hooks/useNameType'

export const checkCanSyncManager = ({
  address,
  nameType,
  registrant,
  owner,
  dnsOwner,
}: {
  address?: string | null
  nameType?: NameType | null
  registrant?: string | null
  owner?: string | null
  dnsOwner?: string | null
}) => {
  return match(nameType)
    .with('eth-unwrapped-2ld', () => registrant === address && owner !== address)
    .with(
      P.union('dns-unwrapped-2ld', 'dns-wrapped-2ld'),
      () => dnsOwner === address && owner !== address,
    )
    .with(
      P.union(
        P.nullish,
        'root',
        'tld',
        'eth-emancipated-2ld',
        'eth-locked-2ld',
        'eth-unwrapped-subname',
        'eth-wrapped-subname',
        'eth-emancipated-subname',
        'eth-locked-subname',
        'eth-pcc-expired-subname',
        'dns-emancipated-2ld',
        'dns-locked-2ld',
        'dns-unwrapped-subname',
        'dns-wrapped-subname',
        'dns-emancipated-subname',
        'dns-locked-subname',
        'dns-pcc-expired-subname',
      ),
      () => false,
    )
    .exhaustive()
}
