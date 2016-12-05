var Registry = {
    unregister: function(socket){
        console.log("can't unregister now");
    },
    registerMessagePrefix: function(socket, messagePrefix, foo){
        this.unregister(socket);
        socket.on("message",function(response){
           if(response.includes(messagePrefix)){
               foo(response);
           }
        });
    }
};

module.exports = Registry;