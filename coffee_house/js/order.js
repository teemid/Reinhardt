var CoffeeHouse = CoffeeHouse || {};

(function (CoffeeHouse) {
    function Order(url, order_list_query, order_total_query) {
        var self = this;

        var order = new Proxy({ total: 0 }, {
            set: CoffeeHouse.Core.log,
            deleteProperty: CoffeeHouse.Core.log,
        });
        var api = CoffeeHouse.Core.Ajax(url);
        var UI = {
            list: document.querySelector(order_list_query),
            total: document.querySelector(order_total_query),
        };

        function add(product) {
            // NOTE (Emil): If the product is already in the order, increment the quantity.
            if (product.id in order) {
                order[product.id].quantity += 1;
            }
            else { // Else add the product with an initial quantity of 1.
                order[product.id] = { product: product, quantity: 1 };
            }

            updateTotal(order, product);
        }

        function remove(product) {
            var item = order[product.id];

            if (!item) { return; } // NOTE (Emil): We don't have an item, so do nothing.

            item.quantity -= 1;

            if (item.quantity == 0) {
                delete order[product.id];
            }
        }

        function updateTotal(order, product) {
            order.total += product.price;
        }

        function createOrderItem(product) {
            var orderItem = document.createElement('li');
            var orderName = document.createElement('p');
            var orderPrice = document.createElement('p');
            var removeButton = document.createElement('i');

            orderItem.dataset.productId = product.id;

            removeButton.className = 'fa fa-times';
            orderItem.className = 'order-item';

            orderName.innerHtml = product.name;

            orderItem.appendChild(orderName);
            orderItem.appendChild(orderPrice);
            orderItem.appendChild(removeButton);

            return orderItem;
        }

        return {
            add: add,
            remove: remove,
        };
    }

    CoffeeHouse.Order = Order;
})(CoffeeHouse);
