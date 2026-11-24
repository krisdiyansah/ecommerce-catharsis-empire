/* =========================================================
   CATHARSIS EMPIRE — script.js
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     0. CONFIG — links & catalog
  --------------------------------------------------------- */
  const STORE_URL = "https://catharsisempire.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJmZGlkFlDBW9p2xGqFnOV_BbFOHBXot3Toj01leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadB_dbyVaeqpxqsvJGMB8Zi_lNFsr49FL-3zHTDxv6p2rEXYOR5MdWYstSJug_aem_9Q117F6S3t5njcQtmwiM1g";
  const WA_NUMBER = "6287722588201"; // 0877-2258-8201 in international format
  const PRICE_LABEL = "Rp 666.666";

  const PRODUCTS = [
    {
      id: 1, img: "product1.png",
      name_id: "666 Empire Jersey", name_en: "666 Empire Jersey",
      desc_id: "Jersey ritual dengan angka 666 bergaya blackletter di punggung, dikelilingi sigil tersembunyi.",
      desc_en: "Ritual jersey with a blackletter 666 numeral on the back, wrapped in hidden sigils."
    },
    {
      id: 2, img: "product2.png",
      name_id: "Catharsis Sigil Patch", name_en: "Catharsis Sigil Patch",
      desc_id: "Patch bordir logo Catharsis, siap dijahit di jaket atau tas ritualmu.",
      desc_en: "Embroidered Catharsis wordmark patch, ready to be sewn onto your ritual jacket or bag."
    },
    {
      id: 3, img: "product3.png",
      name_id: "Ravenbound Tee", name_en: "Ravenbound Tee",
      desc_id: "Kaos dengan ilustrasi gagak terikat di punggung — simbol firasat dan kematian.",
      desc_en: "Tee featuring a bound raven print on the back — an omen of death and fate."
    },
    {
      id: 4, img: "product4.png",
      name_id: "Thorncrowned Tee", name_en: "Thorncrowned Tee",
      desc_id: "Kaos dengan sosok bertanduk memanah dari kegelapan, dikelilingi segitiga sigil.",
      desc_en: "Tee depicting an antlered figure drawing an arrow from the dark, framed by a sigil triangle."
    },
    {
      id: 5, img: "product5.png",
      name_id: "Ram Skull Hoodie", name_en: "Ram Skull Hoodie",
      desc_id: "Hoodie dengan tengkorak domba jantan menaungi tengkorak manusia — simbol pengorbanan.",
      desc_en: "Hoodie printed with a ram skull crowning a human skull — a symbol of sacrifice."
    },
    {
      id: 6, img: "productq.png",
      name_id: "Season of the Damned Hoodie", name_en: "Season of the Damned Hoodie",
      desc_id: "Hoodie edisi 'Season of the Damned' dengan cetakan tangan-tangan terkutuk di punggung dan lengan.",
      desc_en: "'Season of the Damned' edition hoodie with cursed hands printed across the back and sleeves."
    },
    {
      id: 7, img: "product7.png",
      name_id: "Shattered Marble Tee", name_en: "Shattered Marble Tee",
      desc_id: "Kaos dengan patung marmer pecah dalam bingkai segitiga — keindahan yang runtuh.",
      desc_en: "Tee featuring a shattered marble bust inside a triangle frame — beauty in ruin."
    },
    {
      id: 8, img: "product8.png",
      name_id: "Storm Sigil Hoodie", name_en: "Storm Sigil Hoodie",
      desc_id: "Hoodie dengan sigil badai dan petir menyambar di balik kegelapan malam.",
      desc_en: "Hoodie printed with a storm sigil, lightning striking through the night's dark."
    },
    {
      id: 9, img: "artikel9.png",
      name_id: "Throne of Ash Tee", name_en: "Throne of Ash Tee",
      desc_id: "Kaos dengan raja bertahta di atas reruntuhan, dikelilingi ukiran gothic 'Pillar of Ash'.",
      desc_en: "Tee depicting a king enthroned upon ruin, framed by gothic 'Pillar of Ash' engravings."
    }
  ];

  let currentLang = "id";

  /* ---------------------------------------------------------
     1. RENDER PRODUCT GRID
  --------------------------------------------------------- */
  const grid = document.getElementById("productGrid");

  function waLink(productName){
    const msg = currentLang === "id"
      ? `Halo Catharsis Empire, saya ingin memesan "${productName}" seharga ${PRICE_LABEL}.`
      : `Hello Catharsis Empire, I would like to order "${productName}" for ${PRICE_LABEL}.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function renderGrid(){
    grid.innerHTML = "";
    PRODUCTS.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "card";
      card.dataset.id = p.id;

      const num = String(i + 1).padStart(2, "0");
      const name = currentLang === "id" ? p.name_id : p.name_en;
      const desc = currentLang === "id" ? p.desc_id : p.desc_en;
      const ctaLabel = currentLang === "id" ? "Lihat Detail" : "View Detail";

      card.innerHTML = `
        <div class="card__imgwrap">
          <img class="card__img" src="${p.img}" alt="${name}" loading="lazy">
        </div>
        <div class="card__body">
          <span class="card__num">${num} / RITUAL</span>
          <h3 class="card__name">${name}</h3>
          <p class="card__desc">${desc}</p>
          <div class="card__row">
            <span class="price">${PRICE_LABEL}</span>
            <span class="card__cta">${ctaLabel} →</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(p));
      grid.appendChild(card);
    });

    observeCards();
  }

  /* ---------------------------------------------------------
     2. SCROLL REVEAL for cards
  --------------------------------------------------------- */
  function observeCards(){
    const cards = document.querySelectorAll(".card");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting){
          setTimeout(() => entry.target.classList.add("is-visible"), (idx % 6) * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => io.observe(c));
  }

  /* ---------------------------------------------------------
     3. MODAL
  --------------------------------------------------------- */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalName = document.getElementById("modalName");
  const modalDesc = document.getElementById("modalDesc");
  const modalStoreBtn = document.getElementById("modalStoreBtn");
  const modalWaBtn = document.getElementById("modalWaBtn");
  const modalClose = document.getElementById("modalClose");

  let lastProduct = null;

  function openModal(product){
    lastProduct = product;
    fillModal(product);
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function fillModal(product){
    const name = currentLang === "id" ? product.name_id : product.name_en;
    const desc = currentLang === "id" ? product.desc_id : product.desc_en;
    modalImg.src = product.img;
    modalImg.alt = name;
    modalName.textContent = name;
    modalDesc.textContent = desc;
    modalStoreBtn.href = STORE_URL;
    modalWaBtn.href = waLink(name);
  }

  function closeModal(){
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------------------------------------------------------
     4. LANGUAGE TOGGLE
  --------------------------------------------------------- */
  const langToggle = document.getElementById("langToggle");
  const langOpts = langToggle.querySelectorAll(".lang-toggle__opt");
  const translatable = document.querySelectorAll("[data-id][data-en]");

  function applyLang(lang){
    currentLang = lang;
    document.documentElement.lang = lang;

    translatable.forEach(el => {
      el.textContent = lang === "id" ? el.dataset.id : el.dataset.en;
    });

    langOpts.forEach(opt => {
      opt.classList.toggle("is-active", opt.dataset.lang === lang);
    });

    // re-render product grid + contact CTA links in the new language
    renderGrid();
    document.getElementById("ctaWhatsapp").href =
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        lang === "id"
          ? "Halo Catharsis Empire, saya ingin bertanya tentang koleksi kalian."
          : "Hello Catharsis Empire, I'd like to ask about your collection."
      )}`;

    if (modal.classList.contains("is-open") && lastProduct){
      fillModal(lastProduct);
    }
  }

  langToggle.addEventListener("click", () => {
    applyLang(currentLang === "id" ? "en" : "id");
  });

  /* ---------------------------------------------------------
     5. MOBILE NAV BURGER
  --------------------------------------------------------- */
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav__links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });

  /* ---------------------------------------------------------
     6. EMBER PARTICLES — ambient dark-metal atmosphere
  --------------------------------------------------------- */
  const canvas = document.getElementById("embers");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function makeParticle(){
    return {
      x: Math.random() * w,
      y: h + Math.random() * 100,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.6 + 0.15,
      drift: (Math.random() - 0.5) * 0.4,
      glow: Math.random() > 0.7 ? "rgba(179,64,42," : "rgba(201,162,39,",
      alpha: Math.random() * 0.5 + 0.15,
      flicker: Math.random() * 0.02 + 0.005
    };
  }

  const PARTICLE_COUNT = window.matchMedia("(max-width: 720px)").matches ? 26 : 55;
  for (let i = 0; i < PARTICLE_COUNT; i++){
    const p = makeParticle();
    p.y = Math.random() * h; // spread initial positions
    particles.push(p);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tick(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      p.alpha += (Math.random() - 0.5) * p.flicker;
      p.alpha = Math.max(0.05, Math.min(0.65, p.alpha));

      if (p.y < -20){
        p.y = h + 20;
        p.x = Math.random() * w;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.glow}${p.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.glow + "0.8)";
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(tick);
  }
  if (!reduceMotion) requestAnimationFrame(tick);
  else ctx.clearRect(0,0,w,h);

  /* ---------------------------------------------------------
     7. INIT
  --------------------------------------------------------- */
  applyLang("id");
})();
