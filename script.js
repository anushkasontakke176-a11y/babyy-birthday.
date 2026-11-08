// PERSONALIZE YOUR GIFT
const PIN = "172006";

// Your Spotify song
const SPOTIFY_TRACK_ID = "0tW2gwaRzFQQrgr2UCO56G";
const SPOTIFY_TRACK_URL = "https://open.spotify.com/track/0tW2gwaRzFQQrgr2UCO56G?si=jITg9gIqQwmXqRJoj-4fKQ";

const gate = document.getElementById("gate");
const site = document.getElementById("site");
const pinInput = document.getElementById("pin");
const pinError = document.getElementById("pinError");

document.getElementById("pinForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (pinInput.value === PIN) {
    gate.classList.add("unlocking");
    pinError.textContent = "";

    setTimeout(() => {
      gate.classList.add("hidden");
      site.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
      hearts(24);
    }, 700);

  } else {
    pinError.textContent =
      "Oops, sweetheart! Try remembering our little secret. ♡";

    pinInput.value = "";
    pinInput.focus();
    hearts(5);
  }
});

document.getElementById("openLetter").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({
    behavior: "smooth"
  });

  hearts(8);
});

document.getElementById("lastButton").addEventListener("click", function () {
  document.getElementById("lastReveal").classList.add("show");

  this.textContent = "A little piece of my heart, forever ♡";

  hearts(28);
});

// Spotify song link
document.getElementById("songSearch").href = SPOTIFY_TRACK_URL;

document.getElementById("songSearch").textContent =
  "Open Alfaaz on Spotify ↗";

// Spotify embedded music player
const frame = document.createElement("iframe");

frame.src =
  `https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator`;

frame.title = "Alfaaz — our song on Spotify";

frame.allow =
  "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

frame.loading = "lazy";
frame.width = "100%";
frame.height = "152";
frame.style.border = "0";
frame.style.borderRadius = "12px";

document.getElementById("musicEmbed").appendChild(frame);

document.querySelector(".music-help").textContent =
  "Tap play when you're ready to listen ♡";

// Floating hearts animation
function hearts(count) {
  const layer = document.getElementById("heartLayer");

  const symbols = ["♡", "♥", "✧", "✦"];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");

    el.className = "floating-heart";

    el.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = (12 + Math.random() * 24) + "px";
    el.style.animationDuration = (3 + Math.random() * 3) + "s";
    el.style.animationDelay = Math.random() * 0.5 + "s";

    layer.appendChild(el);

    setTimeout(() => el.remove(), 7000);
  }
}

// Reveal cards gently as they enter the screen
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  ".wish, .photo-card, .polaroid, .letter, .story-letter"
).forEach(el => {

  el.style.opacity = "0";
  el.style.transform += " translateY(18px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";

  observer.observe(el);
});

const revealStyle = document.createElement("style");

revealStyle.textContent =
  ".visible{opacity:1!important;transform:translateY(0)!important}";

document.head.appendChild(revealStyle);
