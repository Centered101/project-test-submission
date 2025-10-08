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
let rateLimitTimer = null;

function handleApiLimitNotification(remaining) {
    if (remaining <= 10 && remaining > 0 && !lowApiNotified) {
        showNotification('Low API requests remaining! Please wait!', 'info');
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
            <span class="flex items-center gap-1">
                <i class="fa-solid fa-circle-info text-yellow-500"></i>
                <p>
                    <span>Please wait until</span>
                    <span class="fade-in">${resetTime}</span>
                </p>
            </span>
        `);
    } else {
        $rateStatus.html(`
            <p>Remaining: <span class="fade-in text-[color:var(--primary-color)]">${remaining}</span> / 60 requests</p>
            <p>Reset time: <span class="fade-in">${resetTime}</span></p>
        `);
    }
}

function updateRateLimit() {
    fetch(`${CONFIG.apiBaseUrl}/rate_limit`)
        .then(res => res.json())
        .then(data => {
            const remaining = data.rate.remaining;
            const resetTimestamp = data.rate.reset * 1000;
            const resetTime = new Date(resetTimestamp).toLocaleTimeString();

            handleApiLimitNotification(remaining);
            updateRateLimitDisplay(remaining, resetTime);

            // เคลียร์ตัวจับเวลาเก่าถ้ามี
            if (rateLimitTimer) clearTimeout(rateLimitTimer);

            // ตั้งเวลาให้รีเฟรชเมื่อถึงเวลาที่ reset
            const now = Date.now();
            const timeUntilReset = resetTimestamp - now;

            if (timeUntilReset > 0) {
                rateLimitTimer = setTimeout(() => {
                    console.log("API rate limit reset — refreshing data...");
                    updateRateLimit();
                }, timeUntilReset + 0);
            }
        })
        .catch(err => {
            console.error("Error fetching API data:", err);
        });
}

updateRateLimit();

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

// ─── Language Colors (GitHub Style) ───
const languageColors = {
    HTML: "#E34C26",
    CSS: "#563D7C",
    JavaScript: "#F1E05A",
    TypeScript: "#3178C6",
    Python: "#3572A5",
    Java: "#b07219",
    "C": "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Ruby: "#701516",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    JSON: "#292929",
    Markdown: "#083FA1",
    Rust: "#dea584",
    Shell: "#89e051",
    Vue: "#41b883",
    React: "#61dafb",
    Dart: "#00B4AB",
};

// ─── Create Repo Item Function ───
function createRepoItem(repo) {
    const lang = repo.language || "";
    const color = languageColors[lang] || "#8b949e";
    const description = repo.description || "";
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;

    return `
    <li onclick='repoItem(${JSON.stringify(repo).replace(/'/g, "&#39;")})' 
        title="${repo.name}" 
        translate="no"
        class="ripple-effect flex flex-col gap-2 bg-[color:var(--bg-color)] border rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 hover:border-[color:var(--primary-color)]">

        <!-- Header: Owner + Status -->
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <img src="${repo.owner.avatar_url}" 
                     class="size-8 rounded-full border object-cover"
                     onerror="this.src='${CONFIG.fallbackIcon}'">
                <span class="text-sm font-medium truncate">${repo.owner.login}</span>
            </div>
            ${repo.private ? '<i class="fa-solid fa-lock text-gray-400 text-xs"></i>' : '<i class="fa-solid fa-globe text-gray-400 text-xs"></i>'}
        </div>

        <!-- Repo Name -->
        <h3 class="text-base font-semibold text-[color:var(--primary-color)] truncate">
            ${repo.name}
        </h3>

        <!-- Description -->
        <p class="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem]">${description}</p>

        <!-- Footer: Language + Stats -->
        <div class="flex items-center justify-between gap-2 text-xs text-gray-500">
            ${lang ? `
            <div class="flex items-center gap-1">
                <span class="size-3 rounded-full" style="background:${color}"></span>
                <span class="font-medium">${lang}</span>
            </div>
            ` : '<div></div>'}
            
            <div class="flex items-center gap-1">
                ${stars > 0 ? `
                <div class="flex items-center gap-1">
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    <span>${formatNumber(stars)}</span>
                </div>
                ` : ''}
                ${forks > 0 ? `
                <div class="flex items-center gap-1">
                    <i class="fa-solid fa-code-fork"></i>
                    <span>${formatNumber(forks)}</span>
                </div>
                ` : ''}
            </div>
        </div>
    </li>
  `;
}

// ─── Format Number Function ───
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ─── Format File Size Function ───
function formatSize(kb) {
    if (kb >= 1024 * 1024) return (kb / (1024 * 1024)).toFixed(2) + ' GB';
    if (kb >= 1024) return (kb / 1024).toFixed(2) + ' MB';
    return kb + ' KB';
}

// ─── Format Date Function ───
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
}

// ─── Open BottomSheet with Repo Details ───
function repoItem(repo) {
    const langColor = languageColors[repo.language] || "#8b949e";

    const repoItemHTML = `
    <div class="flex flex-col gap-4 text-sm p-4">
        <!-- Header Section -->
        <div class="flex flex-col gap-2 pb-4 border-b">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                    <img src="${repo.owner.avatar_url}" 
                         class="size-10 rounded-full border object-cover"
                         onerror="this.src='${CONFIG.fallbackIcon}'">
                    <div>
                        <p class="text-sm font-medium">${repo.owner.login}</p>
                        <p class="text-xs text-gray-400">${repo.owner.type || 'User'}</p>
                    </div>
                </div>
                ${repo.private ?
            '<span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center gap-1"><i class="fa-solid fa-lock"></i> Private</span>' :
            '<span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1"><i class="fa-solid fa-globe"></i> Public</span>'}
            </div>

            <!-- Repo Name -->
            <h3 class="text-lg font-bold text-[color:var(--primary-color)]">
                ${repo.name}
            </h3>

            <!-- Description -->
            ${repo.description ? `
            <p class="text-sm text-gray-600 leading-relaxed">${repo.description}</p>
            ` : ''}
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-2 gap-2">
            ${repo.language ? `
            <div class="flex items-center gap-2 p-2 bg-[] rounded-lg">
                <span class="size-3 rounded-full flex-shrink-0" style="background:${langColor}"></span>
                <div>
                    <p class="text-xs text-gray-500">Language</p>
                    <p class="font-semibold">${repo.language}</p>
                </div>
            </div>
            ` : ''}
            
            ${repo.stargazers_count > 0 ? `
            <div class="flex items-center gap-2 p-2 bg-[] rounded-lg">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <div>
                    <p class="text-xs text-gray-500">Stars</p>
                    <p class="font-semibold">${formatNumber(repo.stargazers_count)}</p>
                </div>
            </div>
            ` : ''}
            
            ${repo.forks_count > 0 ? `
            <div class="flex items-center gap-2 p-2 bg-[] rounded-lg">
                <i class="fa-solid fa-code-fork text-blue-500"></i>
                <div>
                    <p class="text-xs text-gray-500">Forks</p>
                    <p class="font-semibold">${formatNumber(repo.forks_count)}</p>
                </div>
            </div>
            ` : ''}
            
            ${repo.watchers_count > 0 ? `
            <div class="flex items-center gap-2 p-2 bg-[] rounded-lg">
                <i class="fa-solid fa-eye text-purple-500"></i>
                <div>
                    <p class="text-xs text-gray-500">Watchers</p>
                    <p class="font-semibold">${formatNumber(repo.watchers_count)}</p>
                </div>
            </div>
            ` : ''}
            
            ${repo.open_issues_count !== undefined ? `
            <div class="flex items-center gap-2 p-2 bg-[] rounded-lg">
                <i class="fa-solid fa-circle-exclamation text-red-500"></i>
                <div>
                    <p class="text-xs text-gray-500">Issues</p>
                    <p class="font-semibold">${repo.open_issues_count}</p>
                </div>
            </div>
            ` : ''}
            
            ${repo.size ? `
            <div class="flex items-center gap-2 p-2 bg-[] rounded-lg">
                <i class="fa-solid fa-database text-gray-500"></i>
                <div>
                    <p class="text-xs text-gray-500">Size</p>
                    <p class="font-semibold">${formatSize(repo.size)}</p>
                </div>
            </div>
            ` : ''}
        </div>

        <!-- Additional Info -->
        ${repo.topics && repo.topics.length > 0 ? `
        <div class="flex flex-col gap-2">
            <p class="text-xs text-gray-500 font-semibold">Topics</p>
            <div class="flex flex-wrap gap-1.5">
                ${repo.topics.map(topic => `
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">${topic}</span>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${repo.license ? `
        <div class="flex items-center gap-2 text-xs text-gray-500">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>License: <strong>${repo.license.name}</strong></span>
        </div>
        ` : ''}

        <!-- Date Info -->
        <div class="flex flex-col gap-1 text-xs text-gray-400 pt-3 border-t">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-calendar-plus w-4"></i>
                <span>Created: <strong>${formatDate(repo.created_at)}</strong> (${new Date(repo.created_at).toLocaleDateString('en-US')})</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-clock-rotate-left w-4"></i>
                <span>Last updated: <strong>${formatDate(repo.updated_at)}</strong> (${new Date(repo.updated_at).toLocaleDateString('en-US')})</span>
            </div>
            ${repo.pushed_at ? `
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-code-commit w-4"></i>
                <span>Last push: <strong>${formatDate(repo.pushed_at)}</strong></span>
            </div>
            ` : ''}
        </div>

        <!-- Action Buttons -->
        <div class="w-full flex items-center gap-2 pt-2">
            <button onclick="window.open('${repo.html_url}', '_blank')" 
                    class="btn-primary flex-1 flex items-center justify-center gap-2">
                <i class="fa-brands fa-github"></i>
                <span>View on GitHub</span>
            </button>
            ${repo.homepage ? `
            <button onclick="window.open('${repo.homepage}', '_blank')" 
                    class="btn-outline flex items-center justify-center gap-2 px-4">
                <i class="fa-solid fa-link"></i>
            </button>
            ` : ''}
            <button onclick="BottomSheet.close()" 
                    class="btn-outline px-4">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
    `;

    BottomSheet.open({
        title: "Project Information",
        content: repoItemHTML,
    });
}

// ฟังก์ชันสร้าง user item (list)
function createUserItem(user) {
    return `
        <li onclick='profile(${JSON.stringify(user)})' class="user-item ripple-effect flex justify-between items-center gap-2 font-normal p-2 md:px-4 cursor-pointer active:bg-[color:var(--accent-color)] md:hover:bg-[color:var(--accent-color)]">
            <p translate="no" class="flex items-center gap-2">
                <img src="${user.avatar_url}" class="size-8 flex-1 bg-[color:var(--white-smoker)] border rounded-full" onerror="this.src='${CONFIG.fallbackIcon}'">
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
    updateRateLimit()
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
            '<i class="fa-solid fa-calendar-day"></i>',
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
