var keys = require('./keys.js')
// console.log(keys)

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
});
 
// spotify
//   .search({ type: 'track', query: 'All the Small Things', limit: 1 })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });






