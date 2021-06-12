'use strict';

console.log('Running...');
console.log(' ');

let token = require('./token.js').token;

const { Telegraf } = require('telegraf');
const bot = new Telegraf(token);

//array with all taked words (later it will be in a separate file)
global.messages = [];

let modules = require('./modules.js');

let randomInteger = modules.randomInteger;
let shuffle = modules.shuffle;
let takeMsg = modules.takeMsg;
let generate = modules.generate; 

bot.start((ctx) => {
    ctx.reply('started');
});

bot.command('gen', generate);

bot.on('text', takeMsg);

console.log('Runned!');
bot.launch();
