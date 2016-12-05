/**
 * Created by s730802 on 12/5/2016.
 */

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var DatabaseManager = {
    url: 'mongodb://localhost:27017/sadc-game-library', // Connection URL
    connect: function(){
        // Use connect method to connect to the server
        MongoClient.connect(this.url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            db.close();
        });
    }
};

module.exports = DatabaseManager;