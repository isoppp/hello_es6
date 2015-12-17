"use strict";

// study util

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utility = (function () {
    function Utility(category) {
        _classCallCheck(this, Utility);

        this.category = category;
    }

    _createClass(Utility, [{
        key: 'log',
        value: function log() {
            var _console;

            for (var _len = arguments.length, text = Array(_len), _key = 0; _key < _len; _key++) {
                text[_key] = arguments[_key];
            }

            (_console = console).log.apply(_console, [this.category + ' :'].concat(text));
        }
    }, {
        key: 'logBreak',
        value: function logBreak() {
            console.log('\n========================');
        }
    }, {
        key: 'setCategory',
        value: function setCategory(category) {
            this.category = category;
            this.logBreak();
            console.log('--- ' + category + ' ---\n');
        }
    }]);

    return Utility;
})();

var util = new Utility();

//============================================
// block-scoped declarations
//============================================
util.setCategory('block-scoped');

// es5
(function () {
    util.log('es5');
})();

// to es6
{
    util.log('es6');
}

//============================================
// let declarations
//============================================
util.setCategory('let');

//es5
var letValue = 'es5-1';
(function () {
    var letValue = 'es5-2';
    util.log(letValue);
})();
util.log(letValue);

//es6
letValue = 'es6-1';
{
    var _letValue = 'es6-2';
    util.log(_letValue);
}
util.log(letValue);

// tips
{
    util.log(a); // out log "undefined"
    //util.log(b); // ReferenceError: b is not defined

    if (typeof a === "undefined") {
        // out log "a is undefined"
        util.log('a is undefinded');
    }

    //if (typeof b === "undefinded"){ // ReferenceError: b is not defined
    //    util.log('a is undefinded');
    //}

    var a;
    var b = undefined;
}

//============================================
// const declarations
//============================================
util.setCategory('const');

{
    var _a = 1;
    util.log(_a);

    //a = 2; //TypeError

    var arr = [1, 2, 3];
    arr.push(4);
    util.log(arr);
}

//============================================
// spread/rest
//============================================
util.setCategory('spread/rest');

{
    var test = function test(x, y, z) {
        util.log(util.category, x, y, z);
    };

    //es5

    test(1, 2, 3);

    //es6 ...[]
    test.apply(undefined, [1, 2, 3]);

    var _a2 = [2, 3, 4];
    var b = [1].concat(_toConsumableArray(_a2), [5]);
    util.log(b);

    // tips1 (only work babel compiled)
    //function test2(x, y, ...z) {
    //    util.log(util.category,x, y, z);
    //}
    //
    //test2(1, 2, 3, 4, 5);

    // tips2 (only work babel compiled)
    //es5
    //function foo() {
    //    var args = Array.prototype.slice.call(arguments);
    //    util.log(args);
    //}

    //es6
    //function bar(...args) {
    //    args.shift();
    //    util.log(util.category, ...args); // 4 5 6 7
    //    util.log(args[2]); // 6
    //}

    //foo(1, 3, 2, 4, 3, 6);
    //bar(3, 4, 5, 6, 7);
}

//============================================
// default parameter
//============================================
util.setCategory('default parameter');

{
    (function () {
        //es5

        var addEs5 = function addEs5(x, y) {
            x = x || 3;
            y = y || 5;

            util.log(x + y);
        };

        //es6

        var addEs6 = function addEs6() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];

            util.log(x + y);
        };

        var test = function test() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? w + 1 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? x + 1 : arguments[1];
            var z = arguments.length <= 2 || arguments[2] === undefined ? z + 1 : arguments[2];

            util.log(x, y, z); // 2, 3, NaN
        };

        // another work

        var test2 = function test2() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? (function (v) {
                return v + 10;
            })(30) : arguments[0];

            util.log(x);
        };

        addEs5(3);

        addEs6(3);

        // attention
        addEs5(5, undefined); // 10
        addEs6(5, undefined); // 10

        addEs5(5, null); // 10
        addEs6(5, null); // 5

        addEs5(5, NaN); // 10
        addEs6(5, NaN); // NaN

        addEs5(5, true); // 6 true = convert 1
        addEs6(5, true); // 6 true = convert 1

        // another work
        var w = 1,
            z = 2;

        test();

        test2();
    })();
}

