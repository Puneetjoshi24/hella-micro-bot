var builder = require('botbuilder');

var interestEntity;
var nameEntity;
var movieEntity;
var tvSeriesEntity;
var sportEntity;
var teamEntity;

 var interestInfo=function(session, args ,next){
    interestEntity = builder.EntityRecognizer.findEntity(args.entities, 'hobby');
    nameEntity = builder.EntityRecognizer.findEntity(args.entities, 'name');
    movieEntity = builder.EntityRecognizer.findEntity(args.entities, 'movie');
    tvSeriesEntity = builder.EntityRecognizer.findEntity(args.entities, 'TV series');
    sportEntity = builder.EntityRecognizer.findEntity(args.entities, 'Sport');
    teamEntity = builder.EntityRecognizer.findEntity(args.entities, 'team');;
        if (nameEntity) {
            if (interestEntity){
                session.send("Puneet has avid interest in various things. As he is sports enthusiast, he follows football a lot. He also follow cricket, badminton and table tennis. ");
                session.send("He also watches TV series and movies.");
            }else{
                next({ sportEntity: sportEntity.entity,
                    movieEntity: movieEntity.entity,
                    tvSeriesEntity: tvSeriesEntity.entity,
                    teamEntity:teamEntity.entity})
            }
        } else {
            session.send("Sorry there. I can only tell you interest of Puneet Joshi. I am not very smart so try with some other phrases.");
        }
    }

    var sportsInfo=function(session,results,next){
        var sport = results.sportEntity.entity||results.sportEntity;
        var team = results.teamEntity.entity||results.teamEntity;
        if(sport && team){
            if(sport == "football"){
                session.send("Puneet's favourite football team is Manchester United in clubs and Germany in countries.");
            }else if(sport == "cricket"){
                session.send("Puneet's favourite national cricket team is India and RCB in IPL.");   
            }else{
                session.send("Puneet doesnot follow this sport");
            }
        } else if(sport && !team){
                session.send("Puneet follows a number of sports. His favourite is cricket and football.");
        } else if(!sport && team){
                session.send("Its ManU and Germany in football and India and RCB in cricket.");
        } else{
            next({ movieEntity: results.movieEntity.entity||results.movieEntity,
                tvSeriesEntity: results.tvSeriesEntity.entity||results.tvSeriesEntity})
        }
    }


    var tvSeriesInfo=function(session,results,next){
        var tv = results.tvSeriesEntity;
        if(tv){
            session.send("Puneet has watched many tv-series. Game of Thrones, Sherlock and Breaking Bad amnong his favourites.");
        }
        else{
            next({
                movieEntity: results.movieEntity
            })
        }
    }

     var moviesInfo=function(session,results){
        var movie = results.movieEntity;
         if(movie){
             session.send("Puneet watches movies a lot. Both Bollywood and Hollywood. His favourites include Inception, Dark Knight, ZNMD, A Wednesday, Dangal");
         }
         else{
            session.send("Sorry I cannot help you with that. Try some other phrase about Puneet.");
         }
     }

    module.exports={
        interestInfo:interestInfo,
        sportsInfo:sportsInfo,
        tvSeriesInfo:tvSeriesInfo,
        moviesInfo:moviesInfo
    }