var SocketMessenger = {
    sendGameList: sendGameList,
    sendPlayerSearchResult: sendPlayerSearchResult
};

function sendMessage(socket, message) {
    socket.send(message);
}

function buildPayload(message, obj) {
    var payload = {
        msg: message,
        object: obj
    };
    return JSON.stringify(payload);
}

function sendGameList(socket, gameList) {
    var payload = buildPayload("games", gameList);

    sendMessage(socket, payload);
}

function sendPlayerSearchResult(socket, result) {
    sendMessage(socket, result);
}

module.exports = SocketMessenger;