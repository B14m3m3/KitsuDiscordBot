var Discord = require('discord.io');
var simpleCommands = require("./simpleCommands.js");
var advancedCommands = require("./advancedCommands.js");
var tokens = require('./tokens.js');
var initializer = '!animu';

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
    if(message.startsWith(initializer)){
        var command = message.split(" ");
        var path = command[0].split("."); 
        //remove !animu
        command.shift();
        path.shift();

        var param = command.join(" ");
        var replyMsg;
        try{
            if (path.length >= 1) {
                var replyPromise = advancedCommands[path[0]](param);
                replyPromise.then(
                    success => reply(channelID,success),
                    failure => reply(channelID, error(path,command))
                );       
            }else{
                replyMsg = simpleCommands[command[0]]();
                reply(channelID, replyMsg);
            }
        }catch(e){
            replyMsg = error(path,command);
            reply(channelID, replyMsg);
        }
        
    }
});

function error(path, parameters){
    //TODO formatting of paramters and path
    var comment = "Could not find a action for " + path + " with the parameters " +  parameters + ". \nUse '!animu help' for overview of command";
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
