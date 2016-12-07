/**
 * Created by s730802 on 12/5/2016.
 *
 *  NOTE: To start an instance of MongoDB, you must run the following command:
 *
 *  "mongod --dbpath=/data"
 *
 */

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var config = require('../config');

var DatabaseManager = {
    connect: function () {
        // Use connect method to connect to the server
        MongoClient.connect(config.dbURL, function (err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            db.close();
        });
    }
};

module.exports = DatabaseManager;