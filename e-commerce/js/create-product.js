document.addEventListener("DOMContentLoaded", () => {
    const imageUrlInput = document.getElementById("imageUrl");
    const productPreview = document.getElementById("product-preview");
    const form = document.querySelector(".product-form");
    const saveBtn = document.querySelector(".btn-save");

    const editProductId = localStorage.getItem("editProductId");
    let customProducts = JSON.parse(localStorage.getItem("customProducts")) || [];

    if (editProductId) {
        const productToEdit = customProducts.find(p => p.id == editProductId);
        if (productToEdit) {
            document.getElementById("brand").value = productToEdit.brand || "";
            document.getElementById("model").value = productToEdit.model || "";
            document.getElementById("category").value = productToEdit.category || "";
            document.getElementById("description").value = productToEdit.description || "";
            document.getElementById("price").value = productToEdit.price || "";
            document.getElementById("rating").value = productToEdit.rating || "";
            imageUrlInput.value = productToEdit.image || "";
            
            if (productToEdit.image) {
                productPreview.src = productToEdit.image;
                productPreview.style.display = "inline-block";
            }
            if (saveBtn) saveBtn.textContent = "Update";
        }
    }

    if (imageUrlInput && productPreview) {
        imageUrlInput.addEventListener("input", (e) => {
            const urlValue = e.target.value.trim();
            if (urlValue !== "") {
                productPreview.src = urlValue;
                productPreview.style.display = "inline-block";
            } else {
                productPreview.src = "";
                productPreview.style.display = "none";
            }
        });

        productPreview.addEventListener("error", () => {
            productPreview.style.display = "none";
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const brand = document.getElementById("brand").value.trim();
            const model = document.getElementById("model").value.trim();
            const category = document.getElementById("category").value.trim();
            const description = document.getElementById("description").value.trim();
            const price = document.getElementById("price").value.trim();
            const rating = document.getElementById("rating").value.trim();
            const imageUrl = imageUrlInput.value.trim();

            if (!brand || !model || !category || !description || !price || !rating || !imageUrl) {
                alert("Zəhmət olmasa bütün xanaları doldurun!");
                return;
            }

            customProducts = JSON.parse(localStorage.getItem("customProducts")) || [];

            if (editProductId) {
                customProducts = customProducts.map(p => {
                    if (p.id == editProductId) {
                        return {
                            id: p.id,
                            brand,
                            model,
                            category,
                            description,
                            price: parseFloat(price),
                            rating: parseFloat(rating),
                            image: imageUrl
                        };
                    }
                    return p;
                });
                localStorage.removeItem("editProductId");
            } else {
                const newProduct = {
                    id: Date.now(),
                    brand,
                    model,
                    category,
                    description,
                    price: parseFloat(price),
                    rating: parseFloat(rating),
                    image: imageUrl
                };
                customProducts.push(newProduct);
            }

            localStorage.setItem("customProducts", JSON.stringify(customProducts));
            window.location.href = "user-product.html";
        });

        form.addEventListener("reset", () => {
            localStorage.removeItem("editProductId");
            if (saveBtn) saveBtn.textContent = "Save";
            if (productPreview) {
                productPreview.src = "";
                productPreview.style.display = "none";
            }
        });
    }
});
