// Redirect to home
function goBack() {
    window.location.href = "index.html";
}

// Load cart items when page loads
document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
});

// Function to load cart items
function loadCartItems() {
    const cartItemsElem = document.getElementById("cart-items");
    if (!cartItemsElem) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    console.log("Loaded cart:", cart); // Debugging

    if (cart.length === 0) {
        cartItemsElem.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let cartHTML = "";
        let grandTotal = 0;

        cart.forEach((item, index) => {
            grandTotal += item.total;
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-img"> <!-- ✅ Product Image -->
                    <p><strong>${item.name}</strong></p>
                    <p>Price: ₱${item.price.toLocaleString()}</p>
                    <p>
                        Quantity: 
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">➖</button>
                        <span id="quantity-${index}">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">➕</button>
                    </p>
                    <p>Total: ₱<span id="total-${index}">${item.total.toLocaleString()}</span></p>
                    <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
                </div>
            `;
        });

        cartHTML += `<h3>Grand Total: ₱<span id="grand-total">${grandTotal.toLocaleString()}</span></h3>`;
        cartItemsElem.innerHTML = cartHTML;
    }
}


// Function to update quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart[index].quantity = 1; // Minimum quantity is 1

        cart[index].total = cart[index].price * cart[index].quantity;
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update UI dynamically
        document.getElementById(`quantity-${index}`).innerText = cart[index].quantity;
        document.getElementById(`total-${index}`).innerText = cart[index].total.toLocaleString();

        // Update grand total
        let grandTotal = cart.reduce((sum, item) => sum + item.total, 0);
        document.getElementById("grand-total").innerText = grandTotal.toLocaleString();
    }
}

// Function to remove an item from the cart
function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartItems(); // Refresh cart display after removal
    }
}

// Debugging: Log cart storage after loading
console.log("Cart after load:", JSON.parse(localStorage.getItem("cart")));



/*SUGGESION PRODUCTS*/
