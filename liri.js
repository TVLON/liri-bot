require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./key.js")
var spotify = new Spotify(keys.spotify);
var request = require('request');
var moment = require('moment');
var fs = require('fs');

function runApp() {
	switch(process.argv[2]) {
		case "concert-this":
        concertSearch(process.argv[3])
        break;
		case "spotify-this-song":
				spotifySearch(process.argv[3])
        break;
    case "movie-this":
        movieSearch(process.argv[3])
        break;
    case "do-what-it-says":
        lameSearch(process.argv[3])
        break;
    default:
        console.log("error")
}
}
runApp();

function spotifySearch(songName) {	 
	spotify.search({ type: 'track', query: songName, }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
	console.log("ARTIST: " + data.tracks.items[0].album.artists[0].name);
	console.log("SONG: " + process.argv[3])
	console.log("ALBUM: " + data.tracks.items[0].album.name)
	console.log("LINK: " + data.tracks.items[0].preview_url)
	});
}
function movieSearch(movieToSearch) {

	let queryUrl = "http://www.omdbapi.com/?t=" + movieToSearch + "&plot=short&apikey=trilogy"

	request(queryUrl, function (err, response, body) {
			if (!err && response.statusCode === 200) {
					var myMovieData = JSON.parse(body);
					console.log("------------------------------------------------------")
					console.log("Title: " + myMovieData.Title);
					console.log("Year: " + myMovieData.Year);
					console.log("IMDB Rating: " + myMovieData.imdbRating)
					console.log("Rotten Tomatoes Score: " + myMovieData.Ratings[0].Value)
					console.log("Country Produced: " + myMovieData.Country)
					console.log("Movie Language: " + myMovieData.Language)
					console.log("Plot of Movie" + myMovieData.Plot)
					console.log("Actors: " + myMovieData.Actors);
					console.log("------------------------------------------------------")
			}
	})
}
 function concertSearch(artist) { 
	
		var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
	 
		request(queryURL, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var jsonData = JSON.parse(body);
	 
				if (!jsonData.length) {
					console.log("No results found for " + artist);
					return;
				}
	 
				console.log("Upcoming concerts for " + artist + ":");
	 
				for (var i = 0; i < jsonData.length; i++) {
					var show = jsonData[i];
	
					console.log(
						show.venue.city +
							"," +
							(show.venue.region || show.venue.country) +
							" at " +
							show.venue.name +
							" " +
							moment(show.datetime).format("MM/DD/YYYY")
					);
				}
			}
		});
	 };
	
function lameSearch(){
	fs.readFile("./random.txt", 'utf8', function(err, content) {
		if (!err) {
			console.log(content)
			spotifySearch(content.split(',')[1])
		}
	});
}

		 

