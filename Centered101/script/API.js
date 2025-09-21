// Configuration
const CONFIG = {
    username: "Centered101",
    apiBaseUrl: "https://api.github.com",
    fallbackIcon: "https://project-test-submission.netlify.app/images/icon.svg"
};

// Global state
let lowApiNotified = false;

/**
 * แสดงข้อความแจ้งเตือน (สมมุติว่ามีฟังก์ชัน showNotification อยู่แล้ว)
 * @param {string} message - ข้อความที่จะแสดง
 * @param {string} type - ประเภทของข้อความ ('error', 'warning', etc.)
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Implementation depends on your notification system
}

/**
 * สร้าง HTML สำหรับข้อความเตือน API limit
 * @param {string} resetTime - เวลาที่ API จะ reset
 * @param {string} margin - CSS class สำหรับ margin
 * @returns {string} HTML string
 */
function createApiLimitWarning(resetTime, margin = "") {
    return `
        <div class="bg-[color:var(--white-smoker)] shadow-inner text-[color:var(--text-color)] text-sm text-wrap border rounded-xl ${margin} p-2">
            <span class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-circle-exclamation text-red-500"></i>
                You have reached the API limit! Please wait until ${resetTime}.
            </span>
        </div>`;
}

/**
 * ตรวจสอบและจัดการ API rate limit status
 * @param {number} remaining - จำนวนคำขอที่เหลือ
 */
function handleApiLimitNotification(remaining) {
    if (remaining <= 10 && remaining > 0 && !lowApiNotified) {
        showNotification('Low API requests remaining! Please wait!');
        lowApiNotified = true;
    } else if (remaining > 10) {
        lowApiNotified = false;
    }
}

/**
 * อัปเดตการแสดงผล rate limit status
 * @param {number} remaining - จำนวนคำขอที่เหลือ
 * @param {string} resetTime - เวลาที่ API จะ reset
 */
function updateRateLimitDisplay(remaining, resetTime) {
    const $rateStatus = $("#rateStatus").removeClass("animate-pulse");
    
    if (remaining === 0) {
        // แสดงข้อความเตือนในทุก section
        const warningHtml = createApiLimitWarning(resetTime, "text-center m-0");
        $("#repo-list").html(warningHtml);
        $("#followers-list, #following-list").html(createApiLimitWarning(resetTime, "text-center m-2 md:m-4"));
        
        $rateStatus.html(`
            <p>Remaining: <span class="text-[color:var(--primary-color)]">${remaining}</span> / 60 requests</p>
            <p class="flex items-center gap-2">
                <i class="fa-solid fa-circle-exclamation text-red-500"></i>
                <span>Please wait until ${resetTime}</span>
            </p>
        `);
    } else {
        $rateStatus.html(`
            <p>Remaining: <span class="text-[color:var(--primary-color)]">${remaining}</span> / 60 requests</p>
            <p>Reset time: <span>${resetTime}</span></p>
        `);
    }
}

/**
 * ดึงข้อมูล rate limit จาก GitHub API และอัปเดตการแสดงผล
 */
function updateRateLimit() {
    fetch(`${CONFIG.apiBaseUrl}/rate_limit`)
        .then(response => response.json())
        .then(data => {
            const remaining = data.rate.remaining;
            const resetTime = new Date(data.rate.reset * 1000).toLocaleTimeString();
            
            handleApiLimitNotification(remaining);
            updateRateLimitDisplay(remaining, resetTime);
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
            showNotification('Error fetching API data', 'error');
        });
}

/**
 * ตั้งค่า meta tags สำหรับ social sharing
 * @param {string} imageUrl - URL ของรูปภาพ
 */
function setupMetaTags(imageUrl) {
    const favicon = document.createElement("link");
    favicon.rel = "shortcut icon";
    favicon.type = "image/x-icon";
    favicon.href = imageUrl;
    document.head.appendChild(favicon);

    const metaTags = [
        { property: "og:image", content: imageUrl },
        { property: "twitter:image", content: imageUrl }
    ];

    metaTags.forEach(tag => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", tag.property);
        meta.setAttribute("content", tag.content);
        document.head.appendChild(meta);
    });
}

/**
 * สร้างปุ่ม Follow และ Share
 * @param {string} username - ชื่อผู้ใช้ GitHub
 */
function createActionButtons(username) {
    const buttonClass = "relative w-full sm:w-1/2 md:max-w-56 flex justify-center items-center gap-2 bg-[color:var(--white-smoker)] border rounded-lg truncate p-2 overflow-hidden active:bg-[color:var(--accent-color)]";
    
    $('#github-follow-button-wrapper').append(`
        <a title="Follow ${username}" aria-label="Follow ${username}" 
           href="https://github.com/${username}" target="_blank" class="${buttonClass}">
            <span>Follow</span>
        </a>
        <button onclick="share()" title="share profile ${username}" 
                aria-label="share profile ${username}" class="${buttonClass}">
            <span>Share profile</span>
        </button>
    `);
}

/**
 * Helper function สำหรับดึงข้อมูลจาก API
 * @param {string} url - URL endpoint
 * @param {function} callback - ฟังก์ชันที่จะประมวลผลข้อมูล
 */
