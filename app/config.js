/**
 * Created by s730802 on 12/5/2016.
 */

var config = {};

config.dbURL = 'mongodb://localhost:27017/sadc-game-library';
config.serverPort = 443;
config.sslEnabled = true;
config.sslKey = './cert/ia.key';
config.sslCert = './cert/ia.crt';

config.PONG_MAX_NUM_PLAYERS = 2;
config.PONG_MIN_NUM_PLAYERS = 2;

config.TRON_MAX_NUM_PLAYERS = 4;
config.TRON_MIN_NUM_PLAYERS = 2;

module.exports = config;