(function () {
    'use strict';

    var Server = require("./server/game-server.js");
    var gameServer = new Server();
    var DatabaseManager = require("./service/database-manager.js");
    //DatabaseManager.connect();

}());