document.addEventListener("DOMContentLoaded", function () { 
    const navbarContainer = document.getElementById("navbar-container"); 
    if (!navbarContainer) { 
        return; 
    } 
    if (navbarContainer.innerHTML.trim() !== "") { 
        return; 
    } 
    let path = window.location.pathname.includes("pages") ? "../componets/navbar.html" : "componets/navbar.html"; 
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
        .catch(error => console.error(error)); 
}); 

async function loadUserProfile() { 
    const token = localStorage.getItem("jwtToken"); 
    if (!token) { 
        updateNavbar(); 
        return; 
    } 
    try { 
        const response = await fetch("http://localhost:8080/", { 
            method: "GET", 
            headers: { 
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json" 
            } 
        }); 
        if (!response.ok) { 
            throw new Error(); 
        } 
        const userData = await response.json(); 
        localStorage.setItem("username", userData.username); 
        updateNavbar(); 
    } catch (error) { 
        updateNavbar(); 
    } 
} 

function updateNavbar() { 
    const loginBtn = document.getElementById("loginBtn"); 
    const logoutBtn = document.getElementById("logoutBtn"); 
    const userProfile = document.getElementById("userProfile"); 
    const usernameDisplay = document.getElementById("usernameDisplay"); 
    const signupNav = document.getElementById("signupNav"); 
    const token = localStorage.getItem("jwtToken"); 
    const username = localStorage.getItem("username"); 
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navUsername = document.getElementById("nav-username"); 
    if (navUsername) { 
        if (currentUser && currentUser.name) { 
            navUsername.textContent = currentUser.name; 
        } else { 
            navUsername.textContent = "Guest"; 
        } 
    }

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

function logoutUser() { 
    localStorage.removeItem("jwtToken"); 
    localStorage.removeItem("username"); 
    localStorage.removeItem("currentUser"); 
    updateNavbar(); 
    window.location.href = "index.html"; 
}
