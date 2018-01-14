var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var introduction = require('./intents/introduction');
var technicalInfo = require('./intents/technical-info');
var relationship = require('./intents/relationship');
var profession = require('./intents/profession');
var personal = require('./intents/personal');
var interest = require('./intents/interest');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "80b77a64-a921-4c8e-a1e3-bd9e6c7d5dc6",
    appPassword: "bl9T*_5^WUGfMp%5",
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
//var luisAppId = process.env.LuisAppId;
//var luisAPIKey = process.env.LuisAPIKey;
//var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

//const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

const LuisModelUrl = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/a721c73b-7ba9-4151-98c1-c6e661039d7e?subscription-key=2292c132d32e488493e23929095e7b57&verbose=true&timezoneOffset=0&q=";

console.log("Here....")
// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);

var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session, args, next) => {
    session.send("Hello there. Hella this side...! I am Puneet's assistant. Try asking me things about him. Btw he is just awesome", session.message.text);
})
.matches('Help', (session, args, next) => {
    session.send("Try asking me questions like 'What is Puneet's profession ' I can answer that about him", session.message.text);
})
.matches('Cancel', (session, args, next) => {
    session.send('Ok I am cancelling everything.', session.message.text);
})
.matches('Technical Info', [
    function (session, args, next) { technicalInfo.languageInfo(session, args, next) },
    function (session, results, next) { technicalInfo.techInfo(session, results, next) },
    function (session, results) { technicalInfo.blockchaininfo(session, results) }
])
.matches('Personal', [
    function (session, args, next) { personal.personalInfo(session, args, next) }
])
.matches('Interest', [
    function (session, args, next) { interest.interestInfo(session, args, next) },
    function (session, results, next) { interest.sportsInfo(session, results, next) },
    function (session, results) { interest.tvSeriesInfo(session, results, next) },
    function (session, results) { interest.moviesInfo(session, results) }
])
.matches('Profession', [
    function (session, args, next) { profession.professionInfo(session, args, next) },
    function (session, results) { profession.professionInfoMore(session, results) }
])
.matches('Relationship', [
    function (session, args, next) { relationship.relationshipInfo(session, args, next) }
])
.matches('Introduction', [
    function (session, args, next) { introduction.introduceName(session, args, next) },
    function (session, results, next) { introduction.introduceYou(session, results, next) },
    function (session, results) { introduction.introduceYouMore(session, results) }
])

/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'. I am not as smart as you', session.message.text);
});

bot.dialog('/', intents);