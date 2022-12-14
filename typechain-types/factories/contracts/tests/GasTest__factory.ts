/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  GasTest,
  GasTestInterface,
} from "../../../contracts/tests/GasTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "val_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mul_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "div_",
        type: "uint256",
      },
    ],
    name: "multiply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "val_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mul_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "div_",
        type: "uint256",
      },
    ],
    name: "multiply2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "val_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "n_bits_",
        type: "uint256",
      },
    ],
    name: "multiply3",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806377b9d7aa14610046578063b3a9b5f614610046578063c906082d1461005b575b600080fd5b6100596100543660046100ac565b61007f565b005b6100596100693660046100d8565b33600090815260208190526040902091901c9055565b60008161008c85856100fa565b6100969190610127565b3360009081526020819052604090205550505050565b6000806000606084860312156100c157600080fd5b505081359360208301359350604090920135919050565b600080604083850312156100eb57600080fd5b50508035926020909101359150565b600081600019048311821515161561012257634e487b7160e01b600052601160045260246000fd5b500290565b60008261014457634e487b7160e01b600052601260045260246000fd5b50049056fea264697066735822122005f2e7701efa084b445244ad4a3834d56974ecab817f00a34fe51bfd6aa2402564736f6c634300080f0033";

type GasTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GasTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GasTest__factory extends ContractFactory {
  constructor(...args: GasTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GasTest> {
    return super.deploy(overrides || {}) as Promise<GasTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GasTest {
    return super.attach(address) as GasTest;
  }
  override connect(signer: Signer): GasTest__factory {
    return super.connect(signer) as GasTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GasTestInterface {
    return new utils.Interface(_abi) as GasTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GasTest {
    return new Contract(address, _abi, signerOrProvider) as GasTest;
  }
}
