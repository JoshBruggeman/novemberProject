$('#findMovie').on('click', function() {

  // Here we grab the text from the input box
  var movie = $('#movie-input').val();

  // Here we assemble our URL
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

  $.ajax({url: queryURL, method:'GET'}).done(function(movieData){
      console.log(movieData);
      if (movieData.Plot === undefined){
         $('#movieInfo').html("Learn how to spell, please. Cubs rules!");
      } else{
            $('#movieInfo').html("<p> " + movieData.Plot + " <i>another word</i></p>");
            $('#moviePoster').empty();
            $('#moviePoster').html(' <img class="img-responsive img-border img-left" src='+movieData.Poster+' alt="">');
      }

  });



  return false;
});
