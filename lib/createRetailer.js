'use strict';

/**
 * Create Retailer
 * @param {org.example.milkblockchain.CreateRetailer} createReatailer
 * @transaction
 */
function createRetailer(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Retailer';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let entity_id = input_data.entityId;
            let retailer = factory.newResource(global_namespace, 'Retailer', entity_id);
            retailer.entityId = entity_id;
            retailer.name = input_data.name;
            // retailer.cashInAccount = input_data.cashInAccount;
            // retailer.region = input_data.region;
            return participantRegistry.add(retailer);
        });
}