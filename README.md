# TUNI Vision: research showcase

A showcase of research from the [Computer Vision Group](https://research.tuni.fi/vision/) at Tampere University,
served at <https://tutvision.github.io/>. It covers projects from 2020 onward that were co-authored and supervised by
Prof. Joni-Kristian Kämäräinen or Prof. Esa Rahtu. Videos come first, so the page works for display at events and demos.
Code: <https://github.com/TUTvision>.

The page is static, with no build step. The layout follows the [Nerfies](https://github.com/nerfies/nerfies.github.io) project page style.

## Using the page

- **Highlights**: a grid of looping videos. Click any tile to open that project.
- **All projects**: compact cards grouped by theme. Use the theme buttons to filter.
- **Details**: click a card or its *Details* button to open the abstract, all links, extra videos and YouTube.
  Each project has its own link, e.g. `https://tutvision.github.io/#ags-mesh`. Use `←` / `→` to move between projects and `Esc` to close.
- **Presentation mode**: for a booth screen, click *Presentation* or open `https://tutvision.github.io/?present`.
  It runs a full-screen slideshow of the highlighted projects, each with a QR code that visitors can scan to open the project page.
  The default is 20 seconds per slide; use `?present=30` to change it.
  Keys: `→` next, `←` previous, `Space` pause, `Esc` exit.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Adding or editing a project

1. Put media in `static/media/`. Convert GIFs and long clips into short H.264 MP4s that are at most 1280 px wide,
   then extract a poster frame:
   ```bash
   ffmpeg -i input.gif -an -vf "scale='min(1280,iw)':-2,format=yuv420p" \
     -c:v libx264 -crf 27 -preset slow -movflags +faststart static/media/myproject.mp4
   ffmpeg -ss 0.5 -i static/media/myproject.mp4 -frames:v 1 -q:v 4 static/media/myproject.jpg
   ```
2. Add an entry to `PROJECTS` in `static/js/projects.js`. The fields are documented at the top of that file.
   Set `featured: true` to put a project with a video into Highlights and presentation mode.
3. Add the media size to `static/js/media-dims.js` (`"static/media/myproject.mp4": [width, height]`).

## Layout

```
index.html               page shell
static/js/projects.js    all project and theme data
static/js/main.js        rendering, lazy video playback, details view, filters, presentation mode
static/js/media-dims.js  intrinsic sizes of media files
static/css/style.css     styles
static/img/              lab logo and favicons
static/media/            videos, posters and images, collected from the authors' project pages
static/vendor/           Bulma, Font Awesome, Academicons and qrcode-generator, kept locally so the page works on poor venue Wi-Fi
```
