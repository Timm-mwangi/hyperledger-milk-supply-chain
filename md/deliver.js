'use strict';

const namespace = "org.example.milkblockchain"; 
const transactionType = "Deliver";
 
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
    
    let delivery_id = 'del-001';
    let order_id = 'order-001';
    //let milk_id = 'milk-001';
    let order = factory.newRelationship(namespace, 'Order', order_id);
    //let milk = factory.newRelationship(namespace, 'Milk', milk_id);
    
    let transaction = factory.newTransaction(namespace, transactionType, delivery_id);

    transaction.setPropertyValue('order', order);
    //transaction.setPropertyValue('milk', milk);
 
    // 6. Submit the transaction
    return connectionProfile.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")
        connectionProfile.disconnect();
     }).catch((error)=>{
         console.log(error);
         connectionProfile.disconnect();
     });
 }