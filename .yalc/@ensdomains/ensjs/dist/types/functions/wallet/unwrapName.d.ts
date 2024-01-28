import { type Account, type Address, type Hash, type SendTransactionParameters, type Transport } from 'viem';
import type { ChainWithEns, WalletWithEns } from '../../contracts/consts.js';
import type { Eth2ldName, Eth2ldNameSpecifier, GetNameType, SimpleTransactionRequest, WriteTransactionParameters } from '../../types.js';
type BaseUnwrapNameDataParameters<TName extends string> = {
    /** The name to unwrap */
    name: TName;
    /** The recipient of the unwrapped name */
    newOwnerAddress: Address;
    /** The registrant of the unwrapped name (eth-2ld only) */
    newRegistrantAddress?: Address;
};
type Eth2ldUnwrapNameDataParameters = {
    name: Eth2ldName;
    newRegistrantAddress: Address;
};
type OtherUnwrapNameDataParameters = {
    name: string;
    newRegistrantAddress?: never;
};
export type UnwrapNameDataParameters<TName extends string, TNameType extends GetNameType<TName> = GetNameType<TName>> = BaseUnwrapNameDataParameters<TName> & (TNameType extends Eth2ldNameSpecifier ? Eth2ldUnwrapNameDataParameters : OtherUnwrapNameDataParameters);
export type UnwrapNameDataReturnType = SimpleTransactionRequest;
export type UnwrapNameParameters<TName extends string, TChain extends ChainWithEns, TAccount extends Account | undefined, TChainOverride extends ChainWithEns | undefined> = UnwrapNameDataParameters<TName> & WriteTransactionParameters<TChain, TAccount, TChainOverride>;
export type UnwrapNameReturnType = Hash;
export declare const makeFunctionData: <TName extends string, TChain extends ChainWithEns, TAccount extends Account | undefined>(wallet: {
    account: TAccount;
    batch?: {
        multicall?: boolean | {
            batchSize?: number | undefined;
            wait?: number | undefined;
        } | undefined;
    } | undefined;
    cacheTime: number;
    chain: TChain;
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
    transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    addChain: (args: import("viem").AddChainParameters) => Promise<void>;
    deployContract: <const TAbi extends import("viem").Abi | readonly unknown[], TChainOverride extends import("viem").Chain | undefined>(args: import("viem").DeployContractParameters<TAbi, TChain, TAccount, TChainOverride>) => Promise<`0x${string}`>;
    getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
    getChainId: () => Promise<number>;
    getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
    prepareTransactionRequest: <TChainOverride_1 extends import("viem").Chain | undefined>(args: import("viem").PrepareTransactionRequestParameters<TChain, TAccount, TChainOverride_1>) => Promise<import("viem").PrepareTransactionRequestReturnType>;
    requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
    requestPermissions: (args: {
        [x: string]: Record<string, any>;
        eth_accounts: Record<string, any>;
    }) => Promise<import("viem").RequestPermissionsReturnType>;
    sendRawTransaction: (args: import("viem/actions").SendRawTransactionParameters) => Promise<`0x${string}`>;
    sendTransaction: <TChainOverride_2 extends import("viem").Chain | undefined>(args: SendTransactionParameters<TChain, TAccount, TChainOverride_2>) => Promise<`0x${string}`>;
    signMessage: (args: import("viem").SignMessageParameters<TAccount>) => Promise<`0x${string}`>;
    signTransaction: <TChainOverride_3 extends import("viem").Chain | undefined>(args: import("viem/actions").SignTransactionParameters<TChain, TAccount, TChainOverride_3>) => Promise<`0x${string}`>;
    signTypedData: <const TTypedData extends {
        [key: string]: unknown;
    } | {
        [x: string]: readonly import("viem").TypedDataParameter[];
        [x: `string[${string}]`]: undefined;
        [x: `function[${string}]`]: undefined;
        [x: `address[${string}]`]: undefined;
        [x: `bool[${string}]`]: undefined;
        [x: `bytes[${string}]`]: undefined;
        [x: `bytes3[${string}]`]: undefined;
        [x: `bytes10[${string}]`]: undefined;
        [x: `bytes16[${string}]`]: undefined;
        [x: `bytes1[${string}]`]: undefined;
        [x: `bytes2[${string}]`]: undefined;
        [x: `bytes4[${string}]`]: undefined;
        [x: `bytes5[${string}]`]: undefined;
        [x: `bytes6[${string}]`]: undefined;
        [x: `bytes7[${string}]`]: undefined;
        [x: `bytes8[${string}]`]: undefined;
        [x: `bytes9[${string}]`]: undefined;
        [x: `bytes11[${string}]`]: undefined;
        [x: `bytes12[${string}]`]: undefined;
        [x: `bytes13[${string}]`]: undefined;
        [x: `bytes14[${string}]`]: undefined;
        [x: `bytes15[${string}]`]: undefined;
        [x: `bytes17[${string}]`]: undefined;
        [x: `bytes18[${string}]`]: undefined;
        [x: `bytes19[${string}]`]: undefined;
        [x: `bytes20[${string}]`]: undefined;
        [x: `bytes21[${string}]`]: undefined;
        [x: `bytes22[${string}]`]: undefined;
        [x: `bytes23[${string}]`]: undefined;
        [x: `bytes24[${string}]`]: undefined;
        [x: `bytes25[${string}]`]: undefined;
        [x: `bytes26[${string}]`]: undefined;
        [x: `bytes27[${string}]`]: undefined;
        [x: `bytes28[${string}]`]: undefined;
        [x: `bytes29[${string}]`]: undefined;
        [x: `bytes30[${string}]`]: undefined;
        [x: `bytes31[${string}]`]: undefined;
        [x: `bytes32[${string}]`]: undefined;
        [x: `int[${string}]`]: undefined;
        [x: `int16[${string}]`]: undefined;
        [x: `int8[${string}]`]: undefined;
        [x: `int24[${string}]`]: undefined;
        [x: `int32[${string}]`]: undefined;
        [x: `int40[${string}]`]: undefined;
        [x: `int48[${string}]`]: undefined;
        [x: `int56[${string}]`]: undefined;
        [x: `int64[${string}]`]: undefined;
        [x: `int72[${string}]`]: undefined;
        [x: `int80[${string}]`]: undefined;
        [x: `int88[${string}]`]: undefined;
        [x: `int96[${string}]`]: undefined;
        [x: `int104[${string}]`]: undefined;
        [x: `int112[${string}]`]: undefined;
        [x: `int120[${string}]`]: undefined;
        [x: `int128[${string}]`]: undefined;
        [x: `int136[${string}]`]: undefined;
        [x: `int144[${string}]`]: undefined;
        [x: `int152[${string}]`]: undefined;
        [x: `int160[${string}]`]: undefined;
        [x: `int168[${string}]`]: undefined;
        [x: `int176[${string}]`]: undefined;
        [x: `int184[${string}]`]: undefined;
        [x: `int192[${string}]`]: undefined;
        [x: `int200[${string}]`]: undefined;
        [x: `int208[${string}]`]: undefined;
        [x: `int216[${string}]`]: undefined;
        [x: `int224[${string}]`]: undefined;
        [x: `int232[${string}]`]: undefined;
        [x: `int240[${string}]`]: undefined;
        [x: `int248[${string}]`]: undefined;
        [x: `int256[${string}]`]: undefined;
        [x: `uint[${string}]`]: undefined;
        [x: `uint16[${string}]`]: undefined;
        [x: `uint8[${string}]`]: undefined;
        [x: `uint24[${string}]`]: undefined;
        [x: `uint32[${string}]`]: undefined;
        [x: `uint40[${string}]`]: undefined;
        [x: `uint48[${string}]`]: undefined;
        [x: `uint56[${string}]`]: undefined;
        [x: `uint64[${string}]`]: undefined;
        [x: `uint72[${string}]`]: undefined;
        [x: `uint80[${string}]`]: undefined;
        [x: `uint88[${string}]`]: undefined;
        [x: `uint96[${string}]`]: undefined;
        [x: `uint104[${string}]`]: undefined;
        [x: `uint112[${string}]`]: undefined;
        [x: `uint120[${string}]`]: undefined;
        [x: `uint128[${string}]`]: undefined;
        [x: `uint136[${string}]`]: undefined;
        [x: `uint144[${string}]`]: undefined;
        [x: `uint152[${string}]`]: undefined;
        [x: `uint160[${string}]`]: undefined;
        [x: `uint168[${string}]`]: undefined;
        [x: `uint176[${string}]`]: undefined;
        [x: `uint184[${string}]`]: undefined;
        [x: `uint192[${string}]`]: undefined;
        [x: `uint200[${string}]`]: undefined;
        [x: `uint208[${string}]`]: undefined;
        [x: `uint216[${string}]`]: undefined;
        [x: `uint224[${string}]`]: undefined;
        [x: `uint232[${string}]`]: undefined;
        [x: `uint240[${string}]`]: undefined;
        [x: `uint248[${string}]`]: undefined;
        [x: `uint256[${string}]`]: undefined;
        string?: undefined;
        address?: undefined;
        bool?: undefined;
        bytes?: undefined;
        bytes3?: undefined;
        bytes10?: undefined;
        bytes16?: undefined;
        bytes1?: undefined;
        bytes2?: undefined;
        bytes4?: undefined;
        bytes5?: undefined;
        bytes6?: undefined;
        bytes7?: undefined;
        bytes8?: undefined;
        bytes9?: undefined;
        bytes11?: undefined;
        bytes12?: undefined;
        bytes13?: undefined;
        bytes14?: undefined;
        bytes15?: undefined;
        bytes17?: undefined;
        bytes18?: undefined;
        bytes19?: undefined;
        bytes20?: undefined;
        bytes21?: undefined;
        bytes22?: undefined;
        bytes23?: undefined;
        bytes24?: undefined;
        bytes25?: undefined;
        bytes26?: undefined;
        bytes27?: undefined;
        bytes28?: undefined;
        bytes29?: undefined;
        bytes30?: undefined;
        bytes31?: undefined;
        bytes32?: undefined;
        int16?: undefined;
        int8?: undefined;
        int24?: undefined;
        int32?: undefined;
        int40?: undefined;
        int48?: undefined;
        int56?: undefined;
        int64?: undefined;
        int72?: undefined;
        int80?: undefined;
        int88?: undefined;
        int96?: undefined;
        int104?: undefined;
        int112?: undefined;
        int120?: undefined;
        int128?: undefined;
        int136?: undefined;
        int144?: undefined;
        int152?: undefined;
        int160?: undefined;
        int168?: undefined;
        int176?: undefined;
        int184?: undefined;
        int192?: undefined;
        int200?: undefined;
        int208?: undefined;
        int216?: undefined;
        int224?: undefined;
        int232?: undefined;
        int240?: undefined;
        int248?: undefined;
        int256?: undefined;
        uint16?: undefined;
        uint8?: undefined;
        uint24?: undefined;
        uint32?: undefined;
        uint40?: undefined;
        uint48?: undefined;
        uint56?: undefined;
        uint64?: undefined;
        uint72?: undefined;
        uint80?: undefined;
        uint88?: undefined;
        uint96?: undefined;
        uint104?: undefined;
        uint112?: undefined;
        uint120?: undefined;
        uint128?: undefined;
        uint136?: undefined;
        uint144?: undefined;
        uint152?: undefined;
        uint160?: undefined;
        uint168?: undefined;
        uint176?: undefined;
        uint184?: undefined;
        uint192?: undefined;
        uint200?: undefined;
        uint208?: undefined;
        uint216?: undefined;
        uint224?: undefined;
        uint232?: undefined;
        uint240?: undefined;
        uint248?: undefined;
        uint256?: undefined;
    }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, TAccount>) => Promise<`0x${string}`>;
    switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
    watchAsset: (args: import("viem").WatchAssetParams) => Promise<boolean>;
    writeContract: <const TAbi_1 extends import("viem").Abi | readonly unknown[], TFunctionName extends string, TChainOverride_4 extends import("viem").Chain | undefined>(args: import("viem").WriteContractParameters<TAbi_1, TFunctionName, TChain, TAccount, TChainOverride_4>) => Promise<`0x${string}`>;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    }>(fn: (client: import("viem").Client<Transport, TChain, TAccount, import("viem").WalletRpcSchema, import("viem").WalletActions<TChain, TAccount>>) => client) => import("viem").Client<Transport, TChain, TAccount, import("viem").WalletRpcSchema, { [K in keyof client]: client[K]; } & import("viem").WalletActions<TChain, TAccount>>;
}, { name, newOwnerAddress, newRegistrantAddress, }: UnwrapNameDataParameters<TName, GetNameType<TName>>) => UnwrapNameDataReturnType;
/**
 * Unwraps a name.
 * @param wallet - {@link WalletWithEns}
 * @param parameters - {@link UnwrapNameParameters}
 * @returns Transaction hash. {@link UnwrapNameReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { addEnsContracts } from '@ensdomains/ensjs'
 * import { unwrapName } from '@ensdomains/ensjs/wallet'
 *
 * const wallet = createWalletClient({
 *   chain: addEnsContracts(mainnet),
 *   transport: custom(window.ethereum),
 * })
 * const hash = await unwrapName(wallet, {
 *   name: 'example.eth',
 *   newOwnerAddress: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
 *   newRegistrantAddress: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
 * })
 * // 0x...
 */
