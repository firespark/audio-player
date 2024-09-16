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
const playerImage = document.querySelector('.player-image img');
const playBtn = document.querySelector('.control-play');
const nextBtns = document.querySelectorAll('.control-next');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');

const objLength = Object.keys(animals).length;

const audio = new Audio();

let id = 0;

function changeBackground() {
    wrapper.classList.add('background-fadeIn');
    wrapper.style.backgroundImage = `url(./img/${animals[id].file}.png)`;
    playerImage.src = `./img/${animals[id].file}.png`;
}

function playAudio() {
    if (!playBtn.classList.contains('pause')) {
        playBtn.classList.add('pause');
        playBtn.classList.remove('play');
    }
    
    audio.src = `./audio/${animals[id].file}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

function pauseAudio() {
    if (!playBtn.classList.contains('play')) {
        playBtn.classList.add('play');
        playBtn.classList.remove('pause');
    }
    audio.pause();
}

function setNextId() {
    previous.dataset.id = (id == 0) ? (objLength - 1) : id -= 1;
    next.dataset.id = (id == (objLength - 1)) ? 0 : id += 1;
    alert(objLength - 1)
}

playBtn.addEventListener('click', function() {
    if (this.classList.contains('play')) {
        playAudio();
    }
    else {
        pauseAudio();
    }
});

wrapper.addEventListener('animationend', () => {
    wrapper.classList.remove('background-fadeIn');
});

nextBtns.forEach(btn => {
    
    btn.addEventListener('click', function() {
        id = parseInt(this.dataset.id);
        setNextId();
        changeBackground();
        audio.pause();
        playAudio();

    });
    
});

setNextId();
document.getElementById('year').textContent = new Date().getFullYear();