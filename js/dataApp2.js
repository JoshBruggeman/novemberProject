// var config = {
//     apiKey: "AIzaSyDDKwd7hwHCCaDx6LWfHaoTj7nUnwrhXc8",
//     authDomain: "myfirstfirebase-d797a.firebaseapp.com",
//     databaseURL: "https://myfirstfirebase-d797a.firebaseio.com",
//     storageBucket: "myfirstfirebase-d797a.appspot.com",
// };

// firebase.initializeApp(config);

// var database = firebase.database();


$('#findMovie').on('click', function() {

    // Here we grab the text from the input box
    var movie = $('#movie-input').val();
    //empties the seaarch engine
    $('#movie-input').val("");

    // Here we assemble our URL
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(processMovieData);

    return false;
});

var getTrailer = function(showTitle) {
	 var youTubeQ = showTitle.trim().replace(/\s/g, '+') + "theatrical trailer".replace(/\s/g, '+');
     var queryURL1 = 'https://www.googleapis.com/youtube/v3/search?q='+ youTubeQ +'&key=AIzaSyDOkg-u9jnhP-WnzX5WPJyV1sc5QQrtuyc&part=snippet';
	  $.ajax({
        url: queryURL1,
        method: 'GET'
    }).done(function(response) {

	  	console.log(response);

	  });
	  
};

var trailerInput = document.getElementById("movie-input");
	document.getElementById("findMovie").onclick = function(){
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



