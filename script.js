/* script.js */
const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("play-icon");
const volumeSlider = document.getElementById("volume");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("time");
const replayBtn = document.querySelector(".replay-btn");
const speedDisplay = document.getElementById("speed-display");
const speedOptions = document.getElementById("speed-options");
const resDisplay = document.getElementById("res-display");
const resOptions = document.getElementById("res-options");
const fullscreenBtn = document.getElementById("fullscreen");
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currAngle = 0;

prevBtn.addEventListener('click', () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

nextBtn.addEventListener('click', () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

// Play/Pause toggle
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playIcon.src = "assets/pause-icon.svg";
  } else {
    video.pause();
    playIcon.src = "assets/play-icon.svg";
  }
});
// Volume
volumeSlider.addEventListener(
  "input",
  () => (video.volume = volumeSlider.value)
);
// Progress & time update
video.addEventListener("timeupdate", () => {
  const pct = (video.currentTime / video.duration) * 100;
  progressBar.style.width = pct + "%";
  timeDisplay.textContent =
    formatTime(video.currentTime) + " / " + formatTime(video.duration);
});
// Seek
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
});
// Replay
replayBtn.addEventListener("click", () => {
  let colors = ["#76174d", "#0E5652", "#521776"];
  document.body.style.background =
    colors[parseInt(currAngle/360) % colors.length];
  replayBtn.style.transition = "0.5s";
  replayBtn.style.transform = `rotate(${currAngle}deg)`;
  currAngle += 360;
});
// Fullscreen
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.parentElement.requestFullscreen();
    video.style.height = "100%";
  }
  else {
    document.exitFullscreen();
    video.style.height = "65vh";
  }
});
// Speed dropdown
speedDisplay.parentElement.addEventListener("click", () => {
  speedOptions.style.display =
    speedOptions.style.display === "block" ? "none" : "block";
});
speedOptions.querySelectorAll("li").forEach((li) =>
  li.addEventListener("click", () => {
    video.playbackRate = parseFloat(li.dataset.speed);
    speedDisplay.textContent = li.textContent;
    speedOptions.style.display = "none";
  })
);
// Resolution dropdown stub
resDisplay.parentElement.addEventListener("click", () => {
  resOptions.style.display =
    resOptions.style.display === "block" ? "none" : "block";
});
resOptions.querySelectorAll("li").forEach((li) =>
  li.addEventListener("click", () => {
    resOptions.querySelector(".selected").classList.remove("selected");
    li.classList.add("selected");
    resDisplay.textContent = li.textContent;
    resOptions.style.display = "none";
    // implement actual source switch if needed
  })
);
// Time formatting
function formatTime(t) {
  const m = Math.floor(t / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

window.addEventListener('keydown', (e)=>{
  if (e.key == ' '){
    if (video.paused) {
      video.play();
      playIcon.src = "assets/pause-icon.svg";
    } else {
      video.pause();
      playIcon.src = "assets/play-icon.svg";
    }
  }
  else if (e.key == "ArrowLeft"){
      video.currentTime = Math.max(0, video.currentTime - 10);
  }
  else if (e.key == "ArrowRight"){
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
  }
});