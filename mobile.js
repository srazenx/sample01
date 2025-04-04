let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holding = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = Math.random() * 20 - 10;

    this.init();
  }

  init() {
    this.paper.style.transform = `rotate(${this.rotation}deg)`;

    this.paper.addEventListener("touchstart", (e) => {
      this.holding = true;
      this.startX = e.touches[0].clientX - this.offsetX;
      this.startY = e.touches[0].clientY - this.offsetY;

      this.paper.style.zIndex = highestZ++;
    });

    this.paper.addEventListener("touchmove", (e) => {
      if (!this.holding) return;

      this.offsetX = e.touches[0].clientX - this.startX;
      this.offsetY = e.touches[0].clientY - this.startY;

      this.paper.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${this.rotation}deg)`;
    });

    this.paper.addEventListener("touchend", () => {
      this.holding = false;
    });

    // Prevent scrolling while dragging
    this.paper.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });
  }
}

// Initialize all papers
document.querySelectorAll(".paper").forEach((el) => new Paper(el));
