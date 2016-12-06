var ReactionRegister = require("../service/reaction-register.js");
var Debug = require("../debug.js");

function User(socket){
    Debug.print("initializing user");
    var reactionRegister = new ReactionRegister(socket);
    var username = null;
    setUsernameState();

    function setUsernameState(){
        var reaction = {
            msg: "username",
            reactFunction: setUsername
        };
        reactionRegister.addReaction(reaction);
    }
    function setUsername(_username){
        Debug.print("setting username: " + _username);
        username = _username;
    }


}


module.exports = User;