/**
 * Created by s730823 on 12/8/2016.
 */
(function(){
    var helper = require("./testing-helper.js");
    var config = require("./testing-config.js");

    var socket = helper.getSocket(config.address);
    helper.printAllMessages(socket);
    socket.onopen = function(){
        helper.sendUsername(socket,"bryan");
        helper.sendUsername(socket,"wrongUser");
    };

    var count = 0;
    socket.on("message",function(incoming){
        incoming = JSON.parse(incoming);
        count++;
        if(count == 1){
            if(!incoming.msg === "error"){
                console.log("Failed on multiple username input test");
            }else{
                socket.close();
            }
        }
    });

}());