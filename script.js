/* =====================================================================
   SITE CONTENT — EDIT EVERYTHING HERE
   ---------------------------------------------------------------------
   • To add an app: copy one { ... } block inside apps, paste it after
     the last one (keep the comma between blocks), and change the text.
   • To add a client: same thing inside clients.
   • id must be unique, lowercase, no spaces (it becomes the page link).
   • status: "live", "beta" or "dev".
   • icon: leave "" to show a coloured tile with the first letter, or put
     an image path like "images/ischys.png" once the site is hosted.
   ===================================================================== */
const SITE = {
  studio: {
    name: "Purple Goose Studios",
    tagline: "Independent studio building native apps",
    heroTitle: "We try our best",
    heroText: "Purple Goose Studios is a small app studio building native products, and helping businesses turn ideas into apps.",
    email: "purplegoosestudios@outlook.com",
    year: 2026,

    // Optional: paste a Formspree (or similar) endpoint URL here once the site
    // is on your own domain and the contact form will send messages to you.
    // Leave empty to show just the email address.
    formEndpoint: ""
  },
 
  about: {
    intro: "Purple Goose Studios is a small UK-based app studio making native apps for iPhone and Apple Watch.",
    story: [
      "We build in Swift and SwiftUI, so each app feels native to the platform it lives on instead of bolted on after the fact.",
      "The studio stays intentionally small, which means you deal directly with the person building the app from the first idea through launch and updates."
    ],
    team: [
      { name: "Connor Bray", role: "Co-founder · iOS lead", linkedin: "https://www.linkedin.com/in/connor-bray-bb519b358/" },
      { name: "Jacob James", role: "Co-founder", linkedin: "https://www.linkedin.com/in/jacobjames1322/" }
    ],
    services: [
      { title: "iOS & watchOS apps", text: "Native SwiftUI apps with SwiftData storage, widgets and Apple Watch companions." },
      { title: "Backends", text: "Supabase auth, databases, realtime data, edge functions and push notifications." },
      { title: "Android Apps", text: "Native Kotlin apps with Jetpack Compose, Room storage, widgets and Wear OS companions." }
    ]
  },
 
  apps: [
    {
      id: "ischys",
      name: "Ischys",
      tagline: "Track everything in the gym.",
      status: "dev",
      color: "#B23A1F",
      color2: "#E0892F",
      icon: "",
      platforms: ["iOS", "watchOS"],
      description: [
        "Ischys is a strength-training log that turns your lifts into a ranking for each muscle group. Named after the Greek word for strength, it moves each muscle through seven tiers, from Mortal up to Olympian, with a secret prestige tier for anyone who maxes one out.",
        "Log sets from your iPhone or straight from your Apple Watch mid-workout, and watch your body map light up as you progress."
      ],
      features: [
        "Per-muscle ranking across seven Greek-myth tiers",
        "Interactive front and back body map",
        "120 built-in exercises plus your own routines",
        "Warm-up and intensity flags on every set",
        "Apple Watch companion with rest timer and haptics"
      ],
      stack: "SwiftUI · SwiftData · WatchConnectivity",
      link: ""
    },
    {
      id: "swindle",
      name: "Swindle Scorecard",
      tagline: "The golf tracker for all golf needs.",
      status: "beta",
      color: "#0B6E4F",
      color2: "#5CB88A",
      icon: "",
      platforms: ["iOS"],
      description: [
        "Swindle replaces the paper scorecard. Create a competition, invite your group, and everyone's scores update on a live leaderboard as the round goes on.",
        "It keeps scoring even with no signal on the course and syncs the moment you're back online. Handicaps flow straight into open competitions."
      ],
      features: [
        "Live leaderboards during the round",
        "Offline-first scoring that syncs later",
        "Competition invites with push notifications",
        "Automatic handicap updates",
        "A built-in mini golf mini-game"
      ],
      stack: "SwiftUI · Supabase",
      link: ""
    }
  ],
 
  clients: [
    {
      name: "Swanline",
      industry: "Packaging",
      year: "2026",
      services: ["Tailored App Creation, Tweaking, Monitoring, Maintenance, Private App"],
      description: "Cleaning app which makes it easier to keep track of your cleaning schedule and tasks, across multiple units and locations. User friendly for all age ranges and abilities. Keeps all logged information through the cloud, easily accessible for any audit purposes. Private information only for company access.",
      quote: "5 star service",
      link: ""
    }
  ]
};
/* ======================= END OF CONTENT ============================ */
 
 
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const STATUS = { live: "On the App Store", beta: "In beta", dev: "In development" };
 
