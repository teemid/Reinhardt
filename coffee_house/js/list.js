var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function List(url, list_query, createFunc, options) {
        var self = this;

        var list = new Proxy({}, {
            set: function (target, property, data) { var element = createElement(data); UI.list.appendChild(element); },
            deleteProperty: function (target, data) { remove(data); }
        });
        var api = CoffeeHouse.Core.Required;
        var actions = {
            get: get,
            create: create,
            remove: remove,
        };
        var UI = {
            list: null,
            form: null,
            listeners: {
                form: formListener,
                remove: removeElementListener,
            }
        };

        var createElement = CoffeeHouse.Core.notImplemented;

        construct(url, list_query, createFunc, options);

        function construct(url, list_query, createFunc, options) {
            var config = options || url;

            api = CoffeeHouse.Core.Ajax(config['url'] || url);
            UI.list = document.querySelector(config['list'] || list_query);
            UI.form = document.querySelector(config['form']);
            createElement = config['createElement'] || createFunc;

            if (UI.form) {
                UI.form.addEventListener('submit', UI.listeners.form);
            }
        }

        function initialize() {
            get(); // NOTE (Emil): Populate the list with any existing data.
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

        function removeElementListener(event) {

        }

        function addElement(data) {
            var objects = JSON.parse(data);

            objects.forEach(function (dataElement) {
                list[dataElement.id] = dataElement;
            });
        }

        function getElement(identifier) {
            return list[identifier];
        }

        function removeElement(property) {
            delete list[property];
        }

        return {
            initialize: initialize,
            get: getElement,
        }
    }

    CoffeeHouse.List = List;
})(CoffeeHouse);
