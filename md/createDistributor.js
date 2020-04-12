'use strict';

const namespace = 'org.example.milkblockchain'
const transactionType = 'CreateDistributor';
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
    var entityId="dis-002";
    let name = 'Collins Oduor'
    let cashInAccount = 2000;
    let region = 'A';
    let transaction = factory.newTransaction(namespace,transactionType,entityId);
    transaction.setPropertyValue('name', name);
    transaction.setPropertyValue('entityId', entityId);
    transaction.setPropertyValue('cashInAccount', cashInAccount);
    transaction.setPropertyValue('region', region);
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("Successful!!")
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}
