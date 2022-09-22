import { TypedData, TypedDataDomain, TypedDataArgument } from "ethers-eip712";
import { BigNumber } from "ethers";

export namespace TypedStruct {
    export type EIP712TypedStruct = TypedData
    export type EIP712DataArgs = TypedDataArgument[]
    export type EIP712Domain = TypedDataDomain

    export type User = {
        addr: string
        v: number
        r: string
        s: string
        deadline: string
    }

    export type Header = {
        buyer: User
        seller: User
        nftContract: string
        paymentToken: string
    }

    export type Item = {
        amount: string
        tokenId: string
        unitPrice: string
        tokenURI: string
    }

    export type Bulk = {
        amounts: BigNumber[]
        tokenIds: BigNumber[]
        unitPrices: BigNumber[]
        tokenURIs: string[]
    }

    export type Base = {
        header: Header
        nonce: string
        deadline: string
    }

    export type Receipt = { item: Item } & Base

    export type BulkReceipt = { bulk: Bulk } & Base


    export type PermitStruct = {
        nonce: string
        deadline: string
        spender: string
    }

    export type PermitStruct1155 = { owner: string } & PermitStruct

    export type PermitStruct20 = { value: string } & PermitStruct1155

    export type PermitStruct721 = { tokenId: string } & PermitStruct
}