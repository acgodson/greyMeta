//@ts-ignore
import * as tezosCrypto from "@tezos-core-tools/crypto-utils";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { TezosToolkit } from "@taquito/taquito";
import { bytes2Char, char2Bytes, hex2buf } from "@taquito/utils";
import { InMemorySigner } from "@taquito/signer";
import { AnyCnameRecord } from "dns";
import { type } from "os";
import { CONTRACT } from "../constants";

const tezos = new TezosToolkit("https://rpc.kathmandunet.teztnets.xyz/");

// interface goat {
//      utils: { seedToKeyPair: (arg0: Uint8Array) => any; }; }

type userNftType = { tokenId: number; ipfsHash: string }[];
type newNftType =
  | undefined
  | { imageHash: string; metadataHash: string; opHash: string };

export default class tezosRPC {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  getTezosKeyPair = async (): Promise<any> => {
    try {
      const privateKey = (await this.provider.request({
        method: "private_key",
      })) as string;
      console.log(`This users privat key ${privateKey}`);
      const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(privateKey));
      return keyPair;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // List of available RPC Nodes -- https://tezostaquito.io/docs/rpc_nodes

  setProvider = async () => {
    const keyPair = await this.getTezosKeyPair();
    // use TacoInfra's RemoteSigner for better security on mainnet..
    tezos.setSignerProvider(
      await InMemorySigner.fromSecretKey(keyPair?.sk as string)
    );
  };

  getAccounts = async () => {
    try {
      const keyPair = await this.getTezosKeyPair();
      return keyPair?.pkh;
    } catch (error) {
      console.error("Error", error);
    }
  };

  getBalance = async () => {
    try {
      const keyPair = await this.getTezosKeyPair();
      // keyPair.pkh is the account address.
      const balance = await tezos.tz.getBalance(keyPair?.pkh as string);
      return balance;
    } catch (error) {
      return error;
    }
  };

  signMessage = async () => {
    try {
      // Reference: https://tezostaquito.io/docs/signing
      const keyPair = await this.getTezosKeyPair();
      const signer = new InMemorySigner(keyPair.sk);
      const message =
        "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"; //Mock
      const signature = await signer.sign(message);
      return signature;
    } catch (error) {
      return error;
    }
  };

  signAndSendTransaction = async () => {
    try {
      await this.setProvider();
      // example address.
      const address = "tz1dHzQTA4PGBk2igZ3kBrDsVXuvHdN8kvTQ";

      const op = await tezos.wallet
        .transfer({
          to: address,
          amount: 0.00005,
        })
        .send();

      const txRes = await op.confirmation();
      return txRes;
    } catch (error) {
      return error;
    }
  };

  getContractArtifact = async () => {
    try {
      await this.setProvider();
      const contract = await tezos.wallet.at(CONTRACT);
      const store: any = contract;

      //     Tezos.contract
      // .at('KT1GJ5dUyHiaj7Uuc8gqfsbdv5tTbEH3fiRP')
      // .then((c) => {
      //   let methods = c.parameterSchema.ExtractSignatures();
      //   println(JSON.stringify(methods, null, 2));
      // })
      // .catch((error) => console.log(`Error: ${error}`));

      if (store) {
        return store;
      }

      // if (nftStorage) {
      //   console.log(nftStorage);
      // }

      // const getTokenIds = await nftStorage.reverse.legder.get(address);
      // if (getTokenIds) {
      //   const userNfts : userNftType = await Promise.all([
      //     getTokenIds.map(async (id) => {
      //       const tokenId = id.toNumber();
      //       const metadata = await nftStorage.metadata.get(tokenId);
      //       const tokenInfoBytes = metadata.token.info.get("");
      //       const tokenInfo = bytes2Char(tokenInfoBytes);
      //       return {
      //         tokenId,
      //         ipfsHash:
      //           tokenInfo.slice(0, 7) === "ipfs://"
      //             ? tokenInfoBytes.slice(7)
      //             : null,
      //       };
      //     }),
      //   ]);
    } catch (error) {
      return error;
    }
  };

  uploadNFT = async () => {
    try {
      await this.setProvider();
      const contract = await tezos.wallet.at(CONTRACT);
      // const op = await contract.methods
      //   .mint(char2Bytes("ipfs://" + https://ipfs.io/ipfs/QmVrQN95j6Nbv3MxJpibRx5XDFtAvQqbwfNSnN6EdfdR7c), userAddress)
      //   .send();
      // console.log("Op hash:", op.opHash);
      // await op.confirmation();

      // const newNft = {
      //   imageHash: data.msg.imageHash,
      //   metadataHash: data.msg.metadataHash,
      //   opHash: op.opHash,
      // };
    } catch (error) {
      return error;
    }
  };
}