//============================================
// property assignment
//============================================
{
    var foo = function foo() {
        return [1, 2, 3];
    };

    var bar = function bar() {
        return {
            x: 4,
            y: 5,
            z: 6
        };
    };

    // ----- property assignment 1

    util.setCategory('property assignment 1');

    {
        //es5
        var tmp = foo(),
            _a3 = tmp[0],
            b = tmp[1],
            c = tmp[2];

        util.log(_a3, b, c); // 1 2 3

        //es6

        var _foo = foo();

        var _foo2 = _slicedToArray(_foo, 3);

        var d = _foo2[0];
        var e = _foo2[1];
        var f = _foo2[2];

        util.log(d, e, f); // 1 2 3

        var _bar = bar();

        var x = _bar.x;
        var y = _bar.y;
        var z = _bar.z;

        util.log(x, y, z); //4 5 6
    }

    // ----- property assignment 2
    util.setCategory('property assignment 2');
    {
        var _bar2 = bar();

        var bam = _bar2.x;
        var baz = _bar2.y;
        var bap = _bar2.z;

        util.log(bam, baz, bap); // 4 5 6
        //util.log(x,y,z); // ReferenceError

        var aaa = 10,
            bbb = 20;
        var o = { x: aaa, y: bbb };
        var aa = o.x;
        var bb = o.y;

        util.log(o); // {x:10, y: 20}
        util.log(aa, bb); //10 20;

        var obj = {};

        var _foo3 = foo();

        var _foo4 = _slicedToArray(_foo3, 3);

        obj.a = _foo4[0];
        obj.b = _foo4[1];
        obj.c = _foo4[2];

        var _bar3 = bar();

        obj.x = _bar3.x;
        obj.y = _bar3.y;
        obj.z = _bar3.z;

        util.log(obj); // {a: 1, b: 2.... z: 6}

        var _name = 'x',
            objj = {};

        var _bar4 = bar();

        objj[_name] = _bar4[_name];

        util.log(objj[_name]); // 4
    }

    // ----- property assignment 3
    util.setCategory('property assignment 3');
    {
        var _o;

        var o = { a: 1, b: 2, c: 3 },
            _a4 = undefined,
            b = undefined,
            c = undefined,
            p = undefined;

        p = (_o = o, _a4 = _o.a, b = _o.b, c = _o.c, _o);

        util.log(_a4, b, c); // 1,2,3
        util.log(({ a: _a4, b: b, c: c }) === o); // false
        util.log(p === o); //true

        var _foo5 = foo();

        var _foo6 = _slicedToArray(_foo5, 4);

        var e = _foo6[1];
        var f = _foo6[3];

        util.log(e, f); // 2 undefined

        var _foo7 = foo();

        var _foo8 = _toArray(_foo7);

        var j = _foo8[0];

        var k = _foo8.slice(1);

        util.log(j, k); // 1 [ 2, 3 ]
    }

    // ----- property assignment 4
    util.setCategory('property assignment 4');
    {
        var _o2;

        var o = { a: 1, b: 2, c: 3 },
            _a5 = undefined,
            b = undefined,
            c = undefined,
            p = undefined;

        p = (_o2 = o, _a5 = _o2.a, b = _o2.b, c = _o2.c, _o2);

        util.log(_a5, b, c); // 1,2,3
        util.log(({ a: _a5, b: b, c: c }) === o); // false
        util.log(p === o); //true

        var _foo9 = foo();

        var _foo10 = _slicedToArray(_foo9, 4);

        var e = _foo10[1];
        var f = _foo10[3];

        util.log(e, f); // 2 undefined

        var _foo11 = foo();

        var _foo12 = _toArray(_foo11);

        var j = _foo12[0];

        var k = _foo12.slice(1);

        util.log(j, k); // 1 [ 2, 3 ]
    }

    // ----- property assignment 5
    util.setCategory('property assignment 5');
    {
        var _foo13 = foo();

        var _foo14 = _slicedToArray(_foo13, 4);

        var _foo14$ = _foo14[0];

        var _a6 = _foo14$ === undefined ? 11 : _foo14$;

        var _foo14$2 = _foo14[1];
        var b = _foo14$2 === undefined ? 12 : _foo14$2;
        var _foo14$3 = _foo14[2];
        var c = _foo14$3 === undefined ? 13 : _foo14$3;
        var _foo14$4 = _foo14[3];
        var d = _foo14$4 === undefined ? 14 : _foo14$4;

        util.log(_a6, b, c, d); // 1 2 3 14

        var _bar5 = bar();

        var _bar5$x = _bar5.x;
        var x = _bar5$x === undefined ? 11 : _bar5$x;
        var _bar5$y = _bar5.y;
        var y = _bar5$y === undefined ? 12 : _bar5$y;
        var _bar5$z = _bar5.z;
        var z = _bar5$z === undefined ? 13 : _bar5$z;
        var _bar5$w = _bar5.w;
        var w = _bar5$w === undefined ? 14 : _bar5$w;
        var _bar5$u = _bar5.u;
        var uu = _bar5$u === undefined ? 15 : _bar5$u;

        util.log(x, y, z, w, uu); // 4 5 6 14
    }

    // ----- property assignment 6
    util.setCategory('property assignment 6');
    {
        var a1 = [1, [2, 3, 4], 5];
        var _a7 = a1[0];

        var _a1$ = _slicedToArray(a1[1], 3);

        var b = _a1$[0];
        var c = _a1$[1];
        var d = _a1$[2];
        var e = a1[2];

        var o1 = { x: { y: { z: 6 } } };
        var w = o1.x.y.z;

        console.log(_a7, b, c, d, e); // 1 2 3 4 5
        console.log(w); // 6

        var App = {
            model: {
                Hello: function Hello() {
                    return 'hello';
                }
            }
        };
        // instead of:
        // var User = App.model.User;
        var Hello = App.model.Hello;

        console.log(Hello());
    }

    // ----- property assignment 7
    util.setCategory('property assignment 7');
    {
        var _foo15 = function _foo15(_ref) {
            var x = _ref.x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 3 : _ref$y;

            console.log(x, y);
        };

        _foo15({ y: 1, x: 2 }); // 2 1
        _foo15({ y: 42 }); //undefined 42
        _foo15({}); // undefined 3
    }

    // ----- property assignment 8
    util.setCategory('property assignment 8');
    {
        var test = function test() {
            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var _ref2$x = _ref2.x;
            var x = _ref2$x === undefined ? 10 : _ref2$x;

            var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? { y: 10 } : arguments[1];

            var y = _ref3.y;

            return {
                x: x,
                y: y
            };
        };

        util.log(test()); // { x: 10, y: 10 }
        util.log(test({}, {})); // { x: 10, y: undefined }
        util.log(test(undefined, undefined)); //{ x: 10, y: 10 }
        util.log(test({ x: 15 }, { y: 30 })); // { x: 15, y: 30 }
    }
}

