
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

let price : tez = 10 as mutez;

let publish = ([parameter, storage]: [collection_supply, storage]) : [list<operation>, storage] => {
   let collections = storage.collections;
  let new_id = storage.next_id;
  
  let updated_collections: big_map<int, collection_supply> =
    Big_map.update(new_id, Some(parameter), collections);
  return [(list([]) as list<operation>), {
                           collections :  updated_collections,
                           next_id: new_id + 1,
                        }];
  };




let buy_collection = ([parameter, storage]: [int, storage]) :
                   [list<operation>, storage] => {

  // Retrieve the collection_kind from the contract's storage or fail
    let collection_kind: collection_supply =
    match (Big_map.find_opt(parameter, storage.collections), {
      Some: collection_supply => collection_supply,
      None: () => (failwith("This collection does not exist.") as collection_supply)
    });



  // We won't sell collection if the amount is not correct
  let _ = 
    assert_with_error (((Tezos.get_amount ()) != price),
      "Sorry, the collection you are trying to purchase now a different price");

  // Increase the views by 1n, because we have just sold one extra
  let collection_kind_ = { ...collection_kind, views : collection_kind.views + 1 };


  let updated_collections: big_map<int, collection_supply> =  Big_map.update (parameter, Some(collection_kind_), storage.collections);

 let owner_address : address = collection_kind_.owner;
  //Pay out money to the original owner of the collecton
  let receiver : contract<unit> =
    match ((Tezos.get_contract_opt (owner_address) as option<contract<unit>>), {
      Some: (contract : contract<unit>) => contract,
      None: () => (failwith ("Not a contract") as contract<unit>)
  });


  let payoutOperation : operation = Tezos.transaction (unit, Tezos.get_amount (), receiver);
  let _operations : list<operation> = list([payoutOperation]);

  return [(list([]) as list<operation>), {
                           collections :  updated_collections,
                           next_id: storage.next_id,
                        }];
  };



let main = ([action, storage]: [action, storage]) : [list<operation>, storage] => {
  return match (action, {
    Publish: b => publish([b, storage]),
    Buy: n => buy_collection([n, storage]),
  });
};



