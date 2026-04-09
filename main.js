// Products Data
const products = [
  { id: 1, name: 'Má Phanh Ceramic Carbon', category: 'Phanh & An Toàn', price: '4,500,000 ₫', image: 'images/brake.png' },
  { id: 2, name: 'Mâm Xe Hợp Kim Thể Thao', category: 'Mâm & Lốp', price: '12,000,000 ₫', image: 'images/rim.png' },
  { id: 3, name: 'Động Cơ V8 Performance', category: 'Động Cơ', price: 'Liên Hệ', image: 'images/engine.png' },
  { id: 4, name: 'Lọc Dầu Động Cơ Premium', category: 'Bôi Trơn', price: '450,000 ₫', image: 'images/oil_filter.png' },
  { id: 5, name: 'Bình Ắc Quy 12V Cao Cấp', category: 'Điện Động Cơ', price: '2,800,000 ₫', image: 'images/battery.png' },
  { id: 6, name: 'Bugi Đánh Lửa Iridium', category: 'Động Cơ', price: '850,000 ₫', image: 'images/spark_plug.png' },
  { id: 7, name: 'Đèn Pha Nguyên Cụm LED', category: 'Hệ Thống Đèn', price: '15,500,000 ₫', image: 'images/headlight.png' },
  { id: 8, name: 'Cần Gạt Mưa Silicone', category: 'Ngoại Thất', price: '600,000 ₫', image: 'images/wiper.png' },
  { id: 9, name: 'Giảm Xóc Coilover', category: 'Hệ Thống Treo', price: '8,900,000 ₫', image: 'images/shock_absorber.png' },
  { id: 10, name: 'Lọc Gió Động Cơ Thể Thao', category: 'Nạp Xả', price: '1,200,000 ₫', image: 'images/air_filter.png' },
  { id: 11, name: 'Vô Lăng Da Carbon', category: 'Nội Thất', price: '5,500,000 ₫', image: 'images/steering_wheel.png' },
  { id: 12, name: 'Gương Chiếu Hậu Có LED', category: 'Ngoại Thất', price: '3,200,000 ₫', image: 'images/mirror.png' },
  { id: 13, name: 'Củ Đề (Starter) Tốc Độ Cao', category: 'Điện Động Cơ', price: '4,100,000 ₫', image: 'images/starter.png' }
];

// Services Data
const services = [
  { id: 1, icon: 'fas fa-oil-can', title: 'Bảo Dưỡng Định Kỳ', description: 'Thay nhớt, kiểm tra bộ lọc, châm thêm dung dịch làm mát và kiểm tra tổng quát 30 điểm.' },
  { id: 2, icon: 'fas fa-tools', title: 'Đại Tu Động Cơ', description: 'Bảo dưỡng chuyên sâu, thay thế linh kiện hao mòn, phục hồi hiệu suất tối đa.' },
  { id: 3, icon: 'fas fa-car-crash', title: 'Phục Hồi Đồng Sơn', description: 'Công nghệ sơn chuẩn quốc tế, trả lại vẻ đẹp nguyên bản và hoàn hảo cho chiếc xe của bạn.' }
];

// Initialize and Render
document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupStyleSwitcher();
  setupThemeMemory();
  
  const productGrid = document.getElementById('productGrid'); // Homepage
  const allProductsGrid = document.getElementById('allProductsGrid'); // Products page
  const detailContainer = document.getElementById('productDetailContainer'); // Detail page
  const servicesList = document.getElementById('servicesList');

  if (productGrid) {
    renderProducts(products.slice(0, 4), productGrid);
  }

  if (allProductsGrid) {
    renderProducts(products, allProductsGrid);
    setupCategoryFilter(allProductsGrid);
  }

  if (detailContainer) {
    renderProductDetail(detailContainer);
  }

  if (servicesList) {
    renderServices(servicesList);
  }
});

function renderProducts(items, container) {
  if (!container) return;
  container.innerHTML = items.map(product => `
    <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'" style="cursor: pointer;">
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
      </div>
    </div>
  `).join('');
}

function renderServices(container) {
  if (!container) return;
  container.innerHTML = services.map(service => `
    <div class="service-item">
      <i class="${service.icon} service-icon"></i>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.description}</p>
    </div>
  `).join('');
}

