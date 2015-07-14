$(document).ready(function(){
  var divs = $('div[data-filter]');
  $('#search').on('keyup', function() {
      $('#search')
      var val = $.trim(this.value).toLowerCase();
      divs.hide();
      divs.filter(function() {
          return $(this).data('filter').search(val) >= 0
      }).show();
  });

  divs.on('click', function() {
      divs.not(this).hide();
      var text = $.trim($(this).text());
      $('#search').val(text);
  })
})
