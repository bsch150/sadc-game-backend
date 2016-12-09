/**
 * Created by s730802 on 12/9/2016.
 */

function LobbyPublicAttributeException() {
    this.name = "LobbyPublicAttributeException";
    this.message = "Could not determine if the gameSelection was public or private.";
    this.toString = function() {
        return this.name + ": " + this.message;
    };
}

module.exports = LobbyPublicAttributeException;