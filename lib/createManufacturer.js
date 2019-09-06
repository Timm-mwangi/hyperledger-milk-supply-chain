'use strict';

/**
 * Create Manufacturer
 * @param {org.example.milkblockchain.CreateManufacturer} input_data
 * @transaction
 */
function createManufacturer(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Manufacturer';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let entityId = input_data.entityId;
            let manufacturer = factory.newResource(global_namespace, 'Manufacturer', entityId);
            manufacturer.entityId = input_data.entityId;
            manufacturer.name = input_data.name;
            manufacturer.cashInAccount = input_data.cashInAccount;
            return participantRegistry.add(manufacturer);
        });
}