var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function List(url, list_query, createFunc, options) {
        var self = this;

        var list = new Proxy({}, {
            set: function (target, property, data) {
                var element = createElement(data);
                element.dataset.listId = data[identifier];

                if (self.removeButtonQuery) {
                    var removeButton = element.querySelector(self.removeButtonQuery);
                    removeButton.addEventListener('click', UI.listeners.remove);
                }

                UI.list.appendChild(element);
                target[property] = data;
            },
            deleteProperty: function (target, propery) {
                remove(property);
                delete target[property];
            }
        });
        var identifier = 'id';
        var api = {
            get: CoffeeHouse.Core.notImplemented,
            post: CoffeeHouse.Core.notImplemented,
            delete: CoffeeHouse.Core.notImplemented,
        };
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

            api = CoffeeHouse.Ajax(config['url'] || url);
            UI.list = document.querySelector(config['list'] || list_query);
            UI.form = document.querySelector(config['form']);
            createElement = config['createElement'] || createFunc;

            if (UI.form) {
                UI.form.addEventListener('submit', UI.listeners.form);
            }

            if ('removeButton' in config) {
                self.removeButtonQuery = config['removeButton'];
            }

            if ('id_property' in config) {
                identifier = config['id_property'];
            }
        }

        function initialize() {
            get(); // NOTE (Emil): Populate the list with any existing data.
        }

        function get(data) {
            return api
                .get()
                .then(addElement)
                .catch(CoffeeHouse.Core.log);
        }

        function create(data) {
            return api
                .post(data)
                .then(addElement)
                .catch(CoffeeHouse.Core.log);
        }

        function remove(data) {
            return api
                .delete(data)
                .then(removeElement)
                .catch(CoffeeHouse.Core.log);
        }

        function formListener(event) {
            event.preventDefault();

            var button = event.target.querySelector('button[type=submit]');
            var inputs = Array.prototype.slice.call(UI.form.querySelectorAll('input'), 0);
            var data = {};

            inputs.forEach(function (input) {
                data[input.name] = input.type == 'checkbox' ? input.checked : input.value;
            });

            button.disabled = true;

            create(data).then(function () {
                inputs.forEach(function (input) { input.value = ''; });

                button.disabled = false;
            });
        }

        function removeElementListener(event) {
            var target = event.target.parentNode;
            var id = target.dataset.listId;

            remove({ id: id }).then(removeElement)
                .catch(CoffeeHouse.Core.log);
        }

        function addElement(data) {
            var objects = JSON.parse(data);

            objects.forEach(function (dataElement) {
                list[dataElement.id] = dataElement;
            });
        }

        function getElement(identifier) {
            console.log(identifier);
            console.log(list);

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
