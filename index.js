let chatServer = {
    users: {},
    chatHistory: []
};

function connectUser(username) {
    if (chatServer.users[username]) {
        console.log(`User with name ${username} connected already!.`);
    } else {
        chatServer.users[username] = {
            username: username,
            connected: true,
            inbox: []
        };
        console.log(`${username} connected.`);
        sendSystemMessage(`${username} entered the chat.`);
    }
}

function disconnectUser(username) {
    if (chatServer.users[username]) {
        chatServer.users[username].connected = false;
        console.log(`${username} disconnected from chat.`);
        sendSystemMessage(`${username} leaved chat.`);
    } else {
        console.log(`User with name ${username} not found.`);
    }
}

function sendMessage(fromUser, toUser, message) {
    if (chatServer.users[fromUser] && chatServer.users[toUser]) {
        if (chatServer.users[fromUser].connected && chatServer.users[toUser].connected) {
            let chatMessage = {
                from: fromUser,
                to: toUser,
                message: message,
                timestamp: new Date().toLocaleTimeString()
            };
            chatServer.chatHistory.push(chatMessage);
            chatServer.users[toUser].inbox.push(chatMessage);
            console.log(`${fromUser} sent message to ${toUser}: ${message}`);
        } else {
            console.log(`One of the users not connected to chat.`);
        }
    } else {
        console.log(`One of the users not found.`);
    }
}

function sendSystemMessage(message) {
    let systemMessage = {
        from: "System",
        to: "All",
        message: message,
        timestamp: new Date().toLocaleTimeString()
    };
    chatServer.chatHistory.push(systemMessage);
    for (let username in chatServer.users) {
        if (chatServer.users[username].connected) {
            chatServer.users[username].inbox.push(systemMessage);
        }
    }
    console.log(`System: ${message}`);
}

function viewChatHistory(username) {
    if (chatServer.users[username]) {
        console.log(`\nChat history for ${username}:`);
        for (let message of chatServer.users[username].inbox) {
            console.log(`[${message.timestamp}] ${message.from} to ${message.to}: ${message.message}`);
        }
    } else {
        console.log(`User with name ${username} not found.`);
    }
}

function sendBroadcastMessage(fromUser, message) {
    if (chatServer.users[fromUser] && chatServer.users[fromUser].connected) {
        let broadcastMessage = {
            from: fromUser,
            to: "All",
            message: message,
            timestamp: new Date().toLocaleTimeString()
        };
        chatServer.chatHistory.push(broadcastMessage);
        for (let username in chatServer.users) {
            if (chatServer.users[username].connected) {
                chatServer.users[username].inbox.push(broadcastMessage);
            }
        }
        console.log(`${fromUser} sent broadcast message: ${message}`);
    } else {
        console.log(`User ${fromUser} not found.`);
    }
}

function reconnectUser(username) {
    if (chatServer.users[username]) {
        chatServer.users[username].connected = true;
        console.log(`${username} reconnected to chat.`);
        sendSystemMessage(`${username} reconnected to chat.`);
        viewChatHistory(username);
    } else {
        console.log(`User ${username} not found.`);
    }
}

function removeUser(username) {
    if (chatServer.users[username]) {
        disconnectUser(username);
        delete chatServer.users[username];
        console.log(`${username} was deleted from chat.`);
    } else {
        console.log(`User ${username} not found.`);
    }
}

function listConnectedUsers() {
    console.log("Connected users:");
    for (let username in chatServer.users) {
        if (chatServer.users[username].connected) {
            console.log(username);
        }
    }
}

function viewFullChatHistory() {
    console.log("\nFull chat history:");
    for (let message of chatServer.chatHistory) {
        console.log(`[${message.timestamp}] ${message.from} to ${message.to}: ${message.message}`);
    }
}

function clearChatHistory() {
    chatServer.chatHistory = [];
    for (let username in chatServer.users) {
        chatServer.users[username].inbox = [];
    }
    console.log("Chat history cleared.");
}

function editMessage(username, oldMessage, newMessage) {
    let edited = false;
    for (let message of chatServer.chatHistory) {
        if (message.from === username && message.message === oldMessage) {
            message.message = newMessage + " (edited)";
            edited = true;
            console.log(`${username} edited message: ${oldMessage} to ${newMessage}`);
            break;
        }
    }
    if (!edited) {
        console.log(`Message "${oldMessage}" not found to edit.`);
    }
}

function sendFile(fromUser, toUser, fileName) {
    if (chatServer.users[fromUser] && chatServer.users[toUser]) {
        if (chatServer.users[fromUser].connected && chatServer.users[toUser].connected) {
            let fileMessage = {
                from: fromUser,
                to: toUser,
                message: `You've recieved a file: ${fileName}`,
                timestamp: new Date().toLocaleTimeString()
            };
            chatServer.chatHistory.push(fileMessage);
            chatServer.users[toUser].inbox.push(fileMessage);
            console.log(`${fromUser} sent file to ${toUser}: ${fileName}`);
        } else {
            console.log(`One of the users not connected to chat.`);
        }
    } else {
        console.log(`One of the users was not found.`);
    }
}


connectUser("Andre");
connectUser("Mykola");
sendMessage("Andre", "Mykola", "Wassup, Mykola!");
sendBroadcastMessage("Andre", "Hi to everyone!");
viewChatHistory("Mykola");
disconnectUser("Mykola");
sendMessage("Andre", "Mykola", "You're missed a message.");
reconnectUser("Mykola");
viewChatHistory("Mykola");
editMessage("Andre", "Hi everyone!", "Good day to everyone here!");
sendFile("Mykola", "Andre", "report.pdf");
viewFullChatHistory();
clearChatHistory();
removeUser("Andre");
listConnectedUsers();
