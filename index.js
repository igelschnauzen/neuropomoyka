'use strict';

console.log('Running...');
console.log(' ');

let tokenObj = require('./token.js');
let token = tokenObj.token;

const { Telegraf } = require('telegraf');
const bot = new Telegraf(token);

let messages = [];

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function takeMsg(ctx) {
    let message = ctx.message.text;
    let splittedPhrase = message.split(' ');
    
    splittedPhrase.forEach(element => {
        messages.push(element);
    });

    return;

}

function generate(ctx) {
    let words = randomInteger(1, 15);
    let phraseArr = [];
    let count = 0;

    for(let msg of messages) {

        let skipChance = randomInteger(1, 10);
        if(skipChance <= 7) continue;

        phraseArr.push(msg);

        count++;
        if(count >= words) {
            break;
        }
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