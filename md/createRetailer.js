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

const namespace = 'org.example.milkblockchain';
const transactionType = 'CreateRetailer';

// 1. Connect to network
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());
    let factory = bnDef.getFactory();
    var entityId='ret-001';
    let name = 'Collins Oduor';
    let transaction = factory.newTransaction(namespace,transactionType,entityId);
    transaction.setPropertyValue('name', name);
    transaction.setPropertyValue('entityId', entityId);
    transaction.setPropertyValue('cashInAccount', 2000);
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}
