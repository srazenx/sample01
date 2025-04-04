let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  paper = null;

  init(paper) {
    this.paper = paper;

    // Add initial rotation
    paper.style.transform = `rotateZ(${this.rotation}deg)`;

    // Prevent scroll while dragging
    paper.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

    // Start dragging
    paper.addEventListener('touchstart', e => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      // Bring to front
      paper.style.zIndex = highestZ++;
      this.touchStartX = this.prevTouchX = e.touches[0].clientX;
      this.touchStartY = this.prevTouchY = e.touches[0].clientY;
    });

    // Drag move
    paper.addEventListener('touchmove', e => {
      if (!this.holdingPaper) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      this.velX = touchX - this.prevTouchX;
      this.velY = touchY - this.prevTouchY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevTouchX = touchX;
      this.prevTouchY = touchY;

      this.updateTransform();
    });

    // End dragging
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }

  updateTransform() {
    this.paper.style.transform = `
      translate(${this.currentPaperX}px, ${this.currentPaperY}px)
      rotateZ(${this.rotation}deg)
    `;
  }
}

// Initialize papers
document.querySelectorAll('.paper').forEach(paper => {
  new Paper().init(paper);
});
