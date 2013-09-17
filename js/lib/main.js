/*
$(document).ready(function() {
    console.log('LOADED');
});
*/

(function() {
    console.log('YO');
})();

function handleEmail(email) {
    if (typeof email === 'undefined') {
        return false;
    }
    var valid = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email);
    return valid;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function Candle(color) {
    this.color = color || '#f00';
}

Candle.prototype.light = function() {
    return true;
};

function CandleCollection(count) {
    var candleArray = [],i;
    for(i=0; i<count; i++) {
        candleArray[i] = new Candle(randomColor());
        console.log('Candle ' + i + ' has a hex color: ' + candleArray[i].color);
    }
    return candleArray;
}

function Cake(type, locale) {
    this.type = type || 'Birthday';
    this.locale = locale || 'en_US';
}

Cake.prototype.setName = function(name) {
    this.name = name;
    return this.name;
};

Cake.prototype.setMessage = function(message) {
    this.message = message;
    return this.message;
};

Cake.prototype.setCandles = function(candleCollection) {
    this.candleCollection = candleCollection;
};

Cake.prototype.lightCandles = function() {
    var len = this.candleCollection.length,i;
    for(i=0;i<len;i++) {
        this.candleCollection[i].light();
        console.log('Candle ' + i + ' is lit');
    }
    return true;
};

Cake.prototype.cut = function(slices) {
    this.slices = new Array(slices);
};

Cake.prototype.eat = function() {
    if (this.slices.length) {
        this.slices.pop();
        return true;
    } else {
        return false;
    }
};