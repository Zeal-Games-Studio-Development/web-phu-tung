// Products Data
const products = [
  {
    id: 1,
    name: 'Má Phanh Ceramic Carbon',
    category: 'Phanh & An Toàn',
    price: '4,500,000 ₫',
    image: 'images/brake.png'
  },
  {
    id: 2,
    name: 'Mâm Xe Hợp Kim Thể Thao',
    category: 'Mâm & Lốp',
    price: '12,000,000 ₫',
    image: 'images/rim.png'
  },
  {
    id: 3,
    name: 'Động Cơ V8 Performance',
    category: 'Động Cơ',
    price: 'Liên Hệ',
    image: 'images/engine.png'
  },
  {
    id: 4,
    name: 'Lọc Dầu Động Cơ Premium',
    category: 'Bôi Trơn',
    price: '450,000 ₫',
    image: 'images/oil_filter.png'
  },
  {
    id: 5,
    name: 'Bình Ắc Quy 12V Cao Cấp',
    category: 'Điện Động Cơ',
    price: '2,800,000 ₫',
    image: 'images/battery.png'
  },
  {
    id: 6,
    name: 'Bugi Đánh Lửa Iridium',
    category: 'Động Cơ',
    price: '850,000 ₫',
    image: 'images/spark_plug.png'
  },
  {
    id: 7,
    name: 'Đèn Pha Nguyên Cụm LED',
    category: 'Hệ Thống Đèn',
    price: '15,500,000 ₫',
    image: 'images/headlight.png'
  },
  {
    id: 8,
    name: 'Cần Gạt Mưa Silicone',
    category: 'Ngoại Thất',
    price: '600,000 ₫',
    image: 'images/wiper.png'
  },
  {
    id: 9,
    name: 'Giảm Xóc Coilover',
    category: 'Hệ Thống Treo',
    price: '8,900,000 ₫',
    image: 'images/shock_absorber.png'
  },
  {
    id: 10,
    name: 'Lọc Gió Động Cơ Thể Thao',
    category: 'Nạp Xả',
    price: '1,200,000 ₫',
    image: 'images/air_filter.png'
  },
  {
    id: 11,
    name: 'Vô Lăng Da Carbon',
    category: 'Nội Thất',
    price: '5,500,000 ₫',
    image: 'images/steering_wheel.png'
  },
  {
    id: 12,
    name: 'Gương Chiếu Hậu Có LED',
    category: 'Ngoại Thất',
    price: '3,200,000 ₫',
    image: 'images/mirror.png'
  },
  {
    id: 13,
    name: 'Củ Đề (Starter) Tốc Độ Cao',
    category: 'Điện Động Cơ',
    price: '4,100,000 ₫',
    image: 'images/starter.png'
  }
];

// Services Data
const services = [
  {
    id: 1,
    icon: 'fas fa-oil-can',
    title: 'Bảo Dưỡng Định Kỳ',
    description: 'Thay nhớt, kiểm tra bộ lọc, châm thêm dung dịch làm mát và kiểm tra tổng quát 30 điểm.'
  },
  {
    id: 2,
    icon: 'fas fa-tools',
    title: 'Đại Tu Động Cơ',
    description: 'Bảo dưỡng chuyên sâu, thay thế linh kiện hao mòn, phục hồi hiệu suất tối đa.'
  },
  {
    id: 3,
    icon: 'fas fa-car-crash',
    title: 'Phục Hồi Đồng Sơn',
    description: 'Công nghệ sơn chuẩn quốc tế, trả lại vẻ đẹp nguyên bản và hoàn hảo cho chiếc xe của bạn.'
  }
];

// Initialize and Render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderServices();
  setupNavbar();
  setupStyleSwitcher();
});

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
      </div>
    </div>
  `).join('');
}

function renderServices() {
  const list = document.getElementById('servicesList');
  list.innerHTML = services.map(service => `
    <div class="service-item">
      <i class="${service.icon} service-icon"></i>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.description}</p>
    </div>
  `).join('');
}

// Navbar Scroll & Mobile Menu
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

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Style Switcher Logic
function setupStyleSwitcher() {
  const toggle = document.getElementById('switcherToggle');
  const panel = document.getElementById('switcherPanel');
  const btns = document.querySelectorAll('.theme-btn');
  const body = document.body;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('show');
  });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      btns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      btn.classList.add('active');
      
      // Update theme class on body
      const themeClass = btn.getAttribute('data-theme');
      body.className = themeClass; // Reset to only this theme class
    });
  });

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !panel.contains(e.target)) {
      panel.classList.remove('show');
    }
  });
}
