/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.example.milkblockchain.SampleTransaction} sampleTransaction
 * @transaction
 */

 /*
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.milkblockchain.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.milkblockchain', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}

*/

//const { IdCard, CertificateUtil } = require('composer-common');
//const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
var global_namespace = 'org.example.milkblockchain';
//var manu = 0, dist = 0, ret = 0;

/**
 * 
 * @param {org.example.milkblockchain.CreateSysAdmin} transactionRequest 
 * @transaction
 */
function createAdmin(input_data){
    let namespace = global_namespace + '.SysAdmin';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let admin_id = input_data.id;
            if(!(participantRegistry.exists(admin_id))){
                let sysAdmin = factory.newResource(global_namespace, 'SysAdmin', admin_id);
                sysAdmin.name = input_data.name;
                sysAdmin.entityId = input_data.id;
                return participantRegistry.add(sysAdmin);
            }else{
                console.log('Denied');
            }
        });
}

/**
 * 
 * @param {org.example.milkblockchain.CreateManufacturer} transactionRequest 
 * @transaction
 */
function createManufacturer(input_data){
    let namespace = global_namespace + '.Manufacturer';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let manu_id = input_data.id;
            if(!(participantRegistry.exists(manu_id))){
                let manufacturer = factory.newResource(global_namespace, 'Manufacturer', manu_id);
                manufacturer.name = input_data.name;
                manufacturer.entityId = manu_id;
                manufacturer.cashInAccount = 1000;
                return participantRegistry.add(manufacturer);
            }else{
                console.log('Participant Already exists');
            }
        });          
}

/**
 * 
 * @param {org.example.milkblockchain.CreateDistributor} transactionRequest 
 * @transaction
 */
function createDistributor(input_data){
    let namespace = global_namespace + '.Distributor';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let dist_id = input_data.id;
            if(!(participantRegistry.exists(dist_id))){
                let distributor = factory.newResource(global_namespace, 'Distributor', dist_id);
                distributor.name = input_data.name;
                distributor.entityId = dist_id;
                distributor.cashInAccount = 500;
                return participantRegistry.add(distributor);
            }else{
                console.log('Participant Already exists');
            }
        });
}

/**
 * 
 * @param {org.example.milkblockchain.CreateRetailer} transactionRequest 
 * @transaction
 */
function createRetailer(input_data){
    let namespace = global_namespace + '.Retailer';
    return getParticipantRegistry(namespace)
        .then(function(participantRegistry){
            let factory = getFactory();
            let ret_id = input_data.id;
            if(!(participantRegistry.exists(ret_id))){
                let retailer = factory.newResource(global_namespace, 'Retailer', ret_id);
                retailer.name = input_data.name;
                retailer.id = ret_id;
                retailer.cashInAccount = 100;
                return participantRegistry.add(retailer);
            }else{
                console.log('Participant Already exists');
            }
        });
}

// Date.prototype.addDays = function(days) {
//     this.setDate(this.getDate() + parseInt(days));
//     return this;
// };

/**
 * 
 * @param {org.example.milkblockchain.CreateMilk} transactionRequest 
 * @transaction
 */
function createMilk(input_data){
    let namespace = global_namespace + '.Milk';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let milk_id = input_data.id;
            if(!(assetRegistry.exists(milk_id))){
                let milk = factory.newResource(global_namespace, 'Milk', milk_id);
                milk.serialNo = milk_id;
                milk.dateOfManufacture = input_data.dateOfManufacture;
                milk.dateOfExpiry = addDays(milk.dateOfMAnufacture);
                milk.batch = input_data.batchNo;
                return assetRegistry.add(milk);
            }else{
                comsole.log('Error: Denied');
            }
        });
}

/**
 * 
 * @param {org.example.milkblockchain.CreateBatch} transactionRequest 
 * @transaction
 */
function createBatch(input_data){
    let namespace = global_namespace + '.Batch';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let batch_id = input_data.id;
            if(!(assetRegistry.exists(batch_id))){
                let batch = factory.newResource(global_namespace, 'Batch', batch_id);
                batch.serialNo = batch_id;
                batch_distributor = input_data.distributor;
                assetRegistry.add(batch)
            }else{
                console.log('Not allowed');
            }
        });
}

/**
 * 
 * @param {org.example.milkblockchain.CreateOrder} transactionRequest 
 * @transaction
 */
