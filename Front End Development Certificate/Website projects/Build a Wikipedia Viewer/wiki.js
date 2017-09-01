$(document).ready(function() {

  // variables for English Wikipedia API
  var urlAPI = "https://en.wikipedia.org/w/api.php";
  var method = "?action=query&format=json&generator=search"
   // intro extract with maximum 3 sentences
  var extract = "&prop=extracts|&exintro&exlimit=max&exsentences=3";
  // search is limited to 10
  var search = "&gsrlimit=10&gsrsearch=";
  var title = "";
  var pages = "";

  // set random wiki article link value
  $("#random").attr("href", "https://en.wikipedia.org/wiki/Special:Random");

  $('#search').on('click', function() {
    // reset any loaded pages
    if (pages) {
      pages = "";
    }
    storeTitle();

    $("#result").html("Searching...");
    loadWiki();
  });

  // API will use user input as the title for search
  function storeTitle() {
    title = document.getElementById("title").value;
  }

  // this function is responsible for loading wiki API
  function loadWiki() {
    $.getJSON(urlAPI + method + extract + search + title + "&callback=?", function(response) {
    storeWikiResults(response);
    }).then(listWikiResults)
  }

  function storeWikiResults(response) {
    console.log(response.query.pages);
    pages = response.query.pages;
  }

  function listWikiResults() {
    if (pages) {
      $("#result").html("<p>Search results:</p>");
      for (var i = 0; i<10; i++) {
        $("#result").append('<div class="wikiTitle">' + pages[Object.keys(pages)[i]].title + '</div>');
        $("#result").append('<div class="wikiExtract">' + pages[Object.keys(pages)[i]].extract + '</div>');
        $("#result").append('<div class="wikiLink"><a href="https://en.wikipedia.org/?curid=' +   pages[Object.keys(pages)[i]].pageid + '" target="_blank">Visit this article</div>')
      }
      $("footer").css("position", "relative");
    } else {
      // make sure footer is positioned to the bottom
      $("footer").css("position", "absolute");
      $("#result").html("<p>Please enter a valid search.</p>");
    }
  }
});
