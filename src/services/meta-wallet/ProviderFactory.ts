import ProviderWrapper from "./ProviderWrapper";
import UserWallet from "./UserWallet";
import detectEthereumProvider from "@metamask/detect-provider";

export default abstract class ProviderFactory {
    static readonly supportWallets = ["BinanceChain", "ethereum"];

    static async createWalletFrom(choice: string): Promise<UserWallet> {
        if (ProviderFactory.supportWallets.includes(choice)) {
            //   const api =
            //     choice === "ethereum"
            //       ? await this.getDefaultProvider()
            //       : eval(`window.${choice}`);
            const api = eval(`window.${choice}`)
            const providerHandler = new ProviderWrapper(choice, api);
            return new UserWallet(providerHandler);
        } else {
            return ProviderFactory.getDefaultProvider();
        }
    }

    private static async getDefaultProvider() {
        const provider = await detectEthereumProvider({
            mustBeMetaMask: true,
        });
        return new UserWallet(new ProviderWrapper("ethereum", provider));
    }
}