function iconHTML(app, size = "") {
  if (app.icon) return `<div class="icon ${size}" style="background-image:url('${esc(app.icon)}')" role="img" aria-label="${esc(app.name)} icon"></div>`;
  const bg = `linear-gradient(145deg, ${esc(app.color || "#555")}, ${esc(app.color2 || app.color || "#888")})`;
  return `<div class="icon ${size}" style="background:${bg}" aria-hidden="true">${esc((app.name || "?")[0])}</div>`;
}
const chips = (arr) => `<div class="chips">${(arr || []).map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>`;
const status = (s) => `<span class="status ${esc(s)}">${esc(STATUS[s] || s)}</span>`;
 
const PAGES = [
  ["home", "Home"], ["apps", "Apps"], ["clients", "Clients"], ["about", "About"], ["contact", "Contact"]
];
 
function appCard(a) {
  return `<a class="app-card" href="#app-${esc(a.id)}">
    ${iconHTML(a, "sm")}
    <div class="body">
      ${status(a.status)}
      <h3>${esc(a.name)}</h3>
      <p>${esc(a.tagline)}</p>
      ${chips(a.platforms)}
    </div>
  </a>`;
}
 
const views = {
  home() {
    const s = SITE.studio;
    const shelf = SITE.apps.slice(0, 6).map(a => `<a href="#app-${esc(a.id)}">${iconHTML(a)}<span>${esc(a.name)}</span></a>`).join("");
    const pad = Math.max(0, 3 - (SITE.apps.length % 3 || 3));
    const empties = SITE.apps.length < 6 ? Array.from({ length: pad }, () => `<a href="#contact" aria-label="Your app"><div class="icon placeholder">+</div><span>Your app?</span></a>`).join("") : "";
    return `
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">Independent app studio · Est. ${esc(s.year)}</span>
          <h1>${s.heroTitle}</h1>
          <p class="lede">${esc(s.heroText)}</p>
          <div class="actions"><a class="btn primary" href="#apps">See our apps</a><a class="btn" href="#contact">Start a project</a></div>
        </div>
        <div class="shelf" aria-label="Our apps">${shelf}${empties}</div>
      </section>
      <section class="section-head">
        <span class="eyebrow">What we do</span>
        <h2>${esc(s.tagline)}</h2>
      </section>
      <section class="services">${SITE.about.services.map(x => `<div class="service"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join("")}</section>
      <section class="section-head"><span class="eyebrow">Latest apps</span></section>
      <section class="app-grid" style="margin-top:-40px">${SITE.apps.slice(0, 3).map(appCard).join("")}</section>`;
  },
 
  apps() {
    return `
      <section class="section-head">
        <span class="eyebrow">${SITE.apps.length} ${SITE.apps.length === 1 ? "app" : "apps"}</span>
        <h1>Our apps</h1>
        <p class="lede">Products we design, build and run ourselves.</p>
      </section>
      <section class="app-grid">${SITE.apps.map(appCard).join("")}</section>`;
  },
 
  app(id) {
    const a = SITE.apps.find(x => x.id === id);
    if (!a) return views.apps();
    return `
      <a class="back" href="#apps">← All apps</a>
      <section class="detail-head">
        ${iconHTML(a, "lg")}
        <div class="meta">
          ${status(a.status)}
          <h1>${esc(a.name)}</h1>
          <p class="lede">${esc(a.tagline)}</p>
          ${a.link ? `<div class="actions"><a class="btn primary" href="${esc(a.link)}" target="_blank" rel="noopener">Download</a></div>` : ""}
        </div>
      </section>
      <section class="detail-body">
        <div class="prose">
          ${(a.description || []).map(p => `<p>${esc(p)}</p>`).join("")}
          ${a.features?.length ? `<h2 style="font-size:1.3rem;margin-top:12px">Features</h2><ul class="features">${a.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        </div>
        <dl class="spec">
          <div><dt>Status</dt><dd>${esc(STATUS[a.status] || a.status)}</dd></div>
          <div><dt>Platforms</dt><dd>${esc((a.platforms || []).join(", "))}</dd></div>
          ${a.stack ? `<div><dt>Built with</dt><dd>${esc(a.stack)}</dd></div>` : ""}
        </dl>
      </section>`;
  },
 
  clients() {
    return `
      <section class="section-head">
        <span class="eyebrow">Client work</span>
        <h1>Who we build for</h1>
        <p class="lede">Alongside our own apps, we take on a small number of client projects each year.</p>
      </section>
      <section class="client-list">
        ${SITE.clients.map(c => `
          <article class="client">
            <div class="who">
              <span class="year">${esc(c.year)} · ${esc(c.industry)}</span>
              <h3>${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name)}</h3>
              ${chips(c.services)}
            </div>
            <div class="what">
              <p>${esc(c.description)}</p>
              ${c.quote ? `<blockquote>${esc(c.quote)}</blockquote>` : ""}
            </div>
          </article>`).join("")}
      </section>
      <section class="actions"><a class="btn primary" href="#contact">Work with us</a></section>`;
  },
 
  about() {
    const ab = SITE.about;
    return `
      <section class="section-head">
        <span class="eyebrow">About</span>
        <h1>${esc(SITE.studio.name)}</h1>
      </section>
      <section class="about-grid">
        <div class="prose"><p class="lede" style="color:var(--ink)">${esc(ab.intro)}</p>${ab.story.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        <dl class="spec">
          <div><dt>Founded</dt><dd>${esc(SITE.studio.year)}</dd></div>
          <div><dt>Apps</dt><dd>${SITE.apps.length}</dd></div>
          <div><dt>Platforms</dt><dd>${esc([...new Set(SITE.apps.flatMap(a => a.platforms || []))].join(", "))}</dd></div>
        </dl>
      </section>
      <section class="section-head"><span class="eyebrow">The team</span></section>
      <section class="team" style="margin-top:-40px">
        ${ab.team.map(p => `<div class="person"><div class="avatar">${esc(p.name[0])}</div><h3>${esc(p.name)}</h3><span class="role">${esc(p.role)}</span><p>${esc(p.bio)}</p>${p.linkedin ? `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>` : ""}</div>`).join("")}
      </section>
      <section class="section-head"><span class="eyebrow">Services</span></section>
      <section class="services" style="margin-top:-40px">${ab.services.map(x => `<div class="service"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join("")}</section>`;
  },
 
  contact() {
    const s = SITE.studio;
    const form = s.formEndpoint ? `
      <form id="contactForm">
        <label for="cf-name">Name<input id="cf-name" name="name" required></label>
        <label for="cf-email">Email<input id="cf-email" name="email" type="email" required></label>
        <label for="cf-msg">Tell us about your project<textarea id="cf-msg" name="message" required></textarea></label>
        <button class="btn primary" type="submit">Send message</button>
        <p class="form-msg" id="formMsg" aria-live="polite"></p>
      </form>` : `
      <div class="prose">
        <h2 style="font-size:1.4rem">What to include</h2>
        <ul class="features">
          <li>What the app should do, in a sentence or two</li>
          <li>Which platforms you need: iPhone or Apple Watch</li>
          <li>Any timeline or launch date you're working to</li>
        </ul>
      </div>`;
    return `
      <section class="section-head">
        <span class="eyebrow">Contact</span>
        <h1>Got an app in mind?</h1>
        <p class="lede">Send us a message and we'll reply within two working days.</p>
      </section>
      <section class="contact-grid">
        <div class="contact-card">
          <span class="eyebrow">Email</span>
          <div class="email-row"><span class="email" id="emailText">${esc(s.email)}</span><button class="copy" id="copyBtn" type="button">Copy</button></div>
          ${s.social?.length ? `<span class="eyebrow" style="margin-top:8px">Elsewhere</span><div class="links">${s.social.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗️</a>`).join("")}</div>` : ""}
        </div>
        ${form}
      </section>`;
  }
};
 
