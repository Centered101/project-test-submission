// เก็บสถานะว่ามีการแจ้งเตือนแล้วหรือยัง
let lowApiNotified = false;

/**
 * ฟังก์ชันตรวจสอบและอัปเดต Rate Limit ของ GitHub API
 * - ดึงข้อมูลจาก GitHub API rate limit endpoint
 * - แสดงจำนวนคำขอที่เหลือและเวลา reset
 * - แจ้งเตือนเมื่อ API limit ใกล้หมดหรือหมดแล้ว
 */
function updateRateLimit() {
    fetch("https://api.github.com/rate_limit")
        .then(response => response.json())
        .then(data => {
            const remaining = data.rate.remaining;
            const resetTime = new Date(data.rate.reset * 1000).toLocaleTimeString();
            const $rateStatus = $("#rateStatus").removeClass("animate-pulse");

            // ฟังก์ชันสร้าง HTML สำหรับข้อความเตือน API limit
            const warningMessage = (margin = "") => `
                <div class="bg-[color:var(--white-smoker)] shadow-inner text-[color:var(--text-color)] text-sm text-wrap border rounded-xl ${margin} p-2">
                    <span class="flex items-center justify-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-red-500"></i>
                        You have reached the API limit! Please wait until ${resetTime}.
                    </span>
                </div>`;

            // ฟังก์ชันตรวจสอบจำนวนคำขอที่เหลือและแจ้งเตือน
            function checkRemaining(remaining) {
                if (remaining <= 10 && remaining > 0 && !lowApiNotified) {
                    showNotification('Low API requests remaining! Please wait!');
                    lowApiNotified = true; // กันการแจ้งซ้ำ
                } else if (remaining > 10) {
                    lowApiNotified = false; // reset flag เมื่อโควตากลับมามากกว่า 10
                }
            }

            // ตรวจสอบจำนวนการเรียก API
            checkRemaining(remaining);

            // แสดงข้อความเตือนเมื่อ API limit หมด
            if (remaining === 0) {
                $("#repo-list").html(warningMessage("text-center m-0"));
                $("#followers-list, #following-list").html(warningMessage("text-center m-2 md:m-4"));
                $rateStatus.html(`
                    <p>Remaining: <span id="rate-remaining" title="${remaining} requests" class="fade-in text-[color:var(--primary-color)]">${remaining}</span> / 60 requests</p>
                    <p class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-red-500"></i>
                        <span>Please wait until ${resetTime}</span>
                    </p>
                `);
            } else {
                // แสดงสถานะ rate limit ปกติ
                $rateStatus.html(`
                    <p>Remaining: <span id="rate-remaining" title="${remaining} requests" class="text-[color:var(--primary-color)]">${remaining}</span> / 60 requests</p>
                    <p>Reset time: <span>${resetTime}</span></p>
                `);
            }
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
            showNotification('Error fetching API data', 'error');
        });
}

updateRateLimit();

/**
 * การตั้งค่าข้อมูลพื้นฐานของหน้าเว็บ
 */
// ตั้งชื่อผู้ใช้ GitHub ที่ต้องการแสดงข้อมูล
const username = "Centered101";
// ตั้งชื่อหน้าต่างเว็บ
document.title = `GitHub Profile ${username}`;

/**
 * ฟังก์ชันดึงข้อมูลผู้ใช้จาก GitHub และตั้งค่า meta tags
 * - ดึงข้อมูลโปรไฟล์ผู้ใช้
 * - ตั้งค่า favicon
 * - ตั้งค่า meta tags สำหรับ social sharing
 * - สร้างปุ่ม Follow และ Share
 */
fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
        // ตั้งค่า favicon ให้เป็นรูป avatar ของผู้ใช้
        const link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "image/x-icon";
        link.href = data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg";
        document.head.appendChild(link);

        // ตั้งค่า meta tag สำหรับ Open Graph (Facebook, etc.)
        const ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.setAttribute("content", data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg");
        document.head.appendChild(ogImage);

        // ตั้งค่า meta tag สำหรับ Twitter
        const twitterImage = document.createElement("meta");
        twitterImage.setAttribute("property", "twitter:image");
        twitterImage.setAttribute("content", data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg");
        document.head.appendChild(twitterImage);

        // สร้างปุ่ม Follow และ Share profile
        $('#github-follow-button-wrapper').append(`
            <a title="Follow ${username}" aria-label="Follow ${username}" href='https://github.com/${username}' target="_blank"
                class="relative w-full sm:w-1/2 md:max-w-56 flex justify-center items-center gap-2 bg-[color:var(--white-smoker)] border rounded-lg truncate p-2 overflow-hidden active:bg-[color:var(--accent-color)]">
                <span>Follow</span>
            </a>
            <button onclick="share()" title="share profile ${username}" aria-label="share profile ${username}"
                class="relative w-full sm:w-1/2 md:max-w-56 flex justify-center items-center gap-2 bg-[color:var(--white-smoker)] border rounded-lg truncate p-2 overflow-hidden active:bg-[color:var(--accent-color)]">
                <span>Share profile</span>
            </button>
        `);
    })
    .catch(error => {
        console.error("Unable to load GitHub data:", error);
        showNotification('Unable to load GitHub data.', 'error');
    });

/**
 * ฟังก์ชัน Helper สำหรับดึงข้อมูลจาก API และส่งต่อให้ callback function
 * @param {string} url - URL ที่ต้องการดึงข้อมูล
 * @param {function} callback - ฟังก์ชันที่จะได้รับข้อมูลเมื่อดึงสำเร็จ
 */
