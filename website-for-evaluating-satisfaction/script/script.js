function resetWindow() {
    window.location.reload(true);

    document.body.innerHTML = `
        <div class="fixed inset-0 flex flex-col justify-center items-center text-center min-h-screen main_BG text-[#FFF]">
            <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#84D4FA] mx-auto"></div>
            <h2 class="mt-4">กำลังโหลด...</h2>
            <p>การผจญภัยของคุณกำลังจะเริ่มต้นขึ้น</p>
        </div>
    `;
}

// —[ form ]———————————————————————————————————————————————————————————————————————————————————————————————————

function openFullscreen(imageSrc) {
    let fullscreenContainer = document.getElementById("fullscreen");
    document.getElementById("fullscreenImage").src = imageSrc;
    fullscreenContainer.style.display = "flex";
    document.body.classList.add("overflow-hidden");
}

function closeFullscreen() {
    document.getElementById("fullscreen").style.display = "none";
    document.body.classList.remove("overflow-hidden");
}

function updateSectionTracker(sectionNumber) {
    document.getElementById("sectionTracker").textContent = `${sectionNumber}-2`;
}

function showSection2() {
    let requiredInputs = document.querySelectorAll(".section-1 input[required]");
    let isValid = true;

    requiredInputs.forEach(function (input) {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = "#FF4040";

            document.querySelector(".container_message").style.opacity = "1";
            document.querySelector(".container_message").style.transform = "translate(0)";
            document.getElementById("message").style.opacity = "1";
            document.getElementById("message").textContent = "กรุณากรอกข้อมูลให้ครบถ้วน!";

            setTimeout(function () {
                document.querySelector(".container_message").style.opacity = "0";
                document.querySelector(".container_message").style.transform = "translateX(100%)";
                document.querySelector(".container_message").style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
            }, 2500);

            setTimeout(function () {
                input.style.borderColor = "#CCC";
            }, 2500);
        }
    });

    if (isValid) {
        document.querySelector(".section-1").style.display = "none";
        document.querySelector(".section-2").style.display = "block";
        updateSectionTracker(2);
    }
}
// —[ send form ]———————————————————————————————————————————————————————————————————————————————————————————————————

const scriptURL = "https://script.google.com/macros/s/AKfycbzzF-GNwZW3h99qiqKZRXcLxtZp4r-VEFcx7PE5FI-k8FxTr7G2wwZ_s9bBw6K5AkgE/exec";
const form = document.getElementById("surveyForm");
const submitButton = form.querySelector('input[type="submit"]');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.value = "กำลังส่งแบบประเมิน...";
    submitButton.classList.add("cursor-not-allowed", "bg-[#1ED760]");
    submitButton.classList.remove("hover:opacity-75");

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            form.reset();

            submitButton.disabled = false;
            submitButton.value = "ส่งแบบประเมิน";
            submitButton.classList.remove("cursor-not-allowed", "bg-[#1ED760]");
            submitButton.classList.add("hover:opacity-75");

            document.body.innerHTML = `<a class="fixed top-0 right-0 opacity-75 z-50 hover:opacity-100 ease-in-out duration-300" target=_blank href=https://github.com/centered101><svg xmlns=http://www.w3.org/2000/svg width=55 height=55 viewBox="0 0 250 250" fill=#121212><path d="M0 0l115 115h15l12 27 108 108V0z" fill=#D7D7D7></path><path class=octo-arm d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" style="transform-origin:130px 106px"></path><path class=octo-body d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"></path></svg></a><div class="fixed inset-0 flex flex-col justify-center items-center text-center gap-8 min-h-screen bg-gradient-to-b from-[#84D4FA] to-[#FFF]"><p class="font-semibold text-3xl">ขอบคุณที่กรอกแบบฟอร์ม<span class=text-[#FF4040]>!</span></p><p class=text-2xl>เราได้รับข้อมูลของคุณเรียบร้อยแล้ว และจะดำเนินการต่อไป</p></div>`;
        })
        .catch((error) => {
            handleError(error);
        });
});

function handleError(error) {
    console.error("Error!", error.message);

    messageContainer.style.display = 'flex';
    messageContainer.style.opacity = '1';
    messageText.style.opacity = '1';
    messageText.textContent = 'ส่งแบบประเมิน ไม่สำเร็จ! ' + (error.message || 'เกิดข้อผิดพลาด');

    setTimeout(() => {
        messageContainer.style.opacity = '0';
        messageContainer.style.transform = 'translateX(100%)';
        messageContainer.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
    }, 2500);

    submitButton.disabled = false;
    submitButton.value = "ส่งแบบประเมิน";
    submitButton.classList.remove("cursor-not-allowed", "bg-[#1ED760]");
    submitButton.classList.add("hover:opacity-75");
}