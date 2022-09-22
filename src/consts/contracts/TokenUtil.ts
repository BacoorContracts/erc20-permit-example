import { ethers } from "ethers";
import { TokenUtil__factory, TokenUtil } from "../../../typechain-types"
import provider from "../static-provider";
import { env } from "process";

const TOKEN_UTIL = env.TOKEN_UTIL || "0x7509e9909D0B01D02305B7Fa4ce323ef0f9563CF"
export default (): TokenUtil => {
    return (new ethers.Contract(TOKEN_UTIL, TokenUtil__factory.abi, provider) as TokenUtil)
}
