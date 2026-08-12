document.addEventListener("DOMContentLoaded", () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        currentUser = {
            name: "Ilqar",
            surname: "Zulfuqarli",
            username: "example@gmail.com",
            email: "example@gmail.com"
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    const nameSpan = document.getElementById("profile-name");
    const surnameSpan = document.getElementById("profile-surname");
    const usernameSpan = document.getElementById("profile-username");
    const emailSpan = document.getElementById("profile-email");

    if (nameSpan) nameSpan.textContent = currentUser.name;
    if (surnameSpan) surnameSpan.textContent = currentUser.surname;
    if (usernameSpan) usernameSpan.textContent = currentUser.username;
    if (emailSpan) emailSpan.textContent = currentUser.email;

    const userProductsBtn = document.getElementById("userProductsBtn");
    if (userProductsBtn) {
        userProductsBtn.addEventListener("click", () => {
            window.location.href = "user-product.html";
        });
    }
});
