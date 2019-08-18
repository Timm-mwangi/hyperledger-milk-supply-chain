'use strict';

/**
 * Create Manufacturer
 * @param {org.example.milkblockchain.CreateManufacturer} createManufacturer
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';
function createManufacturer(input_data){
    let namespace = global_namespace + '.Manufacturer';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let manu_id = input_data.id;
            if(!(participantRegistry.exists(manu_id))){
                let manufacturer = factory.newResource(global_namespace, 'Manufacturer', manu_id);
                manufacturer.name = input_data.name;
                manufacturer.entityId = manu_id;
                manufacturer.cashInAccount = 1000;
                return participantRegistry.add(manufacturer);
            }else{
                console.log('Participant Already exists');
            }
        });          
}