module.exports = {
    help: function () {
        var reply = {
            title: 'Help overview',
            description: 'List off available commands\n'+
            '-!animu help\n'+
            '-!animu.manga <*MangaName*>\n'+
            '-!animu.anime <*AnimeName*>\n'+
            '-!animu.animeList <*username*>'
        };
        return reply;
    }
};