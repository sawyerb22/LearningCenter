(function(){
var $videoContainer = $('#video-container');
var $playerWrapper = $('.lc-video');
var $player = $('#video');
var $actionControls = $('.video-actions');
var activeItem;
var $tracks = $('#colorTherory');
var $heroBanner = $('.hero-top');
var $body = $('body');
var $playButton = $('.btnPlay');
var $startButton = $('.start');
var $replayButton = $('.rewatch');
var $nextButton = $('.next-video');
var $quizButton = $('.take-quiz');
var $take



var curriculumItems;

$.ajax({
    type: 'GET',
    url: 'data/curriculum.json',
    dataType: 'json',
    success: function(data){
      curriculumItems = data;
      buildCurriculumItems();
    },
  error: function(error, status, thrown){
    console.log(error, status, thrown);
  }
});
function buildCurriculumItems(){
  curriculumItems.forEach(function(item, index){
    var li = $('<li class="video-track">'+item.title+'</li>');
    var span = $('<span class="time-total">'+item.duration+'</span>');
    var i = $('<i>');
    if (item.type === 'video'){
      i.addClass('icon-play-circle-outline');
    }else if (item.type === 'quiz'){
      i.addClass('icon-points_expense');
    }
    li.on('click', function(){
      selectItem(item);
    });
    item.$element = li.prepend([span,i]);
    $tracks.append(item.$element);
    item.id = index;
  });

}

  function showVideoControls(){
    $playerWrapper.hide();
    $actionControls.show();
  }
  function hideVideoControls(){
    $playerWrapper.show();
    $actionControls.hide();
  }

  function playVideo(){
    $player.attr("src", activeItem.src).get(0).play();
  }

  //Swap Video when Clicking in the Accordion Class list
  function selectItem(item){
    if (activeItem){
      activeItem.$element.removeClass("active");
    }
    activeItem = item;
    $heroBanner.hide();
    $videoContainer.show();
    playVideo();
    activeItem.$element.addClass("active");
    $body.animate({scrollTop:0},400);
    }

//Start Class/Course top Button
$startButton.click(function(e){
  e.preventDefault;
  $heroBanner.hide();
  $videoContainer.show();
  activeItem = curriculumItems[0];
  activeItem.$element.addClass('active');
  playVideo();
});

//Show Next Steps when Video Ends
$player.on('playing',function(){
  hideVideoControls()
  $playButton.removeClass('icon-play-arrow').addClass('icon-pause');
}).on('ended',function(){
  if (activeItem.id === (curriculumItems.length - 2)){
    $nextButton.hide();
    $quizButton.show();
  }else{
    $nextButton.show();
    $quizButton.hide();
  }
  showVideoControls();
  this.webkitExitFullScreen();
  this.mozExitFullScreen();
  $playButton.removeClass('icon-pause').addClass('icon-play-arrow');
});

//Replays the Video you just watched
  $replayButton.click(playVideo);

  //Grab the next video in the list when the user clicks watch next video
  $nextButton.click(function(e){
    e.stopPropagation();
    activeItem.$element.removeClass('active');
    activeItem = curriculumItems[activeItem.id + 1];
    activeItem.$element.addClass('active');
    playVideo();
  });

//Open the first Drawer in the class
$('.acc-lv1:first-child').addClass('acc-open');

//Open and Close Class list Accordion
$('.acc-lv1 > a , .sub-level').on('click',function(e){
    e.preventDefault();
    var $tab = $(this).parent();
    var openClass = $tab.hasClass('acc-open') ? '':'acc-open';
    $('.acc-open').not($tab.parent().parent()).removeClass('acc-open');
      $tab.addClass(openClass);
  });



})()
