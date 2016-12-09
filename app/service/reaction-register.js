/**
 * Created by s730823 on 12/6/2016.
 */

var Debug = require("../debug.js");

function ReactionRegister(socket) {
    this.socket = socket;
    this.reactions = [];
}

function setSocketListener(socket, reactions) {
    function reactToMessage(incoming){
        try {
            incoming = JSON.parse(incoming);
        }catch(err){
            socket.send(JSON.stringify({
                msg: "error",
                object: "The server expects JSON."
            }))
        }
        var reacted = false;
        for (var i = 0; i < reactions.length; i++) {
            if (reactions[i].msg === incoming.msg) {
                reacted = true;
                reactions[i].reactFunction(incoming.object);
            }
        }
        if (!reacted) {
            socket.send(JSON.stringify({
                msg:"error",
                object: "The server didn't expect that."
            }));
        }
    }
    socket.onmessage = function(event){
        reactToMessage(event.data);
    }
}

ReactionRegister.prototype.addReaction = function (reaction) {
    this.reactions.push(reaction);
    setSocketListener(this.socket, this.reactions);
};
ReactionRegister.prototype.removeReactionByMsg = function(string){
    this.reactions = this.reactions.filter(function(reaction){
        return reaction.msg !== string;
    });
    setSocketListener(this.socket, this.reactions);
};

module.exports = ReactionRegister;