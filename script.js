// Sample products
const products = [
  {
    name: "Nike Air Zoom Pegasus 40",
    price: 6999,
    description: "Breathable running shoes built for performance and comfort.",
    image: "images/shoe.jpg",
  },
  {
    name: "Fossil Gen 6 Smartwatch",
    price: 14499,
    description: "Track fitness and notifications with an elegant smartwatch.",
    image: "images/watch.jpg",
  },
  {
    name: "HP Pavilion Laptop",
    price: 52999,
    description: "14-inch sleek laptop with Intel i5 processor and 8GB RAM.",
    image: "images/laptop.jpg",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 24999,
    description: "Noise-cancelling Bluetooth headphones with immersive sound.",
    image: "images/headphone.jpg",
  },
];

// Initialize cart
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("product-list");
  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">₹${p.price.toLocaleString()}</p>
      <button class="buy-btn" onclick="addToCart(${index})">🛒 Add to Cart</button>
    `;
    list.appendChild(div);
  });

  document.getElementById("cartBtn").addEventListener("click", toggleCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
});

function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("active");
}

function addToCart(index) {
  const product = products[index];
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");
  list.innerHTML = "";

  let totalPrice = 0;
  cart.forEach((item, i) => {
    totalPrice += item.price * item.quantity;
    list.innerHTML += `
      <li>
        <strong>${item.name}</strong><br>
        ₹${item.price.toLocaleString()} × ${item.quantity}
        <br>
        <button onclick="removeItem(${i})" style="margin-top:5px;">❌ Remove</button>
      </li>
    `;
  });

  total.textContent = totalPrice.toLocaleString();
  count.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("🎉 Purchase successful! Thank you for shopping at Trendify.");
  cart = [];
  updateCart();
  toggleCart();
}
