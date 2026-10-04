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
  const $ = (id) => document.getElementById(id);

  const byTheme = {};
  PROJECTS.forEach((p) => (byTheme[p.theme] = byTheme[p.theme] || []).push(p));
  Object.values(byTheme).forEach((list) => list.sort((a, b) => b.year - a.year));
  const themeKeys = Object.keys(THEMES).filter((k) => byTheme[k]);
  const ordered = themeKeys.flatMap((k) => byTheme[k]);
  const featured = ordered.filter((p) => p.featured);
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

  /* ---------------------------------------------------------------- media */

  function mediaEl(m, cls, opts = {}) {
    // Width/height reserve space before lazy media loads (no layout jumps).
    const dims = (typeof MEDIA_DIMS !== "undefined" && MEDIA_DIMS[m.src]) || null;
    const size = dims ? `width="${dims[0]}" height="${dims[1]}"` : "";
    if (m.type === "video") {
      const sound = opts.controls && m.audio;
      return `<video class="${cls} lazy-video" ${sound ? "" : "muted"} loop playsinline preload="none" ${size}
        ${opts.controls ? "controls" : ""} ${m.poster ? `poster="${esc(m.poster)}"` : ""} data-src="${esc(m.src)}"
        ${sound ? 'data-manual="1"' : ""}></video>`;
    }
    return `<img class="${cls}" src="${esc(m.src)}" ${size} loading="lazy" alt="">`;
  }

  function placeholder(p) {
    return `<div class="media-placeholder theme-${esc(p.theme)}"><i class="fas ${THEMES[p.theme].icon}"></i><span>${esc(p.short)}</span></div>`;
  }

  function authorsShort(p, n = 3) {
    const names = p.authors.map((a) => a.name);
    return esc(names.length > n + 1 ? names.slice(0, n).join(", ") + " et al." : names.join(", "));
  }

  function authorsFull(p) {
    return (
      p.authors
        .map((a) => {
          const name = esc(a.name) + (a.mark ? `<sup>${esc(a.mark)}</sup>` : "");
          return `<span class="author-block">${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${name}</a>` : name}</span>`;
        })
        .join(", ") + (p.note ? `<div class="author-note">${esc(p.note)}</div>` : "")
    );
  }

  function linkButtons(links, small) {
    return Object.entries(links)
      .map(([k, url]) => {
        const meta = LINK_META[k] || { label: k, icon: "fas fa-link" };
        return small
          ? `<a class="icon-link" href="${esc(url)}" target="_blank" rel="noopener" title="${meta.label}" aria-label="${meta.label}"><i class="${meta.icon}"></i></a>`
          : `<a class="button is-rounded is-dark link-button" href="${esc(url)}" target="_blank" rel="noopener"><span class="icon"><i class="${meta.icon}"></i></span><span>${meta.label}</span></a>`;
      })
      .join("");
  }

  const tagsHtml = (p) =>
    `<span class="tag venue-tag">${esc(p.venue)}</span><span class="tag theme-tag theme-${esc(p.theme)}"><i class="fas ${THEMES[p.theme].icon}"></i>&nbsp;${esc(THEMES[p.theme].label)}</span>`;

  /* -------------------------------------------------------- page sections */

  $("wall").innerHTML = featured
    .map(
      (p) => `<a class="wall-tile theme-${esc(p.theme)}" href="#${esc(p.id)}" data-open="${esc(p.id)}">
        ${mediaEl(p.media, "wall-media")}
        <span class="wall-caption"><strong>${esc(p.short)}</strong><small>${esc(p.venue)}</small></span></a>`
    )
    .join("");

  $("theme-filter").innerHTML =
    `<button class="button is-rounded filter-btn is-active" data-filter="all">All</button>` +
    themeKeys
      .map(
        (k) =>
          `<button class="button is-rounded filter-btn" data-filter="${esc(k)}"><span class="icon"><i class="fas ${THEMES[k].icon}"></i></span><span>${esc(THEMES[k].label)}</span></button>`
      )
      .join("");

  $("nav-themes").innerHTML += themeKeys
    .map((k) => `<a class="navbar-item" href="#theme-${esc(k)}">${esc(THEMES[k].nav)}</a>`)
    .join("");

  function cardHtml(p) {
    const media = p.media ? mediaEl(p.media, "card-media" + (p.media.type === "image" ? " is-still" : "")) : placeholder(p);
    return `<div class="column is-4-desktop is-6-tablet">
      <article class="card-project theme-${esc(p.theme)}" id="card-${esc(p.id)}">
        <a class="card-media-wrap" href="#${esc(p.id)}" data-open="${esc(p.id)}" aria-label="Details: ${esc(p.short)}">${media}
          ${p.media && p.media.type === "video" ? '<span class="video-badge"><i class="fas fa-play"></i></span>' : ""}</a>
        <div class="card-body">
          <div class="card-tags"><span class="tag venue-tag">${esc(p.venue)}</span></div>
          <h3 class="card-title"><a href="#${esc(p.id)}" data-open="${esc(p.id)}">${esc(p.title)}</a></h3>
          <p class="card-authors">${authorsShort(p)}</p>
          <p class="card-tldr">${esc(p.tldr)}</p>
          <div class="card-foot">
            <a class="button is-small is-rounded details-btn" href="#${esc(p.id)}" data-open="${esc(p.id)}">
              <span>Details</span><span class="icon"><i class="fas fa-angle-right"></i></span></a>
            <span class="card-links">${linkButtons(p.links, true)}</span>
          </div>
        </div>
      </article></div>`;
  }

  $("projects").innerHTML = themeKeys
    .map(
      (k) => `<section class="theme-block" id="theme-${esc(k)}" data-theme="${esc(k)}">
        <header class="theme-head theme-${esc(k)}">
          <h3 class="title is-4"><i class="fas ${THEMES[k].icon}"></i> ${esc(THEMES[k].label)}</h3>
          <p>${esc(THEMES[k].blurb)}</p>
        </header>
        <div class="columns is-multiline">${byTheme[k].map(cardHtml).join("")}</div>
      </section>`
    )
    .join("");

  /* ------------------------------------------------- lazy video playback */

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          if (!v.dataset.manual) {
            const pr = v.play();
            if (pr && pr.catch) pr.catch(() => {});
          }
        } else if (!v.paused) {
          v.pause();
        }
      });
    },
    { rootMargin: "150px 0px", threshold: 0.1 }
  );
  const observeVideos = (root) => root.querySelectorAll("video.lazy-video").forEach((v) => io.observe(v));
  observeVideos(document);

  /* ------------------------------------------------------- details modal */

  const modal = $("details");
  let openId = null;

  function detailsHtml(p) {
    const sup = SUPERVISORS[p.supervisor];
    const main = p.media
      ? `<div class="details-media${p.media.portrait ? " is-portrait" : ""}">${mediaEl(p.media, "details-main")}</div>`
      : "";
    const gallery = (p.gallery || []).length
      ? `<div class="columns is-multiline is-centered gallery${p.gallery.every((g) => g.portrait) ? " is-mobile" : ""}">${p.gallery
          .map(
            (g) => `<div class="column ${g.portrait ? "is-4" : p.gallery.length === 1 ? "is-10" : "is-6-tablet"}">
              <figure class="gallery-item${g.portrait ? " is-portrait" : ""}">${mediaEl(g, "gallery-media", { controls: g.audio })}
              ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}</figure></div>`
          )
          .join("")}</div>`
      : "";
    const yt = (p.youtube || []).length
      ? `<div class="columns is-multiline is-centered">${p.youtube
          .map(
            (y) => `<div class="column ${p.youtube.length > 1 ? "is-6-tablet" : "is-10"}">
              <button class="yt-facade" data-yt="${esc(y.id)}" aria-label="Play video: ${esc(y.title)}">
                <img src="https://i.ytimg.com/vi/${esc(y.id)}/hqdefault.jpg" loading="lazy" alt="">
                <span class="yt-play"><i class="fab fa-youtube"></i></span>
                <span class="yt-title">${esc(y.title)}</span></button></div>`
          )
          .join("")}</div>`
      : "";
    return `
      <div class="has-text-centered">
        <div class="project-tags">${tagsHtml(p)}</div>
        <h2 class="title is-3 publication-title" id="details-title">${esc(p.title)}</h2>
        <div class="publication-authors">${authorsFull(p)}</div>
        <div class="supervisor">Supervised by <a href="${esc(sup.url)}" target="_blank" rel="noopener">Prof. ${esc(sup.name)}</a></div>
        <div class="publication-links">${linkButtons(p.links)}</div>
      </div>
      ${main}
      <div class="tldr"><span class="tldr-label">In short</span>${esc(p.tldr)}</div>
      <details class="abstract-box" open>
        <summary>${esc(p.abstractLabel || "Abstract")}</summary>
        <div class="content has-text-justified abstract">
          ${p.abstract.map((t) => `<p>${esc(t)}</p>`).join("")}
          ${p.highlights ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        </div>
      </details>
      ${gallery || yt ? `<h3 class="title is-5 media-heading">Media</h3>${gallery}${yt}` : ""}`;
  }

  function openDetails(id, push = true) {
    const p = byId[id];
    if (!p) return;
    openId = id;
    const body = $("details-body");
    body.querySelectorAll("video").forEach((v) => io.unobserve(v));
    body.innerHTML = detailsHtml(p);
    body.scrollTop = 0;
    const i = ordered.indexOf(p);
    $("details-count").textContent = `${i + 1} / ${ordered.length}`;
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("is-clipped");
    observeVideos(body);
    if (push && location.hash !== "#" + id) history.pushState(null, "", "#" + id);
  }

  function closeDetails(push = true) {
    if (!openId) return;
    const id = openId;
    openId = null;
    const body = $("details-body");
    body.querySelectorAll("video").forEach((v) => (io.unobserve(v), v.pause()));
    body.innerHTML = "";
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("is-clipped");
    if (push) history.pushState(null, "", location.pathname + location.search);
    const card = $("card-" + id);
    if (card) card.scrollIntoView({ block: "nearest" });
  }

  const step = (d) => {
    const i = ordered.indexOf(byId[openId]);
    openDetails(ordered[(i + d + ordered.length) % ordered.length].id);
  };

  document.addEventListener("click", (ev) => {
    const opener = ev.target.closest("[data-open]");
    if (opener) {
      ev.preventDefault();
      openDetails(opener.dataset.open);
      return;
    }
    if (ev.target.closest("[data-close]")) closeDetails();
    const yt = ev.target.closest(".yt-facade");
    if (yt) {
      const wrap = document.createElement("div");
      wrap.className = "yt-frame";
      wrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(yt.dataset.yt)}?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      yt.replaceWith(wrap);
    }
  });
  $("details-prev").addEventListener("click", () => step(-1));
  $("details-next").addEventListener("click", () => step(1));

  function syncHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (byId[id]) openDetails(id, false);
    else closeDetails(false);
  }
  window.addEventListener("popstate", syncHash);

  /* ----------------------------------------------------------- theme filter */

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((b) =>
    b.addEventListener("click", () => {
      const f = b.dataset.filter;
      filterBtns.forEach((x) => x.classList.toggle("is-active", x === b));
      document.querySelectorAll(".theme-block").forEach((el) => el.classList.toggle("is-hidden", f !== "all" && el.dataset.theme !== f));
    })
  );

  document.querySelectorAll(".navbar-burger").forEach((el) =>
    el.addEventListener("click", () => {
      el.classList.toggle("is-active");
      $(el.dataset.target).classList.toggle("is-active");
    })
  );
  $("main-nav").addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      $("main-nav").classList.remove("is-active");
      document.querySelector(".navbar-burger").classList.remove("is-active");
    }
  });

  /* ------------------------------------------------- presentation mode */
  // Full-screen slideshow of the highlighted projects for unattended display.
  // Open with the button, or with ?present (optionally ?present=30 seconds).

  const params = new URLSearchParams(location.search);
  const dwell = Math.max(8, parseInt(params.get("present"), 10) || 20) * 1000;
  const show = $("show");
  const bar = $("show-progress");
  let timer = null;
  let current = 0;
  let paused = false;
  let hideCursor = null;

  function qrSvg(url) {
    if (typeof qrcode === "undefined") return "";
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  }

  function showSlide(i) {
    current = (i + featured.length) % featured.length;
    const p = featured[current];
    const holder = $("show-media");
    holder.innerHTML =
      p.media.type === "video"
        ? `<video muted loop playsinline autoplay src="${esc(p.media.src)}" poster="${esc(p.media.poster || "")}"></video>`
        : `<img src="${esc(p.media.src)}" alt="">`;
    const v = holder.querySelector("video");
    if (v) {
      const pr = v.play();
      if (pr && pr.catch) pr.catch(() => {});
    }
    $("show-tags").innerHTML = tagsHtml(p);
    $("show-title").textContent = p.title;
    $("show-authors").textContent = p.authors.map((a) => a.name).join(", ");
    $("show-tldr").textContent = p.tldr;
    $("show-qr").innerHTML = qrSvg(p.links.page || p.links.arxiv || p.links.paper || LAB.website);
    $("show-label").textContent = `${current + 1} / ${featured.length}`;
    restartTimer();
  }

  function restartTimer() {
    clearTimeout(timer);
    bar.style.transition = "none";
    bar.style.width = "0%";
    if (paused) return;
    void bar.offsetWidth;
    bar.style.transition = `width ${dwell}ms linear`;
    bar.style.width = "100%";
    timer = setTimeout(() => showSlide(current + 1), dwell);
  }

  function startShow() {
    closeDetails();
    document.querySelectorAll("video.lazy-video").forEach((v) => v.pause());
    show.hidden = false;
    document.documentElement.classList.add("is-clipped", "presenting");
    paused = false;
    $("show-pause").innerHTML = '<i class="fas fa-pause"></i>';
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    showSlide(0);
  }

  function stopShow() {
    if (show.hidden) return;
    clearTimeout(timer);
    show.hidden = true;
    $("show-media").innerHTML = "";
    document.documentElement.classList.remove("is-clipped", "presenting");
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }

  function togglePause() {
    paused = !paused;
    $("show-pause").innerHTML = paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    restartTimer();
  }

  document.querySelectorAll("[data-present]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      startShow();
    })
  );
  $("show-prev").addEventListener("click", () => showSlide(current - 1));
  $("show-next").addEventListener("click", () => showSlide(current + 1));
  $("show-pause").addEventListener("click", togglePause);
  $("show-exit").addEventListener("click", stopShow);
  show.addEventListener("mousemove", () => {
    show.classList.remove("hide-cursor");
    clearTimeout(hideCursor);
    hideCursor = setTimeout(() => show.classList.add("hide-cursor"), 2500);
  });

  document.addEventListener("keydown", (e) => {
    if (!show.hidden) {
      if (e.key === "ArrowRight" || e.key === "PageDown") showSlide(current + 1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") showSlide(current - 1);
      else if (e.key === " ") {
        e.preventDefault();
        togglePause();
      } else if (e.key === "Escape") stopShow();
      return;
    }
    if (openId) {
      if (e.key === "Escape") closeDetails();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    }
  });

  if (params.has("present")) startShow();
  else syncHash();
})();
