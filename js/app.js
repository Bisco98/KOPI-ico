// Data Menu Kopi Kita
const menuData = [
  {
    id: 1,
    name: "Kopi Susu Gula Aren",
    category: "coffee",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
    desc: "Espresso ganda dengan susu segar dan gula aren asli gurih manis.",
  },
  {
    id: 2,
    name: "Americano Classic",
    category: "coffee",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    desc: "Ekstraksi espresso kuat dipadukan dengan air mineral panas/dingin.",
  },
  {
    id: 3,
    name: "Cappuccino Velvet",
    category: "coffee",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668ba67e53?q=80&w=600&auto=format&fit=crop",
    desc: "Perpaduan pas antara espresso, steamed milk, dan foam tebal lembut.",
  },
  {
    id: 4,
    name: "Matcha Latte Uji",
    category: "non-coffee",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop",
    desc: "Bubuk Matcha murni asli Uji Jepang dengan perpaduan susu creamy.",
  },
  {
    id: 5,
    name: "Artisan Chocolate",
    category: "non-coffee",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=600&auto=format&fit=crop",
    desc: "Cokelat pekat pilihan dipadukan dengan rasa lembut yang menenangkan.",
  },
  {
    id: 6,
    name: "Butter Croissant",
    category: "pastry",
    price: 24000,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
    desc: "Pastry renyah berlapis margarin Prancis berkualitas tinggi.",
  },
  {
    id: 7,
    name: "Cinnamon Roll",
    category: "pastry",
    price: 26000,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    desc: "Roti lembut gulung kayu manis harum disiram cream cheese halus.",
  },
  {
    id: 8,
    name: "Caramel Macchiato",
    category: "coffee",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop",
    desc: "Espresso nikmat dengan sirup karamel spesial dan microfoam lembut.",
  },
];

// State Keranjang Belanja
let cart = [];

// Formatting Currency
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

// Render Cards Menu
function renderMenu(filter = "all", keyword = "") {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";

  const cleanKeyword = keyword.trim().toLowerCase();

  const filteredData = menuData.filter((item) => {
    const matchCategory = filter === "all" || item.category === filter;
    const matchKeyword =
      !cleanKeyword ||
      item.name.toLowerCase().includes(cleanKeyword) ||
      item.desc.toLowerCase().includes(cleanKeyword) ||
      item.category.toLowerCase().includes(cleanKeyword);

    return matchCategory && matchKeyword;
  });

  if (filteredData.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-white">
        <i class="fa-solid fa-mug-hot display-5 mb-3 opacity-50"></i>
        <p class="mb-0">Menu dengan kata kunci "<strong>${keyword}</strong>" tidak ditemukan.</p>
      </div>
    `;
    return;
  }

  filteredData.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 col-xl-3";
    col.innerHTML = `
      <div class="menu-card h-100 d-flex flex-column">
        <div class="menu-img-wrapper">
          <img src="${item.image}" class="menu-img" alt="${item.name}" onerror="this.src='https://placehold.co/600x400/3c2a21/e5d3b3?text=${encodeURIComponent(item.name)}'">
          <span class="badge-category text-capitalize">${item.category}</span>
        </div>
        <div class="p-3 d-flex flex-column flex-grow-1">
          <h5 class="font-serif text-white mb-1">${item.name}</h5>
          <p class="small text-white mb-3 flex-grow-1">${item.desc}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-secondary border-opacity-25">
            <span class="price-tag">${formatRupiah(item.price)}</span>
            <button class="btn btn-sm btn-accent px-3" onclick="addToCart(${item.id})">
              <i class="fa-solid fa-plus me-1"></i> Tambah
            </button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}
let activeCategory = "all";

// Filtering Kategori Listener
document.querySelectorAll(".menu-filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".menu-filter-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.getAttribute("data-filter");
    const keyword = document.getElementById("searchInput")?.value || "";
    renderMenu(activeCategory, keyword);
  });
});

// Search Form Submit Listener
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // mencegah halaman reload
    renderMenu(activeCategory, searchInput.value);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  });

  // Pencarian real-time saat mengetik atau menghapus teks
  searchInput.addEventListener("input", (e) => {
    renderMenu(activeCategory, e.target.value);
  });
}
// Add Item to Cart
function addToCart(id) {
  const product = menuData.find((item) => item.id === id);
  const existingIndex = cart.findIndex((item) => item.id === id);

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`"${product.name}" ditambahkan ke keranjang`);
}

// Change Quantity in Cart
function updateQty(id, change) {
  const index = cart.findIndex((item) => item.id === id);
  if (index > -1) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
}

