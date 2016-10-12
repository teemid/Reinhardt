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

                    request.send(args);
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
                var encoded_url = url;

                if (args) {
                    encoded_url = [encoded_url, '?', urlEncode(args)].join('');
                }

                return makeAjaxRequest('GET', encoded_url, args);
            },
            post: function (args) {
                var content = serializeToJson(args);

                console.log(content);

                return makeAjaxRequest('POST', url, content);
            },
            delete: function (args) {
                var encoded_url = url;

                if (args) {
                    encoded_url = [encoded_url, '?', urlEncode(args)].join('');
                }

                return makeAjaxRequest('DELETE', encoded_url);
            }
        };
    }

    CoffeeHouse.Ajax = Ajax;
})(CoffeeHouse);
