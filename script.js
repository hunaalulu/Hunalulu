// فلترة المنتجات حسب المقاس
function filterProducts(size) {
  const products = document.querySelectorAll('.product-card');
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => tab.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }

  products.forEach(product => {
    const sizes = product.getAttribute('data-size').split(' ');
    if (size === 'all' || sizes.includes(size)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// زر Order Now → يرسل رسالة واتساب فيها تفاصيل المنتج
document.addEventListener('click', e => {
  const btn = e.target.closest('.order-btn');
  if (!btn) return;

  e.preventDefault();

  const card = btn.closest('.product-card');
  const title = card.querySelector('.title').textContent.trim();
  const price = card.querySelector('.price').textContent.trim();
  const activeTab = document.querySelector('.tab.active').textContent.trim();

  const size = activeTab === 'All' ? 'Any size' : `Size ${activeTab}`;
  const message = encodeURIComponent(`Order: ${title} - ${size} - ${price}`);
  const phone = '971504654412'; // رقم الواتساب

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
});
