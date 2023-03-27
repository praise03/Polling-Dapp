/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PollingContract,
  PollingContractInterface,
} from "../PollingContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_topic",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "_options",
        type: "string[]",
      },
    ],
    name: "CreatePoll",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "topic",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "options",
            type: "string[]",
          },
          {
            internalType: "uint256[]",
            name: "votes",
            type: "uint256[]",
          },
        ],
        internalType: "struct PollingContract.Poll",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_pollId",
    outputs: [
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
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
    ],
    name: "getPoll",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "topic",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "options",
            type: "string[]",
          },
          {
            internalType: "uint256[]",
            name: "votes",
            type: "uint256[]",
          },
        ],
        internalType: "struct PollingContract.Poll",
        name: "poll",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
    name: "hasVoted",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "polls",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "topic",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "optionIndex",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e77806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630490c335146100675780631a8cbcaa1461008357806342545825146100a35780635cc93ee4146100e1578063ac2f0074146100f4578063b384abef14610115575b600080fd5b61007060005481565b6040519081526020015b60405180910390f35b610096610091366004610944565b610128565b60405161007a91906109de565b6100d16100b1366004610a87565b600260209081526000928352604080842090915290825290205460ff1681565b604051901515815260200161007a565b6100966100ef366004610b76565b61033e565b610107610102366004610944565b610697565b60405161007a929190610c5d565b610070610123366004610c7e565b61073b565b6101536040518060800160405280600081526020016060815260200160608152602001606081525090565b6000828152600160208181526040928390208351608081019094528054845291820180549184019161018490610ca0565b80601f01602080910402602001604051908101604052809291908181526020018280546101b090610ca0565b80156101fd5780601f106101d2576101008083540402835291602001916101fd565b820191906000526020600020905b8154815290600101906020018083116101e057829003601f168201915b5050505050815260200160028201805480602002602001604051908101604052809291908181526020016000905b828210156102d757838290600052602060002001805461024a90610ca0565b80601f016020809104026020016040519081016040528092919081815260200182805461027690610ca0565b80156102c35780601f10610298576101008083540402835291602001916102c3565b820191906000526020600020905b8154815290600101906020018083116102a657829003601f168201915b50505050508152602001906001019061022b565b5050505081526020016003820180548060200260200160405190810160405280929190818152602001828054801561032e57602002820191906000526020600020905b81548152602001906001019080831161031a575b5050505050815250509050919050565b6103696040518060800160405280600081526020016060815260200160608152602001606081525090565b6000835111801561037b575060008251115b6103c45760405162461bcd60e51b8152602060048201526015602482015274496e636f6d706c65746520706172616d657465727360581b60448201526064015b60405180910390fd5b60008081546103d290610cf0565b9190508190555060405180608001604052806000548152602001848152602001838152602001835167ffffffffffffffff81111561041257610412610abf565b60405190808252806020026020018201604052801561043b578160200160208202803683370190505b5090526000805481526001602081815260409092208351815591830151908201906104669082610d58565b5060408201518051610482916002840191602090910190610838565b506060820151805161049e91600384019160209091019061088e565b509050506001600080548152602001908152602001600020604051806080016040529081600082015481526020016001820180546104db90610ca0565b80601f016020809104026020016040519081016040528092919081815260200182805461050790610ca0565b80156105545780601f1061052957610100808354040283529160200191610554565b820191906000526020600020905b81548152906001019060200180831161053757829003601f168201915b5050505050815260200160028201805480602002602001604051908101604052809291908181526020016000905b8282101561062e5783829060005260206000200180546105a190610ca0565b80601f01602080910402602001604051908101604052809291908181526020018280546105cd90610ca0565b801561061a5780601f106105ef5761010080835404028352916020019161061a565b820191906000526020600020905b8154815290600101906020018083116105fd57829003601f168201915b505050505081526020019060010190610582565b5050505081526020016003820180548060200260200160405190810160405280929190818152602001828054801561068557602002820191906000526020600020905b815481526020019060010190808311610671575b50505050508152505090505b92915050565b6001602081905260009182526040909120805491810180546106b890610ca0565b80601f01602080910402602001604051908101604052809291908181526020018280546106e490610ca0565b80156107315780601f1061070657610100808354040283529160200191610731565b820191906000526020600020905b81548152906001019060200180831161071457829003601f168201915b5050505050905082565b33600090815260026020908152604080832085845290915281205460ff161561079f5760405162461bcd60e51b8152602060048201526016602482015275596f75206861766520766f74656420616c726561647960501b60448201526064016103bb565b60008381526001602081905260409091206003018054849081106107c5576107c5610e18565b9060005260206000200160008282546107de9190610e2e565b90915550503360009081526002602090815260408083208684528252808320805460ff19166001908117909155909152902060030180548390811061082557610825610e18565b9060005260206000200154905092915050565b82805482825590600052602060002090810192821561087e579160200282015b8281111561087e578251829061086e9082610d58565b5091602001919060010190610858565b5061088a9291506108d5565b5090565b8280548282559060005260206000209081019282156108c9579160200282015b828111156108c95782518255916020019190600101906108ae565b5061088a9291506108f2565b8082111561088a5760006108e98282610907565b506001016108d5565b5b8082111561088a57600081556001016108f3565b50805461091390610ca0565b6000825580601f10610923575050565b601f01602090049060005260206000209081019061094191906108f2565b50565b60006020828403121561095657600080fd5b5035919050565b6000815180845260005b8181101561098357602081850181015186830182015201610967565b506000602082860101526020601f19601f83011685010191505092915050565b600081518084526020808501945080840160005b838110156109d3578151875295820195908201906001016109b7565b509495945050505050565b600060208083528351818401528084015160806040850152610a0360a085018261095d565b6040860151601f198683038101606088015281518084529293509084019184840190600581901b8501860160005b82811015610a5d5784878303018452610a4b82875161095d565b95880195938801939150600101610a31565b5060608a01519650838982030160808a0152610a7981886109a3565b9a9950505050505050505050565b60008060408385031215610a9a57600080fd5b82356001600160a01b0381168114610ab157600080fd5b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610afe57610afe610abf565b604052919050565b600082601f830112610b1757600080fd5b813567ffffffffffffffff811115610b3157610b31610abf565b610b44601f8201601f1916602001610ad5565b818152846020838601011115610b5957600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610b8957600080fd5b823567ffffffffffffffff80821115610ba157600080fd5b610bad86838701610b06565b9350602091508185013581811115610bc457600080fd5b8501601f81018713610bd557600080fd5b803582811115610be757610be7610abf565b8060051b610bf6858201610ad5565b918252828101850191858101908a841115610c1057600080fd5b86850192505b83831015610c4c57823586811115610c2e5760008081fd5b610c3c8c8983890101610b06565b8352509186019190860190610c16565b809750505050505050509250929050565b828152604060208201526000610c76604083018461095d565b949350505050565b60008060408385031215610c9157600080fd5b50508035926020909101359150565b600181811c90821680610cb457607f821691505b602082108103610cd457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600060018201610d0257610d02610cda565b5060010190565b601f821115610d5357600081815260208120601f850160051c81016020861015610d305750805b601f850160051c820191505b81811015610d4f57828155600101610d3c565b5050505b505050565b815167ffffffffffffffff811115610d7257610d72610abf565b610d8681610d808454610ca0565b84610d09565b602080601f831160018114610dbb5760008415610da35750858301515b600019600386901b1c1916600185901b178555610d4f565b600085815260208120601f198616915b82811015610dea57888601518255948401946001909101908401610dcb565b5085821015610e085787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603260045260246000fd5b8082018082111561069157610691610cda56fea2646970667358221220672da613b4294156669b42be493ced3af70f47774d715b618693432ab08427e764736f6c63430008120033";

type PollingContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PollingContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PollingContract__factory extends ContractFactory {
  constructor(...args: PollingContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PollingContract> {
    return super.deploy(overrides || {}) as Promise<PollingContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PollingContract {
    return super.attach(address) as PollingContract;
  }
  override connect(signer: Signer): PollingContract__factory {
    return super.connect(signer) as PollingContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PollingContractInterface {
    return new utils.Interface(_abi) as PollingContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PollingContract {
    return new Contract(address, _abi, signerOrProvider) as PollingContract;
  }
}
