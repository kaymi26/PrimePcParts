document.getElementById("searchBox").addEventListener("keyup", showSuggestions);

function showSuggestions() {
    const input = document.getElementById("searchBox").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (input.length === 0) {
        suggestionsBox.style.display = "none"; // Hide suggestions if input is empty
        return;
    }

    let matchedProducts = [];

    // Search for matches in all categories
    Object.values(techDatabase).forEach(category => {
        category.forEach(product => {
            if (product.name.toLowerCase().includes(input)) {
                matchedProducts.push(product);
            }
        });
    });

    if (matchedProducts.length === 0) {
        suggestionsBox.style.display = "none"; // Hide if no matches found
        return;
    }

    matchedProducts.forEach(product => {
        let suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.innerText = product.name;
        suggestionItem.onclick = function () {
            openProductForm(product.name, product.image, product.description, getRelatedProducts(product.name));
        };
        suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.style.display = "block"; // Show suggestions
}

// ✅ Updated Search Function to Redirect with Full Product Details
function searchProduct(query) {
    query = query.toLowerCase();

    let matchedProduct = null;

    Object.values(techDatabase).forEach(category => {
        category.forEach(product => {
            if (product.name.toLowerCase() === query) {
                matchedProduct = product;
            }
        });
    });

    if (matchedProduct) {
        openProductForm(matchedProduct.name, matchedProduct.image, matchedProduct.description, getRelatedProducts(matchedProduct.name));
    } else {
        alert("Product not found.");
    }
}