async function fetchData(url, callback) {
    try {
        const response = await fetch(url); // เรียกข้อมูลจาก API
        const data = await response.json(); // แปลงข้อมูลเป็น JSON
        callback(data); // ส่งข้อมูลให้ callback function ใช้งานต่อ
    } catch (error) {
        // จัดการข้อผิดพลาดในการ fetch
        console.error("Error fetching data:", error);
    }
}

/**
 * ดึงและแสดงข้อมูลโปรไฟล์ผู้ใช้
 * - รูปโปรไฟล์, ชื่อ, location, bio
 * - จำนวน repositories, followers, following
 * - จัดการการแสดง/ซ่อน elements ตามข้อมูลที่มี
 */
$.getJSON(`https://api.github.com/users/${username}`, function (data) {
    // ตั้งค่ารูปโปรไฟล์
    $('#profile-img').attr('src', data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg");

    // ตั้งค่าชื่อ
    $('#profile-name').html(data.name || 'Developer');

    // ตั้งค่าข้อมูลสถิติ
    $('#repo-count').text(data.public_repos || "0");
    $('#followers-count').text(data.followers || "0");
    $('#following-count').text(data.following || "0");
    $('#gist-count').removeClass('loading-skeleton').text(data.public_gists || "0");

    // ฟังก์ชันกลาง
    function setProfileField(selector, value, fallback = null) {
        if (value) {
            $(`${selector}`).append(value);
            $(selector).removeClass('hidden').addClass('flex'); // แสดงออกมา
        } else if (fallback) {
            $(`${selector}`).append(fallback);
            $(selector).removeClass('hidden').addClass('flex'); // ยังแสดง (แต่ใช้ fallback)
        } else {
            $(selector).addClass('hidden').removeClass('flex'); // ซ่อนถ้าไม่มีข้อมูล
        }
    }

    // เรียกใช้ฟังก์ชัน
    setProfileField('#github-profile-date', new Date(data.created_at).toLocaleDateString('th-TH'));
    setProfileField('#github-profile-company', data.company);
    setProfileField('#github-profile-location', data.location);
    setProfileField('#github-profile-bio', data.bio);
});



/**
 * ดึงและแสดงรายการ repositories
 * - แสดงชื่อ repo, เจ้าของ, ภาษาที่ใช้
 * - สร้างลิงก์ไปยัง repository
 */
fetchData(`https://api.github.com/users/${username}/repos`, repos => {
    const repoList = document.getElementById("repo-list");

    repoList.innerHTML = repos.map(repo =>
        `<li>
            <a translate="no" title='${repo.name}${repo.language ? " • " + repo.language : ""}' href="${repo.html_url}" target="_blank" class="flex flex-col gap-2 bg-[color:var(--bg-color)] border rounded shadow-inner p-2 active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)]">
                <span class="flex items-center gap-1">
                    <img src="${repo.owner.avatar_url}" class="size-6 border rounded-full" onerror="this.src='https://project-test-submission.netlify.app/images/icon.svg'">
                    <span class="text-sm font-normal text-[color:var(--text-400)] truncate">${repo.owner.login}</span>
                </span>
                <span class="text-[color:var(--primary-color)] truncate">${repo.name}</span>
                <span class="text-sm font-normal text-[color:var(--text-500)] truncate">${repo.language || '&nbsp;'}</span>
            </a>
        </li>`
    ).join("");
});

/**
 * ดึงและแสดงรายการผู้ติดตาม (followers)
 * - แสดงรูปโปรไฟล์และชื่อผู้ติดตาม
 * - สร้างลิงก์ไปยังโปรไฟล์ของแต่ละคน
 */
fetchData(`https://api.github.com/users/${username}/followers`, followers => {
    document.getElementById("followers-list").innerHTML = followers.map(follower =>
        `<li>
            <a title="${follower.login}" href="${follower.html_url}" target="_blank" class="flex justify-between items-center gap-2 font-normal p-2 md:px-4 active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)] group">
                <p translate="no" class="flex items-center gap-2">
                    <img src="${follower.avatar_url}" class="size-8 flex-1 bg-[color:var(--white-smoker)] border rounded-full" onerror="this.src='https://project-test-submission.netlify.app/images/icon.svg'">
                    <span>${follower.login}</span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" class="size-[1em]">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
            </a>
        </li>`
    ).join("");
});

/**
 * ดึงและแสดงรายการที่กำลังติดตาม (following)
 * - แสดงรูปโปรไฟล์และชื่อผู้ที่กำลังติดตาม
 * - สร้างลิงก์ไปยังโปรไฟล์ของแต่ละคน
 */
fetchData(`https://api.github.com/users/${username}/following`, following => {
    document.getElementById("following-list").innerHTML = following.map(following =>
        `<li>
            <a title="${following.login}" href="${following.html_url}" target="_blank" class="flex justify-between items-center gap-2 font-normal p-2 md:px-4 active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)] group">
                <p translate="no" class="flex items-center gap-2">
                    <img src="${following.avatar_url}" class="size-8 flex-1 bg-[color:var(--white-smoker)] border rounded-full" onerror="this.src='https://project-test-submission.netlify.app/images/icon.svg'">
                    <span>${following.login}</span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" class="size-[1em]">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
            </a>
        </li>`
    ).join("");
});