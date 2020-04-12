'use strict';

/**
 * Create Milk
 * @param {org.example.milkblockchain.CreateMilk} input_data
 * @transaction
 */
function createMilk(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Milk';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let milk_id = input_data.serialNo;
            let milk = factory.newResource(global_namespace, 'Milk', milk_id);
            milk.serialNo = milk_id;
            milk.milkNo = input_data.milkNo;
            milk.dateOfManufacture = input_data.dateOfManufacture;
            milk.dateOfExpiry = input_data.dateOfExpiry;
            let milk_batch = factory.newRelationship(global_namespace, 'Batch', input_data.batch);
            // let owner_id = factory.newRelationship(global_namespace, 'Manufacturer', input_data.owner);
            milk.batch = milk_batch;
            milk.owner = input_data.owner;
            return assetRegistry.add(milk);
        });
}