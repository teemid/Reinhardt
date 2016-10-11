var CoffeeHouse = CoffeeHouse || {};

var CoffeeHouse = (function (CoffeeHouse) {
    function CoffeeHouse() {
        var self = this;
        self.products = new CoffeeHouse.Product('/api/v1/products', '.products-list', '.products-form');
        self.extras = new CoffeeHouse.Extra('/api/v1/extras', '.extras-list', '.extras-form');
        self.orders = new CoffeeHouse.Order('/api/v1/orders');
    }

    CoffeeHouse.Core = {
        log: function () {
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
        },
        Ajax: function (url) {
            function makeAjaxRequest(method, url, args) {
                var promise = new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    var urlEncodedData = '';

                    if (args) {
                        var properties = Object.keys(args);
                        var data = [];

                        properties.forEach(function (property, index) {
                            data.push(encodeURIComponent(property) + '=' + encodeURIComponent(args[property]));
                        });

                        urlEncodedData = data.join('&');
                    }

                    request.open(method, url);

                    if (method === 'POST') {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        request.setRequestHeader('Content-Length', urlEncodedData.length);

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
                get: function (args) { return makeAjaxRequest('GET', url, args); },
                post: function (args) { return makeAjaxRequest('POST', url, args); },
                delete: function (args) { return makeAjaxRequest('DELETE', url, args); }
            };
        }
    };

    return CoffeeHouse;
})(CoffeeHouse);
