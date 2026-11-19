// Logos originais (SVG) inspirados no gênero de cada estação.
// Não reproduzem as artes oficiais do jogo.
(function () {
  const W = (bg, inner) =>
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img">${bg}${inner}</svg>`;
  const T = (txt, y, size, fill, extra = '') =>
    `<text x="50" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}" ${extra}>${txt}</text>`;

  const L = {
    vicecityfm: W(
      `<defs><linearGradient id="g-vc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b0a4a"/><stop offset="1" stop-color="#ff4f9a"/></linearGradient></defs><rect width="100" height="100" fill="url(#g-vc)"/>`,
      `<circle cx="50" cy="58" r="22" fill="#ffb347"/>${[0,1,2,3].map(i=>`<rect x="20" y="${60+i*6}" width="60" height="2.5" fill="#2b0a4a"/>`).join('')}
       ${T('VICE CITY', 26, 15, '#5ff', 'font-family="Monoton,sans-serif" letter-spacing="1"')}${T('FM', 96, 12, '#fff', 'font-weight="900" font-family="Arial Black,sans-serif"')}`),
    cocoteo: W(
      `<rect width="100" height="100" fill="#0bb5a5"/><circle cx="50" cy="100" r="46" fill="#ffe08a"/>`,
      `<path d="M50 70 Q48 45 56 22" stroke="#6b3e1f" stroke-width="5" fill="none"/>
       <path d="M56 22 q-22 -6 -30 10 M56 22 q20 -10 32 4 M56 22 q-6 -16 -22 -14 M56 22 q14 -16 26 -10" stroke="#1f7a3a" stroke-width="6" fill="none" stroke-linecap="round"/>
       <circle cx="52" cy="28" r="5" fill="#6b3e1f"/><circle cx="60" cy="27" r="5" fill="#6b3e1f"/>
       ${T('COCOTEO', 86, 17, '#e0306a', 'font-weight="900" font-family="Arial Black,sans-serif" font-style="italic"')}`),
    dirtysouth: W(
      `<rect width="100" height="100" fill="#1d1d1d"/>`,
      `<rect x="10" y="22" width="80" height="44" rx="4" fill="#0f6b3a" stroke="#fff" stroke-width="2.5"/>
       ${T('DIRTY', 40, 15, '#fff', 'font-weight="900" font-family="Arial Black,sans-serif"')}${T('SOUTH', 59, 15, '#fff', 'font-weight="900" font-family="Arial Black,sans-serif"')}
       <rect x="47" y="66" width="6" height="22" fill="#999"/>${T('CLASSICS', 96, 10, '#f5c518', 'font-weight="700" font-family="Arial,sans-serif" letter-spacing="2"')}`),
    emotion: W(
      `<rect width="100" height="100" fill="#fff1f4"/>`,
      `<path d="M50 80 C10 55 18 22 38 24 C46 25 50 32 50 36 C50 32 54 25 62 24 C82 22 90 55 50 80Z" fill="#e5174f"/>
       ${T('emotion', 56, 18, '#fff', 'font-family="Georgia,serif" font-style="italic" font-weight="700"')}${T('98.3', 95, 12, '#e5174f', 'font-weight="900" font-family="Arial,sans-serif"')}`),
    flashfm: W(
      `<rect width="100" height="100" fill="#ffe500"/>`,
      `<path d="M58 8 L28 56 H48 L40 92 L74 40 H54 Z" fill="#111"/>
       ${T('FLASH', 66, 22, '#ff2d87', 'font-weight="900" font-family="Arial Black,sans-serif" stroke="#111" stroke-width="1.2"')}`),
    chamber: W(
      `<rect width="100" height="100" fill="#0a0a0a"/>`,
      `<path d="M50 10 L62 40 L50 34 L38 40Z M30 46 L70 46 L66 54 L34 54Z" fill="#8a0d0d"/>
       ${T('CHAMBER', 76, 17, '#d8d8d8', 'font-family="Impact,sans-serif" letter-spacing="1" stroke="#8a0d0d" stroke-width="0.8"')}${T('106.6', 93, 11, '#8a0d0d', 'font-family="Impact,sans-serif"')}`),
    vrock: W(
      `<rect width="100" height="100" fill="#14143a"/>`,
      `<path d="M20 18 L50 82 L80 18 H66 L50 56 L34 18Z" fill="#c0c6d4" stroke="#ff3b3b" stroke-width="2"/>
       ${T('ROCK', 50, 17, '#ff3b3b', 'font-family="Impact,sans-serif" letter-spacing="2" transform="rotate(-8 50 46)"')}`),
    vcrr: W(
      `<rect width="100" height="100" fill="#6a00ff"/>`,
      `<rect x="8" y="30" width="84" height="40" fill="#000" transform="rotate(-6 50 50)"/>
       ${T('VCRR', 60, 26, '#00ff9c', 'font-weight="900" font-family="Arial Black,sans-serif" transform="rotate(-6 50 50)"')}`),
    honey: W(
      `<rect width="100" height="100" fill="#3a1d0a"/>`,
      `${[[50,36],[33,46],[67,46],[50,56]].map(([x,y])=>`<polygon points="${[0,1,2,3,4,5].map(i=>`${x+11*Math.cos(Math.PI/3*i)},${y+11*Math.sin(Math.PI/3*i)}`).join(' ')}" fill="#f6a91a" stroke="#3a1d0a" stroke-width="2"/>`).join('')}
       ${T('Honey FM', 88, 16, '#f6a91a', 'font-family="Georgia,serif" font-style="italic" font-weight="700"')}`),
    afrobank: W(
      `<rect width="100" height="100" fill="#ffb000"/>`,
      `${[0,1,2,3,4].map(i=>`<rect x="0" y="${i*20}" width="100" height="10" fill="#e2410b" opacity=".35"/>`).join('')}
       <circle cx="50" cy="42" r="22" fill="#111"/><circle cx="50" cy="42" r="7" fill="#ffb000"/>
       ${T('AFROBANK', 84, 15, '#111', 'font-weight="900" font-family="Arial Black,sans-serif"')}`),
    backcountry: W(
      `<rect width="100" height="100" fill="#f1e2c4"/>`,
      `<path d="M20 50 Q22 30 36 32 Q40 20 50 20 Q60 20 64 32 Q78 30 80 50 Q50 40 20 50Z" fill="#7a4a22"/><path d="M12 52 Q50 64 88 52" stroke="#7a4a22" stroke-width="5" fill="none"/>
       ${T('BACK COUNTRY', 80, 11.5, '#7a2a12', 'font-family="Georgia,serif" font-weight="700" letter-spacing="1"')}${T('RADIO', 94, 9, '#7a4a22', 'font-family="Georgia,serif" letter-spacing="3"')}`),
    stockyard: W(
      `<rect width="100" height="100" fill="#111"/>`,
      `${[0,1,2,3,4,5,6].map(i=>`<rect x="${14+i*10.5}" y="${50-[10,22,32,18,28,14,8][i]}" width="7" height="${[10,22,32,18,28,14,8][i]*2}" fill="hsl(${160+i*20} 90% 60%)"/>`).join('')}
       ${T('STOCKYARD', 92, 13, '#fff', 'font-weight="900" font-family="Arial,sans-serif" letter-spacing="1"')}`),
    kaleidoscope: W(
      `<rect width="100" height="100" fill="#120428"/>`,
      `${[0,1,2,3,4,5,6,7].map(i=>`<path d="M50 44 L50 14 L64 30Z" fill="hsl(${i*45} 90% 60%)" transform="rotate(${i*45} 50 44)"/>`).join('')}
       ${T('KALEIDOSCOPE', 90, 10, '#fff', 'font-weight="700" font-family="Arial,sans-serif" letter-spacing="1"')}`),
    worldwide: W(
      `<rect width="100" height="100" fill="#f4f0e6"/>`,
      `<circle cx="50" cy="42" r="26" fill="none" stroke="#111" stroke-width="3"/><ellipse cx="50" cy="42" rx="11" ry="26" fill="none" stroke="#111" stroke-width="2.5"/><path d="M24 42 H76 M28 30 H72 M28 54 H72" stroke="#111" stroke-width="2.5"/>
       ${T('WORLDWIDE', 88, 13, '#111', 'font-weight="900" font-family="Arial Black,sans-serif"')}`),
    onu: W(
      `<rect width="100" height="100" fill="#0a7a2f"/><rect y="33" width="100" height="34" fill="#f7d20a"/><rect y="67" width="100" height="33" fill="#d81e1e"/>`,
      `<circle cx="50" cy="50" r="24" fill="#111"/>${T('ON-U', 57, 18, '#f7d20a', 'font-family="Impact,sans-serif"')}`),
    laola: W(
      `<rect width="100" height="100" fill="#ff6a3d"/>`,
      `<path d="M0 62 Q15 40 30 56 T60 52 T100 50 V100 H0Z" fill="#0b4fa8"/><path d="M0 74 Q20 58 40 70 T80 66 T100 64 V100 H0Z" fill="#2b8cff"/>
       ${T('La Ola', 38, 24, '#fff', 'font-family="Georgia,serif" font-style="italic" font-weight="700"')}`),
    symphony: W(
      `<rect width="100" height="100" fill="#0d1b33"/>`,
      `<path d="M40 70 V24 L68 18 V62" stroke="#e8c770" stroke-width="4" fill="none"/><ellipse cx="34" cy="70" rx="9" ry="7" fill="#e8c770"/><ellipse cx="62" cy="64" rx="9" ry="7" fill="#e8c770"/>
       ${T('SYMPHONY', 92, 13, '#e8c770', 'font-family="Georgia,serif" letter-spacing="2"')}`),
    circoloco: W(
      `<rect width="100" height="100" fill="#000"/>`,
      `${[34,26,18,10].map((r,i)=>`<circle cx="50" cy="44" r="${r}" fill="none" stroke="${i%2?'#fff':'#ff1e1e'}" stroke-width="3"/>`).join('')}
       ${T('CIRCO·LOCO', 92, 12, '#fff', 'font-weight="900" font-family="Arial,sans-serif" letter-spacing="1"')}`),
    gloriana: W(
      `<rect width="100" height="100" fill="#0c1f4a"/><circle cx="50" cy="40" r="30" fill="#163a7a"/>`,
      `<path d="M38 58 Q30 30 50 22 Q70 30 62 58 Z" fill="#c9a66b" stroke="#3a2410" stroke-width="2"/><rect x="47" y="8" width="6" height="18" fill="#3a2410"/><circle cx="50" cy="44" r="5" fill="#3a2410"/>
       ${T('GLORIANA', 80, 14, '#7fb0ff', 'font-family="Georgia,serif" font-weight="700" letter-spacing="1"')}${T('BLUES', 94, 10, '#c9a66b', 'font-family="Georgia,serif" letter-spacing="4"')}`),
    jazz: W(
      `<rect width="100" height="100" fill="#1a0f2e"/>`,
      `<path d="M62 14 v38 q0 18 -16 18 q-12 0 -12 -10 q0 -8 10 -8 q8 0 8 6 M62 14 l12 6 M62 22 l12 6" stroke="#ffb84d" stroke-width="5" fill="none" stroke-linecap="round"/>
       <circle cx="30" cy="30" r="3" fill="#ff5f9e"/><circle cx="22" cy="44" r="2" fill="#ff5f9e"/>
       ${T('LEONIDA JAZZ', 90, 11.5, '#ffb84d', 'font-family="Georgia,serif" font-style="italic" font-weight="700"')}`),
    thewipe: W(
      `<rect width="100" height="100" fill="#c9f0ff"/>`,
      `<path d="M10 70 Q50 10 90 70" stroke="#111" stroke-width="6" fill="none"/><rect x="46" y="40" width="8" height="36" fill="#111"/>
       ${T('THE WIPE', 92, 14, '#111', 'font-weight="900" font-family="Arial Black,sans-serif"')}`),
  };
  window.LOGOS = L;
})();
