// Initial array of aniamls
var topics = ["dog", "cat", "bird", "chinchilla","skunk","falcon","camel","lion","pygmy goat","salamander","serval","hanster","sugar glider","deer","goldfish","chicken","frog","ferret","hedgehog","pig","gerbil","turtle","hamster","teacup pig","hermit crab","rabbit","capybara","goat"];

// Function for displaying movie data
function renderButtons() {
  $("#animal-buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    // append elements to the #animal button area 
    var animalDiv = $("<button>");

    $('#animal-buttons').append(animalDiv);
    animalDiv.text(topics[i]);
    animalDiv.attr("data-", topics[i]);
    animalDiv.addClass("animal");
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function() {
  event.preventDefault();
  var newAnimal = ($("#animal-input").val().trim());
  topics.push(newAnimal); 
  console.log(newAnimal);
  renderButtons();
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();

$(document).on("click","button",function(){
  $("#animal").empty();
  var animal = $(this).attr("data-");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);

    var results = response.data;

  for (var i = 0; i < results.length; i++) {
    var animalDiv = $("<div>");
    var p = $("<p>");
    p.text("Rating: " + results[i].rating);
    var animalImage = $("<img class='gif'>");
    
    animalImage.attr("src", results[i].images.fixed_height_still.url);

    animalImage.attr("data-animate",results[i].images.fixed_height.url);
    animalImage.attr("data-still",results[i].images.fixed_height_still.url);
    
    animalDiv.append(p,animalImage);
    $("#animal").prepend(animalDiv);
  }

});

});

$(document).on("click",".gif",function(){
// make a variable named state and then store the image's data-state into it.
// Check if the variable state is equal to 'still',
// then update the src attribute of this image to it's data-animate value,
// and update the data-state attribute to 'animate'.
 
// If state does not equal 'still', then update the src attribute of this
// image to it's data-animate value and update the data-state attribute to 'still'
  var state = $(this).attr("data-state");

  if (state ==="still"){
      $(this).attr('src',$(this).attr('data-animate'));
      $(this).attr("data-state","animate");
  } else {
    $(this).attr('src',$(this).attr('data-still'));
    $(this).attr("data-state","still");
  }

});


