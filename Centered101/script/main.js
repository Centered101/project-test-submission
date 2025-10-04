// ========================================================================================
// PROFILE SECTION - จัดการรูปโปรไฟล์, QR Code, และการแชร์
// ========================================================================================

const URLShare = window.location.href;
let isQRMode = false;

/**
 * เปิดรูปภาพแบบเต็มจอ
 * @param {string} imageSrc - URL ของรูปภาพ
 */
function openFullscreen(imageSrc) {
    $("#fullscreen").removeClass("hidden").fadeIn(150);
    $("#fullscreenImage").attr("src", imageSrc).removeClass("hidden");
    $("#loadingSpinner, #qrContainer, #qrImage").addClass("hidden");
    isQRMode = false;
}

/**
 * ปิดโหมดเต็มจอและ QR Code
 */
function closeFullscreen() {
    $("#fullscreen").fadeOut(150);
    $("#fullscreenImage").removeClass("hidden");
    $("#loadingSpinner, #qrContainer, #qrImage").addClass("hidden");
    isQRMode = false;
}

/**
 * แชร์ URL ผ่าน Web Share API หรือใช้ fallback
 */
function share() {
    const $share = $("#share");
    $share.prop("disabled", true);

    if (navigator.share) {
        navigator.share({
            title: 'Github API Profile',
            text: 'See my profile here.',
            url: URLShare
        }).catch(err => {
            console.error("Share failed:", err);
            fallbackShare();
        }).finally(() => {
            setTimeout(() => $share.prop("disabled", false), 3000);
        });
    } else {
        fallbackShare();
        showNotification('Unable to share via system, fallback used.', 'info');
        setTimeout(() => $share.prop("disabled", false), 3000);
    }
}

/**
 * คัดลอก URL ไปยังคลิปบอร์ด พร้อมเปลี่ยนไอคอนเป็น checkmark
 */
function copyLink() {
    const $btn = $("#copyLink");
    const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>`;
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>`;

    $btn.prop("disabled", true);

    const copyText = () => {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(URLShare);
        } else {
            // Fallback สำหรับเบราว์เซอร์เก่า
            const $temp = $('<textarea>').val(URLShare).appendTo('body').select();
            document.execCommand('copy');
            $temp.remove();
            return Promise.resolve();
        }
    };

    copyText()
        .then(() => {
            $btn.html(checkIcon);
            showNotification('Link copied successfully!', 'success');
            setTimeout(() => {
                $btn.html(linkIcon).prop("disabled", false);
            }, 5000);
        })
        .catch(err => {
            console.error('Cannot copy:', err);
            showNotification('Unable to copy link', 'error');
            $btn.prop("disabled", false);
        });
}

/**
 * สร้าง QR Code จาก URL ปัจจุบัน
 */
