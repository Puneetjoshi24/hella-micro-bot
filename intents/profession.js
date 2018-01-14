var builder = require('botbuilder');

var nameEntity;
var professionEntity;

 var professionInfo=function(session, args ,next){
    nameEntity = builder.EntityRecognizer.findEntity(args.entities, 'name');
    professionEntity = builder.EntityRecognizer.findEntity(args.entities, 'profession');
        if (nameEntity) {
            if(professionEntity){
                session.send("Puneet is professionally a Software Engineer. He is graduated engineer from G.B. Pant Engineering College.");
                builder.Prompts.text(session, 'Want to know more about his job ? Yes or No');
            }
        } else {
                session.send("I cannot tell you more personal things. He has told not to tell.");
        }
    }

    var professionInfoMore= function(session,results){
        var res = results.response.entity||results.response;
        if(res=="yes"){
            session.send("Puneet Joshi is an engineer at Asksid.ai now. He is a full stack developer. He is a coder by profile and have an experience in developing application softwares.");
            //next({ response: session.message.text });
        }
        else{
            session.send("So I cannot help you then. I only know about him. Bye bye...!");
        }
    }

    module.exports={
        personalInfo:personalInfo,
        professionInfoMore:professionInfoMore
    }