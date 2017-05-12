//twitter npm & keys & request
var Twitter = require('twitter');
var daKeys = require("./keys.js");
var request = require("request");

/////////////
//~TWITTER~//
///////////// 
var client = new Twitter({
  consumer_key: daKeys.twitterKeys.consumer_key,
  consumer_secret: daKeys.twitterKeys.consumer_secret,
  access_token_key: daKeys.twitterKeys.access_token_key,
  access_token_secret: daKeys.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'joecabralez'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);

}
});


////////////////////
//OMDB MOVIE STUFF//
////////////////////

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

//request for movie url

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes URL: " + JSON.parse(body).Website);
  }
});

/////////////
//~SPOTIFY~//
/////////////

var spotify = require('spotify');

var songArg = process.argv;
var songTitle = "";
 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});

////////////////////
//~READ TEXT FILE~//
////////////////////

// fs is an NPM package for reading and writing files
var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // We will then print the contents of data
  console.log(data);

});