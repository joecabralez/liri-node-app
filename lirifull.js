//node requires
var Twitter = require('twitter');
var twitterKey = require('./keys.js');
var Spotify = require('spotify');
var Request = require('request');
var fs = require("fs");

//user commands and input
var command = process.argv[2];
var input = '';

for (var i = 3; i < process.argv.length; i++) {
    input = input + process.argv[i] + ' ';
}
input = input.trim();
console.log('');

if (command === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        command = dataArr[0];
        input = dataArr[1].replace(/"/g, '');
        mainCommand(command, input);
    });
}
mainCommand(command, input);

function mainCommand(command, input) {

///////////
//TWITTER//
///////////
    if (command === 'my-tweets') {
        var client = new Twitter(twitterKey.twitterKeys);
        var handle = 'joecabralez';
        var params = {screen_name: handle};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            console.log('@' + handle + " Tweets: ");
            if (!error) {
                for (var i = 0; i < 20; i++) {
                    console.log(tweets[i].created_at);
                    console.log((i + 1) + ": " + tweets[i].text); console.log('');
                }
            }
            else {
                console.log('Error occured: ' + error)
            }         
        });        
    }

///////////
//SPOTIFY//
///////////
    if (command === 'spotify-this-song') {
        if (input === '') {
            input = ' "The Sign" Ace of Base';
        }
        Spotify.search({type: 'track', query: input}, function(error, data) {
            var songData = data.tracks.items[0];
            if (error) {
                console.log('Error occurred: ' + error);
                return;
            }
            console.log("Artist: " + songData.artists[0].name + "\nSong: " + songData.name + "\nLink: " + songData.external_urls.spotify + "\nAlbum: " + songData.album.name);  
        });
    }

/////////////
//OMDB INFO//
/////////////
    if (command === 'movie-this') {
        if (input === '') {
            input = 'mr_nobody';
        }
        Request('http://www.omdbapi.com/?t=' + input, function(error, response, body) {
            var movieData = JSON.parse(body);
            //PRINT MOVIE DATA
            console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);    
        });
    };

    
}