function setupCategoryFilter(container) {
  const filterItems = document.querySelectorAll('#categoryFilter li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      filterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const category = item.getAttribute('data-filter');
      if (category === 'all') {
        renderProducts(products, container);
      } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered, container);
      }
    });
  });
}

function renderProductDetail(container) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    container.innerHTML = '<h2>Không tìm thấy mã sản phẩm (SKU).</h2>';
    return;
  }
  
  container.innerHTML = `
    <div class="detail-grid">
      <div class="detail-image" style="box-shadow: none; background: transparent;">
        <img src="${product.image}" alt="${product.name}" style="background: var(--bg-primary); border: 1px solid var(--border-color); padding: 3rem; border-radius: var(--radius-md);" />
        <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: center;">
          <img src="${product.image}" style="width: 80px; height: 80px; padding: 10px; border: 2px solid var(--accent-color); border-radius: 8px; background: var(--bg-primary); cursor:pointer;">
          <div style="width: 80px; height: 80px; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor:pointer;"><i class="fas fa-video"></i></div>
        </div>
      </div>
      <div class="detail-info">
        <h1 style="font-size: 2.5rem;">${product.name}</h1>
        <div style="margin-bottom: 1.5rem; display: flex; gap: 20px; font-size: 0.9rem; color: var(--text-secondary)">
           <span>Mã SKU: <span style="color:var(--text-primary); font-weight: 600;">AT-${product.id}09X</span></span>
           <span>Thương hiệu: <span style="color:var(--accent-color); font-weight: 600;">OEM Cao Cấp</span></span>
        </div>
        <div class="detail-price" style="font-size: 2.2rem;">${product.price}</div>
        
        <div class="trust-badges">
           <div class="badge-item"><i class="fas fa-shield-alt"></i> Phân Phối <br> Chính Hãng</div>
           <div class="badge-item"><i class="fas fa-undo"></i> Đổi Trả <br> 30 Ngày</div>
           <div class="badge-item"><i class="fas fa-truck-fast"></i> Giao Hàng <br> Miễn Phí</div>
        </div>

        <div style="display:flex; gap:15px; margin-top: 2rem;">
           <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden;">
             <button style="background:var(--bg-primary); color:var(--text-primary); border:none; padding:15px; cursor:pointer"><i class="fas fa-minus"></i></button>
             <input type="text" value="1" style="width:50px; text-align:center; border:none; border-left:1px solid var(--border-color); border-right:1px solid var(--border-color); padding: 14px 0;">
             <button style="background:var(--bg-primary); color:var(--text-primary); border:none; padding:15px; cursor:pointer"><i class="fas fa-plus"></i></button>
           </div>
           <button class="btn btn-primary" onclick="alert('Tính năng Giỏ hàng chuẩn bị ra mắt!')" style="flex-grow: 1; font-size: 1.1rem;"><i class="fas fa-cart-shopping"></i> Thêm Vào Giỏ Hàng</button>
        </div>
        
        <div style="margin-top: 15px;">
           <button class="btn btn-block" style="background: var(--card-bg); color: var(--text-primary); border: 1px solid var(--border-color);"><i class="fas fa-phone-alt"></i> Tư Vấn Kỹ Thuật Trực Tiếp (Hotline: 1900 8888 99)</button>
        </div>
      </div>
    </div>
  `;
}

function setupNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

function setupThemeMemory() {
  const savedTheme = localStorage.getItem('autotech_theme');
  if (savedTheme) {
    document.body.className = savedTheme;
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-theme') === savedTheme) {
        btn.classList.add('active');
      }
    });
  }
}

function setupStyleSwitcher() {
  const toggle = document.getElementById('switcherToggle');
  const panel = document.getElementById('switcherPanel');
  const btns = document.querySelectorAll('.theme-btn');
  const body = document.body;

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('show');
  });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const themeClass = btn.getAttribute('data-theme');
      body.className = themeClass;
      localStorage.setItem('autotech_theme', themeClass);
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !panel.contains(e.target)) {
      panel.classList.remove('show');
    }
  });
}
