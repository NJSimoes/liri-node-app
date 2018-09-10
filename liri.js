// ### Minimum Requirements
// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

// ==============================================================

// code to read and set any environment variables with the dotenv package:

require("dotenv");
require("node-spotify-api");
require("mdash-node");
require("bandsintown");



// code required to import the `keys.js` file and store it in a variable.
// You should be able to access your keys information like so

var spotify = require('./keys.js')
var request = require("request");
var BandAppID = require('./keys.js');



//Make it so liri.js can take in one of the following commands:

// `spotify-this-song`
// 'concert-this`
// `movie-this`
// `do-what-it-says`

var ask = process.argv[2];

// To handle multiple words in the node argument (ask), store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the name
var data = "";

// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    // And include the "+"s
    data = data + "+" + nodeArgs[i];

  }

  else {

    data += nodeArgs[i];

  }
}

console.log(ask);
console.log(data);
console.log(spotify);


// =============================================================

// search Spotify for songs. `node liri.js spotify-this-song '<song name here>'`
//   * This will show the following information about the song in your terminal/bash window
//     * Artist(s)
//     * The song's name
//     * A preview link of the song from Spotify
//     * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.

//   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** 
//      and **client secret**:
//      * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
//      * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//      * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used 
//          with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//      * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use
//          the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


if (ask === "spotify-this-song") {

    console.log("spotify-this-song action selected correctly");

    spotify.search({ type: 'track', query: data }, function(err, songData) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(songData); 
      });
      

}


// =============================================================

// search Bands in Town for concerts.  `node liri.js concert-this <artist/band name here>`


if (ask === "concert-this") {

    console.log("concert-this action selected correctly");

}

//   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
//   * Name of the venue
//   * Venue location
//   * Date of the Event (use moment to format this as "MM/DD/YYYY")



// =============================================================


// search OMDB for movies to output the following information to the terminal/bash window:
//  * Title of the movie.
//  * Year the movie came out.
//  * IMDB Rating of the movie.
//  * Rotten Tomatoes Rating of the movie.
//  * Country where the movie was produced.
//  * Language of the movie.
//  * Plot of the movie.
//  * Actors in the movie.

//  * use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


if (ask === "movie-this") {
console.log(data)
    if (data != undefined) {
        console.log("data is "+data)
        // build the URL
        movieURL = ("http://www.omdbapi.com/?t=" + data + "&y=&plot=short&apikey=trilogy");
        // run a request to the OMDB API with the movie specified
        request(movieURL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log("Movie Title:                           " + JSON.parse(body).Title);
                console.log("Release Year:                          " + JSON.parse(body).Year);
                console.log("IMDB Rating:                           " + JSON.parse(body).imdbRating);
//                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Source.Rotten Tomatoes.Value);
                console.log("Country where the movie was produced:  " + JSON.parse(body).Country);
                console.log("Movie's Language:                      " + JSON.parse(body).Language);
                console.log("Movie's Plot:                          " + JSON.parse(body).Plot);
                console.log("Movie's Actors:                        " + JSON.parse(body).Actors);

            }
        })
    }
    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    else {
        console.log("no data "+data)

        request("http://www.omdbapi.com/?t=Mr%20Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
            //    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Country where the movie was produced: " + JSON.parse(body).Country);
                console.log("Movie's Language: " + JSON.parse(body).Language);
                console.log("Movie's Plot: " + JSON.parse(body).Plot);
                console.log("Movie's Actors: " + JSON.parse(body).Actors);
            }
        })
    }
};


// =============================================================

// do 'do-what-it-says`

if (ask === "do-what-it-says") {

    console.log("do-what-it-says action selected correctly");

}

// =============================================================
// error handling

// else {
//    console.log("that is not a valid request, pick from `spotify-this-song', 'concert-this`, `movie-this`, or `do-what-it-says`")
// }
