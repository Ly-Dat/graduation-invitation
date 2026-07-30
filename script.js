// ---- envelope open ----
const sealBtn = document.getElementById('sealBtn');
const envelope = document.getElementById('envelope');
const content = document.getElementById('content');
const stage = document.getElementById('stage');
const promptText = document.getElementById('promptText');

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
  }, 1300);
  setTimeout(() => {
    stage.style.display = 'none';
    window.scrollTo({top:0, behavior:'smooth'});
  }, 1850);
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
const tlEl = document.getElementById('timeline');
timelineData.forEach(([time,label]) => {
  const item = document.createElement('div');
  item.className = 't-item';
  item.innerHTML = `<div class="t-dot"></div><div class="t-time">${time}</div><div class="t-label">${label}</div>`;
  tlEl.appendChild(item);
});

// ---- guest list ----
const guests = ["Khánh Hà", "Lê Quân"];
const guestGrid = document.getElementById('guestGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalGuestName = document.getElementById('modalGuestName');

guests.forEach(name => {
  const chip = document.createElement('button');
  chip.className = 'guest-chip';
  chip.textContent = name;
  chip.addEventListener('click', () => {
    modalGuestName.textContent = name;
    modalOverlay.classList.add('show');
  });
  guestGrid.appendChild(chip);
});

document.getElementById('closeModal').addEventListener('click', () => {
  modalOverlay.classList.remove('show');
});
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('show');
});