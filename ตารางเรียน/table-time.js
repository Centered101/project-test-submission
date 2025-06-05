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

    timePeriods.forEach((period, index) => {
        if (currentTimeInMinutes >= period.start && currentTimeInMinutes < period.end) {
            if (timeSlots[index + 1]) {
                timeSlots[index + 1].style.backgroundColor = '#EFEFEF';
                timeSlots[index + 0].style.backgroundColor = '#409EFE';
                timeSlots[index + 0].style.color = '#FFF';
            }
        }
    });
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บ
window.onload = highlightTodayAndTime;

setInterval(highlightTodayAndTime, 1000);

document.querySelectorAll('.table_component th, .table_component td').forEach(cell => {
    // สร้าง element สำหรับป๊อปอัพ
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.position = 'absolute';
    popup.style.display = 'none';
    popup.style.backgroundColor = '#409EFE';
    popup.style.color = '#FFF';
    popup.style.borderWidth = "1px";
    popup.style.borderRadius = "4px";
    popup.style.padding = '8px';
    popup.style.pointerEvents = 'none'; // ป้องกันการรบกวนการโต้ตอบ
    popup.style.maxWidth = '200px';
    popup.style.wordWrap = 'break-word';
    document.body.appendChild(popup);

    // ฟังก์ชันคำนวณตำแหน่ง
    function setPopupPosition(x, y) {
        const popupWidth = popup.offsetWidth || 200; // เผื่อยังไม่แสดง
        const popupHeight = popup.offsetHeight || 40;
        const padding = 10;

        // ตรวจว่าขวาเกินไหม
        if (x + popupWidth + padding > window.innerWidth) {
            x = x - popupWidth - padding;
        } else {
            x = x + padding;
        }

        // ตรวจว่าล่างเกินไหม
        if (y + popupHeight + padding > window.innerHeight) {
            y = y - popupHeight - padding;
        } else {
            y = y + padding;
        }

        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
    }

    cell.addEventListener('mouseover', function (event) {
        popup.textContent = this.innerText;
        popup.style.display = 'block';
        setPopupPosition(event.pageX, event.pageY);
    });

    cell.addEventListener('mousemove', function (event) {
        setPopupPosition(event.pageX, event.pageY);
    });

    cell.addEventListener('mouseout', function () {
        popup.style.display = 'none';
    });

    // รองรับมือถือ touch
    cell.addEventListener('touchstart', function (event) {
        popup.textContent = this.innerText;
        popup.style.display = 'block';
        const touch = event.touches[0];
        setPopupPosition(touch.pageX, touch.pageY);
    });

    cell.addEventListener('touchend', function () {
        popup.style.display = 'none';
    });
});
