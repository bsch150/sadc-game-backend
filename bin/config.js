/**
 * Created by s730802 on 12/5/2016.
 */

var config = {};

config.dbURL = 'mongodb://localhost:27017/sadc-game-library';
config.serverPort = 443;
config.sslEnabled = true;
config.sslKey = './cert/ia.key';
config.sslCert = './cert/ia.crt';

module.exports = config;