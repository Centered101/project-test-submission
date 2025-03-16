(document.body.innerHTML += `
<div hidden id=login-form class="fixed inset-0 bg-[#000] bg-opacity-75 backdrop-blur flex-col justify-center items-center gap-8 p-8 z-40">
<div class="animationShow-x w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded-xl overflow-hidden">
<div class="relative w-full border-b border-[#CCC] p-4">
<p class="text-center text-xl font-black">คุณจำเป็นต้องมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ</p>
</div>
<div class="flex flex-wrap justify-between items-center gap-4 p-4">
<input type=password id=passwordInput placeholder=รหัสผ่าน class="grow border border-[#CCC] rounded-xl p-2 focus:outline-none focus:shadow-none">
<button id=togglePassword class="flex-1 bg-[#DFDFDF] border border-[#CCC] rounded-xl truncate px-8 py-2 active:opacity-75">แสดง</button>
<button id=login_btn class="relative w-full flex justify-center items-center border border-[#409EFE] rounded-xl text-[#FFF] font-black truncate bg-[#409EFE] px-8 py-2 ease-in-out duration-300 z-40 active:opacity-75">
<span>ล็อกอิน</span>
</button>
</div>
</div>
<button id=goBack class="animationShow fixed bottom-8 left-8 bg-[#DFDFDF] border border-[#CCC] rounded-xl truncate px-8 py-2 ease-in-out duration-300 z-40 active:opacity-75">กลับไป</button>
</div>
<button hidden id=logout class="-animationShow-x fixed bottom-8 right-8 bg-[#FF7070] text-[#FFF] fill-[#FFF] border border-[#CCC] rounded-xl truncate p-2 opacity-75 hover:opacity-100 ease-in-out duration-300 z-40 active:opacity-75">
<svg xmlns=http://www.w3.org/2000/svg height=16 viewBox="0 -960 960 960" width=16><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
</button>`);

let passwordInput = document.getElementById("passwordInput");

document.getElementById("passwordInput").addEventListener("focus", function () {
    document.querySelector("button#goBack").classList.add("opacity-0");
});

document.getElementById("passwordInput").addEventListener("blur", function () {
    document.querySelector("button#goBack").classList.remove("opacity-0");
});

// ตรวจสอบข้อความขณะพิมพ์
passwordInput.addEventListener("input", function () {
    if (passwordInput.value.trim() !== "") {
        document.querySelector("button#goBack").classList.add("opacity-0");
    } else {
        document.querySelector("button#goBack").classList.remove("opacity-0");
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

        document.body.classList.remove("overflow-hidden");
        document.getElementById('wrapper').classList.remove('select-none');
        document.querySelector('footer').classList.remove('select-none');
        document.getElementById("login-form").classList.add("succeed");
        setTimeout(function () {
            document.getElementById("login-form").classList.remove("succeed");
            document.getElementById("login-form").style.display = "none";
            document.getElementById("logout").style.display = "block";
        }, 300);
    } else if (
        password === "https://project-test-submission.netlify.app" ||
        password === "https://project-test-submission.netlify.app/" ||
        password === "project-test-submission.netlify.app" ||
        password === "project-test-submission.netlify.app/" ||
        password === "Centered101" ||
        password === "centered101" ||
        password === "Center" ||
        password === "center"
    ) {
        passwordInput.value = "";
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

document.getElementById("login_btn").addEventListener("click", processLogin);

document.getElementById("togglePassword").addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        document.getElementById("togglePassword").innerHTML = "แสดง";
    } else {
        passwordInput.type = "password";
        document.getElementById("togglePassword").innerHTML = "ซ่อน";
    }
});

// ตรวจสอบสถานะล็อกอินตอนโหลดหน้าเว็บ
function gotologin() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || isLoggedIn === "false") {
        document.getElementById('login-form').style.display = "flex";
        document.getElementById('logout').style.display = "none";
        document.body.classList.add('overflow-hidden');
        document.getElementById('wrapper').classList.add('select-none');
        document.querySelector('footer').classList.add('select-none');

        document.querySelectorAll('.directory a, .directory input').forEach(function (element) {
            element.setAttribute('tabindex', '-1');
        });

    } else {
        document.getElementById('login-form').style.display = "none";
        document.getElementById('logout').style.display = "block";

        document.querySelectorAll('.directory a, .directory input').forEach(function (element) {
            element.setAttribute('tabindex', '0');
        });
    }
}

document.addEventListener("DOMContentLoaded", gotologin);

document.getElementById("logout").addEventListener("click", function () {
    document.getElementById('logout').classList.add("succeed");
    setTimeout(function () {
        document.getElementById('logout').classList.remove("succeed");
        document.getElementById('logout').style.display = "none";
        localStorage.removeItem("isLoggedIn");
        gotologin();
    }, 700);
});

// —[ Toastify ]———————————————————————————————————————————————————————————————————————————————————————————————————

function showToast(message, bgColor = "#FFF", color = "#0D0D0D", duration = 2750) {
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
            color: color,
            border: "solid 1px #CCC",
            borderRadius: "12px",
            paddingBlock: "8px",
            paddingInline: "16px",
            zIndex: 100,
        }
    }).showToast();
}

// —[ Go Black ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.getElementById("goBack").addEventListener("click", function () {
    if (!document.referrer || document.referrer === window.location.href) {
        window.location.href = "/";
    } else {
        window.history.back();
    }
});