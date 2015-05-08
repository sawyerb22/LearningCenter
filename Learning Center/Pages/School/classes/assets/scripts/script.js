
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
  $('.video-holder').show().children().get(0).play();
})
$(".sub-menu .video-track a").click(function(e){
  e.preventDefault();
  $('.hero-top, .video-actions').hide();
  $('.video-holder, #video, .control').show();
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
  $('.rewatch').click(function(){
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
