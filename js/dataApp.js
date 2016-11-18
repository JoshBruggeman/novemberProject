$('#findMovie').on('click', function() {

    // Here we grab the text from the input box
    var movie = $('#movie-input').val();
    //empies the search box
    $('#movie-input').val("");

    // Here we assemble our URL
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(movieData) {
        console.log(movieData);
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

            $("#tbInfo").html("<tr><th>Title</th><td>" + movieData.Title + "</td></tr><tr><th>Genre</th><td>" + movieData.Genre + "</td></tr><tr><th>Rated</th><td>" + movieData.Rated + "</td></tr><tr><th>Director</th><td>" + movieData.Director + "</td></tr><tr><th>Actors</th><td>" + movieData.Actors + "</td></tr><tr><th>Runtime</th><td>" + movieData.Runtime + "</td></tr><tr><th>Plot</th><td>" + movieData.Plot + "</th></tr>");


        }

    });



    return false;
});
