var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function Order(url, order_list_query, order_total_query, hidden_total_query) {
        var self = this;

        var order = new Proxy({ total: 0 }, {
            set: function (target, property, value) {
                if (value.product) {
                    addElement(value);
                }

                target[property] = value;
            },
            deleteProperty: function (target, property) {
                removeElement(order[property]);

                delete target[property];
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
            UI.hiddenTotal = document.querySelector(hidden_total_query);

            UI.form.addEventListener('submit', UI.listeners.form);

            updateTotal(0);
        }

        function key(type, product) {
            return type + '-' + product.id;
        }

        function add(type, product) {
            var _key = key(type, product);
            // NOTE (Emil): If the product is already in the order, increment the quantity.
            if (_key in order) {
                var element = UI.form.querySelector('[data-order-line-id="' + _key + '"]');
                var orderLine = order[_key];
                orderLine.quantity += 1;

                updateOrderLine(element, orderLine.product.price, orderLine.quantity);
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

            UI.form.insertBefore(element, UI.sentinel);

            updateTotal(parseInt(orderLine.product.price));
        }

        function updateOrderLine(element, price, quantity) {
            price = parseInt(price);
            quantity = parseInt(quantity);

            var orderLineQuantity = element.querySelector('.order-line-quantity');
            var orderLineHiddenQuantity = element.querySelector('.order-line-hidden-quantity');
            var orderLineTotal = element.querySelector('.order-line-total');
            var orderLineHiddenTotal = element.querySelector('.order-line-hidden-total');

            orderLineQuantity.innerHTML = quantity;
            orderLineHiddenQuantity.value = quantity;
            orderLineTotal.innerHTML = price * quantity;
            orderLineHiddenTotal.value = price * quantity;

            updateTotal(price);
        }

        function updateTotal(price) {
            order.total += price;

            UI.total.innerHTML = order.total;
            UI.hiddenTotal.value = order.total;
        }

        function removeElement(orderLine) {
            var quantity = parseInt(orderLine.quantity);
            var price = parseInt(orderLine.product.price);
            var query = '[data-order-line-id="' + key(orderLine.type, orderLine.product) + '"]';
            var element = UI.form.querySelector(query);

            UI.form.removeChild(element);

            updateTotal(-(quantity * price));
        }

        function formListener(event) {
            event.preventDefault();

            var inputs = UI.form.querySelectorAll('input');
            var inputs = Array.prototype.slice.call(inputs);

            inputs.forEach(function (input) {
                console.log(input);
            });
        }

        function removeButtonListener(event) {
            var item = event.target.parentElement;
            var id = item.dataset.orderLineId;

            delete order[id];
        }

        function createOrderItem(orderLine) {
            var quantity = orderLine.quantity;
            var product = orderLine.product;

            var row            = CoffeeHouse.DOM.createElement('div', { class: 'row order-line' });
            var name           = CoffeeHouse.DOM.createParagraph('order-line-name', product.name);
            var total          = CoffeeHouse.DOM.createParagraph('order-line-total', product.price);
            var quantity       = CoffeeHouse.DOM.createParagraph('order-line-quantity', quantity);

            var hiddenTotal    = CoffeeHouse.DOM.createInput('hidden', parseInt(product.price), { class: 'order-line-hidden-total' });
            var hiddenQuantity = CoffeeHouse.DOM.createInput('hidden', parseInt(quantity), { class: 'order-line-hidden-quantity' });

            var removeButton   = CoffeeHouse.DOM.createElement('i', { class: 'order-line-remove-button fa fa-times' });

            hiddenTotal.setAttribute('name', 'total-' + product.id);
            hiddenQuantity.setAttribute('name', 'quantity-' + product.id);

            removeButton.addEventListener('click', UI.listeners.remove);

            CoffeeHouse.DOM.append(row, [name, quantity, total, hiddenTotal, hiddenQuantity, removeButton]);

            return row;
        }

        return {
            add: add,
            remove: remove,
        };
    }

    CoffeeHouse.Order = Order;
})(CoffeeHouse);
