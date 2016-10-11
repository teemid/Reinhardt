var CoffeeHouse = CoffeeHouse || {};

(function (CoffeeHouse) {
    function Order(url, order_list_query, order_total_query) {
        var self = this;

        var order = new Proxy({ total: 0 }, {
            set: function (target, property, value) {
                if (value.product) {
                    var product = value.product;
                    var orderLineElement = UI.list.querySelector(['[data-order-line-id="' + product.id +'"']);

                    orderLineElement ? updateOrderLine(orderLineElement, product.price, product.quantity) : addElement(value);
                }

                target[property] = value;
            },
            deleteProperty: function (target, property) {
                delete target[property];
            },
        });
        var api = CoffeeHouse.Ajax(url);
        var UI = {
            list: document.querySelector(order_list_query),
            total: document.querySelector(order_total_query),
            listeners: {
                remove: CoffeeHouse.Core.log
            }
        };

        function construct() {

        }

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

        function addElement(orderLine) {
            var element = createOrderItem(orderLine);
            element.dataset.orderLineId = orderLine.product.id;
            UI.list.appendChild(element);
        }

        function removeElement(product) {

        }

        function updateOrderLine(element, price, quantity) {
            price = parseInt(price);
            quantity = parseInt(quantity);

            console.log(price, quantity);
            var orderLineQuantity = element.querySelector('order-line-quantity');
            var orderLineTotal = element.querySelector('order-line-total');

            orderLineQuantity.innerHTML = quantity;
            orderLineTotal.innerHTML = price * quantity;

            updateTotal(price);
        }

        function updateTotal(price) {
            console.log(price);
            order.total += price;

            UI.total.innerHTML = order.total;
        }

        function createOrderItem(orderLine) {
            var quantity = orderLine.quantity;
            var product = orderLine.product;

            var orderLineElement = CoffeeHouse.DOM.createElement('li', { class: 'list-item order-line' });
            var name             = CoffeeHouse.DOM.createParagraph('order-line-name', product.name);
            var quantity         = CoffeeHouse.DOM.createParagraph('order-line-quantity', quantity);
            var total            = CoffeeHouse.DOM.createParagraph('order-line-total', product.price);
            var removeButton     = CoffeeHouse.DOM.createElement('i', { class: 'order-line-remove-button fa fa-times' });

            CoffeeHouse.DOM.append(orderLineElement, [name, quantity, total, removeButton]);

            return orderLineElement;
        }

        return {
            add: add,
            remove: remove,
        };
    }

    CoffeeHouse.Order = Order;
})(CoffeeHouse);
