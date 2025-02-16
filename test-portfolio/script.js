// —[ loading ]———————————————————————————————————————————————————————————————————————————————————————————————————

function loading() {
    // window.location.reload(true);
    document.body.innerHTML = `
<div class="fixed inset-0 flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-b from-[#FFFFFF] dark:from-[#000000] to-[#F5F5F5] dark:to-[#111827] text-[#0D0D0D] dark:text-zinc-500">
<div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#409EFE] mx-auto"></div>
<h2 class="mt-4">Loading...</h2>
<p>Your adventure is about to begin</p>
</div>`;

}// —[ Progress Bar ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML +=
    `
<div id="progressbar" role="progressbar" aria-hidden="true" class="fixed inset-x-0 top-0 left-0 z-50 h-1 opacity-0">
    <div class="h-full bg-gradient-to-r from-[#84D4FA] to-[#409EFE] transition-all duration-1000 ease-in-out w-0"></div>
</div>
`;

// Progress Bar

document.addEventListener("DOMContentLoaded", function () {
    var progressBar = document.getElementById('progressbar').firstElementChild;
    progressBar.style.width = "0";

    let progress = 0;
    let interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + "%";
        progressBar.parentElement.style.opacity = "1";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressBar.parentElement.style.opacity = "0";
            }, 500);
        }
    }, 25);
});

// —[ link ]———————————————————————————————————————————————————————————————————————————————————————————————————

function nextPage(link) {
    // ปิดการใช้งานลิงก์zzz
    link.style.opacity = '0.5'; // ทำให้ลิงก์ดูจางลง
    link.style.cursor = 'default'; // เปลี่ยน cursor ให้เป็นค่า default (ไม่แสดงมือเมื่อ hover)
    link.style.pointerEvents = 'none'; // ปิดการทำงานของลิงก์ ไม่ให้สามารถคลิกได้
    setTimeout(function () {
        link.style.opacity = '1';
        link.style.cursor = 'pointer';
        link.style.pointerEvents = 'auto';
    }, 3000);
}

// เลือกทุกแท็ก <a> ใน div ที่มีคลาส 'animationShow-y'
const links = document.querySelectorAll('a');

links.forEach(link => {
    // ตรวจสอบว่า href ของแท็ก <a> ว่างหรือไม่
    if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
        // ถ้า href ว่าง ให้ปิดการใช้งานการคลิก
        link.classList.add('cursor-default');
        link.classList.add('opacity-25');
        link.onclick = (event) => {
            event.preventDefault(); // ป้องกันการทำงานของลิงค์
        };
    }
});

// —[ goBack ]———————————————————————————————————————————————————————————————————————————————————————————————————

function goBack() {
    document.body.style.backgroundColor = "#121212"
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
    document.querySelectorAll("section").forEach(function (section) {
        section.style.display = "none";
    });
    document.querySelector(".sticky").style.display = "none";
    document.getElementById("loader").style.display = "flex";
    window.history.back(true);

    setTimeout(function () {
        document.body.style.backgroundColor = "#121212"
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "grid";
        document.querySelectorAll("section").forEach(function (section) {
            section.style.display = "block";
        });
        document.getElementById("home").style.display = "grid";
        document.querySelector(".sticky").style.display = "flex";
        document.getElementById("loader").style.display = "none";
    }, 5000);
}

// —[ scroll ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section"); // ส่วนของแต่ละ section ในหน้าเว็บ
    const navLinks = document.querySelectorAll("ul li a"); // ลิงก์ในเมนู
    const aboutMenu = document.querySelector(".group ul"); // เมนูย่อยใน About

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - sectionHeight / 4)) {
            currentSection = section.getAttribute("id"); // เก็บ ID ของ section ที่อยู่ใน viewport
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active"); // ลบคลาส active ออกจากลิงก์ทั้งหมด
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active"); // เพิ่มคลาส active ให้กับลิงก์ที่ตรงกับ section ปัจจุบัน
        }
    });
});

// เรียก checkElementsInView ทุกครั้งที่เลื่อนหน้าเว็บ
window.addEventListener('scroll', checkElementsInView);
window.addEventListener('load', checkElementsInView);

document.addEventListener("DOMContentLoaded", function () {
    const skillPercentages = {
        Design: 60,
        Development: 65,
        Photoshop: 10,
        Wordpress: 10,
        Sketch: 5,
        DevOps: 50,
        AI: 20,
        html: 70,
        css: 90,
        js: 50,
        node: 30,
    };

    // ฟังก์ชันที่จะตรวจสอบว่า element อยู่ในมุมมองหรือไม่
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ฟังก์ชันที่จะเริ่มแอนิเมชันเมื่อ element เข้ามาในมุมมอง
    function checkSkillsInView() {
        const skills = document.querySelectorAll('.skill');
        skills.forEach(skill => {
            if (isElementInViewport(skill)) {
                const skillElement = skill.querySelector('.skill_per');
                const skillType = skillElement.classList[1]; // ใช้ชื่อคลาสเพื่ออ้างอิง skill เช่น AI, Design
                const tooltipElement = skillElement.querySelector('.tooltip');

                skill.classList.add('animate'); // เพิ่ม class เพื่อเริ่มแอนิเมชัน
                skillElement.style.width = skillPercentages[skillType] + '%'; // กำหนดความกว้างของแถบ
                tooltipElement.textContent = skillPercentages[skillType] + '%'; // แสดงค่า %
            }
        });
    }

    // เรียกฟังก์ชันทุกครั้งที่เลื่อนหน้าจอ
    window.addEventListener('scroll', checkSkillsInView);

    // ตรวจสอบเมื่อโหลดหน้าเว็บครั้งแรก
    checkSkillsInView();
});

// —[ scrollTop ]———————————————————————————————————————————————————————————————————————————————————————————————————

let calcScrollValue = () => {
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    // ตั้งค่าแสดงหรือซ่อนปุ่มเลื่อนกลับด้านบน
    document.getElementById('button-scroll-top').style.opacity = pos > 100 ? '1' : '0';

    // คลิกที่ปุ่มเพื่อเลื่อนกลับไปด้านบน
    document.getElementById('button-scroll-top').onclick = () => document.documentElement.scrollTop = 0;

    // อัปเดต progress bar และแสดงค่าเปอร์เซ็นต์การเลื่อน
    document.getElementById('progress').style.background = `conic-gradient(#409EFE ${scrollValue}%, #D7D7D7 ${scrollValue}%)`;
    document.getElementById('deply-value').textContent = `${scrollValue}%`;
};

// เรียกใช้งานเมื่อเลื่อนหน้าและโหลดหน้า
window.onscroll = window.onload = calcScrollValue;