if (window.top === window) {
  function showResult(message_event) {
    if (message_event.name === "shorturl") {
      var req = message_event.message;
      var url = req.responseText;
      jQuery('#xavcc-shorturl-result').remove();

      // add items in the top of the page
      jQuery('body').prepend('<div id="xavcc-shorturl-result"><div class="xavcc-shorturl-result-success"><a id="xavcc-shorturl-result-shorturl" href="#"></a></div><div class="xavcc-shorturl-result-error"></div><div class="xavcc-shorturl-result-success"><ul><li><a id="xavcc-shorturl-result-view-details" href="#">View details</a></li><li><a id="xavcc-shorturl-result-twitter" href="#">Twitter</a></li><li><a id="xavcc-shorturl-result-delicious" href="#">Delicious</a></li><li><a id="xavcc-shorturl-result-blogmarks" href="#">Blogmarks</a></li></ul></div></div>');

      jQuery('#xavcc-shorturl-result').hide().fadeIn(1000).click(function(event){
        event.stopPropagation();
      });

      jQuery('body').click(function() {
        jQuery('#xavcc-shorturl-result').fadeOut('slow', function() { $(this).remove() });
      });

      if (200 == req.status) {
        $('.xavcc-shorturl-result-error').attr('display', 'none');

        $('#xavcc-shorturl-result-shorturl').attr('href', url).html(url);
        $('#xavcc-shorturl-result-view-details').attr('href', url + '/');
        var encoded_url = encodeURIComponent(url);
        $('#xavcc-shorturl-result-twitter').attr('href', 'http://twitter.com/?status=' + encoded_url);
        $('#xavcc-shorturl-result-delicious').attr('href', 'http://www.delicious.com/save?v=5&noui&jump=close&url=' + encoded_url);
        $('#xavcc-shorturl-result-blogmarks').attr('href', 'http://blogmarks.net/my/new.php?mini=1&simple=1&url=' + tablink);

        $('.xavcc-shorturl-result-success').attr('display', 'block').attr('height', 'auto');
      } else {
        $('.xavcc-shorturl-result-success').remove();
        $('#xavcc-shorturl-result').attr('height', '50px');
        $('.xavcc-shorturl-result-error').html(url);
        $('.xavcc-shorturl-result-error').attr('border', '1px white solid');
      }
    }
  }

  safari.self.addEventListener("message", showResult, false);
}