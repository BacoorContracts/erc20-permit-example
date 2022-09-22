import { ethers } from "ethers";
import { Governance__factory, Governance } from "../../../typechain-types"
import provider from "../static-provider";
import { env } from "process";

const GOVERNANCE = env.GOVERNANCE || "0xcB3A8342B44f660BF3d41Fdc5D86e9b69D7B79EF"
export default (): Governance => {
    return (new ethers.Contract(GOVERNANCE, Governance__factory.abi, provider) as Governance)
}
