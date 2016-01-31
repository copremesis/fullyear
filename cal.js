//returns the computed calendar 
//as 12 rows of each nx7 computed calendar
//for the given Year
//var cal = (new Cal()).entire_year(2015);

var Cal = function() {
  var first_of_next_month = function(y, m) {
    return (m != 11)? new Date(y, m+1 , 1) : new Date(y+1, 0, 1)
  };

  this.month = function(year, month) {
    var m = [],
        header =  ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        d = new Date(year, month, 1),
        row = (new Array(7)).join(':').split(':'),
        row_index = d.getDay();

    //one off method for day increment
    d.next_day = function() {
      this.setDate(this.getDate()+1);
    }
    m.push(header);

    while(d < first_of_next_month(year, month)) {
      row[row_index % 7] = d.getDate();
      d.next_day();
      row_index++;
      if(row_index % 7 == 0) {
        m.push(row);
        row = (new Array(7)).join(':').split(':');
      }
    }
    (row.join('') != '') && m.push(row);
    return m;
  };

  this.entire_year = function(year) {
    var that = this;
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function(month_number) {
      return that.month(year, month_number);
    });
  };
}
