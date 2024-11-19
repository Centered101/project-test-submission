// ฟังก์ชันหลักสำหรับการเลือกอิลิเมนต์จาก DOM
function $(id) {
    // ตรวจสอบว่า id เป็น string หรือไม่ ถ้าใช่จะใช้ document.getElementById ดึงอิลิเมนต์
    var el = 'string' == typeof id
        ? document.getElementById(id)
        : id;

    // เพิ่มเมธอด 'on' ให้กับอิลิเมนต์ สำหรับจับ event เช่น 'click', 'DOMContentLoaded'
    el.on = function (event, fn) {
        // แปลง 'content loaded' เป็น event ที่เบราว์เซอร์รองรับ เช่น 'DOMContentLoaded' หรือ 'load'
        if ('content loaded' == event) {
            event = window.attachEvent ? "load" : "DOMContentLoaded";
        }
        // ใช้ addEventListener ถ้ารองรับ ไม่เช่นนั้นจะใช้ attachEvent สำหรับเบราว์เซอร์เก่า
        el.addEventListener
            ? el.addEventListener(event, fn, false)
            : el.attachEvent("on" + event, fn);
    };

    // เมธอด 'all' เพื่อดึงอิลิเมนต์ทั้งหมดที่ตรงกับ selector ภายในอิลิเมนต์หลัก
    el.all = function (selector) {
        return $(el.querySelectorAll(selector));
    };

    // เมธอด 'each' สำหรับวนลูปผ่านอิลิเมนต์ในคอลเลคชัน
    el.each = function (fn) {
        for (var i = 0, len = el.length; i < len; ++i) {
            fn($(el[i]), i);
        }
    };

    // เมธอด 'getClasses' สำหรับดึงคลาสทั้งหมดของอิลิเมนต์เป็น array
    el.getClasses = function () {
        return this.getAttribute('class').split(/\s+/);
    };

    // เมธอด 'addClass' เพื่อเพิ่มคลาสใหม่ให้อิลิเมนต์
    el.addClass = function (name) {
        var classes = this.getAttribute('class');
        el.setAttribute('class', classes
            ? classes + ' ' + name // ถ้ามีคลาสอยู่แล้วจะต่อคลาสใหม่เข้าไป
            : name); // ถ้าไม่มีจะตั้งชื่อคลาสใหม่
    };

    // เมธอด 'removeClass' สำหรับลบคลาสออกจากอิลิเมนต์
    el.removeClass = function (name) {
        var classes = this.getClasses().filter(function (curr) {
            return curr != name; // กรองคลาสที่ไม่ต้องการออก
        });
        this.setAttribute('class', classes.join(' ')); // ตั้งคลาสใหม่โดยไม่มีคลาสที่ต้องการลบ
    };

    return el; // คืนค่าอิลิเมนต์ที่มีฟังก์ชันเหล่านี้
}

// ฟังก์ชันค้นหา เพื่อไฮไลท์ลิงก์ที่ตรงกับคำค้นหา
function search() {
    // ดึงค่าคำค้นหาจาก input ที่มี id 'search' และแปลงเป็นตัวพิมพ์เล็ก
    var str = $('search').value.toLowerCase();
    // ดึงลิงก์ทั้งหมดที่อยู่ภายใน id 'files'
    var links = $('files').all('a');

    // วนลูปผ่านลิงก์แต่ละอัน
    links.each(function (link) {
        var text = link.textContent.toLowerCase(); // แปลงข้อความของลิงก์เป็นตัวพิมพ์เล็ก

        if ('..' == text) return; // ข้ามถ้าเป็นลิงก์ย้อนกลับ ('..')
        if (str.length && ~text.indexOf(str)) { // ถ้ามีคำค้นหาและพบในลิงก์
            link.addClass('highlight'); // เพิ่มคลาส 'highlight'
        } else {
            link.removeClass('highlight'); // ลบคลาส 'highlight' ถ้าไม่ตรงกับคำค้นหา
        }
    });
}

// ฟังก์ชันที่จะถูกเรียกเมื่อหน้าเว็บโหลดเสร็จ (content loaded)
$(window).on('content loaded', function () {
    // ผูกฟังก์ชัน search กับการกดปุ่มใน input ที่มี id 'search'
    $('search').on('keyup', search);
});

// ฟังก์ชันเพื่อตรวจสอบโหมดของผู้ใช้งาน
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// ตรวจสอบการตั้งค่าโหมดสีของผู้ใช้งาน
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// ตั้งค่าโหมดตามการตั้งค่าของผู้ใช้งาน
applyTheme(userPrefersDark.matches ? 'dark' : 'light');

// ฟังค์ชันที่รับการเปลี่ยนแปลงเมื่อผู้ใช้เปลี่ยนการตั้งค่าโหมดสีในระบบ
userPrefersDark.addEventListener('change', (event) => {
    applyTheme(event.matches ? 'dark' : 'light');
});