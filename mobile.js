let highestZ = 10;
let currentIndex = 0;
const papers = Array.from(document.querySelectorAll('.paper')).reverse();

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  document.body.appendChild(canvas);
  const confetti = new ConfettiGenerator({ target: 'confetti-canvas' });
  confetti.render();
  setTimeout(() => {
    confetti.clear();
    canvas.remove();
  }, 5000);
}

function initPaper(paper, index) {
  let startX, startY, currentX = 0, currentY = 0, isDragging = false;

  paper.style.zIndex = highestZ++;

  paper.addEventListener('touchstart', (e) => {
    if (index !== currentIndex) return;

    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    paper.style.transition = 'none';
  });

  paper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    currentX = dx;
    currentY = dy;

    paper.style.transform = `translate(${dx}px, ${dy}px) rotateZ(${dx * 0.05}deg)`;
  });

  paper.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;

    const distance = Math.hypot(currentX, currentY);
    if (distance > 100) {
      paper.style.transition = 'transform 0.3s ease-out';
      paper.style.transform = `translate(${currentX * 4}px, ${currentY * 4}px) rotateZ(${currentX * 0.1}deg)`;

      setTimeout(() => {
        paper.style.display = 'none
