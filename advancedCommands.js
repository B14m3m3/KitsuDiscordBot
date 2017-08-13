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
        replyData.url = sanitize(dataRes.posterImage.tiny);
        replyData.title = sanitize(dataRes.canonicalTitle);
        replyData.description = sanitize(dataRes.synopsis);
        replyData.rating = sanitize(dataRes.averageRating);
        replyData.age = sanitize(dataRes.ageRatingGuide);
        replyData.chapters = sanitize(dataRes.chapterCount);
        replyData.status = sanitize(dataRes.status);

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
        replyData.url = sanitize(dataRes.posterImage.tiny)
        replyData.title = sanitize(dataRes.canonicalTitle);
        replyData.description = sanitize(dataRes.synopsis);
        replyData.rating = sanitize(dataRes.averageRating);
        replyData.age = sanitize(dataRes.ageRatingGuide);
        replyData.epiCount = sanitize(dataRes.episodeCount);
        replyData.epiLength = sanitize(dataRes.episodeLength);
        replyData.status = sanitize(dataRes.status);


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
    /**
     * TOFIX currently put on hold since strings are html + needs to shortened in some way
    character: async function(param){
        var res = await kitsu.get('characters?filter[name]='+param);
        var dataRes = res.data[0];
        var replyData = {};
        replyData.url = sanitize(dataRes.image.original)
        replyData.name = sanitize(dataRes.name);
        replyData.description = sanitize(dataRes.description);
        
        var cleandesc = replyData.description.replace(/<\/?[^>]+(>|$)/g,'');
        console.log(cleandesc);
        var thumbImg = {url : replyData.url};
        var reply = {
            title: replyData.name,
            description: cleandesc.substring(0,cleandesc.length/2),
            color: 0x00ff00,
            thumbnail: thumbImg,
        };
        return reply;
    },*/
    animelist: async function(username){
        //https://myanimelist.net/malappinfo.php?u=NeneInTheTARDIS&status=all&type=all
        
        xhr.open("GET","https://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=all",false);
        xhr.send();
    
        var parsed;
        xmlParser(xhr.responseText,function(err,result){
            parsed = result;
        });
       
        var parsedData = parsed.myanimelist.myinfo[0];
        var replyData = {}
        replyData.username = sanitize(parsedData.user_name[0]);
        replyData.url = sanitize("https://myanimelist.net/profile/" + replyData.username);
        replyData.watching = sanitize(parsedData.user_watching[0]);
        replyData.completed = sanitize(parsedData.user_completed[0]);
        replyData.onHold = sanitize(parsedData.user_onhold[0]);
        replyData.dropped = sanitize(parsedData.user_dropped[0]);
        replyData.plantowatch = sanitize(parsedData.user_plantowatch[0]);
        replyData.daysWatching = sanitize(parsedData.user_days_spent_watching[0]);

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

function sanitize(value){
        return String(value) || value === null ? String(value) : "undefined";
}