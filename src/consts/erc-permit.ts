import {TypedStruct} from "../types/eip712-typed-struct"
import {EIP712_DOMAIN} from "./eip712-domain"

export const PERMIT_TYPE_DICT = {
    20: [
        {name: "owner", type: "address"},
        {name: "spender", type: "address"},
        {name: "value", type: "uint256"},
        {name: "nonce", type: "uint256"},
        {name: "deadline", type: "uint256"},
    ],
    721: [
        {name: "spender", type: "address"},
        {name: "tokenId", type: "uint256"},
        {name: "nonce", type: "uint256"},
        {name: "deadline", type: "uint256"},
    ],
    1155: [
        {name: "owner", type: "address"},
        {name: "spender", type: "address"},
        {name: "nonce", type: "uint256"},
        {name: "deadline", type: "uint256"},
    ],
} as {[key: number]: TypedStruct.EIP712DataArgs}

export const EIP712_PERMIT = (
    ercStandard: number,
    domain: TypedStruct.EIP712Domain,
    message: TypedStruct.PermitStruct
) => {
    return {
        types: {
            EIP712Domain: EIP712_DOMAIN,
            Permit: PERMIT_TYPE_DICT[ercStandard],
        },
        primaryType: "Permit" as const,
        domain: domain,
        message: message,
    } as TypedStruct.EIP712TypedStruct
}
