let highestZ = 1;
let removedCount = 0;
const totalPapers = document.querySelectorAll('.paper').length;

class Paper {
  constructor(paperElement) {
    this.paper = paperElement;
    this.init();
  }

  init() {
    this.paper.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
    this.paper.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });
    this.paper.addEventListener('touchend', () => this.endDrag());

    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = 0;
    this.startY = 0;
    this.dragging = false;

    // Stack in correct order
    this.paper.style.zIndex = highestZ;
    highestZ++;
  }

  startDrag(e) {
    e.preventDefault();
    this.dragging = true;
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }

  onDrag(e) {
    if (!this.dragging) return;

    const x = e.touches[0].clientX - this.startX + this.offsetX;
    const y = e.touches[0].clientY - this.startY + this.offsetY;

    this.paper.style.transform = `translate(${x}px, ${y}px) rotateZ(-3deg)`;

    this.currentX = x;
    this.currentY = y;
  }

  endDrag() {
    this.dragging = false;

    const movedFarEnough = Math.abs(this.currentX) > 100 || Math.abs(this.currentY) > 100;
    if (movedFarEnough) {
      this.paper.style.transition = 'transform 0.5s ease-out, opacity 0.5s';
      this.paper.style.opacity = '0';
      this.paper.style.transform = `translate(${this.currentX * 3}px, ${this.currentY * 3}px) rotateZ(30deg)`;

      setTimeout(() => {
        this.paper.remove();
        removedCount++;

        if (removedCount === totalPapers) {
          confettiExplosion();
        }
      }, 500);
    } else {
      this.paper.style.transform = `translate(0px, 0px) rotateZ(-3deg)`;
    }
  }
}

// Apply to all papers
document.querySelectorAll('.paper').forEach(p => new Paper(p));

function confettiExplosion() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}
