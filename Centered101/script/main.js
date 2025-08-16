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

// —[ defaultSvg ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(document).ready(function () {
    const radios = $('input[name="status"]');

    // ตั้งค่าเริ่มต้นให้กับ label[for="projects"]
    $('label[for="projects"] svg').addClass('fill-[color:var(--main-color)]');
    $('nav label[for="projects"]').addClass('bg-[color:var(--sky-glow)] text-[color:var(--main-color)]');

    radios.on('change', function () {
        const targetId = $(this).attr('id');

        // รีเซ็ต fill และพื้นหลังของ label ทั้งหมดภายใน nav
        $('label svg').removeClass('fill-[color:var(--main-color)]');
        $('nav label').removeClass('bg-[color:var(--sky-glow)] text-[color:var(--main-color)]');

        $(`label[for="${targetId}"] svg`).addClass('fill-[color:var(--main-color)]');
        $(`nav label[for="${targetId}"]`).addClass('bg-[color:var(--sky-glow)] text-[color:var(--main-color)]');
    });
});

// —[ navSidebar ]———————————————————————————————————————————————————————————————————————————————————————————————————

const navSidebar = document.querySelector("nav");
const overlay = document.getElementById("overlay");
const toggleBtn = document.getElementById("sidebarToggle");

let sidebarOpen = false;

function openSidebar() {
    navSidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    sidebarOpen = true;
}

function closeSidebar() {
    navSidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    sidebarOpen = false;
}

toggleBtn.addEventListener("click", () => {
    sidebarOpen ? closeSidebar() : openSidebar();
});

overlay.addEventListener("click", closeSidebar);

// —[ projects ]———————————————————————————————————————————————————————————————————————————————————————————————————

const project = [
    { name: "portfolio-centered101", link: "https://portfolio-centered101.netlify.app/", img: "./images/portfolio.svg" },
    { name: "project-test-submission", link: "https://project-test-submission.netlify.app/", img: "./images/project-test-submission.svg" },
    { name: "asia-lb", link: "https://asia-lb.web.app/", img: "./images/asia-lb.svg" },
    { name: "center-dot-shop", link: "https://center-dot-shop.netlify.app/", img: "./images/center-dot-shop.svg" },
];

const noimages = "https://project-test-submission.netlify.app/images/img/placeholder.svg";
const projectsList = document.getElementById('projects-list');

// สมมติ username มาจาก global variable

// if (username === "Centered101") {
    project.forEach(({ name, link, img }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
<a title="${name}" href="${link}" target="_blank" 
   class="flex flex-col justify-center items-center w-full h-full overflow-hidden active:!brightness-90 group"> 
    <div class="w-full aspect-[4/5] overflow-hidden">
        <img oncontextmenu="return false;" data-nimg="1" 
            class="block h-full w-full object-cover object-center ease-out duration-300"
            src="${img || noimages}"
            onerror="this.src='${noimages}'">
    </div>
</a>`;
        projectsList.appendChild(listItem);
    });
// } else {
//     const notFoundItem = document.createElement('li');
//     notFoundItem.textContent = "Project not found";
//     projectsList.appendChild(notFoundItem);
// }


// if (username === "Centered101") {
    $('#bg-video').removeClass('hidden');
// }

const intro = document.getElementById('intro-screen');
const video = document.getElementById('bg-video');

function startVideo() {
    intro.classList.add('fade-out');
    video.muted = false;
    video.volume = 0.5;

    video.play().catch(err => {
        console.log("Video play blocked:", err);
    });

    setTimeout(() => {
        intro.style.display = 'none';
    }, 500);
}

// คลิกที่ intro
intro.addEventListener('click', startVideo);

// กดปุ่มอะไรก็ได้
document.addEventListener('keydown', startVideo);
