// Educational, Info & Culture German Stations
const stations = [
    { name: "Deutschlandfunk (DLF)", stream: "https://st01.sslstream.dlf.de/dlf/01/high/aac/stream.aac", description: "Premium News, Politics & Documentaries 📰" },
    { name: "DLF Kultur", stream: "https://st02.sslstream.dlf.de/dlf/02/high/aac/stream.aac", description: "Culture, Science, Philosophy & Society 🧠" },
    { name: "DLF Nova", stream: "https://st03.sslstream.dlf.de/dlf/03/high/aac/stream.aac", description: "Education, Tech, Science & Lectures 🎓" },
    { name: "Tagesschau24", stream: "https://tagesschau.akamaized.net/hls/live/2021118/tagesschau24/master.m3u8", description: "Non-stop International & German News 🌍" },
    { name: "WDR 5", stream: "https://wdr-wdr5-live.icecastssl.wdr.de/wdr/wdr5/live/mp3/128/stream.mp3", description: "In-depth Interviews, Documentaries & Reports 🎙️" },
    { name: "BR24 (Bayerischer Rundfunk)", stream: "https://br-br24-live.icecastssl.wdr.de/br/br24/live/mp3/128/stream.mp3", description: "Continuous News, Business & Science Updates 📈" },
    { name: "NDR Info", stream: "https://icecast.ndr.de/ndr/ndrinfo/niedersachsen/mp3/128/stream.mp3", description: "Northern German Information, Audiobooks & Podcasts 📚" },
    { name: "SWR Kultur", stream: "http://liveradio.swr.de/sw282p3/swrkultur/play.mp3", description: "High-level Literature, Arts and Classical Discussions 🎨" },
    { name: "MDR Aktuell", stream: "http://mdr-284330-0.cast.mdr.de/mdr/284330/0/mp3/high/stream.mp3", description: "Current Affairs, Society & Educational Talks 🗣️" },
    { name: "hr-iNFO", stream: "http://hr-hrinfo-live.cast.addradio.de/hr/hrinfo/live/mp3/128/stream.mp3", description: "Pure Information, Debate, and Economic Analysis 💭" }
];

const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = playPauseBtn.querySelector('i');
const volumeSlider = document.getElementById('volume-slider');
const stationName = document.getElementById('station-name');
const songTitle = document.getElementById('song-title');
const stationsList = document.getElementById('stations-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

function displayStations() {
    stationsList.innerHTML = '';
    stations.forEach((station, index) => {
        const card = document.createElement('div');
        card.className = `station-card ${index === currentIndex && audio.src ? 'active' : ''}`;
        card.innerHTML = `
            <h3>${station.name}</h3>
            <p>${station.description}</p>
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
    } else {
        playPauseIcon.className = 'fas fa-play';
    }
    displayStations();
}

function loadStation(station) {
    audio.src = station.stream;
    stationName.textContent = station.name;
    songTitle.textContent = 'Connecting... ⏳';
    updateUI(false);

    audio.play()
        .then(() => {
            songTitle.textContent = '🟢 Playing Live';
            updateUI(true);
        })
        .catch(err => {
            songTitle.textContent = '❌ Stream unavailable';
            updateUI(false);
        });
}

playPauseBtn.onclick = () => {
    if (!audio.src) return loadStation(stations[0]);
    if (audio.paused) {
        audio.play().then(() => updateUI(true)).catch(e => console.log(e));
        songTitle.textContent = '🟢 Playing Live';
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

displayStations();
audio.volume = volumeSlider.value;
