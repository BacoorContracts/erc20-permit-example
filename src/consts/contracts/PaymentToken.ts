import { ethers } from "ethers";
import { ERC20Test__factory, ERC20Test } from "../../../typechain-types"
import provider from "../static-provider";

export default (addr: string): ERC20Test => {
    return (new ethers.Contract(addr, ERC20Test__factory.abi, provider) as ERC20Test)
}
