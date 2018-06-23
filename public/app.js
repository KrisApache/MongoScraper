document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

var article_id='';
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var card = "<div class='row'  >"
    card+= "<div class='col s12 m12'>"
    card+= "<div class='card blue-grey darken-1'>"
    card+= "<div class='card-content white-text'>"
    card+= "<span class='card-title'>" + data[i].title + "</span>"
    card+= "<p>" + data[i].summary + ""
    card+= "</div>"
    card+= "<div class='card-action'>"
    card+= "<a href='" + data[i].link + "'>Go to Article</a>"
    card+= "<a data-id='" + data[i]._id + "' class='waves-effect waves-light btn read-comment modal-trigger' href='#modal1'><i class='material-icons right'>event_note</i>Notes</a>"
    // card+="<div id='modal1' class='modal'><div class='modal-content'>"
    // card+="<h4>Modal Header</h4>"
    // card+="<p>A bunch of text</p></div>"
    // card+="<div class='modal-footer'><a href='#!' class='modal-close waves-effect waves-green btn-flat'>Agree</a>"
    card+= "</div></div></div></div>";

    $("#articles").append(card);

    // var modl ="<div id='modal1' class='modal'>"
    // modl+="<div class='modal-content'>"
    // modl+="<h4>Modal Header</h4>"
    // modl+="<p>A bunch of text</p>"
    // modl+="</div>"
    // modl+="<div class='modal-footer'>"
    // modl+="<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Agree</a>"
    // modl+="</div></div>";

    // $("#articles").append(modl);

    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", ".read-comment", function() {
  // Empty the notes from the note section
  // $("#notes").empty();
  $(".modal-content").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  article_id = $(this).attr("data-id");
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);

      // $("#modl-header").text(data.title);
      // for (var i = 0; i < data.note.length; i++) {
      //   var note = "<p>"+data.note.body+"</p>";
      //   $(".modal-content").append(note);
      // }
      

      // The title of the article
      // $("#notes").append("<h2>" + data.title + "</h2>");
      // // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      console.log("data note: "+data.note.length);
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        
        $(".modal-content").append(data.note.body);
        // $("#titleinput").val(data.note.title);
        // // Place the body of the note in the body textarea
        // $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", ".modal-close", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  thisId = article_id;

  console.log("this is : "+thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title:'',
      // Value taken from note textarea
      body: $("#textarea1").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  $("#textarea1").val("");
  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});
