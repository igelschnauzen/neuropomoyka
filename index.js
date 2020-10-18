'use strict';

console.log('Running...');
console.log(' ');

let tokenObj = require('./token.js');
let token = tokenObj.token;

const { Telegraf } = require('telegraf');
const bot = new Telegraf(token);

//array with all taked words (later it will be in a separate file)
let messages = [];

//shuffling the array when generating phrase 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

//taking message and push words into array
function takeMsg(ctx) {
    let message = ctx.message.text;
    let splittedPhrase = message.split(' ');
    
    splittedPhrase.forEach(element => {
        messages.push(element);
    });

    return;
}

//generating phrase
function generate(ctx) {
    if(messages.length <= 6) {
        ctx.reply('Недостаточно данных для генерации фразы.');
        return;
    }

    shuffle(messages);

    let words = randomInteger(1, 10); //a number of words in the phrase
    let phraseArr = [];
    let count = 0;

    for(let msg of messages) {
        let skipChance = randomInteger(1, 10);
        if(skipChance <= 7) continue;

        phraseArr.push(msg);

        count++;
        if(count >= words) break;
    }

    let phrase = phraseArr.join(' ');
    ctx.reply(phrase);
    return phrase;
}

function dbg(ctx) {
    ctx.reply(messages);
}

bot.start((ctx) => {
    ctx.reply('started');
});

bot.command('gen', generate);
bot.command('dbg', dbg);

bot.on('text', takeMsg);

console.log('Runned!');
bot.launch();