'use strict';
const namespace = 'org.example.milkblockchain'
const transactionType = 'CreateSysAdmin';
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
    var entityId='adm-001';
    let name = 'Collins Oduor'
    let transaction = factory.newTransaction(namespace,transactionType,entityId);
    transaction.setPropertyValue('name', name);
    transaction.setPropertyValue('entityId', entityId);
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}
