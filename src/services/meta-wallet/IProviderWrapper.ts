import { ethers } from "ethers"

import { RPCArguments } from "../../types/rpc-args"

export default interface IProviderWrapper {
    name: string
    provider: ethers.providers.Web3Provider
    currentAccount: string
    handleConnect(connectInfo?: RPCArguments.ConnectInfo): Promise<void>
    handleDisconnect(): Promise<void>
    handleChainChanged(_chainId: string): Promise<void>
    handleMessage(message: RPCArguments.ProviderMessage): Promise<void>
    handleAccountsChanged(accounts: String[]): Promise<void>
}
