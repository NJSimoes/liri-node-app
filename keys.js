require("dotenv");

// console.log('this is loaded');
var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
};

var BandAppID ="codingbootcamp"

module.exports = {
  
  spotify,
  BandAppID,

}