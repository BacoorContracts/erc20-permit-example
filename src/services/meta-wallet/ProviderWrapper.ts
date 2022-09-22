import { ethers } from "ethers"
import { RPCArguments } from "../../types/rpc-args"
import IProviderWrapper from "./IProviderWrapper"

export default class ProviderWrapper implements IProviderWrapper {
    name: string
    provider: ethers.providers.Web3Provider
    currentAccount!: string

    constructor(name: string, provider: any) {
        provider.on("message", this.handleMessage)
        provider.on("connect", this.handleConnect)
        provider.on("disconnect", this.handleDisconnect)
        provider.on("chainChanged", this.handleChainChanged)
        provider.on("accountsChanged", this.handleAccountsChanged)

        this.name = name
        this.provider = new ethers.providers.Web3Provider(provider)
    }

    async handleConnect(connectInfo?: RPCArguments.ConnectInfo | undefined): Promise<void> {
        console.log('Connected to', connectInfo)
    }
    handleDisconnect(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    handleChainChanged(_chainId: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async handleMessage(message: RPCArguments.ProviderMessage): Promise<void> {
        console.log(message)
    }
    async handleAccountsChanged(accounts: String[]): Promise<void> {
        //console.log(accounts)
        //await this.provider.send("eth_requestAccounts", [])
        console.log("list", accounts)
    }

}
