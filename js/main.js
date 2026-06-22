// 15 German Radio Stations!
const stations = [
    { name: "Deutschlandfunk", stream: "https://st01.sslstream.dlf.de/dlf/01/high/aac/stream.aac", description: "News & Current Affairs 📰" },
    { name: "1LIVE", stream: "https://wdr-1live-live.icecastssl.wdr.de/wdr/1live/live/mp3/128/stream.mp3", description: "Young Radio - Hits & Fun 🎵" },
    { name: "SWR3", stream: "http://liveradio.swr.de/sw282p3/swr3/play.mp3", description: "Pop Music & Entertainment 🎶" },
    { name: "NDR2", stream: "http://icecast.ndr.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3", description: "Radio from Northern Germany 🎸" },
    { name: "Antenne Bayern", stream: "http://mp3channels.webradio.antenne.de/antenne", description: "Bavarian Music & News 🎤" },
    { name: "Rock Antenne", stream: "https://stream.rockantenne.de/rockantenne/stream/mp3", description: "Heavy Rock & Classic Metal ⚡" },
    { name: "TechnoBase.FM", stream: "http://listen.technobase.fm/mp3.pls", description: "HandsUp, Dance & Electronic 🚀" },
    { name: "WDR 4", stream: "https://wdr-wdr4-live.icecastssl.wdr.de/wdr/wdr4/live/mp3/128/stream.mp3", description: "80s Hits & Old Classics 🕺" },
    { name: "Jazz Radio Berlin", stream: "http://jazzradio.stream.ne.onstreamnetworks.com/jazzradio.mp3", description: "Smooth Jazz Vibes 🎷" },
    { name: "RPR1. 90er", stream: "http://stream.rpr1.de/rpr-90er/mp3-128/", description: "Flashbacks from the 90s! 💥" },
    { name: "N-JOY", stream: "http://icecast.ndr.de/ndr/njoy/live/mp3/128/stream.mp3", description: "Youth Radio from NDR 🎧" },
    { name: "Klassik Radio", stream: "http://stream.klassikradio.de/live/mp3-192", description: "Relaxing Classical Music 🎻" },
    { name: "Schlager Radio", stream: "http://stream.schlagerradio.de/schlagerradio/mp3-128", description: "100% German Schlager Hits 🍻" },
    { name: "Energy Berlin", stream: "http://cdn.nrjaudio.fm/adwz1/de/33001/mp3_128.mp3", description: "Hit Music Only! 🔥" },
    { name: "Sunshine Live", stream: "http://sunshinelive.hoerradar.de/sunshinelive-live-mp3-hq", description: "Electronic Dance Music (EDM) 🪩" }
];

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

function displayStations() {
    stationsList.innerHTML = '';
    stations.forEach((station, index) => {
        const card = document.createElement('div');
        card.className = `station-card ${index === currentIndex && audio.src ? 'active' : ''}`;
        card.innerHTML = `
            <div class="card-content">
                <h3>${station.name}</h3>
                <p>${station.description}</p>
            </div>
            <div class="play-icon"><i class="fas ${index === currentIndex && !audio.paused ? 'fa-chart-bar' : 'fa-play-circle'}"></i></div>
        `;

        card.onclick = () => {
            currentIndex = index;
            loadStation(stations[currentIndex]);
        };
        stationsList.appendChild(card);
    });
}

function updateUI(isPlaying) {
    if (isPlaying) {
        playPauseIcon.className = 'fas fa-pause';
        albumPlaceholder.classList.add('playing');
        equalizer.classList.add('active');
    } else {
        playPauseIcon.className = 'fas fa-play';
        albumPlaceholder.classList.remove('playing');
        equalizer.classList.remove('active');
    }
    displayStations(); // Update active class in list
}

function loadStation(station) {
    audio.src = station.stream;
    stationName.textContent = station.name;
    songTitle.textContent = 'Connecting to stream... ⏳';
    updateUI(false);

    audio.play()
        .then(() => {
            songTitle.textContent = '🟢 Live Broadcast';
            updateUI(true);
        })
        .catch(err => {
            songTitle.textContent = '❌ Offline - Try another';
            updateUI(false);
        });
}

playPauseBtn.onclick = () => {
    if (!audio.src) return loadStation(stations[0]);
    if (audio.paused) {
        audio.play().then(() => updateUI(true)).catch(e => console.log(e));
        songTitle.textContent = '🟢 Live Broadcast';
    } else {
        audio.pause();
        updateUI(false);
        songTitle.textContent = '⏸ Paused';
    }
};

volumeSlider.oninput = (e) => audio.volume = e.target.value;

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + stations.length) % stations.length;
    loadStation(stations[currentIndex]);
};

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % stations.length;
    loadStation(stations[currentIndex]);
};

audio.onplaying = () => updateUI(true);
audio.onpause = () => updateUI(false);
audio.onerror = () => { songTitle.textContent = '⚠️ Stream Error'; updateUI(false); };

// Initialize
displayStations();
audio.volume = volumeSlider.value;
