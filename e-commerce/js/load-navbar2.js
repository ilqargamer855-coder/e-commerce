document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container2");

    if (!navbarContainer) {
        console.error("Navbar container not found!");
        return;
    }

    if (navbarContainer.innerHTML.trim() !== "") {
        console.warn("Navbar already loaded!");
        return;
    }

    let path = window.location.pathname.includes("pages") ? "../componets/navbar2.html" : "componets/navbar2.html";

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
            updateNavbar();

            setTimeout(() => {
                loadUserProfile();
            }, 500);

            document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);
        })
        .catch(error => console.error("Error loading navbar:", error));
});

async function loadUserProfile() {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
        console.warn("Token tapilmadi, istifadəçi login olmamişdir.");
        updateNavbar();
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/", { //user/about
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("İstifadəçi məlumatlarini əldə etmək mümkün olmadi.");
        }

        const userData = await response.json();
        console.log("İstifadəçi məlumatlari:", userData);

        localStorage.setItem("username", userData.username);
        updateNavbar();

    } catch (error) {
        console.error("İstifadəçi məlumatlarini yükləmək mümkün olmadi:", error);
        updateNavbar();
    }
}

// Navbar buttons
function updateNavbar() {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const userProfile = document.getElementById("userProfile");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const signupNav = document.getElementById("signupNav");

    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");

    console.log("Navbar update:", { token, username });

    if (token && username) {
        if (loginBtn) loginBtn.style.display = "none";
        if (signupNav) signupNav.style.display = "none";
        if (userProfile) {
            userProfile.style.display = "flex";
            usernameDisplay.innerHTML = `${username} <button id="logoutBtn" class="btn btn-danger btn-sm ms-2">Log Out</button>`;
            document.getElementById("logoutBtn").addEventListener("click", logoutUser);
        }
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (signupNav) signupNav.style.display = "inline-block";
        if (userProfile) userProfile.style.display = "none";
    }
}

// Logout 
function logoutUser() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    console.log("Logged out successfully!");
    updateNavbar();
    window.location.href = "index.html";
}