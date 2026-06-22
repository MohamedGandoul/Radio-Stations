// German Radio Stations (10 Stations Now!)
const stations = [
    {
        name: "Deutschlandfunk",
        stream: "https://st01.sslstream.dlf.de/dlf/01/high/aac/stream.aac",
        description: "News & Current Affairs 📰 (192kbps AAC)"
    },
    {
        name: "1LIVE",
        stream: "https://wdr-1live-live.icecastssl.wdr.de/wdr/1live/live/mp3/128/stream.mp3",
        description: "Young Radio - Music & Entertainment 🎵"
    },
    {
        name: "SWR3",
        stream: "http://liveradio.swr.de/sw282p3/swr3/play.mp3",
        description: "Pop Music & Hits 🎶 (192kbps)"
    },
    {
        name: "NDR2",
        stream: "http://icecast.ndr.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3",
        description: "Radio from Northern Germany 🎸"
    },
    {
        name: "Antenne Bayern",
        stream: "http://mp3channels.webradio.antenne.de/antenne",
        description: "Bavarian Music & Fun 🎤"
    },
    {
        name: "Rock Antenne",
        stream: "https://stream.rockantenne.de/rockantenne/stream/mp3",
        description: "Pure Heavy Rock & Classic Metal 🎸⚡"
    },
    {
        name: "TechnoBase.FM",
        stream: "http://listen.technobase.fm/mp3.pls",
        description: "HandsUp, Dance & Electronic Beats 🎧🚀"
    },
    {
        name: "WDR 4",
        stream: "https://wdr-wdr4-live.icecastssl.wdr.de/wdr/wdr4/live/mp3/128/stream.mp3",
        description: "Good Old Classics & 80s Hits 🕺"
    },
    {
        name: "Jazz Radio Berlin",
        stream: "http://jazzradio.stream.ne.onstreamnetworks.com/jazzradio.mp3",
        description: "Smooth & Chill Jazz Vibes 🎷☕"
    },
    {
        name: "RPR1. 90er",
        stream: "http://stream.rpr1.de/rpr-90er/mp3-128/",
        description: "Best Flashbacks from the 90s! 💥"
    }
];

// Player Elements
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = playPauseBtn.querySelector('i');
const volumeSlider = document.getElementById('volume-slider');
const stationName = document.getElementById('station-name');
const songTitle = document.getElementById('song-title');
const stationsList = document.getElementById('stations-list');
const albumPlaceholder = document.querySelector('.album-placeholder');
const equalizer = document.getElementById('equalizer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Display Stations
function displayStations() {
    stationsList.innerHTML = '';

    stations.forEach((station, index) => {
        const card = document.createElement('div');
        card.className = `station-card ${index === currentIndex ? 'active' : ''}`;
        card.innerHTML = `
            <h3>${station.name}</h3>
            <p>${station.description}</p>
        `;

        card.onclick = () => {
            currentIndex = index;
            loadStation(stations[currentIndex]);
            displayStations();
        };

        stationsList.appendChild(card);
    });
}

// Control UI State
function setPlayingState(isPlaying) {
    if (isPlaying) {
        playPauseIcon.className = 'fas fa-pause';
        albumPlaceholder.classList.add('playing');
        equalizer.classList.add('active');
    } else {
        playPauseIcon.className = 'fas fa-play';
        albumPlaceholder.classList.remove('playing');
        equalizer.classList.remove('active');
    }
}

// Load Station
function loadStation(station) {
    audio.src = station.stream;
    stationName.textContent = station.name;
    songTitle.textContent = 'Tuning in... ⏳⚡';

    audio.play()
        .then(() => {
            setPlayingState(true);
            songTitle.textContent = '🎸 Live & Rocking!';
        })
        .catch(error => {
            console.error('Error:', error);
            songTitle.textContent = '❌ Offline - Try another channel';
            setPlayingState(false);
        });
}

// Play/Pause Toggle
playPauseBtn.onclick = () => {
    if (!audio.src) {
        songTitle.textContent = '👇 Click a station to start the party!';
        return;
    }

    if (audio.paused) {
        audio.play()
            .then(() => {
                setPlayingState(true);
                songTitle.textContent = '🎸 Live & Rocking!';
            })
            .catch(error => console.error(error));
    } else {
        audio.pause();
        setPlayingState(false);
        songTitle.textContent = '⏸ Paused Party';
    }
};

volumeSlider.oninput = (e) => {
    audio.volume = e.target.value;
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + stations.length) % stations.length;
    loadStation(stations[currentIndex]);
    displayStations();
};

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % stations.length;
    loadStation(stations[currentIndex]);
    displayStations();
};

// Listeners
audio.onplaying = () => setPlayingState(true);
audio.onpause = () => setPlayingState(false);
audio.onwaiting = () => { songTitle.textContent = 'Buffering the good vibes... ⏳'; };
audio.onerror = () => {
    songTitle.textContent = '💥 Stream Error - Jump to next!';
    setPlayingState(false);
};

// Init
displayStations();
audio.volume = volumeSlider.value;
