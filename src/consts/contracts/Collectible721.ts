import { Contract, ethers } from "ethers";
import { Collectible721, Collectible721__factory,  } from "../../../typechain-types"
import provider from "../static-provider";
import { env } from "process";

const INSTANCE_721 = env.INSTANCE_721 || "0x41EC026E16F2f29e916aA03DcA04d3C9E25ff3A4"
export default (): Contract => {
    const abi = Collectible721__factory.createInterface()
    return new ethers.Contract(INSTANCE_721, abi, provider)
}
