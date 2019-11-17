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
        .then(function(orderRegistry){
            console.log(orderRegistry);
            let factory = getFactory();
            let order_id = input_data.orderId;
            let order = factory.newResource(global_namespace, 'Order', order_id);
            console.log(JSON.stringify(order));
            order.orderId = order_id;
            order.quantity = input_data.quantity;
            order.orderStatus = 'PLACED'; 
            order.value = input_data.value;
            let manufacturer_id = input_data.manufacturer;
            let distributor_id = input_data.distributor;
            let retailer_id = input_data.retailer;
            let manufacturer = factory.newRelationship(global_namespace, 'Manufacturer', manufacturer_id);
            let retailer = factory.newRelationship(global_namespace, 'Retailer', retailer_id);
            let distributor = factory.newRelationship(global_namespace, 'Distributor', distributor_id);
            order.placedBy = retailer;
            order.takenBy = distributor;
            order.manufacturer = manufacturer;
            console.log(JSON.stringify(order));
            return orderRegistry.add(order);
        });
}
