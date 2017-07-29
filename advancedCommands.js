var Kitsu = require('kitsu');
var kitsu = new Kitsu();

var xmlParser = require('xml2js').parseString;

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();

module.exports = {
    manga: async function(param) {
        var res = await kitsu.get('manga?filter[text]=' + param);
        var dataRes = res.data[0];

        //sanitizing data
        var replyData = {};
        replyData.url = String(dataRes.posterImage.tiny) ? String(dataRes.posterImage.tiny) : "undefined";
        replyData.title = String(dataRes.canonicalTitle) ? String(dataRes.canonicalTitle) : "undefined";
        replyData.description = String(dataRes.synopsis) ? String(dataRes.synopsis) : "undefined";
        replyData.rating = String(dataRes.averageRating) ? String(dataRes.averageRating) : "undefined";
        replyData.age = String(dataRes.ageRatingGuide) ? String(dataRes.averageRating) : "undefined";
        replyData.chapters = String(dataRes.chapterCount) ? String(dataRes.chapterCount) : "undefined";
        replyData.status = String(dataRes.status) ? String(dataRes.status) : "undefined";

        var thumbImg = {url : replyData.url};
        var reply = {
            title: replyData.title,
            description: replyData.description,
            color: 0x00ff00,
            thumbnail: thumbImg,
            fields: [{
                    name: 'Avg rating',
                    value: replyData.rating,
                    inline: true
            },
            {
                    name: 'Age rating',
                    value: replyData.age,
                    inline: true
            },
            {
                    name: 'Chapters',
                    value: replyData.chapters,
                    inline: true
            },
            {
                    name: 'Status',
                    value: replyData.status,
                    inline: true
            }]
        };
        return reply;
    },
    anime: async function(param) {
        var res = await kitsu.get('anime?filter[text]=' + param);
        var dataRes = res.data[0];

        //sanitizing data
        var replyData = {};
        replyData.url = String(dataRes.posterImage.tiny) ? String(dataRes.posterImage.tiny) : "undefined";
        replyData.title = String(dataRes.canonicalTitle) ? String(dataRes.canonicalTitle) : "undefined";
        replyData.description = String(dataRes.synopsis) ? String(dataRes.synopsis) : "undefined";
        replyData.rating = String(dataRes.averageRating) ? String(dataRes.averageRating) : "undefined";
        replyData.age = String(dataRes.ageRatingGuide) ? String(dataRes.averageRating) : "undefined";
        replyData.epiCount = String(dataRes.episodeCount) ? String(dataRes.episodeCount) : "undefined";
        replyData.epiLength = String(dataRes.episodeLength) ? String(dataRes.episodeLength) : "undefined";
        replyData.nsfw = String(dataRes.nsfw) ? String(dataRes.nsfw) : "undefined";
        replyData.status = String(dataRes.status) ? String(dataRes.status) : "undefined";


        var thumbImg = {url : replyData.url};
        var reply = {
            title: replyData.title,
            description: replyData.description,
            color: 0x00ff00,
            thumbnail: thumbImg,
            fields: [{
                    name: 'Avg rating',
                    value: replyData.rating,
                    inline: true
            },
            {
                    name: 'Age rating',
                    value: replyData.age,
                    inline: true
            },
            {
                    name: 'NSFW',
                    value: replyData.nsfw,
                    inline: true
            },
            {
                    name: 'Episode count/length',
                    value: replyData.epiCount + "/" + replyData.epiLength + " min",
                    inline: true
            },
            {
                    name: 'Status',
                    value: replyData.status,
                    inline: true
            }]
        };
        return reply;
    },
    animelist: async function(username){
        //https://myanimelist.net/malappinfo.php?u=NeneInTheTARDIS&status=all&type=all
        
        xhr.open("GET","https://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=all",false);
        xhr.send();

        console.log(xhr.status);
    
        var parsed;
        xmlParser(xhr.responseText,function(err,result){
            parsed = result;
        });
       

        var parsedData = parsed.myanimelist.myinfo[0];
        var replyData = {}
        replyData.username = String(parsedData.user_name[0]) ? String(parsedData.user_name[0]) : "undefined";
        replyData.url = String("https://myanimelist.net/profile/" + replyData.username) ? String("https://myanimelist.net/profile/" + replyData.username) : String("https://google.com");
        replyData.watching = String(parsedData.user_watching[0]) ? String(parsedData.user_watching[0]) : "undefined";
        replyData.completed = String(parsedData.user_completed[0]) ? String(parsedData.user_completed[0]) : "undefined";
        replyData.onHold = String(parsedData.user_onhold[0]) ? String(parsedData.user_onhold[0]) : "undefined";
        replyData.dropped = String(parsedData.user_dropped[0]) ? String(parsedData.user_dropped[0]) : "undefined";
        replyData.plantowatch = String(parsedData.user_plantowatch[0]) ? String(parsedData.user_plantowatch[0]) : "undefined";
        replyData.daysWatching = String(parsedData.user_days_spent_watching[0]) ? String(parsedData.user_days_spent_watching[0]) : "undefined";

        var reply = {
            title: replyData.username + "'s anime list info",
            description: "Overview of " + replyData.username + "'s MyAnimeList info.\nFor full list see ["+ replyData.username + "'s profile](" + replyData.url + ")",
            color: 0x00ff00,
            fields: [{
                    name: 'Watching',
                    value: replyData.watching,
                    inline: true
            },
            {
                    name: 'Completed',
                    value: replyData.completed,
                    inline: true
            },
            {
                    name: 'On hold',
                    value: replyData.onHold,
                    inline: true
            },
            {
                    name: 'Dropped',
                    value: replyData.dropped,
                    inline: true
            },
            {
                    name: 'Plans to watch',
                    value: replyData.plantowatch,
                    inline: true
            },
            {
                    name: 'Days watching',
                    value: replyData.daysWatching + " days",
                    inline: true
            }]
        };
        return reply;
    }
};