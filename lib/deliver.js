'use strict';

/**
 * Deliver transaction
 * @param {org.example.milkblockchain.Deliver} input_data
 * @transaction
 */
function deliver(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Milk';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            return assetRegistry.get(input_data.serialNo)
        .then(function(milk){
            console.log(milk.owner);
            milk.owner = 'ret-1';
            // order.placedBy.cashInAccount -= order.value;
            // order.takneBy.cashInAccount += order.value;
            // order.orderStatus = 'DELIVERED';
            assetRegistry.update(milk);
        });
    });
}