import { BigNumber } from 'ethers';
import TokenUtil from '../consts/contracts/TokenUtil';


export default async (creatorFee: BigNumber, type: BigNumber, supply: BigNumber, index: BigNumber, creator: string): Promise<BigNumber> => {
    const tokenUtil = TokenUtil()
    const tokenId = await tokenUtil.createTokenId(creatorFee, type, supply, index, creator)
    return tokenId
}