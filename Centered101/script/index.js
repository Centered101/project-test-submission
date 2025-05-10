// —[ Progress Bar ]———————————————————————————————————————————————————————————————————————————————————————————————————
$('#preloader').addClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');

$(window).on('load', function () {
    $('#preloader').addClass('loaded');
    $('#preloader').removeClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');

    // เพิ่ม Progress Bar เข้าไปใน <body> ด้วย jQuery
    $('body').append(`
<div id="progressbar" role="progressbar" aria-hidden="true" class="fixed inset-x-0 top-0 left-0 h-1 opacity-0 z-50">
  <div id="progressbar-fill" class="w-0 h-full bg-[#84D4FA] transition-all duration-300 ease-in-out"></div>
</div>
`);

    let progress = 0;
    $('#progressbar-fill').css('width', '0%');
    $('#progressbar').css('opacity', '1');

    const interval = setInterval(function () {
        progress += 1;
        $('#progressbar-fill').css('width', progress + '%');

        if (progress >= 5) {
            clearInterval(interval);

            setTimeout(function () {
                $('#progressbar').css('opacity', '0');
            }, 500);
        }
    }, 25);
});
// ฟังก์ชันปิดการใช้งานลิงก์
function disableLink(event) {
    event.preventDefault();
}

// —[ defaultSvg ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(document).ready(function () {
    const radios = $('input[name="status"]');

    // ตั้งค่าเริ่มต้นให้กับ label[for="projects"]
    $('label[for="projects"] svg').css('fill', '#409EFE');
    $('#nav label[for="projects"]').css({
        'color': '#409EFE',
        'background-color': '#E3F2FD'
    });

    radios.on('change', function () {
        const targetId = $(this).attr('id');

        // รีเซ็ต fill และพื้นหลังของ label ทั้งหมดภายใน #nav
        $('label svg').css('fill', '');
        $('#nav label').css({
            'color': '',
            'background-color': ''
        });

        // กำหนด fill และ background สำหรับ label ที่เลือก
        $(`label[for="${targetId}"] svg`).css('fill', '#409EFE');
        $(`#nav label[for="${targetId}"]`).css({
            'color': '#409EFE',
            'background-color': '#E3F2FD'
        });
    });
});

// —[ projects ]———————————————————————————————————————————————————————————————————————————————————————————————————

const project = [
    { name: "portfolio-centered101", link: "https://portfolio-centered101.netlify.app/", img: "" },
    { name: "project-test-submission", link: "https://project-test-submission.netlify.app/", img: "" },
    { name: "asia-lb", link: "https://asia-lb.web.app/", img: "./images/asia-bl.png" }
];

const defaultImage = "https://project-test-submission.netlify.app/images/img/noitems.svg"; // 📌 รูปเริ่มต้น
const projectsList = document.getElementById('projects-list');

project.forEach(({ name, link, img }) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
                <a title="${name}" href="${link}" class="flex flex-col justify-center items-center bg-[#000] w-full h-full max-w-[1080px] max-h-[1350px] overflow-hidden group">
                    <img draggable="false" oncontextmenu="return false;" data-nimg="1" 
                    class="block object-cover ease-out duration-300"
                        src="${img || defaultImage}">

                </a>
            `;
    projectsList.appendChild(listItem);
});
// <div translate="no" class="flex flex-col bg-[#F5F5F5] space-y-2 px-2 py-4">
//     <p class="text-[#409EFE] truncate uppercase">${name}</p>
//     <p class="truncate font-normal">${link}</p>
// </div>

// —[ Toastify ]———————————————————————————————————————————————————————————————————————————————————————————————————

function showToast(message, bgColor = "#FFF", color = "#0D0D0D", duration = 2750) {
    Toastify({
        newWindow: true,
        text: message,
        duration: duration,
        gravity: "top",
        position: "left",
        style: {
            position: "fixed",
            left: "16px",
            background: bgColor,
            color: color,
            borderWidth: "1px",
            borderRadius: "12px",
            paddingBlock: "16px",
            paddingInline: "32px",
            zIndex: 100,
        }
    }).showToast();
}

// ตรวจจับเมื่อออฟไลน์
window.addEventListener("offline", () => {
    showToast("⚠️ ให้ตายเถอะ! คุณออฟไลน์ไปแล้ว 😐", '#FF7070', '#FFF', 5000);
});

// ตรวจจับเมื่อกลับมาออนไลน์
window.addEventListener("online", () => {
    showToast("ดีใจที่คุณกลับมาออนไลน์แล้ว! 😍", '#1ED760', '#FFF', 5000);
});