document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector(".table tbody");
    const newProductBtn = document.getElementById("newProductBtn");

    if (newProductBtn) {
        newProductBtn.addEventListener("click", () => {
            localStorage.removeItem("editProductId");
            window.location.href = "create-product.html";
        });
    }

    function renderProducts() {
        if (!tbody) return;

        const customProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
        
        const headerRow = tbody.querySelector("tr");
        tbody.innerHTML = "";
        if (headerRow && headerRow.querySelector("th")) {
            tbody.appendChild(headerRow);
        }

        if (customProducts.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 30px; color: #999;">No products found. Click "New product" to create one.</td></tr>`;
            return;
        }

        customProducts.forEach((product, index) => {
            const tr = document.createElement("tr");
            tr.setAttribute("data-id", product.id);

            tr.innerHTML = `
                <td class="fw-bold">${index + 1}</td>
                <td>${product.brand}</td>
                <td>${product.model}</td>
                <td>${product.category}</td>
                <td>
                    <img src="${product.image}" alt="${product.model}" class="product-img">
                </td>
                <td class="text-danger fw-semibold">${product.price.toFixed(2)} $</td>
                <td>
                    <div class="rating-box">
                        <span class="fw-bold text-dark">${product.rating}</span><span class="text-muted">/5</span>
                    </div>
                </td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-edit btn-sm text-white px-3 edit-btn">Edit</button>
                        <button class="btn btn-delete btn-sm text-white px-3 delete-btn">Delete</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        initOperationsEvents();
    }

    function initOperationsEvents() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                const id = row.getAttribute("data-id");
                
                let customProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
                customProducts = customProducts.filter(p => p.id != id);
                localStorage.setItem("customProducts", JSON.stringify(customProducts));
                
                renderProducts();
            });
        });

        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                const id = row.getAttribute("data-id");
                
                localStorage.setItem("editProductId", id);
                window.location.href = "create-product.html";
            });
        });
    }

    renderProducts();
});
