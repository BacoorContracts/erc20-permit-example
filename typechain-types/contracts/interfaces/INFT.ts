/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface INFTInterface extends utils.Interface {
  functions: {
    "initialize(address,address,string,string,string)": FunctionFragment;
    "mint(address,uint256,uint256,string)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "initialize" | "mint"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;

  events: {};
}

export interface INFT extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: INFTInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    initialize(
      admin_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      baseURI_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mint(
      to_: PromiseOrValue<string>,
      tokenId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      tokenURI_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  initialize(
    admin_: PromiseOrValue<string>,
    owner_: PromiseOrValue<string>,
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    baseURI_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mint(
    to_: PromiseOrValue<string>,
    tokenId_: PromiseOrValue<BigNumberish>,
    amount_: PromiseOrValue<BigNumberish>,
    tokenURI_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    initialize(
      admin_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      baseURI_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    mint(
      to_: PromiseOrValue<string>,
      tokenId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      tokenURI_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    initialize(
      admin_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      baseURI_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mint(
      to_: PromiseOrValue<string>,
      tokenId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      tokenURI_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initialize(
      admin_: PromiseOrValue<string>,
      owner_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      symbol_: PromiseOrValue<string>,
      baseURI_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      to_: PromiseOrValue<string>,
      tokenId_: PromiseOrValue<BigNumberish>,
      amount_: PromiseOrValue<BigNumberish>,
      tokenURI_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
