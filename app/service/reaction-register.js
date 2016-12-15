/**
 * Created by s730823 on 12/6/2016.
 */

var out = new (require("../debug.js"))(3);

function ReactionRegister(socket) {
    this.socket = socket;
    this.reactions = [];
}

function setSocketListener(socket, reactions) {
    function reactToMessage(incoming){
        try {
            incoming = JSON.parse(incoming);
        }catch(err){
            out.log("Received non-json.",0);
            socket.send(JSON.stringify({
                msg: "error",
                object: "The server expects JSON."
            }))
        }
        var reacted = false;
        for (var i = 0; i < reactions.length; i++) {
            if (reactions[i].msg === incoming.msg) {
                reacted = true;
                out.log("Reacting to a [" + incoming.msg + "] with ["+reactions[i].reactFunction.name+"]",3);
                try {
                    var object = typeof incoming.object == 'string' && incoming.object.includes("{") ? JSON.parse(incoming.object) : incoming.object;
                    reactions[i].reactFunction(object);
                }
                catch(err){
                    socket.send(JSON.stringify({
                        msg:"error",
                        object: err
                    }));
                    out.log(err,0);
                }
            }
        }
        if (!reacted) {
            out.log("Got something unexpected: " + incoming.msg,"2");
            socket.send(JSON.stringify({
                msg:"error",
                object: "The server didn't expect a msg of type " + incoming.msg + "."
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
