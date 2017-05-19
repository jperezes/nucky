let port = process.env.PORT || 1337;
let sparklite = require("sparklite");
let botdomain = process.env.DOLORES_URL;
let sparkBot = new sparklite.SparkBot(process.env.NUCKY_KEY, port, botdomain);
let CheckCurrency = require('./routes/checkCripto');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

sparkBot.printHelloWorld();

let checkCurrency = new CheckCurrency()
sparkBot.on('message', function (event)
{
   var mail = event.personEmail.split('@');

   if (mail[1] === "cisco.com"){
     console.log("message received + :" + JSON.stringify(event))
     let message = "your room id is : " + event.roomId;
     sparkBot.sendMessage(event.roomId, message ,function(){});
   } else {

     sparkBot.sendMessage(event.roomId, "Hi, sorry to tell you that but you're not allowed to proceed",function(){});
   }
  console.log(JSON.stringify(event));

})
sparkBot.on('rooms', function (event)
{
    console.log(JSON.stringify(event));
})

sparkBot.on('memberships', function (event)
{
    console.log(JSON.stringify(event));
})

let bot = function(result){
  console.log(result);
}

checkCurrency.scheduleServer(bot);
