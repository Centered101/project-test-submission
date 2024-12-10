const style = document.createElement('style');
style.innerHTML = `        
.succeed {
    opacity: 0;
    transform: translatex(100%);
    transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}
`;
document.head.appendChild(style);

// เพิ่ม HTML เข้าไปใน body
document.body.innerHTML += `
<!-- แจ้งเตือน -->
<div id="output"
        class="min-w-32 absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-[#EFEFEF] border border-[#CCCCCC] rounded shadow-lg text-center p-2 opacity-0 transition-opacity duration-500 z-50">
</div>
<div id="login-form" class="fixed bg-black bg-opacity-75 backdrop-blur flex items-center justify-center inset-0 z-40">
    <!-- ฟอร์มล็อกอิน -->
    <div
        class="animationShow-x content-form w-full max-w-md bg-[#EFEFEF] border border-[#CCCCCC] rounded shadow-lg m-2">
        <div class="bg-[#DFDFDF] space-y-2 p-2 shadow">
            <p class="text-center text-lg font-bold">
                คุณจำเป็นต้องมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ
            </p>
        </div>
        <div class="space-y-5 p-5">
            <p>รหัสนักศึกษา ม.1-3 รร.พระนารายณ์ ของ Centered101</p>
            <div class="flex gap-4 items-center">
                <input type="password" id="passwordInput" placeholder="รหัสผ่าน"
                    class="flex-grow border border-[#CCCCCC] rounded p-2 focus:outline-none">
                <button id="togglePassword" onclick="togglePassword()"
                    class="w-32 bg-[#DFDFDF] border border-[#CCCCCC] rounded truncate p-2 active:opacity-75">
                    แสดงรหัสผ่าน
                </button>
            </div>
            <button id="loginButton"
                class="w-full bg-[#409EFE] text-white rounded p-2 active:opacity-75 transition-colors">
                ล็อกอิน
            </button>
        </div>
    </div>
</div>
<button id="logout-section" onclick="alert_logout()"
    class="-animationShow-x bg-[#FF7070] text-white text-base md:text-lg fixed bottom-5 right-5 rounded p-2 z-40 hidden">
    <p id="logout-text" class="flex items-center gap-2">
        ออกจากระบบ
        <img src="/images/img/exit.png" alt="Icon" draggable="false" oncontextmenu="return false" class="w-4 h-4 mg:w-5 md:h-5">
    </p>
</button>
<div id="alert-logout" class="fixed bg-black bg-opacity-75 hidden items-center justify-center inset-0 z-40">
    <div
        class="animationShow-x content-form w-full max-w-md bg-[#EFEFEF] border border-[#CCCCCC] rounded shadow-lg m-2">
        <div class="bg-[#DFDFDF] space-y-2 p-2 shadow">
            <p class="text-center text-lg font-bold">
                คุณมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ
            </p>
        </div>
        <div class="space-y-5 p-5">
        <p>คุณมี รหัสนักศึกษา ม.1-3 รร.พระนารายณ์ ของ Centered101</p>
        <p>หน้านี้สำหลับสมาชิก</p>
            <div class="flex gap-4">
                <button onclick="cancel_logout()"
                    class="w-full bg-[#DFDFDF] border border-[#CCCCCC] rounded truncate p-2 active:opacity-75">
                    ยกเลิก
                </button>
                <button onclick="logout()"
                    class="w-full bg-[#FF7070] text-white rounded p-2 active:opacity-75 transition-colors">
                    ออกจากระบบ
                </button>
            </div>
        </div>
    </div>
</div>
`;

setTimeout(function () {
    document.getElementById('logout-text').innerHTML = '<img src="/images/img/exit.png" alt="Icon" draggable="false" oncontextmenu="return false" class="w-4 h-4 mg:w-5 md:h-5">';
}, 4000);

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
        }, 4000);
    } else if (password === "36887") {
        passwordInput.value = "";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "ล็อกอินสำเร็จ!";
        setTimeout(function () {
            texDeploy.style.opacity = "0";
        }, 4000);

        // บันทึกสถานะการล็อกอินลงใน Local Storage
        localStorage.setItem("isLoggedIn", "true");

        // ซ่อนฟอร์มล็อกอินและแสดงเนื้อหา
        document.querySelector('.content-form').classList.add("succeed")
        setTimeout(function () {
            texDeploy.style.opacity = "0";
            document.getElementById('login-form').style.display = "none";
            document.getElementById('search').style.filter = "none";
            document.getElementById('wrapper').style.filter = "none";
            document.querySelector('footer').style.filter = "none";
            document.getElementById('logout-section').style.display = "block";
        }, 1000);
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            document.querySelector('.content-form').classList.add("succeed")
            texDeploy.style.opacity = "1";
            texDeploy.innerHTML = "ล็อกอินล้มเหลว นำทางออกจากเว็บไซต์";
            setTimeout(function () {
                texDeploy.style.opacity = "0";
                window.location.href = "https://github.com/centered101";
            }, 4000);
        } else {
            passwordInput.value = "";
            texDeploy.style.opacity = "1";
            texDeploy.innerHTML = "ล็อกอินล้มเหลว โปรดตรวจสอบรหัสผ่าน " + attempts + ":" + maxAttempts;
            setTimeout(function () {
                texDeploy.style.opacity = "0";
            }, 4000);
        }
    }
}

document.getElementById("loginButton").addEventListener("click", processLogin);

function togglePassword() {
    var passwordInput = document.getElementById("passwordInput");
    var toggleButton = document.getElementById("togglePassword");
    var texDeploy = document.getElementById("output");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "แสดง รหัสผ่าน";
        toggleButton.innerHTML = "แสดง รหัสผ่าน";
        setTimeout(function () {
            texDeploy.style.opacity = "0";
        }, 4000);
    } else {
        passwordInput.type = "password";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "ซ่อน รหัสผ่าน";
        toggleButton.innerHTML = "ซ่อน รหัสผ่าน";
        setTimeout(function () {
            texDeploy.style.opacity = "0";
        }, 4000);
    }
}

// ตรวจสอบสถานะล็อกอินตอนโหลดหน้าเว็บ
window.onload = function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        document.getElementById('login-form').style.display = "none";
        document.getElementById('search').style.filter = "none";
        document.getElementById('wrapper').style.filter = "none";
        document.querySelector('footer').style.filter = "none";

        // แสดงปุ่ม Logout
        document.getElementById('logout-section').style.display = "block";
    }
};

function alert_logout() {
    document.getElementById('alert-logout').style.display = 'flex';
    document.getElementById("output").style.opacity = "1";
    document.getElementById("output").innerHTML = "ยืนยันการออกจากระบบ";
    setTimeout(function () {
        document.getElementById("output").style.opacity = "0";
    }, 4000);
}

function cancel_logout() {
    document.getElementById('alert-logout').classList.add("succeed");
    document.getElementById("output").style.opacity = "1";
    document.getElementById("output").innerHTML = "ยกเลิกการออกจากระบบ";
    setTimeout(function () {
        document.getElementById("output").style.opacity = "0";
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
    }, 1000);
}

function logout() {
    // ซ่อนปุ่ม Logout
    document.getElementById('logout-section').style.display = "none";
    document.getElementById('alert-logout').classList.add("succeed");
    document.getElementById("output").style.opacity = "1";
    document.getElementById("output").innerHTML = "ออกจากระบบ";
    setTimeout(function () {
        document.getElementById("output").style.opacity = "0";
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
        localStorage.removeItem("isLoggedIn");
        // รีเฟรชหน้าเว็บเพื่อแสดงฟอร์มล็อกอิน
        window.location.reload();
    }, 1000);
}