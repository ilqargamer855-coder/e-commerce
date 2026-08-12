document.addEventListener("DOMContentLoaded", () => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (selectedProduct) {
        const mainTitle = document.querySelector(".b2 h2");
        const mainPrice = document.querySelector(".b2 h3");
        const mainImg = document.querySelector(".b1 img");
        const mainStarContainer = document.querySelector(".b2 .star");

        if (mainTitle) mainTitle.textContent = selectedProduct.name;
        if (mainPrice) mainPrice.textContent = selectedProduct.price.includes('$') ? selectedProduct.price : `${selectedProduct.price}$`;
        if (mainImg) mainImg.setAttribute("src", selectedProduct.image);

        if (mainStarContainer) {
            mainStarContainer.innerHTML = "";
            for (let i = 0; i < selectedProduct.stars; i++) {
                const goldStar = document.createElement("i");
                goldStar.className = "fa-solid fa-star";
                goldStar.style.color = "#FFAD33";
                mainStarContainer.appendChild(goldStar);
            }
            for (let j = selectedProduct.stars; j < 5; j++) {
                const grayStar = document.createElement("i");
                grayStar.className = "fa-solid fa-star";
                grayStar.style.color = "gray";
                mainStarContainer.appendChild(grayStar);
            }
            const reviewSpan = document.createElement("span");
            reviewSpan.style.color = "gray";
            reviewSpan.style.marginRight = "15px";
            reviewSpan.textContent = ` (${selectedProduct.reviews} Reviews) `;
            mainStarContainer.appendChild(reviewSpan);

            const delimiter = document.createTextNode(" | ");
            mainStarContainer.appendChild(delimiter);

            const stockSpan = document.createElement("span");
            stockSpan.style.color = "#00FF66";
            stockSpan.style.opacity = "0.7";
            stockSpan.style.marginLeft = "10px";
            stockSpan.textContent = "In Stock";
            mainStarContainer.appendChild(stockSpan);
        }
    }

    const addToCartBtn = document.querySelector(".b2 button");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const name = document.querySelector(".b2 h2").textContent;
            const priceText = document.querySelector(".b2 h3").textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const imgSrc = document.querySelector(".b1 img").getAttribute("src");

            const productItem = {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name: name,
                price: price,
                image: imgSrc,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
            const existingItem = cart.find(item => item.id === productItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(productItem);
            }
            localStorage.setItem("shoppingCart", JSON.stringify(cart));

            if (!document.querySelector(".go-to-cart-btn")) {
                const goToCartBtn = document.createElement("button");
                goToCartBtn.textContent = "Go to cart";
                goToCartBtn.className = "go-to-cart-btn";
                
                goToCartBtn.style.backgroundColor = "#212529"; 
                goToCartBtn.style.color = "white";
                goToCartBtn.style.border = "none";
                goToCartBtn.style.borderRadius = "6px";
                goToCartBtn.style.width = "186px";
                goToCartBtn.style.height = "40px";
                goToCartBtn.style.cursor = "pointer";
                goToCartBtn.style.marginTop = "10px";
                goToCartBtn.style.display = "block";
                goToCartBtn.style.fontWeight = "500";

                goToCartBtn.addEventListener("click", () => {
                    window.location.href = "cart.html"; 
                });

                addToCartBtn.after(goToCartBtn);
            }
        });
    }

    const relatedImages = document.querySelectorAll(".box-img .q-img img");
    relatedImages.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            const container = img.closest(".q-img");
            const name = container.querySelector(".text p:nth-child(1)").textContent;
            const priceText = container.querySelector(".text p:nth-child(2)").textContent;
            const image = img.getAttribute("src");
            
            const selectedProduct = { name, price: priceText.split('$')[1] + '$', image, stars: 5, reviews: 88 };
            localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
            window.location.href = "product.html";
        });
    });
});
