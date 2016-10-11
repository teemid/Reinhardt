var CoffeeHouse = CoffeeHouse || {};

(function (CoffeeHouse) {
    function Order(url, order_list_query, order_total_query) {
        var self = this;


        var order = new Proxy({ total: 0 }, {
            set: function (target, property, value) {

            },
            deleteProperty: function (target, property) {

            }
        });
        var api = CoffeeHouse.Core.Ajax(url);
        var UI = {
            list: document.querySelector(order_list_query),
            total: document.querySelector(order_total_query),
            set: SetHandler,
        };

        function add(product) {
            if (product.id in order) {
                order[product.id].quantity += 1;
            }
            else {
                order[product.id] = { product: product, quantity: 1 };
            }

            updateTotal(order);
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

            UI.list.appendChild(orderItem);
        }

        function SetHandler(obj, property, value) {
            console.log(obj, property, value);
        }

        return {
            add: add
        }
    }

    CoffeeHouse.Order = Order;
})(CoffeeHouse);
