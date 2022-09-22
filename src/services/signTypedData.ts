import {ethers, Signer} from "ethers"
import {TypedStruct} from "../types/eip712-typed-struct"
import {TypedDataUtils} from "ethers-eip712"

export default async (
    typedData: TypedStruct.EIP712TypedStruct,
    signer: Signer
): Promise<[string, object]> => {
    const digest = TypedDataUtils.encodeDigest(typedData)
    const signature = await signer.signMessage(digest)
    const splittedSig = ethers.utils.splitSignature(signature)
    return [signature, splittedSig]
}
