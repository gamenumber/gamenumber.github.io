document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
     1️⃣ 히어로 텍스트 타이핑
     ========================== */
  const heroText = document.querySelector(".hero-content h2");
  const heroStr = heroText.textContent;
  heroText.textContent = "";
  let index = 0;

  // 히어로 카드가 항상 위에 오도록
  const heroCard = document.querySelector(".hero-content");
  if (heroCard) {
    heroCard.style.position = "relative"; // z-index가 먹히려면 position 필요
    heroCard.style.zIndex = "10"; // 충분히 큰 값
  }

  function typeHero() {
    if (index < heroStr.length) {
      heroText.textContent += heroStr.charAt(index);
      index++;
      setTimeout(typeHero, 100); // 글자 나타나는 속도
    }
  }
  typeHero();

  /* ==========================
     2️⃣ 갤러리 자동 슬라이드 (페이드)
     ========================== */
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  let currentIndex = 0;

  // 초기 세팅: 첫번째 이미지만 보여주기
  galleryImages.forEach((img, i) => {
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.opacity = i === 0 ? "1" : "0";
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

      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  setInterval(fadeGallery, 3000); // 3초마다 슬라이드

  /* ==========================
     3️⃣ 버튼 펄스 애니메이션
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
     4️⃣ 갤러리 h2 제거 (원하는대로)
     ========================== 
  const galleryTitle = document.querySelector(".gallery h2");
  if (galleryTitle) galleryTitle.remove();*/
});

document.addEventListener("DOMContentLoaded", () => {
  const iconsCount = 10; // 아이콘 갯수
  const icons = ["🪵", "🔨", "📏", "🪚", "🖌️"]; // 공예 아이콘 배열

  for (let i = 0; i < iconsCount; i++) {
    const icon = document.createElement("div");
    icon.textContent = icons[Math.floor(Math.random() * icons.length)]; // 랜덤 선택
    icon.style.position = "fixed";
    icon.style.fontSize = `${Math.random() * 20 + 20}px`; // 20~40px
    icon.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
    icon.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
    icon.style.pointerEvents = "none";
    icon.style.zIndex = "5";
    document.body.appendChild(icon);

    // 이동 속도 랜덤
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    function animate() {
      let x = parseFloat(icon.style.left);
      let y = parseFloat(icon.style.top);

      x += dx;
      y += dy;

      // 화면 경계에서 반사
      if (x < 0 || x > window.innerWidth - 40) dx *= -1;
      if (y < 0 || y > window.innerHeight - 40) dy *= -1;

      icon.style.left = x + "px";
      icon.style.top = y + "px";

      requestAnimationFrame(animate);
    }
    animate();
  }
});
