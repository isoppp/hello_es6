"use strict";

// study util
class Utility {
    constructor(category) {
        this.category = category;
    }

    log(...text) {
        console.log(this.category + ' :', ...text);
    }

    logBreak() {
        console.log('\n========================');
    }

    setCategory(category) {
        this.category = category;
        this.logBreak();
        console.log('--- ' + category + ' ---\n');
    }
}
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
    util.log('es6')
}

//============================================
// let declarations
//============================================
util.setCategory('let');


//es5
var letValue = 'es5-1';
(function () {
    let letValue = 'es5-2';
    util.log(letValue);
})();
util.log(letValue);

//es6
letValue = 'es6-1';
{
    let letValue = 'es6-2';
    util.log(letValue);
}
util.log(letValue);

// tips
{
    util.log(a); // out log "undefined"
    //util.log(b); // ReferenceError: b is not defined

    if (typeof a === "undefined") { // out log "a is undefined"
        util.log('a is undefinded');
    }

    //if (typeof b === "undefinded"){ // ReferenceError: b is not defined
    //    util.log('a is undefinded');
    //}

    var a;
    let b;
}

//============================================
// const declarations
//============================================
util.setCategory('const');


{
    const a = 1;
    util.log(a);

    //a = 2; //TypeError

    const arr = [1, 2, 3];
    arr.push(4);
    util.log(arr);
}

//============================================
// spread/rest
//============================================
util.setCategory('spread/rest');


{
    function test(x, y, z) {
        util.log(util.category, x, y, z);
    }

    //es5
    test(1, 2, 3);

    //es6 ...[]
    test(...[1, 2, 3]);

    let a = [2, 3, 4];
    let b = [1, ...a, 5];
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
    //es5
    function addEs5(x, y) {
        x = x || 3;
        y = y || 5;

        util.log(x + y);
    }

    addEs5(3);

    //es6
    function addEs6(x = 3, y = 5) {
        util.log(x + y);
    }

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
    let w = 1, z = 2;

    function test(x = w + 1, y = x + 1, z = z + 1) {
        util.log(x, y, z); // 2, 3, NaN
    }

    test();

    // another work
    function test2(x = (function (v) {
        return v + 10
    }(30))) {
        util.log(x);
    }

    test2();
}


//============================================
// property assignment
//============================================
{
    function foo() {
        return [1, 2, 3];
    }

    function bar() {
        return {
            x: 4,
            y: 5,
            z: 6
        }
    }

    // ----- property assignment 1
    util.setCategory('property assignment 1');

    {
        //es5
        let tmp = foo(),
            a = tmp[0], b = tmp[1], c = tmp[2];

        util.log(a, b, c); // 1 2 3

        //es6
        let [d,e,f] = foo();
        util.log(d, e, f); // 1 2 3


        let {x,y,z} = bar();
        util.log(x, y, z); //4 5 6
    }


    // ----- property assignment 2
    util.setCategory('property assignment 2');
    {
        let {x:bam,y:baz,z:bap} = bar();
        util.log(bam, baz, bap); // 4 5 6
        //util.log(x,y,z); // ReferenceError

        let aaa = 10, bbb = 20;
        let o = {x: aaa, y: bbb};
        let {x: aa, y: bb} = o;
        util.log(o); // {x:10, y: 20}
        util.log(aa, bb); //10 20;

        let obj = {};
        [obj.a, obj.b, obj.c] = foo();
        ( {x: obj.x, y: obj.y, z: obj.z} = bar() );
        util.log(obj); // {a: 1, b: 2.... z: 6}

        let name = 'x',
            objj = {};

        ({[name]: objj[name]} = bar());
        util.log(objj[name]); // 4
    }

    // ----- property assignment 3
    util.setCategory('property assignment 3');
    {
        let o = {a: 1, b: 2, c: 3},
            a, b, c, p;

        p = {a, b, c} = o;

        util.log(a, b, c); // 1,2,3
        util.log({a, b, c} === o); // false
        util.log(p === o); //true

        let [,e,,f] = foo();
        util.log(e, f); // 2 undefined

        let [j, ...k] = foo();
        util.log(j, k); // 1 [ 2, 3 ]
    }

    // ----- property assignment 4
    util.setCategory('property assignment 4');
    {
        let o = {a: 1, b: 2, c: 3},
            a, b, c, p;

        p = {a, b, c} = o;

        util.log(a, b, c); // 1,2,3
        util.log({a, b, c} === o); // false
        util.log(p === o); //true

        let [,e,,f] = foo();
        util.log(e, f); // 2 undefined

        let [j, ...k] = foo();
        util.log(j, k); // 1 [ 2, 3 ]
    }

    // ----- property assignment 5
    util.setCategory('property assignment 5');
    {
        let [a = 11,b= 12, c = 13,d = 14] = foo();
        util.log(a, b, c, d); // 1 2 3 14

        let {x = 11,y = 12, z = 13, w = 14,u : uu= 15} = bar();
        util.log(x, y, z, w, uu); // 4 5 6 14
    }

    // ----- property assignment 6
    util.setCategory('property assignment 6');
    {
        let a1 = [1, [2, 3, 4], 5];
        let [a,[b,c,d],e]=a1;

        let o1 = {x: {y: {z: 6}}};
        let {x:{y:{z:w}}}=o1;

        console.log(a, b, c, d, e); // 1 2 3 4 5
        console.log(w); // 6

        let App = {
            model: {
                Hello: function () {
                    return 'hello';
                }
            }
        };
        // instead of:
        // var User = App.model.User;
        let {model: {Hello}} = App;
        console.log(Hello());
    }


    // ----- property assignment 7
    util.setCategory('property assignment 7');
    {
        function foo({x,y=3}) {
            console.log(x, y);
        }

        foo({y: 1, x: 2}); // 2 1
        foo({y: 42}); //undefined 42
        foo({}); // undefined 3
    }

    // ----- property assignment 8
    util.setCategory('property assignment 8');
    {
        function test({x=10}={}, {y}={y: 10}) {
            return {
                x: x,
                y: y
            };
        }

        util.log(test()); // { x: 10, y: 10 }
        util.log(test({}, {})) // { x: 10, y: undefined }
        util.log(test(undefined, undefined)); //{ x: 10, y: 10 }
        util.log(test({x: 15}, {y: 30})) // { x: 15, y: 30 }
    }
}

