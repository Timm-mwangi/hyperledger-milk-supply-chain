'use strict';

/**
 * Sell transaction
 * @param {org.example.milkblockchain.Sell} input_data
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';
function sell(input_data){
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            return assetRegistry.get(input_data.id)
        })
        .then(function(order){
            order.status = 'INTRANSIT';
            order.distributor.cashInAccount -= input_data.value;
            order.manufacturer.cashInAccount += input_data.value;
            assetRegistry.update(order);
        });
}