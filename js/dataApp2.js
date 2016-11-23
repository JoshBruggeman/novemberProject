// var config = {
//     apiKey: "AIzaSyDDKwd7hwHCCaDx6LWfHaoTj7nUnwrhXc8",
//     authDomain: "myfirstfirebase-d797a.firebaseapp.com",
//     databaseURL: "https://myfirstfirebase-d797a.firebaseio.com",
//     storageBucket: "myfirstfirebase-d797a.appspot.com",
// };

// firebase.initializeApp(config);

// var database = firebase.database();

//omdb API.
$('#findMovie').on('click', function() {

    // Here we grab the text from the input box
    var movie = $('#movie-input').val();
    //empties the seaarch engine
    //
    // Here we assemble our URL
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(processMovieData);

    return false;
});


var getTrailer = function(showTitle) {
  // console.log("showtitle",showTitle);
	 var youTubeQ = showTitle.trim().replace(/\s/g, '+') + "theatrical trailer".replace(/\s/g, '+');
     var queryURL1 = 'https://www.googleapis.com/youtube/v3/search?q='+ youTubeQ +'&key=AIzaSyCYEdIB9JsOjKavFMHhFT9snrSJ7ROCTDQ&part=snippet';
    //  console.log(queryURL1);
	  $.ajax({
        url: queryURL1,
        method: 'GET'
    }).done(processYoutube);

   return false;
};


//function for the extracting youtube trailer from API
var processYoutube = function(youtube){
    console.log(youtube);
    $('#movie-input').val("");
    //brings youtube object for the first items
    var youtubeOb = youtube.items[0];
    console.log("videoOb",youtubeOb);
    //This extracts the youtube video id from the item.
    var videoId = youtubeOb.id.videoId;
    //This prints the id of youtube video.
    console.log(videoId);

    $('#youtube').html('<iframe width="206" height="280" src="https://www.youtube.com/embed/'+videoId+'" frameborder="0" allowfullscreen></iframe>');

};






var trailerInput = document.getElementById("movie-input");

	document.getElementById("findMovie").onclick = function(){
    // console.log("input",trailerInput);
     getTrailer(trailerInput.value);
  };

var processMovieData = function(movieData) {
        console.log(movieData);
        // console.log(movieTrialer);
        if (movieData.Plot === undefined) {
            $('#tbInfo').html("Learn how to spell, please.");
            $('#moviePoster').empty();
            $('#moviePoster').html('<img class="img-responsive img-border img-left" src="img/spell.jpg">');
        } else {
            // $('#movieInfo').html("<p> " + movieData.Plot + " <i>another word</i></p>");
            $('#moviePoster').empty();
            //empties the info inside of the table so it does not add to the previous information.
            $('.tbInfo').empty();
            // adds movie poster
            $('#moviePoster').html(' <img class="img-responsive img-border img-left" src=' + movieData.Poster + ' alt="">');

            $("#tbInfo").html("<tr><th>Title</th><td>"+movieData.Title+"</td></tr><tr><th>Genre</th><td>"+movieData.Genre+"</td></tr><tr><th>Awards</th><td>"+movieData.Awards+"</td></tr><tr><th>Rated</th><td>"+movieData.Rated+"</td></tr><tr><th>Director</th><td>"+movieData.Director+"</td></tr><tr><th>Casts</th><td>"+movieData.Actors+"</td></tr><tr><th>Runtime</th><td>"+movieData.Runtime+"</td></tr><tr><th>Plot</th><td>"+movieData.Plot+"</th></tr>");


        }

    };
