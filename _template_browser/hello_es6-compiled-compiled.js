"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Utility = (function () {
    function Utility() {
        _classCallCheck(this, Utility);

        this.$log = $('#log');
    }

    _createClass(Utility, [{
        key: 'log',
        value: function log() {
            var text = arguments.length <= 0 || arguments[0] === undefined ? 'Hello es6!' : arguments[0];

            var dom = '<p>' + text + '</p>';
            this.$log.append(dom);
            console.log(text);
        }
    }]);

    return Utility;
})();

var util = new Utility();
util.log();

//# sourceMappingURL=hello_es6-compiled.js.map

//# sourceMappingURL=hello_es6-compiled-compiled.js.map