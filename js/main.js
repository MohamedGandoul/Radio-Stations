// German Radio Stations
const stations = [
    {
        name: "Deutschlandfunk",
        stream: "https://st01.sslstream.dlf.de/dlf/01/high/aac/stream.aac",
        description: "News & Current Affairs 📰 (192kbps AAC)"
    },
    {
        name: "1LIVE",
        stream: "https://wdr-1live-live.icecastssl.wdr.de/wdr/1live/live/mp3/128/stream.mp3",
        description: "Young Radio - Music & Entertainment 🎵 (128kbps)"
    },
    {
        name: "SWR3",
        stream: "http://liveradio.swr.de/sw282p3/swr3/play.mp3",
        description: "Pop Music & News 🎶 (192kbps)"
    },
    {
        name: "NDR2",
        stream: "http://icecast.ndr.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3",
        description: "Radio from Northern Germany 🎸 (128kbps)"
    },
    {
        name: "Antenne Bayern",
        stream: "http://mp3channels.webradio.antenne.de/antenne",
        description: "Bavarian Music & Entertainment 🎤 (128kbps)"
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
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Variables
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

// Load Station
function loadStation(station) {
    audio.src = station.stream;
    stationName.textContent = station.name;
    songTitle.textContent = 'Loading... ⏳';

    audio.play()
        .then(() => {
            playPauseIcon.className = 'fas fa-pause';
            albumPlaceholder.classList.add('playing');
            songTitle.textContent = '✅ Live Broadcast';
        })
        .catch(error => {
            console.error('Error:', error);
            songTitle.textContent = '❌ Cannot play - Try another station';
            playPauseIcon.className = 'fas fa-play';
            albumPlaceholder.classList.remove('playing');
        });
}

// Play/Pause
playPauseBtn.onclick = () => {
    if (!audio.src) {
        songTitle.textContent = 'Select a station first';
        return;
    }

    if (audio.paused) {
        audio.play()
            .then(() => {
                playPauseIcon.className = 'fas fa-pause';
                albumPlaceholder.classList.add('playing');
                songTitle.textContent = '✅ Live Broadcast';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        audio.pause();
        playPauseIcon.className = 'fas fa-play';
        albumPlaceholder.classList.remove('playing');
        songTitle.textContent = '⏸ Paused';
    }
};

// Volume Control
volumeSlider.oninput = (e) => {
    audio.volume = e.target.value;
};

// Previous Station
prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + stations.length) % stations.length;
    loadStation(stations[currentIndex]);
    displayStations();
};

// Next Station
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % stations.length;
    loadStation(stations[currentIndex]);
    displayStations();
};

// Stream Events
audio.onplaying = () => {
    songTitle.textContent = '✅ Live Broadcast';
};

audio.onpause = () => {
    if (audio.src) songTitle.textContent = '⏸ Paused';
};

audio.onerror = () => {
    songTitle.textContent = '❌ Stream Error - Try another station';
    playPauseIcon.className = 'fas fa-play';
    albumPlaceholder.classList.remove('playing');
};

audio.onwaiting = () => {
    songTitle.textContent = '⏳ Loading...';
};

// Initialize
displayStations();
audio.volume = volumeSlider.value;
