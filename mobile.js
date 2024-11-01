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
  rotating = false;

  init(paper) {
    // Prevent default scrolling behavior on touchmove
    paper.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;

      // Calculate velocity for smooth dragging
      this.velX = touchMoveX - this.prevTouchX;
      this.velY = touchMoveY - this.prevTouchY;
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      // Update previous touch coordinates
      this.prevTouchX = touchMoveX;
      this.prevTouchY = touchMoveY;

      // Apply transform to paper element
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Initialize the papers for touch events on mobile
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
