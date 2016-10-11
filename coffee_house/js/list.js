var CoffeeHouse = CoffeeHouse || {};

(function (CoffeeHouse) {
    function List(url, list_query, form_query) {
        var self = this;

        var list = new Proxy({}, {
            set: function (target, property, data) { var element = createElement(data); UI.list.appendChild(element); },
            deleteProperty: function (target, data) { remove(data); }
        });
        var api = CoffeeHouse.Core.Ajax(url);
        var actions = {
            get: get,
            create: create,
            remove: remove,
        };
        var UI = {
            list: document.querySelector(list_query),
            form: document.querySelector(form_query),
            listeners: {
                form: formListener,
            }
        };

        var createElement = CoffeeHouse.Core.notImplemented;

        function initialize(createFunction) {
            createElement = createFunction;

            UI.form.addEventListener('submit', UI.listeners.formListener);

            get();
        }

        function get() {
            api.get()
                .then(addElement)
                .catch(CoffeeHouse.Core.log);
        }

        function create(data) {
            api.post(data)
                .then(CoffeeHouse.Core.log)
                .catch(CoffeeHouse.Core.log);
        }

        function remove(data) {
            api.delelete(data)
                .then(CoffeeHouse)
                .catch(CoffeeHouse);
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

        function addElement(data) {
            var objects = JSON.parse(data);

            objects.forEach(function (dataElement) {
                list[dataElement.id] = dataElement;
            });
        }

        function removeElement(property) {
            delete list[property];
        }

        return {
            initialize: initialize,
        }
    }

    CoffeeHouse.List = List;
})(CoffeeHouse);
