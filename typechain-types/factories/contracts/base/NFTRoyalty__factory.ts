/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  NFTRoyalty,
  NFTRoyaltyInterface,
} from "../../../contracts/base/NFTRoyalty";

const _abi = [
  {
    inputs: [],
    name: "NFTRoyalty__Unauthorized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "feeNumerator_",
        type: "uint96",
      },
    ],
    name: "setDefaultRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "feeNumerator_",
        type: "uint96",
      },
    ],
    name: "setTokenRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class NFTRoyalty__factory {
  static readonly abi = _abi;
  static createInterface(): NFTRoyaltyInterface {
    return new utils.Interface(_abi) as NFTRoyaltyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTRoyalty {
    return new Contract(address, _abi, signerOrProvider) as NFTRoyalty;
  }
}
