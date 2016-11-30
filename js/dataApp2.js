// Link to our Firebase Database.
var config = {
    apiKey: "AIzaSyDDKwd7hwHCCaDx6LWfHaoTj7nUnwrhXc8",
    authDomain: "myfirstfirebase-d797a.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-d797a.firebaseio.com",
    storageBucket: "myfirstfirebase-d797a.appspot.com",
    messagingSenderId: "80889691492"
};
// Initializing our firebase app
firebase.initializeApp(config);

// Returning the database from the firebase object, my using a method.
var database = firebase.database();

// Starting our clickCounter at 0
var clickCounter = 0;

// FUNCTIONS + EVENTS
// --------------------------------------------------------------------------------

// on click of the button with the ID "clickButton"
// 1. update counter in our javascript
$("#clickButton").on("click", function() {

  // add 1 to the clickCounter
  clickCounter++;

  // update the database
  database.ref().set({
    clickCount: clickCounter
  });
});

  // listening for the value event, if value changes of variables referenced on screen.
  // watching for changes in the database
  database.ref().on("value", function(snapshot) {

    // our whole freaking database
    console.log(snapshot.val());

    // grabbing the clickValue h1 and updating the number of clicks and using jqeury to update the DOM
    $("#clickValue").html(snapshot.val().clickCount);

    //  Initial load of the page, set the clickCounter
    //to something besides 0
    clickCounter = snapshot.val().clickCount;

    // 
  }, function(errorObject) {

    // 
    console.log("The read failed: " + errorObject.code);

  });

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

    $('#youtube').html('<iframe width="100%" height="340" src="https://www.youtube.com/embed/'+videoId+'" frameborder="0" allowfullscreen></iframe>');

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

            $("#tbInfo").html("<tr><th>Title</th><td>"+movieData.Title+" ("+(movieData.Year)+")</td></tr><tr><th>Genre</th><td>"+movieData.Genre+"</td></tr><tr><th>Awards</th><td>"+movieData.Awards+"</td></tr><tr><th>Rated</th><td>"+movieData.Rated+"</td></tr><tr><th>Director</th><td>"+movieData.Director+"</td></tr><tr><th>Casts</th><td>"+movieData.Actors+"</td></tr><tr><th>Runtime</th><td>"+movieData.Runtime+"</td></tr><tr><th>Plot</th><td>"+movieData.Plot+"</th></tr>");


        }

    };

// User Input Validation
// $(document).ready(function() {

// $('#movie-input').on('input', function() {
//   var input=$(this);
//   var is_name=input.val();
//   if(is_name){input.removeClass("invalid").addClass("valid");}
//   else{input.removeClass("valid").addClass("invalid");}
// });

// // After Form Submitted Validation
// $("#findMovie button").click(function(event){
//   var form_data=$("#contact").serializeArray();
//   var error_free=true;
//   for (var input in form_data){
//     var element=$("#contact" + form_data[input]['name']);
//     var valid=element.hasClass("valid");
//     var error_element=$("span", element.parent());
//     if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
//     else{error_element.removeClass("error_show").addClass("error");}
//   }
//   if (!error_free){
//     event.preventDefault(); 
//   }
//   else{
//     alert('No errors: Form will be submitted');
//   }
// });

// });
