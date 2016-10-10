var CoffeeHouse = window.CoffeeHouse | {};

var CoffeeHouse = (function () {
    function CoffeeHouse () {
        var self = this;

        self.elements = {};
        self.elements['items'] = document.querySelector('.product-list');
        self.product = Product();

        product.fetch_all();

        function Order() {
            var self = this;
        }

        function Cart() {
            var self = this;

            self.products = document.querySelector('.product-list');
        }

        function Product() {
            var self = this;

            self.api = ajax('/api/v1/products');
            self.list = document.querySelector('.product-list');
            self.form = document.querySelector('.product-form');
            self.products = {};

            self.form.addEventListener('submit', formListener);

            function formListener(event) {
                event.preventDefault();

                var inputs = Array.prototype.slice.call(self.form.querySelectorAll('input'), 0);
                var data = {};

                inputs.forEach(function (input) {
                    if (input.type == 'checkbox') {
                        data[input.name] = input.checked;
                    }
                    else
                    {
                        data[input.name] = input.value;
                    }
                });

                create(data);
            }

            function addButtonListener(event) {
                console.log(event);
            }

            function fetch_all() {
                self.api
                    .get()
                    .then(function (data) {
                        var results = JSON.parse(data);

                        add(results);
                    })
                    .catch(function (data) {
                        console.log('Ajax request failed: ', data);
                    });
            }

            function create(product) {
                self.api
                    .post(product)
                    .then(function (data) {
                        add([data]);
                    })
                    .catch(function (data) {
                        console.log(data);
                    });
            }

            function add(products) {
                for (var i = 0; i < products.length; i++) {
                    var product = products[i];

                    var listElement = createListElement(products[i]);
                    self.list.appendChild(listElement);
                    self.products[product.id] = product;

                    console.log(self.products);
                }
            }

            function remove(products) {
                console.log('remove product');
            }

            function createListElement(product) {
                var listElement = document.createElement('li');
                var nameNode = document.createElement('p');
                var priceNode = document.createElement('p');
                var addButton = document.createElement('i');

                listElement.className = 'product';
                addButton.className = 'fa fa-cart-plus';

                nameNode.innerHTML = product.name;
                priceNode.innerHTML = product.price;

                listElement.dataset.beverageId = product.id;

                addButton.addEventListener('click', addButtonListener);

                listElement.appendChild(nameNode);
                listElement.appendChild(priceNode);
                listElement.appendChild(addButton);

                return listElement;
            }

            return {
                fetch_all: fetch_all,
                create: create,
                remove: remove,
            };
        }

        function ajax(url) {
            function make_ajax_request (method, url, args) {
                var promise = new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    var urlEncodedData = '';

                    if (args) {
                        var properties = Object.keys(args);
                        var data = [];

                        properties.forEach(function (property, index) {
                            data.push(encodeURIComponent(property) + '=' + encodeURIComponent(args[property]));
                        });

                        console.log(data);

                        urlEncodedData = data.join('&');
                    }

                    request.open(method, url);

                    if (method === 'POST') {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        request.setRequestHeader('Content-Length', urlEncodedData.length);

                        console.log('request: ' + urlEncodedData);

                        request.send(urlEncodedData)
                    }
                    else
                    {
                        url += '?' + urlEncodedData;
                        request.send();
                    }

                    request.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(this.response);
                        } else {
                            reject(this.response);
                        }
                    };

                    request.onerror = function () {
                        reject(this.statusText);
                    };
                });

                return promise;
            }


            return {
                get: function (args) { return make_ajax_request('GET', url, args); },
                post: function (args) { return make_ajax_request('POST', url, args); }
            };
        }
    }

    return CoffeeHouse;
})();

document.addEventListener("DOMContentLoaded", function (event) {
    var coffee = CoffeeHouse();
});
