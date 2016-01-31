var AjaxStore = function() {

  var search = unescape(location.search.replace(/\?/, '')).split('&').reduce(function(obj, pairs) {
    var o = {}, pair = pairs.split("=");
    o[pair[0]] = pair[1];
    return $.extend(obj, o);
  }, {});

  this.host = ['/admin/blackouts/', search.access_key].join(''); 

  this.load = function(callback) {
    var callback = callback || function() {};
    $.getJSON(this.host, function(response) { 

      if( response.error ) { 
        alert(response.error);
        window.location = '/404.html';
      } else {
        var setting = response,
            month_map = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
          setting.map(function(d) {
          var day = d.split(/\s|,/);
          $($.makeArray($($('.month')[month_map[day[0]]]).find('td')).filter(function(e) { return $(e).text() == parseInt(day[1]) })[0]).addClass('dropped');
        });
        callback(); //continue loading any events for the elements
      }
    });
  }

  this.update = function(setting) {
    //console.log(setting);
    $.ajax({
      url: this.host,
      type: 'PUT',
      data: {blackout_dates: setting},
      success: function(reply) {
        //console.log(reply);
        $('.feedback').show('slow');
        setTimeout(function() {
          $('.feedback').hide('hide');
        }, 3000);
      }
    });
  }
}

