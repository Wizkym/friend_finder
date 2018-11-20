const path = require('path');

const friends = require("../data/friends.js");

module.exports = function(app){

    app.get("/api/friends", function(eq,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        let newUser = (req.body);
        let totalDiff = 0;
        let diff = 0;
        let matchedName = '';      // will store the best matched friend name
        let matchedImg;

        //compare scores by checking for the highest difference of the scores
        for(let i = 0; i < friends.length; i++){
            for(let x = 0; x < newUser.scores.length; x++){
                diff += (Math.abs(friends[i].scores[x] - newUser.scores[x]));
            }

            if (i = 0) {
                matchedName = friends[i].name;
                matchedImg = friends[i].photo;
                totalDiff = diff;
                diff = 0;
            } else if ((i > 0) && (diff < totalDiff)){ //if the previous difference is greater = update
                matchedName = friends[i].name;
                matchedImg = friends[i].photo;
                totalDiff = diff;
                diff = 0;
            } else if ((i > 0) && (totalDiff < diff)) { //if the previous difference is lesser = keep it!
                diff = 0;
            }
        }
        console.log(newUser + "POSTED");
        friends.push(newUser);
        res.json({status:"OK", matchName: matchedName, matchedPhoto: matchedImg});

    });
};