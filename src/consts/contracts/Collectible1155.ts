import { Contract, ethers } from "ethers";
import { Collectible1155, Collectible1155__factory } from "../../../typechain-types"
import provider from "../static-provider";
import { env } from "process";
//import { Collectible1155 } from '../../../typechain-types/contracts/Collectible1155';

const INSTANCE_1155 = env.INSTANCE_1155 || "0x96F861895D2A398f9c9c9AFCce0885614e580c63"
export default (): Contract => {
    return new ethers.Contract(INSTANCE_1155, Collectible1155__factory.abi, provider)
}