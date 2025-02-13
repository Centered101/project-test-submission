const style = document.createElement("style");
style.innerHTML = `        
.succeed{opacity:0;transform:translatex(100%);transition:opacity 1s ease-in-out,transform 1s ease-in-out}
`, document.head.appendChild(style), document.body.innerHTML += `
<div id=output class="min-w-32 absolute top-1/4 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg text-center p-2 opacity-0 transition-opacity duration-500 z-50">
</div>
<div id=login-form class="fixed bg-black bg-opacity-75 backdrop-blur flex items-center justify-center flex-col inset-0 z-40">
<div class="animationShow-x content-form w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg m-2">
<div class="bg-[#DFDFDF] space-y-2 p-2 shadow">
<p class="text-center text-lg font-bold">
คุณจำเป็นต้องมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ
</p>
</div>
<div class="space-y-5 p-5">
<p>โปรดลงชื่อเข้าใช้เพื่อดำเนินการต่อ</p>
<div class="flex gap-4 items-center">
<input type=password id=passwordInput placeholder=รหัสผ่าน class="flex-grow border border-[#CCC] rounded p-2 focus:outline-none focus:shadow-none">
<button id=togglePassword onclick=togglePassword() class="w-32 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">
แสดงรหัสผ่าน
</button>
</div>
<button id=loginButton class="w-full bg-[#409EFE] text-white rounded p-2 active:opacity-75 transition-colors">
ล็อกอิน
</button>
</div>
</div>
<a href=/ >
<button class="animationShow goBack w-40 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">กลับไป</button>
</a>
</div>
<button id=logout-section onclick=alert_logout() class="-animationShow-x bg-[#FF7070] text-white fixed bottom-5 right-5 rounded p-2 z-40 hidden opacity-80 hover:opacity-90 transition-opacity ease-in-out">
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
</button>
<div id=alert-logout class="fixed bg-black bg-opacity-75 hidden items-center justify-center inset-0 z-40">
<div class="animationShow-x content-form w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg m-2">
<div class="bg-[#DFDFDF] space-y-2 p-2 shadow">
<p class="text-center text-lg font-bold">
คุณมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ
</p>
</div>
<div class="space-y-5 p-5">
<p>โปรดยืนยันการออกจากระบบของคุณ</p>
<div class="flex gap-4">
<button onclick=cancel_logout() class="w-full bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">
ยกเลิก
</button>
<button onclick=logout() class="w-full bg-[#FF7070] text-white rounded p-2 active:opacity-75 transition-colors">
ลงชื่อออก
</button>
</div>
</div>
</div>
</div>
`;

document.getElementById("passwordInput").addEventListener("focus", function () {
    document.querySelector(".goBack").classList.add("succeed");
});

document.getElementById("passwordInput").addEventListener("blur", function () {
    document.querySelector(".goBack").classList.remove("succeed");
});

document.getElementById("passwordInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        processLogin();
    }
}); // ฟังก์ชันสำหรับปุ่ม Enter

var maxAttempts = 3;
var attempts = 0;

function processLogin() {
    var password = document.getElementById("passwordInput").value;
    var texDeploy = document.getElementById("output");

    if (password === "") {
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "ใส่ข้อมูลเพื่อเข้าสู่ระบบ";
        setTimeout(function () {
            texDeploy.style.opacity = "0";
        }, 1000);
    } else if (password === "08389" || password === "36887" || password === "20102011016" || password === "66201020151" || password === "151") {
        passwordInput.value = "";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "ล็อกอินสำเร็จ!";
        document.body.classList.remove('overflow-hidden');
        setTimeout(function () {
            texDeploy.style.opacity = "0";
            window.location.reload();
        }, 300);

        // บันทึกสถานะการล็อกอินลงใน Local Storage
        localStorage.setItem("isLoggedIn", "true");

        // ซ่อนฟอร์มล็อกอินและแสดงเนื้อหา
        document.querySelector('.content-form').classList.add("succeed")
        setTimeout(function () {
            texDeploy.style.opacity = "0";
            document.getElementById('login-form').style.display = "none";
            document.getElementById('logout-section').style.display = "block";
        }, 300);
    } else {
        attempts++;
        if (attempts == maxAttempts) {
            document.querySelector('.content-form').classList.add("succeed")
            texDeploy.style.opacity = "1";
            texDeploy.innerHTML = "ล็อกอินล้มเหลว นำทางออกจากเว็บไซต์";
            meta.content = '#FF7070';
            setTimeout(function () {
                meta.content = '#409EFE';
                texDeploy.style.opacity = "0";
                window.location.href = "https://github.com/centered101";
                document.getElementById("passwordInput").style.borderColor = "#FF7070";
            }, 1000);
        } else {
            passwordInput.value = "";
            texDeploy.style.opacity = "1";
            texDeploy.innerHTML = "ล็อกอินล้มเหลว โปรดตรวจสอบรหัสผ่าน " + attempts + ":" + maxAttempts;
            document.getElementById("passwordInput").style.borderColor = "#FF7070";
            meta.content = '#FF7070';
            setTimeout(function () {
                meta.content = '#409EFE';
                texDeploy.style.opacity = "0";
                document.getElementById("passwordInput").style.borderColor = "#CCCCCC";
            }, 1000);
        }
    }
}

document.getElementById("loginButton").addEventListener("click", processLogin);

function togglePassword() {
    var passwordInput = document.getElementById("passwordInput");
    var toggleButton = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.innerHTML = "ซ่อน รหัสผ่าน";
    } else {
        passwordInput.type = "password";
        toggleButton.innerHTML = "แสดง รหัสผ่าน";
    }
}

// ตรวจสอบสถานะล็อกอินตอนโหลดหน้าเว็บ
window.onload = function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        document.getElementById('login-form').style.display = "none";
        document.getElementById('logout-section').style.display = "block";
        document.querySelectorAll('.directory a, .directory input').forEach(function (element) {
            element.setAttribute('tabindex', '0');
        });
    } else {
        document.body.classList.add('overflow-hidden');
        document.querySelectorAll('.directory a, .directory input').forEach(function (element) {
            element.setAttribute('tabindex', '-1');

        });
    }
};

function alert_logout() {
    document.getElementById('alert-logout').style.display = 'flex';
}

function cancel_logout() {
    document.getElementById('alert-logout').classList.add("succeed");
    setTimeout(function () {
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
    }, 1000);
}

function logout() {
    document.body.classList.add('overflow-hidden');
    document.getElementById('logout-section').style.display = "none";
    document.getElementById('alert-logout').classList.add("succeed");
    setTimeout(function () {
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
        localStorage.removeItem("isLoggedIn");
        // รีเฟรชหน้าเว็บเพื่อแสดงฟอร์มล็อกอิน
        window.location.reload();
        document.getElementById('login-form').style.display = "flex";
        document.querySelector('.content-form').classList.remove("succeed");
    }, 1000);
}
