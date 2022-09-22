import { ethers } from "ethers";
import { RPCArguments } from "../../types/rpc-args"
import IProviderWrapper from "./IProviderWrapper";

export default class UserWallet {
    //static INSTANCE: UserWallet
    wrapper: IProviderWrapper;

    constructor(wrapper: IProviderWrapper) {
        this.wrapper = wrapper
    }

    // static init(wrapper: IProviderWrapper): UserWallet {
    //     if (!!!UserWallet.INSTANCE) {
    //         UserWallet.INSTANCE = new UserWallet(wrapper)
    //     }
    //     return UserWallet.INSTANCE
    // }

    // get instance(): UserWallet {
    //     return UserWallet.INSTANCE
    // }

    get signer(): ethers.providers.JsonRpcSigner {
        return this.wrapper.provider.getSigner()
    }

    get provider(): ethers.providers.Web3Provider {
        return this.wrapper.provider
    }

    getSigner(address?: string): ethers.providers.JsonRpcSigner {
        return this.wrapper.provider.getSigner()
    }

    async connect(connectInfo?: RPCArguments.ConnectInfo): Promise<void> {
        await this.wrapper.handleConnect(connectInfo)
    }

    async sign(message: any): Promise<[string, object]> {
        const sig = await this.wrapper.provider.getSigner().signMessage(message)
        const splittedSig = ethers.utils.splitSignature(sig)
        return [sig, splittedSig]
    }
}