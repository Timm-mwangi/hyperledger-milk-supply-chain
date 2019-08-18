'use strict';

/**
 * Create Retailer
 * @param {org.example.milkblockchain.CreateRetailer} createReatailer
 * @transaction
 */

var global_namespace = 'org.example.milkblockchain';
function createRetailer(input_data){
    let namespace = global_namespace + '.Retailer';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let ret_id = input_data.id;
            if(!(participantRegistry.exists(ret_id))){
                let retailer = factory.newResource(global_namespace, 'Retailer', ret_id);
                retailer.name = input_data.name;
                retailer.id = ret_id;
                retailer.cashInAccount = 100;
                return participantRegistry.add(retailer);
            }else{
                console.log('Participant Already exists');
            }
        });
}