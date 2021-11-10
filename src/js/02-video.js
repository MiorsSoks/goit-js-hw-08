import Player from '@vimeo/player'
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
      const player = new Player(iframe);

      player.on('play', function () {
        console.log('played the video!');
      });

      player.getVideoTitle().then(function (title) {
        console.log('title:', title);
      });

const onPlay = function (data) {
    player.getCurrentTime().then(function(seconds) {
    // seconds = the current playback position
    localStorage.setItem("videoplayer-current-time", seconds);
}).catch(function(error) {
    // an error occurred
});
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem("videoplayer-current-time")

player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});