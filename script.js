/*DATABASE*/
const techDatabase = {
    "Processors (CPUs)": [
        { name: "Intel Core i9", image: "corei9.webp" },
        { name: "Intel Core i7", image: "corei7.avif" },
        { name: "Intel Core i5", image: "corei5.webp" },
        { name: "AMD Ryzen 9", image: "ryzen9.avif" },
        { name: "Apple M3", image: "applem3.webp" }
    ],
    "Graphics Cards (GPUs)": [
        { name: "Nvidia RTX 4090", image: "rtx4090.png" },
        { name: "AMD RX 7900", image: "rx7900.webp" },
        { name: "Intel Arc GPU", image: "intelarc.png" },
        { name: "AMD RX 7800 XT", image: "rx7800xt.png" },
        { name: "Nvidia RTX 4080", image: "rtx4080.webp" }
    ],
    "Motherboards": [
        { name: "ASUS ROG Motherboard", image: "rogmobo.png" },
        { name: "MSI Gaming Motherboard", image: "msimobo.webp" },
        { name: "Gigabyte Motherboard", image: "gigabyte.webp" },
        { name: "ASRock X670E Taichi", image: "asrockx670e.webp" },
        { name: "EVGA Z690 Dark", image: "evgaz690.png" }
    ],
    "Monitors & Displays": [
        { name: "ASUS Gaming Monitor", image: "asusmoni.png" },
        { name: "Acer Predator", image: "acerpredator.webp" },
        { name: "Dell Ultrasharp", image: "dellultrasharp.png" },
        { name: "LG UltraGear", image: "lgultragear.png" },
        { name: "Samsung Odyssey G9", image: "samsungg9.webp" }
    ],
    "Ads": [
        { name: "Exclusive Offer 50% off", image: "ads1.png" },
        { name: "Limited Deal, BUY NOW", image: "ads2.webp" },
        { name: "60% OFF NOW", image: "ads3.png" }
    ]
};

/*FUNCTIONS*/
// Redirect to form.html with product details in URL
function openProductForm(name, image, description, relatedProducts) {
    let price = "Price not available"; 

    for (const category in techDatabase) {
        let foundProduct = techDatabase[category].find(product => product.name === name);
        if (foundProduct && foundProduct.price) {
            price = foundProduct.price;
        }
    }

    window.location.href = `form.html?product=${encodeURIComponent(name)}
        &image=${encodeURIComponent(image)}
        &description=${encodeURIComponent(description)}
        &price=${encodeURIComponent(price)}
        &related=${encodeURIComponent(relatedProducts.join(','))}`;
}

// Load product details on form page
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const imageSrc = urlParams.get('image');
    const description = urlParams.get('description');
    const related = urlParams.get('related') ? urlParams.get('related').split(',') : [];

    if (productName && imageSrc && description) {
        document.getElementById("productName").innerText = productName;
        document.getElementById("productImg").src = imageSrc;
        document.getElementById("productDescription").innerText = description;

        displayRelatedProducts(related);

        setTimeout(() => {
            document.querySelector(".product-info").classList.add("show");
        }, 100);
    }
}

// Function to shuffle an array
function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Display related products with shuffled results from the database
function displayRelatedProducts(relatedProducts) {
    const relatedContainer = document.getElementById("relatedProducts");
    relatedContainer.innerHTML = "";

    let foundProducts = [];

    relatedProducts.forEach(productName => {
        for (const category in techDatabase) {
            let foundProduct = techDatabase[category].find(product => product.name === productName);
            if (foundProduct) {
                foundProducts.push(foundProduct);
            }
        }
    });

    if (foundProducts.length === 0) {
        console.warn("No related products found! Using default category products.");
        foundProducts = Object.values(techDatabase).flat(); // Use full category list as fallback
    }

    // Shuffle related products before displaying
    let shuffledProducts = shuffleArray(foundProducts);
    console.log("Shuffled Related Products:", shuffledProducts);

    // Show only **2 shuffled** related products
    shuffledProducts.slice(0, 2).forEach(product => {
        let item = document.createElement("div");
        item.className = "related-item";
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="related-img">
            <p>${product.name}</p>
        `;
        relatedContainer.appendChild(item);
    });

    console.log("Related products updated successfully!");
    console.log("Testing Related Ads:", displayRelatedAds("Exclusive Offer 50% off"));
    console.log("Testing Related Ads:", displayRelatedAds("Limited Deal, BUY NOW"));

}


/*Clicking Related Products*/
function displayRelatedProducts(relatedProducts) {
    const relatedContainer = document.getElementById("relatedProducts");
    relatedContainer.innerHTML = "";

    let foundProducts = [];

    relatedProducts.forEach(productName => {
        for (const category in techDatabase) {
            let foundProduct = techDatabase[category].find(product => product.name === productName);
            if (foundProduct) {
                foundProducts.push(foundProduct);
            }
        }
    });

    if (foundProducts.length === 0) {
        console.warn("No related products found! Using default category products.");
        foundProducts = Object.values(techDatabase).flat(); // Use full category list as fallback
    }

    let shuffledProducts = shuffleArray(foundProducts);

    shuffledProducts.slice(0, 2).forEach(product => {
        let item = document.createElement("div");
        item.className = "related-item";
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="related-img">
            <p>${product.name}</p>
        `;
        item.onclick = function () {
            openProductForm(product.name, product.image, "Product description", getRelatedProducts(product.name));
        };
        relatedContainer.appendChild(item);
    });
}

