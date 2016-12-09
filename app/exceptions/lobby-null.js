/**
 * Created by s730802 on 12/9/2016.
 */

function LobbyNullException() {
    this.name = "LobbyNullException";
    this.message = "Lobby for a User was null when it was expected to have a value.";
    this.toString = function() {
        return this.name + ": " + this.message;
    };
}

module.exports = LobbyNullException;