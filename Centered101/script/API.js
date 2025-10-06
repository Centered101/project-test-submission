// Configuration
const CONFIG = {
    username: "Centered101",
    apiBaseUrl: "https://api.github.com",
    fallbackIcon: "https://project-test-submission.netlify.app/images/icon.svg"
};

// Global state
let lowApiNotified = false;

// Notification
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}

function handleApiLimitNotification(remaining) {
    if (remaining <= 10 && remaining > 0 && !lowApiNotified) {
        showNotification('Low API requests remaining! Please wait!');
        lowApiNotified = true;
    } else if (remaining > 10) {
        lowApiNotified = false;
    }
}

function updateRateLimitDisplay(remaining, resetTime) {
    const $rateStatus = $("#rateStatus").removeClass("animate-pulse");

    if (remaining === 0) {
        $rateStatus.html(`
            <p>Remaining: <span class="fade-in text-[color:var(--primary-color)]">${remaining}</span> / 60 requests</p>
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

function updateRateLimit() {
    fetch(`${CONFIG.apiBaseUrl}/rate_limit`)
        .then(res => res.json())
        .then(data => {
            const remaining = data.rate.remaining;
            const resetTime = new Date(data.rate.reset * 1000).toLocaleTimeString();

            handleApiLimitNotification(remaining);
            updateRateLimitDisplay(remaining, resetTime);
        })
        .catch(err => {
            console.error("Error fetching API data:", err);
        });
}

// Meta tags
function setupMetaTags(imageUrl) {
    const favicon = $("<link>", {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: imageUrl
    });
    $("head").append(favicon);

    [
        { property: "og:image", content: imageUrl },
        { property: "twitter:image", content: imageUrl }
    ].forEach(tag => {
        $("head").append($("<meta>", {
            property: tag.property,
            content: tag.content
        }));
    });
}

// Buttons
function createActionButtons(username) {
    const buttonClass = "ripple-effect relative w-full md:max-w-56 flex justify-center items-center gap-2 bg-[color:var(--white-smoker)] rounded-lg truncate p-1 overflow-hidden active:bg-[color:var(--accent-color)]";

    $('#github-follow-button-wrapper').html(`
    <button onclick="window.open('https://github.com/${username}', '_blank')" 
        title="Follow ${username}" 
        aria-label="Follow ${username}" 
        class="${buttonClass}">
        <span>Follow</span>
    </button>

    <button onclick="window.open('https://instagram.com/direct/t/17848003478856472', '_blank')" 
        title="Message for ${username}" 
        aria-label="Message for ${username}" 
        class="${buttonClass}">
        <span>Message</span>
    </button>
        
    <button class="${buttonClass}" 
        onclick="contact()" 
        title="Contact">
        <span>Contact</span>
    </button>

    <button class="${buttonClass} !w-12 !p-2 !px-3" 
        onclick="share()" 
        title="More options">
        <i class="fa-solid fa-share-nodes"></i>
    </button>
    `);
}

// Fetch wrapper
async function fetchData(url, callback) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

// Profile field helper
function setProfileField(selector, icon, value, fallback = null) {
    const displayValue = value || fallback;

    if (displayValue) {
        $(selector).removeClass('hidden').html(`
            <span class="flex items-center gap-1">
                ${icon}
                <span>${displayValue}</span>
            </span>
        `);
    } else {
        $(selector).addClass('hidden').html('');
    }
}

// กำหนดสีของภาษา (เหมือน GitHub)
const languageColors = {
    HTML: "#e34c26",
    CSS: "#563d7c",
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Ruby: "#701516",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
};

// ฟังก์ชัน repo item
function createRepoItem(repo) {
    const lang = repo.language || "";
    const color = languageColors[lang] || "#999"; // ถ้าไม่มี ให้เป็นเทา

    return `
        <li>
            <a translate="no" 
               title="${repo.name}${lang ? " • " + lang : ""}" 
               href="${repo.html_url}" target="_blank"
               class="group flex flex-col gap-2 rounded-xl border bg-[color:var(--bg-color)] p-4 shadow-sm transition-all duration-300 hover:bg-[color:var(--accent-color)]">
                
                <!-- owner -->
                <div class="flex items-center gap-1">
                    <img src="${repo.owner.avatar_url}" 
                         class="size-8 rounded-full border object-cover"
                         onerror="this.src='${CONFIG.fallbackIcon}'">
                    <span class="text-sm font-medium text-gray-400 group-hover:text-[color:var(--primary-color)] truncate">
                        ${repo.owner.login}
                    </span>
                </div>
                
                <!-- repo name -->
                <h3 class="text-base font-semibold text-[color:var(--primary-color)] truncate">
                    ${repo.name}
                </h3>
                
                <!-- language -->
                <p class="flex items-center gap-2 text-xs font-normal text-gray-500 truncate">
                    <span class="w-3 h-3 rounded-full" style="background:${color}"></span>
                    ${lang || "—"}
                </p>
            </a>
        </li>
    `;
}

// ฟังก์ชันสร้าง user item (list)
function createUserItem(user) {
    return `
        <li onclick='profile(${JSON.stringify(user)})'
            class="user-item ripple-effect flex justify-between items-center gap-2 font-normal p-2 md:px-4 
                   active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)]">
            <p translate="no" class="flex items-center gap-2">
                <img src="${user.avatar_url}" 
                     class="size-8 flex-1 bg-[color:var(--white-smoker)] border rounded-full" 
                     onerror="this.src='${CONFIG.fallbackIcon}'">
                <span>${user.login}</span>
            </p>
        </li>`;
}

// ฟังก์ชัน formatNumber — แปลงตัวเลขให้เป็น K / M
function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
}

// ─── ฟังก์ชัน profile เปิด BottomSheet ───
function profile(user) {
    const profileHTML = `
<div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col">
        <div class="w-full flex flex-row items-center">
            <img id="profile-img" class="size-20" src="${user.avatar_url}" onerror="this.src='${CONFIG.fallbackIcon}'" draggable="false" />
            <div class="w-full flex flex-wrap items-center">
                <p id="profile-name" translate="no" class="basis-full text-lg font-semibold px-2">${user.login}</p>
                <div title="repository" class="max-w-sm flex-1 flex flex-col-reverse p-2">
                    <span>Repository</span>
                    <span id="repo-count">0</span>
                </div>
                <div title="followers" class="max-w-sm flex-1 flex flex-col-reverse p-2">
                    <span>Followers</span>
                    <span id="followers-count">0</span>
                </div>
                <div title="following" class="max-w-sm flex-1 flex flex-col-reverse p-2">
                    <span>Following</span>
                    <span id="following-count">0</span>
                </div>
            </div>
        </div>
        <div id="extra-info" class="flex flex-col text-sm text-gray-500"></div>
    </div>
    <div class="w-full flex items-center justify-center gap-2">
        <button onclick="window.open('${user.html_url}', '_blank')" class="btn-primary w-full flex items-center justify-between gap-2">
            <span>GitHub profile</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
        <button onclick="BottomSheet.close()" class="btn-outline w-full">Close</button>
    </div>
</div>
    `;

    BottomSheet.open({
        title: `User information`,
        content: profileHTML
    });

    // ─── โหลดข้อมูลจาก GitHub API ───
    $.getJSON(`https://api.github.com/users/${user.login}`, function (data) {
        // Format วันที่เข้าร่วม
        const joinDate = new Date(data.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // อัปเดตค่าตัวเลข
        $('#repo-count').text(formatNumber(data.public_repos || 0));
        $('#followers-count').text(formatNumber(data.followers || 0));
        $('#following-count').text(formatNumber(data.following || 0));

        // ─── สร้าง info ทีละอัน ถ้ามีค่อย append ───
        const infoContainer = $('#extra-info');

        if (data.created_at) {
            infoContainer.append(`
                <p class="flex items-center gap-1">
                    <i class="fa-solid fa-calendar-day"></i>
                    <span>Joined ${joinDate}</span>
                </p>
            `);
        }

        if (data.company) {
            infoContainer.append(`
                <p class="flex items-center gap-1">
                    <i class="fa-solid fa-building"></i>
                    <span>${data.company}</span>
                </p>
            `);
        }

        if (data.location) {
            infoContainer.append(`
                <p class="flex items-center gap-1">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${data.location}</span>
                </p>
            `);
        }

        if (data.bio) {
            infoContainer.append(`
                <p>${data.bio}</p>
            `);
        }
    });
}


