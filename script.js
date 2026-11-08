// PERSONALIZE YOUR GIFT:
// PIN is set to 172006. This is front-end PIN protection, not strong encryption.
// For the song, paste the YouTube video ID (the part after youtube.com/watch?v=).
const PIN = "172006";
const YOUTUBE_VIDEO_ID = ""; // Example: "dQw4w9WgXcQ"
const YOUTUBE_SEARCH_URL = "https://www.youtube.com/results?search_query=Alfaaz+song";

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
      window.scrollTo({top:0, behavior:"smooth"});
      hearts(24);
    }, 700);
  } else {
    pinError.textContent = "Oops, sweetheart! Try remembering our little secret. ♡";
    pinInput.value = "";
    pinInput.focus();
    hearts(5);
  }
});

document.getElementById("openLetter").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({behavior:"smooth"});
  hearts(8);
});

document.getElementById("lastButton").addEventListener("click", function(){
  document.getElementById("lastReveal").classList.add("show");
  this.textContent = "A little piece of my heart, forever ♡";
  hearts(28);
});

document.getElementById("songSearch").href = YOUTUBE_SEARCH_URL;
if (YOUTUBE_VIDEO_ID.trim()) {
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(YOUTUBE_VIDEO_ID)}?playsinline=1`;
  frame.title = "Alfaaz — our song";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  document.getElementById("musicEmbed").appendChild(frame);
  document.querySelector(".music-help").textContent = "Tap play when you're ready to listen ♡";
}

function hearts(count){
  const layer = document.getElementById("heartLayer");
  const symbols = ["♡","♥","✧","✦"];
  for(let i=0;i<count;i++){
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left = Math.random()*100+"%";
    el.style.fontSize = (12+Math.random()*24)+"px";
    el.style.animationDuration = (3+Math.random()*3)+"s";
    el.style.animationDelay = Math.random()*.5+"s";
    layer.appendChild(el);
    setTimeout(()=>el.remove(),7000);
  }
}

// Reveal cards gently as they enter view.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".wish,.photo-card,.polaroid,.letter,.story-letter").forEach(el=>{
  el.style.opacity="0";
  el.style.transform += " translateY(18px)";
  el.style.transition="opacity .7s ease, transform .7s ease";
  observer.observe(el);
});
const revealStyle=document.createElement("style");
revealStyle.textContent=".visible{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(revealStyle);
