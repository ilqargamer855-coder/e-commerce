
let currentSlide = 1;
const totalSlides = 3; 
let slideInterval;

function autoPlaySlides() {
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }
    
    const radioBtn = document.getElementById(`slide${currentSlide}`);
    if (radioBtn) {
        radioBtn.checked = true;
    }
}

function initSliderEvents() {
    const radios = document.querySelectorAll('input[name="slider"]');
    
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            currentSlide = index + 1;
            
            clearInterval(slideInterval);
            slideInterval = setInterval(autoPlaySlides, 3000);
        });
    });
}

function startTimer() {
    var endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + 60 * 60 * 24 * 2);
    
    var timerInterval = setInterval(function () {
        var now = new Date();
        var timeRemaining = endTime - now;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        } else {
            var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    startTimer();
    
    initSliderEvents();
    
    slideInterval = setInterval(autoPlaySlides, 3000);
});
