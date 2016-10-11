var CoffeeHouse = CoffeeHouse || {};


(function (CoffeeHouse) {
    function log() {
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }

    function NotImplementedException() {
        this.message = arguments.callee.caller.toString() + 'Not implemented.';
        this.toString = function() { return this.message; };
    }

    function ConfigurationException(value) {
        this.message = 'ConfigurationException';
        this.toString = function () { return this.message; };
    }

    CoffeeHouse.Core = {
        log: log,
        notImplemented: function () { throw new NotImplementedException(); },
        NotImplementedException: NotImplementedException,
        ConfigurationException: ConfigurationException,
    }
})(CoffeeHouse);
