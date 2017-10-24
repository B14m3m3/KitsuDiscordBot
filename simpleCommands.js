module.exports = {
    help: () => {
        //TODO use the initializer variable in here
        var reply = {
            title: 'Help overview',
            description: 'List off available commands\n'+
            '-!animu help\n'+
            '-!animu.manga <*MangaName*>\n'+
            '-!animu.anime <*AnimeName*>\n'
        };
        return reply;
    }
};
