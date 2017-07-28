/*

create an array of topics. 
  variable with array of items

create a button for each item in the array. 
  so a loop goes through the array and createas a button and attaches the items in array to the button
  along wth button need to crate class and attirbutes for giphy api to use.

user clicks the buttons and 10 gifs appear for that topic. 
  so on clikc, something happens. link to ajak and then link to id on html and print to page. 

user can keep clicking buttons and gifs aill preappend the list. 

user can also enter in new topics that will be added to the array for a button to be made. 
  need to create input form and take the value user inputs and add to the array of sports

user can play and pause the gif
  so need to take the still and animated states of each gif.
  gif will start on pause and will move to animate on click.

*/


$(document).ready(function() {




  // Initial array of water sports
  var topics = ['surfing', 'free diving', 'tarp surfing', 
  'shark diving', 'spear fishing', 'snorkeling', 'swimming', 'skim board', 'kite surfing', 'scuba dive'];


  // function to display the sport buttons for all sports within the topics array.
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
      // console.log(topics);
    }
  }

  // A function for the user  to add additional sports to the array
  $("#add-sport").on("click", function(event) {

    var sport = $("#sport-input").val();
    // console.log(sport);
    topics.push(sport);
    // console.log(topics);
    $("#sport-input").val("");
    renderButtons();
  
  });



  // crete a function to retrieve sport Gifs from the Giphy API
  function getSportGif() {
    $('.userGuide').hide(); //this hides the welcome message to a user when the click a button
    var sportName = $(this).attr("data-sport");

    // build the Giphy URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportName + 
                   "&rating=G&limit=10&api_key=17fc47eaba4b409690e2b088080bb877";
    //  AJAX function to link to the Giphy API
    $.ajax({
      method: "GET",
      url: queryURL,
    })
    .done(function( result ) {
      var dataArray = result.data; //stores  resutsl data into a variable to be used later
      // Create and display div elements for each of the returned Gifs. div first, then rating of GIF and then the GIF
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
        // prepend the new Gifs to the gifPanel...but its not prepending....but the app still works though
        $("#gifPanel").prepend(newDiv);
      }
    });
  }

  // create a function to play a still Gif and stop a moving Gif
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
// -------now call the functions -------

  renderButtons(); //this prints btns to page


  //  event for sport buttons to retrieve appropriate Gifs
    // $('.btn').on('click', getSportGif());

  $(document).on("click", ".btn-info", getSportGif);

  // event  for the sport Gifs to make the image animate and stop
    // $('.sportGif').on('click', animateSportGif());

  $(document).on("click", ".sportGif", animateSportGif);



});