// Render Cart UI
function updateCartUI() {
  const container = document.getElementById("cartItemsContainer");
  const totalEl = document.getElementById("cartTotalPrice");
  const badgeEl = document.getElementById("cartCountBadge");
  const checkoutBtn = document.getElementById("checkoutBtn");

  container.innerHTML = "";
  let total = 0;
  let totalCount = 0;

  if (cart.length === 0) {
    container.innerHTML = `
                    <div class="text-center py-5 text-muted">
                        <i class="fa-solid fa-basket-shopping display-4 mb-3 opacity-50"></i>
                        <p>Keranjang Anda masih kosong.</p>
                    </div>
                `;
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    cart.forEach((item) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      totalCount += item.qty;

      const cartItemEl = document.createElement("div");
      cartItemEl.className = "cart-item d-flex align-items-center gap-3";
      cartItemEl.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 50px; height: 50px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <h6 class="mb-0 text-white font-serif">${item.name}</h6>
                            <small class="text-warning">${formatRupiah(item.price)}</small>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span class="fw-bold px-1 text-white">${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                    `;
      container.appendChild(cartItemEl);
    });
  }

  totalEl.innerText = formatRupiah(total);

  if (totalCount > 0) {
    badgeEl.innerText = totalCount;
    badgeEl.style.display = "inline-block";
  } else {
    badgeEl.style.display = "none";
  }
}

// Show Notification Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  toastMsg.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Checkout Handler
const DELIVERY_FEE = 8000;
let selectedPayment = "GoPay";

function toggleAddressEdit() {
  const input = document.getElementById("deliveryAddressInput");
  if (!input) return;
  input.classList.toggle("d-none");
  if (!input.classList.contains("d-none")) {
    input.focus();
  }
}

function updateAddressText(val) {
  const display = document.getElementById("addressDisplay");
  if (display) {
    display.innerText = val.trim() || "Jl. Cenek No. 1, Jakarta";
  }
}

function selectPayment(el, method) {
  selectedPayment = method;
  document.querySelectorAll(".payment-option").forEach((card) => {
    card.classList.remove("border-warning", "bg-warning", "bg-opacity-10");
    card.classList.add("border-secondary");
  });
  el.classList.remove("border-secondary");
  el.classList.add("border-warning", "bg-warning", "bg-opacity-10");
}

// Buka Modal Checkout & Isi Ringkasan Pesanan
function handleCheckout() {
  if (cart.length === 0) return;

  const listEl = document.getElementById("checkoutItemsList");
  const subtotalEl = document.getElementById("checkoutSubtotal");
  const feeEl = document.getElementById("checkoutDeliveryFee");
  const grandTotalEl = document.getElementById("checkoutGrandTotal");
  const payNowBtn = document.getElementById("payNowBtn");

  listEl.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;

    const row = document.createElement("div");
    row.className =
      "d-flex align-items-center justify-content-between gap-2 p-2 rounded-3 bg-black bg-opacity-25 border border-secondary border-opacity-25";
    row.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 44px; height: 44px; object-fit: cover;">
        <div>
          <div class="fw-semibold small text-white">${item.name}</div>
          <small class="text-light opacity-75">${item.qty}x • ${formatRupiah(item.price)}</small>
        </div>
      </div>
      <span class="fw-bold small text-warning">${formatRupiah(lineTotal)}</span>
    `;
    listEl.appendChild(row);
  });

  const grandTotal = subtotal + DELIVERY_FEE;
  subtotalEl.innerText = formatRupiah(subtotal);
  feeEl.innerText = formatRupiah(DELIVERY_FEE);
  grandTotalEl.innerText = formatRupiah(grandTotal);
  payNowBtn.innerText = `Pay Now • ${formatRupiah(grandTotal)}`;

  // Tutup offcanvas lalu buka modal checkout
  const offcanvasEl = document.getElementById("cartOffcanvas");
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
  if (bsOffcanvas) bsOffcanvas.hide();

  const modalEl = document.getElementById("checkoutModal");
  const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  bsModal.show();
}

// Konfirmasi Pembayaran ("Pay Now")
function confirmPayment() {
  if (cart.length === 0) return;

  const address =
    document.getElementById("addressDisplay")?.innerText ||
    "Jl. Cenek No. 1, Jakarta";

  alert(
    `Pembayaran via ${selectedPayment} berhasil!\nPesanan Kopi ico sedang disiapkan dan dikirim ke:\n${address}`,
  );

  cart = [];
  updateCartUI();

  const modalEl = document.getElementById("checkoutModal");
  const bsModal = bootstrap.Modal.getInstance(modalEl);
  if (bsModal) bsModal.hide();
}
// Initialize on DOM Ready
window.addEventListener("DOMContentLoaded", () => {
  renderMenu("all");
  updateCartUI();
});
