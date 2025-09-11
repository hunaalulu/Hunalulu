// فلترة المنتجات حسب المقاس
function filterProducts(size) {
  const products = document.querySelectorAll('.product-card');
  const tabs = document.querySelectorAll('.tab');

  // تحديث التبويبات
  tabs.forEach(tab => tab.classList.remove('active'));
  // بعض المتصفحات تسمح بـ event، إن لم يوجد نحدد الزر بالـ size
  if (typeof event !== 'undefined' && event.target) {
    event.target.classList.add('active');
  } else {
    const btn = Array.from(tabs).find(b => b.textContent.trim().toUpperCase() === size.toUpperCase() || (size==='all' && b.textContent.trim().toLowerCase()==='all'));
    if (btn) btn.classList.add('active');
  }

  // إظهار/إخفاء البطاقات
  products.forEach(card => {
    const sizes = (card.getAttribute('data-size') || '').toUpperCase();
    const show = (size === 'all') || sizes.includes(size.toUpperCase());
    card.style.display = show ? 'block' : 'none';
  });
}

// زر Order Now → يفتح واتساب برسالة فيها اسم المنتج + المقاس المختار + السعر (إن وُجد)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.order-btn');
  if (!btn) return;

  e.preventDefault();

  const phone = '971504654412'; // رقم الواتساب بدون + ومسافات
  const card  = btn.closest('.product-card');
  const name  = card.querySelector('.title')?.textContent.trim() || 'Item';
  const price = card.querySelector('.price')?.textContent.replace(/[^\d]/g, '') || '';
  const activeTab = document.querySelector('.tab.active');
  const size = activeTab ? activeTab.textContent.trim() : 'All';

  const sizeText = (size.toLowerCase() === 'all' || size === 'الكل') ? 'Any size' : `Size ${size}`;
  const msg = encodeURIComponent(`Order ${name} - ${sizeText}${price ? ` - AED ${price}` : ''}`);
  const url = `https://wa.me/${phone}?text=${msg}`;

  window.open(url, '_blank', 'noopener');
});
