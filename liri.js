// clear console screen
console.clear();
// code to read and set any environment variables with the dotenv package:
require("dotenv");
require("node-spotify-api");
require("bandsintown");
require("dotenv").config();

// code required to import the `keys.js` file and store it in a variable.

var request = require("request");
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var bandsInTown = require('bandsintown')(keys.BandAppID);



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
    } else { data += nodeArgs[i]; }
}

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
// 1)

if (ask === "spotify-this-song") {
    var song = process.argv[3];
    if (song == null) {
        var song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //     * The song's name
        console.log("Song........: " + song);
        //     * Artist(s)
        console.log("Artist......: " + data.tracks.items[0].album.artists[0].name);
        //     * A preview link of the song from Spotify
        console.log("URL link....: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        //     * The album that the song is from
        console.log("Album name..: " + data.tracks.items[0].album.name + "\n\n");


    });

}

// =============================================================

//  search Bands in Town for concerts.  `node liri.js concert-this <artist/band name here>`
// 2

if (ask === "concert-this") {

    var bandName = process.argv[3]
    if (bandName) {
        bandsInTown
            .getArtistEventList(bandName)
            .then(function (events) {

                // use  a for/in loop to get all concerts
                //   * Name of the venue
                //   * Venue location
                //   * Date of the Event (use moment to format this as "MM/DD/YYYY")

                for (events.id in events) {

                    //   * Name of the venue
                    concertVenue = events[events.id].venue.place;
                    //   * Venue location
                    concertLocation = events[events.id].formatted_location;
                    //   * Concert Date
                    concertDate = events[events.id].datetime;
                    console.log("Date......: " + (moment(concertDate).format("MM/DD/YY")));
                    console.log("Venue.....: " + concertVenue);
                    console.log("Location..: " + concertLocation);
                    console.log("==========================================");
                }

            });
    } else {
        console.log("No Band or Artist name entered.  Feel free to retry with a Band or Artist's name \n\n")

    }
}



//   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist +
//   "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
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
// 3)

if (ask === "movie-this") {
    // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (data == false) {data = "Mr. Nobody"}
    if (data) {
        // build the URL
        movieURL = ("http://www.omdbapi.com/?t=" + data + "&y=&plot=short&apikey=trilogy");
        // run a request to the OMDB API with the movie specified
        request(movieURL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log("Movie Title...........................: " + JSON.parse(body).Title);
                console.log("Release Year..........................: " + JSON.parse(body).Year);
                console.log("IMDB Rating...........................: " + JSON.parse(body).imdbRating);
                console.log("Country where the movie was produced..: " + JSON.parse(body).Country);
                console.log("Movie's Language......................: " + JSON.parse(body).Language);
                console.log("Movie's Plot..........................: " + JSON.parse(body).Plot);
                console.log("Movie's Actors........................: " + JSON.parse(body).Actors);
                console.log("\n\n")
            }
        })
    }
};


// =============================================================

// do 'do-what-it-says`
// 4)

if (ask === "do-what-it-says") {

    console.log("do-what-it-says action selected correctly");

}

// =============================================================
// error handling

// else {
//    console.log("that is not a valid request, pick from `spotify-this-song', 'concert-this`, `movie-this`, or `do-what-it-says`")
// }
