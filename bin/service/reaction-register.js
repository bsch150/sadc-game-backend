/**
 * Created by s730823 on 12/6/2016.
 */

var Debug = require("../debug.js");

function ReactionRegister(socket){
    this.socket = socket;
    this.reactions = [];
}

function setSocketListener(socket,reactions){
    socket.on("message",function(incoming){
        incoming = JSON.parse(incoming);
        var reacted = false;
        for(var i = 0; i < reactions.length; i++){
            if(reactions[i].msg === incoming.msg){
                Debug.print("incoming object: " + incoming.object);
                reacted = true;
                Debug.print("reacting with: " + reactions[i].reactFunction.name);
                reactions[i].reactFunction(incoming.object);
            }else{
            }
        }
        if(!reacted){
            Debug.print("no reaction was called");
        }
    });
}

ReactionRegister.prototype.addReaction = function(reaction){
    this.reactions.push(reaction);
    setSocketListener(this.socket,this.reactions);
};



module.exports = ReactionRegister;


