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

}// —[ Progress Bar ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML +=
    `
<div id="progressbar" role="progressbar" aria-hidden="true" class="fixed inset-x-0 top-0 left-0 z-50 h-1 opacity-0">
    <div class="h-full bg-gradient-to-r from-[#84D4FA] to-[#409EFE] transition-all duration-1000 ease-in-out w-0"></div>
</div>
`;

// Progress Bar

document.addEventListener("DOMContentLoaded", function () {
    var progressBar = document.getElementById('progressbar').firstElementChild;
    progressBar.style.width = "0";

    let progress = 0;
    let interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + "%";
        progressBar.parentElement.style.opacity = "1";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressBar.parentElement.style.opacity = "0";
            }, 500);
        }
    }, 25);
});

// —[ footer ]———————————————————————————————————————————————————————————————————————————————————————————————————

const screenSize = `Your screen size: ${window.innerWidth}W ⨉ ${window.innerHeight}H`;

// document.querySelector("footer").innerHTML +=
document.body.innerHTML +=
    `
<style>
a.btn-github[data-v-14a7b7ba] {
        position: fixed;
        top: 0;
        right: 0;
        opacity: .8;
        transition: opacity 150ms linear;
        z-index: 1;
    }

    a.btn-github[data-v-14a7b7ba]:hover {
        opacity: .9
    }
</style>
<a class="-animationShow-x btn-github top-0 reft-0 opacity-80 transition-opacity z-10 hover:opacity-90" rel="noopener" target="_blank" aria-label="View source on GitHub"
    href="https://github.com/centered101" data-v-14a7b7ba="">
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 250 250" fill="#121212"
        data-v-14a7b7ba="">
        <path d="M0 0l115 115h15l12 27 108 108V0z" fill="#D7D7D7"></path>
        <path class="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"
            style="transform-origin: 130px 106px;"></path>
        <path class="octo-body"
            d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z">
        </path>
    </svg>
</a>
<footer role="complementary" class="truncate text-sm my-4 text-center">
<p>${screenSize}</p>
<p class="first-letter:text-[#409EFE] truncate">Version:
<span id="version"></span>
</p>
<p class="first-letter:text-[#409EFE] truncate">
&copy; ${new Date().getFullYear()}
<span title="Portfolio Centered101" class="text-[#409EFE] underline-offset-1">
<a href="https://portfolio-centered101.netlify.app/">Centered101</a>
</span>— All Rights Reserved.
</p>
</footer>
`;

// —[ Event ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML += `
<style>
    .hanging-decor {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
    }

    .hanging-decor img {
        width: 50px;
        height: 50px;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        border-radius: 8px;
        animation: swing 5000ms ease-in-out infinite;
    }

    @keyframes swing {
        0%,
        100% {
            transform: translateY(0) rotate(-10deg);
        }
        50% {
            transform: translateY(10px) rotate(10deg);
        }
    }
</style>

<div id="decor-container" class="hanging-decor opacity-80" style="display: none;">
    <img src="https://via.placeholder.com/50/FF7070/FFFFFF?text=" draggable="false" oncontextmenu="return false;" alt="Decor">
    <img src="https://via.placeholder.com/50/1Ed760/FFFFFF?text=" draggable="false" oncontextmenu="return false;" alt="Decor">
    <img src="https://via.placeholder.com/50/409EFE/FFFFFF?text=" draggable="false" oncontextmenu="return false;" alt="Decor">
