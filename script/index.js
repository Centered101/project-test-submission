document.write('<script src="https://code.jquery.com/jquery-3.6.0.min.js"><\/script>');
document.write('<link href="https://cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/6.0.0\/css\/all.min.css" rel="stylesheet">');

// —[ preloader ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(window).on('load', function () {
    $('#preloader').fadeOut(700);
});

// ฟังก์ชันปิดการใช้งานลิงก์
function disableLink(event) {
    event.preventDefault();
}

// —[ theme ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(function () {
    const $html = $('html');
    const $select = $('#theme-switcher');

    // โหลดค่าเดิมจาก localStorage (ถ้ามี)
    const saved = localStorage.getItem('theme') || 'system';
    $select.val(saved);
    applyTheme(saved);

    // เปลี่ยนธีมเมื่อเลือกใหม่
    $select.on('change', function () {
        const value = $(this).val();
        localStorage.setItem('theme', value);
        applyTheme(value);
    });

    function applyTheme(value) {
        $html.removeClass('theme-light theme-dark');
        if (value === 'light') {
            $html.addClass('theme-light');
        } else if (value === 'dark') {
            $html.addClass('theme-dark');
        }
        // ถ้า system ไม่ต้องใส่ class ใด ๆ
    }
});

// —[ Notifications ]———————————————————————————————————————————————————————————————————————————————————————————————————

// กำหนด global variables ก่อน
window.NotificationSystem = {
    queue: [],
    container: null,
    history: [],
    isHistoryPanelOpen: false
};

