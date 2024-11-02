let cart = [];
let isDarkMode = true;
let manualDiscount = null;

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = isDarkMode ? '🌙' : '☀️';
    localStorage.setItem('darkMode', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        isDarkMode = savedTheme === 'true';
        if (!isDarkMode) {
            document.body.classList.add('light-theme');
            themeToggle.textContent = '☀️';
        }
    }
});

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);
}

function addItem() {
    const nameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('itemPrice');
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name && price && price > 0) {
        cart.push({ 
            name, 
            price,
            id: Date.now()
        });
        updateCart();
        
        nameInput.value = '';
        priceInput.value = '';
        
        const cartContainer = document.querySelector('.cart-container');
        cartContainer.style.animation = 'none';
        cartContainer.offsetHeight;
        cartContainer.style.animation = 'fadeIn 0.3s ease-out';
    } else {
        showError('Mohon isi nama dan harga barang dengan benar!');
    }
}

function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    
    document.querySelector('.form-container').appendChild(error);
    
    setTimeout(() => {
        error.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => error.remove(), 300);
    }, 3000);
}

function removeItem(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function setManualDiscount(discount) {
    document.querySelectorAll('.discount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    manualDiscount = discount;
    updateCart();
}

function setCustomDiscount() {
    const customInput = document.getElementById('customDiscount');
    const value = parseFloat(customInput.value);
    
    if (value >= 0 && value <= 100) {
        manualDiscount = value / 100;
        
        document.querySelectorAll('.discount-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        updateCart();
        customInput.value = '';
    } else {
        showError('Masukkan diskon antara 0-100%');
    }
}

function resetDiscount() {
    manualDiscount = null;
    document.querySelectorAll('.discount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('customDiscount').value = '';
    updateCart();
}

function calculateDiscount(subtotal, itemCount) {
    if (manualDiscount !== null) {
        return manualDiscount;
    }
    
    let discount = 0;
    
    if (subtotal > 2000000) {
        discount = 0.15;
    } else if (subtotal > 1000000) {
        discount = 0.10;
    }

    if (itemCount > 5) {
        discount += 0.05;
    }

    return discount;
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const summary = document.getElementById('summary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Keranjang belanja kosong</div>';
        summary.innerHTML = '';
        return;
    }

    let cartHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price;
        cartHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <div>
                    <span>${formatRupiah(item.price)}</span>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Hapus</button>
                </div>
            </div>
        `;
    });

    const discount = calculateDiscount(subtotal, cart.length);
    const total = subtotal - (subtotal * discount);
    
    cartItems.innerHTML = cartHTML;
    summary.innerHTML = `
        <div class="subtotal">
            <span>Subtotal</span>
            <span>${formatRupiah(subtotal)}</span>
        </div>
        <div class="discount">
            <span>Diskon</span>
            <span>${discount * 100}%</span>
        </div>
        <div class="total">
            <span>Total</span>
            <span>${formatRupiah(total)}</span>
        </div>
    `;
}