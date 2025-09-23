// —[ profile ]———————————————————————————————————————————————————————————————————————————————————————————————————

const URLShare = window.location.href;
let isQRMode = false;

function openFullscreen(imageSrc) {
    $("#fullscreen").removeClass("hidden").fadeIn(300);
    $("#fullscreenImage").attr("src", imageSrc).removeClass("hidden");
    $("#loadingSpinner").addClass("hidden");
    $("#qrContainer").addClass("hidden");
    $("#qrImage").addClass("hidden");
    isQRMode = false;
}

function closeFullscreen() {
    $("#fullscreen").fadeOut(300);
    $("#fullscreenImage").removeClass("hidden");
    $("#loadingSpinner").addClass("hidden");
    $("#qrContainer").addClass("hidden");
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
    $('label[for="projects"] svg').addClass('fill-[color:var(--primary-color)]');
    $('nav label[for="projects"]').addClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)]');

    radios.on('change', function () {
        const targetId = $(this).attr('id');

        // รีเซ็ต fill และพื้นหลังของ label ทั้งหมดภายใน nav
        $('label svg').removeClass('fill-[color:var(--primary-color)]');
        $('nav label').removeClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)]');

        $(`label[for="${targetId}"] svg`).addClass('fill-[color:var(--primary-color)]');
        $(`nav label[for="${targetId}"]`).addClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)]');
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

// —[ Projects Section ]—————————————————————————————————————————————————————————————————————
const noimages = "/images/img/noitems.svg";

const project = [
    {
        name: "Portfolio Centered101",
        link: "https://portfolio-centered101.netlify.app/",
        img: "./images/poster/portfolio.svg",
        description: "Personal Portfolio Website Built with TailwindCSS and JavaScript.",
        date: "2024-06-15",
        type: "Website",
        tech: "HTML, CSS, JavaScript, TailwindCSS,"
    },
    {
        name: "Project test Submission",
        link: "https://project-test-submission.netlify.app/",
        img: "./images/poster/project-test-submission.png",
        description: "A collection of projects using the GitHub API and experiments.",
        date: "2024-08-10",
        type: "Website",
        tech: "HTML, CSS, JavaScript, TailwindCSS, JQuery"
    },
    {
        name: "ASIA-LB",
        link: "https://asia-lb.web.app/",
        img: "./images/poster/asia-lb.png",
        description: "Website of Asia Technology College Lopburi",
        date: "2024-09-01",
        type: "Website",
        tech: "Firebase, HTML, CSS, JavaScript, TailwindCSS, JQuery"
    },
    {
        name: "CENTER DOT SHOP",
        link: "https://center-dot-shop.netlify.app/",
        img: "./images/poster/center-dot-shop.svg",
        description: "Example of a trial online store website",
        date: "2025-01-05",
        type: "Website",
        tech: "E-commerce, HTML, CSS, JavaScript, TailwindCSS, JQuery, React"
    },
    {
        name: "KRU WAI",
        link: "https://www.roblox.com/games/76640670602072/Kru-Wai",
        img: "./images/poster/KRU_WAI.png",
        description: "Roblox game developed by Kru Wai",
        date: "2025-02-01",
        type: "Game",
        tech: "Roblox Studio, Lua"
    },
    {
        name: "My Certificates",
        link: "./certificates.html",
        img: "./images/certificates/certificate.png",
        description: "My Certificates",
        date: "",
        type: "Website",
        tech: ""
    },
];

// สร้าง list item ของ project
$.each(project, function (i, { name, img, link }) {
    const listItem = `
    <li>
      <a title="${name}" 
           class="flex flex-col justify-center items-center w-full h-full overflow-hidden cursor-pointer transition-transform ease-in-out duration-300 active:brightness-90"
           onclick="showProjectDetails(${i})">
        <div class="w-full aspect-[4/5] overflow-hidden">
          <img src="${img || noimages}"
               onerror="this.src='${noimages}'"
               class="block h-full w-full object-cover object-center"
               style="background-image: url('${noimages}'); background-size: cover; background-position: center;">
        </div>
      </a>
    </li>`;
    $("#projects-list").append(listItem);
});

// ฟังก์ชันแสดงรายละเอียดโปรเจกต์ - ปรับปรุงแค่นิดหน่อย
function showProjectDetails(index) {
    const { img, name, description, link, date, type, tech } = project[index];

    $("#project-details").removeClass("hidden").fadeIn(300).html(`
    <div class="relative max-w-3xl flex justify-center gap-4 bg-[color:var(--white-smoker)] border rounded-xl shadow-xl m-4 p-4 md:p-6">
        <a href="${link}" target="_blank" class="w-1/2 border rounded-lg overflow-hidden">
            <img src="${img || noimages}"
                onerror="this.src='${noimages}'"
                class="block h-full w-full object-cover object-center"
                style="background-image: url('${noimages}'); background-size: cover; background-position: center;">
        </a>
        <div class="min-h-full flex-1 flex flex-col justify-between gap-4">
            <div class="space-y-2">
                <h2 class="text-xl md:text--3xl font-bold mb-4">${name}</h2>
                <p class="text-sm text-gray-500">${description || "No description provided"}</p>

                <p class="flex items-center gap-2 text-xs text-gray-600">
                    <i class="fa-regular fa-calendar"></i><span>${date || ""}</span>
                </p>

                <p class="flex items-center gap-2 text-xs text-gray-600">
                    <i class="fa-solid fa-folder"></i><span>${type || ""}</span>
                </p>

                ${tech ? `
                <p class="flex items-center gap-2 text-xs text-gray-600">
                    <i class="fa-solid fa-wrench"></i><span>${tech}</span>
                </p>
                ` : ''}
            </div>
            <div class="flex items-center justify-center gap-2">
                <a href="${link}" target="_blank" class="btn-primary w-full">Demo</a>
            </div>
        </div>
    </div>
  `);
}

// เพิ่มฟังก์ชันปิด modal ง่าย ๆ
function closeModal() {
    $("#project-details").fadeOut(300);
}

// ปิด modal เมื่อคลิกนอก
$(document).on('click', '#project-details', function (e) {
    if (e.target === this) closeModal();
});

// ปิด modal เมื่อกด ESC
$(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});