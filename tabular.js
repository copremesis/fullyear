//turns 2 dimensional array into HTML table
var Table = function(m, options) {

  this.trow = function(row) {
    return ['<tr>', row.map(function(e) { return ['<td>', e, '</td>'].join(''); }, null).join(''), '</tr>'].join('');
  };

  this.thead = function(row) {
    return ['<thead><tr>', row.map(function(e) { return ['<th>', e, '</th>'].join(''); }, null).join(''), '</tr></thead>'].join('');
  };

  this.tbody = function(tbody) {
    var that = this;
    return ['<tbody>', tbody.map(function(row) {
      return that.trow(row);
    }, this).join(''), '</tbody>'].join('');
  };

  this.html_table = function(options) {
    var thead = [], trow = [], tbody = [], that = this, options = options || {};
    this.first_row = true;
    options.callback = options.callback || function() {};
    this.m.map(function(row, i) {
      if (that.first_row) {
        thead = row.slice(0); 
        that.first_row = false;
      } else {
        tbody.push(row.slice(0));
      }
    });
    return ['<table cellspacing=0 ', 'id="', this.options.id || Math.floor((1 << 20) * Math.random()).toString(16),'" class="', this.options.klass || '', '" >', this.thead(thead), this.tbody(tbody), '</table>'].join('');
  };

  this.build_matrix = function(json) {
    var items = json, m = [], fields = [], row = [], q = true;
    items.map(function(item, i) {
      row = [];
      for(k in item) {
        q && fields.push(k);
        row.push(item[k]);
      }
      q && m.push(fields);
      m.push(row);
      q = false;
    });

    return m;
  };

  this.options = options || {};
  this.klass = this.options.klass || '';
  this.id = this.options.id || '';
  //this.m = this.build_matrix(json) || [['f1', 'f2', 'f3'], [0, 0, 0], [0, 0, 0]]; //M X N table first row is the fields
  this.m = m;
};

