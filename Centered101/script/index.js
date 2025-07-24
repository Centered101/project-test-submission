// —[ preloader ]———————————————————————————————————————————————————————————————————————————————————————————————————

$('#preloader').addClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');

$(window).on('load', function () {
    $('#preloader').addClass('invisible');
    $('#preloader').removeClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');
});
// ฟังก์ชันปิดการใช้งานลิงก์
function disableLink(event) {
    event.preventDefault();
}

// Detect when offline
$(window).on("offline", function () {
    showNotification("Oh no! You are offline 😐", 'info');
});

// Detect when back online
$(window).on("online", function () {
    showNotification("Glad you're back online! 😍", 'success');
});

// ตัวแปรสำหรับจัดการ notification queue
let notificationQueue = [];
let notificationContainer = null;

function showNotification(message, type = 'info', link = null) {
    // สร้าง container ถ้ายังไม่มี
    if (!notificationContainer) {
        notificationContainer = $('<div class="fixed bottom-4 right-4 z-50 space-y-2"></div>');
        $('body').append(notificationContainer);
    }

    const notification = $(`
        <div class="notification-item max-w-sm bg-[color:var(--white-smoker)] border rounded-xl shadow-inner px-4 py-2 transition-all duration-300 transform translate-x-full select-none ${!link ? 'cursor-pointer' : ''}">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    ${type === 'success' ?
            '<svg class="size-[1em] text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>' :
            type === 'error' ?
                '<svg class="size-[1em] text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>' :
                '<svg class="size-[1em] text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>'
        }
                </div>
                <div class="ml-2 flex-1">
                    ${link ?
            `<a href="${link}" class="text-sm text-[color:var(--main-color)] hover:opacity-50 underline" rel="noopener noreferrer">${message}</a>` :
            `<p class="text-sm">${message}</p>`
        }
                </div>
            </div>
        </div>
    `);

    // เพิ่ม notification ใน container
    notificationContainer.append(notification);

    // Animation เข้า
    setTimeout(() => {
        notification.removeClass('translate-x-full');
    }, 10);

    // ตัวแปรสำหรับจัดการ timer
    let timeoutId;
    let isHovered = false;
    let isFocused = false;

    // ฟังก์ชันเริ่ม timer
    function startTimer() {
        if (!isHovered && !isFocused) {
            timeoutId = setTimeout(() => {
                closeNotification();
            }, 5000);
        }
    }

    // ฟังก์ชันหยุด timer
    function stopTimer() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    // ฟังก์ชันปิด notification
    function closeNotification() {
        notification.addClass('translate-x-full opacity-0');
        setTimeout(() => {
            notification.remove();
            // ลบ notification ออกจาก queue
            const index = notificationQueue.indexOf(notification);
            if (index > -1) {
                notificationQueue.splice(index, 1);
            }
            // ลบ container ถ้าไม่มี notification แล้ว
            if (notificationQueue.length === 0) {
                notificationContainer.remove();
                notificationContainer = null;
            }
        }, 300);
    }

    // Event listeners สำหรับ hover และ focus
    notification.on('mouseenter', function () {
        isHovered = true;
        stopTimer();
    });

    notification.on('mouseleave', function () {
        isHovered = false;
        startTimer();
    });

    notification.on('focusin', function () {
        isFocused = true;
        stopTimer();
    });

    notification.on('focusout', function () {
        isFocused = false;
        startTimer();
    });

    // ถ้าไม่มีลิงก์ ให้คลิกเพื่อปิดได้
    if (!link) {
        notification.on('click', function () {
            closeNotification();
        });
    }

    // เพิ่ม notification ใน queue
    notificationQueue.push(notification);

    // เริ่ม timer
    startTimer();

    // จำกัดจำนวน notification ไม่เกิน 5 ตัว
    if (notificationQueue.length > 5) {
        const oldestNotification = notificationQueue[0];
        oldestNotification.addClass('translate-x-full opacity-0');
        setTimeout(() => {
            oldestNotification.remove();
            notificationQueue.shift();
        }, 300);
    }
}

