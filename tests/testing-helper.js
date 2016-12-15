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
                isPublic: isPublic
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
    sendScreenSizeMessage: function(socket,w,h){
        socket.send(JSON.stringify({
            msg: "screenSize",
            object: {
                width: w,
                height: h
            }
        }))
    },
    sendReadyMessage: function(socket,name){
        socket.send(JSON.stringify({
                msg: "playerReady",
                object: name
            }
        ))
    },
    sendPaddleMessage: function(socket, x){
        socket.send(JSON.stringify({
            msg: "paddleMove",
            object: x
        }))
    },
    quickChooseGame: function(client,gameName, isPublic){
        client.connect();
        setTimeout(function(){
            client.sendUsername();
            setTimeout(function(){
                client.chooseGame(gameName, isPublic);
            },100);
        },100);
    },
    executeInOrderWithDelay: function(functions){
      var delay = 400;
      functions.forEach(function(func){
          setTimeout(func,delay);
          delay += 400;
      });
    }
};

module.exports = helper;
