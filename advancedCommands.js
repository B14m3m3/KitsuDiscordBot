var Kitsu = require('kitsu');
var kitsu = new Kitsu();

const suggestLimit = 5;
module.exports = {
    manga: async (param) => {
        //putting the limit the same way the kitsu framework does it does not seem to work. - TODO revisit
        let res = await kitsu.get('manga?filter[text]=' + param + '&page[limit]=' + suggestLimit);
        let dataRes = res.data[0];

        //sanitizing data
        let replyData = {};
        replyData.url = sanitize(dataRes.posterImage.tiny);
        replyData.title = sanitize(dataRes.canonicalTitle);
        replyData.description = sanitize(dataRes.synopsis);
        replyData.rating = sanitize(dataRes.averageRating);
        replyData.age = sanitize(dataRes.ageRatingGuide);
        replyData.chapters = sanitize(dataRes.chapterCount);
        replyData.status = sanitize(dataRes.status);
        let thumbImg = {url : replyData.url};
        let reply = {
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
            },
            {
                name: 'Other top results',
                value: getSuggestions(res.data),
                inline: false
            }]
        };
        return reply;
    },
    anime: async (param) => {
        let res = await kitsu.get('anime?filter[text]=' + param + '&page[limit]=' + suggestLimit);
        let dataRes = res.data[0];

        //sanitizing data
        let replyData = {};
        replyData.url = sanitize(dataRes.posterImage.tiny)
        replyData.title = sanitize(dataRes.canonicalTitle);
        replyData.description = sanitize(dataRes.synopsis);
        replyData.rating = sanitize(dataRes.averageRating);
        replyData.age = sanitize(dataRes.ageRatingGuide);
        replyData.epiCount = sanitize(dataRes.episodeCount);
        replyData.epiLength = sanitize(dataRes.episodeLength);
        replyData.status = sanitize(dataRes.status);
        replyData.subtype = sanitize(dataRes.subtype)

        let thumbImg = {url : replyData.url};
        let reply = {
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
            },
            {
                name: 'Show type',
                value: replyData.subtype,
                inline: true
            },
            {
                name: 'Other top results',
                value: getSuggestions(res.data),
                inline: false
            }]
        };
        return reply;
    },
    /**
     * TODO currently put on hold since strings are html + needs to shortened in some way
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
};


function getSuggestions(searchResults){
    let suggestions = "";
    for(let i = 1; i < searchResults.length; i++){
        let searchidx = searchResults[i];
        suggestions += "*" + sanitize(searchidx.canonicalTitle) +"*\n";
    }
    return suggestions;
}

function sanitize(value){
    return (value === null || value === "") ? "undefined" : String(value);
}
