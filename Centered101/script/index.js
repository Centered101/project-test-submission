// —[ preloader ]———————————————————————————————————————————————————————————————————————————————————————————————————

$('#preloader').addClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');

$(window).on('load', function () {
    $('#preloader').addClass('loaded');
    $('#preloader').removeClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');
});
// ฟังก์ชันปิดการใช้งานลิงก์
function disableLink(event) {
    event.preventDefault();
}

// —[ theme ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(function () {
    const $html = $('html');
    const $select = $('#theme-switcher');

    // โหลดค่าเดิมจาก localStorage (ถ้ามี)
    const saved = localStorage.getItem('theme') || 'system';
    $select.val(saved);
    applyTheme(saved);

    // เปลี่ยนธีมเมื่อเลือกใหม่
    $select.on('change', function () {
        const value = $(this).val();
        localStorage.setItem('theme', value);
        applyTheme(value);
    });

    function applyTheme(value) {
        $html.removeClass('theme-light theme-dark');
        if (value === 'light') {
            $html.addClass('theme-light');
        } else if (value === 'dark') {
            $html.addClass('theme-dark');
        }
        // ถ้า system ไม่ต้องใส่ class ใด ๆ
    }
});

// —[ defaultSvg ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(document).ready(function () {
    const radios = $('input[name="status"]');

    // ตั้งค่าเริ่มต้นให้กับ label[for="projects"]
    $('label[for="projects"] svg').css('fill', '#409EFE');
    $('#nav label[for="projects"]').addClass('sky-glow text-[#409EFE]');

    radios.on('change', function () {
        const targetId = $(this).attr('id');

        // รีเซ็ต fill และพื้นหลังของ label ทั้งหมดภายใน #nav
        $('label svg').css('fill', '');
        $('#nav label').removeClass('sky-glow text-[#409EFE]');

        // กำหนด fill และ background สำหรับ label ที่เลือก
        $(`label[for="${targetId}"] svg`).css('fill', '#409EFE');
        $(`#nav label[for="${targetId}"]`).addClass('sky-glow text-[#409EFE]');
    });
});

// —[ updateFollowState ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(document).ready(function () {
    const $followBtn = $('#followBtn');
    const $followText = $('#followText');
    const $__followers = $('#followers-count');

    let isFollowing = localStorage.getItem('isFollowing') === 'true';

    function updateFollowState() {
        const currentCount = parseInt($__followers.text(), 10) || 0;

        if (isFollowing) {
            $followText.text('Unfollow');
            $followText.attr('title', 'Unfollow');
            $followBtn
                .removeClass('bg-[#409EFE] border-[#409EFE] text-[#FFF]')
                .addClass('bg-transparent border-[#414143]');
        } else {
            $followText.text('Follow');
            $followText.attr('title', 'Follow');
            $followBtn
                .removeClass('bg-transparent border-[#414143]')
                .addClass('bg-[#409EFE] border-[#409EFE] text-[#FFF]');
        }

        // ป้องกันค่าติดลบ
        if (currentCount < 0) {
            $__followers.text(0);
        }
    }

    updateFollowState();

    $followBtn.on('click', function (e) {
        let currentCount = parseInt($__followers.text(), 10) || 0;

        if (isFollowing) {
            currentCount = Math.max(0, currentCount - 1); // ไม่ให้ติดลบ
        } else {
            currentCount += 1;
        }

        $__followers.text(currentCount);

        isFollowing = !isFollowing;
        localStorage.setItem('isFollowing', isFollowing);

        updateFollowState();

        if (!isFollowing) {
            e.preventDefault();
        } else {
            window.location.href = $followBtn.attr('href');
        }
    });

});

// —[ projects ]———————————————————————————————————————————————————————————————————————————————————————————————————

const project = [
    { name: "portfolio-centered101", link: "https://portfolio-centered101.netlify.app/", img: "" },
    { name: "project-test-submission", link: "https://project-test-submission.netlify.app/", img: "./images/project-test-submission.png" },
    { name: "asia-lb", link: "https://asia-lb.web.app/", img: "./images/asia-bl.png" }
];

const defaultImage = "https://project-test-submission.netlify.app/images/img/noitems.svg"; // 📌 รูปเริ่มต้น
const projectsList = document.getElementById('projects-list');

project.forEach(({ name, link, img }) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
<a title="${name}" href="${link}" target="_blank" class="flex flex-col justify-center items-center bg-[#FFFFFF] w-full h-full max-w-[1080px] max-h-[1350px] overflow-hidden ease-in-out duration-300 group">
    <img draggable="false" oncontextmenu="return false;" data-nimg="1" class="block object-cover ease-out duration-300"
        src="${img || defaultImage}"
        onerror="this.src='https://project-test-submission.netlify.app/images/img/noitems.svg'">
</a>`;
    projectsList.appendChild(listItem);
});

// —[ Toastify ]———————————————————————————————————————————————————————————————————————————————————————————————————

function showToast(message, bgColor = "#FFF", color = "#0D0D0D", borderColor = "#EFEFEF", duration = 2750) {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // ปรับสีให้เหมาะกับ Dark Mode อัตโนมัติ ถ้าไม่ได้ส่ง bgColor หรือ color มาเอง
    if (bgColor === "#FFF" && color === "#0D0D0D" && isDarkMode) {
        bgColor = "#121212"; // พื้นหลังใน dark
        color = "#DCDCDC";   // ตัวหนังสือขาว
    }

    Toastify({
        newWindow: true,
        text: message,
        duration: duration,
        gravity: "bottom",
        position: "right",
        style: {
            position: "fixed",
            right: "16px",
            background: bgColor,
            color: color,
            borderColor: borderColor,
            fontSize: "0.75rem", /* 12px */
            lineHeight: "1rem", /* 16px */
            borderWidth: "1px",
            borderRadius: "12px",
            paddingBlock: "8px",
            paddingInline: "32px",
            zIndex: 100,
        }
    }).showToast();
}

// Detect when offline
$(window).on("offline", function () {
    showToast("⚠️ Oh no! You are offline 😐", '#FF7070', '#FFF', 5000);
});

// Detect when back online
$(window).on("online", function () {
    showToast("Glad you're back online! 😍", '#1ED760', '#FFF', 5000);
});