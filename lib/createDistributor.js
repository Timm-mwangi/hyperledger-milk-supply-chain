'use strict';

/**
 * Create Distributor
 * @param {org.example.milkblockchain.CreateDistributor} input_data
 * @transaction
 */
function createDistributor(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Distributor';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let entityId = input_data.entityId;
            let distributor = factory.newResource(global_namespace, 'Distributor', entityId);
            distributor.entityId = input_data.entityId;
            distributor.name = input_data.name;
            distributor.cashInAccount = input_data.cashInAccount;
            distributor.region = input_data.region;
            return participantRegistry.add(distributor);
        });
}