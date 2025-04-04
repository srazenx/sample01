let current = 6;

function enableTopPaper() {
  const topPaper = document.querySelector(`.paper[data-order="${current}"]`);
  if (!topPaper) return;

  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  topPaper.addEventListener("touchstart", (e) => {
    dragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  topPaper.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    offsetX = e.touches[0].clientX - startX;
    offsetY = e.touches[0].clientY - startY;
    topPaper.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  });

  topPaper.addEventListener("touchend", () => {
    dragging = false;

    const dist = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    if (dist > 100) {
      topPaper.style.opacity = 0;
      setTimeout(() => {
        topPaper.style.display = "none";
        current -= 1;
        const nextPaper = document.querySelector(`.paper[data-order="${current}"]`);
        if (nextPaper) {
          nextPaper.style.opacity = 1;
          nextPaper.style.zIndex = current;
          enableTopPaper();
        }
      }, 300);
    } else {
      topPaper.style.transform = "translate(-50%, -50%)";
    }
  });
}

enableTopPaper();
