document.write('<script src="https://code.jquery.com/jquery-3.6.0.min.js"><\/script>');
document.write('<link href="https://cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/6.0.0\/css\/all.min.css" rel="stylesheet">');

// —[ Deploy Section Tab Management with Enhanced Animations ]————————————————

/**
 * จัดการการแสดงผลเนื้อหาใน deploy section
 * ทำงานร่วมกับ radio buttons และ CSS peer selectors
 * พร้อม animations และ transitions ที่สวยงาม
 */

// รอให้ DOM โหลดเสร็จ
$(document).ready(function () {
    // เพิ่ม CSS animations ลงใน document head
    injectAnimationStyles();
    
    // ตั้งค่าเริ่มต้น - แสดง projects tab
    initializeDeploySection();

    // เพิ่ม event listeners สำหรับการเปลี่ยน tabs
    setupTabEventListeners();

    // เพิ่ม event listeners สำหรับ navigation menu
    setupNavigationEventListeners();
});

/**
 * เพิ่ม CSS animations ลงใน document
 */
function injectAnimationStyles() {
    const animationCSS = `
        <style id="deploy-animations">
        /* Fade and slide animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }

        /* Animation classes */
        .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in-down {
            animation: fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-in-right {
            animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-in-left {
            animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-scale-in {
            animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-pulse-hover:hover {
            animation: pulse 0.6s ease-in-out;
        }

        /* Loading shimmer effect */
        .loading-shimmer {
            background: linear-gradient(90deg, 
                rgba(255,255,255,0.1) 25%, 
                rgba(255,255,255,0.3) 50%, 
                rgba(255,255,255,0.1) 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }

        /* Smooth transitions */
        .smooth-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .smooth-transition-fast {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Stagger animation delay */
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        /* Content slide transitions */
        .content-slide-out {
            opacity: 0;
            transform: translateX(-100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .content-slide-in {
            opacity: 1;
            transform: translateX(0);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        </style>
    `;
    
    if ($('#deploy-animations').length === 0) {
        $('head').append(animationCSS);
    }
}

/**
 * ตั้งค่าเริ่มต้นของ deploy section
 */
function initializeDeploySection() {
    // ตั้งค่า default tab (projects)
    $('#projects').prop('checked', true);

    // เพิ่ม smooth transition classes
    $('#deploy label, nav label').addClass('smooth-transition');
    
    // แสดงเนื้อหา projects เป็นค่าเริ่มต้นพร้อม animation
    setTimeout(() => {
        showTabContentWithAnimation('projects');
        updateTabVisualStateWithAnimation('projects');
    }, 100);
}

/**
 * ตั้งค่า event listeners สำหรับ tabs
 */
