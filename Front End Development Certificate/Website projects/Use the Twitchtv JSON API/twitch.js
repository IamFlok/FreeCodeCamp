// variables for the stream API
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

$(window).on("load", function() {

  loadStreamers();

  // user can add new streamer to the list
  $('#add').on('click', function() {
    var newStreamer = document.getElementById("add-streamer").value;
  	if (newStreamer) {
  		streamers.push(newStreamer);
  		refresh();
  	} else { // field left empty so just simply refresh the site
  		refresh();
  	}
  });

  // refresh button
  $('#refresh').on('click', function() {
  	refresh();
  });

  // refresh function clears the site and reloads streamers
  function refresh() {
	  $("#streamerlist").html("");
	  loadStreamers();
  }

  // this function initiates the API calls for every streamer stored in the array
  function loadStreamers() {
    for (var i = 0; i < streamers.length; i++) {
      getStreamer(streamers[i]);
    }
  }

  // calls API to check if the user is online or offline then pass the status
  function getStreamer(streamer) {
    var streamStatus = "";
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamer + "?callback=?", function(response) {
	  if (!response.stream) { streamStatus = "Offline"; } else { streamStatus = "Online"; };
      getStreamerData(streamer, streamStatus);
    });
  }

  // calls API to gather data and list to the site
  function getStreamerData(streamer, status) {
    return $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + streamer + "?callback=?", function(data) {
      // validate the streamer
      if (!data.url) {
        $("#streamerlist").append('<div class="streamer"><div class="row"><div class="error-message">Cannot find streamer ' + streamer + '!</div></div></div>')
      }
      // only list game if the streamer is online
	  else if (status == "Online") {
          $("#streamerlist").append('<a href="' + data.url + '" target="_blank"><div class="streamer"><div class="row"><div class="name col-md-6">' + data.display_name + '</div><div class="stream online col-md-6">' + status + '</div></div><div class="row"><div class="game col-md">Currently playing: ' + data.game + '</div></div></div></a>');
      } else {
        $("#streamerlist").append('<a href="' + data.url + '" target="_blank"><div class="streamer"><div class="row"><div class="name col-md-6">' + data.display_name + '</div><div class="stream offline col-md-6">' + status + '</div></div></div></a>');
      }
    });
  }
});
