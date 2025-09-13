/*************** الإعدادات العامة ***************/
const WHATSAPP_NUMBER = "971000000000"; // ← عدّليه لاحقاً لما يجهز رقمك (بدون +)
const BRAND_NAME = "hunalulu";

/*************** قائمة المنتجات ***************/
/* ملاحظة: بدّلي image بأسماء ملفات صورك داخل images/
   تقدري تزيدي/تنقصي عناصر من المصفوفة بحرّية. */
const PRODUCTS = [
  {
    id: "blue-onepiece",
    title: "Blue One-Piece Swimsuit",
    image: "images/blue-onepiece.jpg",
    priceAED: 249,
    sizes: ["S","M","L"]
  },
  {
    id: "cotton-candy",
    title: "Cotton Candy One-Piece",
    image: "images/cotton-candy.jpg",
    priceAED: 230,
    sizes: ["S"]
  },
  {
    id: "black-neon-dress",
    title: "Neon Trim Swim Dress",
    image: "images/black-neon-dress.jpg", // الصورة السوداء بحواف نيون
    priceAED: 259,
    sizes: ["M","L","XL","2XL"]
  },
  {
    id: "tropical-cutout",
    title: "Tropical Cutout Suit",
    image: "images/tropical-cutout.jpg",
    priceAED: 299,
    sizes: ["S","M"]
  },
  {
    id: "emerald-ruched",
    title: "Emerald Ruched One-Piece",
    image: "images/emerald-ruched.jpg",
    priceAED: 240,
    sizes: ["M","L"]
  },
  {
    id: "red-classic",
    title: "Red Classic Swimsuit",
    image: "images/red-classic.jpg",
    priceAED: 249,
    sizes: ["S","M","L","XL"]
  },
  {
    id: "leopard-halter",
    title: "Leopard Halter",
    image: "images/leopard-halter.jpg",
    priceAED: 259,
    sizes: ["M","L"]
  },
  {
    id: "tummy-control",
    title: "Tummy Control Swim Dress",
    image: "images/tummy-control.jpg",
    priceAED: 299,
    sizes: ["L","XL","2XL"]
  }
];

/*************** تبويبات المقاسات ***************/
const SIZE_ORDER = ["الكل","S","M","L","XL","2XL"];
const sizeTabsEl = document.getElementById("sizeTabs");
const gridEl = document.getElementById("productsGrid");

function countBySize() {
  const counts = { "الكل": PRODUCTS.length };
  ["S","M","L","XL","2XL"].forEach(sz=>{
    counts[sz] = PRODUCTS.filter(p => p.sizes.includes(sz)).length;
  });
  return counts;
}

function renderTabs(active="الكل"){
  const counts = countBySize();
  sizeTabsEl.innerHTML = "";
  SIZE_ORDER.forEach(sz=>{
    const btn = document.createElement("button");
    btn.className = "size-btn" + (sz===active ? " active" : "");
    btn.dataset.size = sz;
    btn.innerHTML = `${sz} <span class="count">(${counts[sz] ?? 0})</span>`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid(sz);
      updateCounts(); // يحافظ على العدّادات محدثة
    });
    sizeTabsEl.appendChild(btn);
  });
}

function updateCounts(){
  const counts = countBySize();
  document.querySelectorAll(".size-btn").forEach(b=>{
    const sz = b.dataset.size;
    const c = b.querySelector(".count");
    if (c && counts[sz] !== undefined) c.textContent = `(${counts[sz]})`;
  });
}

/*************** الشبكة + زر Order Now ***************/
function renderGrid(filterSize="الكل"){
  const list = filterSize==="الكل"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.sizes.includes(filterSize));

  gridEl.innerHTML = list.map(p => {
    const message = encodeURIComponent(
      `Hello ${BRAND_NAME}! I want to order: ${p.title}`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    return `
      <article class="card">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <h3>${p.title}</h3>
        <div class="meta">Available: ${p.sizes.join(", ")}</div>
        <div class="price">AED ${p.priceAED}</div>
        <a href="${waLink}" target="_blank" rel="noopener" class="order-btn">Order Now</a>
      </article>
    `;
  }).join("");
}

/*************** تشغيل ***************/
renderTabs("الكل");
renderGrid("الكل");
