(document.body.innerHTML += `
<div hidden id=login-form class="fixed inset-0 bg-[#000] bg-opacity-75 backdrop-blur flex-col justify-center items-center gap-8 p-8 z-40">
<div class="animationShow-x w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded-xl overflow-hidden">
<div class="relative w-full border-b border-[#CCC] p-4">
<p class="text-center text-xl font-black">คุณจำเป็นต้องมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ</p>
</div>
<div class="flex flex-wrap justify-between items-center gap-4 p-4">
<input type=password id=passwordInput placeholder=รหัสผ่าน class="grow border border-[#CCC] rounded-xl p-2 focus:outline-none focus:shadow-none">
<button id=togglePassword onclick=togglePassword() class="flex-1 bg-[#DFDFDF] border border-[#CCC] rounded-xl truncate p-2 active:opacity-75">แสดงรหัสผ่าน</button>
<button id=loginButton class="relative w-full flex justify-center items-center border border-[#409EFE] rounded-xl text-[#FFF] font-black truncate bg-[#409EFE] px-8 py-2 z-10 overflow-hidden ease-in-out duration-700 hover:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700">
<span>ล็อกอิน</span>
</button>
</div>
</div>
<a href=/ ><button class="animationShow bg-[#DFDFDF] border border-[#CCC] rounded-xl truncate px-8 py-2 active:opacity-75">กลับไป</button></a>
</div>
<button hidden id=logout-section class="-animationShow-x fixed bottom-8 right-8 bg-[#FF7070] text-[#FFF] rounded-xl p-2 opacity-75 transition-opacity ease-in-out duration-300 hover:opacity-90 z-40">
<svg xmlns=http://www.w3.org/2000/svg height=16 viewBox="0 -960 960 960" width=16 fill=#0D0D0D><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
</button>
<div hidden id=alert-logout class="fixed inset-0 bg-[#000] bg-opacity-75 flex-col justify-center items-center gap-8 p-8 z-40">
<div class="animationShow-x w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded-xl overflow-hidden">
<div class="relative w-full border-b border-[#CCC] p-4">
<p class="text-center text-xl font-black">โปรดยืนยันการออกจากระบบของคุณ</p>
</div>
<div class="flex gap-4 p-4">
<button id=cancel-logout class="relative w-full bg-[#DFDFDF] border border-[#CCC] rounded-xl truncate p-2 active:opacity-75">ยกเลิก</button>
<button id=logout class="relative w-full flex justify-center items-center border border-[#FF7070] rounded-xl text-[#FFF] font-black truncate bg-[#FF7070] px-8 py-2 z-10 overflow-hidden ease-in-out duration-700 hover:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700">ลงชื่อออก</button>
</div></div></div>`);

document.getElementById("passwordInput").addEventListener("focus", function () {
    document.querySelector("div#login-form a").classList.add("opacity-0");
});

document.getElementById("passwordInput").addEventListener("blur", function () {
    document.querySelector("div#login-form a").classList.remove("opacity-0");
});

var passwordInput = document.getElementById("passwordInput");
var loginLink = document.querySelector("div#login-form a");

// ตรวจสอบข้อความขณะพิมพ์
passwordInput.addEventListener("input", function () {
    if (passwordInput.value.trim() !== "") {
        loginLink.classList.add("opacity-0");
    } else {
        loginLink.classList.remove("opacity-0");
    }
});

document.getElementById("passwordInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        processLogin();
    }
}); // ฟังก์ชันสำหรับปุ่ม Enter

var maxAttempts = 3;
var attempts = 0;

