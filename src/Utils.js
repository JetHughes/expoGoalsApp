const Utils = {
    unique: function() {
        return Date.now() + ( (Math.random()*100000).toFixed());
    },
    toCaps: function(word) {
        if(word.length > 0){
        const letters = [...word];
        const firstLetter = letters[0];
        const newFirstLetter = firstLetter.toUpperCase();
        letters.shift();
        const newWord = [newFirstLetter, ...letters];
        return newWord.join('');
        }
        return word;
    },
    getRandomFromArray: function(array) {
        return array[Math.floor(Math.random() * (array.length))];
    },    
    getRandomToMax: function(max) {
        const rand = Math.floor(Math.random() * (max + 1));
        return rand;
    },    
    getRandomBetween: function(min, max) {
        const rand = Math.floor((Math.random() * (max - min + 1) ) + min);
        return rand;

    },
    range: function(start, stop, step) {
        return Array.from({ length: ((stop - start) / step) + 1}, (_, i) => start + (i * step))
    },
    ceilToNearest: function (value, multiple) {
        return (value - (value%multiple) + multiple);
    },
    floorToNearest: function (value, multiple) {
        return (value - (value%multiple));
    }
}

export default Utils;

