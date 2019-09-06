'use strict';

 const namespace = "org.example.milkblockchain"; 
 const transactionType = "CreateMilk";
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
     let serialNo = 'milk-001';
     let dateOfManufacture = new Date('2019-08-20');
     let dateOfExpiry = new Date('2019-08-25');
     let batchNo = 'bat-001';
     let batch = factory.newRelationship(namespace, 'Batch', batchNo);

     let transaction = factory.newTransaction(namespace,transactionType,serialNo);
     transaction.setPropertyValue('serialNo', serialNo);
     transaction.setPropertyValue('dateOfManufacture', dateOfManufacture);
     transaction.setPropertyValue('dateOfExpiry', dateOfExpiry);
     transaction.setPropertyValue('batch', batch);

     return connectionProfile.connection.submitTransaction(transaction).then(()=>{
         console.log("6. Transaction Submitted/Processed Successfully!!")
         connectionProfile.disconnect();
     }).catch((error)=>{
         console.log(error);
         connectionProfile.disconnect();
     });
 }
 
 