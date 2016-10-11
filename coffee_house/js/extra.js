var CoffeeHouse = CoffeeHouse || {};

(function (CoffeeHouse) {
    function Extra(url, element_query, form_query) {
        var extras = new Proxy({}, {
            set: function (target, id, extra) { createExtraElement(extra); },
            deleteProperty: function (target, id) { remove(id); }
        });
        var api = CoffeeHouse.Core.Ajax(url);
        var UI = {
            list: document.querySelector(element_query),
            form: document.querySelector(form_query),
            listeners: {
                form: formListener,
                add: addButtonListener,
                remove: removeButtonListener,
            },
        };

        UI.form.addEventListener('submit', UI.listeners.form);

        // NOTE (Emil): Get all existing data from the server.
        all();


        function all() {
            api.get()
                .then(addExtras)
                .catch(CoffeeHouse.Core.log);
        }

        function create(extra) {
            api.post(extra)
                .then(addExtras)
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
                data[input.name] = input.value;
            });

            create(data);
        }

        function addButtonListener() {

        }

        function removeButtonListener() {

        }

        function addExtras(data) {
            var objects = JSON.parse(data);

            objects.forEach(function (extra) {
                extras[extra.id] = extra;
            });
        }

        function removeExtra(id) {
            delete extras[id];
        }

        function createExtraElement(extra) {
            var listElement = document.createElement('li');
            var nameNode = document.createElement('p');
            var priceNode = document.createElement('p');
            var addButton = document.createElement('i');
            var removeButton = document.createElement('i');

            listElement.className = 'product';
            addButton.className = 'fa fa-cart-plus';
            removeButton.className = 'fa fa-times';

            nameNode.innerHTML = extra.name;
            priceNode.innerHTML = extra.price;

            listElement.dataset.extraId = extra.id;

            addButton.addEventListener('click', UI.listeners.add);
            removeButton.addEventListener('click', UI.listeners.remove);

            listElement.appendChild(nameNode);
            listElement.appendChild(priceNode);
            listElement.appendChild(addButton);
            listElement.appendChild(removeButton);

            UI.list.appendChild(listElement);
        }
    };

    CoffeeHouse.Extra = Extra;
})(CoffeeHouse);
