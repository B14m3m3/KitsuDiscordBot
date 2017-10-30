# KitsuDiscordBot

Current initial bot for discord to lookup anime and mangas using the Kitsu api

## Current supported commands
- kitsu.help
- kitsu.manga <*manganame*>
- kitsu.anime <*animename*>

## Setting up the bot
Clone the project, navigate the the folder and use the `npm install` followed by `npm start`

With docker use `docker build -t <your username>/node-web-app .` and run it with `docker run -d <your username>/node-web-app`


## Current issues
- Character command
- Better fail messages when calls to kitsu fails
- Being able to search on specific ID's or better local filtering
