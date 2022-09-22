import { ethers } from "ethers"

import { Marketplace__factory, Marketplace } from "../../../typechain-types"

import { env } from "process";

import provider from "../static-provider";


const MARKETPLACE = env.MARKETPLACE || "0x27363292b64362D5268EEf5f17f534E9A163B976"

export default (): Marketplace => {
    return new ethers.Contract(MARKETPLACE, Marketplace__factory.abi, provider) as Marketplace
}
