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


//Set Video Times
$('.duration').text(video[0].duration);
$('.current').text(video[0].currentTime);

//Get video duration
video.on('loadedmetadata', function() {
  $('.duration').text(video[0].duration);
});

//Update Current time text
video.on('timeupdate', function(){
  $('.current').text(video[0].currentTime);
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
