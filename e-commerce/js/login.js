document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const textInput = form.querySelector('input[type="text"]');
            const passwordInput = form.querySelector('input[type="password"]');

            if (!textInput || !passwordInput) {
                alert("Xəta: Giriş xanalari tapilmadi!");
                return;
            }

            const enteredUsername = textInput.value.trim();
            const enteredPassword = passwordInput.value.trim();

            if (!enteredUsername || !enteredPassword) {
                alert("Xəta: Zəhmət olmasa bütün xanalari doldurun!");
                return;
            }

            const registeredUser = JSON.parse(localStorage.getItem("currentUser"));

            if (!registeredUser) {
                alert("Xəta: Sistemdə qeydiyyatdan keçmiş heç bir istifadəçi tapilmadi! Öncə qeydiyyatdan keçin.");
                return;
            }

            if (enteredUsername === registeredUser.username && enteredPassword === registeredUser.password) {
                alert("Daxilolma uğurludur! Profilinizə yönləndirilirsiniz.");
                
                let currentPagePath = window.location.pathname;
                if (currentPagePath.includes("pages")) {
                    window.location.href = "user-details.html";
                } else {
                    window.location.href = "pages/user-details.html";
                }
            } else {
                alert("Xəta: İstifadəçi adi və ya şifrə yanlişdir!");
            }
        });
    }
});
