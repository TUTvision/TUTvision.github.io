# TUTvision.github.io

Research showcase for the [Computer Vision Group](https://research.tuni.fi/vision/) at Tampere University,
served at <https://tutvision.github.io/>. It highlights recent projects supervised by
Prof. Joni-Kristian Kämäräinen and Prof. Esa Rahtu, with video first, for display at events and demos.

The layout follows the [Nerfies](https://github.com/nerfies/nerfies.github.io) project page style.
It is a static site with no build step.

## Presentation mode

For unattended display at a booth, click **Presentation mode** or open
`https://tutvision.github.io/?present`. The page goes full screen and steps through the projects
every 25 seconds. Use `?present=40` for a different interval.

Keys: `→` next, `←` previous, `Space` pause, `Esc` exit.

## Adding or editing a project

1. Put media in `static/media/`. Convert GIFs and long clips into short H.264 MP4s that are at most
   1280 px wide, then extract a poster frame:
   ```bash
   ffmpeg -i input.gif -an -vf "scale='min(1280,iw)':-2,format=yuv420p" \
     -c:v libx264 -crf 27 -preset slow -movflags +faststart static/media/myproject.mp4
   ffmpeg -ss 0.5 -i static/media/myproject.mp4 -frames:v 1 -q:v 4 static/media/myproject.jpg
   ```
2. Add an entry to `PROJECTS` in `static/js/projects.js`. The fields are documented at the top of
   that file.
3. Add the clip's size to `static/js/media-dims.js`. The page uses it to reserve space before the
   video loads, which keeps scrolling and presentation mode steady.

## Layout

```
index.html               page shell
static/js/projects.js    all project, theme and people data
static/js/main.js        rendering, lazy video playback, filters, presentation mode
static/js/media-dims.js  intrinsic sizes of media files
static/css/style.css     styles
static/media/            videos, posters and images, collected from the authors' project pages
static/vendor/           Bulma, Font Awesome and Academicons, kept locally so the page works on poor venue Wi-Fi
```