function setupTabEventListeners() {
    let isTransitioning = false;
    
    // จับ event การเปลี่ยนแปลง radio buttons
    $('input[name="status"]').on('change', function () {
        if (isTransitioning) return; // ป้องกันการคลิกซ้ำระหว่าง animation
        
        isTransitioning = true;
        const selectedTab = $(this).attr('id');
        
        // เพิ่ม loading effect
        showLoadingState();
        
        setTimeout(() => {
            showTabContentWithAnimation(selectedTab);
            updateTabVisualStateWithAnimation(selectedTab);
            
            // อัปเดต rate limit เมื่อมีการเปลี่ยน tab
            updateRateLimit();
            
            setTimeout(() => {
                isTransitioning = false;
                hideLoadingState();
            }, 400);
        }, 200);
    });

    // จับ event การคลิก labels (เพิ่มความแน่ใจ)
    $('#deploy label').on('click', function (e) {
        const $label = $(this);
        const targetId = $label.attr('for');
        
        // เพิ่ม click effect
        $label.addClass('animate-scale-in');
        setTimeout(() => {
            $label.removeClass('animate-scale-in');
        }, 400);
        
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
    $('nav label').on('click', function (e) {
        const $navLabel = $(this);
        const targetId = $navLabel.attr('for');

        // เพิ่ม ripple effect
        createRippleEffect($navLabel, e);

        // ตรวจสอบว่าเป็น tab ที่มีอยู่ใน deploy section หรือไม่
        if (['projects', 'repo', 'followers', 'following'].includes(targetId)) {
            // เปลี่ยน tab ใน deploy section
            $(`#${targetId}`).prop('checked', true);
            showTabContentWithAnimation(targetId);
            updateTabVisualStateWithAnimation(targetId);

            // ปิด sidebar ในมือถือพร้อม animation
            if (window.innerWidth < 768) {
                closeSidebarWithAnimation();
            }

            // เลื่อนไปยัง deploy section พร้อม animation
            scrollToDeploySectionSmooth();
        }
    });
}

/**
 * สร้าง ripple effect บน element
 */
function createRippleEffect($element, event) {
    const rect = $element[0].getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const $ripple = $('<span class="ripple"></span>');
    $ripple.css({
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'ripple-animation 0.6s ease-out',
        pointerEvents: 'none',
        zIndex: 1000
    });
    
    $element.css('position', 'relative').append($ripple);
    
    // เพิ่ม keyframe สำหรับ ripple animation
    if ($('#ripple-keyframes').length === 0) {
        $('head').append(`
            <style id="ripple-keyframes">
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            </style>
        `);
    }
    
    setTimeout(() => {
        $ripple.remove();
    }, 600);
}

/**
 * แสดงเนื้อหาของ tab ที่เลือกพร้อม animation
 */
function showTabContentWithAnimation(tabId) {
    const $allContent = $('#projects-list, #repo-list, #followers-list, #following-list');
    const contentMap = {
        'projects': '#projects-list',
        'repo': '#repo-list',
        'followers': '#followers-list',
        'following': '#following-list'
    };

    // Slide out current content
    $allContent.not('.hidden').addClass('content-slide-out');
    
    setTimeout(() => {
        // ซ่อนเนื้อหาทั้งหมด
        $allContent.addClass('hidden').removeClass('content-slide-out content-slide-in');
        
        // แสดงเนื้อหาของ tab ที่เลือก
        const targetContent = contentMap[tabId];
        if (targetContent) {
            const $target = $(targetContent);
            $target.removeClass('hidden').addClass('content-slide-in');
            
            // เพิ่ม stagger animation สำหรับ children
            $target.find('> *').each(function(index) {
                $(this).css({
                    'animation-delay': (index * 0.1) + 's',
                    'opacity': '0'
                }).addClass('animate-fade-in-up');
                
                setTimeout(() => {
                    $(this).css('opacity', '1');
                }, index * 100 + 100);
            });
        }
    }, 150);
}

/**
 * อัปเดต visual state ของ tabs พร้อม animation
 */
function updateTabVisualStateWithAnimation(activeTabId) {
    // รีเซ็ต CSS classes ทั้งหมด
    const $allLabels = $('#deploy label, nav label');
    $allLabels.removeClass('bg-gradient-to-t from-[color:var(--accent-color)] border-b-[color:var(--primary-color)]');
    $allLabels.find('svg').removeClass('fill-[color:var(--primary-color)]');
    $('nav label').removeClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)]');

    // เพิ่ม active state ให้ tab ที่เลือกพร้อม animation
    const $activeDeployLabel = $(`#deploy label[for="${activeTabId}"]`);
    const $activeNavLabel = $(`nav label[for="${activeTabId}"]`);
    
    setTimeout(() => {
        $activeDeployLabel.addClass('bg-gradient-to-t from-[color:var(--accent-color)] border-b-[color:var(--primary-color)]');
        $activeDeployLabel.find('svg').addClass('fill-[color:var(--primary-color)]');
        $activeNavLabel.addClass('bg-[color:var(--accent-color)] text-[color:var(--primary-color)] animate-slide-in-right');
        $activeNavLabel.find('svg').addClass('fill-[color:var(--primary-color)]');
    }, 50);
}

