// —[ Deploy Section Tab Management ]————————————————————————————————————————————

/**
 * จัดการการแสดงผลเนื้อหาใน deploy section
 * ทำงานร่วมกับ radio buttons และ CSS peer selectors
 */

// รอให้ DOM โหลดเสร็จ
$(document).ready(function () {

    // ตั้งค่าเริ่มต้น - แสดง projects tab
    initializeDeploySection();

    // เพิ่ม event listeners สำหรับการเปลี่ยน tabs
    setupTabEventListeners();

    // เพิ่ม event listeners สำหรับ navigation menu
    setupNavigationEventListeners();
});

/**
 * ตั้งค่าเริ่มต้นของ deploy section
 */
function initializeDeploySection() {
    // ตั้งค่า default tab (projects)
    $('#projects').prop('checked', true);

    // แสดงเนื้อหา projects เป็นค่าเริ่มต้น
    showTabContent('projects');

    // อัปเดต visual state
    updateTabVisualState('projects');
}

/**
 * ตั้งค่า event listeners สำหรับ tabs
 */
function setupTabEventListeners() {
    // จับ event การเปลี่ยนแปลง radio buttons
    $('input[name="status"]').on('change', function () {
        const selectedTab = $(this).attr('id');
        showTabContent(selectedTab);
        updateTabVisualState(selectedTab);

        // อัปเดต rate limit เมื่อมีการเปลี่ยน tab
        updateRateLimit();
    });

    // จับ event การคลิก labels (เพิ่มความแน่ใจ)
    $('#deploy label').on('click', function () {
        const targetId = $(this).attr('for');
        if (targetId) {
            $(`#${targetId}`).prop('checked', true).trigger('change');
        }
    });
}

/**
 * ตั้งค่า event listeners สำหรับ navigation menu
 */
function setupNavigationEventListeners() {
    // จับ event การคลิกใน navigation sidebar
    $('nav label').on('click', function () {
        const targetId = $(this).attr('for');

        // ตรวจสอบว่าเป็น tab ที่มีอยู่ใน deploy section หรือไม่
        if (['projects', 'repo', 'followers', 'following'].includes(targetId)) {
            // เปลี่ยน tab ใน deploy section
            $(`#${targetId}`).prop('checked', true);
            showTabContent(targetId);
            updateTabVisualState(targetId);

            // ปิด sidebar ในมือถือ
            if (window.innerWidth < 768) {
                closeSidebar();
            }

            // เลื่อนไปยัง deploy section
            scrollToDeploySection();
        }
    });
}

/**
 * แสดงเนื้อหาของ tab ที่เลือก
 */
function showTabContent(tabId) {
    // ซ่อนเนื้อหาทั้งหมด
    $('#projects-list, #repo-list, #followers-list, #following-list').addClass('hidden');

    // แสดงเนื้อหาของ tab ที่เลือก
    const contentMap = {
        'projects': '#projects-list',
        'repo': '#repo-list',
        'followers': '#followers-list',
        'following': '#following-list'
    };

    const targetContent = contentMap[tabId];
    if (targetContent) {
        $(targetContent).removeClass('hidden');

        // เพิ่ม animation effect
        $(targetContent).addClass('fade-in');
        setTimeout(() => {
            $(targetContent).removeClass('fade-in');
        }, 300);
    }
}

/**
 * อัปเดต visual state ของ tabs
 */
function updateTabVisualState(activeTabId) {
    // รีเซ็ต CSS classes ทั้งหมด
    $('#deploy label').removeClass('bg-gradient-to-t from-[color:var(--accent-color)]');
    $('#deploy label svg').removeClass('fill-[color:var(--primary-color)]');
    $('nav label').removeClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)]');
    $('nav label svg').removeClass('fill-[color:var(--primary-color)]');

    // เพิ่ม active state ให้ tab ที่เลือก
    $(`#deploy label[for="${activeTabId}"]`).addClass('bg-gradient-to-t from-[color:var(--accent-color)]');
    $(`#deploy label[for="${activeTabId}"] svg`).addClass('fill-[color:var(--primary-color)]');
    $(`nav label[for="${activeTabId}"]`).addClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)]');
    $(`nav label[for="${activeTabId}"] svg`).addClass('fill-[color:var(--primary-color)]');
}

/**
 * เลื่อนหน้าไปยัง deploy section
 */
function scrollToDeploySection() {
    const deploySection = document.getElementById('deploy');
    if (deploySection) {
        deploySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * ตรวจสอบและแสดงข้อความเมื่อไม่มีข้อมูล
 */
function checkEmptyContent() {
    // ตรวจสอบ projects
    if ($('#projects-list').children().length === 0 && $('#projects').is(':checked')) {
        $('#projects-list').html('<li class="col-span-full text-center p-8 text-[color:var(--text-500)]">ไม่มีโปรเจคในขณะนี้</li>');
    }

    // ตรวจสอบ repositories
    if ($('#repo-list').children().length === 0 && $('#repo').is(':checked')) {
        $('#repo-list').html('<li class="col-span-full text-center p-8 text-[color:var(--text-500)]">ไม่มีรีพอซิทอรีในขณะนี้</li>');
    }

    // ตรวจสอบ followers
    if ($('#followers-list').children().length === 0 && $('#followers').is(':checked')) {
        $('#followers-list').html('<li class="col-span-full text-center p-8 text-[color:var(--text-500)]">ไม่มีผู้ติดตามในขณะนี้</li>');
    }

    // ตรวจสอบ following
    if ($('#following-list').children().length === 0 && $('#following').is(':checked')) {
        $('#following-list').html('<li class="col-span-full text-center p-8 text-[color:var(--text-500)]">ไม่ได้ติดตามใครในขณะนี้</li>');
    }
}

/**
 * รีเฟรชเนื้อหาเมื่อมีการอัปเดตข้อมูลจาก API
 */
function refreshTabContent() {
    const currentTab = $('input[name="status"]:checked').attr('id');
    if (currentTab) {
        showTabContent(currentTab);
        // ให้เวลา DOM อัปเดตก่อนตรวจสอบ empty content
        setTimeout(() => {
            checkEmptyContent();
        }, 100);
    }
}

// เพิ่มการตรวจสอบ empty content หลังจาก API โหลดข้อมูลเสร็จ
$(window).on('load', function () {
    setTimeout(() => {
        refreshTabContent();
    }, 1000); // รอให้ API calls เสร็จ
});

/**
 * Helper function สำหรับ responsive behavior
 */
function handleResponsiveChanges() {
    // จัดการ responsive classes สำหรับ followers/following labels
    if (window.innerWidth >= 768) {
        $('label[for="followers"], label[for="following"]').addClass('md:flex').removeClass('hidden');
    } else {
        $('label[for="followers"], label[for="following"]').removeClass('md:flex');
    }
}

// ตรวจสอบ responsive changes
$(window).on('resize', handleResponsiveChanges);
handleResponsiveChanges(); // เรียกครั้งแรก

/**
 * เพิ่มการสนับสนุน keyboard navigation
 */
$(document).on('keydown', function (e) {
    // ใช้ arrow keys เพื่อเปลี่ยน tabs
    if (e.target.tagName.toLowerCase() !== 'input' && e.target.tagName.toLowerCase() !== 'textarea') {
        const tabs = ['projects', 'repo', 'followers', 'following'];
        const currentIndex = tabs.indexOf($('input[name="status"]:checked').attr('id'));

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            let newIndex;

            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % tabs.length;
            } else {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }

            const newTab = tabs[newIndex];
            $(`#${newTab}`).prop('checked', true).trigger('change');
        }
    }
});