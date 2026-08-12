let currentTotalSum = 0;

function calculateCart() {
    let subtotalSum = 0;
    const rows = document.querySelectorAll(".product table tr");
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");
        if (cells.length < 4) continue;
        
        const priceText = cells[1].textContent;
        const price = parseFloat(priceText.replace('$', ''));
        
        const quantityInput = row.querySelector(".numInp");
        const quantity = parseInt(quantityInput.value) || 0;
        
        const itemSubtotal = price * quantity;
        cells[3].textContent = `${itemSubtotal.toFixed(2)}$`;
        
        subtotalSum += itemSubtotal;
    }
    
    currentTotalSum = subtotalSum;

    const totalDiv = document.querySelector(".total");
    if (totalDiv) {
        const spans = totalDiv.querySelectorAll("p span");
        if (spans.length >= 2) {
            spans[0].textContent = `${subtotalSum.toFixed(2)}$`; 
            spans[2].textContent = `${subtotalSum.toFixed(2)}$`; 
        }
    }
}

function initCartEvents() {
    const inputs = document.querySelectorAll(".numInp");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (parseInt(input.value) < 1) input.value = 1;
            if (parseInt(input.value) > 99) input.value = 99;
            calculateCart();
        });
    });

    const removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (row) {
                row.remove();
                calculateCart();
            }
        });
    });

    const checkoutButton = document.getElementById("checkout");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (currentTotalSum === 0) {
                alert("Səbətiniz boşdur! Zəhmət olmasa məhsul əlavə edin.");
                return;
            }

            localStorage.setItem("cartTotal", currentTotalSum.toFixed(2));

            window.location.href = "checkout.html"; 
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCartEvents();
    calculateCart();
});
