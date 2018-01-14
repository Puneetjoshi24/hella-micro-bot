var builder = require('botbuilder');

var nameEntity;
var relationshipStatusEntity;

 var relationshipInfo=function(session, args ,next){
        nameEntity = builder.EntityRecognizer.findEntity(args.entities, 'name');
        relationshipStatusEntity = builder.EntityRecognizer.findEntity(args.entities, 'relationship-status');
        if (nameEntity) {
            if(relationshipStatusEntity){
                session.send("Puneet is totally Single and unvailable. He is committed to me. :) ");
            }
            else{
                session.send("What do you want to know about Puneet;s relation? I know only about his current relationship status");
            }
        } else {
            session.send("What do you want to know about Puneet;s relation? I know only about his current relationship status");
        }
    }


    module.exports={
        relationshipInfo:relationshipInfo
    }