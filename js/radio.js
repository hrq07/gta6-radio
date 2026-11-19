// Simulated live radio: each station's position comes from the clock,
// so every listener hears the same moment of the same song.
(function () {
  const $ = id => document.getElementById(id);
  const body = document.body;

  // Accent + sky palette per station (sky: top → horizon)
  const THEME = {
    vicecityfm:   ['#ff3fa4', '#4ff3ff', ['#0d0221', '#3b0c5c', '#a3207a', '#ff6b6b', '#ffb35c']],
    cocoteo:      ['#ff4f8b', '#3ff5d0', ['#04152b', '#0b4a6b', '#1aa59a', '#ff8a6b', '#ffd36b']],
    dirtysouth:   ['#2ee66f', '#f5c518', ['#050d08', '#103024', '#2b5c3a', '#c96a2b', '#f2b64a']],
    emotion:      ['#ff2f6d', '#ffc2d6', ['#14030f', '#4a0d34', '#a3245e', '#ff6f91', '#ffc4a8']],
    flashfm:      ['#ffe500', '#ff2d87', ['#110214', '#3c0d4a', '#b3248a', '#ff7a4a', '#ffe36e']],
    chamber:      ['#ff2b2b', '#d0d0d0', ['#000000', '#140405', '#3a0b0b', '#8a1a12', '#d4451c']],
    vrock:        ['#ff3b3b', '#8ab4ff', ['#03031a', '#141448', '#3a2a8a', '#c2406a', '#ff9a5c']],
    vcrr:         ['#00ff9c', '#b46bff', ['#05000f', '#2a0066', '#6a00ff', '#ff3fa4', '#ff9c5c']],
    honey:        ['#f6a91a', '#ffe0a3', ['#120802', '#3a1d0a', '#8a3d12', '#e2762a', '#ffc65c']],
    afrobank:     ['#ffb000', '#ff5b1f', ['#140600', '#4a1a05', '#a33d0b', '#ff7a1f', '#ffd36b']],
    backcountry:  ['#e0a35a', '#ffe8c2', ['#0c0a10', '#2e2340', '#7a4a5c', '#d27a4a', '#f5c27a']],
    stockyard:    ['#4ff3c8', '#ff6bd6', ['#020a0d', '#0a2a3a', '#1a5a6a', '#d0507a', '#ffb06b']],
    kaleidoscope: ['#c86bff', '#ffe36e', ['#0a0218', '#2a0a4a', '#6a1a9a', '#ff5fa0', '#ffc36b']],
    worldwide:    ['#ffd23f', '#5cf0ff', ['#04080c', '#123040', '#2a6a7a', '#e88a4a', '#ffd88a']],
    onu:          ['#f7d20a', '#3fdc6a', ['#020a02', '#0a2a10', '#2a5a1a', '#c8701a', '#f7d24a']],
    laola:        ['#2b8cff', '#ff6a3d', ['#020818', '#0b2a5a', '#1a5ab0', '#ff6a3d', '#ffc36b']],
    symphony:     ['#e8c770', '#9ab8ff', ['#02040c', '#0d1b33', '#2a3a6a', '#9a6a8a', '#e8c79a']],
    circoloco:    ['#ff1e1e', '#ffffff', ['#000000', '#120208', '#3a0614', '#a01030', '#ff5a3a']],
    gloriana:     ['#5c9bff', '#c9a66b', ['#01040f', '#0c1f4a', '#1e3f7a', '#6a5a9a', '#c9a66b']],
    jazz:         ['#ffb84d', '#ff5f9e', ['#07020f', '#1a0f2e', '#4a1f5a', '#b04a6a', '#ffb84d']],
    thewipe:      ['#5cd6ff', '#ffffff', ['#020a14', '#0a2a4a', '#2a6a9a', '#7ac8e8', '#c9f0ff']],
  };

  const stations = window.STATIONS.map(s => ({
    ...s,
    all: s.tracks,
    tracks: s.tracks.filter(t => t.youtubeId && t.duration),
  }));
  const bad = new Set();
  const saved = (() => { try { return localStorage.getItem('gta6radio.station'); } catch (e) { return null; } })();
  let current = Math.max(0, stations.findIndex(s => s.id === (saved || 'vicecityfm')));
  let player = null, ready = false, on = false, nowTrack = null, muted = false;

  const playableCount = stations.reduce((a, s) => a + s.tracks.length, 0);
  $('count').textContent = `${stations.length} stations · ${playableCount} songs on rotation`;

  // ---------- clock ----------
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  setInterval(tickClock, 1000); tickClock();
  function tickClock() {
    $('clock').textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    if (on) updateProgress();
  }

  // ---------- live position ----------
  function playable(st) { return st.tracks.filter(t => !bad.has(t.youtubeId)); }
  function livePosition(st) {
    const list = playable(st);
    if (!list.length) return null;
    const total = list.reduce((a, t) => a + t.duration, 0);
    const seed = [...st.id].reduce((a, c) => a + c.charCodeAt(0) * 97, 0);
    let pos = (Date.now() / 1000 + seed) % total;
    for (let i = 0; i < list.length; i++) {
      const t = list[i];
      if (pos < t.duration) return { track: t, start: pos, next: list[(i + 1) % list.length] };
      pos -= t.duration;
    }
    return { track: list[0], start: 0, next: list[1 % list.length] };
  }

  // ---------- selector ----------
  const carousel = $('carousel');
  stations.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'card';
    b.setAttribute('role', 'option');
    b.setAttribute('aria-label', s.name);
    b.title = `${s.name} — ${s.genre}`;
    b.innerHTML = (window.LOGOS[s.id] || '') + (s.tracks.length ? '' : '<span class="soon">COMING SOON</span>');
    b.onclick = () => tune(i);
    carousel.appendChild(b);
  });

  function applyTheme(st) {
    const [a, a2, sky] = THEME[st.id] || THEME.vicecityfm;
    const r = document.documentElement.style;
    r.setProperty('--accent', a); r.setProperty('--accent2', a2);
    sky.forEach((c, i) => r.setProperty(`--sky${i + 1}`, c));
  }

  function paint() {
    const st = stations[current];
    [...carousel.children].forEach((c, i) => {
      c.classList.toggle('active', i === current);
      c.setAttribute('aria-selected', i === current);
    });
    const card = carousel.children[current];
    carousel.scrollTo({ left: card.offsetLeft - carousel.clientWidth / 2 + card.clientWidth / 2, behavior: 'smooth' });
    $('knob').style.left = `${(current / (stations.length - 1)) * 100}%`;
    $('st-name').textContent = st.name;
    $('np-genre').textContent = st.genre;
    const art = $('np-art');
    art.innerHTML = window.LOGOS[st.id] || '';
    art.classList.remove('swap'); void art.offsetWidth; art.classList.add('swap');
    applyTheme(st);
    renderTracklist();
  }

  function renderTracklist() {
    const st = stations[current];
    $('tl-name').textContent = st.name;
    const ol = $('tl'); ol.innerHTML = '';
    if (!st.all.length) { ol.innerHTML = '<li class="na">No songs revealed yet</li>'; return; }
    st.all.forEach(t => {
      const li = document.createElement('li');
      const ok = t.youtubeId && !bad.has(t.youtubeId);
      if (!ok) li.classList.add('na');
      if (nowTrack && t.youtubeId === nowTrack.youtubeId) li.classList.add('cur');
      li.innerHTML = `<div>${esc(t.title)}<small>${esc(t.artist)}${ok ? '' : ' · not available'}</small></div>`;
      ol.appendChild(li);
    });
  }
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- playback ----------
  function playLive() {
    const st = stations[current];
    const p = livePosition(st);
    if (!p) {
      nowTrack = null;
      if (ready) player.stopVideo();
      setNow('Coming soon', 'Songs not revealed yet', '—');
      body.classList.remove('playing');
      updateProgress();
      return;
    }
    nowTrack = p.track;
    setNow(p.track.title, p.track.artist, `${p.next.title} — ${p.next.artist}`);
    if (ready) player.loadVideoById({ videoId: p.track.youtubeId, startSeconds: Math.floor(p.start) });
    updateProgress();
    renderTracklist();
    mediaSession(st, p.track);
  }

  function setNow(title, artist, next) {
    $('np-title').textContent = title;
    $('np-artist').textContent = artist;
    $('np-next').textContent = next;
  }

  function updateProgress() {
    const p = livePosition(stations[current]);
    if (!p || !on) { $('fill').style.width = '0'; $('t-now').textContent = '0:00'; $('t-len').textContent = '0:00'; return; }
    $('fill').style.width = `${(p.start / p.track.duration) * 100}%`;
    $('t-now').textContent = fmt(p.start);
    $('t-len').textContent = fmt(p.track.duration);
  }

  function mediaSession(st, t) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title: t.title, artist: t.artist, album: `${st.name} · GTA VI Radio (fan project)` });
    navigator.mediaSession.setActionHandler('previoustrack', () => tune(current - 1));
    navigator.mediaSession.setActionHandler('nexttrack', () => tune(current + 1));
  }

  // ---------- static burst (Web Audio) ----------
  let actx;
  function staticNoise(ms = 420) {
    if (muted) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const len = actx.sampleRate * ms / 1000;
      const buf = actx.createBuffer(1, len, actx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.5);
      const src = actx.createBufferSource(); src.buffer = buf;
      const f = actx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1600; f.Q.value = .7;
      const gn = actx.createGain(); gn.gain.value = 0.16 * ($('vol').value / 100);
      src.connect(f).connect(gn).connect(actx.destination); src.start();
    } catch (e) { /* no audio */ }
  }

  let tuneTimer;
  function tune(i) {
    current = (i + stations.length) % stations.length;
    try { localStorage.setItem('gta6radio.station', stations[current].id); } catch (e) {}
    paint();
    if (!on) return;
    staticNoise();
    clearTimeout(tuneTimer);
    tuneTimer = setTimeout(playLive, 180); // debounce fast scrolling through the dial
  }

  // ---------- ticker: what's on every station right now ----------
  function renderTicker() {
    const items = stations.map((s, i) => {
      const p = livePosition(s);
      return p ? `<button data-i="${i}"><b>${esc(s.name)}</b>${esc(p.track.title)} — ${esc(p.track.artist)}</button>` : '';
    }).join('<span aria-hidden="true">✦</span>');
    $('ticker-move').innerHTML = items + '<span aria-hidden="true">✦</span>' + items;
  }
  $('ticker-move').addEventListener('click', e => {
    const b = e.target.closest('button[data-i]');
    if (b) tune(+b.dataset.i);
  });
  setInterval(() => { if (on) renderTicker(); }, 30000);

  // ---------- YouTube ----------
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt', {
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, playsinline: 1, rel: 0 },
      events: {
        onReady: () => { ready = true; player.setVolume(+$('vol').value); if (on) playLive(); },
        onStateChange: e => {
          if (e.data === YT.PlayerState.ENDED) playLive();
          body.classList.toggle('playing', e.data === YT.PlayerState.PLAYING);
        },
        onError: () => { if (nowTrack) bad.add(nowTrack.youtubeId); playLive(); },
      },
    });
  };

  // ---------- controls ----------
  $('power').onclick = () => {
    on = true;
    body.classList.add('on');
    $('intro').hidden = true; $('radio').hidden = false; $('ticker').hidden = false;
    paint(); staticNoise(); playLive(); renderTicker();
  };
  $('off').onclick = () => {
    on = false;
    body.classList.remove('on', 'playing');
    if (ready) player.stopVideo();
    $('radio').hidden = true; $('ticker').hidden = true; $('intro').hidden = false;
  };
  $('prev').onclick = () => tune(current - 1);
  $('next').onclick = () => tune(current + 1);
  $('vol').oninput = e => {
    if (!ready) return;
    player.setVolume(+e.target.value);
    if (muted && +e.target.value > 0) toggleMute();
  };
  function toggleMute() {
    muted = !muted;
    $('mute').classList.toggle('muted', muted);
    if (ready) muted ? player.mute() : player.unMute();
  }
  $('mute').onclick = toggleMute;
  $('list-btn').onclick = () => {
    const tl = $('tracklist'); tl.hidden = !tl.hidden;
    $('list-btn').setAttribute('aria-expanded', !tl.hidden);
  };
  carousel.addEventListener('wheel', e => {
    if (!on || Math.abs(e.deltaY) < Math.abs(e.deltaX) && Math.abs(e.deltaX) < 20) return;
    e.preventDefault();
    if (Math.abs(e.deltaY + e.deltaX) > 15) tune(current + Math.sign(e.deltaY + e.deltaX));
  }, { passive: false });
  // swipe
  let sx = null;
  carousel.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 30) tune(current - Math.sign(dx));
  });
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (!on && (e.key === 'Enter' || e.key === ' ') && document.activeElement === document.body) { $('power').click(); e.preventDefault(); return; }
    if (!on) return;
    const k = e.key.toLowerCase();
    if (k === 'q' || k === 'arrowleft') tune(current - 1);
    if (k === 'e' || k === 'arrowright') tune(current + 1);
    if (k === 'm') toggleMute();
  });

  applyTheme(stations[current]);
})();
