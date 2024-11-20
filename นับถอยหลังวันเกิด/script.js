document.addEventListener("DOMContentLoaded", () => {
    const friendList = document.getElementById("friend-list");
    const friends = JSON.parse(localStorage.getItem("friends")) || [];

    // ฟังก์ชันแสดงรายชื่อเพื่อน
    const renderFriends = () => {
        if (!friendList) return; // หากไม่มี friend-list ให้ข้ามฟังก์ชันนี้
        friendList.innerHTML = ""; // ล้างข้อมูลเก่า

        friends.forEach((friend, index) => {
            const listItem = document.createElement("div");
            listItem.classList.add("friend-item");

            listItem.innerHTML = `
                <div class="friend-details">
                    <div class="friend-header">
                        <span class="friend-name">${friend.name}</span>
                        <span class="friend-birthday">${friend.birthday}</span>
                    </div>
                    <div class="friend-countdown" id="countdown-${index}">กำลังคำนวณ...</div>
                </div>
                <div>
                    <button class="delete-btn" data-index="${index}"></button>
                    <button class="edit-btn" data-index="${index}"></button>
                </div>
            `;

            friendList.appendChild(listItem);

            // อัปเดตการนับถอยหลังแบบเรียลไทม์
            updateCountdown(index, friend.birthday);
        });
    };

    // ฟังก์ชันอัปเดตข้อความการนับถอยหลัง
    const updateCountdown = (index, birthday) => {
        const countdownElement = document.getElementById(`countdown-${index}`);

        const calculateCountdown = () => {
            const today = new Date();
            const nextBirthday = new Date(birthday);
            nextBirthday.setFullYear(today.getFullYear());
            if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }

            const diffTime = nextBirthday - today;

            const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
        };

        // อัปเดตข้อความทุกวินาที
        calculateCountdown();
        setInterval(calculateCountdown, 1000);
    };

    // ฟังก์ชันลบเพื่อน
    const deleteFriend = (index) => {
        friends.splice(index, 1); // ลบข้อมูลในอาร์เรย์
        localStorage.setItem("friends", JSON.stringify(friends)); // อัปเดต Local Storage
        renderFriends(); // อัปเดตหน้าจอทันที
    };

    // ฟังก์ชันแก้ไขเพื่อน
    const editFriend = (index) => {
        const newName = prompt("กรุณาใส่ชื่อใหม่:", friends[index].name);
        const newBirthday = prompt("กรุณาใส่วันเกิดใหม่ (yyyy-mm-dd):", friends[index].birthday);

        if (newName && newBirthday) {
            friends[index].name = newName;
            friends[index].birthday = newBirthday;
            localStorage.setItem("friends", JSON.stringify(friends)); // อัปเดต Local Storage
            renderFriends(); // อัปเดตหน้าจอทันที
        }
    };

    // ตรวจสอบว่าอยู่หน้า index.html หรือ deploy.html
    if (friendList) {
        renderFriends(); // แสดงรายชื่อเพื่อน
        friendList.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                const index = e.target.dataset.index;
                deleteFriend(index);
            } else if (e.target.classList.contains("edit-btn")) {
                const index = e.target.dataset.index;
                editFriend(index);
            }
        });
    }

    // หากอยู่ใน index.html ให้เพิ่มฟังก์ชันการบันทึกข้อมูล
    const form = document.getElementById("birthday-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("friend-name").value;
            const birthday = document.getElementById("friend-birthday").value;

            friends.push({ name, birthday }); // เพิ่มข้อมูลใหม่
            localStorage.setItem("friends", JSON.stringify(friends)); // อัปเดต Local Storage
            renderFriends(); // อัปเดตหน้าจอทันที
            form.reset(); // รีเซ็ตฟอร์ม
        });
    }
});
