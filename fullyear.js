jQuery(function($){
	$( document )
		.drag("start",function( ev, dd ){
			return $('<div class="selection" />')
				.css('opacity', .65 )
				.appendTo( document.body );
		})
		.drag(function( ev, dd ){
			$( dd.proxy ).css({
				top: Math.min( ev.pageY, dd.startY ),
				left: Math.min( ev.pageX, dd.startX ),
				height: Math.abs( ev.pageY - dd.startY ),
				width: Math.abs( ev.pageX - dd.startX )
			});
		})
		.drag("end",function( ev, dd ){
			$( dd.proxy ).remove();
      document.compute_selected_dates();
		});

  var cal = (new Cal()).entire_year((new Date()).getFullYear());
  //build the full year calendar
  cal.map(function(mo) {
    $('.calendar').append((new Table(mo, {klass: 'month table'})).html_table());
  });

  //lable the months
  $('.month thead').each(function(i, e ) {
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    $(e).prepend(['<tr><th colspan=7>', months[i],'</th></tr>'].join(''));
  });

  $('td').each(function(i, e) {
    if($(e).text().match(/\d+/)) $(e).addClass('drop');
  });

  $('.fixed').html($.makeArray($('.dropped')).map(function(e) {
    var monthname = $(e).parent().parent().parent().find('tr:first-child').text();
    return [monthname.slice(0,3), $(e).text() + "," , $('.year').val()].join(' ')
  }).join('<br>'));

  document.compute_selected_dates = function() {
    var setting = $.makeArray($('.dropped')).map(function(e) {
      var monthname = $(e).parent().parent().parent().find('tr:first-child').text(), 
          two_digit_date = function(cell_text) {
            day_number = parseInt(cell_text);
            return (day_number < 10)? ['0', day_number].join('') : day_number;
          };
      return [monthname.slice(0,3),  two_digit_date($(e).text())].join(' '); //year is irrelevant
    });

    $('.fixed').html(setting.join('<br>'));

    //hook into storage model default is localStorage
    //localStorage.general_availability = JSON.stringify(setting);
    //for actual application ajax is required
    //
    (new AjaxStore()).update(setting);
    
    var objDiv = $(".fixed")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  };


	$('.drop')
		.drop("start",function(){
			$( this ).addClass("active");
		})
		.drop(function( ev, dd ){
			$( this ).toggleClass("dropped");
		})
		.drop("end",function(){
			$( this ).removeClass("active");
		});

	$.drop({ multi: true });	

  $('.drop').on('click', function()  {
			$( this ).toggleClass("dropped");
      document.compute_selected_dates();
  });
});
