var Server = require("./server/game-server.js");

(function () {
    'use strict';

    var gameServer = new Server();
    var DatabaseManager = require("./service/database-manager.js");
    //DatabaseManager.connect();

}());
