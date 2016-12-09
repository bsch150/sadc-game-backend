/**
 * Created by s730823 on 12/8/2016.
 */
(function(){
    var helper = require('./testing-helper.js');
    var config = require("./testing-config.js");


    var socketOne = helper.getSocket(config.address);
    helper.printAllMessages(socketOne);
    socketOne.onopen = function(){
        helper.sendUsername(socketOne,"one");
        helper.sendGameSelect(socketOne,"Tron");
    };

    var socketTwo = helper.getSocket(config.address);
    helper.printAllMessages(socketTwo);
    socketTwo.onopen = function(){
        helper.sendUsername(socketTwo,"two");
        helper.sendGameSelect(socketTwo,"Tron");
    };
        var socketThree = helper.getSocket(config.address);
    helper.printAllMessages(socketThree);
    socketThree.onopen = function(){
        helper.sendUsername(socketThree,"three");
        helper.sendGameSelect(socketThree,"Tron");
    };
}());