///============================================
//// Object Literal
////============================================
util.setCategory('Object Literal');

// prop
{
    let x = 2, y = 3;

    //es5
    let es5 = {
        x: x,
        y: y
    };

    //es6
    let es6 = {
        x,
        y
    };

    util.log(es5); // 2 3
    util.log(es6); // 2 3
}

// method
{
    let x = 2, y = 3;

    //es5
    let es5 = {
        x: function () {
            //...
        },
        y: function () {
            //...
        }
    };

    //es6
    let es6 = {
        x(){
            //...
        },
        y(){
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

    let prefix = 'user_';

    //es5
    let es5 = {
        baz: "biz"
    };
    es5[prefix = "foo"] = 1;
    es5[prefix = "bar"] = 2;

    //es6
    let es6 = {
        baz: "biz",
        [prefix + "foo"]: 1,
        [prefix + "bar"]: 2,
        ["biz" + "baz"]: 3
    }

    util.log(es5); //{ baz: 'biz', bar: 2 }
    util.log(es6); //{ baz: 'biz', barfoo: 2 }

}

///============================================
// Template Literals
//============================================
util.setCategory('Template Literals');

//es5
{
    let name = 'es5';
    let greeting = 'hello ' + name;
    util.log(greeting);
}

//es6
{
    let name = 'es6';
    let greeting = `hello ${name}!`;
    util.log(greeting);
}

//es5
{
    let text = '\n\
    es5\n\
    text\n\
    !!';
    util.log(text);
}

//es6
{
    let text = `
    es6
    text
    !!`;
    util.log(text);

    // another approach
    function upper(s) {
        return s.toUpperCase();
    }

    let word = 'error!';
    util.log(`${upper(word)} test`);
}

{
    //tips
    function foo(str) {
        var name = "foo";
        console.log(str);
    }

    function bar() {
        var name = "bar";
        foo(`Hello from ${name}!`);
    }

    var name = "global";
    bar(); // Hello from bar!
}

//============================================
// arrow function
//============================================
util.setCategory('arrow function');
{
    //es5
    function es5(x, y) {
        return x + y;
    }

    util.log(es5(1, 2));

    //es6
    let es6 = (x, y) => x + y;

    util.log(es6(2, 3));

    let func1 = () => 12;
    let func2 = x => x * 2;
    let func3 = (x, y) => {
        y++;
        return x + y;
    };

    util.log(func1(3, 5)); // 12
    util.log(func2(3, 5)); // 6
    util.log(func3(3, 5)); // 9
}

{
    let a = [1, 2, 3, 4, 5];
    a = a.map(v=>v * 2);
    util.log(a);
}

//============================================
// for...of
//============================================
util.setCategory('for...of');
{
    let list = ['a','b','c'];

    //es5 for-in
    for(var index in list){
        util.log(list[index]);
    }

    //es6 for-of
    for(let val of list){
        util.log(val);
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
