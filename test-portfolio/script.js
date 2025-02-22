// —[ loader ]———————————————————————————————————————————————————————————————————————————————————————————————————

function loader() {
    // window.location.reload(true);
    document.body.innerHTML = `
<div class="min-h-screen flex justify-center items-center bg-[#FFF] dark:[#000]">
  <span class="relative size-24">
    <span class="animate-ping absolute inline-flex size-full rounded-full bg-[#409EFE] opacity-75"></span>
    <span class="relative inline-flex rounded-full size-24 bg-[#409EFE]">
      <svg class="size-full fill-[#000] dark:fill-[#FFF]" version="1.0" xmlns="http://www.w3.org/2000/svg" width="24"
        height="24" viewBox="0 0 1200 1200">
        <path
          d="M570 32.1c-101.8 6-200.4 39-284.2 95-82.1 54.9-147.5 128-191.9 214.4C59.2 409 39.7 477.7 32.9 556c-1.6 18.4-1.6 65.3-.1 83C42.4 745.4 77 840.6 136.7 924.7c99.6 140.4 254.4 227.4 425.8 239.4 24.3 1.7 75.8.6 98.5-2 114.6-13.3 215.6-56.7 303.2-130.2 17.2-14.5 53.4-50.7 67.2-67.4 57.3-68.9 95.7-144.1 117.1-229.5 6.3-25.4 10.7-50.4 14.2-82 2.5-22.2 2.5-85 0-107-8.2-72.8-25.5-133-55.7-194.5-13.1-26.7-21.7-41.7-36.5-64-65.5-98.7-155.6-172.2-265-216.3C732 41.7 647.1 27.5 570 32.1zM637.1 97c124.2 9.6 236.3 61.8 322.2 149.9C1028.5 318 1074.4 405.2 1094 503c17.4 87 12.3 172-15.5 255.5-14.4 43.2-32.5 80.5-58 119-20.1 30.4-37.3 51.4-64.8 79l-18 18-.8-3c-.4-1.7-2.6-10.9-4.9-20.5-7-29.6-18.8-61.6-32.1-87-23-43.8-72-96.5-114.2-122.6-9-5.6-38.5-20.4-40.6-20.4-2.1 0-1-1.5 3.2-4.6 5.8-4.3 27.6-24.2 36.8-33.6 9.8-10 16.7-19.8 28.1-39.4 10.5-18.2 16-30.1 22.3-48.4 19.6-57.4 15.5-131.6-10.4-185.5-20-41.6-51.4-77.9-89.1-103-69-46-162.3-53-241.1-18-43.7 19.4-83.7 54.2-109.4 95.1-13.4 21.2-22.2 42-28.5 66.8-5.5 21.8-7.2 34.9-7.7 59.6-1.1 48.4 6.4 79.7 28.7 120 10.8 19.6 20.6 33.1 38.8 53.4 15.5 17.3 21.9 23.5 29.5 28.5l6.8 4.4-15.8 8.2c-47.9 24.7-77.2 49.1-112.6 93.8-31.6 39.9-55.2 92.3-64.3 142.4-.9 5.1-2 9.3-2.4 9.3-1.4 0-33.6-33.7-43.9-46-64.1-76.6-103-166.6-115.3-267.1-1.9-16.2-2.2-23.1-2.2-56.9s.3-40.7 2.2-56.9c7.3-59.1 23.1-113.1 48.1-163.9 11.6-23.5 18.7-35.7 33.7-58.2 20.7-31.1 40.9-55.6 67.3-81.3 87.2-84.9 197-134.1 319.1-143 11.2-.8 57.9-.6 70.1.3zm-.9 248.9c25 5.5 45.5 15.4 69.8 33.7 39.3 29.7 61 67.5 67.1 116.8 1.7 14 .6 42.1-2.1 55.1-2.9 13.8-8.3 29.5-13.2 38.4-18.1 33.1-41.3 58.4-69 75.5-45.8 28.2-117.6 30.7-162.9 5.6-26.5-14.8-49.4-34.1-64.5-54.6-15.8-21.3-24.4-41.8-29.6-70.4-2.5-13.9-3-43.8-1-56.5 1.9-11.7 6.6-29.3 10.2-37.7 3.9-9.5 14.2-26.7 23.2-38.8 8.8-11.8 28.7-31.6 39.5-39.3 19.9-14.1 47.1-25.7 68.8-29.3 12.8-2.1 51.3-1.2 63.7 1.5zM630 762.1c30.7 3.4 56.7 11.3 87.5 26.4 43.1 21.1 78.2 51.7 103.8 90.5 8 12.1 19.9 36 25.2 50.4 10.3 28.1 17.5 65.7 17.5 91.6v8.6l-13.2 7.7c-65.5 37.6-137.4 59.6-214.2 65.7-16.6 1.3-56.6 1.3-73.2 0-78.4-6.2-154.8-30.2-219.4-68.8l-11.5-6.9.2-9.9c.4-13.9 2.1-28.7 4.9-43.7C351.1 903.5 389.5 848 455 803.8c17.1-11.6 32.7-19.1 55.5-26.8 44.3-15 79.6-19.4 119.5-14.9zm-299.2 95.1c-3.8 5.8-12.5 22-17.3 32.1-13.8 29.3-23.2 59.8-28 91.4-1.3 8.2-2.1 11-3 10.6-2.2-.8-2.3-2.4-.4-13.7 5.5-32 16.5-64.9 30.9-92.4 5.8-11 17.7-30.2 18.7-30.2.3 0-.1 1-.9 2.2z" />
      </svg>
    </span>
  </span>
</div>`;

}// —[ Progress Bar ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.body.innerHTML +=
    `
<div id="progressbar" role="progressbar" aria-hidden="true" class="fixed inset-x-0 top-0 left-0 z-50 h-1 opacity-0">
    <div class="h-full bg-gradient-to-r from-[#000] to-[#000] transition-all duration-1000 ease-in-out w-0 dark:from-[#84D4FA] dark:to-[#409EFE]"></div>
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