function getRelatedProducts(selectedProduct) {
    for (const category in techDatabase) {
        const foundProduct = techDatabase[category].find(product => product.name === selectedProduct);
        if (foundProduct) {
            return techDatabase[category].map(product => product.name).filter(name => name !== selectedProduct);
        }
    }
    return [];
}


/*Back to Home Button*/
function goBack() {
    window.location.href = "index.html"; // Redirect to home
}

function openProductForm(name, image, description, relatedProducts) {
    window.location.href = `form.html?product=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&related=${encodeURIComponent(relatedProducts.join(','))}`;
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const imageSrc = urlParams.get('image');
    const description = urlParams.get('description');
    const related = urlParams.get('related') ? urlParams.get('related').split(',') : [];

    if (productName && imageSrc && description) {
        document.getElementById("productName").innerText = productName;
        document.getElementById("productImg").src = imageSrc;
        displayRelatedProducts(related);

        setTimeout(() => {
            document.querySelector(".product-info").classList.add("show");
        }, 100);
    }
};

function displayRelatedProducts(relatedProducts) {
    const relatedContainer = document.getElementById("relatedProducts");
    relatedContainer.innerHTML = "";

    let foundProducts = [];

    relatedProducts.forEach(productName => {
        for (const category in techDatabase) {
            let foundProduct = techDatabase[category].find(product => product.name === productName);
            if (foundProduct) {
                foundProducts.push(foundProduct);
            }
        }
    });

    let shuffledProducts = shuffleArray(foundProducts);
    shuffledProducts.slice(0, 2).forEach(product => {
        let item = document.createElement("div");
        item.className = "related-item";
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="related-img">
            <p>${product.name}</p>
        `;
        item.onclick = function () {
            openProductForm(product.name, product.image, "Product description", getRelatedProducts(product.name));
        };
        relatedContainer.appendChild(item);
    });
}

function addToCart() {
    let quantity = document.getElementById("quantity").value;
    alert(`Added ${quantity} item(s) to cart!`);
}

function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function getRelatedProducts(selectedProduct) {
    for (const category in techDatabase) {
        const foundProduct = techDatabase[category].find(product => product.name === selectedProduct);
        if (foundProduct) {
            return techDatabase[category].map(product => product.name).filter(name => name !== selectedProduct);
        }
    }
    return [];
}

/*ADS*/
function openProductForm(name, image, description, relatedProducts) {
    window.location.href = `form.html?product=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&related=${encodeURIComponent(relatedProducts.join(','))}`;
}


/*CART*/
/* FUNCTION TO ADD PRODUCTS TO CART */
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");
    const imageSrc = document.getElementById("productImg").src; // ✅ Capture product image
    const priceText = document.getElementById("hardcodedPrice").innerText.replace("₱", "").replace(",", "");
    const price = parseFloat(priceText) || 0;
    const quantityInput = document.getElementById("quantity").value;
    const quantity = parseInt(quantityInput);

    // ✅ Prevent invalid quantity (zero, negative, or decimal)
    if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(Number(quantityInput))) {
        alert("Please enter a valid quantity (whole number greater than 0).");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // Merge duplicate item
        existingItem.quantity += quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
    } else {
        // Add new product with image
        cart.push({
            name: productName,
            image: imageSrc, // ✅ Store image URL
            price: price,
            quantity: quantity,
            total: price * quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity} ${productName} added to cart!`);
}




/**/ 

