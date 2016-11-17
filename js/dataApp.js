$('#findMovie').on('click', function() {

  // Here we grab the text from the input box
  var movie = $('#movie-input').val();

  // Here we assemble our URL
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

  $.ajax({url: queryURL, method:'GET'}).done(function(movieData){
      console.log(movieData);
      if (movieData.Plot === undefined){
         $('#movieInfo').html("Learn how to spell, please.");
      } else{
            // $('#movieInfo').html("<p> " + movieData.Plot + " <i>another word</i></p>");
            $('#moviePoster').empty();
            $('.info').empty();
            $('#moviePoster').html(' <img class="img-responsive img-border img-left" src='+movieData.Poster+' alt="">');
            $("#tbody").html("<tr><td>"+movieData.Title+"</td><td>"+movieData.Genre+"</td><td>"+movieData.Rated+"</td><td>"+movieData.Director+"</td><td>"+movieData.Actors+"</td><td>"+movieData.Runtime+"</td><td>"+movieData.Plot+"</td><td>");

      }

  });



  return false;
});
