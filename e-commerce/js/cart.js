document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const tbody = document.querySelector(".product table tbody");

    if (tbody) {
        const headerRow = tbody.querySelector("tr");
        tbody.innerHTML = "";
        if (headerRow) tbody.appendChild(headerRow);

        if (cart.length === 0) {
            const emptyTr = document.createElement("tr");
            emptyTr.innerHTML = `<td colspan="5" style="text-align: center; padding: 40px; color: #7f8c8d; font-size: 18px; font-weight: bold;">Səbətiniz boşdur!</td>`;
            tbody.appendChild(emptyTr);
        } else {
            cart.forEach(item => {
                const tr = document.createElement("tr");
                tr.setAttribute("data-id", item.id);
                const itemSubtotal = item.price * item.quantity;

                tr.innerHTML = `
                    <td id="img-box"><img src="${item.image}" alt="${item.name}">${item.name}</td>
                    <td>${item.price.toFixed(2)}$</td>
                    <td><input type="number" class="numInp" value="${item.quantity}" min="1" max="99"></td>
                    <td class="item-subtotal">${itemSubtotal.toFixed(2)}$</td>
                    <td><button class="remove">Remove</button></td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    function calculateCart() {
        let subtotalSum = 0;
        const rows = document.querySelectorAll(".product table tr");
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.querySelectorAll("td");
            if (cells.length < 4 || row.textContent.includes("Səbətiniz boşdur!")) continue;
            
            const priceText = cells[1].textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            
            const quantityInput = row.querySelector(".numInp");
            const quantity = parseInt(quantityInput.value, 10) || 0;
            
            const itemSubtotal = price * quantity;
            row.querySelector(".item-subtotal").textContent = `${itemSubtotal.toFixed(2)}$`;
            
            subtotalSum += itemSubtotal;

            const productId = row.getAttribute("data-id");
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity = quantity;
            }
        }
        
        localStorage.setItem("shoppingCart", JSON.stringify(cart));

        const totalDiv = document.querySelector(".total");
        if (totalDiv) {
            const spans = totalDiv.querySelectorAll("p span");
            if (spans.length >= 2) {
                spans[0].textContent = `${subtotalSum.toFixed(2)}$`;
                spans[1].textContent = `${"Free"}`;
                spans[2].textContent = `${subtotalSum.toFixed(2)}$`;
            }
        }
    }

    function initCartEvents() {
        const inputs = document.querySelectorAll(".numInp");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                if (parseInt(input.value, 10) < 1) input.value = 1;
                if (parseInt(input.value, 10) > 99) input.value = 99;
                calculateCart();
            });
        });

        const removeButtons = document.querySelectorAll(".remove");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                if (row) {
                    const productId = row.getAttribute("data-id");
                    cart = cart.filter(item => item.id !== productId);
                    localStorage.setItem("shoppingCart", JSON.stringify(cart));
                    row.remove();
                    
                    if (cart.length === 0 && tbody) {
                        const headerRow = tbody.querySelector("tr");
                        tbody.innerHTML = "";
                        if (headerRow) tbody.appendChild(headerRow);
                        
                        const emptyTr = document.createElement("tr");
                        emptyTr.innerHTML = `<td colspan="5" style="text-align: center; padding: 40px; color: #7f8c8d; font-size: 18px; font-weight: bold;">Səbətiniz boşdur!</td>`;
                        tbody.appendChild(emptyTr);
                    }
                    calculateCart();
                }
            });
        });

        const checkoutButton = document.getElementById("checkout");
        if (checkoutButton) {
            checkoutButton.addEventListener("click", (e) => {
                const totalSpan = document.querySelectorAll(".total p span");
                const currentTotalSum = totalSpan.length >= 2 ? parseFloat(totalSpan[1].textContent.replace(/[^0-9.]/g, '')) : 0;

                if (currentTotalSum === 0) {
                    e.preventDefault();
                    alert("Səbətiniz boşdur! Zəhmət olmasa məhsul əlavə edin.");
                    return;
                }
                localStorage.setItem("cartTotal", currentTotalSum.toFixed(2));
            });
        }
    }

    initCartEvents();
    calculateCart();
});
