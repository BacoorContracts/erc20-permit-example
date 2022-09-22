import { ethers } from "ethers";
import { ERC20Test__factory, ERC20Test } from "../../../typechain-types"
import provider from "../static-provider";
import { env } from "process";

const PAYMENT_TOKEN = env.PAYMENT_TOKEN || "0x3cE26a9FC365CE4B0BD6D44b30385a150741d746"
export default (): ERC20Test => {
    return (new ethers.Contract(PAYMENT_TOKEN, ERC20Test__factory.abi, provider) as ERC20Test)
}
