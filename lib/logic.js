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
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
var global_namespace = 'org.example.milkblockchain';
var manu = 0, dist = 0, ret = 0;

function createManufacturer(CreateManufacturer) {
    console.log('creating Manufacturer')
    let namespace = global_namespace + '.Manufacturer';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@milkblockchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let manufacturer = factory.newResource(namespace, Manufacturer, 'manu-'+manu);
        manufacturer.entityId = 'manu-'+manu;
        manu++;
        manufacturer.name = 'Collins Oduor';
        manufacturer.cashInAccount = 100;
        await participantRegistry.add(manufacturer);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

function createDistributor(createDistributor){
    console.log('creating Distributor')
    let namespace = global_namespace + '.Distributor';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@milkblockchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let distributor = factory.newResource(namespace, Distributor, 'dist-'+dist);
        distributor.entityId = 'dist-'+dist;
        dist++;
        distributor.name = 'Dist One';
        distributor.cashInAccount = 100;
        await participantRegistry.add(manufacturer);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

function createRetailer(CreateRetailer){
    console.log('creating Retailer')
    let namespace = global_namespace + '.Retailer';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@milkblockchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let retailer = factory.newResource(namespace, Distributor, 'ret-'+ret);
        retailer.entityId = 'ret-'+ret;
        dist++;
        retailer.name = 'Dist One';
        retailer.cashInAccount = 100;
        await participantRegistry.add(manufacturer);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

function createMilk(CreateMilk){
    console.log('New milk incoming');
    let namespace = global_namespace + '.Milk';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try{
        await businessNetworkConnection.connect('admin@milkblockchain');
        let assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let milk = factory.newResource(namespace, Milk, '001');
        milk.serialNo = '001';
        milk.dateOfManufacture = new Date().getDate();
        Date.prototype.addDays = function(days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        milk.dateOfExpiry = dateOfManufacture.addDays(5);
        milk.batch = 'batch-1';
        await assetRegsitry.add(milk);
        await businessNetworkConnection.disconnect();
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

function createBatch(CreateBatch){
    let namespace = global_namespace + '.Batch';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try{
        await businessNetworkConnection.connect('admin@milkblockchain');
        let assetRegistry = await businessNetworkConnection.getAssetRegistry(namaspace);
        let factory = businessNetworkConnection.getFactory();
        let batch = factory.newResource(namespace, Batch, 'batch-1');
        batch.serialNo = 'batch-1';
        batch.distributor = 'dist-1';
        await assetRegistry.add(batch);
        await businessNetworkConnection.disconnect();
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

function createOrder(CreateOrder){
    let namespace = global_namespace + '.Order';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try{
        await businessNetworkConnection.connect('admin@milkblockchain');
        let assetRegistry = await businessNetworkConnection.getAssetRegistry(namaspace);
        let factory = businessNetworkConnection.getFactory();
        let order = factory.newResource(namespace, Batch, 'order-1');
        order.orderId = 'order-1';
        order.quantity = 100;
        order.orderStatus = 'PLACED';
        order.value = order.quantity * 35;
        order.placedBy = 'ret-1';
        order.takenBy = 'dist-1';
        await assetRegistry.add(order);
        await businessNetworkConnection.disconnect();
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

//sell transaction represents movement of assets from manu to dist
function sell(Sell){
    let namespace = global_namespace + '.Order';
    let businessNetworkConnection = new BusinessNetworkConnection();
    let businessNetConnForManu = new BusinessNetworkConnection();
    let businessNetConnForDist = new BusinessNetworkConnection();
    try{
        await businessNetworkConnection.connect('admin@milkblockchain');
        let assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace);
        await businessNetConnForManu.connect('admin@milkblockchain');
        let manuParticipantRegistry = await businessNetConnForManu.getParticipantRegistry('org.example.milkblockchain.Manufacturer');
        await businessNetConnForDist.connect('admin@milkblockchain');
        let distParticipantRegistry = await businessNetConnForDist.getParticipantRegistry('org.example.milkblockchain.Distributor');
        let order = assetRegistry.get('order-1');
        let manufacturer = manuParticipantRegsitry.getAll();
        let distributor = order.takenBy;
        manufacturer.cashInAccount += order.value;
        distributor.cashInAccount -= order.value;
        await manuParticipantRegistry.update(manufacturer);
        await distParticipantRegistry.update(distributor);
        await businessNetworkConnection.disconnect();
        await businessNetConnForDist.disconnect();
        await businessNetConnForRet.disconnect();
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

//delivery of milk from dist to ret
function deliver(Deliver){
    let namespace = global_namespace + '.Order';
    let businessNetworkConnection = new BusinessNetworkConnection();
    let businessNetConnForRet = new BusinessNetworkConnection();
    let businessNetConnForDist = new BusinessNetworkConnection();
    try{
        await businessNetworkConnection.connect('admin@milkblockchain');
        let assetRegistry = await businessNetworkConnection.getAssetRegistry(namespace);
        await businessNetConnForRet.connect('admin@milkblockchain');
        let manuParticipantRegistry = await businessNetConnForRet.getParticipantRegistry('org.example.milkblockchain.Retailer');
        await businessNetConnForDist.connect('admin@milkblockchain');
        let distParticipantRegistry = await businessNetConnForDist.getParticipantRegistry('org.example.milkblockchain.Distributor');
        let order = assetRegistry.get('order-1');
        let retailer = order.placedBy;
        let distributor = order.takenBy;
        order.orderStatus = 'DELIVERED';
        retailer.cashInAccount -= order.value;
        distributor.cashInAccount += order.value;
        await assetRegistry.update(order);
        await manuParticipantRegistry.update(retailer);
        await distParticipantRegistry.update(distributor);
        await businessNetworkConnection.disconnect();
        await businessNetConnForDist.disconnect();
        await businessNetConnForRet.disconnect();
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

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
manufacturerTransactions();
retailerTransactions();
distributorTransactions();
retailerTransactions();