function createOrder(input_data){
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let order_id = input_data.id;
            if(!(assetRegistry.exists(order_id))){
                let order = factory.newResource(global_namespace, 'Order', order_id);
                order.orderId = order_id;
                order.quantity = input_data.quantity;
                order.orderStatus = 'PLACED';
                order.value = input_data.value;
                order.placedBy = input_data.placedBy;
                order.takenBy = input_data.takenBy;
                assetRegistry.add(order);
            }else{
                console.log('Not allowed');
            }
        });
}

/**
 * 
 * @param {org.example.milkblockchain.Sell} transactionRequest 
 * @transaction
 */
function sell(input_data){
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            //let factory = getFactory();
            let dist_parts = getParticipantRegistry(global_namespace + '.Distributor');
            let manu_parts = getParticipantRegistry(global_namespace + '.Manufacturer');
            let order = assetRegistry.get(input_data.id);
            let dist = dist_parts.get(input_data.distributor);
            let manu = manu_parts.get(input_data.manufacturer);
            if(assetRegistry.exists(order_id)){
                dist.cashInAccount -= input_data.value;
                manu.cashInAccount += input_data.value;
                dist_parts.update(dist);
                manu_parts.update(manu);
            }else{
                console.log('Denied');
            }
        });
}

function deliver(input_data){
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let dist_parts = getParticipantRegistry(global_namespace + '.Distributor');
            let ret_parts = getParticipantRegistry(global_namespace + '.Retailer');
            let dist = dist_parts.get(input_data.distributor);
            let ret = ret_parts.get(input_data.retailer);
            if(assetRegistry.exists(input_data.id)){
                dist.cashInAccount += input_data.value;
                ret.cashInAccount -= input_data.value;
                dist_parts.update(dist);
                ret_parts.update(ret);
            }else{

            }
        });
}

// function createManufacturer(CreateManufacturer) {
//     console.log('creating Manufacturer')
//     let namespace = global_namespace + '.Manufacturer';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     try {
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
//         let factory = businessNetworkConnection.getFactory();
//         let manufacturer = factory.newResource(namespace, Manufacturer, 'manu-'+manu);
//         manufacturer.entityId = 'manu-'+manu;
//         manu++;
//         manufacturer.name = 'Collins Oduor';
//         manufacturer.cashInAccount = 100;
//         await participantRegistry.add(manufacturer);
//         await businessNetworkConnection.disconnect();
//     } catch(error) {
//         console.error(error);
//         process.exit(1);
//     }
// }

// function createDistributor(createDistributor){
//     console.log('creating Distributor')
//     let namespace = global_namespace + '.Distributor';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     try {
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
//         let factory = businessNetworkConnection.getFactory();
//         let distributor = factory.newResource(namespace, Distributor, 'dist-'+dist);
//         distributor.entityId = 'dist-'+dist;
//         dist++;
//         distributor.name = 'Dist One';
//         distributor.cashInAccount = 100;
//         await participantRegistry.add(manufacturer);
//         await businessNetworkConnection.disconnect();
//     } catch(error) {
//         console.error(error);
//         process.exit(1);
//     }
// }

// function createRetailer(CreateRetailer){
//     console.log('creating Retailer')
//     let namespace = global_namespace + '.Retailer';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     try {
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
//         let factory = businessNetworkConnection.getFactory();
//         let retailer = factory.newResource(namespace, Distributor, 'ret-'+ret);
//         retailer.entityId = 'ret-'+ret;
//         dist++;
//         retailer.name = 'Dist One';
//         retailer.cashInAccount = 100;
//         await participantRegistry.add(manufacturer);
//         await businessNetworkConnection.disconnect();
//     } catch(error) {
//         console.error(error);
//         process.exit(1);
//     }
// }

// function createMilk(CreateMilk){
//     console.log('New milk incoming');
//     let namespace = global_namespace + '.Milk';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     try{
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace);
//         let factory = businessNetworkConnection.getFactory();
//         let milk = factory.newResource(namespace, Milk, '001');
//         milk.serialNo = '001';
//         milk.dateOfManufacture = new Date().getDate();
//         Date.prototype.addDays = function(days) {
//             this.setDate(this.getDate() + parseInt(days));
//             return this;
//         };
//         milk.dateOfExpiry = dateOfManufacture.addDays(5);
//         milk.batch = 'batch-1';
//         await assetRegsitry.add(milk);
//         await businessNetworkConnection.disconnect();
//     }catch(error){
//         console.error(error);
//         process.exit(1);
//     }
// }