// Load profile
function loadUserProfile() {
    $.getJSON(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}`, function (data) {
        document.title = `GitHub Profile ${CONFIG.username}`;
        const avatarUrl = data.avatar_url || CONFIG.fallbackIcon;

        setupMetaTags(avatarUrl);
        createActionButtons(CONFIG.username);

        $('#profile-img').attr('src', avatarUrl);
        $('[id="profile-name"]').each(function () { $(this).removeClass('loading-skeleton').html(`<p>${data.name || data.login}</p>`); });
        $('#profile-datename').removeClass('loading-skeleton').html(`<p>@${data.login}</p>`);

        const joinDate = new Date(data.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        setProfileField('#github-profile-date',
            '<i class="fa-regular fa-calendar"></i>',
            `Joined ${joinDate || ""}`);

        setProfileField('#github-profile-company',
            '<i class="fa-solid fa-building"></i>',
            data.company || "");

        setProfileField('#github-profile-location',
            '<i class="fa-solid fa-location-dot"></i>',
            data.location || "");

        $('#repo-count').text(data.public_repos || "0");
        $('#followers-count').text(data.followers || "0");
        $('#following-count').text(data.following || "0");
        $('#github-profile-bio').text(data.bio || "N/A");
    })
        .fail(() => {
            console.error("Unable to load GitHub data");
            // showNotification('Unable to load GitHub data.', 'error');
        });
}

// Load repos
function loadRepositories() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/repos`, repos => {
        $("#repo-list").addClass("opacity-0 p-2 md:p-4").html(repos.map(createRepoItem).join(""));
    });
}

// Load followers
function loadFollowers() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/followers`, followers => {
        $("#followers-list").addClass("opacity-0").html(followers.map(createUserItem).join(""));
    });
}

// Load following
function loadFollowing() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/following`, following => {
        $("#following-list").addClass("opacity-0").html(following.map(createUserItem).join(""));
    });
}

// Init
updateRateLimit();
loadUserProfile();
loadRepositories();
loadFollowers();
loadFollowing();
