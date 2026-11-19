# GTA VI Radio — fan project

A fan-made web radio that lets you listen to the GTA VI stations outside the game, as a simulated 24/7 live broadcast. Everyone who opens the site hears the same song at the same moment, just like a real radio dial.

> **Unofficial fan project.** Not affiliated with, endorsed or sponsored by Rockstar Games or Take-Two Interactive. GTA and Grand Theft Auto are trademarks of their respective owners.

## Features
- In-game-style station selector (Q / E, arrow keys, mouse wheel, swipe)
- Simulated live playback synced to the clock — no streaming server needed
- Animated synthwave scene with per-station color themes
- Now-playing panel with progress, up next, tracklist and an "Across Leonida" ticker
- Original station logos (hand-made SVG), responsive layout, Media Session support

## How it works
- No audio is hosted. Songs play through the official YouTube IFrame Player, using videos from official artist, label or "Topic" channels.
- `data/tracks.json` holds the stations and songs; `js/stations.js` is generated from it with each song's YouTube video ID and duration.
- Each station's current song = `(now + seed) % total station length`.

## Run locally
```bash
npx http-server -p 5173
```
Then open http://localhost:5173.

## Stack
Plain HTML, CSS and JavaScript. No build step.
