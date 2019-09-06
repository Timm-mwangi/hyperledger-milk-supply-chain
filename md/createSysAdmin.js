'use strict';
/**
 
 * Pre-Req
 * 1. Start the fabric
 * 2. Deploy & start land network
 * 3. Start the REST Server
 *     
 *    composer-rest-server -c admin@milk_blockchain -n never -u true -w true
 * 

 * 
 * Demo Steps
 * 1. Use the bn-connection-util to create the connection to landsys01
 * 2. Get the Busines Network Definition from Runtime
 * 3. Get the factory from the Business Network definition
 * 4. Create a new Transaction instance
 * 5. Set the property values in the transaction object
 * 6. Submit the transaction
 **/



 // Constant values - change as per your needs
 //const NS1= "org.land.landsys.landparcel";
const namespace = 'org.example.milkblockchain'
 //const NS2="org.land.landsys.participant";
const transactionType = 'CreateSysAdmin';

// 1. Connect to landsys01
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();
    
    // let options = {
    //     generate: false,
    //     includeOptionalFields: false
    // }
    
    var entityId='adm-001';
    let name = 'Collins Oduor'
    let transaction = factory.newTransaction(namespace,transactionType,entityId);//look at newTransaction()  parameters,let and var

    //let participantid="paricipant1";//existing participant id in the system
    //var rlshp=factory.newRelationship(NS2,'LANDSYSClient',participantid);
    //parcel.rlshp=rlshp;

    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('name', name);
    transaction.setPropertyValue('entityId', entityId);
    
    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}
