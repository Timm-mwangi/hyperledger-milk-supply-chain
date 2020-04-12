'use strict';

/**
 * Sell transaction
 * @param {org.example.milkblockchain.Sell} input_data
 * @transaction
 */
function sell(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Milk';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            return assetRegistry.get(input_data.serialNo)
                .then(function(milkReturned){
                    console.log(milkReturned.owner);
                    // milkReturned.owner = 'dis-1';
                    // order.orderStatus = 'INTRANSIT';
                    // order.takenBy.cashInAccount -= order.value;
                    // order.manufacturer.cashInAccount += order.value;
                    // assetRegistry.update(milk);


                    let factory = getFactory();
                    let milk_id = input_data.serialNo;
                    let milk = factory.newResource(global_namespace, 'Milk', milk_id);
                    milk.serialNo = milk_id;
                    milk.milkNo = milkReturned.milkNo;
                    milk.dateOfManufacture = milkReturned.dateOfManufacture;
                    milk.dateOfExpiry = milkReturned.dateOfExpiry;
                    // let milk_batch = factory.newRelationship(global_namespace, 'Batch', input_data.batch);
                    // let owner_id = factory.newRelationship(global_namespace, 'Manufacturer', input_data.owner);
                    milk.batch = milkReturned.batch;
                    milk.owner = 'dis-1';
                    return assetRegistry.add(milk);
                });
    });
}