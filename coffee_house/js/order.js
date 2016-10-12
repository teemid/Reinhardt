var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function Order(url, order_list_query, order_total_query) {
        var self = this;

        var order = new Proxy({ total: 0 }, {
            set: function (target, property, value) {
                console.log(target, property, value);

                if (value.product) {
                    addElement(value);
                }

                if (property === 'quantity') {
                    var queryString = '[data-order-line-id="' + key(value.type, product) +'"]';
                    var orderLineElement = UI.list.querySelector(queryString);
                    updateOrderLine(orderLineElement, product.price, product.quantity);
                }

                target[property] = value;
            },
            deleteProperty: function (target, property) {
                console.log(target, property);

                delete target[property];
            },
        });
        var api = CoffeeHouse.Ajax(url);
        var UI = {
            list: document.querySelector(order_list_query),
            total: document.querySelector(order_total_query),
            listeners: {
                remove: removeButtonListener
            }
        };

        function construct() {

        }

        function key(type, product) {
            return type + '-' + product.id;
        }

        function add(type, product) {
            console.log('add: ', product);
            // NOTE (Emil): If the product is already in the order, increment the quantity.
            if (product.id in order) {
                order[key(type, product)].quantity += 1;
            }
            else { // Else add the product with an initial quantity of 1.
                order[key(type, product)] = { product: product, quantity: 1, type: type };
            }
        }

        function remove(product) {
            var item = order[product.id];

            if (item) {
                delete order[product.id];
            }
        }

        function addElement(orderLine) {
            var element = createOrderItem(orderLine);
            element.dataset.orderLineId = key(orderLine.type, orderLine.product);
            UI.list.appendChild(element);

            updateTotal(parseInt(orderLine.product.price));
        }

        function removeElement(product) {

        }

        function removeButtonListener(event) {
            var item = event.target.parentElement;
            var id = item.dataset.dataOrderLineId;
        }

        function updateOrderLine(element, price, quantity) {
            console.log(element, price, quantity);
            price = parseInt(price);
            quantity = parseInt(quantity);

            console.log(price, quantity);
            var orderLineQuantity = element.querySelector('order-line-quantity');
            var orderLineTotal = element.querySelector('order-line-total');

            orderLineQuantity.innerHTML = quantity;
            orderLineTotal.innerHTML = price * quantity;

            console.log(price);
            updateTotal(price);
        }

        function updateTotal(price) {
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
