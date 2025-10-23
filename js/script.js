document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
     1️⃣ 히어로 텍스트 타이핑
     ========================== */
  const heroText = document.querySelector(".hero-content h2");
  const heroStr = heroText.textContent;
  heroText.textContent = "";
  let index = 0;

  function typeHero() {
    if (index < heroStr.length) {
      heroText.textContent += heroStr.charAt(index);
      index++;
      setTimeout(typeHero, 100); // 글자 속도
    }
  }
  typeHero();

  /* ==========================
     2️⃣ 히어로 카드 튕김 / 흔들림
     ========================== */
  const heroCard = document.querySelector(".hero-content");
  if (heroCard) {
    heroCard.style.position = "relative";
    heroCard.style.zIndex = "10";

    let direction = 1;
    let offset = 0;

    function heroBounce() {
      offset += 0.2 * direction;
      if (offset > 5 || offset < -5) direction *= -1;
      heroCard.style.transform = `translateY(${offset}px)`;
      requestAnimationFrame(heroBounce);
    }
    heroBounce();
  }

  /* ==========================
     3️⃣ 버튼 펄스
     ========================== */
  const buttons = document.querySelectorAll(".btn-main, .btn-book, .btn");

  buttons.forEach((btn) => {
    let scale = 1;
    let growing = true;

    function pulse() {
      scale += growing ? 0.005 : -0.005;
      if (scale >= 1.1) growing = false;
      if (scale <= 1) growing = true;
      btn.style.transform = `scale(${scale})`;
      requestAnimationFrame(pulse);
    }
    pulse();
  });

  /* ==========================
     4️⃣ 갤러리 자동 슬라이드 + 회전
     ========================== */
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  let currentIndex = 0;

  galleryImages.forEach((img, i) => {
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = i === 0 ? "1" : "0";
    img.style.zIndex = "0";
  });

  function fadeGallery() {
    const prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % galleryImages.length;

    let opacity = 0;
    const duration = 1000;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      galleryImages[prevIndex].style.opacity = 1 - progress;
      galleryImages[currentIndex].style.opacity = progress;
      galleryImages[currentIndex].style.transform = `rotate(${
        progress * 5
      }deg)`;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  setInterval(fadeGallery, 3000);

  /* ==========================
     5️⃣ 떠다니는 공예 아이콘 + 반짝임
     ========================== */
  const iconsCount = 10;
  const iconsList = ["🪵", "🔨", "📏", "🪚", "🖌️"];

  for (let i = 0; i < iconsCount; i++) {
    const icon = document.createElement("div");
    icon.textContent = iconsList[Math.floor(Math.random() * iconsList.length)];
    icon.style.position = "fixed";
    icon.style.fontSize = `${Math.random() * 20 + 20}px`;
    icon.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
    icon.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
    icon.style.pointerEvents = "none";
    icon.style.zIndex = "5";
    document.body.appendChild(icon);

    // 기본 이동
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    function move() {
      let x = parseFloat(icon.style.left);
      let y = parseFloat(icon.style.top);
      x += dx;
      y += dy;
      if (x < 0 || x > window.innerWidth - 40) dx *= -1;
      if (y < 0 || y > window.innerHeight - 40) dy *= -1;
      icon.style.left = x + "px";
      icon.style.top = y + "px";
      requestAnimationFrame(move);
    }
    move();

    // 반짝임 + 살짝 크기 변화
    (function twinkle(icon) {
      let opacity = Math.random() * 0.5 + 0.5;
      let opacityDir = Math.random() > 0.5 ? 0.02 : -0.02;
      let scale = 1;
      let scaleDir = 0.005;

      function animate() {
        opacity += opacityDir;
        if (opacity >= 1 || opacity <= 0.3) opacityDir *= -1;

        scale += scaleDir;
        if (scale > 1.2 || scale < 0.8) scaleDir *= -1;

        icon.style.opacity = opacity;
        icon.style.transform = `scale(${scale})`;

        requestAnimationFrame(animate);
      }
      animate();
    })(icon);
  }

  /* ==========================
     6️⃣ 갤러리 h2 제거
     ========================== */
  const galleryTitle = document.querySelector(".gallery h2");
  if (galleryTitle) galleryTitle.remove();
});
