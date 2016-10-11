var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function Ajax(url) {
        function serializeToJson(data) {
            return JSON.stringify(data);
        }

        function urlEncode(data) {
            var properties = Object.keys(data);
            var temp = [];

            properties.forEach(function (property, index) {
                temp.push(encodeURIComponent(property) + '=' + encodeURIComponent(data[property]));
            });

            return temp.join('&');
        }

        function makeAjaxRequest(method, url, args) {
            var promise = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();

                request.open(method, url);

                if (args) {
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    request.send(args['content']);
                }
                else {
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
            get: function (args) {
                if (args) {
                    url = '?' + urlEncode(args);
                }

                return makeAjaxRequest('GET', url, args);
            },
            post: function (args) {
                var content = serializeToJson(args);
                return makeAjaxRequest('POST', url, { content: content });
            },
            delete: function (args) {
                url += '?' + urlEncode(args);

                return makeAjaxRequest('DELETE', url, args);
            }
        };
    }

    CoffeeHouse.Ajax = Ajax;
})(CoffeeHouse);
