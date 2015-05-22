  var dur = video.duration;
  var min = Math.floor(dur/60);
  var hours = Math.floor(dur/3600);
  var sec = Math.round(dur%60);
  var durationFormated = formatNumber(hours) + ':' + formatNumber(Math.floor(min%60)) + ':' + formatNumber(sec);
function formatNumber(num){
  return num > 9 ? num.toString() : '0'+num.toString();
}

alert(durationFormated);
window.onload = function () {
  var video = document.getElementById('video'),
      seeker = document.getElementById('seeker'),
      volume = document.getElementById('volume'),
      play = document.getElementById('play-pause'),
      mute = document.getElementById('mute'),
      full = document.getElementById('full-screen');


  console.log(durationFormated)
  seeker.addEventListener('change', function() {
    var time = video.duration * (seeker.value / 100);
    video.currentTime = time;
  });

  video.addEventListener('timeupdate', function() {
    var value = (100 / video.duration) * video.currentTime;
    seeker.value = value;
  });

  video.addEventListener('ended', function() {
    play.innerHTML = '<i class="icon icon-replay"></i>';
  });

  seeker.addEventListener('mousedown', function() {
    video.pause();
  });
  seeker.addEventListener('mouseup', function() {
    video.play();
  });

  volume.addEventListener('change', function() {
    video.volume = volume.value;
  });

  play.addEventListener('click', function () {
    if (video.paused == true) {
      video.play();
      play.innerHTML = '<i class="icon icon-pause"></i>';
    }
    else {
      video.pause();
      play.innerHTML = '<i class="icon icon-play-arrow"></i>';
    }
  });

  mute.addEventListener('click', function () {
    if (video.muted == false) {
      video.muted = true;
      mute.innerHTML = '<i class="icon icon-volume-mute3"></i>';
    }
    else {
      video.muted = false;
      mute.innerHTML = '<i class="icon icon-volume-medium"></i>';
    }
  });

  full.addEventListener('click', function() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
    else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    }
    else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  });
}
