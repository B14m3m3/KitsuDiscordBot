var globals = require("./globals.js");
module.exports = {
    help: () => {
        var reply = {
            title: 'Help overview',
            description: 'List off available commands\n'+
            '-' + globals.initializer + ' help\n'+
            '-' + globals.initializer + '.manga <*MangaName*>\n'+
            '-' + globals.initializer + '.anime <*AnimeName*>\n'
        };
        return reply;
    }
};
