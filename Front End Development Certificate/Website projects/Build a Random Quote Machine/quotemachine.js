$(document).ready(function () {
  // initiate with a quote
  getQuote();

  $('#new-quote').on('click', function() {
    getQuote();
  });
});

// get quote
var getQuote = function () {
  $.ajax({
    url: 'https://api.forismatic.com/api/1.0/?',
		dataType: 'jsonp',
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
		success: function (response) {
      $('#content').html(" " + response.quoteText);
      $("#tweet").attr("href", "https://twitter.com/home/?status=" + response.quoteText + ' ~ ' + response.quoteAuthor);
      // display known or unknown author
      if (response.quoteAuthor !== ""){
		    $('#author').html('~ ' + response.quoteAuthor);
		  } else {
				$('#author').html('~ ' + 'Unknown')
			}
    } // end of success
  })  // end of ajax
}     // end of getQuote function
