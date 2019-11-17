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
        .then(function(milk){
            console.log(milk.owner);
            milk.owner = 'dis-1';
            // order.orderStatus = 'INTRANSIT';
            // order.takenBy.cashInAccount -= order.value;
            // order.manufacturer.cashInAccount += order.value;
            assetRegistry.update(milk);
        });
    });
}