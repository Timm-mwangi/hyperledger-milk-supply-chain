'use strict';
/**
 * Create Batch
 * @param {org.example.milkblockchain.CreateBatch} input_data
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';
function createBatch(input_data){
    let namespace = global_namespace + '.Batch';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let batch_id = input_data.id;
            if(!(assetRegistry.exists(batch_id))){
                let batch = factory.newResource(global_namespace, 'Batch', batch_id);
                batch.serialNo = batch_id;
                batch_distributor = input_data.distributor;
                assetRegistry.add(batch)
            }else{
                console.log('Not allowed');
            }
        });
}