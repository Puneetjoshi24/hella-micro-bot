var builder = require('botbuilder');

var nameEntity;

 var introduceName=function(session, args ,next){
        nameEntity = builder.EntityRecognizer.findEntity(args.entities, 'name');
        if (nameEntity.entity == "Puneet") {
            return next({ response: "yes" });
        } else {
            builder.Prompts.text(session, 'I know only about Puneet Joshi. You wanted to know about him ? Yes or No');
            next({ response: session.message.text });
        }
    }

    var introduceYou=function(session,results,next){
        var res = results.response.entity||results.response;
        if(res=="yes"){
            session.send("Puneet Joshi is an engineer at Asksid.ai now. He is a full stack developer. He is from Uttarakhand. He lives in Bangalore now. He is football freak. And he is a fun guy to be with.");
            builder.Prompts.text(session, 'Want to know more about him ? Yes or No');
            //next({ response: session.message.text });
        }
        else{
            session.send("So I cannot help you then. I only know about him. Bye bye...!");
        }
    }

     var introduceYouMore=function(session,results){
        var res = results.response.entity||results.response;
         if(res=="yes"||res=="yeah"){
             session.send("Puneet plays table tennis and badminton. He is avid believer of world without religion. He follows cricket too. He has interest in new technologies. He is also blockchain enthusiast. ");
             session.send("He is socially active at facebook @ https://www.facebook.com/puneet.joshi.10");
             session.send("Go ahead and connect with him.");
         }
     }

    module.exports={
        introduceName:introduceName,
        introduceYou:introduceYou,
        introduceYouMore:introduceYouMore
    }