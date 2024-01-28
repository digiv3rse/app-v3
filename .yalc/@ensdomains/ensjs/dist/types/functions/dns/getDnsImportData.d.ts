import type { ClientWithEns } from '../../contracts/consts.js';
import type { Endpoint } from './types.js';
export type GetDnsImportDataParameters = {
    /** Name to prepare for DNS import */
    name: string;
    /** An RFC-1035 compatible DNS endpoint to use (default: `https://cloudflare-dns.com/dns-query`) */
    endpoint?: Endpoint;
};
export type RrSetWithSig = {
    rrset: Uint8Array;
    sig: Uint8Array;
};
export type GetDnsImportDataReturnType = {
    rrsets: RrSetWithSig[];
    proof: Uint8Array;
};
/**
 * Gets DNS import data, used for `importDnsName()`
 * @param client - {@link ClientWithEns}
 * @param parameters - {@link GetDnsImportDataParameters}
 * @returns DNS import data object, used for proving the value of the `_ens` TXT record
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { addEnsContracts } from '@ensdomains/ensjs'
 * import { getDnsImportData } from '@ensdomains/ensjs/dns'
 *
 * const client = createPublicClient({
 *   chain: addEnsContracts(mainnet),
 *   transport: http(),
 * })
 * const data = await getDnsImportData(client, {
 *   name: 'example.eth',
 * })
 */
declare const getDnsImportData: (client: ClientWithEns, { name, endpoint, }: GetDnsImportDataParameters) => Promise<GetDnsImportDataReturnType>;
export default getDnsImportData;
//# sourceMappingURL=getDnsImportData.d.ts.map