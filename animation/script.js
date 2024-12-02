// เรียก checkElementsInView ทุกครั้งที่เลื่อนหน้าเว็บ
window.addEventListener('scroll', checkElementsInView);
window.addEventListener('load', checkElementsInView);

// เรียกฟังก์ชันเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', checkElementsInView);

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkElementsInView() {
    const animationShow = document.querySelectorAll('.animationShow');
    const animationShowX = document.querySelectorAll('.animationShow-x');
    const animationShowY = document.querySelectorAll('.animationShow-y');

    // เพิ่มแอนิเมชันสำหรับ elements ที่เลื่อนในแนว X
    animationShow.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('showAnimation');
        }
    });

    // เพิ่มแอนิเมชันสำหรับ elements ที่เลื่อนในแนว X
    animationShowX.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('showAnimation-x');
        }
    });

    // เพิ่มแอนิเมชันสำหรับ elements ที่เลื่อนในแนว Y
    animationShowY.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('showAnimation-Y');
        }
    });
}