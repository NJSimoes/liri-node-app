// ### Minimum Requirements
// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

// ==============================================================

// code to read and set any environment variables with the dotenv package:

require("dotenv");
require("node-spotify-api");
require("mdash-node");


// code required to import the `keys.js` file and store it in a variable.
// You should be able to access your keys information like so

var spotify = require('./keys.js')
var request = require("request");


//Make it so liri.js can take in one of the following commands:

// `spotify-this-song`
// 'concert-this`
// `movie-this`
// `do-what-it-says`

ask = process.argv[2];
data = process.argv[3];
console.log(ask);
console.log(data);
console.log(spotify);

debugger;

// =============================================================

// search Spotify for songs. `node liri.js spotify-this-song '<song name here>'`

if (ask === "spotify-this-song") {

console.log("spotify-this-song action selected correctly");

}

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

// =============================================================

// search Bands in Town for concerts.  `node liri.js concert-this <artist/band name here>`

if (ask === "concert-this") {

    console.log("spotify-this-song action selected correctly");
    
    }

//   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
//   * Name of the venue
//   * Venue location
//   * Date of the Event (use moment to format this as "MM/DD/YYYY")



// =============================================================


// searxh OMDB for movies.  This will output the following information to your terminal/bash window:
//  * Title of the movie.
//  * Year the movie came out.
//  * IMDB Rating of the movie.
//  * Rotten Tomatoes Rating of the movie.
//  * Country where the movie was produced.
//  * Language of the movie.
//  * Plot of the movie.
//  * Actors in the movie.

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

// * It's on Netflix!

// * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


else if (ask === "movie-this") {

    console.log("movie-this action selected correctly");

    // run a request to the OMDB API with the movie specified

    movieURL = ("http://www.omdbapi.com/?t=" + data + "&y=&plot=short&apikey=trilogy");
    console.log(movieURL);
    request("http://www.omdbapi.com/?t=babe&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
    console.log("Movie's Language: " + JSON.parse(body).Language)
    console.log("Movie's Language: " + JSON.parse(body).Language)

    ;


    }
  });
    

    }

// =============================================================

// do 'do-what-it-says`

else if (ask === "do-what-it-says") {

    console.log("spotify-this-song action selected correctly");
    
    }

// =============================================================
// error handling

// else {
//    console.log("that is not a valid request, pick from `spotify-this-song', 'concert-this`, `movie-this`, or `do-what-it-says`")
// }
