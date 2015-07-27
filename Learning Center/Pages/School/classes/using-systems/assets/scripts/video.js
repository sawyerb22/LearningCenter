//Video
//return the Video object
var video = $('#video');

//Play/Pause controls clicked
$('.btnPlay').on('click', function() {
   if(video[0].paused) {
      video[0].play();
      $('.btnPlay').removeClass('icon-play-arrow').addClass('icon-pause');
   }
   else {
      video[0].pause();
      $('.btnPlay').removeClass('icon-pause').addClass('icon-play-arrow');
   }
   return false;
});

//Update Formatnum

//Get Duration in proper format
  var duration = video[0].duration;
  var durmin = Math.floor(duration/60);
  //var hours = Math.floor(dur/3600);
  var dursec = Math.round(duration%60);
  var initdurationFormated =  formatNumber(Math.floor(durmin%60)) + ':' + formatNumber(dursec);
  function formatNumber(num){
    return num > 9 ? num.toString() : '0'+num.toString();
  }

//Set Video Times
$('.duration').text(initdurationFormated);

//Get video duration
video.on('loadedmetadata', function() {
  $('.duration').text(initdurationFormated);
});

//Update Current time text
video.on('timeupdate', function(){
  var current = video[0].currentTime;
  var min = Math.floor(current/60);
  //var hours = Math.floor(current/3600);
  var sec = Math.round(current%60);
  var currentFormated =  formatNumber(Math.floor(min%60)) + ':' + formatNumber(sec);

  function formatNumber(num){
    return num > 9 ? num.toString() : '0'+num.toString();
  }
  $('.current').text(currentFormated);
})

//Update Current Play Time
video.on('timeupdate', function() {
   var currentPos = video[0].currentTime; //Get currenttime
   var maxduration = video[0].duration; //Get video duration
   var percentage = 100 * currentPos / maxduration; //in %
   $('.timeBar').css('width', percentage+'%');
});

// Click on Progress bar to skip around video
var timeDrag = false;   /* Drag status */
$('.progressBar').mousedown(function(e) {
   timeDrag = true;
   updatebar(e.pageX);
});

$(document).mouseup(function(e) {
   if(timeDrag) {
      timeDrag = false;
      updatebar(e.pageX);
   }
});
$(document).mousemove(function(e) {
   if(timeDrag) {
      updatebar(e.pageX);
   }
});

//update Progress Bar control
var updatebar = function(x) {
var progress = $('.progressBar');
var maxduration = video[0].duration; //Video duraiton
var position = x - progress.offset().left; //Click pos
var percentage = 100 * position / progress.width();
 //Check within range
 if(percentage > 100) {
    percentage = 100;
 }
 if(percentage < 0) {
    percentage = 0;
 }

 //Update progress bar and video currenttime
 $('.timeBar').css('width', percentage+'%');
 video[0].currentTime = maxduration * percentage / 100;
};

//Mute/Unmute control clicked
$('.muted').click(function() {
   $(this).toggleClass("icon-volume-up icon-volume-off");
   video[0].muted = !video[0].muted;
   return false;
});

//Volume control clicked
$('.volumeBar').on('mousedown', function(e) {
   var position = e.pageX - volume.offset().left;
   var percentage = 100 * position / volume.width();
   $('.volumeBar').css('width', percentage+'%');
   video[0].volume = percentage / 100;
});

//Fullscreen Video
$('.fullscreen').on('click', function() {
   //For Webkit
   video[0].webkitEnterFullscreen();
   //For Firefox
   video[0].mozRequestFullScreen();
   return false;
});
