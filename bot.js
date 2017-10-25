var Discord = require('discord.io');
var simpleCommands = require("./simpleCommands.js");
var advancedCommands = require("./advancedCommands.js");
var tokens = require('./tokens.js');
var globals = require('./globals.js');

var bot = new Discord.Client({
    token: tokens.botToken,
    autorun: true
});


bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('disconnect', function(errMsg, code){
    console.log('Error Code: ' + code + '. Message: '+ errMsg);
});


bot.on('message', function(user, userID, channelID, message, event) {
    message.toLowerCase();
    if(message.startsWith(globals.initializer)){
        var command = message.split(" ");
        var path = command[0].split("."); 
        //remove initializer
        command.shift();
        path.shift();

        var param = command.join(" ");
        var replyMsg;
        try{
            if (path.length >= 1) {
                var replyPromise = advancedCommands[path[0]](param);
                replyPromise.then(
                    success => reply(channelID, success),
                    failure => reply(error("error", message))
                );
            } else {
                replyMsg = simpleCommands[command[0]]();
                reply(channelID, replyMsg);
            }
        }catch(e) {
            replyMsg = error(e, message);
            reply(channelID, replyMsg);
        }
    }
});

function error(e, request){
    var comment = "Could not find an action for the command `" + request + "`.\nUse `" + globals.initializer + " help` for overview of commands";
    var reply = {
        title: "Error",
        description: comment,
        color: 0xff0000
    }
    return reply;
}

function reply(channelID, replyMsg){
    bot.sendMessage({
        to: channelID,
        embed: replyMsg
    });
}
