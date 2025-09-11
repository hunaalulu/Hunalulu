function filterProducts(size) {
  const products = document.querySelectorAll('.product-card');
  const tabs = document.querySelectorAll('.tab');

  // تحديث حالة التبويبات
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');

  // فلترة المنتجات حسب المقاس
  products.forEach(product => {
    if (size === 'all' || product.getAttribute('data-size').includes(size)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
