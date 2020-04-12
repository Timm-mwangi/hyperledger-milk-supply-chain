'use strict';

const namespace = "org.example.milkblockchain"; 
const transactionType = "CreateBatch";

let connectionProfile = require('./bn-connection-util');
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

     let batchNo = "bat-001";
     let distributor_id = 'dis-002'
     let distributor = factory.newRelationship(namespace,'Distributor',distributor_id);
 
     let transaction = factory.newTransaction(namespace, transactionType, batchNo);
 
     transaction.setPropertyValue('batchNo', batchNo);
     transaction.setPropertyValue('dist', distributor);
 
     return connectionProfile.connection.submitTransaction(transaction).then(()=>{
         console.log("6. Transaction Submitted/Processed Successfully!!")
 
         connectionProfile.disconnect();
     }).catch((error)=>{
         console.log(error);
 
         connectionProfile.disconnect();
     });
 }
 
 