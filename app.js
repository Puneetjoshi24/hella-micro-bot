
var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);



// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Welcome to profiling bot ..! I am hella... Type \'help\' if you need assistance.', session.message.text);
});
bot.set('storage', tableStorage);

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);

bot.recognizer(recognizer);

// bot.dialog('Question', [
//     function(session, args, next){
//         session.send("I am Puneet's assistent..! Ask me about him ", session.message.text);
//         session.send("By the way, He is AWESOME",session.message.text);

//         var name = builder.EntityRecognizer.findEntity(args.intent.entities, 'name');
//         console.log("Name: ",name);
//         if(name){
//             console.log(":)"+name.entity);``
//             next({ response: name.entity });
//         }
//         else {
//             builder.Prompts.text(session, 'I didnot recognize him ');
//             next({ response: session.message.text });
//         }
//     }
// ]

// ).triggerAction({
//     matches: 'Question',
//     onInterrupted: function (session) {
//         session.send('This is it');
//     }
// });


var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session) => {

    

    session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
})
.matches('Help', (session) => {
    session.send('You reached Help intent, you said \'%s\'.', session.message.text);
})
.matches('Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
})
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('Help', function (session) {
    session.endDialog('Hi! Try asking me things like \'Who is Puneet\'');
}).triggerAction({
    matches: 'Help'
});

bot.dialog('/', intents);    
