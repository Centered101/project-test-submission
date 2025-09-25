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

// API limit warning
function createApiLimitWarning(resetTime, margin = "") {
    return `
        <div class="h-screen flex items-center justify-center bg-[color:var(--white-smoker)] shadow-inner text-[color:var(--text-color)] text-sm border rounded-xl ${margin} p-2">
            <span class="flex flex-col items-center justify-center gap-2">
                <i class="fa-solid fa-circle-exclamation text-3xl md:text-5xl text-red-500"></i>
                <p class="text-xl md:text-3xl">You have reached the API limit! Please wait until ${resetTime}.</p>
            </span>
        </div>`;
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
            showNotification('Error fetching API data', 'error');
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

// Fetch wrapper
async function fetchData(url, callback) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        showNotification('Error fetching data from GitHub API', 'error');
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

// Repo item
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

// User item
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
                <i class="fa-solid fa-arrow-up-right-from-square text-gray-500 group-hover:text-[color:var(--primary-color)]"></i>
            </a>
        </li>`;
}

// Load profile
function loadUserProfile() {
    $.getJSON(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}`, function (data) {
        document.title = `GitHub Profile ${CONFIG.username}`;
        const avatarUrl = data.avatar_url || CONFIG.fallbackIcon;

        setupMetaTags(avatarUrl);
        createActionButtons(CONFIG.username);

        $('#profile-img').attr('src', avatarUrl);
        $('#profile-name').removeClass('loading-skeleton')
            .html(`<h1 class="text-3xl font-bold">${data.name || data.login}</h1>`);
        $('#profile-datename').removeClass('loading-skeleton')
            .html(`<p class="text-xl opacity-90">@${data.login}</p>`);

        const joinDate = new Date(data.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        setProfileField('#github-profile-date',
            '<i class="fa-regular fa-calendar"></i>',
            `Joined ${joinDate}`);

        setProfileField('#github-profile-company',
            '<i class="fa-solid fa-building"></i>',
            data.company);

        setProfileField('#github-profile-location',
            '<i class="fa-solid fa-location-dot"></i>',
            data.location);

        $('#repo-count').text(data.public_repos || "0");
        $('#followers-count').text(data.followers || "0");
        $('#following-count').text(data.following || "0");

        if (data.bio) {
            $('#github-profile-bio').text(data.bio);
        } else {
            $('#github-profile-bio').addClass('hidden').html('');
        }
    })
    .fail(() => {
        console.error("Unable to load GitHub data");
        showNotification('Unable to load GitHub data.', 'error');
    });
}

// Load repos
function loadRepositories() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/repos`, repos => {
        $("#repo-list").addClass("p-2 md:p-4").html(repos.map(createRepoItem).join(""));
    });
}

// Load followers
function loadFollowers() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/followers`, followers => {
        $("#followers-list").html(followers.map(createUserItem).join(""));
    });
}

// Load following
function loadFollowing() {
    fetchData(`${CONFIG.apiBaseUrl}/users/${CONFIG.username}/following`, following => {
        $("#following-list").html(following.map(createUserItem).join(""));
    });
}

// Init
updateRateLimit();
loadUserProfile();
loadRepositories();
loadFollowers();
loadFollowing();
