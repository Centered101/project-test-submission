const storySlides = [
    "สวัสดีครับ ผมชื่อ Center หรือชื่อจริง พงศ์พล พรหมผา...",
    "ผมมีความฝันในการเป็นโปรแกรมเมอร์ที่เก่ง...",
    "ผมชอบพัฒนาแอปพลิเคชันและเว็บไซต์...",
    "และนี่คือเรื่องราวของผมในวันเกิดครั้งนี้..."
];
let currentSlide = 0;

function startStory() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('storySlides').style.display = 'block';
    document.getElementById('storyContent').innerText = storySlides[currentSlide];
}

function nextStory() {
    currentSlide++;
    if (currentSlide < storySlides.length) {
        document.getElementById('storyContent').innerText = storySlides[currentSlide];
    } else {
        localStorage.setItem('storyViewed', 'true'); // Store that the story has been viewed
        document.getElementById('storySlides').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }
}

function checkStoryViewed() {
    if (localStorage.getItem('storyViewed') === 'true') {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', checkStoryViewed);


// Countdown Timer
const birthdayDate = new Date('December 27, 2025 00:00:00').getTime();
const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = birthdayDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "Happy Birthday!";
    }
}, 1000);