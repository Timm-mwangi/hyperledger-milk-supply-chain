'use strict';
/**
 * Create Batch
 * @param {org.example.milkblockchain.CreateBatch} input_data
 * @transaction
 */
function createBatch(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Batch';
    return getAssetRegistry(namespace)
        .then(function(batchRegistry){
            let factory = getFactory();
            let batch_id = input_data.batchNo;
            let batch = factory.newResource(global_namespace, 'Batch', batch_id);
            // let distributor = factory.newRelationship(global_namespace,'Distributor', input_data);
            batch.batchNo = batch_id;
            // batch.distributor = distributor;
            return batchRegistry.add(batch);
        });    
}