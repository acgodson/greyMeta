# Welcome to greyMeta

GreyMeta is a decentralized E-learning hub designed to allow the freedom of learning and exchange of flashcard collections as digital assets on tezos chain. The experimental project started during the  Metamorphosis 🐛🦋 Hack 2022.


## Built with

- [NextJS]() - Client Framework
- [Chakra UI]() - Styling
- [Web3Auth](https://web3auth.io/docs/connect-blockchain/tezos) - User Friendly Authentication
- [jLigo](https://opentezos.com/ligo/installation/) - Smart Contract
- [Taquito](https://tezostaquito.io/) - Smart Contract interaction and signature
- [IPFS and Infura](https://infura.io/) - Decentralized Storage

## Features

- **Digital Assets** - Study with flashcards in your catalog; cards puplished by others or simply create yours
- **Defi** - Earn Tez tokens as external views/traffic on your published collection increases
- **Decentralized Storage** - Pin asset metadata securly on IPFS on serverside and control signatures allowed to modify data

## Demo


- [Onboardng Video](https://youtu.be/_U-DATvvCZg)
- [Website](https//greymeta1.web.app)

## Testing Frontend

- Run ``` yarn install ``` and ``` yarn dev ``` and you're ready to go!
- To setup a web3auth account, refer to [this docs](https://web3auth.io/docs/connect-blockchain/tezos)


## Smart Contract Overview

- Contract address : KT1SW6BtUxQnHP4RaSu2B767WWPYGKCeWh8F


```

type collection_supply = {
    owner : address,
    views : int, 
    info : string,   
};

type action =
| ["Publish", collection_supply]
| ["Buy", int]


type storage = {
   collections :  big_map<int, collection_supply>,
   next_id: int,
   };

```

### Updating the views of each collection

```
  let updated_collections: big_map<int, collection_supply> =  Big_map.update (parameter, Some(collection_kind_), storage.collections);

```

### Rewarding the  author for each external view

```
  let receiver : contract<unit> =
    match ((Tezos.get_contract_opt (owner_address) as option<contract<unit>>), {
      Some: (contract : contract<unit>) => contract,
      None: () => (failwith ("Not a contract") as contract<unit>)
  });

```

```
 let payoutOperation : operation = Tezos.transaction (unit, Tezos.get_amount (), receiver);
 
```

## Testing and Deploying

 Compile [Contract](/contracts/course.ligo) written in Ligo, dry run and deploy [online](https://ide.ligolang.org/)


## UI ScreensShots
- Easy Login with  Web3Auth

![Welcome Page](/screenshots/Easy%20login%20with%20web3auth.png)


- Digital learning assets
![](/screenshots/add%20new.png)

- Pinning metadata on IPFS and Meeting
![Push assets on chain](/screenshots/mint.png)

- Retrieve Info from collection and practice with the cards
![practice](/screenshots/cards.png)



## Team

- [Tinybird](https://github.com/acgodson)
