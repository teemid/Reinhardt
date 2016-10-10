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

            self.form.addEventListener('submit', form_listener);

            function form_listener(event) {
                event.preventDefault();

                var inputs = Array.prototype.slice.call(self.form.querySelectorAll('input'), 0);
                var data = {};

                inputs.forEach(function (input) {
                    data[input.name] = input.value;
                });

                self.api
                    .post(data)
                    .then(function (data) { console.log(data); })
                    .catch(function (data) { console.log(data); });
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
                self.api.post()
            }

            function add(products) {
                for (var i = 0; i < products.length; i++) {
                    var product = createProduct(products[i]);
                    self.list.appendChild(product);
                }
            }

            function remove(products) {
                console.log('remove product');
            }

            function createProduct(product) {
                var listElement = document.createElement('li');
                var nameNode = document.createElement('p');
                var priceNode = document.createElement('p');
                var addToCart = document.createElement('i');

                nameNode.innerHTML = product.name;
                priceNode.innerHTML = product.price;

                listElement.appendChild(nameNode);
                listElement.appendChild(priceNode);

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

                        console.log(args);
                        console.log(properties);

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
