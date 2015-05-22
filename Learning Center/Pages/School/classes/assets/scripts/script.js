
//Course or Class Overview accordions
$('.acc-lv1 > a , .sub-level').on('click',function(e){
    e.preventDefault();
    var $tab = $(this).parent();
    var openClass = $tab.hasClass('acc-open') ? '':'acc-open';
    $('.acc-open').not($tab.parent().parent()).removeClass('acc-open');
      $tab.addClass(openClass);
  });
$('.acc-drawer a').on('click',function(e){
  e.preventDefault();
});

$('.start').click(function(e){
  e.preventDefault;
  $('.hero-top').hide();
  $('#video-container').show().children().get(0).play();
})
$(".sub-menu .video-track a").click(function(e){
  e.preventDefault();
  $('.hero-top, .video-actions').hide();
  $('#video-container').show();
  $("#video").attr("src", $(this).attr("href")).get(0).play();
  $(".video-track .active").removeClass("active");
  $(this).addClass("active");
  $("body").scrollTop(0).animate(500);
});

$('.next-video').click(function(){
  $('.video-actions').hide();
  $('#video, .control').show();
  $("#video").attr("src", $(this).attr("href")).get(0).play();
});
//Show Next Step on Video Ended Function
$('#video').on('ended', function(){
  $('#video').hide();
  $('.control').hide();
  $('.video-actions').show();
  $('.top-content').addClass('next-action');
  $('.rewatch').click(function(){
    $('.top-content').removeClass('next-action');
    $('#video').show();
    $('.control').show();
    $('.video-actions').hide();
    video[0].play();
  });
});

if($('#video-container').find('#video').length){
  $('.video-actions').hide();
  console.log('It has the #video element');
} else {
  console.log('Theres no class in here called control');
}


// Disable Radio Buttons After another has been selected,
// Add Selected Class

$(document).on('click', ':radio', function() {
  var radioName = $(this).attr("name"); //Get radio name
  $(":radio[name='" + radioName + "']:not(:checked)").attr("disabled", true); //Disable all unchecked radios with the same name
  $(this).parent().addClass('selected');
});

