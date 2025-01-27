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
        document.getElementById('deploy-content').innerHTML = "<h1 class='text-center text-red-500'>วันหยุดสุดสัปดาห์</h1>";
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

document.querySelectorAll('.table_component th, .table_component td').forEach(cell => {
    // สร้าง element สำหรับป๊อปอัพ
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.position = 'absolute';
    popup.style.display = 'none';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.color = 'white';
    popup.style.padding = '6px';
    popup.style.borderRadius = '0 6px 6px 6px';
    popup.style.pointerEvents = 'none'; // ป้องกันการรบกวนการโต้ตอบ
    popup.style.maxWidth = '200px'; // จำกัดความกว้างสูงสุดของป๊อปอัพ
    popup.style.wordWrap = 'break-word'; // ทำให้คำที่ยาวเกินไปถูกตัดห่อคำ
    document.body.appendChild(popup);

    // ฟังก์ชันแสดงป๊อปอัพเมื่อโฮเวอร์หรือแตะ
    cell.addEventListener('mouseover', function (event) {
        popup.textContent = this.innerText;
        popup.style.display = 'block';
        popup.style.left = event.pageX + 'px';
        popup.style.top = event.pageY + 'px';
    });

    cell.addEventListener('mousemove', function (event) {
        popup.style.left = event.pageX + 'px';
        popup.style.top = event.pageY + 'px';
    });

    cell.addEventListener('mouseout', function () {
        popup.style.display = 'none';
    });

    // ฟังก์ชันแสดงป๊อปอัพเมื่อแตะ (สำหรับอุปกรณ์สัมผัส)
    cell.addEventListener('touchstart', function (event) {
        popup.textContent = this.innerText;
        popup.style.display = 'block';
        let touch = event.touches[0];
        popup.style.left = touch.pageX + 'px';
        popup.style.top = touch.pageY + 'px';
    });

    cell.addEventListener('touchend', function () {
        popup.style.display = 'none';
    });
});
