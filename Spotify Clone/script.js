const audio = document.getElementById("audio");
const playBtn = document.querySelector(".play-icon");
const progressBar = document.querySelector(".progress-bar");
const currentTime = document.querySelector(".curr-time");
const totalTime = document.querySelector(".tot-time");
const heart = document.querySelector(".fa-heart");
const cards = document.querySelectorAll(".card");
const songTitle = document.querySelector(".p11");
const artist = document.querySelector(".p22");
const songImage = document.querySelector(".song");
const volume = document.querySelector(".range-bar");

// PLAY & PAUSE
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        playBtn.classList.replace("fa-pause", "fa-play");
    }
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    // Check if duration exists to prevent NaN errors
    if (audio.duration) { 
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        let min = Math.floor(audio.currentTime / 60);
        let sec = Math.floor(audio.currentTime % 60);
        
        if (sec < 10) sec = "0" + sec;
        currentTime.innerText = `${min}:${sec}`;
    }
});

// Total Duration
audio.addEventListener("loadedmetadata", () => {
    let min = Math.floor(audio.duration / 60);
    let sec = Math.floor(audio.duration % 60);
    
    if (sec < 10) sec = "0" + sec;
    totalTime.innerText = `${min}:${sec}`;
});

// Seek Song
progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

// Volume
volume.value = 50;
audio.volume = 0.5;

volume.addEventListener("input", () => {
    audio.volume = volume.value / 100;
});

// Like Button
heart.addEventListener("click", () => {
    heart.classList.toggle("fa-solid");
    heart.classList.toggle("fa-regular");

    if (heart.classList.contains("fa-solid")) {
        heart.style.color = "#1DB954"; // Spotify Green
    } else {
        heart.style.color = "white";
    }
});

// Card Click (Change Song UI)
cards.forEach((card) => {
    card.addEventListener("click", () => {
        songTitle.innerText = card.querySelector(".card-title").innerText;
        artist.innerText = "Spotify Artist";
        songImage.src = card.querySelector("img").src;
        
        // Reset audio time and play
        audio.currentTime = 0;
        if (audio.paused) {
            audio.play();
            playBtn.classList.replace("fa-play", "fa-pause");
        }
    });
});

// Static Alert Buttons
document.querySelector(".dark-badge").onclick = () => {
    alert("Install App Clicked");
};

document.querySelector(".fa-plus").onclick = () => {
    alert("Create Playlist");
};

document.querySelectorAll(".nav-option")[0].onclick = () => {
    alert("Home");
};

document.querySelectorAll(".nav-option")[1].onclick = () => {
    alert("Search");
};