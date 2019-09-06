'use strict';
/**
 * Create Order
 * @param {org.example.milkblockchain.CreateOrder} input_data 
 * @transaction
 */
function createOrder(input_data){
    let global_namespace = 'org.example.milkblockchain';
    let namespace = global_namespace + '.Order';
    return getAssetRegistry(namespace)
        .then(function(assetRegistry){
            let factory = getFactory();
            let order_id = input_data.orderId;
            let order = factory.newResource(global_namespace, 'Order', order_id);
            order.orderId = order_id;
            order.quantity = input_data.quantity;
            order.orderStatus = 'PLACED';
            order.value = input_data.value;
            let manufacturer = factory.newRelationship(global_namespace, 'Manufacturer', input_data.manufacturer);
            let retailer = factory.newRelationship(global_namespace, 'Retailer', input_data.retailer);
            let distributor = factory.newRelationship(global_namespace, 'Distributor', input_data.distributor);
            order.placedBy = retailer;
            order.takenBy = distributor;
            order.manufacturer = manufacturer;
            return assetRegistry.add(order);
        });
}