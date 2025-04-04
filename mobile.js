let highestZ = 1;

const papers = Array.from(document.querySelectorAll('.paper'))
  .sort((a, b) => +b.dataset.order - +a.dataset.order); // reverse order

papers.forEach((paper, index) => {
  if (index === 0) paper.setAttribute('data-visible', 'true');
  const p = new Paper();
  p.init(paper);
});

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 10 - 5;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      paper.style.transition = 'none';
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;
      const moveX = e.touches[0].clientX - this.startX;
      const moveY = e.touches[0].clientY - this.startY;
      this.currentX = moveX;
      this.currentY = moveY;
      paper.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', () => {
      if (!this.holdingPaper) return;
      this.holdingPaper = false;
      paper.style.transition = 'transform 0.3s ease';
      if (Math.abs(this.currentX) > 100 || Math.abs(this.currentY) > 100) {
        paper.remove();
        showNextPaper();
      } else {
        paper.style.transform = `translate(0, 0) rotate(${this.rotation}deg)`;
      }
    });
  }
}

function showNextPaper() {
  const remaining = document.querySelectorAll('.paper');
  if (remaining.length === 0) {
    fireConfetti();
    return;
  }

  const next = remaining[remaining.length - 1];
  next.setAttribute('data-visible', 'true');
}

function fireConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti(Object.assign({}, defaults, {
      particleCount: 50,
      origin: {
        x: randomInRange(0.1, 0.9),
        y: Math.random() - 0.2
      }
    }));
  }, 250);
}
