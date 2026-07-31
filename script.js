// ---- envelope open ----
const sealBtn = document.getElementById('sealBtn');
const envelope = document.getElementById('envelope');
const content = document.getElementById('content');
const stage = document.getElementById('stage');
const promptText = document.getElementById('promptText');

const backToEnvelopeBtn = document.getElementById('backToEnvelopeBtn');

sealBtn.addEventListener('click', () => {
  if (sealBtn.classList.contains('glow')) return;
  sealBtn.classList.add('glow');
  promptText.style.transition = 'opacity .4s ease';
  promptText.style.opacity = '0';
  setTimeout(() => { promptText.classList.add('stage-hide'); }, 400);
  setTimeout(() => {
    envelope.classList.add('open');
  }, 500);
  setTimeout(() => {
    stage.classList.add('fade-out');
    content.classList.add('show');
  }, 2700);
  setTimeout(() => {
    stage.style.display = 'none';
    window.scrollTo({top:0, behavior:'smooth'});
    backToEnvelopeBtn.classList.add('show');
  }, 3250);
});

backToEnvelopeBtn.addEventListener('click', () => {
  backToEnvelopeBtn.classList.remove('show');
  window.scrollTo({top:0, behavior:'smooth'});
  content.classList.remove('show');
  stage.style.display = 'flex';
  void stage.offsetWidth; // force reflow so fade-out removal transitions in
  stage.classList.remove('fade-out');
  envelope.classList.remove('open');
  sealBtn.classList.remove('glow');
  promptText.classList.remove('stage-hide');
  promptText.style.opacity = '1';
});

