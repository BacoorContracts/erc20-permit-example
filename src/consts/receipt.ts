import {TypedStruct} from "../types/eip712-typed-struct"
import {EIP712_DOMAIN} from "./eip712-domain"

export const RECEIPT_STRUCT = (
    domain: TypedStruct.EIP712Domain,
    primaryType: string = "Receipt" as const,
    message: TypedStruct.Receipt | TypedStruct.BulkReceipt
) => {
    return {
        types: {
            EIP712Domain: EIP712_DOMAIN,
            User: [
                {name: "addr", type: "address"},
                {name: "v", type: "uint8"},
                {name: "deadline", type: "uint256"},
                {name: "r", type: "bytes32"},
                {name: "s", type: "bytes32"},
            ],
            Header: [
                {name: "buyer", type: "User"},
                {name: "seller", type: "User"},
                {name: "nftContract", type: "address"},
                {name: "paymentToken", type: "address"},
            ],
            Item: [
                {name: "amount", type: "uint256"},
                {name: "tokenId", type: "uint256"},
                {name: "unitPrice", type: "uint256"},
                {name: "tokenURI", type: "string"},
            ],
            Bulk: [
                {name: "amounts", type: "uint256[]"},
                {name: "tokenIds", type: "uint256[]"},
                {name: "unitPrices", type: "uint256[]"},
                {name: "tokenURIs", type: "string[]"},
            ],
            Receipt: [
                {name: "header", type: "Header"},
                {name: "item", type: "Item"},
                {name: "nonce", type: "uint256"},
                {name: "deadline", type: "uint256"},
            ],
            BulkReceipt: [
                {name: "header", type: "Header"},
                {name: "bulk", type: "Bulk"},
                {name: "nonce", type: "uint256"},
                {name: "deadline", type: "uint256"},
            ],
        },
        domain: domain,
        primaryType: primaryType,
        message: message,
    }
}