async function fetchData(url, callback) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        showNotification('Error fetching data from GitHub API', 'error');
    }
}

/**
 * ตั้งค่าข้อมูลในฟิลด์โปรไฟล์พร้อมจัดการการซ่อน/แสดง
 * @param {string} selector - jQuery selector
 * @param {string} icon - HTML string ของไอคอน (SVG หรือ FontAwesome)
 * @param {string|null} value - ค่าที่จะแสดง
 * @param {string|null} fallback - ค่า fallback หากไม่มีข้อมูล
 */
function setProfileField(selector, icon, value, fallback = null) {
    const displayValue = value || fallback;
    
    if (displayValue) {
        $(selector).removeClass('hidden').html(`
            <span class="flex items-center gap-2">
                ${icon}
                <span>${displayValue}</span>
            </span>
        `);
    } else {
        $(selector).addClass('hidden').html('');
    }
}

/**
 * สร้าง HTML สำหรับรายการ repository
 * @param {Object} repo - ข้อมูล repository
 * @returns {string} HTML string
 */
function createRepoItem(repo) {
    return `
        <li>
            <a translate="no" title='${repo.name}${repo.language ? " • " + repo.language : ""}' 
               href="${repo.html_url}" target="_blank" 
               class="flex flex-col gap-2 bg-[color:var(--bg-color)] border rounded shadow-inner p-2 active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)]">
                <span class="flex items-center gap-1">
                    <img src="${repo.owner.avatar_url}" class="size-6 border rounded-full" 
                         onerror="this.src='${CONFIG.fallbackIcon}'">
                    <span class="text-sm font-normal text-[color:var(--text-400)] truncate">${repo.owner.login}</span>
                </span>
                <span class="text-[color:var(--primary-color)] truncate">${repo.name}</span>
                <span class="text-sm font-normal text-[color:var(--text-500)] truncate">${repo.language || '&nbsp;'}</span>
            </a>
        </li>`;
}

/**
 * สร้าง HTML สำหรับรายการผู้ใช้ (followers/following)
 * @param {Object} user - ข้อมูลผู้ใช้
 * @returns {string} HTML string
 */
function createUserItem(user) {
    return `
        <li>
            <a title="${user.login}" href="${user.html_url}" target="_blank" 
               class="flex justify-between items-center gap-2 font-normal p-2 md:px-4 active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)] group">
                <p translate="no" class="flex items-center gap-2">
                    <img src="${user.avatar_url}" class="size-8 flex-1 bg-[color:var(--white-smoker)] border rounded-full" 
                         onerror="this.src='${CONFIG.fallbackIcon}'">
                    <span>${user.login}</span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" class="size-[1em]">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
            </a>
        </li>`;
}

/**
 * โหลดและแสดงข้อมูลโปรไฟล์ผู้ใช้
 */
function loadUserProfile() {
    $.getJSON(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}`, function (data) {
        // ตั้งค่าพื้นฐาน
        document.title = `GitHub Profile ${CONFIG.username}`;
        const avatarUrl = data.avatar_url || CONFIG.fallbackIcon;
        
        setupMetaTags(avatarUrl);
        createActionButtons(CONFIG.username);
        
        // อัปเดตข้อมูลโปรไฟล์
        $('#profile-img').attr('src', avatarUrl);
        $('#profile-name').removeClass('loading-skeleton')
            .html(`<h1 class="text-3xl font-bold">${data.name || data.login}</h1>`);
        $('#profile-datename').removeClass('loading-skeleton')
            .html(`<p class="text-xl opacity-90">@${data.login}</p>`);
        
        // ตั้งค่าข้อมูลเพิ่มเติม
        const joinDate = new Date(data.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        setProfileField('#github-profile-date', 
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>', 
            `Joined ${joinDate}`);
            
        setProfileField('#github-profile-company', 
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>', 
            data.company);
            
        setProfileField('#github-profile-location', 
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>', 
            data.location);
        
        // อัปเดตสถิติและ bio
        $('#repo-count').text(data.public_repos || "0");
        $('#followers-count').text(data.followers || "0");
        $('#following-count').text(data.following || "0");
        $('#github-profile-bio').text(data.bio || 'Developer passionate about creating amazing web experiences');
    })
    .fail(() => {
        console.error("Unable to load GitHub data");
        showNotification('Unable to load GitHub data.', 'error');
    });
}

/**
 * โหลดและแสดงรายการ repositories
 */
function loadRepositories() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/repos`, repos => {
        document.getElementById("repo-list").innerHTML = repos.map(createRepoItem).join("");
    });
}

/**
 * โหลดและแสดงรายการ followers
 */
function loadFollowers() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/followers`, followers => {
        document.getElementById("followers-list").innerHTML = followers.map(createUserItem).join("");
    });
}

/**
 * โหลดและแสดงรายการ following
 */
function loadFollowing() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/following`, following => {
        document.getElementById("following-list").innerHTML = following.map(createUserItem).join("");
    });
}

// เริ่มต้นการทำงาน
updateRateLimit();
loadUserProfile();
loadRepositories();
loadFollowers();
loadFollowing();