function parseQueryFromUrl() {
   var queryParamName = "q";
   var search = window.location.search.substr(1);
   var parts = search.split('&');
   for (var i = 0; i < parts.length; i++) {
     var keyvaluepair = parts[i].split('=');
     if (decodeURIComponent(keyvaluepair[0]) == queryParamName) {
       return decodeURIComponent(keyvaluepair[1].replace(/\+/g, ' '));
     }
   }
   return '';
}

google.load('search', '1', { language: 'en' });
google.setOnLoadCallback(function() {
      //var devSearchId  = '012035405736811556000:puv70d-skec';
      var prodSearchId = '004711181796222465330:x7oxfjtettw';
      var customSearchControl = new google.search.CustomSearchControl(prodSearchId);
      customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
      customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_SELF);
      customSearchControl.setUserDefinedLabel({'web':'All Results', 'image':'Search images only'});
      var options = new google.search.DrawOptions();
      options.setAutoComplete(true);
      options.enableSearchResultsOnly();
      customSearchControl.draw('cse', options);
      var queryFromUrl = parseQueryFromUrl();
      if (queryFromUrl) {
        customSearchControl.execute(queryFromUrl);
        $("input[id='search-text']").val(queryFromUrl);
      }
}, true);

 function getSearchText() {
   var searchText = document.getElementById('query-input').value;
   if (searchText === "") {
       searchText = document.getElementById('search-text').value;
   }
   return searchText;
}

function search() {
   window.location = '/search.html?q=' + encodeURIComponent(getSearchText());
   return false;
}

$(window).load(function() {
    $(".gsc-tabsArea div div:first-child").text("All Results");
});
