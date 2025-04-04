let highestZ = 1;
let currentTop = 0;
const papers = Array.from(document.querySelectorAll('.paper'));
const totalPapers = papers.length;

class Paper {
  constructor(paper, index) {
    this.paper = paper;
    this.index = index;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;

    this.init();
  }

  init() {
    this.paper.style.zIndex = highestZ;
    highestZ++;

    this.paper.addEventListener('touchstart', (e) => {
      if (this.index !== currentTop) return;
      this.holdingPaper = true;

      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    this.paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper || this.index !== currentTop) return;

      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;

      this.velX = touchMoveX - this.prevTouchX;
      this.velY = touchMoveY - this.prevTouchY;
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevTouchX = touchMoveX;
      this.prevTouchY = touchMoveY;

      this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    this.paper.addEventListener('touchend', () => {
      if (!this.holdingPaper || this.index !== currentTop) return;
      this.holdingPaper = false;

      if (Math.abs(this.currentPaperX) > window.innerWidth * 0.3 || Math.abs(this.currentPaperY) > window.innerHeight * 0.3) {
        this.paper.style.transition = 'transform 0.3s ease-out';
        this.paper.style.transform += ` translateX(${this.velX * 10}px) translateY(${this.velY * 10}px)`;
        setTimeout(() => {
          this.paper.style.display = 'none';
          currentTop++;
          if (currentTop === totalPapers) {
            launchConfetti();
          }
        }, 300);
      } else {
        this.resetPosition();
      }
    });
  }

  resetPosition() {
    this.paper.style.transition = 'transform 0.3s ease';
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.paper.style.transform = `translateX(0px) translateY(0px) rotateZ(${this.rotation}deg)`;
    setTimeout(() => {
      this.paper.style.transition = '';
    }, 300);
  }
}

papers.reverse().forEach((paper, index) => {
  new Paper(paper, index);
});

// Confetti logic
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

// ConfettiGenerator CDN script loader
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js";
document.body.appendChild(script);