/**
 * แสดง loading state
 */
function showLoadingState() {
    const $activeContent = $('#projects-list, #repo-list, #followers-list, #following-list').not('.hidden');
    $activeContent.addClass('loading-shimmer').css('pointer-events', 'none');
}

/**
 * ซ่อน loading state
 */
function hideLoadingState() {
    $('#projects-list, #repo-list, #followers-list, #following-list').removeClass('loading-shimmer').css('pointer-events', 'auto');
}

/**
 * ปิด sidebar พร้อม animation
 */
function closeSidebarWithAnimation() {
    // สมมติว่ามี function closeSidebar() อยู่แล้ว
    if (typeof closeSidebar === 'function') {
        const $sidebar = $('nav'); // หรือ selector ที่ถูกต้อง
        $sidebar.addClass('animate-slide-in-left');
        setTimeout(() => {
            closeSidebar();
            $sidebar.removeClass('animate-slide-in-left');
        }, 300);
    }
}

/**
 * เลื่อนหน้าไปยัง deploy section พร้อม smooth animation
 */
function scrollToDeploySectionSmooth() {
    const deploySection = document.getElementById('deploy');
    if (deploySection) {
        // เพิ่ม highlight effect ก่อนเลื่อน
        $(deploySection).addClass('animate-pulse-hover');
        
        deploySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        setTimeout(() => {
            $(deploySection).removeClass('animate-pulse-hover');
        }, 1000);
    }
}

/**
 * ตรวจสอบและแสดงข้อความเมื่อไม่มีข้อมูลพร้อม animation
 */
function checkEmptyContentWithAnimation() {
    const emptyMessages = {
        'projects': 'ไม่มีโปรเจคในขณะนี้',
        'repo': 'ไม่มีรีพอซิทอรีในขณะนี้',
        'followers': 'ไม่มีผู้ติดตามในขณะนี้',
        'following': 'ไม่ได้ติดตามใครในขณะนี้'
    };

    Object.keys(emptyMessages).forEach(tabId => {
        const listSelector = `#${tabId}-list`;
        const $list = $(listSelector);
        
        if ($list.children().length === 0 && $(`#${tabId}`).is(':checked')) {
            const emptyHTML = `
                <li class="col-span-full text-center text-gray-400 p-8 animate-fade-in-up">
                    <div class="flex flex-col items-center space-y-3">
                        <i class="fa-solid fa-diagram-project text-3xl"></i>
                        <p class="text-lg font-medium">${emptyMessages[tabId]}</p>
                        <p class="text-sm opacity-75">ข้อมูลจะปรากฏที่นี่เมื่อมีการอัปเดต</p>
                    </div>
                </li>
            `;
            $list.html(emptyHTML);
        }
    });
}

/**
 * รีเฟรชเนื้อหาเมื่อมีการอัปเดตข้อมูลจาก API
 */
function refreshTabContentWithAnimation() {
    const currentTab = $('input[name="status"]:checked').attr('id');
    if (currentTab) {
        showLoadingState();
        
        setTimeout(() => {
            showTabContentWithAnimation(currentTab);
            
            // ให้เวลา DOM อัปเดตก่อนตรวจสอบ empty content
            setTimeout(() => {
                checkEmptyContentWithAnimation();
                hideLoadingState();
            }, 100);
        }, 300);
    }
}

// เพิ่มการตรวจสอบ empty content หลังจาก API โหลดข้อมูลเสร็จ
$(window).on('load', function () {
    setTimeout(() => {
        refreshTabContentWithAnimation();
    }, 500);
});

/**
 * Helper function สำหรับ responsive behavior
 */
function handleResponsiveChanges() {
    // จัดการ responsive classes สำหรับ followers/following labels
    const $followLabels = $('label[for="followers"], label[for="following"]');
    
    if (window.innerWidth >= 768) {
        $followLabels.addClass('md:flex animate-slide-in-right').removeClass('hidden');
    } else {
        $followLabels.removeClass('md:flex animate-slide-in-right');
    }
}

