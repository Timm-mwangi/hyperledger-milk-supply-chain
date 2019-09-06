'use strict';

/**
 * Sell transaction
 * @param {org.example.milkblockchain.Sell} input_data
 * @transaction
 */
function sell(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            return assetRegistry.get(input_data.orderId)
        .then(function(order){
            order.status = 'INTRANSIT';
            order.distributor.cashInAccount -= order.value;
            order.manufacturer.cashInAccount += order.value;
            assetRegistry.update(order);
        });
    });
}