function processLogin() {
    var passwordInput = document.getElementById("passwordInput");
    var password = passwordInput.value;

    if (password === "") {
        showToast("ใส่ข้อมูลเพื่อเข้าสู่ระบบ");
        passwordInput.style.borderColor = "#FF7070";
        setTimeout(function () {
            passwordInput.style.borderColor = "#CCC";
        }, 700);
        return; // ออกจากฟังก์ชันทันที
    }

    if (
        password === "08389" ||
        password === "36887" ||
        password === "20102011016" ||
        password === "66201020151" ||
        password === "151"
    ) {
        passwordInput.value = "";
        localStorage.setItem("isLoggedIn", "true");
        showToast("ล็อกอินสำเร็จ!");

        document.body.classList.remove("overflow-hidden");
        document.getElementById("login-form").classList.add("succeed");
        setTimeout(function () {
            document.getElementById("login-form").classList.remove("succeed");
            document.getElementById("login-form").style.display = "none";
            document.getElementById("logout-section").style.display = "block";
        }, 300);
    } else if (
        password === "https://project-test-submission.netlify.app" ||
        password === "https://project-test-submission.netlify.app/" ||
        password === "project-test-submission.netlify.app" ||
        password === "project-test-submission.netlify.app/"
    ) {
        localStorage.setItem("userConsent", "🟡 พ่อมึงอะ!");
        showToast("🟡 พ่อมึงอะ!");
        return
    } else {
        attempts++;

        if (attempts >= maxAttempts) {
            passwordInput.style.borderColor = "#FF7070";
            showToast("ล็อกอินล้มเหลว นำทางออกจากเว็บไซต์");
            setTimeout(function () {
                window.location.href = "https://github.com/centered101";
            }, 700);
        } else {
            passwordInput.value = "";
            passwordInput.style.borderColor = "#FF7070";
            showToast(`ล็อกอินล้มเหลว โปรดตรวจสอบรหัสผ่าน (${attempts}/${maxAttempts})`);
            setTimeout(function () {
                passwordInput.style.borderColor = "#CCC";
            }, 700);
        }
    }
}

document.getElementById("loginButton").addEventListener("click", processLogin);

function togglePassword() {
    var passwordInput = document.getElementById("passwordInput");
    var toggleButton = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.innerHTML = "แสดง รหัสผ่าน";
        showToast("แสดง รหัสผ่าน");
    } else {
        passwordInput.type = "password";
        toggleButton.innerHTML = "ซ่อน รหัสผ่าน";
        showToast("ซ่อน รหัสผ่าน");

    }
}

// ตรวจสอบสถานะล็อกอินตอนโหลดหน้าเว็บ
window.onload = function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || isLoggedIn === "false") {
        document.getElementById('login-form').style.display = "flex";
        document.getElementById('logout-section').style.display = "none";
        document.body.classList.add('overflow-hidden');

        document.querySelectorAll('.directory a, .directory input').forEach(function (element) {
            element.setAttribute('tabindex', '-1');
        });

    } else {
        document.getElementById('login-form').style.display = "none";
        document.getElementById('logout-section').style.display = "block";

        document.querySelectorAll('.directory a, .directory input').forEach(function (element) {
            element.setAttribute('tabindex', '0');
        });
    }
};

document.getElementById("logout-section").addEventListener("click", function () {
    document.getElementById('alert-logout').style.display = 'flex';
});

document.getElementById("cancel-logout").addEventListener("click", function () {
    document.getElementById('alert-logout').classList.add("succeed");
    setTimeout(function () {
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
    }, 700);
});

document.getElementById("logout").addEventListener("click", function () {
    document.getElementById('alert-logout').classList.add("succeed");
    document.getElementById('logout-section').style.display = "none";
    setTimeout(function () {
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
    }, 700);
});

// —[ Toastify ]———————————————————————————————————————————————————————————————————————————————————————————————————

function showToast(message, bgColor = "#FFF", duration = 2750) {
    Toastify({
        newWindow: true,
        text: message,
        duration: duration,
        gravity: "bottom",
        position: "right",
        style: {
            position: "fixed",
            bottom: "32px",
            right: "32px",
            background: bgColor,
            color: "#000",
            border: "solid 1px #CCC",
            borderRadius: "12px",
            paddingBlock: "8px",
            paddingInline: "16px",
            zIndex: 100,
        }
    }).showToast();
}