var builder = require('botbuilder');

var nameEntity;
var addressEntity;
var friendEntity;
var ageEntity;

 var personalInfo=function(session, args ,next){
    nameEntity = builder.EntityRecognizer.findEntity(args.entities, 'name');
    addressEntity = builder.EntityRecognizer.findEntity(args.entities, 'address');
    ageEntity = builder.EntityRecognizer.findEntity(args.entities, 'getAge');
    friendEntity = builder.EntityRecognizer.findEntity(args.entities, 'friend');
        if (nameEntity) {
            if(addressEntity){
                session.send("Puneet lives in RR nagar, Bangalore, India. Basically he is from Uttarakhand btw.");
            }
            if (ageEntity){
                session.session("He is 23 years old btw. and born on Messi's birthday i.e. 24th June.");
            }
            if (friendEntity){
                session.send("Puneet has a number of friends and me Hella is his best friend. I will not give that position to anyone");
                session.send("Connect him at facebook @ https://www.facebook.com/puneet.joshi.10");
            }
        } else {
                session.send("I cannot tell you more personal things. He has told not to tell.");
        }
    }

    module.exports={
        personalInfo:personalInfo
    }