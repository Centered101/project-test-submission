document.addEventListener("DOMContentLoaded", () => {
    const friendList = document.getElementById("friend-list");
    const sortSelect = document.getElementById("sort-select");
    const friends = JSON.parse(localStorage.getItem("friends")) || [];
    let countdownIntervals = {}; // เก็บ ID ของ Interval สำหรับแต่ละเพื่อน

    // ฟังก์ชันแสดงรายชื่อเพื่อน
    const renderFriends = () => {
        if (!friendList) return; // หากไม่มี friend-list ให้ข้ามฟังก์ชันนี้
        friendList.innerHTML = ""; // ล้างข้อมูลเก่า

        // จัดเรียงข้อมูลก่อนแสดง
        const sortedFriends = getSortedFriends();

        sortedFriends.forEach((friend, index) => {
            const listItem = document.createElement("div");
            listItem.classList.add("friend-item");

            // ตรวจสอบว่าถึงวันเกิดหรือไม่
            const today = new Date();
            const friendBirthday = new Date(friend.birthday);
            friendBirthday.setFullYear(today.getFullYear());
            const isBirthday =
                today.getDate() === friendBirthday.getDate() &&
                today.getMonth() === friendBirthday.getMonth();

            listItem.innerHTML = `
                <div class="friend-details">
                    <div class="friend-header">
                        <span class="friend-name">${friend.name} ${isBirthday ? '🎉' : ''}</span>
                        <span class="friend-birthday">${friend.birthday}</span>
                    </div>
                    <div class="friend-countdown" id="countdown-${index}">กำลังคำนวณ...</div>
                </div>
                <div class="buttons">
                    <button class="delete-btn" data-index="${index}"></button>
                    <button class="edit-btn" data-index="${index}"></button>
                </div>
            `;

            friendList.appendChild(listItem);

            // อัปเดตการนับถอยหลังแบบเรียลไทม์
            updateCountdown(index, friend.birthday);
        });
    };

    // ฟังก์ชันเรียงลำดับข้อมูล
    const getSortedFriends = () => {
        const sortType = sortSelect ? sortSelect.value : "birthday";
        if (sortType === "name") {
            return friends.slice().sort((a, b) => a.name.localeCompare(b.name)); // เรียงตามชื่อ
        } else if (sortType === "birthday") {
            return friends.slice().sort((a, b) => {
                const today = new Date();
                const aBirthday = new Date(a.birthday);
                const bBirthday = new Date(b.birthday);

                // ปรับวันเกิดเป็นปีปัจจุบัน
                aBirthday.setFullYear(today.getFullYear());
                bBirthday.setFullYear(today.getFullYear());

                if (aBirthday < today) aBirthday.setFullYear(today.getFullYear() + 1);
                if (bBirthday < today) bBirthday.setFullYear(today.getFullYear() + 1);

                return aBirthday - bBirthday; // เรียงตามวันเกิด
            });
        }
        return friends;
    };

    // ฟังก์ชันอัปเดตข้อความการนับถอยหลัง
    const updateCountdown = (index, birthday) => {
        const countdownElement = document.getElementById(`countdown-${index}`);

        if (countdownIntervals[index]) {
            clearInterval(countdownIntervals[index]); // ลบ Interval เก่าถ้ามี
        }

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

        calculateCountdown();
        countdownIntervals[index] = setInterval(calculateCountdown, 1000); // เก็บ ID Interval ไว้ในอ็อบเจกต์
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

        if (newName && newBirthday && !isNaN(new Date(newBirthday).getTime())) {
            friends[index].name = newName;
            friends[index].birthday = newBirthday;
            localStorage.setItem("friends", JSON.stringify(friends)); // อัปเดต Local Storage
            renderFriends(); // อัปเดตหน้าจอทันที
        } else {
            alert("ข้อมูลไม่ถูกต้อง!");
        }
    };

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

        if (sortSelect) {
            sortSelect.addEventListener("change", renderFriends); // เปลี่ยนการเรียง
        }
    }

    // หากอยู่ใน index.html ให้เพิ่มฟังก์ชันการบันทึกข้อมูล
    const form = document.getElementById("birthday-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("friend-name").value;
            const birthday = document.getElementById("friend-birthday").value;

            if (!name || !birthday || isNaN(new Date(birthday).getTime())) {
                alert("กรุณากรอกข้อมูลให้ถูกต้อง");
                return;
            }

            friends.push({ name, birthday }); // เพิ่มข้อมูลใหม่
            localStorage.setItem("friends", JSON.stringify(friends)); // อัปเดต Local Storage
            renderFriends(); // อัปเดตหน้าจอทันที
            form.reset(); // รีเซ็ตฟอร์ม
        });
    }
});

let i = true;

function addBirthday() {
    if (i) {
        document.documentElement.scrollTop = 0;
        document.getElementById("birthday-form").style.display = "grid";
        document.querySelector("h1").textContent = "บันทึกและนับถอยหลังวันเกิด";
        document.querySelector("header button").textContent = "ดูรายชื่อเพื่อน";
    } else {
        document.getElementById("birthday-form").style.display = "none";
        document.querySelector("h1").textContent = "รายชื่อและวันเกิด";
        document.querySelector("header button").textContent = "เพื่มรายชื่อเพื่อน";
    }
    i = !i;
}

