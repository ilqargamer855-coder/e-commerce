document.addEventListener("DOMContentLoaded", function () {
    const footerContainer = document.getElementById("footer-container");

    if (!footerContainer) {
        console.error("Footer container not found!");
        return;
    }

    let path = window.location.pathname.includes("pages") ? "../componets/footer.html" : "componets/footer.html";

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});