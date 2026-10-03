/* Renders the showcase from projects.js and wires up interactions. */
(function () {
  "use strict";

  const LINK_META = {
    paper: { label: "Paper", icon: "fas fa-file-pdf" },
    arxiv: { label: "arXiv", icon: "ai ai-arxiv" },
    page: { label: "Project Page", icon: "fas fa-globe" },
    code: { label: "Code", icon: "fab fa-github" },
    models: { label: "Models", icon: "fas fa-cubes" },
    data: { label: "Data", icon: "fas fa-database" },
    challenge: { label: "Challenge", icon: "fas fa-trophy" },
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const byTheme = {};
  PROJECTS.forEach((p) => (byTheme[p.theme] = byTheme[p.theme] || []).push(p));
  Object.values(byTheme).forEach((list) => list.sort((a, b) => b.year - a.year));
  const ordered = Object.keys(THEMES).flatMap((t) => byTheme[t] || []);

  /* ---------------------------------------------------------------- media */

  function mediaEl(m, cls) {
    // Width/height attributes reserve space before lazy media loads, so
    // scrolling (and presentation mode) is not thrown off by layout shifts.
    const dims = (typeof MEDIA_DIMS !== "undefined" && MEDIA_DIMS[m.src]) || null;
    const size = dims ? `width="${dims[0]}" height="${dims[1]}"` : "";
    if (m.type === "video") {
      return `<video class="${cls || ""} lazy-video" muted loop playsinline preload="none" ${size}
        ${m.poster ? `poster="${esc(m.poster)}"` : ""} data-src="${esc(m.src)}"></video>`;
    }
    return `<img class="${cls || ""}" src="${esc(m.src)}" ${size} loading="lazy" alt="">`;
  }

  function authorsHtml(p) {
    const parts = p.authors.map((a) => {
      const name = esc(a.name) + (a.mark ? `<sup>${esc(a.mark)}</sup>` : "");
      return `<span class="author-block">${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${name}</a>` : name}</span>`;
    });
    return parts.join(", ") + (p.note ? `<div class="author-note">${esc(p.note)}</div>` : "");
  }

  function linksHtml(links) {
    return Object.entries(links)
      .map(([k, url]) => {
        const meta = LINK_META[k] || { label: k, icon: "fas fa-link" };
        return `<a class="button is-rounded is-dark link-button" href="${esc(url)}" target="_blank" rel="noopener">
          <span class="icon"><i class="${meta.icon}"></i></span><span>${meta.label}</span></a>`;
      })
      .join("");
  }

  function youtubeHtml(list) {
    if (!list || !list.length) return "";
    return `<div class="columns is-multiline is-centered youtube-row">${list
      .map(
        (y) => `<div class="column ${list.length > 1 ? "is-half" : "is-four-fifths"}">
          <button class="yt-facade" data-yt="${esc(y.id)}" aria-label="Play video: ${esc(y.title)}">
            <img src="https://i.ytimg.com/vi/${esc(y.id)}/hqdefault.jpg" loading="lazy" alt="">
            <span class="yt-play"><i class="fab fa-youtube"></i></span>
            <span class="yt-title">${esc(y.title)}</span>
          </button></div>`
      )
      .join("")}</div>`;
  }

  function galleryHtml(list) {
    if (!list || !list.length) return "";
    const portrait = list.every((g) => g.portrait);
    const col = portrait ? "is-4" : list.length === 1 ? "is-four-fifths" : "is-half-tablet";
    return `<div class="columns is-multiline is-centered gallery${portrait ? " is-mobile" : ""}">${list
      .map(
        (g) => `<div class="column ${col}"><figure class="gallery-item${g.portrait ? " is-portrait" : ""}">
          ${mediaEl(g, "gallery-media")}
          ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}</figure></div>`
      )
      .join("")}</div>`;
  }

  function projectHtml(p, idx) {
    const sup = SUPERVISORS[p.supervisor];
    const theme = THEMES[p.theme];
    // Portrait main clips sit next to the first gallery clips as a row.
    const portraitRow = p.media.portrait && p.gallery && p.gallery.every((g) => g.portrait);
    const heroMedia = portraitRow
      ? galleryHtml([{ ...p.media, caption: p.gallery[0].caption }, ...p.gallery])
      : `<div class="hero-media${p.media.portrait ? " is-portrait" : ""}">${mediaEl(p.media, "main-media")}</div>`;
    return `
    <section class="section project" id="${esc(p.id)}" data-theme="${esc(p.theme)}" data-index="${idx}">
      <div class="container is-max-desktop">
        <div class="has-text-centered">
          <div class="project-tags">
            <span class="tag is-medium venue-tag">${esc(p.venue)}</span>
            <span class="tag is-medium theme-tag theme-${esc(p.theme)}"><i class="fas ${theme.icon}"></i>&nbsp;${esc(theme.label)}</span>
          </div>
          <h2 class="title is-2 publication-title">${esc(p.title)}</h2>
          <div class="is-size-5 publication-authors">${authorsHtml(p)}</div>
          <div class="supervisor">Supervised by <a href="${esc(sup.url)}" target="_blank" rel="noopener">Prof. ${esc(sup.name)}</a></div>
          <div class="publication-links">${linksHtml(p.links)}</div>
        </div>
        ${heroMedia}
        <div class="tldr"><span class="tldr-label">In short</span>${esc(p.tldr)}</div>
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <h3 class="title is-4 has-text-centered">${esc(p.abstractLabel || "Abstract")}</h3>
            <div class="content has-text-justified abstract">
              ${p.abstract.map((t) => `<p>${esc(t)}</p>`).join("")}
              ${p.highlights ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
            </div>
          </div>
        </div>
        ${portraitRow ? "" : galleryHtml(p.gallery)}
        ${youtubeHtml(p.youtube)}
      </div>
    </section>`;
  }

  function themeHeaderHtml(key) {
    const t = THEMES[key];
    return `<section class="section theme-header theme-${esc(key)}" id="theme-${esc(key)}" data-theme="${esc(key)}">
      <div class="container is-max-desktop has-text-centered">
        <p class="theme-kicker"><i class="fas ${t.icon}"></i></p>
        <h2 class="title is-2">${esc(t.label)}</h2>
        <p class="subtitle is-5">${esc(t.blurb)}</p>
      </div></section>`;
  }

  /* --------------------------------------------------------------- render */

  document.getElementById("project-count").textContent = PROJECTS.length;

  document.getElementById("wall").innerHTML = ordered
    .map(
      (p) => `<a class="wall-tile theme-${esc(p.theme)}" href="#${esc(p.id)}" data-theme="${esc(p.theme)}">
        ${mediaEl(p.media, "wall-media")}
        <span class="wall-caption"><strong>${esc(p.short)}</strong><small>${esc(p.venue)}</small></span></a>`
    )
    .join("");

  document.getElementById("theme-filter").innerHTML =
    `<button class="button is-rounded filter-btn is-active" data-filter="all">All</button>` +
    Object.entries(THEMES)
      .filter(([k]) => byTheme[k])
      .map(
        ([k, t]) =>
          `<button class="button is-rounded filter-btn" data-filter="${esc(k)}"><span class="icon"><i class="fas ${t.icon}"></i></span><span>${esc(t.label)}</span></button>`
      )
      .join("");

  let idx = 0;
  document.getElementById("projects").innerHTML = Object.keys(THEMES)
    .filter((k) => byTheme[k])
    .map((k) => themeHeaderHtml(k) + byTheme[k].map((p) => projectHtml(p, idx++)).join(""))
    .join("");

  document.getElementById("people").innerHTML = MEMBERS.map(
    (m) => `<div class="column is-3-desktop is-4-tablet is-6-mobile">
      <a class="person${m.pi ? " is-pi" : ""}" href="${esc(m.url)}" target="_blank" rel="noopener">
        ${
          m.img
            ? `<img src="${esc(m.img)}" alt="${esc(m.name)}" loading="lazy">`
            : `<span class="initials">${esc(m.name.split(/[\s-]+/).map((w) => w[0]).filter((c) => c === c.toUpperCase()).slice(0, 2).join(""))}</span>`
        }
        <strong>${m.pi ? "Prof. " : ""}${esc(m.name)}</strong>
        <small>${esc(m.topic)}</small></a></div>`
  ).join("");

  /* ------------------------------------------------- lazy video playback */

  const videos = document.querySelectorAll("video.lazy-video");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    },
    { rootMargin: "200px 0px", threshold: 0.15 }
  );
  videos.forEach((v) => io.observe(v));

  /* --------------------------------------------------------- YouTube facade */

  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".yt-facade");
    if (!btn) return;
    const wrap = document.createElement("div");
    wrap.className = "yt-frame";
    wrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(
      btn.dataset.yt
    )}?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    btn.replaceWith(wrap);
    stopPresentation();
  });

  /* ----------------------------------------------------------- theme filter */

  const filterBtns = document.querySelectorAll(".filter-btn");
  function applyFilter(f) {
    filterBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === f));
    document.querySelectorAll("#projects [data-theme], #wall [data-theme]").forEach((el) => {
      el.classList.toggle("is-hidden", f !== "all" && el.dataset.theme !== f);
    });
  }
  filterBtns.forEach((b) =>
    b.addEventListener("click", () => {
      applyFilter(b.dataset.filter);
      const target = b.dataset.filter === "all" ? "overview" : "theme-" + b.dataset.filter;
      document.getElementById(target).scrollIntoView({ behavior: "smooth" });
    })
  );

  /* ------------------------------------------------------ navbar burger */

  document.querySelectorAll(".navbar-burger").forEach((el) =>
    el.addEventListener("click", () => {
      el.classList.toggle("is-active");
      document.getElementById(el.dataset.target).classList.toggle("is-active");
    })
  );

  /* ------------------------------------------------- presentation mode */
  // Auto-advances through the projects for unattended display at events.
  // Open with the button, or with ?present (optionally ?present=30 seconds).

  const params = new URLSearchParams(location.search);
  const dwell = Math.max(8, parseInt(params.get("present"), 10) || 25) * 1000;
  const overlay = document.getElementById("present-overlay");
  const label = document.getElementById("present-label");
  const bar = document.getElementById("present-progress");
  let timer = null;
  let current = -1;
  let paused = false;

  const visibleProjects = () => [...document.querySelectorAll("section.project:not(.is-hidden)")];

  function show(i) {
    const list = visibleProjects();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    const sec = list[current];
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
    const p = PROJECTS.find((x) => x.id === sec.id);
    label.textContent = `${current + 1} / ${list.length} · ${p ? p.short : ""}`;
    restartTimer();
  }

  function restartTimer() {
    clearTimeout(timer);
    bar.style.transition = "none";
    bar.style.width = "0%";
    if (paused) return;
    void bar.offsetWidth; // restart the CSS transition
    bar.style.transition = `width ${dwell}ms linear`;
    bar.style.width = "100%";
    timer = setTimeout(() => show(current + 1), dwell);
  }

  function startPresentation() {
    document.body.classList.add("presenting");
    overlay.hidden = false;
    paused = false;
    document.getElementById("present-pause").innerHTML = '<i class="fas fa-pause"></i>';
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    show(0);
  }

  function stopPresentation() {
    if (!document.body.classList.contains("presenting")) return;
    clearTimeout(timer);
    document.body.classList.remove("presenting");
    overlay.hidden = true;
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }

  function togglePause() {
    paused = !paused;
    document.getElementById("present-pause").innerHTML = paused
      ? '<i class="fas fa-play"></i>'
      : '<i class="fas fa-pause"></i>';
    restartTimer();
  }

  document.querySelectorAll("[data-present]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      startPresentation();
    })
  );
  document.getElementById("present-prev").addEventListener("click", () => show(current - 1));
  document.getElementById("present-next").addEventListener("click", () => show(current + 1));
  document.getElementById("present-pause").addEventListener("click", togglePause);
  document.getElementById("present-exit").addEventListener("click", stopPresentation);
  document.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("presenting")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") show(current + 1);
    else if (e.key === "ArrowLeft" || e.key === "PageUp") show(current - 1);
    else if (e.key === " ") {
      e.preventDefault();
      togglePause();
    } else if (e.key === "Escape") stopPresentation();
  });

  if (params.has("present")) startPresentation();
})();