// ตรวจสอบ responsive changes
$(window).on('resize', function() {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(handleResponsiveChanges, 250);
});
handleResponsiveChanges(); // เรียกครั้งแรก

/**
 * เพิ่มการสนับสนุน keyboard navigation พร้อม animation
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
            const $newTabLabel = $(`label[for="${newTab}"]`);
            
            // เพิ่ม keyboard focus animation
            $newTabLabel.addClass('animate-pulse-hover');
            setTimeout(() => {
                $newTabLabel.removeClass('animate-pulse-hover');
            }, 600);
            
            $(`#${newTab}`).prop('checked', true).trigger('change');
        }
    }
});

/**
 * เพิ่มการสนับสนุน swipe บนมือถือเฉพาะ #deploy พร้อม animation
 */
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

$("#deploy").on("touchstart", function (e) {
    touchStartX = e.originalEvent.touches[0].clientX;
    isSwiping = true;
});

$("#deploy").on("touchmove", function (e) {
    if (!isSwiping) return;
    
    const currentX = e.originalEvent.touches[0].clientX;
    const diff = touchStartX - currentX;
    
    // เพิ่ม visual feedback ระหว่าง swipe
    if (Math.abs(diff) > 20) {
        const $activeContent = $('#projects-list, #repo-list, #followers-list, #following-list').not('.hidden');
        $activeContent.css('transform', `translateX(${-diff * 0.3}px)`);
    }
});

$("#deploy").on("touchend", function (e) {
    if (!isSwiping) return;
    
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    isSwiping = false;
    
    // รีเซ็ต transform
    const $activeContent = $('#projects-list, #repo-list, #followers-list, #following-list').not('.hidden');
    $activeContent.css('transform', 'translateX(0)');
    
    handleSwipeWithAnimation();
});

function handleSwipeWithAnimation() {
    const swipeThreshold = 50; // ระยะขั้นต่ำในการปัด (px)
    const tabs = ["projects", "repo", "followers", "following"];
    const currentIndex = tabs.indexOf($('input[name="status"]:checked').attr("id"));

    // ปัดซ้าย → next
    if (touchStartX - touchEndX > swipeThreshold) {
        let newIndex = (currentIndex + 1) % tabs.length;
        const newTab = tabs[newIndex];
        
        // เพิ่ม swipe animation
        const $currentContent = $('#projects-list, #repo-list, #followers-list, #following-list').not('.hidden');
        $currentContent.addClass('animate-slide-in-left');
        
        setTimeout(() => {
            $(`#${newTab}`).prop("checked", true).trigger("change");
        }, 100);
    }

    // ปัดขวา → prev
    if (touchEndX - touchStartX > swipeThreshold) {
        let newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        const newTab = tabs[newIndex];
        
        // เพิ่ม swipe animation
        const $currentContent = $('#projects-list, #repo-list, #followers-list, #following-list').not('.hidden');
        $currentContent.addClass('animate-slide-in-right');
        
        setTimeout(() => {
            $(`#${newTab}`).prop("checked", true).trigger("change");
        }, 100);
    }
}

/**
 * เพิ่ม performance optimization สำหรับ animations
 */
function optimizeAnimations() {
    // ใช้ requestAnimationFrame สำหรับ smooth animations
    window.requestAnimationFrame = window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback) { setTimeout(callback, 16); };
    
    // เพิ่ม will-change สำหรับ elements ที่จะ animate
    $('#projects-list, #repo-list, #followers-list, #following-list').css('will-change', 'transform, opacity');
    $('#deploy label, nav label').css('will-change', 'transform');
}

// เรียกใช้ optimization เมื่อ DOM พร้อม
$(document).ready(function() {
    optimizeAnimations();
});

// ทำความสะอาด animations เมื่อเปลี่ยนหน้า
$(window).on('beforeunload', function() {
    $('*').removeClass('animate-fade-in-up animate-fade-in-down animate-slide-in-right animate-slide-in-left animate-scale-in');
});