const style = document.createElement("style");
(style.innerHTML = `        
.succeed{opacity:0;transform:translatex(100%);transition:opacity 700ms ease-in-out,transform 700ms ease-in-out}
`),
    document.head.appendChild(style),
    (document.body.innerHTML += `
<script src=https:cdn.tailwindcss.com></script><div id=login-form class="fixed bg-[#000] bg-opacity-75 backdrop-blur flex flex-col items-center justify-center gap-8 inset-0 z-40"><div class="animationShow-x content-form w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg"><div class="bg-[#DFDFDF] p-2 shadow"><p class="text-center text-lg font-black">คุณจำเป็นต้องมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ</p></div><div class="space-y-6 p-6"><p>โปรดลงชื่อเข้าใช้เพื่อดำเนินการต่อ</p><div class="flex gap-4 items-center"><input type=password id=passwordInput placeholder=รหัสผ่าน class="flex-grow border border-[#CCC] rounded p-2 focus:outline-none focus:shadow-none"><button id=togglePassword onclick=togglePassword() class="w-32 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">แสดงรหัสผ่าน</button></div><button id=loginButton class="w-full bg-[#409EFE] text-[#FFF] rounded p-2 active:opacity-75 transition-colors">ล็อกอิน</button></div></div><a href=/ ><button class="animationShow w-40 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">กลับไป</button></a></div><button hidden id=logout-section onclick=alert_logout() class="-animationShow-x bg-[#FF7070] text-[#FFF] fixed bottom-8 right-8 rounded p-2 opacity-80 transition-opacity ease-in-out duration-300 hover:opacity-90 z-40"><svg xmlns=http://www.w3.org/2000/svg height=24 viewBox="0 -960 960 960" width=24 fill=#0D0D0D><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></button><div hidden id=alert-logout class="fixed bg-[#000] bg-opacity-75 justify-center items-center inset-0 z-40"><div class="animationShow-x w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg"><div class="bg-[#DFDFDF] p-2 shadow"><p class="text-center text-lg font-black">โปรดยืนยันการออกจากระบบของคุณ</p></div><div class="space-y-6 p-6"><p>โปรดยืนยันลงชื่อออก</p><div class="flex gap-4"><button onclick=cancel_logout() class="w-full bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">ยกเลิก</button><button onclick=logout() class="w-full bg-[#FF7070] text-[#FFF] rounded p-2 transition-colors active:opacity-75">ลงชื่อออก</button></div></div></div></div>
`),

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

    if (password === "") {
        showToast("ใส่ข้อมูลเพื่อเข้าสู่ระบบ");
    } else if (password === "Centered101" || password === "3130") {
        passwordInput.value = "";
        showToast("ไม่อนุมัติ");
        document.getElementById("passwordInput").style.borderColor = "#FF7070";
        meta.content = '#FF7070';
        setTimeout(function () {
            meta.content = '#409EFE';
        }, 700);

        // ซ่อนฟอร์มล็อกอินและแสดงเนื้อหา
        document.querySelector('.content-form').classList.add("succeed")
        setTimeout(function () {
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
        showToast("ล็อกอินสำเร็จ!");
        document.body.classList.remove('overflow-hidden');
        setTimeout(function () {
            window.location.reload();
        }, 300);

        // บันทึกสถานะการล็อกอินลงใน Local Storage
        localStorage.setItem("isLoggedIn", "true");

        // ซ่อนฟอร์มล็อกอินและแสดงเนื้อหา
        document.querySelector('.content-form').classList.add("succeed")
        setTimeout(function () {
            document.getElementById('login-form').style.display = "none";
            document.getElementById('logout-section').style.display = "block";
        }, 300);
    } else {
        attempts++;
        if (attempts == maxAttempts) {
            document.querySelector('.content-form').classList.add("succeed")
            showToast("ล็อกอินล้มเหลว นำทางออกจากเว็บไซต์");
            meta.content = '#FF7070';
            setTimeout(function () {
                meta.content = '#409EFE';
                window.location.href = "https://github.com/centered101";
                document.getElementById("passwordInput").style.borderColor = "#FF7070";
            }, 700);
        } else {
            passwordInput.value = "";
            showToast("ล็อกอินล้มเหลว โปรดตรวจสอบรหัสผ่าน " + attempts + ":" + maxAttempts);
            document.getElementById("passwordInput").style.borderColor = "#FF7070";
            meta.content = '#FF7070';
            setTimeout(function () {
                meta.content = '#409EFE';
                document.getElementById("passwordInput").style.borderColor = "#CCC";
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
    showToast("ยืนยันการออกจากระบบ");
}

function cancel_logout() {
    document.getElementById('alert-logout').classList.add("succeed");
    showToast("ยกเลิกการออกจากระบบ");
    setTimeout(function () {
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
    }, 700);
}

function logout() {
    document.body.classList.add('overflow-hidden');
    document.getElementById('logout-section').style.display = "none";
    document.getElementById('alert-logout').classList.add("succeed");
    showToast("ออกจากระบบ");
    setTimeout(function () {
        document.getElementById('alert-logout').classList.remove("succeed");
        document.getElementById('alert-logout').style.display = "none";
        localStorage.removeItem("isLoggedIn");
        // รีเฟรชหน้าเว็บเพื่อแสดงฟอร์มล็อกอิน
        window.location.reload();
        document.getElementById('login-form').style.display = "flex";
        document.querySelector('.content-form').classList.remove("succeed");
    }, 700);
}