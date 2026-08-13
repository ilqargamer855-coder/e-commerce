document.addEventListener("DOMContentLoaded", () => {
    const rateRows = document.querySelectorAll(".rate .star");
    let productBoxes = Array.from(document.querySelectorAll(".clothes .box-img"));
    const clothesContainer = document.querySelector(".clothes");
    const sortSelect = document.getElementById("select");

    productBoxes.forEach(box => {
        const randomStarsCount = Math.floor(Math.random() * 5) + 1;
        const randomReviewsCount = Math.floor(Math.random() * 141) + 10;
        const productStarContainer = box.querySelector(".star");
        const reviewSpan = productStarContainer.querySelector("span");

        productStarContainer.innerHTML = "";
        for (let i = 0; i < randomStarsCount; i++) {
            const goldStar = document.createElement("i");
            goldStar.className = "fa-solid fa-star";
            goldStar.style.color = "#ffc400";
            productStarContainer.appendChild(goldStar);
        }
        for (let j = randomStarsCount; j < 5; j++) {
            const grayStar = document.createElement("i");
            grayStar.className = "fa-solid fa-star";
            grayStar.style.color = "#dcdde1";
            productStarContainer.appendChild(grayStar);
        }
        if (reviewSpan) {
            reviewSpan.textContent = `(${randomReviewsCount})`;
            productStarContainer.appendChild(reviewSpan);
        }
        box.setAttribute("data-current-rating", randomStarsCount);

        const img = box.querySelector("img");
        if (img) {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                const name = box.querySelector("p").textContent;
                const price = box.querySelector("h5").textContent;
                const image = img.getAttribute("src");
                const selectedProduct = { name, price, image, stars: randomStarsCount, reviews: randomReviewsCount };
                localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
                window.location.href = "product.html";
            });
        }
    });

    if (sortSelect && clothesContainer) {
        sortSelect.addEventListener("change", () => {
            const selectedText = sortSelect.options[sortSelect.selectedIndex].text.trim();
            
            if (selectedText === "Price: Low to High") {
                productBoxes.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector("h5").textContent.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.querySelector("h5").textContent.replace(/[^0-9.]/g, ''));
                    return priceA - priceB;
                });
            } else if (selectedText === "Price: High to Low") {
                productBoxes.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector("h5").textContent.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.querySelector("h5").textContent.replace(/[^0-9.]/g, ''));
                    return priceB - priceA;
                });
            }
            productBoxes.forEach(box => clothesContainer.appendChild(box));
        });
    }

    function showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.backgroundColor = "#10b981";
        toast.style.color = "white";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "6px";
        toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        toast.style.zIndex = "9999";
        toast.style.fontSize = "15px";
        toast.style.fontWeight = "500";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    const filterStars = document.querySelectorAll(".rate .star .fa-star");
    filterStars.forEach(star => {
        star.style.color = "#ffeaa7";
        star.style.transition = "color 0.2s ease";
    });

    rateRows.forEach((row) => {
        const starsInRow = row.querySelectorAll(".fa-star");
        const rowRatingValue = starsInRow.length; 
        starsInRow.forEach((star, index) => {
            star.addEventListener("mouseenter", () => {
                for (let i = 0; i <= index; i++) starsInRow[i].style.color = "#ffc400"; 
            });
            star.addEventListener("mouseleave", () => {
                if (!row.classList.contains("selected-rate")) {
                    starsInRow.forEach(s => s.style.color = "#ffeaa7");
                }
            });
        });
        row.addEventListener("click", () => {
            rateRows.forEach(r => {
                r.classList.remove("selected-rate");
                r.querySelectorAll(".fa-star").forEach(s => s.style.color = "#ffeaa7");
            });
            row.classList.add("selected-rate");
            starsInRow.forEach(s => s.style.color = "#ffc400");
            productBoxes.forEach(box => {
                const productRating = parseInt(box.getAttribute("data-current-rating"), 10);
                box.style.display = productRating === rowRatingValue ? "block" : "none";
            });
        });
    });

    const allProductsBtn = document.querySelector(".product button");
    if (allProductsBtn) {
        allProductsBtn.addEventListener("click", () => {
            productBoxes.forEach(box => box.style.display = "block");
            rateRows.forEach(r => {
                r.classList.remove("selected-rate");
                r.querySelectorAll(".fa-star").forEach(s => s.style.color = "#ffeaa7");
            });
        });
    }

    const addButtons = document.querySelectorAll(".add-btn");
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productBox = e.target.closest(".box-img");
            if (!productBox) return;
            
            const name = productBox.querySelector("p").textContent;
            const priceText = productBox.querySelector("h5").textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const imgSrc = productBox.querySelector("img").getAttribute("src");

            const productItem = { id: name.toLowerCase().replace(/\s+/g, '-'), name, price, image: imgSrc, quantity: 1 };

            let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
            const existingItem = cart.find(item => item.id === productItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(productItem);
            }
            localStorage.setItem("shoppingCart", JSON.stringify(cart));

            showToast(`${name} uğurla əlavə olundu!`);

            if (!productBox.querySelector(".go-to-cart-btn")) {
                const goToCartBtn = document.createElement("button");
                goToCartBtn.textContent = "Go to cart";
                goToCartBtn.className = "go-to-cart-btn";
                goToCartBtn.style.backgroundColor = "#DB4444"; 
                goToCartBtn.style.color = "white";
                goToCartBtn.style.border = "none";
                goToCartBtn.style.borderRadius = "5px";
                goToCartBtn.style.width = "200px";
                goToCartBtn.style.height = "30px";
                goToCartBtn.style.cursor = "pointer";
                goToCartBtn.style.marginTop = "8px";
                goToCartBtn.style.display = "block";
                goToCartBtn.addEventListener("click", () => { window.location.href = "cart.html"; });
                button.after(goToCartBtn);
            }
        });
    });
});
