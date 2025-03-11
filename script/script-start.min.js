// —[ Progress Bar ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML +=
    `
<div id=progressbar role=progressbar aria-hidden=true class="fixed inset-x-0 top-0 left-0 h-1 opacity-0 z-50">
<div class="w-0 h-full bg-gradient-to-r from-[#84D4FA] to-[#409EFE] transition-all duration-1000 ease-in-out"></div></div>
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

const screenSize = `screen&#160;size:&#160;${window.innerWidth}W&#160;⨉&#160;${window.innerHeight}H`;

// document.querySelector("footer").innerHTML +=
document.body.innerHTML +=
    `
<a title="View source on GitHub" aria-label="View source on GitHub" rel=noopener href=https://github.com/centered101/ target=_blank class="fixed top-0 left-0 opacity-80 -rotate-90 transition-opacity duration-300 ease-in-out z-10 max-md:hidden hover:opacity-90">
<svg xmlns=http://www.w3.org/2000/svg width=55 height=55 viewBox="0 0 250 250" fill=#121212 data-v-14a7b7ba="">
<path d="M0 0l115 115h15l12 27 108 108V0z" fill=#D7D7D7></path>
<path class=octo-arm d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" style="transform-origin:130px 106px"></path>
<path class=octo-body d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z">
</path></svg></a>
<footer role=complementary class="truncate text-sm p-8 md:p-0 md:pt-24">
<p>${screenSize}</p>
<p class=truncate>version:&#160;<span id=version></span></p>
<p class="first-letter:text-[#409EFE] truncate">&copy;&#160;${new Date().getFullYear()}
<span title=Centered101 class="text-[#409EFE] underline-offset-2 hover:underline">
<a href=/settings.html>Centered101</a></span>&#160;—&#160;All&#160;Rights&#160;Reserved.</p>
</footer>
`;

// —[ Event ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML += `
<style>.hanging-decor{position:absolute;top:-16px;left:50%;transform:translateX(-50%);display:flex;gap:32px}.hanging-decor img{width:50px;height:50px;clip-path:polygon(50% 0%,0% 100%,100% 100%);border-radius:8px;animation:swing 5s ease-in-out infinite}@keyframes swing{0%,100%{transform:translateY(0) rotate(-10deg)}50%{transform:translateY(10px) rotate(10deg)}}</style>
<div style='display: none' id=decor-container class="hanging-decor opacity-80">
<img src="https://via.placeholder.com/50/FF7070/FFFFFF?text=" alt=Decor>
<img src="https://via.placeholder.com/50/1Ed760/FFFFFF?text=" alt=Decor>
<img src="https://via.placeholder.com/50/409EFE/FFFFFF?text=" alt=Decor>
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

// —[ search ]———————————————————————————————————————————————————————————————————————————————————————————————————

function $(id) {
    var el = 'string' == typeof id
        ? document.getElementById(id)
        : id;

    el.on = function (event, fn) {
        if ('content loaded' == event) {
            event = window.attachEvent ? "load" : "DOMContentLoaded";
        }
        el.addEventListener
            ? el.addEventListener(event, fn, false)
            : el.attachEvent("on" + event, fn);
    };

    el.all = function (selector) {
        return $(el.querySelectorAll(selector));
    };

    el.each = function (fn) {
        for (var i = 0, len = el.length; i < len; ++i) {
            fn($(el[i]), i);
        }
    };

    el.getClasses = function () {
        return this.getAttribute('class').split(/\s+/);
    };

    el.addClass = function (name) {
        var classes = this.getAttribute('class');
        el.setAttribute('class', classes
            ? classes + ' ' + name
            : name);
    };

    el.removeClass = function (name) {
        var classes = this.getClasses().filter(function (curr) {
            return curr != name;
        });
        this.setAttribute('class', classes.join(' '));
    };

    return el;
}

function search() {
    var str = $('search').value.toLowerCase();
    var links = $('files').all('a');

    links.each(function (link) {
        var text = link.textContent.toLowerCase();

        if ('..' == text) return;
        if (str.length && ~text.indexOf(str)) {
            link.addClass('highlight');
        } else {
            link.removeClass('highlight');
        }
    });
}

$(window).on('content loaded', function () {
    $('search').on('keyup', search);
});

// —[ dark theme ]———————————————————————————————————————————————————————————————————————————————————————————————————

// // ฟังก์ชันเพื่อตรวจสอบโหมดของผู้ใช้งาน
// function applyTheme(theme) {
//     if (theme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'dark');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'light');
//     }
// }

// // ตรวจสอบการตั้งค่าโหมดสีของผู้ใช้งาน
// const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// // ตั้งค่าโหมดตามการตั้งค่าของผู้ใช้งาน
// applyTheme(userPrefersDark.matches ? 'dark' : 'light');

// // ฟังค์ชันที่รับการเปลี่ยนแปลงเมื่อผู้ใช้เปลี่ยนการตั้งค่าโหมดสีในระบบ
// userPrefersDark.addEventListener('change', (event) => {
//     applyTheme(event.matches ? 'dark' : 'light');
// });

// —[ copyText ]———————————————————————————————————————————————————————————————————————————————————————————————————

function copyText() {
    const text = window.location.href;
    navigator.clipboard.writeText(text)
        .then(() => showToast("คัดลอก URL แล้ว: " + text))
        .catch(err => console.error("คัดลอกไม่สำเร็จ", err));
}

const urlElement = document.getElementById("url");
if (urlElement) {
    let pressTimer;

    urlElement.addEventListener("mousedown", function (event) {
        if (event.button === 2) {
            event.preventDefault();
            copyText();  // คลิกขวาคัดลอก
        } else if (event.button === 0) {
            window.location.href = "/";
        }
    });

    // รองรับ long press บนมือถือ
    urlElement.addEventListener("touchstart", function () {
        pressTimer = setTimeout(() => {
            copyText();
        }, 500); // กดค้าง 500ms เพื่อคัดลอก
    });

    urlElement.addEventListener("touchend", function () {
        clearTimeout(pressTimer);
    });

    urlElement.addEventListener("touchmove", function () {
        clearTimeout(pressTimer); // ถ้าลากนิ้วออกไป จะไม่คัดลอก
    });
}

// —[ Toastify ]———————————————————————————————————————————————————————————————————————————————————————————————————

function showToast(message, bgColor = "#FFF",  color = "#0D0D0D",  duration = 2750) {
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

// ตรวจจับเมื่อออฟไลน์
window.addEventListener("offline", () => {
    showToast("⚠️ ให้ตายเถอะ! คุณออฟไลน์ไปแล้ว 😐", '#FF7070', '#FFF', 10000);
});

// ตรวจจับเมื่อกลับมาออนไลน์
window.addEventListener("online", () => {
    showToast("ดีใจที่คุณกลับมาออนไลน์แล้ว! 😍", '#1ED760', '#FFF', 5000);
});
