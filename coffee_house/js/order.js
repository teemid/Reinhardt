var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function Order(url, order_list_query, order_total_query) {
        var self = this;

        var order = new Proxy({ beverage: {}, extra: {}, total: 0 }, {
            set: function (target, property, value) {
                if (value.product) {
                    addElement(value);
                }

                target[property] = value;
            },
            deleteProperty: function (target, property) {
                var prop = property.split('-');
                var type = prop[0];
                var id = prop[1];

                if (type === 'beverage' || type === 'extra') {
                    var orderLine = order[type][id];

                    removeElement(property, orderLine);

                    delete target[type][id];
                }
                else
                {
                    delete target[property];
                }
            },
        });
        var api = CoffeeHouse.Ajax(url);
        var UI = {
            list: null,
            total: null,
            sentinel: null,
            listeners: {
                form: formListener,
                remove: removeButtonListener
            }
        };

        construct();

        function construct() {
            UI.form     = document.querySelector(order_list_query);
            UI.total    = document.querySelector(order_total_query);
            UI.sentinel = document.querySelector('.order-sentinel');

            UI.form.addEventListener('submit', UI.listeners.form);

            updateTotal(0);
        }

        function key(type, product) {
            return type + '-' + product.id;
        }

        function add(type, product) {
            var products = order[type];
            var _key = key(type, product);
            // NOTE (Emil): If the product is already in the order, increment the quantity.
            if (product.id in products) {
                var element = UI.form.querySelector('[data-order-line-id="' + _key + '"]');
                var orderLine = order[type][product.id];
                orderLine.quantity += 1;

                updateOrderLine(element, type, orderLine);
            }
            else { // Else add the product with an initial quantity of 1.
                order[type][product.id] = { product: product, quantity: 1 };

                addElement(type, order[type][product.id]);
            }
        }

        function remove(product) {
            var item = order[product.id];

            if (item) {
                delete order[product.id];
            }
        }

        function addElement(type, orderLine) {
            var element = createOrderItem(type, orderLine);
            element.dataset.orderLineId = key(type, orderLine.product);

            UI.form.insertBefore(element, UI.sentinel);

            updateTotal(parseInt(orderLine.product.price));
        }

        function updateOrderLine(element, type, orderLine) {
            price = parseInt(orderLine.product.price);
            quantity = parseInt(orderLine.quantity);

            var orderLineQuantity = element.querySelector('.order-line-quantity');
            var orderLineTotal = element.querySelector('.order-line-total');

            orderLineQuantity.innerHTML = quantity;
            orderLineTotal.innerHTML = price * quantity;

            updateTotal(price);
        }

        function updateTotal(price) {
            order.total += price;

            UI.total.innerHTML = order.total;
        }

        function removeElement(key, orderLine) {
            var quantity = parseInt(orderLine.quantity);
            var price = parseInt(orderLine.product.price);
            var query = '[data-order-line-id="' + key + '"]';
            var element = UI.form.querySelector(query);

            UI.form.removeChild(element);

            updateTotal(-(quantity * price));
        }

        function formListener(event) {
            event.preventDefault();

            api.post(order)
                .then(CoffeeHouse.Core.log)
                .catch(CoffeeHouse.Core.log);
        }

        function removeButtonListener(event) {
            var item = event.target.parentElement;
            var id = item.dataset.orderLineId;

            delete order[id];
        }

        function createOrderItem(type, orderLine) {
            var quantity = orderLine.quantity;
            var product = orderLine.product;

            var row            = CoffeeHouse.DOM.createElement('div', { class: 'row order-line' });
            var name           = CoffeeHouse.DOM.createParagraph('order-line-name', product.name);
            var total          = CoffeeHouse.DOM.createParagraph('order-line-total', product.price);
            var quantity       = CoffeeHouse.DOM.createParagraph('order-line-quantity', quantity);
            var removeButton   = CoffeeHouse.DOM.createElement('i', { class: 'order-line-remove-button fa fa-times' });

            removeButton.addEventListener('click', UI.listeners.remove);

            CoffeeHouse.DOM.append(row, [name, quantity, total, removeButton]);

            return row;
        }

        return {
            add: add,
            remove: remove,
        };
    }

    CoffeeHouse.Order = Order;
})(CoffeeHouse);
