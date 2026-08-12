let inputs = document.querySelectorAll("from input")
let form = document.querySelector("form")

form.addEventListener("submit", (event) =>{ 
    event.preventDefault();
    $ajax({
        url: "",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: inputs[0].value,
            password: inputs[1].value,
        }),
        success: function (res) {
            console.log("Ugurlu login", res);
            localStorage.setItem("activeToken", res.body.token);
            localStorage.setItem("username", inputs[0].value)
            window.location.href = "./index.html"
        } ,
        error:function(err){
            console.log("Xeta"+err);
            
        },
    });

    
});