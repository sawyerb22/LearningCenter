// Disable Radio Buttons After another has been selected,
// Add Selected Class
$(document).on('click', ':radio', function() {
  var radioName = $(this).attr("name"); //Get radio name
  $(":radio[name='" + radioName + "']:not(:checked)").attr("disabled", true); //Disable all unchecked radios with the same name
  $(this).parent().addClass('selected');
});
$(document).on('click', '.buttons-wrapper', function(){
 $('.feedback').click(function(){
    $('.feedback-container').show();
    $('.modal-body').hide();
 });
});
