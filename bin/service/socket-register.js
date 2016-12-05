var Registry = {
    unregister: function(socket){
        socket.off("message");
    },
    registerMessagePrefix: function(socket, messagePrefix, foo){
        this.unregister(socket);
        socket.on("message",function(reponse){
           if(response.includes(messagePrefix)){
               foo(response);
           }
        });
    }
};

module.exports = Registry;