function generateQRCode() {
    $("#loadingSpinner").removeClass("hidden");
    $("#qrImage, #fullscreenImage").addClass("hidden");
    $("#qrContainer").removeClass("hidden");
    isQRMode = true;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(URLShare)}`;

    $('<img>')
        .on('load', function() {
            $("#loadingSpinner").addClass("hidden");
            $("#qrImage").attr("src", qrUrl).removeClass("hidden");
            showNotification('QR Code created successfully!', 'success');
        })
        .on('error', function() {
            $("#loadingSpinner, #qrContainer").addClass("hidden");
            $("#fullscreenImage").removeClass("hidden");
            isQRMode = false;
            showNotification('Unable to generate QR Code', 'error');
        })
        .attr('src', qrUrl);
}

// Event Listeners สำหรับ Profile Section
$(document).ready(function() {
    $("#profile-img").on("click", function() {
        openFullscreen($(this).attr("src"));
    });

    $(document).on("keydown", function(e) {
        if (e.key === "Escape") closeFullscreen();
    });

    $("#qrContainer").on("click", function(e) {
        if (e.target === this) {
            $(this).addClass("hidden");
            $("#fullscreenImage").removeClass("hidden");
            $("#loadingSpinner, #qrImage").addClass("hidden");
            isQRMode = false;
        }
    });
});


// ========================================================================================
// SIDEBAR NAVIGATION - จัดการเมนูข้างและ overlay
// ========================================================================================

const navSidebar = $("nav");
const overlay = $("#overlay");
const toggleBtn = $("#sidebarToggle");
let sidebarOpen = false;

/**
 * เปิด Sidebar และแสดง overlay
 */
function openSidebar() {
    navSidebar.removeClass("-translate-x-full");
    overlay.fadeIn(150).removeClass("hidden");
    sidebarOpen = true;
}

/**
 * ปิด Sidebar และซ่อน overlay
 */
function closeSidebar() {
    navSidebar.addClass("-translate-x-full");
    overlay.fadeOut(150, function() {
        overlay.addClass("hidden").html("");
    });
    sidebarOpen = false;
}

// toggleBtn click
toggleBtn.on("click", function() {
    sidebarOpen ? closeSidebar() : openSidebar();
});

// overlay click
overlay.on("click", function() {
    closeSidebar();
});


// ========================================================================================
// PROJECTS SECTION - แสดงรายการโปรเจกต์และรายละเอียด
// ========================================================================================

const noimages = "/images/img/noitems.svg";

// ข้อมูลโปรเจกต์ทั้งหมด
const project = [
    {
        name: "Portfolio Centered101",
        link: "https://portfolio-centered101.netlify.app/",
        img: "./images/poster/portfolio.svg",
        description: "Personal Portfolio Website Built with TailwindCSS and JavaScript.",
        date: "2024-06-15",
        type: "Website",
        tech: "HTML, CSS, JavaScript, TailwindCSS"
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
        img: "",
        description: "My Certificates",
        date: "",
        type: "Website",
        tech: ""
    }
];

/**
 * สร้างรายการโปรเจกต์แบบ Grid
 */
$.each(project, function(i, { name, img }) {
    const listItem = `
    <li title="${name}" class="ripple-effect flex flex-col justify-center items-center w-full h-full overflow-hidden cursor-pointer transition-transform ease-in-out duration-300 active:brightness-75"
        onclick="showProjectDetails(${i})">
        <div class="w-full aspect-[4/5] overflow-hidden">
            <img src="${img || noimages}" onerror="this.src='${noimages}'"
                class="block h-full w-full object-cover object-center"
                style="background-image: url('${noimages}'); background-size: cover; background-position: center;"
                draggable="false">
        </div>
    </li>`;
    $("#projects-list").addClass("opacity-0 pt-2 md:p-0").append(listItem);
});

/**
 * แสดงรายละเอียดโปรเจกต์ใน Modal
 * @param {number} index - ลำดับของโปรเจกต์
 */
function showProjectDetails(index) {
    const { img, name, description, link, date, type, tech } = project[index];

    $("[id='overlay']").removeClass("hidden").fadeIn(150).html(`
    <div class="relative w-full max-w-4xl flex flex-col md:flex-row justify-center gap-2 md:gap-4 bg-[color:var(--white-smoker)] border rounded-xl shadow-xl m-2 p-2 md:p-4">
        <div class="aspect-[4/5] md:w-1/2">
            <img src="${img || noimages}" onerror="this.src='${noimages}'"
                class="block h-full w-full border rounded-lg object-cover object-center"
                style="background-image: url('${noimages}'); background-size: cover; background-position: center;"
                draggable="false">
        </div>
        <div class="min-h-full min-w-2xl flex-1 flex flex-col justify-between gap-4">
            <div>
                <p class="text-lg md:text-3xl">${name}</p>
                <p class="text-gray-500">${description || "No description provided"}</p>
                ${date ? `<p class="flex items-center gap-2 text-gray-500"><i class="fa-regular fa-calendar"></i><span>${date}</span></p>` : ''}
                ${type ? `<p class="flex items-center gap-2 text-gray-500"><i class="fa-solid fa-folder"></i><span>${type}</span></p>` : ''}
                ${tech ? `<p class="flex items-center gap-2 text-gray-500"><i class="fa-solid fa-wrench"></i><span>${tech}</span></p>` : ''}
            </div>
            <div class="flex items-center justify-center gap-2">
                <button onclick="window.open('${link}', '_blank')" class="btn-primary w-full flex items-center justify-between gap-2">
                    <span>Demo</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
                <button onclick="closeModal()" class="btn-outline w-full">Close</button>
            </div>
        </div>
    </div>`);
    
    openModal();
}


// ========================================================================================
// MODAL MANAGEMENT - จัดการ Modal และ History API
// ========================================================================================

let modalOpen = false;

/**
 * เปิด Modal และเพิ่ม state ใน history
 */
function openModal() {
    $("[id='overlay']").fadeIn(150);
    modalOpen = true;
    history.pushState({ modal: true }, "");
}

/**
 * ปิด Modal และจัดการ history
 */
function closeModal() {
    $("[id='overlay']").fadeOut(150);
    modalOpen = false;
    if (history.state?.modal) history.back();
}

// ปิด Modal เมื่อคลิกพื้นหลัง
$(document).on("click", "[id='overlay']", function(e) {
    if (e.target === this) closeModal();
});

// ปิด Modal เมื่อกด ESC
$(document).on("keydown", function(e) {
    if (e.key === "Escape") closeModal();
});

// จัดการ Back Button ของเบราว์เซอร์
window.addEventListener("popstate", function() {
    if (modalOpen) closeModal();
});


// ========================================================================================
// HIGHLIGHT MODAL - แสดงข้อมูล Projects, Skills, Certificates
// ========================================================================================

/**
 * เปิด Modal แสดงข้อมูลเพิ่มเติม
 * @param {string} type - ประเภทข้อมูล (projects, skills, certs)
 */
function openHighlight(type) {
    const content = {
        projects: {
            title: "Projects",
            body: "<p>Here are some of my featured projects with GitHub API integration.</p>"
        },
        skills: {
            title: "Skills",
            body: "<ul class='list-disc list-inside'><li>JavaScript / React</li><li>Tailwind CSS</li><li>Node.js</li></ul>"
        },
        certs: {
            title: "Certificates",
            body: "<p>Some certifications I've achieved in programming and business.</p>"
        }
    }[type];

    const html = `
    <div class="relative w-80 bg-[color:var(--white-smoker)] rounded-xl p-6">
        <button id="close-highlight" class="absolute top-2 right-2 text-gray-600">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <h3 class="text-xl font-bold mb-2">${content.title}</h3>
        ${content.body}
    </div>`;

    $("[id='overlay']").removeClass("hidden").hide().fadeIn(150).html(html);

    $("#close-highlight, [id='overlay']").on("click", function(e) {
        if (e.target === this || $(e.target).is("#close-highlight, #close-highlight *")) {
            $("[id='overlay']").fadeOut(150, function() {
                $(this).addClass("hidden").html("");
            });
        }
    });
}


// ========================================================================================
// BOTTOM SHEET - Bottom Sheet สำหรับมือถือ (รองรับ Touch และ Mouse)
// ========================================================================================

const BottomSheet = {
    $sheet: $("#bottomSheet"),
    $overlay: $("#overlay"),
    $content: $("#bottomSheetContent"),
    isDragging: false,
    startY: 0,
    currentY: 0,

    /**
     * เปิด Bottom Sheet พร้อมเนื้อหา
     */
    open({ title = "", content = "" }) {
        this.$content.html(`
            ${title ? `<h2 class="text-xl text-center font-semibold">${title}</h2>` : ""}
            <div class="border-t mt-2 pb-8 overflow-y-auto">${content}</div>
        `);
        this.$sheet.css("bottom", "0");
        this.$overlay.fadeIn(150).removeClass("hidden");
    },

    /**
     * ปิด Bottom Sheet
     */
    close() {
        this.$sheet.css("bottom", "-100%");
        this.$overlay.fadeOut(150, () => {
            this.$overlay.addClass("hidden").html("");
        });
    },

    /**
     * Init Bottom Sheet พร้อม Drag
     */
    init() {
        this.$overlay.on("click", () => this.close());

        // เริ่ม drag
        this.$sheet.on("touchstart mousedown", (e) => {
            this.startY = e.type === "touchstart" ? e.originalEvent.touches[0].clientY : e.clientY;
            this.isDragging = true;
        });

        // drag อยู่
        $(document).on("touchmove mousemove", (e) => {
            if (!this.isDragging) return;
            this.currentY = e.type === "touchmove" ? e.originalEvent.touches[0].clientY : e.clientY;
            const diff = this.currentY - this.startY;
            if (diff > 0) this.$sheet.css("transform", `translateY(${diff}px)`);
        });

        // drag จบ
        $(document).on("touchend mouseup", () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            const diff = this.currentY - this.startY;
            this.$sheet.css("transform", "");
            if (diff > 100) this.close();
        });
    }
};

BottomSheet.init();

// ========================================================================================
// CONTACT FUNCTION - แสดงข้อมูลติดต่อใน Bottom Sheet
// ========================================================================================
function contact() {
    const emails = [
        "centered101@outlook.com",
        "centered101@hothail.com",
        "centered101@outlook.co.th",
        "centered101@icloud.com",
        "36887@panarai.ac.th"
    ];

    const emailLinks = emails.map(email => `
        <a href="mailto:${email}?subject=Hello&body=Hello, would like to contact..." 
           class="ripple-effect flex flex-col p-2 md:px-4 
                  active:bg-[color:var(--accent-color)] 
                  md:hover:bg-[color:var(--accent-color)] group">
            <strong>Email:</strong> ${email}
        </a>
    `).join("");

    BottomSheet.open({
        title: "Contact",
        content: emailLinks
    });
}
