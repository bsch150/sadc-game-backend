/**
 * Created by s730823 on 12/8/2016.
 */
var WebSocket = require('ws');

var helper = {
    getSocket: function(address){
        return new WebSocket(address, {rejectUnauthorized: false});
    },
    sendUsername: function(socket,username){
        socket.send(JSON.stringify({
           msg: "username",
            object: username
        }));
    },
    sendGameSelect: function(socket, name, isPublic){
        socket.send(JSON.stringify({
            msg: "gameSelection",
            object: {
                gameName: name,
                public: isPublic
            }
        }));
    },
    printAllMessages: function(socket){
        socket.on("message", function(incoming){
            console.log(incoming);
        });
    },
    sendChat: function(socket, message){
        socket.send(JSON.stringify({
            msg: "lobbyChat",
            object: message
        }));
    },
    sendSearchByUsername: function(socket,username){
      socket.send(JSON.stringify({
        msg: "playerSearch",
        object: username
      }));
    },
    quickChooseGame: function(client,gameName, isPublic){
        client.connect();
        setTimeout(function(){
            client.sendUsername();
            setTimeout(function(){
                client.chooseGame(gameName, isPublic);
            },100);
        },100);
    }
};

module.exports = helper;