declare function unwrapName<TName extends string, TChain extends ChainWithEns, TAccount extends Account | undefined, TChainOverride extends ChainWithEns | undefined = ChainWithEns>(wallet: WalletWithEns<Transport, TChain, TAccount>, { name, newOwnerAddress, newRegistrantAddress, ...txArgs }: UnwrapNameParameters<TName, TChain, TAccount, TChainOverride>): Promise<UnwrapNameReturnType>;
declare namespace unwrapName {
    var makeFunctionData: <TName extends string, TChain extends ChainWithEns, TAccount extends Account | undefined>(wallet: {
        account: TAccount;
        batch?: {
            multicall?: boolean | {
                batchSize?: number | undefined;
                wait?: number | undefined;
            } | undefined;
        } | undefined;
        cacheTime: number;
        chain: TChain;
        key: string;
        name: string;
        pollingInterval: number;
        request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
        transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
        type: string;
        uid: string;
        addChain: (args: import("viem").AddChainParameters) => Promise<void>;
        deployContract: <const TAbi extends import("viem").Abi | readonly unknown[], TChainOverride extends import("viem").Chain | undefined>(args: import("viem").DeployContractParameters<TAbi, TChain, TAccount, TChainOverride>) => Promise<`0x${string}`>;
        getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
        getChainId: () => Promise<number>;
        getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
        prepareTransactionRequest: <TChainOverride_1 extends import("viem").Chain | undefined>(args: import("viem").PrepareTransactionRequestParameters<TChain, TAccount, TChainOverride_1>) => Promise<import("viem").PrepareTransactionRequestReturnType>;
        requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
        requestPermissions: (args: {
            [x: string]: Record<string, any>;
            eth_accounts: Record<string, any>;
        }) => Promise<import("viem").RequestPermissionsReturnType>;
        sendRawTransaction: (args: import("viem/actions").SendRawTransactionParameters) => Promise<`0x${string}`>;
        sendTransaction: <TChainOverride_2 extends import("viem").Chain | undefined>(args: SendTransactionParameters<TChain, TAccount, TChainOverride_2>) => Promise<`0x${string}`>;
        signMessage: (args: import("viem").SignMessageParameters<TAccount>) => Promise<`0x${string}`>;
        signTransaction: <TChainOverride_3 extends import("viem").Chain | undefined>(args: import("viem/actions").SignTransactionParameters<TChain, TAccount, TChainOverride_3>) => Promise<`0x${string}`>;
        signTypedData: <const TTypedData extends {
            [key: string]: unknown;
        } | {
            [x: string]: readonly import("viem").TypedDataParameter[];
            [x: `string[${string}]`]: undefined;
            [x: `function[${string}]`]: undefined;
            [x: `address[${string}]`]: undefined;
            [x: `bool[${string}]`]: undefined;
            [x: `bytes[${string}]`]: undefined;
            [x: `bytes3[${string}]`]: undefined;
            [x: `bytes10[${string}]`]: undefined;
            [x: `bytes16[${string}]`]: undefined;
            [x: `bytes1[${string}]`]: undefined;
            [x: `bytes2[${string}]`]: undefined;
            [x: `bytes4[${string}]`]: undefined;
            [x: `bytes5[${string}]`]: undefined;
            [x: `bytes6[${string}]`]: undefined;
            [x: `bytes7[${string}]`]: undefined;
            [x: `bytes8[${string}]`]: undefined;
            [x: `bytes9[${string}]`]: undefined;
            [x: `bytes11[${string}]`]: undefined;
            [x: `bytes12[${string}]`]: undefined;
            [x: `bytes13[${string}]`]: undefined;
            [x: `bytes14[${string}]`]: undefined;
            [x: `bytes15[${string}]`]: undefined;
            [x: `bytes17[${string}]`]: undefined;
            [x: `bytes18[${string}]`]: undefined;
            [x: `bytes19[${string}]`]: undefined;
            [x: `bytes20[${string}]`]: undefined;
            [x: `bytes21[${string}]`]: undefined;
            [x: `bytes22[${string}]`]: undefined;
            [x: `bytes23[${string}]`]: undefined;
            [x: `bytes24[${string}]`]: undefined;
            [x: `bytes25[${string}]`]: undefined;
            [x: `bytes26[${string}]`]: undefined;
            [x: `bytes27[${string}]`]: undefined;
            [x: `bytes28[${string}]`]: undefined;
            [x: `bytes29[${string}]`]: undefined;
            [x: `bytes30[${string}]`]: undefined;
            [x: `bytes31[${string}]`]: undefined;
            [x: `bytes32[${string}]`]: undefined;
            [x: `int[${string}]`]: undefined;
            [x: `int16[${string}]`]: undefined;
            [x: `int8[${string}]`]: undefined;
            [x: `int24[${string}]`]: undefined;
            [x: `int32[${string}]`]: undefined;
            [x: `int40[${string}]`]: undefined;
            [x: `int48[${string}]`]: undefined;
            [x: `int56[${string}]`]: undefined;
            [x: `int64[${string}]`]: undefined;
            [x: `int72[${string}]`]: undefined;
            [x: `int80[${string}]`]: undefined;
            [x: `int88[${string}]`]: undefined;
            [x: `int96[${string}]`]: undefined;
            [x: `int104[${string}]`]: undefined;
            [x: `int112[${string}]`]: undefined;
            [x: `int120[${string}]`]: undefined;
            [x: `int128[${string}]`]: undefined;
            [x: `int136[${string}]`]: undefined;
            [x: `int144[${string}]`]: undefined;
            [x: `int152[${string}]`]: undefined;
            [x: `int160[${string}]`]: undefined;
            [x: `int168[${string}]`]: undefined;
            [x: `int176[${string}]`]: undefined;
            [x: `int184[${string}]`]: undefined;
            [x: `int192[${string}]`]: undefined;
            [x: `int200[${string}]`]: undefined;
            [x: `int208[${string}]`]: undefined;
            [x: `int216[${string}]`]: undefined;
            [x: `int224[${string}]`]: undefined;
            [x: `int232[${string}]`]: undefined;
            [x: `int240[${string}]`]: undefined;
            [x: `int248[${string}]`]: undefined;
            [x: `int256[${string}]`]: undefined;
            [x: `uint[${string}]`]: undefined;
            [x: `uint16[${string}]`]: undefined;
            [x: `uint8[${string}]`]: undefined;
            [x: `uint24[${string}]`]: undefined;
            [x: `uint32[${string}]`]: undefined;
            [x: `uint40[${string}]`]: undefined;
            [x: `uint48[${string}]`]: undefined;
            [x: `uint56[${string}]`]: undefined;
            [x: `uint64[${string}]`]: undefined;
            [x: `uint72[${string}]`]: undefined;
            [x: `uint80[${string}]`]: undefined;
            [x: `uint88[${string}]`]: undefined;
            [x: `uint96[${string}]`]: undefined;
            [x: `uint104[${string}]`]: undefined;
            [x: `uint112[${string}]`]: undefined;
            [x: `uint120[${string}]`]: undefined;
            [x: `uint128[${string}]`]: undefined;
            [x: `uint136[${string}]`]: undefined;
            [x: `uint144[${string}]`]: undefined;
            [x: `uint152[${string}]`]: undefined;
            [x: `uint160[${string}]`]: undefined;
            [x: `uint168[${string}]`]: undefined;
            [x: `uint176[${string}]`]: undefined;
            [x: `uint184[${string}]`]: undefined;
            [x: `uint192[${string}]`]: undefined;
            [x: `uint200[${string}]`]: undefined;
            [x: `uint208[${string}]`]: undefined;
            [x: `uint216[${string}]`]: undefined;
            [x: `uint224[${string}]`]: undefined;
            [x: `uint232[${string}]`]: undefined;
            [x: `uint240[${string}]`]: undefined;
            [x: `uint248[${string}]`]: undefined;
            [x: `uint256[${string}]`]: undefined;
            string?: undefined;
            address?: undefined;
            bool?: undefined;
            bytes?: undefined;
            bytes3?: undefined;
            bytes10?: undefined;
            bytes16?: undefined;
            bytes1?: undefined;
            bytes2?: undefined;
            bytes4?: undefined;
            bytes5?: undefined;
            bytes6?: undefined;
            bytes7?: undefined;
            bytes8?: undefined;
            bytes9?: undefined;
            bytes11?: undefined;
            bytes12?: undefined;
            bytes13?: undefined;
            bytes14?: undefined;
            bytes15?: undefined;
            bytes17?: undefined;
            bytes18?: undefined;
            bytes19?: undefined;
            bytes20?: undefined;
            bytes21?: undefined;
            bytes22?: undefined;
            bytes23?: undefined;
            bytes24?: undefined;
            bytes25?: undefined;
            bytes26?: undefined;
            bytes27?: undefined;
            bytes28?: undefined;
            bytes29?: undefined;
            bytes30?: undefined;
            bytes31?: undefined;
            bytes32?: undefined;
            int16?: undefined;
            int8?: undefined;
            int24?: undefined;
            int32?: undefined;
            int40?: undefined;
            int48?: undefined;
            int56?: undefined;
            int64?: undefined;
            int72?: undefined;
            int80?: undefined;
            int88?: undefined;
            int96?: undefined;
            int104?: undefined;
            int112?: undefined;
            int120?: undefined;
            int128?: undefined;
            int136?: undefined;
            int144?: undefined;
            int152?: undefined;
            int160?: undefined;
            int168?: undefined;
            int176?: undefined;
            int184?: undefined;
            int192?: undefined;
            int200?: undefined;
            int208?: undefined;
            int216?: undefined;
            int224?: undefined;
            int232?: undefined;
            int240?: undefined;
            int248?: undefined;
            int256?: undefined;
            uint16?: undefined;
            uint8?: undefined;
            uint24?: undefined;
            uint32?: undefined;
            uint40?: undefined;
            uint48?: undefined;
            uint56?: undefined;
            uint64?: undefined;
            uint72?: undefined;
            uint80?: undefined;
            uint88?: undefined;
            uint96?: undefined;
            uint104?: undefined;
            uint112?: undefined;
            uint120?: undefined;
            uint128?: undefined;
            uint136?: undefined;
            uint144?: undefined;
            uint152?: undefined;
            uint160?: undefined;
            uint168?: undefined;
            uint176?: undefined;
            uint184?: undefined;
            uint192?: undefined;
            uint200?: undefined;
            uint208?: undefined;
            uint216?: undefined;
            uint224?: undefined;
            uint232?: undefined;
            uint240?: undefined;
            uint248?: undefined;
            uint256?: undefined;
        }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, TAccount>) => Promise<`0x${string}`>;
        switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
        watchAsset: (args: import("viem").WatchAssetParams) => Promise<boolean>;
        writeContract: <const TAbi_1 extends import("viem").Abi | readonly unknown[], TFunctionName extends string, TChainOverride_4 extends import("viem").Chain | undefined>(args: import("viem").WriteContractParameters<TAbi_1, TFunctionName, TChain, TAccount, TChainOverride_4>) => Promise<`0x${string}`>;
        extend: <const client extends {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            chain?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        }>(fn: (client: import("viem").Client<Transport, TChain, TAccount, import("viem").WalletRpcSchema, import("viem").WalletActions<TChain, TAccount>>) => client) => import("viem").Client<Transport, TChain, TAccount, import("viem").WalletRpcSchema, { [K in keyof client]: client[K]; } & import("viem").WalletActions<TChain, TAccount>>;
    }, { name, newOwnerAddress, newRegistrantAddress, }: UnwrapNameDataParameters<TName, GetNameType<TName>>) => SimpleTransactionRequest;
}
export default unwrapName;
//# sourceMappingURL=unwrapName.d.ts.map