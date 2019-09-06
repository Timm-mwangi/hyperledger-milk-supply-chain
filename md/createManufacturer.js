'use strict';

const namespace = "org.example.milkblockchain";
const transactionType = "CreateManufacturer";
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);
function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("Running: ",
                   bnDef.getName(),"  ",bnDef.getVersion());
    let factory = bnDef.getFactory();    
    var entityId='man-002';
    let name = 'Collins Oduor';
    let cashInAccount = 5000;
    let transaction = factory.newTransaction(namespace, transactionType, entityId);
    transaction.setPropertyValue('name', name);
    transaction.setPropertyValue('entityId', entityId);
    transaction.setPropertyValue('cashInAccount', cashInAccount);
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("Successful!!")
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}