// ---- countdown ----
const target = new Date('2026-08-22T08:00:00+07:00').getTime();
function updateCountdown(){
  const now = Date.now();
  let diff = target - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff % 86400000 / 3600000);
  const mins = Math.floor(diff % 3600000 / 60000);
  const secs = Math.floor(diff % 60000 / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---- timeline ----
const timelineData = [
  ["07:00","Check-in"],
  ["08:00","Đón tiếp khách mời"],
  ["08:30","Khai mạc buổi lễ"],
  ["08:50","Phát biểu của lãnh đạo Nhà trường"],
  ["09:00","Phát biểu của Đại diện doanh nghiệp"],
  ["09:15","Giải lao"],
  ["09:25","Phát biểu của Sinh viên"],
  ["09:50","Nghi thức tri ân Phụ huynh"],
  ["09:55","Nghi thức trao bằng tốt nghiệp"],
  ["11:10","Nghi thức \u201cWalk of Honor\u201d & chụp ảnh lưu niệm"],
  ["12:00","Kết thúc chương trình"]
];

// ---- timeline với auto-tick theo giờ thực ----
const eventDateStr = "2026-08-22";

const tlEl = document.getElementById('timeline');
function renderTimeline(){
  tlEl.innerHTML = '';
  const now = Date.now();
  timelineData.forEach(([time,label]) => {
    const itemTime = new Date(`${eventDateStr}T${time}:00+07:00`).getTime();
    const isDone = now >= itemTime;
    const item = document.createElement('div');
    item.className = 't-item' + (isDone ? ' done' : '');
    item.innerHTML = `<div class="t-dot"></div><div class="t-time">${time}</div><div class="t-label">${label}</div>`;
    tlEl.appendChild(item);
  });
}
renderTimeline();
setInterval(renderTimeline, 60000);

// ---- guest list ----
// type: "normal" | "birthday" | "love"
// birthday: chỉ cần thiết khi type === "birthday" (vd "25/08") — hiện thêm dòng chúc mừng sinh nhật
const guests = [
  {
    name: "Ngọc Ánh",
    code: "110602",
    type: "love",
    message: "Cảm ơn em đã luôn ở bên anh trong suốt hành trình này."
  },
  {
    name: "Khánh Hà",
    code: "200905",
    type: "birthday",
    birthday: "20/09",
    message: "Cảm ơn Hà đã luôn động viên mình những lúc deadline dí, có Hà bên cạnh đúng là may mắn nhất năm học vừa rồi."
  },
  {
    name: "Lê Quân",
    code: "121205",
    type: "normal",
    message: "Cảm ơn"
  },
  {
    name: "Linh Kỳ",
    code: "150905",
    type: "birthday",
    birthday: "15/09",
    message: "Cảm ơn"
  },
  {
    name: "Khánh Xuân",
    code: "300405",
    type: "normal",
    message: "Cảm ơn"
  },
  {
    name: "Kiều Trang",
    code: "210205",
    type: "normal",
    message: "Cảm ơn"
  },
  {
    name: "Thúy Uyên",
    code: "040705",
    type: "birthday",
    birthday: "04/07",
    message: "Cảm ơn"
  },
  {
    name: "Thảo Vân",
    code: "181205",
    type: "normal",
    message: "Cảm ơn"
  },
  {
    name: "Thanh Ngân",
    code: "310705",
    type: "birthday",
    birthday: "31/07",
    message: "Cảm ơn"
  },
  {
    name: "Phúc Ngân",
    code: "000000",
    type: "normal",
    message: "Cảm ơn"
  },
];

// ---- avatar dùng chung cho vòng tròn lớn (luôn là ảnh của Đạt) ----
const AVATAR_HTML = `<img src="/assets/images/avatar.png" alt="Lý Đạt" class="invite-avatar-img" />`;

// ---- icon nhỏ theo từng loại thiệp (dùng cho invite-tag-logo) ----
const TAG_ICONS = {
  normal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke-linejoin="round"/>
      <path d="M6 10.5V16c0 1 2.7 3 6 3s6-2 6-3v-5.5" stroke-linejoin="round"/>
    </svg>`,
  birthday: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8">
      <path d="M4 21v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" stroke-linejoin="round"/>
      <path d="M4 21h16"/>
      <path d="M8 12V8M12 12V8M16 12V8" stroke-linecap="round"/>
      <path d="M8 8c0-1.2.6-1.8.9-2.6C9.2 4.6 8.8 3.8 8 3c.8.8 1.8 1 2.4 2 .5.9.4 1.8-.4 3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8c0-1.2.6-1.8.9-2.6.3-.8-.1-1.6-.9-2.4.8.8 1.8 1 2.4 2 .5.9.4 1.8-.4 3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 8c0-1.2.6-1.8.9-2.6.3-.8-.1-1.6-.9-2.4.8.8 1.8 1 2.4 2 .5.9.4 1.8-.4 3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  love: `<svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="0.5">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>`
};

const TAGS = {
  normal: (g) => "New chapter · New journey · New me 🎓",
  birthday: (g) => `Chúc mừng sinh nhật bạn iu vào ngày ${g.birthday ? g.birthday + ' ' : ''} chúc bạn iu có một ngày sinh nhật thật tuyệt vời nhá! 🎂🎓`,
  love: (g) => "Gửi cô gái xinh đẹp của anh · Cảm ơn em vì đã luôn là ánh sáng dịu dàng, rực rỡ nhất trong cuộc đời anh ✨"
};

const guestGrid = document.getElementById('guestGrid');
const lockOverlay = document.getElementById('lockOverlay');
const revealPanel = document.getElementById('revealPanel');
const inviteLock = document.getElementById('inviteLock');
const lockGuestName = document.getElementById('lockGuestName');
const modalGuestName = document.getElementById('modalGuestName');
const modalThanks = document.getElementById('modalThanks');
const codeInput = document.getElementById('codeInput');
const codeSubmit = document.getElementById('codeSubmit');
const codeError = document.getElementById('codeError');

const inviteCardFull = document.querySelector('.invite-card--full');
const invitePhoto = document.querySelector('.invite-photo');
const inviteTagLogo = document.querySelector('.invite-tag-logo');
const inviteTag = document.getElementById('inviteTagText');

let currentGuest = null;

function openLockFor(guest){
  currentGuest = guest;
  lockGuestName.textContent = guest.name;
  codeInput.value = '';
  codeError.classList.remove('show');
  lockOverlay.classList.add('show');
  setTimeout(() => codeInput.focus(), 300);
}

function applyGuestType(guest){
  const type = guest.type || 'normal';
  inviteCardFull.classList.remove('type-normal', 'type-birthday', 'type-love');
  inviteCardFull.classList.add('type-' + type);
  invitePhoto.innerHTML = AVATAR_HTML;
  inviteTagLogo.innerHTML = TAG_ICONS[type] || TAG_ICONS.normal;
  inviteTag.textContent = (TAGS[type] || TAGS.normal)(guest);
}

// ---- confetti / pháo hoa giấy khi mở thiệp thành công ----
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
const CONFETTI_COLORS = ['#e0752e', '#d1a84b', '#e8cd8a', '#1f5c9e', '#4c8c4a', '#c0392b', '#ffffff'];
let confettiParticles = [];
let confettiRAF = null;
let confettiStopAt = 0;

function resizeConfettiCanvas(){
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);

function spawnConfettiParticle(){
  const w = confettiCanvas.width;
  return {
    x: Math.random() * w,
    y: -20 - Math.random() * 200,
    size: 6 + Math.random() * 6,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2.2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 12,
    tilt: Math.random() * Math.PI * 2,
    tiltSpeed: 0.06 + Math.random() * 0.06,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  };
}

function drawConfettiParticle(p){
  confettiCtx.save();
  confettiCtx.translate(p.x, p.y);
  confettiCtx.rotate((p.rotation * Math.PI) / 180);
  confettiCtx.fillStyle = p.color;
  if (p.shape === 'rect'){
    confettiCtx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
  } else {
    confettiCtx.beginPath();
    confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    confettiCtx.fill();
  }
  confettiCtx.restore();
}

function confettiLoop(){
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  const now = Date.now();
  if (now < confettiStopAt && Math.random() < 0.9){
    confettiParticles.push(spawnConfettiParticle());
    confettiParticles.push(spawnConfettiParticle());
  }

  confettiParticles.forEach(p => {
    p.tilt += p.tiltSpeed;
    p.x += p.speedX + Math.sin(p.tilt) * 1.2;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    drawConfettiParticle(p);
  });

  confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height * 1);

  if (now < confettiStopAt || confettiParticles.length > 0){
    confettiRAF = requestAnimationFrame(confettiLoop);
  } else {
    confettiRAF = null;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

function launchConfetti(durationMs = 2600){
  if (!confettiCtx) return;
  resizeConfettiCanvas();
  confettiStopAt = Date.now() + durationMs;
  if (!confettiRAF){
    confettiRAF = requestAnimationFrame(confettiLoop);
  }
}

function tryUnlock(){
  if (!currentGuest) return;
  if (codeInput.value.trim() === currentGuest.code){
    modalGuestName.textContent = currentGuest.name;
    modalThanks.textContent = currentGuest.message;
    applyGuestType(currentGuest);
    lockOverlay.classList.remove('show');
    revealPanel.classList.add('show');
    launchConfetti(1500);
  } else {
    codeError.classList.add('show');
    inviteLock.classList.remove('shake');
    void inviteLock.offsetWidth;
    inviteLock.classList.add('shake');
  }
}

guests.forEach(guest => {
  const chip = document.createElement('button');
  chip.className = 'guest-chip';
  chip.textContent = guest.name;
  chip.addEventListener('click', () => openLockFor(guest));
  guestGrid.appendChild(chip);
});

codeSubmit.addEventListener('click', tryUnlock);
codeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock(); });

document.getElementById('closeLock').addEventListener('click', () => {
  lockOverlay.classList.remove('show');
});
lockOverlay.addEventListener('click', (e) => {
  if (e.target === lockOverlay) lockOverlay.classList.remove('show');
});
document.getElementById('closeReveal').addEventListener('click', () => {
  revealPanel.classList.remove('show');
});

// ---- map toggle ----
const mapToggleBtn = document.getElementById('mapToggleBtn');
const mapToggleText = document.getElementById('mapToggleText');
const mapPanel = document.getElementById('mapPanel');
const mapIframe = document.getElementById('mapIframe');

const MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.792105830862!2d106.6822502!3d11.054207699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cfd677c789d1%3A0x2c2177908d83fb67!2sB%C3%ACnh%20D%C6%B0%C6%A1ng%20Convention%20%26%20Exhibition%20Center!5e0!3m2!1sen!2s!4v1785469279317!5m2!1sen!2s";

let mapLoaded = false;
mapToggleBtn.addEventListener('click', () => {
  const isOpen = mapPanel.classList.toggle('open');
  mapToggleBtn.classList.toggle('open', isOpen);
  mapToggleText.textContent = isOpen ? 'Ẩn bản đồ' : 'Xem bản đồ';
  if (isOpen && !mapLoaded){
    mapIframe.src = MAP_EMBED_SRC;
    mapLoaded = true;
  }
});