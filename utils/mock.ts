// import React from 'react';
//   import { TezosToolkit, MichelCodecPacker } from "@taquito/taquito";
//   import { char2Bytes, bytes2Char } from "@taquito/utils";


//   let Tezos: TezosToolkit;
//   const walletOptions = {
//     name: "Illic et Numquam",
//     preferredNetwork: NetworkType.HANGZHOUNET
//   };
//   let userAddress: string;
//   let files, title, description;

//   if (process.env.NODE_ENV === "dev") {
//     title = "uranus";
//     description = "this is Uranus";
//   }

//   const rpcUrl = "https://hangzhounet.api.tez.ie";
//   const serverUrl =
//     process.env.NODE_ENV !== "production"
//       ? "http://localhost:8080"
//       : "https://my-cool-backend-app.com";

//   let nftStorage = undefined;
//   let userNfts: { tokenId: number; ipfsHash: string }[] = [];
//   let pinningMetadata = false;
//   let mintingToken = false;
//   let newNft:
//     | undefined
//     | { imageHash: string; metadataHash: string; opHash: string };

//   const getUserNfts = async (address: string) => {
//     // finds user's NFTs
//     const contract = await Tezos.wallet.at(contractAddress);
//     nftStorage = await contract.storage();
//     const getTokenIds = await nftStorage.reverse_ledger.get(address);
//     if (getTokenIds) {
//       userNfts = await Promise.all([
//         ...getTokenIds.map(async id => {
//           const tokenId = id.toNumber();
//           const metadata = await nftStorage.token_metadata.get(tokenId);
//           const tokenInfoBytes = metadata.token_info.get("");
//           const tokenInfo = b ytes2Char(tokenInfoBytes); 
//           return {
//             tokenId,
//             ipfsHash:
//               tokenInfo.slice(0, 7) === "ipfs://" ? tokenInfo.slice(7) : null
//           };
//         })
//       ]);
//     }
//   };



//   const upload = async () => {
//     try {
//       pinningMetadata = true;
//       const data = new FormData();
//       data.append("image", files[0]);
//       data.append("title", title);
//       data.append("description", description);
//       data.append("creator", userAddress);

//       const response = await fetch(`${serverUrl}/mint`, {
//         method: "POST",
//         headers: {
//           "Access-Control-Allow-Origin": "*"
//         },
//         body: data
//       });
//       if (response) {
//         const data = await response.json();
//         if (
//           data.status === true &&
//           data.msg.metadataHash &&
//           data.msg.imageHash
//         ) {
//           pinningMetadata = false;
//           mintingToken = true;
//           // saves NFT on-chain
//           const contract = await Tezos.wallet.at(contractAddress);
//           const op = await contract.methods
//             .mint(char2Bytes("ipfs://" + data.msg.metadataHash), userAddress)
//             .send();
//           console.log("Op hash:", op.opHash);
//           await op.confirmation();

//           newNft = {
//             imageHash: data.msg.imageHash,
//             metadataHash: data.msg.metadataHash,
//             opHash: op.opHash
//           };

//           files = undefined;
//           title = "";
//           description = "";

//           // refreshes storage
//           await getUserNfts(userAddress);
//         } else {
//           throw "No IPFS hash";
//         }
//       } else {
//         throw "No response";
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       pinningMetadata = false;
//       mintingToken = false;
//     }
//   };




