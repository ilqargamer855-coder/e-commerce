let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formInputs = event.target.querySelectorAll("input");
    let nameVal = "", surnameVal = "", emailVal = "", usernameVal = "", passwordVal = "";

    formInputs.forEach((input, index) => {
        if (index === 0) nameVal = input.value.trim();
        if (index === 1) surnameVal = input.value.trim();
        if (index === 2) emailVal = input.value.trim();
        if (index === 3) usernameVal = input.value.trim();
        if (index === 4) passwordVal = input.value.trim();
    });

    const userToSave = {
        name: nameVal || "İlqar",
        surname: surnameVal || "Zülfüqarlı",
        email: emailVal || "example@gmail.com",
        username: usernameVal || "example",
        password: passwordVal || "123456"
    };
    
    localStorage.setItem("currentUser", JSON.stringify(userToSave));

    alert("Ugurla elave olundu");
    window.location.href = "user-details.html";
});
