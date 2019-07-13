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
var namespace = 'org.example.milkblockchain';
var manu = 0, dist = 0, ret = 0;

function createManufacturer(CreateManufacturer) {
    console.log('creating Manufacturer')
    let namespace = namespace + '.Manufacturer';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@milkblockchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let manufacturer = factory.newResource(namespace, Manufacturer, 'manu-'+manu);
        manufacturer.entityId = 'manu-'+manu;
        manu++;
        manufacturer.name = 'Collins Oduor';
        await participantRegistry.add(manufacturer);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

function createDistributor(){
    console.log('creating Distributor')
    let namespace = namespace + '.Distributor';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@milkblockchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let distributor = factory.newResource(namespace, Distributor, 'dist-'+dist);
        distributor.entityId = 'dist-'+dist;
        dist++;
        distributor.name = 'Dist One';
        await participantRegistry.add(manufacturer);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

function createRetailer(CreateRetailer){
    console.log('creating Retailer')
    let namespace = namespace + '.Retailer';
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@milkblockchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace);
        let factory = businessNetworkConnection.getFactory();
        let distributor = factory.newResource(namespace, Distributor, 'ret-'+ret);
        retailer.entityId = 'ret-'+ret;
        dist++;
        distributor.name = 'Dist One';
        await participantRegistry.add(manufacturer);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

function createMilk(CreateMilk){}

function createBatch(CreateBatch){}

function createOrder(CreateOrder){}

function sell(Sell){}

function deliver(Deliver){}

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

