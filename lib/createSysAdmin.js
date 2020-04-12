'use strict';

/**
 * Create Admin
 * @param {org.example.milkblockchain.CreateSysAdmin} createAdmin 
 * @transaction
 */
function createSysAdmin(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.SysAdmin';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let admin_id = input_data.entityId;
            let sysAdmin = factory.newResource(global_namespace, 'SysAdmin', admin_id);
            sysAdmin.name = input_data.name;
            sysAdmin.entityId = input_data.entityId;
            return participantRegistry.add(sysAdmin);
        });
}