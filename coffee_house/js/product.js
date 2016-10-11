var CoffeeHouse = CoffeeHouse || {};

(function (CoffeeHouse) {
    function Product(url, element_query, form_query) {
        var self = this;

        var products = new Proxy({}, {
            set: function (target, property, product) { createListElement(product); },
            deleteProperty: function (target, productId) { remove(productId); }
        });
        var api = CoffeeHouse.Core.Ajax(url);
        var UI = {
            list: document.querySelector(element_query),
            form: document.querySelector(form_query),
            listeners: {
                form: formListener,
                add: addButtonListener,
                remove: removeButtonListener,
            }
        };

        UI.form.addEventListener('submit', UI.listeners.form);

        // NOTE (Emil): Get all existing data from the server.
        all();

        function all() {
            api.get()
                .then(addProducts)
                .catch(CoffeeHouse.Core.log);
        }

        function create(product) {
            api.post(product)
                .then(CoffeeHouse.Core.log)
                .catch(CoffeeHouse.Core.log);
        }

        function remove(id) {
            api.delete(id)
                .then(CoffeeHouse.Core.log)
                .catch(CoffeeHouse.Core.log);
        }

        function formListener(event) {
            event.preventDefault();

            var inputs = Array.prototype.slice.call(UI.form.querySelectorAll('input'), 0);
            var data = {};

            inputs.forEach(function (input) {
                data[input.name] = input.type == 'checkbox' ? input.checked : input.value;
            });

            create(data);
        }

        function addButtonListener(event) {
            console.log(event);
            // NOTE (Emil): Need to talk to order here.
        }

        function removeButtonListener(event) {
            var product = event.target.parentElement;
            var productId = product.dataset.productId;

            removeProducts(productId);
        }

        function addProducts(data) {
            var objects = JSON.parse(data);

            objects.forEach(function (product) {
                products[product.id] = product;
            });
        }

        function removeProducts(id) {
            delete products[id];
        }

        function createListElement(product) {
            var listElement = document.createElement('li');
            var nameNode = document.createElement('p');
            var priceNode = document.createElement('p');
            var addButton = document.createElement('i');
            var removeButton = document.createElement('i');

            listElement.className = 'product';
            addButton.className = 'fa fa-cart-plus';
            removeButton.className = 'fa fa-times';

            nameNode.innerHTML = product.name;
            priceNode.innerHTML = product.price;

            listElement.dataset.productId = product.id;

            addButton.addEventListener('click', UI.listeners.add);
            removeButton.addEventListener('click', UI.listeners.remove);

            listElement.appendChild(nameNode);
            listElement.appendChild(priceNode);
            listElement.appendChild(addButton);
            listElement.appendChild(removeButton);

            UI.list.appendChild(listElement);
        }
    }

    CoffeeHouse.Product = Product;
})(CoffeeHouse);