function render() {
  const hash = (location.hash || "#home").slice(1);
  let page = hash, html;
  if (hash.startsWith("app-")) { page = "apps"; html = views.app(hash.slice(4)); }
  else if (views[hash] && hash !== "app") html = views[hash]();
  else { page = "home"; html = views.home(); }
  $("#app").innerHTML = `<div class="view">${html}</div>`;
  document.querySelectorAll("#nav a").forEach(a => a.setAttribute("aria-current", a.dataset.page === page ? "page" : "false"));
  window.scrollTo(0, 0);
  wire();
}
 
function wire() {
  const copy = $("#copyBtn");
  if (copy) copy.addEventListener("click", () => {
    const text = SITE.studio.email;
    const done = () => { copy.textContent = "Copied"; setTimeout(() => copy.textContent = "Copy", 1800); };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents($("#emailText")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); copy.textContent = "Selected"; };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch { fallback(); }
  });
  const form = $("#contactForm");
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $("#formMsg");
    msg.textContent = "Sending…";
    try {
      const res = await fetch(SITE.studio.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error();
      form.reset(); msg.textContent = "Thanks, your message is on its way. We'll reply soon.";
    } catch {
      msg.textContent = `That didn't send. Please email us at ${SITE.studio.email} instead.`;
    }
  });
}
 
$("#brandName").textContent = SITE.studio.name;
$("#brandMark").textContent = SITE.studio.name[0];
$("#nav").innerHTML = PAGES.map(([id, label]) => `<a href="#${id}" data-page="${id}">${label}</a>`).join("");
$("#footLeft").textContent = `© ${SITE.studio.year} ${SITE.studio.name}`;
$("#footRight").textContent = SITE.studio.email;
document.title = SITE.studio.name;
addEventListener("hashchange", render);
render();
