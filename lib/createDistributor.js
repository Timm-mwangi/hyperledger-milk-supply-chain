'use strict';

/**
 * Create Distributor
 * @param {org.example.milkblockchain.CreateDistributor} createDistributor
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';
function createDistributor(input_data){
    let namespace = global_namespace + '.Distributor';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let dist_id = input_data.id;
            if(!(participantRegistry.exists(dist_id))){
                let distributor = factory.newResource(global_namespace, 'Distributor', dist_id);
                distributor.name = input_data.name;
                distributor.entityId = dist_id;
                distributor.cashInAccount = 500;
                return participantRegistry.add(distributor);
            }else{
                console.log('Participant Already exists');
            }
        });
}