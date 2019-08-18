'use strict';

/**
 * Create Milk
 * @param {org.example.milkblockchain.CreateMilk} input_data
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

function createMilk(input_data){
    let namespace = global_namespace + '.Milk';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let milk_id = input_data.id;
            if(!(assetRegistry.exists(milk_id))){
                let milk = factory.newResource(global_namespace, 'Milk', milk_id);
                milk.serialNo = milk_id;
                milk.dateOfManufacture = input_data.dateOfManufacture;
                milk.dateOfExpiry = addDays(milk.dateOfManufacture);
                let milk_batch = factory.newRelationship(global_namespace, 'Batch', input_data.batch);
                milk.batch = milk_batch;
                return assetRegistry.add(milk);
            }else{
                console.log('Error: Denied');
            }
        });
}