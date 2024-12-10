
// resetWindow

function resetWindow() {
    window.location.reload(true);
}

// Progress Bar

document.addEventListener("DOMContentLoaded", function () {
    var progressBar = document.getElementById('progressbar').firstElementChild;
    progressBar.style.width = "0";  // เริ่มความกว้างที่ 0%

    // ทำการโหลดโดยเพิ่มความกว้างทุกๆ 100ms จนถึง 100%
    let progress = 0;
    let interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + "%";
        progressBar.parentElement.style.opacity = "1";

        if (progress >= 100) {
            clearInterval(interval); // หยุดเมื่อถึง 100%
            setTimeout(() => {
                progressBar.parentElement.style.opacity = "0";
            }, 500); // ซ่อน progress bar เมื่อโหลดเสร็จ
        }
    }, 25); // อัปเดตทุกๆ 25ms
});

// welcomeSound

document.addEventListener("DOMContentLoaded", function () {
    const welcomeSound = document.getElementById("welcomeSound");
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");
    const welcomeProgress = document.getElementById("welcomeProgress");

    welcomeSound.play();
    welcomeSound.volume = 0.1;
    stopButton.style.display = "flex";

    // เล่นซ้ำเมื่อเพลงจบ
    welcomeSound.addEventListener("ended", function () {
        welcomeSound.currentTime = 0; // ตั้งค่าเริ่มต้น
        welcomeSound.play(); // เล่นใหม่
    });

    // อัปเดตแถบความคืบหน้าเสียง
    welcomeSound.addEventListener("timeupdate", function () {
        welcomeProgress.value = welcomeSound.currentTime / welcomeSound.duration;
    });

    // ใช้ Spacebar เป็นคีย์ลัด
    document.addEventListener("keyup", function (event) {
        if (event.code === "Space") {
            togglePlayPause();
        }
    });

    window.togglePlayPause = function () {
        if (welcomeSound.paused) {
            welcomeSound.play();
            playButton.style.display = "none";
            stopButton.style.display = "flex";
        } else {
            welcomeSound.pause();
            playButton.style.display = "flex";
            stopButton.style.display = "none";
        }
    };
    return
});