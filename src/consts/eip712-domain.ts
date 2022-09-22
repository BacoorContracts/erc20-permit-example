import {TypedStruct} from "../types/eip712-typed-struct"

export const EIP712_DOMAIN = [
    {name: "name", type: "string"},
    {name: "version", type: "string"},
    {name: "chainId", type: "uint256"},
    {name: "verifyingContract", type: "address"},
] as TypedStruct.EIP712DataArgs
