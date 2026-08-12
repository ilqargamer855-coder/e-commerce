document.addEventListener("DOMContentLoaded", () => {
    const savedTotal = localStorage.getItem("cartTotal");

    if (savedTotal) {
        const totalQutu = document.getElementById("totalqutu");
        if (totalQutu) {
            const h1Elements = totalQutu.querySelectorAll("h1");

            if (h1Elements[0]) {
                const subtotalSpan = h1Elements[0].querySelector("span");
                if (subtotalSpan) subtotalSpan.textContent = `${savedTotal}$`;
            }

            if (h1Elements[2]) {
                const totalSpan = h1Elements[2].querySelector("span");
                if (totalSpan) totalSpan.textContent = `${savedTotal}$`;
            }
        }
    } else {
        const totalQutu = document.getElementById("totalqutu");
        if (totalQutu) {
            const spans = totalQutu.querySelectorAll("h1 span");
            if (spans[0]) spans[0].textContent = "0.00$";
            if (spans[2]) spans[2].textContent = "0.00$";
        }
    }

    const placeOrderBtn = document.querySelector(".box2 button");
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", () => {
            const finalPrice = parseFloat(localStorage.getItem("cartTotal")) || 0;

            if (finalPrice === 0) {
                alert("Sifariş etmək üçün səbətinizdə məhsul olmalıdır!");
                return;
            }

            let message = `Sizin balansınız: ${finalPrice.toFixed(2)}$\n`;
            message += `Sifarişin ümumi məbləği: ${finalPrice.toFixed(2)}$\n\n`;
            message += "Sifarişiniz uğurla tamamlandı! Təşəkkür edirik.";

            alert(message);

            localStorage.removeItem("cartTotal");
            
            window.location.href = "../index.html";
        });
    }
});