</div>
`;

function checkTimeAndToggleDisplay() {
    const now = new Date();
    const month = now.getMonth();

    // แสดงเฉพาะเดือนธันวาคม (11)
    if (month === 11) {
        document.getElementById('decor-container').style.display = 'flex';
    } else {
        document.getElementById('decor-container').style.display = 'none';
    }
}

// ตรวจสอบทุก ๆ วินาที
setInterval(checkTimeAndToggleDisplay, 1000);


// —[ metadata HTML ]———————————————————————————————————————————————————————————————————————————————————————————————————

const meta = document.createElement('meta');
meta.name = 'theme-color';
meta.content = '#409EFE';
document.head.appendChild(meta);

// —[  ]———————————————————————————————————————————————————————————————————————————————————————————————————

// ฟังก์ชันหลักสำหรับการเลือกอิลิเมนต์จาก DOM
function $(id) {
    // ตรวจสอบว่า id เป็น string หรือไม่ ถ้าใช่จะใช้ document.getElementById ดึงอิลิเมนต์
    var el = 'string' == typeof id
        ? document.getElementById(id)
        : id;

    // เพิ่มเมธอด 'on' ให้กับอิลิเมนต์ สำหรับจับ event เช่น 'click', 'DOMContentLoaded'
    el.on = function (event, fn) {
        // แปลง 'content loaded' เป็น event ที่เบราว์เซอร์รองรับ เช่น 'DOMContentLoaded' หรือ 'load'
        if ('content loaded' == event) {
            event = window.attachEvent ? "load" : "DOMContentLoaded";
        }
        // ใช้ addEventListener ถ้ารองรับ ไม่เช่นนั้นจะใช้ attachEvent สำหรับเบราว์เซอร์เก่า
        el.addEventListener
            ? el.addEventListener(event, fn, false)
            : el.attachEvent("on" + event, fn);
    };

    // เมธอด 'all' เพื่อดึงอิลิเมนต์ทั้งหมดที่ตรงกับ selector ภายในอิลิเมนต์หลัก
    el.all = function (selector) {
        return $(el.querySelectorAll(selector));
    };

    // เมธอด 'each' สำหรับวนลูปผ่านอิลิเมนต์ในคอลเลคชัน
    el.each = function (fn) {
        for (var i = 0, len = el.length; i < len; ++i) {
            fn($(el[i]), i);
        }
    };

    // เมธอด 'getClasses' สำหรับดึงคลาสทั้งหมดของอิลิเมนต์เป็น array
    el.getClasses = function () {
        return this.getAttribute('class').split(/\s+/);
    };

    // เมธอด 'addClass' เพื่อเพิ่มคลาสใหม่ให้อิลิเมนต์
    el.addClass = function (name) {
        var classes = this.getAttribute('class');
        el.setAttribute('class', classes
            ? classes + ' ' + name // ถ้ามีคลาสอยู่แล้วจะต่อคลาสใหม่เข้าไป
            : name); // ถ้าไม่มีจะตั้งชื่อคลาสใหม่
    };

    // เมธอด 'removeClass' สำหรับลบคลาสออกจากอิลิเมนต์
    el.removeClass = function (name) {
        var classes = this.getClasses().filter(function (curr) {
            return curr != name; // กรองคลาสที่ไม่ต้องการออก
        });
        this.setAttribute('class', classes.join(' ')); // ตั้งคลาสใหม่โดยไม่มีคลาสที่ต้องการลบ
    };

    return el; // คืนค่าอิลิเมนต์ที่มีฟังก์ชันเหล่านี้
}

// ฟังก์ชันค้นหา เพื่อไฮไลท์ลิงก์ที่ตรงกับคำค้นหา
function search() {
    // ดึงค่าคำค้นหาจาก input ที่มี id 'search' และแปลงเป็นตัวพิมพ์เล็ก
    var str = $('search').value.toLowerCase();
    // ดึงลิงก์ทั้งหมดที่อยู่ภายใน id 'files'
    var links = $('files').all('a');

    // วนลูปผ่านลิงก์แต่ละอัน
    links.each(function (link) {
        var text = link.textContent.toLowerCase(); // แปลงข้อความของลิงก์เป็นตัวพิมพ์เล็ก

        if ('..' == text) return; // ข้ามถ้าเป็นลิงก์ย้อนกลับ ('..')
        if (str.length && ~text.indexOf(str)) { // ถ้ามีคำค้นหาและพบในลิงก์
            link.addClass('highlight'); // เพิ่มคลาส 'highlight'
        } else {
            link.removeClass('highlight'); // ลบคลาส 'highlight' ถ้าไม่ตรงกับคำค้นหา
        }
    });
}

// ฟังก์ชันที่จะถูกเรียกเมื่อหน้าเว็บโหลดเสร็จ (content loaded)
$(window).on('content loaded', function () {
    // ผูกฟังก์ชัน search กับการกดปุ่มใน input ที่มี id 'search'
    $('search').on('keyup', search);
});

// —[  ]———————————————————————————————————————————————————————————————————————————————————————————————————

// ฟังก์ชันเพื่อตรวจสอบโหมดของผู้ใช้งาน
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// ตรวจสอบการตั้งค่าโหมดสีของผู้ใช้งาน
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// ตั้งค่าโหมดตามการตั้งค่าของผู้ใช้งาน
applyTheme(userPrefersDark.matches ? 'dark' : 'light');

// ฟังค์ชันที่รับการเปลี่ยนแปลงเมื่อผู้ใช้เปลี่ยนการตั้งค่าโหมดสีในระบบ
userPrefersDark.addEventListener('change', (event) => {
    applyTheme(event.matches ? 'dark' : 'light');
});