// รอให้ jQuery โหลดเสร็จก่อน
function initializeNotificationSystem() {
    // ถ้า jQuery ยังไม่พร้อม ให้รอ
    if (typeof $ === 'undefined') {
        setTimeout(initializeNotificationSystem, 100);
        return;
    }

    // ฟังก์ชันเพิ่มข้อมูลลง history
    window.addToHistory = function (message, type, link = null, timestamp = null) {
        const historyItem = {
            id: Date.now() + Math.random(),
            message: message,
            type: type,
            link: link,
            timestamp: timestamp || new Date().toISOString(),
            isRead: false
        };

        window.NotificationSystem.history.unshift(historyItem);

        // จำกัดจำนวน history ไม่เกิน 100 รายการ
        if (window.NotificationSystem.history.length > 100) {
            window.NotificationSystem.history = window.NotificationSystem.history.slice(0, 100);
        }

        window.saveHistoryToStorage();
        window.updateHistoryBadge();

        return historyItem;
    };

    // ฟังก์ชันบันทึก history ลง localStorage
    window.saveHistoryToStorage = function () {
        try {
            localStorage.setItem('notificationHistory', JSON.stringify(window.NotificationSystem.history));
        } catch (error) {
            console.warn('Cannot save notification history to localStorage:', error);
        }
    };

    // ฟังก์ชันโหลด history จาก localStorage
    window.loadHistoryFromStorage = function () {
        try {
            const saved = localStorage.getItem('notificationHistory');
            if (saved) {
                window.NotificationSystem.history = JSON.parse(saved);
                window.updateHistoryBadge();
            }
        } catch (error) {
            console.warn('Cannot load notification history from localStorage:', error);
            window.NotificationSystem.history = [];
        }
    };

    // ฟังก์ชันนับจำนวนข้อความที่ยังไม่ได้อ่าน
    window.getUnreadCount = function () {
        return window.NotificationSystem.history.filter(item => !item.isRead).length;
    };

    // ฟังก์ชันอัปเดต badge
    window.updateHistoryBadge = function () {
        if (typeof $ === 'undefined') return;

        const unreadCount = window.getUnreadCount();
        const badge = $('#notification-history-badge');

        if (unreadCount > 0) {
            if (badge.length === 0) {
                const badgeHtml = `<span id="notification-history-badge" class="size-4 absolute -top-2 -left-2 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">${unreadCount > 99 ? '99+' : unreadCount}</span>`;
                $('#notification-history-btn').append(badgeHtml);
            } else {
                badge.text(unreadCount > 99 ? '99+' : unreadCount);
            }
        } else {
            badge.remove();
        }
    };

    // ฟังก์ชันสร้างปุ่ม history
    window.createHistoryButton = function () {
        if (typeof $ === 'undefined') return;

        if ($('#notification-history-btn').length === 0 && $('#notification-history-content').length > 0) {
            const historyButton = $(`
                <button id="notification-history-btn" title="notification" type="button" class="fade-in relative bg-[color:var(--bg-color)] rounded shadow-inner m-3 px-4 py-3 cursor-pointer md:mx-4 md:my-5 active:bg-[color:var(--accent-color)]">
                    <i class="fa-regular fa-bell"></i>
                </button>
            `);

            $('#notification-history-content').append(historyButton);
            historyButton.on('click', window.toggleHistoryPanel);
            window.updateHistoryBadge();
        }
    };

    // ฟังก์ชันได้ icon ตามประเภท
    window.getTypeIcon = function (type) {
        switch (type) {
            case 'success':
                return '<i class="fa-solid fa-circle-check text-green-500"></i>';
            case 'error':
                return '<i class="fa-solid fa-circle-exclamation text-red-500"></i>';
            case 'info':
                return '<i class="fa-solid fa-circle-info text-yellow-500"></i>';
            default:
                return '<i class="fa-regular fa-circle-info text-blue-500"></i>';
        }
    };

    // ฟังก์ชันแสดงรายการ history
    window.renderHistoryItems = function () {
        if (window.NotificationSystem.history.length === 0) {
            return '<div class="!translate-x-0 text-center text-[color:var(--text-color)] py-8">No notification history</div>';
        }

        return window.NotificationSystem.history.map(item => {
            const date = new Date(item.timestamp);
            const timeStr = date.toLocaleString('th-TH');
            const typeIcon = window.getTypeIcon(item.type);

            return `
            <div class="history-item bg-[color:var(--bg-color)] border rounded-lg shadow-inner mb-2 p-2 ${!item.isRead ? 'border-l-2 !border-l-[color:var(--primary-color)]' : ''}">
                <div class="flex items-start gap-2">
                    <div class="flex-shrink-0">
                        ${typeIcon}
                    </div>
                    <div class="flex-1 min-w-0">
                        ${item.link ?
                    `<a href="${item.link}" class="text-sm text-[color:var(--primary-color)] hover:underline break-words" target="_blank" rel="noopener noreferrer">${item.message}</a>` :
                    `<p class="text-sm break-words">${item.message}</p>`
                }
                        <p class="text-xs text-gray-500 mt-1">${timeStr}</p>
                    </div>
                    <button class="delete-history-item flex-shrink-0 text-gray-500 ease-in-out duration-300 hover:text-red-500" data-id="${item.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            `;
        }).join('');
    };

    // ฟังก์ชันแสดง/ซ่อน history panel
    window.toggleHistoryPanel = function () {
        if (window.NotificationSystem.isHistoryPanelOpen) {
            window.closeHistoryPanel();
        } else {
            window.openHistoryPanel();
        }
    };

    window.openHistoryPanel = function () {
        if (typeof $ === 'undefined') return;

        window.NotificationSystem.isHistoryPanelOpen = true;

        // ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว
        window.NotificationSystem.history.forEach(item => item.isRead = true);
        window.saveHistoryToStorage();
        window.updateHistoryBadge();

        const panel = $(`
        <div id="notification-history-panel" class="fixed inset-0 bg-black bg-opacity-75 z-30">
            <div class="fade-in h-full w-5/6 sm:w-full max-w-md fixed right-0 top-0 bg-[color:var(--white-smoker)] border-l shadow-xl -translate-x-full">
                <div class="flex items-center justify-between border-b">
                    <h3 class="uppercase p-4 md:py-8">Notification history</h3>
                    <div class="flex items-center gap-1">
                        <button id="clear-history-btn" title="delete all" class="relative bg-[color:var(--bg-color)] text-red-500 rounded shadow-inner m-3 px-4 py-3 cursor-pointer md:mx-4 md:my-5 hover:text-red-700 active:bg-[color:var(--accent-color)]"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div id="history-content" class="p-4 h-full overflow-y-scroll pb-24">
                    ${renderHistoryItems()}
                </div>
            </div>
        </div>
        `);

        $('body').append(panel);

        // Event listeners
        $('#close-history-panel, #notification-history-panel').on('click', function (e) {
            if (e.target === this) {
                window.closeHistoryPanel();
            }
        });

        $('#clear-history-btn').on('click', function () {
            window.clearHistory();
            $('#history-content').html(window.renderHistoryItems());
        });
    };

    window.closeHistoryPanel = function () {
        if (typeof $ === 'undefined') return;

        window.NotificationSystem.isHistoryPanelOpen = false;
        $('#notification-history-panel').remove();
    };

    // ฟังก์ชันลบ history ทั้งหมด
    window.clearHistory = function () {
        window.NotificationSystem.history = [];
        window.saveHistoryToStorage();
        window.updateHistoryBadge();
    };

    // ฟังก์ชันหลักแสดง notification
    window.showNotification = function (message, type = 'info', link = null) {
        if (!message) {
            console.warn('showNotification: message is required');
            return;
        }

        // เพิ่มลง history
        window.addToHistory(message, type, link);

        // ถ้า jQuery ไม่พร้อม ให้แสดงแค่ใน console
        if (typeof $ === 'undefined') {
            console.log(`[${type.toUpperCase()}] ${message}${link ? ` - ${link}` : ''}`);
            return;
        }

        // สร้าง container ถ้ายังไม่มี
        if (!window.NotificationSystem.container) {
            window.NotificationSystem.container = $('<div style="position: fixed; bottom: 16px; right: 16px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;"></div>');
            $('body').append(window.NotificationSystem.container);
        }

        const notification = $(`
        <div class="notification-item !w-sm max-w-sm bg-[color:var(--white-smoker)] border rounded-xl shadow-inner px-2 py-1 sm:px-3 sm:py-2 transition-all duration-300 transform translate-x-full select-none ${!link ? 'cursor-pointer' : ''}">
            <div class="flex items-center gap-2">
                <div class="flex-shrink-0">
                ${type === 'success' ?
                '<i class="fa-solid fa-circle-check text-green-500"></i>' :
                type === 'error' ?
                    '<i class="fa-solid fa-circle-exclamation text-red-500"></i>' :
                    type === 'info' ?
                        '<i class="fa-solid fa-circle-info text-yellow-500"></i>' :
                        '<i class="fa-regular fa-circle-info text-blue-500"></i>'
            }
                </div>
                <div class="flex-1">
                ${link ?
                `<a href="${link}" target="_blank" class="btn-text text-sm text-[color:var(--primary-color)] font-normal line-clamp-1">${message}</a>` :
                `<p class="text-sm font-normal break-words line-clamp-1">${message}</p>`
            }
                </div>
            </div>
        </div>
        `);

        window.NotificationSystem.container.append(notification);

        // Animation เข้า
        setTimeout(() => {
            notification.css('transform', 'translateX(0)');
        }, 10);

        // Timer management
        let timeoutId;
        let isHovered = false;
        let isFocused = false;

        function startTimer() {
            if (!isHovered && !isFocused) {
                timeoutId = setTimeout(closeNotification, 5000);
            }
        }

        function stopTimer() {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }

        function closeNotification() {
            notification.css({
                'transform': 'translateX(100%)',
                'opacity': '0'
            });
            setTimeout(() => {
                notification.remove();
                const index = window.NotificationSystem.queue.indexOf(notification);
                if (index > -1) {
                    window.NotificationSystem.queue.splice(index, 1);
                }
                if (window.NotificationSystem.queue.length === 0) {
                    window.NotificationSystem.container.remove();
                    window.NotificationSystem.container = null;
                }
            }, 300);
        }

        // Event listeners
        notification.on('mouseenter', function () {
            isHovered = true;
            stopTimer();
        });

        notification.on('mouseleave', function () {
            isHovered = false;
            startTimer();
        });

        if (!link) {
            notification.on('click', closeNotification);
        }

        window.NotificationSystem.queue.push(notification);
        startTimer();

        // จำกัดจำนวน notification ไม่เกิน 5 ตัว
        if (window.NotificationSystem.queue.length > 5) {
            const oldestNotification = window.NotificationSystem.queue[0];
            oldestNotification.css({
                'transform': 'translateX(100%)',
                'opacity': '0'
            });
            setTimeout(() => {
                oldestNotification.remove();
                window.NotificationSystem.queue.shift();
            }, 300);
        }
    };

    // ฟังก์ชันปิด notification ทั้งหมด
    window.clearAllNotifications = function () {
        if (typeof $ === 'undefined') return;

        window.NotificationSystem.queue.forEach(notification => {
            notification.css({
                'transform': 'translateX(100%)',
                'opacity': '0'
            });
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        window.NotificationSystem.queue = [];
        setTimeout(() => {
            if (window.NotificationSystem.container) {
                window.NotificationSystem.container.remove();
                window.NotificationSystem.container = null;
            }
        }, 300);
    };

    // ฟังก์ชัน utility อื่นๆ
    window.getNotificationHistory = function (limit = null) {
        return limit ? window.NotificationSystem.history.slice(0, limit) : [...window.NotificationSystem.history];
    };

    window.searchHistory = function (query) {
        return window.NotificationSystem.history.filter(item =>
            item.message.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Event listener สำหรับ delete history item
    $(document).on('click', '.delete-history-item', function () {
        const itemId = $(this).data('id');
        const $item = $(this).closest('.history-item');

        $item.css({
            'animation': 'slideOut 0.3s ease-out forwards'
        });

        setTimeout(() => {
            window.NotificationSystem.history = window.NotificationSystem.history.filter(item => item.id !== itemId);
            window.saveHistoryToStorage();
            window.updateHistoryBadge();

            if (window.NotificationSystem.isHistoryPanelOpen) {
                $('#history-content').html(window.renderHistoryItems());
            }
        }, 300);
    });

    // Online/Offline detection
    $(window).on("offline", function () {
        window.showNotification("Oh no! You are offline 😐", 'info');
    });

    $(window).on("online", function () {
        window.showNotification("Glad you're back online! 😍", 'success');
    });

    // โหลด history เมื่อเริ่มต้น
    window.loadHistoryFromStorage();

    // สร้างปุ่ม history หลังจาก DOM โหลดเสร็จ
    $(document).ready(function () {
        window.createHistoryButton();
    });

    // สร้างปุ่ม history หลังจาก window โหลดเสร็จ (backup)
    $(window).on('load', function () {
        window.createHistoryButton();
    });
}

// รอให้ jQuery โหลดเสร็จแล้วจึงเริ่มต้นระบบ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNotificationSystem);
} else {
    initializeNotificationSystem();
}

// Test functions (optional)
window.testNotificationSystem = {
    success: () => window.showNotification('บันทึกข้อมูลสำเร็จ!', 'success'),
    error: () => window.showNotification('เกิดข้อผิดพลาดในการประมวลผล', 'error'),
    info: () => window.showNotification('ระบบกำลังอัปเดต กรุณารอสักครู่', 'info'),
    withLink: () => window.showNotification('ดูรายละเอียดเพิ่มเติม', 'info', 'https://example.com')
};