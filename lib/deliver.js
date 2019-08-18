'use strict';

/**
 * Deliver transaction
 * @param {org.example.milkblockchain.Deliver} input_data
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';
function deliver(input_data){
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            return assetRegistry.get(input_data.id);
        })
        .then(function(order){
            order.retailer.cashInAccount -= order.value;
            order.distributor.cashInAccount += order.value;
            order.status = 'DELIVERED';
            assetRegistry.update(order);
        });
}