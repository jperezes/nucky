let schedule = require('node-schedule');
let Promise= require('bluebird')
let rp = require('request-promise');
let bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

let requestCurrencies = function(){};
// Set the headers
let headers = {
    'Content-Type': 'application/json'
}
// Configure the request
let options = {
    url: "https://api.coinmarketcap.com/v1/ticker/Ripple?convert=EUR",
    method: 'GET'
}

requestCurrencies.prototype.scheduleServer = function(bot){
  schedule.scheduleJob('30 * * * * *', Promise.coroutine(function* () {
      let message ="Hello Joan last hour criptocurrency update:";
      let tempMessage="";

      result = yield rp({url:"https://api.coinmarketcap.com/v1/ticker/?&limit=15",method:'GET'});
      //resultRipple = resultRipple.replace("[","").replace("]","")
      result = JSON.parse(result)
      result.forEach(item =>{
        console.log("24h " + item.name + " -> " + item.percent_change_24h + "%");
        tempMessage = "\n\n >24h " + item.name + " -> " + item.percent_change_24h + "%";
        message = message + tempMessage;
      })

      // bot.sendRichTextMessage(roomId,message,function(){
      //   console.log("user found about to send him a message");
      // });

      return;
    }));
}

module.exports = requestCurrencies;
