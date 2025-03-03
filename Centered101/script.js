// —[ resetWindow ]———————————————————————————————————————————————————————————————————————————————————————————————————

function resetWindow() {
    window.location.reload(true);
    document.body.innerHTML = `
    <div class="fixed inset-0 flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-b from-[#FFFFFF] dark:from-[#000000] to-[#F5F5F5] dark:to-[#111827] text-[#0D0D0D] dark:text-zinc-500">
      <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#409EFE] mx-auto"></div>
      <h2 class="mt-4">Loading...</h2>
      <p>Your adventure is about to begin</p>
    </div>
        `;
}

// —[ Progress Bar ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.addEventListener("DOMContentLoaded", function () {
    var progressBar = document.getElementById('progressbar').firstElementChild;
    progressBar.style.width = "0"; // เริ่มความกว้างที่ 0%

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
    },
        25); // อัปเดตทุกๆ 25ms
});

// —[ Title Animation ]———————————————————————————————————————————————————————————————————————————————————————————————————

const text = "Centered101"; // ข้อความที่ต้องการให้พิมพ์
let i = 0;
let deleting = false;
const speed = 150; // ความเร็วในการพิมพ์และลบ

function typeAndDelete() {
    if (deleting) {
        document.title = text.slice(0, i); // ลบข้อความ
        i--; // ลดค่าตัวแปร i
    } else {
        document.title = text.slice(0, i); // พิมพ์ข้อความ
        i++; // เพิ่มค่าตัวแปร i
    }

    if (!deleting && i === text.length) {
        setTimeout(() => deleting = true, 500); // เมื่อพิมพ์ครบแล้วให้เริ่มลบ
    } else if (deleting && i === 0) {
        deleting = false; // เมื่อลบเสร็จแล้วให้เริ่มพิมพ์ใหม่
    }

    setTimeout(typeAndDelete, speed); // เรียกฟังก์ชันตัวเองเพื่อพิมพ์และลบไปเรื่อยๆ
}

typeAndDelete(); // เรียกใช้งานฟังก์ชัน

// —[ click to enter ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML += `
<div onclick="ClickToEnter()" id="click-to-enter" class="flex justify-center items-center h-screen cursor-pointer">
<p class="text-3xl font-black text-[#409EFE] drop-shadow-md">Click to Enter...</p></div>
`;

function ClickToEnter() {
    document.body.classList.remove('overflow-hidden');
    document.getElementById("click-to-enter").classList.add('hidden');
    document.querySelector("main").classList.remove('hidden');
    document.getElementById("welcomeSound").play();
    document.querySelectorAll(".loads").forEach(function (load) {
        load.classList.add('load');
    });
};

document.addEventListener("keypress", function () {
    ClickToEnter();
});

// —[ welcomeSound ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.addEventListener("DOMContentLoaded", function () {
    const welcomeSound = document.getElementById("welcomeSound");
    const playButton = document.getElementById("playButton");
    const progressBars = document.querySelectorAll("#welcomeProgress");

    welcomeSound.volume = 0.5;
    welcomeSound.currentTime = 0;
    welcomeSound.play();

    // อัปเดตแถบความคืบหน้าเสียง
    welcomeSound.addEventListener("timeupdate", function () {
        const progressValue = welcomeSound.currentTime / welcomeSound.duration;

        progressBars.forEach((progressBar) => {
            progressBar.value = progressValue;
        });
    });

    window.togglePlayPause = function () {
        const loadBars = document.querySelectorAll(".loads");

        if (welcomeSound.paused) {
            welcomeSound.play();
            loadBars.forEach(function (load) {
                load.classList.add('load');
            });
        } else {
            welcomeSound.pause();
            loadBars.forEach(function (load) {
                load.classList.remove('load');
            });
        }
    };
});

