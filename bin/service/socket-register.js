var Registry = {
    unregister: function(socket){
        console.log("can't unregister now");
    },
    registerMessagePrefix: function(socket, messagePrefix, successCallback, failCallback){
        this.unregister(socket);
        socket.on("message",function(response) {
                try {
                    var jsonResponse = JSON.parse(response);
                    if (jsonResponse.msg === "error") {
                        failCallback(jsonResponse);
                    } else if (jsonResponse.msg === messagePrefix) {
                        successCallback(jsonResponse);
                    } else{
                        socket.send({msg:"error",object:"You gave me a command I didn't recognize"});
                    }
                }catch (err){
                    socket.send({msg:error,object: "You gave me a malformed JSON string"});
                }
            }
        );
    }
};

module.exports = Registry;