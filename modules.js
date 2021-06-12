function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

//shuffling the array when generating phrase 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
}

//taking message and push words into array
function takeMsg(ctx) {
    let message = ctx.message.text;
    let splittedPhrase = message.split(' ');
    
    splittedPhrase.forEach(element => {
        global.messages.push(element);
    });

    return;
}

//generating phrase
function generate(ctx) {
    if(global.messages.length <= 6) {
        ctx.reply('Недостаточно данных для генерации фразы.');
        return;
    }

    shuffle(global.messages);

    let words = randomInteger(1, 10); //a number of words in the phrase
    let phraseArr = [];
    let count = 0;

    for(let msg of global.messages) {
        let skipChance = randomInteger(1, 10);
        if(skipChance <= 7) continue;

        phraseArr.push(msg);

        count++;
        if(count >= words) break;
    }

    let phrase = phraseArr.join(' ');
    return ctx.reply(phrase);
}

module.exports = {
    randomInteger,
    shuffle,
    takeMsg, 
    generate,
};
