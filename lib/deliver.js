'use strict';

/**
 * Deliver transaction
 * @param {org.example.milkblockchain.Deliver} input_data
 * @transaction
 */
function deliver(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            return assetRegistry.get(input_data.orderId)
        .then(function(order){
            order.retailer.cashInAccount -= order.value;
            order.distributor.cashInAccount += order.value;
            order.status = 'DELIVERED';
            assetRegistry.update(order);
        });
    });
}