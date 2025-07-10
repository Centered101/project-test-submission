fetch("https://api.github.com/rate_limit")
    .then(response => response.json())
    .then(data => {
        const remaining = data.rate.remaining;
        const resetTime = new Date(data.rate.reset * 1000).toLocaleTimeString();
        const $rateStatus = $("#rateStatus").removeClass("animate-pulse");

        const warningMessage = (margin = "") => `
            <div class="bg-[color:var(--white-smoker)] shadow-inne shadow-inner text-[color:var(--text-color)] text-sm text-wrap border rounded-xl ${margin} p-2">
                <span class="flex items-center justify-center gap-2">
                    <svg class="size-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                    You have reached the API limit! Please wait until ${resetTime}.
                 </span>
            </div>`;

        $(window).on('load', function () {
            if (remaining <= 10) {
                showNotification('Low API requests remaining! Please wait!');
            }
        });

        if (remaining === 0) {
            $("#repo-list").html(warningMessage("text-center m-0"));
            $("#followers-list, #following-list").html(warningMessage("text-center m-2 md:m-4 !mb-0"));
            $rateStatus.html(`
            <p>Remaining: <span id="rate-remaining" title="${remaining} requests" class="text-[#409EFE]">${remaining}</span> / 60 requests</p>
            <p class="flex items-center gap-2"><svg class="size-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            <span>You have reached the API limit! Please wait until ${resetTime}</span></p>
            `);
        } else {
            $rateStatus.html(`
            <p>Remaining: <span id="rate-remaining" title="${remaining} requests" class="text-[#409EFE]">${remaining}</span> / 60 requests</p>
            <p>Reset time: <span>${resetTime}</span></p>
            `);
        }

        $("#rate-reset").text(resetTime); // ถ้ามี element นี้ไว้ใช้อย่างอื่นก็ยังคงอยู่ได้

    })
    .catch(error => {
        console.error("Error fetching API data:", error);
        showNotification('Error fetching API data', 'error');
    });

// ตั้งค่าชื่อหน้าต่างเว็บเป็นชื่อ GitHub Profile
const username = "Centered101";
document.title = `GitHub API Profile - ${username}`;

// ดึงข้อมูลผู้ใช้จาก GitHub
fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
        // เปลี่ยน favicon
        const link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "image/x-icon";
        link.href = data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg";
        document.head.appendChild(link);

        // เพิ่ม meta og:image
        const ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.setAttribute("content", data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg");
        document.head.appendChild(ogImage);

        // เพิ่ม meta twitter:image
        const twitterImage = document.createElement("meta");
        twitterImage.setAttribute("property", "twitter:image");
        twitterImage.setAttribute("content", data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg");
        document.head.appendChild(twitterImage);
    })
    .catch(error => {
        console.error("Unable to load GitHub data.:", error);
        showNotification('Unable to load GitHub data.', 'error');
    });

// ฟังก์ชันดึงข้อมูลจาก URL แล้วเรียก callback พร้อมข้อมูลที่ได้
async function fetchData(url, callback) {
    try {
        const response = await fetch(url); // เรียกข้อมูลจาก API
        const data = await response.json(); // แปลงข้อมูลเป็น JSON
        callback(data); // ส่งข้อมูลให้ callback ใช้งานต่อ
    } catch (error) {
        // กรณีเกิดข้อผิดพลาดในการ fetch
        console.error("Error fetching data:", error);
    }
}

// ดึงข้อมูลโปรไฟล์
fetchData(`https://api.github.com/users/${username}`, function (data) {
    $('#profile-img').attr('src', data.avatar_url || "https://project-test-submission.netlify.app/images/icon.svg");
    $('#profile-name').html(data.login || "Developer");
    $('#profile-location').text(data.location);
    $('#profile-bio').text(data.bio);

    $('#repo-count').text(data.public_repos || "0");
    $('#followers-count').text(data.followers || "0");
    $('#following-count').text(data.following || "0");

    // แสดง/ซ่อน location
    // Location
    if (data.location) {
        $('#profile-location')
            .addClass('block')
            .removeClass('hidden')
            .html(`
<svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-location">
    <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"/>
</svg>
                ${data.location}
            `);
    } else {
        $('#profile-location').addClass('hidden').removeClass('block');
    }

    // แสดง/ซ่อน bio
    if (data.bio) {
        $('#profile-bio').addClass('block').removeClass('hidden');
    } else {
        $('#profile-bio').addClass('hidden').removeClass('block');
    }

    // ซ่อน profile-about ถ้า location และ bio ไม่มี
    if (!data.location && !data.bio) {
        $('#profile-about').addClass('hidden').removeClass('block');
    } else {
        $('#profile-about').addClass('block').removeClass('hidden');
    }
});

// ดึงรายชื่อ Repo
fetchData(`https://api.github.com/users/${username}/repos`, repos => {
    const repoList = document.getElementById("repo-list");

    repoList.innerHTML = repos.map(repo =>
        `
<li>
    <a translate="no" title='${repo.name}${repo.language ? "ㅤ" + repo.language : ""}' href="${repo.html_url}" target="_blank" class="flex flex-col gap-2 border border-[#409EFE] rounded p-2 active:bg-[#E3F2FD] md:hover:bg-[#E3F2FD]">
        <span class="flex items-center gap-1">
            <img src="${repo.owner.avatar_url}" class="size-6 border rounded-full" onerror="this.src='https://project-test-submission.netlify.app/images/icon.svg'">
            <span class="text-sm font-normal truncate">${repo.owner.login}</span>
        </span>
        <span class="text-[#409EFE] truncate">${repo.name}</span>
        <span class="text-sm font-normal truncate">${repo.language || `&#160;`}</span>
    </a>
</li>
`
    ).join("");
});

// ดึงรายชื่อผู้ติดตาม
fetchData(`https://api.github.com/users/${username}/followers`, followers => {
    document.getElementById("followers-list").innerHTML = followers.map(follower =>
        `
<li>
    <a title="${follower.login}" href="${follower.html_url}" target="_blank" class="flex justify-between items-center gap-2 font-normal p-2 md:px-4 active:bg-[#E3F2FD] md:hover:bg-[#E3F2FD] group">
        <p translate="no" class="flex items-center gap-2">
            <img src="${follower.avatar_url}" class="size-8 flex-1 bg-[#F5F5F5] border rounded-full" onerror="this.src='https://project-test-submission.netlify.app/images/icon.svg'">
            <span>${follower.login}</span>
        </p>
        <svg xmlns=http://www.w3.org/2000/svg height=16 viewBox="0 -960 960 960" width=16>
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
    </a>
</li>
`
    ).join("");
});

// ดึงรายชื่อที่กำลังติดตาม
fetchData(`https://api.github.com/users/${username}/following`, following => {
    document.getElementById("following-list").innerHTML = following.map(following =>
        `
<li>
    <a title="${following.login}" href="${following.html_url}" target="_blank" class="flex justify-between items-center gap-2 font-normal p-2 md:px-4 active:bg-[#E3F2FD] md:hover:bg-[#E3F2FD] group">
        <p translate="no" class="flex items-center gap-2">
            <img src="${following.avatar_url}" class="size-8 flex-1 bg-[#F5F5F5] border rounded-full" onerror="this.src='https://project-test-submission.netlify.app/images/icon.svg'">
            <span>${following.login}</span>
        </p>
        <svg xmlns=http://www.w3.org/2000/svg height=16 viewBox="0 -960 960 960" width=16>
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
    </a>
</li>
`
    ).join("");
});
