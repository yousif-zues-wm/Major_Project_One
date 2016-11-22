"use strict"
var embed = require("embed-video")
let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');
let express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient


app.get('/', (request, response) => {
  throw new Error('oops')
})

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
})

let bot = new Bot({
    username: "Zeus_Bot2",
    apiKey: 'bf22e40e-2807-4a2e-9694-04130e2f8263',
    baseUrl: 'https://kik-echobot.ngrok.io/'
});

bot.updateBotConfiguration();

bot.onStartChattingMessage((message) => {
    bot.getUserProfile(message.from)
    .then((user) => {
        message.reply(`Hey ${user.firstName}!`)

    })
});




bot.onTextMessage((message) => {
    message.reply(message);
    console.log(`this is the message -> ${message}`)
});
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8000);


MongoClient.connect(`mongodb://::127.0.0.1:27017`, (err, database) => {
    if (err) {
        console.log(err)
    }
  // ... start the server
})



// function timeEstimatCreator(mongo)
