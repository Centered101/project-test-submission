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
        class="min-w-32 absolute top-1/4 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-[#EFEFEF] border border-[#CCCCCC] rounded shadow-lg text-center p-2 opacity-0 transition-opacity duration-500 z-50">
</div>
<div id="login-form" class="fixed bg-black bg-opacity-75 backdrop-blur flex items-center justify-center flex-col inset-0 z-40">
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
                    class="flex-grow border border-[#CCCCCC] rounded p-2 focus:outline-none focus:shadow-none">
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
    <a href="/">
        <button class="animationShow goBack w-40 bg-[#DFDFDF] border border-[#CCCCCC] rounded truncate p-2 active:opacity-75">กลับไป</button>
    </a>
</div>
<button id="logout-section" onclick="alert_logout()" class="-animationShow-x bg-[#FF7070] text-white fixed bottom-5 right-5 rounded p-2 z-40 hidden opacity-80 hover:opacity-90 transition-opacity ease-in-out">
    <svg width="16" height="16"><path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"></path></svg>
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
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a class="hover:opacity-75 bg-[#F5F5F5] odd:bg-[#DFDFDF] md:bg-[#DFDFDF]" href="/images/"><li class="border border-[#CCCCCC] rounded py-1 px-2">images</li></a>
                <a class="hover:opacity-75 bg-[#F5F5F5] odd:bg-[#DFDFDF] md:bg-[#DFDFDF]" href="/images/Video/"><li class="border border-[#CCCCCC] rounded py-1 px-2">images/Video</li></a>
                <a class="hover:opacity-75 bg-[#F5F5F5] odd:bg-[#DFDFDF] md:bg-[#DFDFDF]" href="/script/"><li class="border border-[#CCCCCC] rounded py-1 px-2">script</li></a>
                <a class="hover:opacity-75 bg-[#F5F5F5] odd:bg-[#DFDFDF] md:bg-[#DFDFDF]" href="/style/"><li class="border border-[#CCCCCC] rounded py-1 px-2">style</li></a>
                <a class="hover:opacity-75 bg-[#F5F5F5] odd:bg-[#DFDFDF] md:bg-[#DFDFDF]" href="/ตารางเรียน/"><li class="border border-[#CCCCCC] rounded py-1 px-2">ตารางเรียน</li></a>
            </ul>
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
    } else if (password === "Centered101" || password === "3130") {
        passwordInput.value = "";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "ไม่อนุมัติ!";
        document.getElementById("passwordInput").style.borderColor = "#FF7070";
        meta.content = '#FF7070';
        setTimeout(function () {
            meta.content = '#409EFE';
            texDeploy.style.opacity = "0";
        }, 1000);

        // ซ่อนฟอร์มล็อกอินและแสดงเนื้อหา
        document.querySelector('.content-form').classList.add("succeed")
        setTimeout(function () {
            texDeploy.style.opacity = "0";
            document.body.style.overflow = "hidden";
            document.body.innerHTML = `
<div class="flex justify-center items-center flex-col gap-4 h-[100vh]">
    <svg class="fill-[#409EFE]" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h7c1.695 1.942 2.371 3 4 3h13v17zm-17.917-18h-4.083v16h20v-13h-11c-2.339 0-3.537-1.388-4.917-3zm9.917 14h-8v-5h1v-1c0-1.656 1.344-3 3-3s3 1.344 3 3v1h1v5zm-5-6v1h2v-1c0-.552-.448-1-1-1s-1 .448-1 1z"/></svg>
    <p class="text-lg font-black">ไม่ใช้ password นี้</p>
    <a href="/">
        <button class="animationShow w-40 bg-[#DFDFDF] border border-[#CCCCCC] rounded truncate p-2 active:opacity-75">กลับไป</button>
    </a>
</div>
`;
        }, 300);
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
    var texDeploy = document.getElementById("output");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "แสดง รหัสผ่าน";
        toggleButton.innerHTML = "แสดง รหัสผ่าน";
        setTimeout(function () {
            texDeploy.style.opacity = "0";
        }, 1000);
    } else {
        passwordInput.type = "password";
        texDeploy.style.opacity = "1";
        texDeploy.innerHTML = "ซ่อน รหัสผ่าน";
        toggleButton.innerHTML = "ซ่อน รหัสผ่าน";
        setTimeout(function () {
            texDeploy.style.opacity = "0";
        }, 1000);
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
    document.getElementById("output").style.opacity = "1";
    document.getElementById("output").innerHTML = "ยืนยันการออกจากระบบ";
    setTimeout(function () {
        document.getElementById("output").style.opacity = "0";
    }, 1000);
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
    document.body.classList.add('overflow-hidden');
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
        document.getElementById('login-form').style.display = "flex";
        document.querySelector('.content-form').classList.remove("succeed");
    }, 1000);
}