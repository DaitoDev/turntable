// Grabbing the Control buttons
const playBtn = document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

// Grabbing audio
const audioSrc = document.querySelector(".audio");

// Grabbing Volume and Seeking sliders
const volumeSlider = document.querySelector(".volume-slider");
const seekSlider = document.querySelector(".track-seek");

// Grabbing audio timers
const elapsed = document.querySelector(".elapsed");
const totalDuration = document.querySelector(".duration");

// Grabbing class to toggle icon
const playPause = document.querySelector(".playPause");

// Grabbing the animation elements
const vinyl = document.querySelector(".vinyl"); //toggle rotate
const blinker = document.querySelector(".blinker"); //toggle blink

// Grabbing the diaplay items
const artistName = document.querySelector(".artistName"); //Artist name
const songName = document.querySelector(".songName"); //Song name
const albumArt = document.querySelector(".albumArt"); //Image to display on vinyl

// Array of all the tracks
// Note: Audio files were ignored for copyright reasons
const tracklist = [
  {
    name: "Outkast",
    song: "Ain't No Thang",
    album:
      "https://cdn.shoplightspeed.com/shops/649927/files/47149713/laface-outkast-southernplayalisticadillacmuzik-lp.jpg",
    path: "audio/Outkast - Aint No Thang.mp3",
  },
  {
    name: "Gorillaz",
    song: "Oil",
    album: "https://i.scdn.co/image/ab67616d0000b273efbba3463588a325949874d5",
    path: "audio/Gorillaz - Oil.mp3",
  },
  {
    name: "Kendrick Lamar",
    song: "Hiiighpower",
    album: "https://i.scdn.co/image/ab67616d0000b273eddb2639b74ac6c202032ebe",
    path: "audio/Kendrick Lamar - Hiiighpower.mp3",
  },
];

// Global variables
let isPlaying = false;
let songIndex = 0;

// ======================== ANIMATIONS =====================================
// Toggles the animations on when run
const animationOn = () => {
  vinyl.classList.add("rotate");
  blinker.classList.add("blink");
};

// Toggles the animations off when run
const animationOff = () => {
  vinyl.classList.remove("rotate");
  blinker.classList.remove("blink");
};

// ======================== SLIDER CONTROLS ===========================
// Seek controls and update
const updateSeekSlider = (e) => {
  if (isPlaying) {
    const { currentTime, duration } = e.target;

    // Handling total duration ==========
    // Update duration UI
    let durationMins = Math.floor(duration / 60);
    let durationSecs = Math.floor(duration % 60);
    if (durationSecs < 10) {
      durationSecs = `0${durationSecs}`;
    }
    if (durationSecs && durationMins) {
      totalDuration.textContent = `${durationMins}:${durationSecs}`;
    }

    // Handling elapsed time ============
    // Update Seek slider UI
    let elapsedPercent = (currentTime / duration) * 100;
    seekSlider.value = elapsedPercent;

    // UI elapsed numbers update
    let elapsedMins = Math.floor(currentTime / 60);
    let elapsedSecs = Math.floor(currentTime % 60);
    if (elapsedSecs < 10) {
      elapsedSecs = `0${elapsedSecs}`;
    }
    if (elapsedSecs && elapsedMins) {
      elapsed.textContent = `${elapsedMins}:${elapsedSecs}`;
    }
  }
};

// Change song progress on change or click
const songProgress = (e) => {
  let offset = e.offsetX;
  const { duration } = audioSrc;
  audioSrc.currentTime = (offset / 150) * duration;
};

// =============== PLAY PAUSE PREV NEXT CONTROLS =======================
// PLAYS audio, changes icon to pause, adds animation
const playSong = () => {
  isPlaying = true;
  playPause.classList.replace("fa-play-circle", "fa-pause-circle");
  animationOn();
  audioSrc.play();
};

// PAUSE audio, changes icon to play, removes animation
const pauseSong = () => {
  isPlaying = false;
  playPause.classList.replace("fa-pause-circle", "fa-play-circle");
  animationOff();
  audioSrc.pause();
};

// Plays NEXT song in tracklist
const nextSong = () => {
  if (songIndex < tracklist.length - 1) {
    songIndex++;
    loadSong(tracklist[songIndex]);
    playSong();
  } else {
    console.log("End of Track list");
  }
};

// Plays PREVIOUS song in tracklist
const prevSong = () => {
  if (songIndex >= 1) {
    songIndex--;
    loadSong(tracklist[songIndex]);
    playSong();
  } else {
    console.log("End of Track list");
  }
};
// ============ WHEN CALLED, LOADS ASSETS INTO THEIR ELEMENTS =========
const loadSong = (track) => {
  artistName.textContent = track.name;
  songName.textContent = track.song;
  albumArt.src = track.album;
  audioSrc.src = track.path;
};

// ======================== EVENT LISTENERS =================================
// Play or pause song on click
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
// Plays previous song on click
prevBtn.addEventListener("click", prevSong);
// Plays next song on click
nextBtn.addEventListener("click", nextSong);

// Controls volume slider
volumeSlider.addEventListener("change", () => {
  audioSrc.volume = volumeSlider.value / 100;
});

//UPDATES THE CURRENT TIME AND TOTAL TRACK DURATION
audioSrc.addEventListener("timeupdate", updateSeekSlider);

// Changes song progress based on where was clicked
seekSlider.addEventListener("click", songProgress);

// Jumps to next song when current one finishes
audioSrc.addEventListener("ended", nextSong);

// ========== ON LOAD, LOAD ASSETS IN TO PLAY ============
loadSong(tracklist[songIndex]);