// ฟังก์ชันปิด notification ทั้งหมด
function clearAllNotifications() {
    notificationQueue.forEach(notification => {
        notification.addClass('translate-x-full opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    notificationQueue = [];
    setTimeout(() => {
        if (notificationContainer) {
            notificationContainer.remove();
            notificationContainer = null;
        }
    }, 300);
}

// ตัวอย่างการใช้งาน:
// showNotification('บันทึกข้อมูลสำเร็จ', 'success'); // ไม่มีลิงก์ - คลิกเพื่อปิด
// showNotification('ดูรายละเอียดเพิ่มเติม', 'info', 'https://example.com'); // มีลิงก์ - คลิกเพื่อเปิดลิงก์
// showNotification('เกิดข้อผิดพลาด', 'error'); // ไม่มีลิงก์ - คลิกเพื่อปิด
// clearAllNotifications(); // ปิดการแจ้งเตือนทั้งหมด

// —[ profile ]———————————————————————————————————————————————————————————————————————————————————————————————————

const URLShare = window.location.href;
let isQRMode = false;

function openFullscreen(imageSrc) {
    $("#fullscreenImage").attr("src", imageSrc);
    $("#fullscreen").removeClass("hidden").addClass("flex");
    $("#qrContainer").addClass("hidden");
    $("#fullscreenImage").removeClass("hidden");
    $("#loadingSpinner").addClass("hidden");
    $("#qrImage").addClass("hidden");
    isQRMode = false;
}

function closeFullscreen() {
    $("#fullscreen").removeClass("flex").addClass("hidden");
    $("#qrContainer").addClass("hidden");
    $("#fullscreenImage").removeClass("hidden");
    $("#loadingSpinner").addClass("hidden");
    $("#qrImage").addClass("hidden");
    isQRMode = false;
}

function toggleImageShape(event) {
    event.stopPropagation();
    if (!isQRMode) {
        const img = $("#fullscreenImage, #profile-img");
        if (img.hasClass("rounded-full")) {
            img.removeClass("rounded-full md:rounded-none").addClass("rounded-none md:rounded-full");
        } else {
            img.removeClass("rounded-none md:rounded-full").addClass("rounded-full md:rounded-none");
        }
    }
}

function share() {
    const share = $("#share");
    share.prop("disabled", true);

    if (navigator.share) {
        navigator.share({
            title: `Github API Profile`,
            text: 'See my profile here.',
            url: URLShare
        }).catch(err => {
            console.error("Share failed:", err);
            fallbackShare();
        }).finally(() => {
            setTimeout(() => share.prop("disabled", false), 3000);
        });
    } else {
        fallbackShare();
        showNotification('Unable to share via system, fallback used.', 'info');
        setTimeout(() => share.prop("disabled", false), 3000);
    }
}

function fallbackShare() {
    const shareText = `See my profile at: ${URLShare}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link copied to clipboard (fallback)', 'success');
        }).catch(() => {
            showNotification('Unable to copy link', 'error');
            prompt('Copy this link:', shareText);
        });
    } else {
        // เบราว์เซอร์เก่าจริง ๆ
        prompt('Copy this link:', shareText);
    }
}

function copyLink() {
    const copyLink = $("#copyLink");

    // ปิดการกดซ้ำ
    copyLink.prop("disabled", true);

    if (navigator.clipboard) {
        navigator.clipboard.writeText(URLShare).then(() => {
            // เปลี่ยนไอคอนเป็น checkmark
            copyLink.html(`
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                    <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/>
                </svg>
            `);

            showNotification('Link copied successfully!', 'success');

            // รีเซ็ตหลัง 5 วิ
            setTimeout(() => {
                copyLink.html(`
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                        <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
                    </svg>
                `);
                copyLink.prop("disabled", false); // เปิดให้กดได้อีกครั้ง
            }, 5000);
        }).catch(err => {
            console.error('cannot be copied:', err);
            showNotification('Unable to copy link', 'error');
            copyLink.prop("disabled", false); // คืนปุ่มในกรณีผิดพลาด
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = URLShare;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Link copied successfully!', 'success');
        } catch (err) {
            showNotification('Unable to copy link', 'error');
        }
        document.body.removeChild(textArea);
        setTimeout(() => {
            copyLink.prop("disabled", false);
        }, 5000);
    }
}

function generateQRCode() {
    // แสดง loading spinner
    $("#loadingSpinner").removeClass("hidden");
    $("#qrImage").addClass("hidden");
    $("#fullscreenImage").addClass("hidden");
    $("#qrContainer").removeClass("hidden");
    isQRMode = true;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(URLShare)}`;

    // สร้าง image object เพื่อตรวจสอบการโหลด
    const img = new Image();
    img.onload = function () {
        // เมื่อโหลดเสร็จ ซ่อน loading และแสดง QR Code
        $("#loadingSpinner").addClass("hidden");
        $("#qrImage").attr("src", qrUrl).removeClass("hidden");
        showNotification('QR Code created successfully!', 'success');
    };
    img.onerror = function () {
        // หากเกิดข้อผิดพลาด
        $("#loadingSpinner").addClass("hidden");
        $("#qrContainer").addClass("hidden");
        $("#fullscreenImage").removeClass("hidden");
        isQRMode = false;
        showNotification('Unable to generate QR Code', 'error');
    };

    // เริ่มโหลดรูปภาพ
    img.src = qrUrl;
}

// Event Listeners
$(document).ready(function () {
    $("#profile-img").on("click", function () {
        openFullscreen($(this).attr("src"));
    });

    // ปิดด้วย Esc
    $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
            closeFullscreen();
        }
    });

    // คลิกที่ QR container เพื่อปิด QR mode
    $("#qrContainer").on("click", function (e) {
        if (e.target === this) {
            $("#qrContainer").addClass("hidden");
            $("#fullscreenImage").removeClass("hidden");
            $("#loadingSpinner").addClass("hidden");
            $("#qrImage").addClass("hidden");
            isQRMode = false;
        }
    });
});

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

// —[ projects ]———————————————————————————————————————————————————————————————————————————————————————————————————

const project = [
    { name: "portfolio-centered101", link: "https://portfolio-centered101.netlify.app/", img: "" },
    { name: "project-test-submission", link: "https://project-test-submission.netlify.app/", img: "./images/project-test-submission.png" },
    { name: "asia-lb", link: "https://asia-lb.web.app/", img: "./images/asia-bl.png" },
];

const defaultImage = "https://project-test-submission.netlify.app/images/img/noitems.svg"; // 📌 รูปเริ่มต้น
const projectsList = document.getElementById('projects-list');

project.forEach(({ name, link, img }) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
<a title="${name}" href="${link}" target="_blank" class="flex flex-col justify-center items-center w-full h-full overflow-hidden active:!brightness-90 group">
    <img draggable="false" oncontextmenu="return false;" data-nimg="1" class="block h-full w-full object-cover object-center ease-out duration-300"
        src="${img || defaultImage}"
        onerror="this.src='https://project-test-submission.netlify.app/images/img/noitems.svg'">
</a>`;
    projectsList.appendChild(listItem);
});