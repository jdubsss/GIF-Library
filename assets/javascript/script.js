/*create an array of topics. create a button for each item in the array. user clicks the buttons and 10 gif appear for that topic. user can keep clicking buttons and gifs aill preappend the list. 

user can also enter in new topics that will be added to the array for a button to be made.

user can play and pause the gif*/


$(document).ready(function() {




// Initial array of water sports
var topics = ['surfing', 'free diving', 'longboarding', 'spear fishing', 'snorkeling'];


// renderButtons will display the sport buttons for all sports within the topics array.
function renderButtons() {
  $("#buttonPanel").empty(); //if i dont have this the array doubles each time i add a button

  // Loop through the array of sports
  for (var i = 0; i < topics.length; i++) {
    // generate a button for each sport in the array
    var button = $("<button>");
    button.addClass("btn btn-info");
    button.attr("data-sport", topics[i]);
    button.text(topics[i]);

    // Add the button to the HTML. use the append so it adds to the END of the list
    $("#buttonPanel").append(button);
  }
}


// A function? for the user  to add additional sports to the array
$("#add-sport").on("click", function(event) {
  event.preventDefault();

  var sport = $("#sport-input").val();  //.trim()

  topics.push(sport);
  $("#sport-input").val("");

  renderButtons();
});

// getSportGif will fetch sport Gifs from the Giphy API
function getSportGif() {

  $('.userGuide').hide(); //this hides the welcome message to a user when the click a button


  var sportName = $(this).attr("data-sport");

  // build the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportName + 
                 "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

  //  AJAX function to link to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("sportGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url); //start on pause state
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url); //paused state
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url); //play state
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}

// animateSportGif will play a still Gif and stop a moving Gif
function animateSportGif() {
  var state = $(this).find("img").attr("data-state");


  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}


$(document).ready(function() {
  renderButtons();
});

// now event for sport buttons to fetch appropriate Gifs
$(document).on("click", ".btn", getSportGif);

// event  for the sport Gifs to make the image animate and stop
$(document).on("click", ".sportGif", animateSportGif);

});