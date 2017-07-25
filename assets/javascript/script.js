$(document).ready(function() {



// ----- Game Variables ----- //

// Initial array of animals
var topics = ['surfing', 'free diving', 'longboarding', 'spear fishing', 'snorkeling'];

// ----- Helper Functions ----- //

// renderButtons will display the animal buttons for all animals within the
// topics array.
function renderButtons() {
  // Empty the buttons panel before redrawing it
  $("#buttonPanel").empty();

  // Loop through the array of animals
  for (var i = 0; i < topics.length; i++) {
    // Dynamicaly generate a button for each animal in the array
    var button = $("<button>");
    button.addClass("btn btn-info");
    button.attr("data-sport", topics[i]);
    button.text(topics[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}

// ----- Event Handlers ----- //

// An event handler for the user form to add additional animals to the array
$("#add-sport").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var sport = $("#sport-input").val();  //.trim()

  // The animal from the textbox is then added to our topics array
  topics.push(sport);
  $("#sport-input").val("");

  // Redraw the animal buttons
  renderButtons();
});

// fetchSportGif will fetch animal Gifs with the Giphy API
function fetchSportGif() {

  $('.userGuide').hide();


  // Get the animal name from the button clicked
  var sportName = $(this).attr("data-sport");
  var sportStr = sportName.split(" ").join("+");

  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportStr + 
                 "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("sportGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}

// animateSportGif will animate a still Gif and stop a moving Gif
function animateSportGif() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  renderButtons();
});

// An event handler for the animal buttons to fetch appropriate Gifs
$(document).on("click", ".btn", fetchSportGif);

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".sportGif", animateSportGif);

});