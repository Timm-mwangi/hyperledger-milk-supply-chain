'use strict';

/**
 * Change Ownership
 * @param {org.example.milkblockchain.ChangeOwnership} input_data
 * @transaction
 */
function changeOwnership(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Milk';
    return getAssetRegistry(namespace)
        .then(function(milkRegistry){
            return milkRegistry.get(input_data.serialNo)
        .then(function(milk){
            console.log(milk.serialNo);
        });
    });
}