// function createBatch(CreateBatch){
//     let namespace = global_namespace + '.Batch';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     try{
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let assetRegistry = await businessNetworkConnection.getAssetRegistry(namaspace);
//         let factory = businessNetworkConnection.getFactory();
//         let batch = factory.newResource(namespace, Batch, 'batch-1');
//         batch.serialNo = 'batch-1';
//         batch.distributor = 'dist-1';
//         await assetRegistry.add(batch);
//         await businessNetworkConnection.disconnect();
//     }catch(error){
//         console.error(error);
//         process.exit(1);
//     }
// }

// function createOrder(CreateOrder){
//     let namespace = global_namespace + '.Order';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     try{
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let assetRegistry = await businessNetworkConnection.getAssetRegistry(namaspace);
//         let factory = businessNetworkConnection.getFactory();
//         let order = factory.newResource(namespace, Batch, 'order-1');
//         order.orderId = 'order-1';
//         order.quantity = 100;
//         order.orderStatus = 'PLACED';
//         order.value = order.quantity * 35;
//         order.placedBy = 'ret-1';
//         order.takenBy = 'dist-1';
//         await assetRegistry.add(order);
//         await businessNetworkConnection.disconnect();
//     }catch(error){
//         console.error(error);
//         process.exit(1);
//     }
// }

//sell transaction represents movement of assets from manu to dist
// function sell(Sell){
//     let namespace = global_namespace + '.Order';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     let businessNetConnForManu = new BusinessNetworkConnection();
//     let businessNetConnForDist = new BusinessNetworkConnection();
//     try{
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace);
//         await businessNetConnForManu.connect('admin@milkblockchain');
//         let manuParticipantRegistry = await businessNetConnForManu.getParticipantRegistry('org.example.milkblockchain.Manufacturer');
//         await businessNetConnForDist.connect('admin@milkblockchain');
//         let distParticipantRegistry = await businessNetConnForDist.getParticipantRegistry('org.example.milkblockchain.Distributor');
//         let order = assetRegistry.get('order-1');
//         let manufacturer = manuParticipantRegsitry.getAll();
//         let distributor = order.takenBy;
//         manufacturer.cashInAccount += order.value;
//         distributor.cashInAccount -= order.value;
//         await manuParticipantRegistry.update(manufacturer);
//         await distParticipantRegistry.update(distributor);
//         await businessNetworkConnection.disconnect();
//         await businessNetConnForDist.disconnect();
//         await businessNetConnForRet.disconnect();
//     }catch(error){
//         console.log(error);
//         process.exit(1);
//     }
// }

//delivery of milk from dist to ret
// function deliver(Deliver){
//     let namespace = global_namespace + '.Order';
//     let businessNetworkConnection = new BusinessNetworkConnection();
//     let businessNetConnForRet = new BusinessNetworkConnection();
//     let businessNetConnForDist = new BusinessNetworkConnection();
//     try{
//         await businessNetworkConnection.connect('admin@milkblockchain');
//         let assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace);
//         await businessNetConnForRet.connect('admin@milkblockchain');
//         let manuParticipantRegistry = await businessNetConnForRet.getParticipantRegistry('org.example.milkblockchain.Retailer');
//         await businessNetConnForDist.connect('admin@milkblockchain');
//         let distParticipantRegistry = await businessNetConnForDist.getParticipantRegistry('org.example.milkblockchain.Distributor');
//         let order = assetRegistry.get('order-1');
//         let retailer = order.placedBy;
//         let distributor = order.takenBy;
//         order.orderStatus = 'DELIVERED';
//         retailer.cashInAccount -= order.value;
//         distributor.cashInAccount += order.value;
//         await assetRegistry.update(order);
//         await manuParticipantRegistry.update(retailer);
//         await distParticipantRegistry.update(distributor);
//         await businessNetworkConnection.disconnect();
//         await businessNetConnForDist.disconnect();
//         await businessNetConnForRet.disconnect();
//     }catch(error){
//         console.log(error);
//         process.exit(1);
//     }
// }

function initNetwork(){
    createManufacturer();
    createDistributor();
    createRetailer();
}

function manufacturerTransactions(){
    createMilk();
    createBatch();
    sell();
}

function distributorTransactions(){
    deliver();
}

function retailerTransactions(){
    createOrder();
}

initNetwork();
createOrder();
manufacturerTransactions();
retailerTransactions();
distributorTransactions();
retailerTransactions();