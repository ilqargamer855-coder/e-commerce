let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('.account:nth-child(1) input');
    const surnameInput = document.querySelector('.account:nth-child(2) input');
    const emailInput = document.querySelector('.account:nth-child(3) input');
    const usernameInput = document.querySelector('.account:nth-child(4) input');

    const userToSave = {
        name: nameInput ? nameInput.value.trim() : "İlqar",
        surname: surnameInput ? surnameInput.value.trim() : "Zülfüqarlı",
        email: emailInput ? emailInput.value.trim() : "example@gmail.com",
        username: usernameInput ? usernameInput.value.trim() : "example"
    };
    
    localStorage.setItem("currentUser", JSON.stringify(userToSave));

    alert("Ugurla elave olundu");
    window.location.href = "user-details.html";
});
