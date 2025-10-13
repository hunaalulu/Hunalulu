<script>
// 1) كل أسماء الملفات (مثل عندك)
const imageFiles = [
  "garden.jpeg","greenforest.jpeg","junglebloom.jpeg","laguna.jpeg","lattelove.jpeg","lavenderbliss.jpeg",
  "lunara.jpeg","midnightwave.jpeg","naughty.jpeg","navyglow.jpeg","neonnight.jpeg","noir.jpeg",
  "oceanpreeze.jpeg","olivetree.jpeg","pinkypromise.jpeg","rainbowwave.jpeg","red.jpeg","royal.jpeg",
  "royalbee.jpeg","ruby.jpeg","sandyglow.jpeg","santorini.jpeg","scarlet.jpeg","seamist.jpeg",
  "shadowluxe.jpeg","summerglow.jpeg","sunkissed.jpeg","twilight.jpeg","veloura.jpeg","vivaflora.jpeg","winkwink.jpeg",
  "alohA.jpeg","blackbeaty.jpeg","blackneon.jpeg","bluelake.jpeg","bluemotion.jpeg","boyshort.jpeg",
  "chesschicL.jpeg","classicdiva.jpeg","eleganttwist.jpeg","flamingo.jpeg","flora.jpeg","freedom.jpeg","Sky.jpeg"
];

// 2) دالة تنظيف العنوان من الامتداد وغيره (لو حابة)
const cleanFile = f => f
  .replace(/\.(jpe?g|png)$/i, '')
  .trim();

// 3) دالة توليد عنوان مرتّب Capital ومسافات صح

// 4) بناء بطاقة المنتج
function productCard(file) {
  const src = `images/${file}`;
  const title = prettyTitle(file);
  return `
    <div class="product" data-size="all">
      <div class="img-box">
        <img src="${src}" alt="${title}" loading="lazy" />
      </div>
      <h3 class="product-name">${title}</h3>
      <p class="sizes">Available: S, M, L</p>
      <p class="desc">Elegant one-piece swimsuit with sleek lines and tummy-control fit.</p>
      <p class="price">AED 250</p>
      <a class="order-btn" href="https://wa.me/971000000000">Order Now</a>
    </div>
  `;
// ====== تصحيح وتجميل أسماء المنتجات تلقائيًا ======
function prettyTitle(file) {
  // حذف الامتداد (jpeg, png ...)
  const base = file
    .replace(/\.(jpe?g|png)$/i, '')
    .replace(/[-_]+/g, ' ') // حوّل "-" و "_" لمسافات
    .replace(/([a-z])([A-Z])/g, '$1 $2') // فكّ CamelCase مثل "OceanPreeze"
    .replace(/([a-z]+)(?=[A-Z])/g, '$1 ') // أضف مسافة قبل الأحرف الكبيرة
    .replace(/\s+/g, ' ') // إزالة المسافات الزائدة
    .trim();

  // تحويل أول حرف من كل كلمة إلى كبير (Capital)
  return base
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');


// 5) ضخّ البطاقات في الشبكة
const grid = document.getElementById('grid');
grid.innerHTML = imageFiles.map(productCard).join('');

// 6) (اختياري) تشوفي التحويل صح؟
console.log('Preview titles:', imageFiles.map(f => [f, prettyTitle(f)]));
</script>
