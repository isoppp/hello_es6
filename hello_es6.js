"use strict";

class Utility {
    constructor() {
        this.$log = $('#log');
    }

    log (text = 'Hello es6!') {
        let dom = '<p>' + text + '</p>';
        this.$log.append(dom);
        console.log(text);
    }
}

var util = new Utility();
util.log();