///============================================
//// Object Literal
////============================================
util.setCategory('Object Literal');

// prop
{
    var x = 2,
        y = 3;

    //es5
    var es5 = {
        x: x,
        y: y
    };

    //es6
    var es6 = {
        x: x,
        y: y
    };

    util.log(es5); // 2 3
    util.log(es6); // 2 3
}

// method
{
    var x = 2,
        y = 3;

    //es5
    var es5 = {
        x: function x() {
            //...
        },
        y: function y() {
            //...
        }
    };

    //es6
    var es6 = {
        x: function x() {
            //...
        },
        y: function y() {
            //...
        }
    };

    util.log(es5); // 2 3
    util.log(es6); // 2 3
}

///============================================
//// Computed Property Names
////============================================
util.setCategory('Computed Property Names');
{
    var _es;

    var prefix = 'user_';

    //es5
    var es5 = {
        baz: "biz"
    };
    es5[prefix = "foo"] = 1;
    es5[prefix = "bar"] = 2;

    //es6
    var es6 = (_es = {
        baz: "biz"
    }, _defineProperty(_es, prefix + "foo", 1), _defineProperty(_es, prefix + "bar", 2), _defineProperty(_es, "biz" + "baz", 3), _es);

    util.log(es5); //{ baz: 'biz', bar: 2 }
    util.log(es6); //{ baz: 'biz', barfoo: 2 }
}

///============================================
// Template Literals
//============================================
util.setCategory('Template Literals');

//es5
{
    var _name2 = 'es5';
    var greeting = 'hello ' + _name2;
    util.log(greeting);
}

//es6
{
    var _name3 = 'es6';
    var greeting = 'hello ' + _name3 + '!';
    util.log(greeting);
}

//es5
{
    var text = '\n\
    es5\n\
    text\n\
    !!';
    util.log(text);
}

//es6
{

    // another approach

    var upper = function upper(s) {
        return s.toUpperCase();
    };

    var text = '\n    es6\n    text\n    !!';
    util.log(text);

    var word = 'error!';
    util.log(upper(word) + ' test');
}

{
    var name;

    (function () {
        //tips

        var foo = function foo(str) {
            var name = "foo";
            console.log(str);
        };

        var bar = function bar() {
            var name = "bar";
            foo('Hello from ' + name + '!');
        };

        name = "global";

        bar(); // Hello from bar!
    })();
}

//============================================
// arrow function
//============================================
util.setCategory('arrow function');
{
    //es5

    var es5 = function es5(x, y) {
        return x + y;
    };

    util.log(es5(1, 2));

    //es6
    var es6 = function es6(x, y) {
        return x + y;
    };

    util.log(es6(2, 3));

    var func1 = function func1() {
        return 12;
    };
    var func2 = function func2(x) {
        return x * 2;
    };
    var func3 = function func3(x, y) {
        y++;
        return x + y;
    };

    util.log(func1(3, 5)); // 12
    util.log(func2(3, 5)); // 6
    util.log(func3(3, 5)); // 9
}

{
    var _a8 = [1, 2, 3, 4, 5];
    _a8 = _a8.map(function (v) {
        return v * 2;
    });
    util.log(_a8);
}

//============================================
// for...of
//============================================
util.setCategory('for...of');
{
    var list = ['a', 'b', 'c'];

    //es5 for-in
    for (var index in list) {
        util.log(list[index]);
    }

    //es6 for-of
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var val = _step.value;

            util.log(val);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

// end Chapter2

////============================================
//// template
////============================================
//util.setCategory('template');
//{
//
//}

//# sourceMappingURL=es6_study-compiled.js.map