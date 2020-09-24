const Utils = {
    toCaps: function(word) {
        const letters = [...word];
        const firstLetter = letters[0];
        const newFirstLetter = firstLetter.toUpperCase();
        letters.shift();
        const newWord = [newFirstLetter, ...letters];
        return newWord.join('');
    }
}

export default Utils;

