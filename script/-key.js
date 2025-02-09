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
<svg width=16 height=16><path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"></path></svg>
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
`, document.getElementById("passwordInput").addEventListener("focus", function() {
    document.querySelector(".goBack").classList.add("succeed")
}), document.getElementById("passwordInput").addEventListener("blur", function() {
    document.querySelector(".goBack").classList.remove("succeed")
}), document.getElementById("passwordInput").addEventListener("keypress", function(t) {
    "Enter" === t.key && processLogin()
});
var maxAttempts = 3,
    attempts = 0;

function processLogin() {
    var t = document.getElementById("passwordInput").value,
        e = document.getElementById("output");
    "" === t ? (e.style.opacity = "1", e.innerHTML = "ใส่ข้อมูลเพื่อเข้าสู่ระบบ", setTimeout(function() {
        e.style.opacity = "0"
    }, 1e3)) : "Centered101" === t || "3130" === t ? (passwordInput.value = "", e.style.opacity = "1", e.innerHTML = "ไม่อนุมัติ!", document.getElementById("passwordInput").style.borderColor = "#FF7070", meta.content = "#FF7070", setTimeout(function() {
        meta.content = "#409EFE", e.style.opacity = "0"
    }, 1e3), document.querySelector(".content-form").classList.add("succeed"), setTimeout(function() {
        e.style.opacity = "0", document.body.style.overflow = "hidden", document.body.innerHTML = `
<div class="flex justify-center items-center flex-col gap-4 h-[100vh]">
<svg class=fill-[#409EFE] width=24 height=24 xmlns=http://www.w3.org/2000/svg fill-rule=evenodd clip-rule=evenodd><path d="M24 22h-24v-20h7c1.695 1.942 2.371 3 4 3h13v17zm-17.917-18h-4.083v16h20v-13h-11c-2.339 0-3.537-1.388-4.917-3zm9.917 14h-8v-5h1v-1c0-1.656 1.344-3 3-3s3 1.344 3 3v1h1v5zm-5-6v1h2v-1c0-.552-.448-1-1-1s-1 .448-1 1z"/></svg>
<p class="text-lg font-black">ไม่ใช้ password นี้</p>
<a href=/ >
<button class="animationShow w-40 bg-[#DFDFDF] border border-[#CCC] rounded truncate p-2 active:opacity-75">กลับไป</button>
</a>
</div>
`
    }, 300)) : "08389" === t || "36887" === t || "20102011016" === t || "66201020151" === t || "151" === t ? (passwordInput.value = "", e.style.opacity = "1", e.innerHTML = "ล็อกอินสำเร็จ!", document.body.classList.remove("overflow-hidden"), setTimeout(function() {
        e.style.opacity = "0", window.location.reload()
    }, 300), localStorage.setItem("isLoggedIn", "true"), document.querySelector(".content-form").classList.add("succeed"), setTimeout(function() {
        e.style.opacity = "0", document.getElementById("login-form").style.display = "none", document.getElementById("logout-section").style.display = "block"
    }, 300)) : ++attempts == maxAttempts ? (document.querySelector(".content-form").classList.add("succeed"), e.style.opacity = "1", e.innerHTML = "ล็อกอินล้มเหลว นำทางออกจากเว็บไซต์", meta.content = "#FF7070", setTimeout(function() {
        meta.content = "#409EFE", e.style.opacity = "0", window.location.href = "https://github.com/centered101", document.getElementById("passwordInput").style.borderColor = "#FF7070"
    }, 1e3)) : (passwordInput.value = "", e.style.opacity = "1", e.innerHTML = "ล็อกอินล้มเหลว โปรดตรวจสอบรหัสผ่าน " + attempts + ":" + maxAttempts, document.getElementById("passwordInput").style.borderColor = "#FF7070", meta.content = "#FF7070", setTimeout(function() {
        meta.content = "#409EFE", e.style.opacity = "0", document.getElementById("passwordInput").style.borderColor = "#CCC"
    }, 1e3))
}

function togglePassword() {
    var t = document.getElementById("passwordInput"),
        e = document.getElementById("togglePassword"),
        o = document.getElementById("output");
    "password" === t.type ? (t.type = "text", o.style.opacity = "1", o.innerHTML = "แสดง รหัสผ่าน", e.innerHTML = "แสดง รหัสผ่าน", setTimeout(function() {
        o.style.opacity = "0"
    }, 1e3)) : (t.type = "password", o.style.opacity = "1", o.innerHTML = "ซ่อน รหัสผ่าน", e.innerHTML = "ซ่อน รหัสผ่าน", setTimeout(function() {
        o.style.opacity = "0"
    }, 1e3))
}

function alert_logout() {
    document.getElementById("alert-logout").style.display = "flex", document.getElementById("output").style.opacity = "1", document.getElementById("output").innerHTML = "ยืนยันการออกจากระบบ", setTimeout(function() {
        document.getElementById("output").style.opacity = "0"
    }, 1e3)
}

function cancel_logout() {
    document.getElementById("alert-logout").classList.add("succeed"), document.getElementById("output").style.opacity = "1", document.getElementById("output").innerHTML = "ยกเลิกการออกจากระบบ", setTimeout(function() {
        document.getElementById("output").style.opacity = "0", document.getElementById("alert-logout").classList.remove("succeed"), document.getElementById("alert-logout").style.display = "none"
    }, 1e3)
}

function logout() {
    document.body.classList.add("overflow-hidden"), document.getElementById("logout-section").style.display = "none", document.getElementById("alert-logout").classList.add("succeed"), document.getElementById("output").style.opacity = "1", document.getElementById("output").innerHTML = "ออกจากระบบ", setTimeout(function() {
        document.getElementById("output").style.opacity = "0", document.getElementById("alert-logout").classList.remove("succeed"), document.getElementById("alert-logout").style.display = "none", localStorage.removeItem("isLoggedIn"), window.location.reload(), document.getElementById("login-form").style.display = "flex", document.querySelector(".content-form").classList.remove("succeed")
    }, 1e3)
}
document.getElementById("loginButton").addEventListener("click", processLogin), window.onload = function() {
    "true" === localStorage.getItem("isLoggedIn") ? (document.getElementById("login-form").style.display = "none", document.getElementById("logout-section").style.display = "block", document.querySelectorAll(".directory a, .directory input").forEach(function(t) {
        t.setAttribute("tabindex", "0")
    })) : (document.body.classList.add("overflow-hidden"), document.querySelectorAll(".directory a, .directory input").forEach(function(t) {
        t.setAttribute("tabindex", "-1")
    }))
};