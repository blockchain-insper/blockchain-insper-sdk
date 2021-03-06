import { BaseError, Service, ServiceOptions } from 'ts-framework-common';
import { getRepository } from 'typeorm';
import { EthereumModel } from '../models';
import { TypeContract } from '../models/EthereumModel';
import ipfs, { InformationModel } from '../models/ipfs';

var lightwallet = require('eth-lightwallet');

var txutils = lightwallet.txutils;

// TODO move to config
const Weber3 = require('web3');
const web3 = new Weber3(
  new Weber3.providers.HttpProvider('https://rinkeby.infura.io/')
);

var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');


export interface EthServiceOptions extends ServiceOptions {
}

export default class EthService extends Service {
  protected static instance: EthService;
  public options: EthServiceOptions;

  constructor(options: EthServiceOptions) {
    super(options);
  }

  public static getInstance(options: EthServiceOptions) {
    if (!this.instance) {
      throw new BaseError("Eth service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: EthServiceOptions) {
    const service = new EthService(options);

    if(!this.instance) {
      this.instance = service;
    }

    return service;
  }

  public static async createRaw(address: string, eth?) {

    try {

      if (!eth){
        eth = {
          "linkReferences": {},
          "object": "6060604052341561000f57600080fd5b6102da8061001e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063d13319c414610048578063dfb29935146100d657600080fd5b341561005357600080fd5b61005b610133565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100e157600080fd5b610131600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506101db565b005b61013b6101f5565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101d15780601f106101a6576101008083540402835291602001916101d1565b820191906000526020600020905b8154815290600101906020018083116101b457829003601f168201915b5050505050905090565b80600090805190602001906101f1929190610209565b5050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024a57805160ff1916838001178555610278565b82800160010185558215610278579182015b8281111561027757825182559160200191906001019061025c565b5b5090506102859190610289565b5090565b6102ab91905b808211156102a757600081600090555060010161028f565b5090565b905600a165627a7a72305820bb49c20e4fc6912c2030969dfa9684b54815f2ead5c1f3596cd7769b135bb2380029",
          "opcodes": "PUSH1 0x60 PUSH1 0x40 MSTORE CALLVALUE ISZERO PUSH2 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x2DA DUP1 PUSH2 0x1E PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xD13319C4 EQ PUSH2 0x48 JUMPI DUP1 PUSH4 0xDFB29935 EQ PUSH2 0xD6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE ISZERO PUSH2 0x53 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x5B PUSH2 0x133 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE ISZERO PUSH2 0xE1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x131 PUSH1 0x4 DUP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP3 ADD DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP4 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP4 DUP4 DUP1 DUP3 DUP5 CALLDATACOPY DUP3 ADD SWAP2 POP POP POP POP POP POP SWAP2 SWAP1 POP POP PUSH2 0x1DB JUMP JUMPDEST STOP JUMPDEST PUSH2 0x13B PUSH2 0x1F5 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x1D1 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1A6 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x1D1 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x1B4 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST DUP1 PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x1F1 SWAP3 SWAP2 SWAP1 PUSH2 0x209 JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP SWAP1 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0x24A JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x278 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x278 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x277 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x25C JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x285 SWAP2 SWAP1 PUSH2 0x289 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH2 0x2AB SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x2A7 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x28F JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0xbb 0x49 0xc2 0xe 0x4f 0xc6 SWAP2 0x2c KECCAK256 ADDRESS SWAP7 SWAP14 STATICCALL SWAP7 DUP5 0xb5 0x48 ISZERO CALLCODE 0xea 0xd5 0xc1 RETURN MSIZE PUSH13 0xD7769B135BB238002900000000 ",
          "sourceMap": "25:176:0:-;;;;;;;;;;;;;;;;;"
        } 
      }

      var rawTx = {
        nonce: await (web3.toHex(web3.eth.getTransactionCount(address)))+3000000,
        gasLimit: web3.toHex(800000),
        gasPrice: web3.toHex(20000000000),
        data: '0x' + eth + '0000000000000000000000000000000000000000000000000000000000000005'
      };
      
      return rawTx;
    } catch (error) {
      console.error(error)
    }
  }

  //TODO
  // public static async createRawHash

  public static async showContracts(): Promise<EthereumModel[]> {
    try {
      const repository = getRepository(EthereumModel);
      const user = await repository.find();
      return user;
    } catch (error) {
      console.error(error)
    }
  }

  public static async sendHashToEth(information: string, type: string, key: string, address: string){
    try {
      const ipfsRepo = getRepository(InformationModel);
      const ipfsInfo = await ipfsRepo.find({where:{information}})
      const ethRepo = getRepository(EthereumModel);
      const ethInfo = await ethRepo.find({where:{type}})

      var txOptions = {
        nonce: web3.toHex(web3.eth.getTransactionCount(address)),
        gasLimit: web3.toHex(800000),
        gasPrice: web3.toHex(200000000000),
        to: ethInfo[0].hashContract
      }

      const abi = [
        {
          "constant": true,
          "inputs": [],
          "name": "getHash",
          "outputs": [
            {
              "name": "x",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "x",
              "type": "string"
            }
          ],
          "name": "sendHash",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]

      var rawTx = txutils.functionTx(abi, 'sendHash', [ipfsInfo[0].hash], txOptions);

      const sendRaw = await this.sendRaw(rawTx, key)

      return sendRaw;
      
    } catch (error) {
      console.error(error)
    }
  }

  public static async sendRaw(rawTnx, key: string, address?: string) : Promise<any>{

    try {

      const private_key = Buffer.from(key,'hex');
      const transaction = new tx(rawTnx);
      transaction.sign(private_key);
      const serializedTx = transaction.serialize().toString('hex');

      const deploy = await web3.eth.sendRawTransaction(
        '0x' + serializedTx, async (err, result) => {
        if(err) { console.error(err) }
        else {
          setTimeout(() => {
            waitBlock(() => {
            });
          }, 15000); 
          async function waitBlock(callback) {
            async function innerWaitBlock() {
              const receipt = await web3.eth.getTransactionReceipt(result);
                if (receipt && receipt.contractAddress) {
                  // TODO save eth transaction Hash
                  const hashEth = getRepository(EthereumModel)
                  const saveEthHash = await hashEth.insert({
                    type: TypeContract.Hash,
                    private: key,
                    address,
                    hashContract: receipt.contractAddress
                  });
                  console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
                  console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
                  return receipt.contractAddress
                } else {
                  console.log("Waiting a mined block to include your contract [contracts]... currently in block " + web3.eth.blockNumber);
                  setTimeout(innerWaitBlock, 4000);
                  }
                }
          innerWaitBlock();
        }
      }
    });
    
  } catch (error) {
      console.error(error)
    }
  };

  public static async sendContractCreation(address: string,privateKey: string) {
    const rawTnx = await this.createRaw(address)
    const deploy = await this.sendRaw(rawTnx,privateKey, address)
    return deploy;
  }
  
  async onMount(): Promise<void> {
    this.logger.debug('Mounting EthService instance');
  }

  async onInit(): Promise<void> {
    this.logger.debug('Initializing EthService instance');
  }

  async onReady(): Promise<void> {
    this.logger.info('EthService initialized successfully');
  }

  async onUnmount(): Promise<void> {
    this.logger.debug('Unmounting EthService instance');
  }
}