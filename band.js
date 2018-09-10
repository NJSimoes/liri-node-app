var keys = require('./keys.js')

// console.log(keys.BandAppID)


var bandsintown = require('bandsintown')(keys.BandAppID);


bandsintown
  .getArtistEventList('Skrillex')
  .then(function(events) {
// console.log(events)

// use  a for/in loop to get all concerts
//   * Name of the venue
//   * Venue location
//   * Date of the Event (use moment to format this as "MM/DD/YYYY")

// sample code
// var string1 = "";
// var object1 = {a: 1, b: 2, c: 3};

// for (var property1 in object1) {
// string1 = string1 + object1[property1];
// }
// console.log(string1);
// expected output: "123"


for (events.id in events) {

    //   * Name of the venue
    concertVenue = events[events.id].venue.place;
    //   * Venue location
    concertLocation = events[events.id].formatted_location;
    //   * Date of the Event (use moment to format this as "MM/DD/YYYY")
    concertDate = events[events.id].datetime;
    console.log(concertVenue, "in", concertLocation, "on", concertDate)


}



});