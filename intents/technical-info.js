var builder = require('botbuilder');

var programmingLanguage;

 var languageInfo=function(session, args ,next){
    programmingLanguage = builder.EntityRecognizer.findEntity(args.entities, 'programming language');
    techEntity = builder.EntityRecognizer.findEntity(args.entities, 'technology');
        if (programmingLanguage) {
            session.send("Puneet works in Java as that's being his favourite programming langauge. He also has worked in Javascript and Go-lang.");
        } else {
            next({ response: techEntity.entity });
        }
    }

    var techInfo=function(session,results,next){
        var tech = results.response.entity||results.response;
        if(tech){
            session.send("Puneet has worked in Blockchain, various backend frameworks like Springboot and NodeJs. And also front end framework React.Js");
            builder.Prompts.text(session, 'Want to know more about Blockchain as its his favourite tech ? Yes or No');
            //next({ response: session.message.text });
        }
        else{
            session.send("So I cannot help you then. I only know about him. Bye bye...!");
        }
    }

     var blockchaininfo=function(session,results){
        var res = results.response.entity||results.response;
         if(res=="yes"||res=="yeah"){
             session.send("Blockchain refers to distributed ledger which can be public or private and it maintained by a consensus algorithm not by any person or organisation.");
             session.send("Refer to https://www.blockchain.com/ for more info.");
             session.send("Puneet has worked in Hyperledger fabric which is permissioned enterprise grade open-cource blockchain franework. Refer to https://www.hyperledger.org/projects/fabric for more info.");
         }
     }

    module.exports={
        languageInfo:languageInfo,
        techInfo:techInfo,
        blockchaininfo:blockchaininfo
    }