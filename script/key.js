const style = document.createElement("style");
(style.innerHTML = `        
.succeed{opacity:0;transform:translatex(100%);transition:opacity 700ms ease-in-out,transform 700ms ease-in-out}
`),
    document.head.appendChild(style),
    (document.body.innerHTML += `
<script src=https:cdn.tailwindcss.com></script><div id=output class="absolute top-1/4 w-fit bg-[#EFEFEF] text-center border border-[#CCC] rounded shadow-lg opacity-0 transition-opacity ease-in-out duration-300 -translate-y-1/2 left-1/2 transform -translate-x-1/2 p-2 z-50"></div><div id=login-form class="fixed bg-[#000] bg-opacity-75 backdrop-blur flex flex-col items-center justify-center gap-8 inset-0 z-40"><div class="animationShow-x content-form w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg"><div class="bg-[#DFDFDF] p-2 shadow"><p class="text-center text-lg font-black">คุณจำเป็นต้องมีรหัสผ่านในการเข้าถึงข้อมูลสำคัญ</p></div><div class="space-y-6 p-6"><p>โปรดลงชื่อเข้าใช้เพื่อดำเนินการต่อ</p><div class="flex gap-4 items-center"><input type=password id=passwordInput placeholder=รหัสผ่าน class="flex-grow border border-[#CCC] rounded p-2 focus:outline-none focus:shadow-none"><button id=togglePassword onclick=togglePassword() class="w-32 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">แสดงรหัสผ่าน</button></div><button id=loginButton class="w-full bg-[#409EFE] text-[#FFF] rounded p-2 active:opacity-75 transition-colors">ล็อกอิน</button></div></div><a href=/ ><button class="animationShow w-40 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">กลับไป</button></a></div><button hidden id=logout-section onclick=alert_logout() class="-animationShow-x bg-[#FF7070] text-[#FFF] fixed bottom-8 right-8 rounded p-2 opacity-80 transition-opacity ease-in-out duration-300 hover:opacity-90 z-40"><svg xmlns=http://www.w3.org/2000/svg height=24 viewBox="0 -960 960 960" width=24 fill=#0D0D0D><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></button><div hidden id=alert-logout class="fixed bg-[#000] bg-opacity-75 justify-center items-center inset-0 z-40"><div class="animationShow-x w-full max-w-md bg-[#EFEFEF] border border-[#CCC] rounded shadow-lg"><div class="bg-[#DFDFDF] p-2 shadow"><p class="text-center text-lg font-black">โปรดยืนยันการออกจากระบบของคุณ</p></div><div class="space-y-6 p-6"><p>โปรดยืนยันลงชื่อออก</p><div class="flex gap-4"><button onclick=cancel_logout() class="w-full bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">ยกเลิก</button><button onclick=logout() class="w-full bg-[#FF7070] text-[#FFF] rounded p-2 transition-colors active:opacity-75">ลงชื่อออก</button></div></div></div></div>
`),
    document.getElementById("passwordInput").addEventListener("focus", function () {
        document.querySelector(".goBack").classList.add("succeed");
    }),
    document.getElementById("passwordInput").addEventListener("blur", function () {
        document.querySelector(".goBack").classList.remove("succeed");
    }),
    document.getElementById("passwordInput").addEventListener("keypress", function (t) {
        "Enter" === t.key && processLogin();
    });
var maxAttempts = 3,
    attempts = 0;

function processLogin() {
    var t = document.getElementById("passwordInput"),
        e = t.value.trim(),
        o = document.getElementById("output");

    if (e === "") {
        o.style.opacity = "1";
        o.innerHTML = "กรุณากรอกข้อมูล";
        t.style.borderColor = "#FF7070";
        setTimeout(function () {
            o.style.opacity = "0";
            t.style.borderColor = "#CCC";
        }, 1000);
        return;
    }

    if (["08389", "36887", "20102011016", "66201020151", "151"].includes(e)) {
        t.value = "";
        o.style.opacity = "1";
        o.innerHTML = "ล็อกอินสำเร็จ!";
        document.body.classList.remove("overflow-hidden");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginTime", Date.now()); // บันทึกเวลาล็อกอิน
        document.querySelector(".content-form").classList.add("succeed");

        setTimeout(function () {
            o.style.opacity = "0";
            document.getElementById("login-form").style.display = "none";
            document.getElementById("logout-section").style.display = "block";
        }, 300);
    } else {
        attempts++;
        if (attempts === maxAttempts) {
            document.querySelector(".content-form").classList.add("succeed");
            o.style.opacity = "1";
            o.innerHTML = "ล็อกอินล้มเหลว นำทางออกจากเว็บไซต์";
            t.style.borderColor = "#FF7070";
            setTimeout(function () {
                window.location.href = "https://github.com/centered101";
            }, 1000);
        } else {
            t.value = "";
            o.style.opacity = "1";
            o.innerHTML = `ล็อกอินล้มเหลว ${attempts}:${maxAttempts}`;
            t.style.borderColor = "#FF7070";
            setTimeout(function () {
                o.style.opacity = "0";
                t.style.borderColor = "#CCC";
            }, 1000);
        }
    }
}

function logout() {
    document.getElementById("alert-logout").classList.add("succeed");
    document.getElementById("logout-section").style.display = "none";
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginTime");

    setTimeout(function () {
        document.getElementById("alert-logout").classList.remove("succeed");
        window.location.href = '/';
    }, 1000);
}

function togglePassword() {
    var t = document.getElementById("passwordInput"),
        e = document.getElementById("togglePassword");
    if (t.type === "password") {
        t.type = "text";
        e.innerHTML = "ซ่อน รหัสผ่าน";
    } else {
        t.type = "password";
        e.innerHTML = "แสดง รหัสผ่าน";
    }
}

function alert_logout() {
    document.body.classList.add("overflow-hidden");
    document.getElementById("alert-logout").style.display = "flex";
}

function cancel_logout() {
    document.getElementById("alert-logout").classList.add("succeed");
    setTimeout(function () {
        document.getElementById("alert-logout").classList.remove("succeed");
        document.getElementById("alert-logout").style.display = "none";
    }, 1000);
}