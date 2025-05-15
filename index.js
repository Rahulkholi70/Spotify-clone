console.log("Spotify");

let songIndex = 0;
let Sposter = document.getElementById('poster');
let audioElement = new Audio("song/hola.mp3");
let playbtn = document.getElementById("play-btn");
let curntSng = document.getElementById("currntName");
let progresBar = document.getElementById("Prog-bar");
let songCards = Array.from(document.getElementsByClassName("songCard"));
let songContainer = document.querySelector('.songContainer');

let songs = [
  { songName: "hola", filePath: "song/hola.mp3", coverPhoto: "songphoto/songimg1.png" },
  { songName: "euphoria", filePath: "song/euphoria.mp3", coverPhoto: "songphoto/songimg2.png" },
  { songName: "gnx", filePath: "song/gnx.mp3", coverPhoto: "songphoto/songimg6.jpg" },
  // { songName: "gnx", filePath: "song/gnx.mp3", coverPhoto: "songphoto/songimg6.jpg" },
  // { songName: "gnx", filePath: "song/gnx.mp3", coverPhoto: "songphoto/songimg6.jpg" },
  { songName: "tu jaagi", filePath: "song/rev.mp3", coverPhoto: "songphoto/songimg4.jpg" },
  { songName: "rcdc", filePath: "song/rc.mp3", coverPhoto: "songphoto/songimg5.jpg" },
  { songName: "reincarnated", filePath: "song/rein.mp3", coverPhoto: "songphoto/songimg6.jpg" },
  // { songName: "reincarnated", filePath: "song/rein.mp3", coverPhoto: "songphoto/songimg6.jpg" },
  // { songName: "reincarnated", filePath: "song/rein.mp3", coverPhoto: "songphoto/songimg6.jpg" },
  // { songName: "reincarnated", filePath: "song/rein.mp3", coverPhoto: "songphoto/songimg6.jpg" },
]; 
//poster
Sposter.src = songs[0].coverPhoto;

// dyn add sngs

songs.forEach((song, index) => {
  const songCard = document.createElement("div");
  songCard.classList.add("songCard");
  songCard.innerHTML = ` <img src="${song.coverPhoto}" alt="${song.songName}">
    <span class="sngName">${song.songName}</span>
    <span class="songtime">
      <span class="timestamp">
        00:00 <i id="${index}" class="far playButton fa-play-circle"></i>
      </span>
    </span>`;
  songContainer.appendChild(songCard);
});

songCards.forEach((e, i) => {
  e.getElementsByTagName("img")[0].src = songs[i].coverPhoto;
  e.getElementsByClassName("sngName")[0].innerText = songs[i].songName;
});

playbtn.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    playbtn.classList.remove("fa-play");
    playbtn.classList.add("fa-pause");
  } else {
    audioElement.pause();
    playbtn.classList.add("fa-play");
    playbtn.classList.remove("fa-pause");
  }
});

audioElement.addEventListener("timeupdate", () => {
  let prog = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progresBar.value = prog;
});

progresBar.addEventListener("change", () => {
  audioElement.currentTime = (progresBar.value * audioElement.duration) / 100;
});

const faPlay = () => {
  Array.from(document.getElementsByClassName("playButton")).forEach((e) => {
    e.classList.remove("fa-pause-circle");
    e.classList.add("fa-play-circle");
  });
};

Array.from(document.getElementsByClassName("playButton")).forEach((e) => {
  e.addEventListener("click", (ele) => {
    faPlay();
    songIndex = parseInt(ele.target.id);
    ele.target.classList.remove("fa-play-circle");
    ele.target.classList.add("fa-pause-circle");
    audioElement.src = songs[songIndex].filePath;
    curntSng.innerText = songs[songIndex].songName;
    Sposter.src = songs[songIndex].coverPhoto;  
    audioElement.currentTime = 0;
    audioElement.play();
    playbtn.classList.remove("fa-play");
    playbtn.classList.add("fa-pause");
  });
});

document.getElementById('next').addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  curntSng.innerText = songs[songIndex].songName;
  audioElement.src = songs[songIndex].filePath;
  Sposter.src = songs[songIndex].coverPhoto; 
  audioElement.currentTime = 0;
  audioElement.play();
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
});

document.getElementById('prev').addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  curntSng.innerText = songs[songIndex].songName;
  audioElement.src = songs[songIndex].filePath;
  Sposter.src = songs[songIndex].coverPhoto; 
  audioElement.currentTime = 0;
  audioElement.play();
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
});

