'use strict';

const namespace = "org.example.milkblockchain"; 
const transactionType = "Sell";
 
var connectionProfile = require('./bn-connection-util');
connectionProfile.connect(main);
function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }
    let bnDef =  connectionProfile.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                    bnDef.getName(),"  ",bnDef.getVersion());
    let factory = bnDef.getFactory();
    let sell_id = 'sell-001';
    let order_id = 'order-001';
 
    let order = factory.newRelationship(namespace, 'Order', order_id);
    
    let transaction = factory.newTransaction(namespace,transactionType,sell_id);

    transaction.setPropertyValue('order', order);
 
    return connectionProfile.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")
        connectionProfile.disconnect();
    }).catch((error)=>{
        console.log(error);
        connectionProfile.disconnect();
    });
}