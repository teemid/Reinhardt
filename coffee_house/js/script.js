var CoffeeHouse = window.CoffeeHouse | {};

var CoffeeHouse = (function () {
    function CoffeeHouse () {
        var self = this;

        self.elements = {};
        self.elements['items'] = document.querySelector('.product-list');
        self.product = Product();

        product.fetch_all();

        function Product() {
            var self = this;
            self.endpoint = '/api/products';
            self.list = document.querySelector('.product-list');

            function fetch_all() {
                ajax(self.endpoint)
                    .get()
                    .then(function (data) {
                        var results = JSON.parse(data);

                        add(results);
                    })
                    .catch(function (data) {
                        console.log('Ajax request failed: ', data);
                    });
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

                nameNode.innerHTML = product.name;
                priceNode.innerHTML = product.price;

                listElement.appendChild(nameNode);
                listElement.appendChild(priceNode);

                return listElement;
            }

            return {
                fetch_all: fetch_all,
                add: add,
                remove: remove,
            };
        }

        function ajax(url) {
            function make_ajax_request (method, url) {
                var promise = new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();

                    request.open(method, url);
                    request.send();

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
                get: function () { return make_ajax_request('GET', url); },
                post: function () { return make_ajax_request('POST', url); }
            };
        }
    }

    return CoffeeHouse;
})();

document.addEventListener("DOMContentLoaded", function (event) {
    var coffee = CoffeeHouse();
});
