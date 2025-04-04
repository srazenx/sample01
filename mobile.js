let highestZ = 10;
let removedPapers = 0;
const papers = Array.from(document.querySelectorAll(".paper"));
const totalPapers = papers.length;

papers.forEach((paper, index) => {
  let holding = false;
  let startX, startY, currentX = 0, currentY = 0;

  paper.style.zIndex = highestZ + index;

  paper.addEventListener("touchstart", (e) => {
    holding = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    paper.style.transition = "none";
  });

  paper.addEventListener("touchmove", (e) => {
    if (!holding) return;
    let dx = e.touches[0].clientX - startX;
    let dy = e.touches[0].clientY - startY;
    currentX += dx;
    currentY += dy;
    paper.style.transform = `translate(${currentX}px, ${currentY}px) rotateZ(-3deg)`;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  paper.addEventListener("touchend", () => {
    holding = false;
    // if moved far enough, remove paper
    if (Math.abs(currentX) > 100 || Math.abs(currentY) > 100) {
      paper.style.transition = "all 0.3s ease-out";
      paper.style.opacity = 0;
      paper.style.transform += " scale(1.2)";
      setTimeout(() => {
        paper.remove();
        removedPapers++;
        if (removedPapers === totalPapers) {
          launchConfetti();
        }
      }, 300);
    } else {
      paper.style.transition = "all 0.3s ease";
      paper.style.transform = "translate(-50%, -50%) rotateZ(-3deg)";
      currentX = 0;
      currentY = 0;
    }
  });
});

function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
