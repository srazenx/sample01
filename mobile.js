let highestZ = 1;
let papers = Array.from(document.querySelectorAll('.paper')).reverse();
let removedCount = 0;

class Paper {
  constructor(el, index) {
    this.el = el;
    this.index = index;
    this.holding = false;
    this.offset = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.el.style.zIndex = highestZ++;
    this.el.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg)`;

    this.el.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
    this.el.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
    this.el.addEventListener('touchend', this.touchEnd.bind(this));
  }

  touchStart(e) {
    e.preventDefault();
    if (papers[papers.length - 1] !== this.el) return;

    this.holding = true;
    const touch = e.touches[0];
    this.offset.x = touch.clientX - this.pos.x;
    this.offset.y = touch.clientY - this.pos.y;
    this.el.style.transition = 'none';
  }

  touchMove(e) {
    if (!this.holding) return;
    const touch = e.touches[0];
    this.pos.x = touch.clientX - this.offset.x;
    this.pos.y = touch.clientY - this.offset.y;

    this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) rotate(5deg)`;
  }

  touchEnd() {
    if (!this.holding) return;
    this.holding = false;

    const distance = Math.sqrt(this.pos.x * this.pos.x + this.pos.y * this.pos.y);
    if (distance > 150) {
      this.el.style.transition = '0.3s ease-out';
      this.el.style.transform += ' scale(0)';
      setTimeout(() => {
        this.el.remove();
        papers.pop();
        removedCount++;

        if (papers.length === 0) {
          launchConfetti();
        }
      }, 300);
    } else {
      this.el.style.transition = '0.3s ease';
      this.el.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg)`;
      this.pos = { x: 0, y: 0 };
    }
  }
}

// Initialize papers
papers.forEach((el, i) => new Paper(el, i));

// Confetti
function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  const canvas = document.getElementById('confetti-canvas');
  const confetti = window.confetti.create(canvas, { resize: true });

  (function frame() {
    confetti({ particleCount: 4, spread: 60 });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
