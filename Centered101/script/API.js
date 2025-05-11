// ดึงข้อมูล Rate Limit จาก GitHub API
fetch("https://api.github.com/rate_limit")
    .then(response => response.json()) // แปลงข้อมูล response ให้เป็น JSON
    .then(data => {
        const remaining = data.rate.remaining; // จำนวนครั้งที่สามารถเรียก API ได้ที่เหลือ
        const resetTime = new Date(data.rate.reset * 1000).toLocaleTimeString(); // เวลาที่โควต้าจะรีเซ็ต (แปลง timestamp เป็นเวลาอ่านง่าย)

        // แสดงข้อมูลจำนวนครั้งที่เหลือ และเวลารีเซ็ตใน element ที่กำหนด
        document.getElementById("rate-remaining").innerText = remaining;
        document.getElementById("rate-reset").innerText = resetTime;

        // ถ้าจำนวนครั้งที่เหลือน้อยกว่า 10 ให้แสดงกล่องแจ้งเตือน
        if (remaining < 10) {
            showToast(`⚠️ Low API requests remaining! Please wait!`, '#FF7070', '#FFF');
        }

        // ถ้าจำนวนครั้งที่เหลือเป็น 0 ให้แสดงกล่องแจ้งเตือนใหม่ (แทนที่เนื้อหาเดิมใน #deploy)
        if (remaining === 0) {
            $("#deploy").append(`
        <div class="bg-[#FF7070] text-[#FFF] border rounded-xl m-2 md:m-8 p-4">
            ⚠️ You have reached the API limit! Please wait until ${resetTime}.
        </div>`);
        }
    })
    .catch(error => {
        // กรณีเกิดข้อผิดพลาดในการเรียก API
        console.error("Error fetching API data:", error);
    });

// ตั้งค่าชื่อหน้าต่างเว็บเป็นชื่อ GitHub Profile
const username = "Centered101";
document.title = `GitHub Profile - ${username}`;

// ดึงข้อมูลผู้ใช้จาก GitHub
fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
        // เปลี่ยน favicon
        const link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "image/x-icon";
        link.href = data.avatar_url || "https:/project-test-submission.netlify.app/images/icon.svg";
        document.head.appendChild(link);

        // เพิ่ม meta og:image
        const ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.setAttribute("content", data.avatar_url || "https:/project-test-submission.netlify.app/images/icon.svg");
        document.head.appendChild(ogImage);

        // เพิ่ม meta twitter:image
        const twitterImage = document.createElement("meta");
        twitterImage.setAttribute("property", "twitter:image");
        twitterImage.setAttribute("content", data.avatar_url || "https:/project-test-submission.netlify.app/images/icon.svg");
        document.head.appendChild(twitterImage);
    })
    .catch(error => {
        console.error("Unable to load GitHub data.:", error);
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
fetchData(`https://api.github.com/users/${username}`, data => {
    document.getElementById("profile-img").src = data.avatar_url;
    document.getElementById("profile-name").innerHTML = data.login || "Developer";
    document.getElementById("profile-location").innerText = data.location || "-";
    document.getElementById("profile-bio").innerText = data.bio || "-";
    document.getElementById("repo-count").innerText = data.public_repos || "0";
    document.getElementById("followers-count").innerText = data.followers || "0";
    document.getElementById("following-count").innerText = data.following || "0";
});

// ดึงรายชื่อ Repo
fetchData(`https://api.github.com/users/${username}/repos`, repos => {
    const repoList = document.getElementById("repo-list");

    repoList.innerHTML = repos.map(repo =>
        `
<li>
    <a translate="no" title='${repo.name}${repo.language ? " - " + repo.language : ""}' 
       href="${repo.html_url}" 
       class="flex flex-col gap-2 border border-[#409EFE] rounded p-4 active:bg-[#E3F2FD] md:hover:bg-[#E3F2FD]">
       
        <span class="flex items-center gap-2">
            <img src="${repo.owner.avatar_url}" width="24" class="border rounded-full">
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
  <a title="${follower.login}" href="${follower.html_url}" class="flex justify-between items-center gap-2 rounded font-normal p-2 md:px-8 active:bg-[#E3F2FD] md:hover:bg-[#E3F2FD]">
    <p translate="no" class="flex items-center gap-2">
      <img src="${follower.avatar_url}" width="32" class="flex-1 border rounded-full">
      <span>${follower.login}</span>
    </p>
    <p title="Follow ${follower.login}" aria-label="Follow" class="relative max-w-32 flex-1 flex justify-center items-center gap-2 bg-[#409EFE] border border-[#409EFE] rounded-lg text-[#FFF] truncate px-2 py-1 overflow-hidden ease-in-out duration-300 hover:bg-transparent hover:border-[#000] hover:text-[#0D0D0D]">
      <span class="truncate uppercase">Follow</span>
    </p>
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
  <a title="${following.login}" href="${following.html_url}" class="flex justify-between items-center gap-2 rounded font-normal p-2 md:px-8 active:bg-[#E3F2FD] md:hover:bg-[#E3F2FD]">
    <p translate="no" class="flex items-center gap-2">
      <img src="${following.avatar_url}" width="32" class="flex-1 border rounded-full">
      <span>${following.login}</span>
    </p>
    <p title="Follow ${following.login}" aria-label="Follow" 
       class="relative max-w-32 flex-1 flex justify-center items-center gap-2 bg-[#409EFE] border border-[#409EFE] rounded-lg text-[#FFF] truncate px-2 py-1 overflow-hidden ease-in-out duration-300 hover:bg-transparent hover:border-[#000] hover:text-[#0D0D0D]">
      <span class="truncate uppercase">Follow</span>
    </p>
  </a>
</li>
`
    ).join("");
});
