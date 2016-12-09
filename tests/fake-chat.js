/**
 * Created by s730823 on 12/8/2016.
 */

(function() {
    var helper = require('./testing-helper.js');
    var config = require("./testing-config.js");

    var socket = helper.getSocket(config.address);
    helper.printAllMessages(socket);

    socket.onopen = function(){
        helper.sendUsername(socket,"bryan");
        setTimeout(function(){
            helper.sendGameSelect(socket,"Pong");
            setTimeout(function(){
                helper.sendChat(socket,"NERD");
            },3000);
        },3000);
    }
}());
