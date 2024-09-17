const animals = {
    0: {
        file: 'raccoon',
        name: 'Raccoon',
        song: 'Quack-Quack',
    },
    1: {
        file: 'donkey',
        name: 'Donkey',
        song: 'Hee-Haw',
    },
    2: {
        file: 'fox',
        name: 'Fox',
        song: 'Aaa-ha-ha-ha',
    },
    3: {
        file: 'frog',
        name: 'Frog',
        song: 'He-he-he-he-he',
    },
    4: {
        file: 'goat',
        name: 'Goat',
        song: 'AAAUUUUU',
    },
    5: {
        file: 'marmot',
        name: 'Marmot',
        song: 'AAAAAAA',
    },
    6: {
        file: 'seal',
        name: 'Seal',
        song: 'Bleat, Bleat...',
    },
};

const wrapper = document.querySelector('.wrapper');
const player = document.querySelector(".player-area");
const playerImage = document.querySelector('.player-image img');
const playBtn = document.querySelector('.control-play');
const nextBtns = document.querySelectorAll('.control-next');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const singer = document.querySelector('.singer');
const song = document.querySelector('.song');

const volumeControl = document.querySelector(".player-volume");

const progress = document.querySelector(".player-progress");
const progressFill = document.querySelector(".player-progress-fill");

const playerCurrentTime = document.querySelector(".player-time-current");
const playerDuration = document.querySelector(".player-time-duration");

const objLength = Object.keys(animals).length;

const audio = new Audio();

let playlist = [];
let id = 0;
let currentTime = 0;
let volume = 100;

function changeBackground() {
    wrapper.classList.add('background-fadeIn');
    wrapper.style.backgroundImage = `url(./img/${animals[id].file}.png)`;
    playerImage.src = `./img/${animals[id].file}.png`;
}

function changeInfo() {
    singer.innerHTML = animals[id].name;
    song.innerHTML = animals[id].song;
  }

function playAudio() {
    if (!playBtn.classList.contains("pause")) {
        playBtn.classList.add("pause");
        playBtn.classList.remove("play");
    }
    prepareSong();
    audio.play();
}
  
function pauseAudio() {
    if (!playBtn.classList.contains("play")) {
        playBtn.classList.add("play");
        playBtn.classList.remove("pause");
    }
    currentTime = audio.currentTime;
    audio.pause();
}

function rewind(event) {
    const newTime = (event.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = newTime;
    currentTime = newTime;
}

function getId(next = true) {
    if (next) {
        return id == objLength - 1 ? 0 : id + 1;
    }
    
    return id == 0 ? objLength - 1 : id - 1;
}

function setNextId() {
    previous.dataset.id = getId(false);
    next.dataset.id = getId();
}

function formatDuration(seconds) {
    if (!seconds) return new Date(0).toISOString().slice(14, 19);
    return new Date(1000 * seconds).toISOString().slice(14, 19);
}
  
function setTimes() {
    playerCurrentTime.textContent = formatDuration(audio.currentTime);
    playerDuration.textContent = formatDuration(audio.duration);
}
  
function progressUpdate() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.flexBasis = `${percent}%`;
}

function prepareSong() {
    audio.src = `./audio/${animals[id].file}.mp3`;
    audio.currentTime = currentTime;
}

playBtn.addEventListener("click", function () {

    if (this.classList.contains("play")) {
        playAudio();
    } 
    else {
        pauseAudio();
    }
});

wrapper.addEventListener('animationend', () => {
    wrapper.classList.remove('background-fadeIn');
});

nextBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        id = parseInt(this.dataset.id);
        currentTime = 0;
        setNextId();
        changeBackground();
        changeInfo();
        audio.pause();
        setTimes();
        playAudio();
    });
});
  
progress.addEventListener("click", rewind);

//выполняется когда аудио готово к проигрыванию
audio.addEventListener("canplaythrough", () => {
    progressUpdate();
    setTimes();
});

audio.addEventListener("timeupdate", () => {
    progressUpdate();
    setTimes();
});

audio.addEventListener("ended", () => {
    if (!playBtn.classList.contains("play")) {
        playBtn.classList.add("play");
        playBtn.classList.remove("pause");
    }
    audio.currentTime = 0;
    currentTime = 0;
    progressUpdate();
    id = getId();
    changeBackground();
    changeInfo();
    setNextId();
    /* setTimes(); */
    playAudio();
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
    volume = volumeControl.value * 100;
});


prepareSong();
setNextId();
changeBackground();
changeInfo();
setTimes();


document.getElementById('year').textContent = new Date().getFullYear();