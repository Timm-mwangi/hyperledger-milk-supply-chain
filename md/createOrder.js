'use strict';

const namespace = "org.example.milkblockchain"; 
const transactionType = "CreateOrder";
 
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
     let orderId = 'order-001';
     let quantity = 20;
     let value = quantity * 50;
     let placedBy_id = 'ret-001';
     let takenBy_id = 'dis-001';
     let manufacturer_id = 'man-001'; 
 
     let placedBy = factory.newRelationship(namespace, 'Retailer', placedBy_id);
     let takenBy = factory.newRelationship(namespace, 'Distributor', takenBy_id);
     let manufacturer = factory.newRelationship(namespace, 'Manufacturer', manufacturer_id);

     let transaction = factory.newTransaction(namespace,transactionType,orderId);
    transaction.setPropertyValue('orderId', orderId);
     transaction.setPropertyValue('quantity', quantity);
     transaction.setPropertyValue('value', value);
     transaction.setPropertyValue('placedBy', placedBy);
     transaction.setPropertyValue('takenBy', takenBy);
     transaction.setPropertyValue('manufacturer', manufacturer);
 
     // 6. Submit the transaction
     return connectionProfile.connection.submitTransaction(transaction).then(()=>{
         console.log("6. Transaction Submitted/Processed Successfully!!")
 
         connectionProfile.disconnect();
 
     }).catch((error)=>{
         console.log(error);
 
         connectionProfile.disconnect();
     });
 }
 
 