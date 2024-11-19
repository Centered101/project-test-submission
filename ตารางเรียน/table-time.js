function highlightTodayAndTime() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    const days = {
        1: document.querySelector("tbody tr:nth-child(1)"), // จันทร์
        2: document.querySelector("tbody tr:nth-child(2)"), // อังคาร
        3: document.querySelector("tbody tr:nth-child(3)"), // พุธ
        4: document.querySelector("tbody tr:nth-child(4)"), // พฤหัสบดี
        5: document.querySelector("tbody tr:nth-child(5)")  // ศุกร์
    };

    const timeSlots = document.querySelectorAll("thead th");
    const dayRows = document.querySelectorAll("tbody tr");

    // วันหยุด
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        document.body.innerHTML = "<h1 class='text-center text-red-500 text-6xl'>วันหยุด</h1> <br /> <p class='text-xl'> ครับน้องงง</p>";
        return;
    }

    // ไฮไลท์วันปัจจุบัน
    if (days[dayOfWeek]) {
        days[dayOfWeek].style.backgroundColor = '#409EFE';
    }

    // ตรวจสอบช่วงเวลา
    const timePeriods = [
        { start: 7 * 60 + 50, end: 8 * 60 + 15 },
        { start: 8 * 60 + 15, end: 9 * 60 + 15 },
        { start: 9 * 60 + 15, end: 10 * 60 + 15 },
        { start: 10 * 60 + 15, end: 11 * 60 + 15 },
        { start: 11 * 60 + 15, end: 12 * 60 + 15 },
        { start: 12 * 60 + 15, end: 13 * 60 + 15 },
        { start: 13 * 60 + 15, end: 14 * 60 + 15 },
        { start: 14 * 60 + 15, end: 15 * 60 + 15 }
    ];

    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // ไฮไลท์กิจกรรมหน้าเสาธง
    const flagCeremonyCell = document.querySelector("tbody tr:first-child td:nth-child(2)");

    timePeriods.forEach((period, index) => {
        if (currentTimeInMinutes >= period.start && currentTimeInMinutes < period.end) {
            if (timeSlots[index + 1]) {
                timeSlots[index + 0].style.color = '#409EFE';
            }
        }
    });
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บ
window.onload = highlightTodayAndTime;

// อัปเดตทุก 1 นาที
setInterval(highlightTodayAndTime, 1);

document.querySelectorAll('.table_component td').forEach(cell => {
    // ฟังก์ชันแสดงเนื้อหาของ cell เมื่อโฮเวอร์หรือแตะ
    cell.addEventListener('mouseover', function () {
        document.getElementById('deploy-content').textContent = this.innerText;
    });
    cell.addEventListener('touchstart', function () {
        document.getElementById('deploy-content').textContent = this.innerText;
    });

    // ฟังก์ชันล้างเนื้อหาเมื่อเลิกโฮเวอร์
    cell.addEventListener('mouseout', function () {
        // document.getElementById('deploy-content').textContent = '';
    });
    cell.addEventListener('touchend', function () {
        // document.getElementById('deploy-content').textContent = '';
    });

    // ฟังก์ชันแสดงเนื้อหาของ cell เมื่อคลิกหรือแตะ
    cell.addEventListener('click', function () {
        document.getElementById('deploy-content').textContent = this.innerText;
    });
});