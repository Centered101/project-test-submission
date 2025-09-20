// —[ preloader ]———————————————————————————————————————————————————————————————————————————————————————————————————

$(window).on('load', function () {
    $('#preloader').fadeOut(700);
});

// ฟังก์ชันปิดการใช้งานลิงก์
function disableLink(event) {
    event.preventDefault();
}

// —[ Notifications ]———————————————————————————————————————————————————————————————————————————————————————————————————

// Detect when offline
$(window).on("offline", function () {
    showNotification("Oh no! You are offline 😐", 'info');
});

// Detect when back online
$(window).on("online", function () {
    showNotification("Glad you're back online! 😍", 'success');
});

// ตัวแปรสำหรับจัดการ notification queue และ history
let notificationQueue = [];
let notificationContainer = null;
let notificationHistory = [];
let isHistoryPanelOpen = false;

// ฟังก์ชันเพิ่มข้อมูลลง history
function addToHistory(message, type, link = null, timestamp = null) {
    const historyItem = {
        id: Date.now() + Math.random(), // สร้าง unique id
        message: message,
        type: type,
        link: link,
        timestamp: timestamp || new Date().toISOString(),
        isRead: false
    };

    notificationHistory.unshift(historyItem); // เพิ่มที่ตำแหน่งแรก (ล่าสุด)

    // จำกัดจำนวน history ไม่เกิน 100 รายการ
    if (notificationHistory.length > 100) {
        notificationHistory = notificationHistory.slice(0, 100);
    }

    // บันทึกลง localStorage
    saveHistoryToStorage();

    // อัปเดต badge ใน history button
    updateHistoryBadge();

    return historyItem;
}

// ฟังก์ชันบันทึก history ลง localStorage
function saveHistoryToStorage() {
    try {
        localStorage.setItem('notificationHistory', JSON.stringify(notificationHistory));
    } catch (error) {
        console.warn('Cannot save notification history to localStorage:', error);
    }
}

// ฟังก์ชันโหลด history จาก localStorage
function loadHistoryFromStorage() {
    try {
        const saved = localStorage.getItem('notificationHistory');
        if (saved) {
            notificationHistory = JSON.parse(saved);
            updateHistoryBadge();
        }
    } catch (error) {
        console.warn('Cannot load notification history from localStorage:', error);
        notificationHistory = [];
    }
}

// ฟังก์ชันนับจำนวนข้อความที่ยังไม่ได้อ่าน
function getUnreadCount() {
    return notificationHistory.filter(item => !item.isRead).length;
}

// ฟังก์ชันอัปเดต badge ใน history button
function updateHistoryBadge() {
    const unreadCount = getUnreadCount();
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
}

// อัปเดตตอนโหลดหน้า
updateHistoryBadge();

// ฟังก์ชันสร้างปุ่ม history (เรียกใช้เมื่อ window load)
$(window).on('load', function () {
    if ($('#notification-history-btn').length === 0) {
        const historyButton = $(`
            <button id="notification-history-btn" title="notification" type="button" class="fade-in relative bg-[color:var(--bg-color)] rounded shadow-inner m-3 px-2 py-1 cursor-pointer md:mx-4 md:my-5 md:px-4 md:py-3 active:bg-[color:var(--accent-color)]">
                <i class="fa-regular fa-bell"></i>
            </button>
        `);

        $('#notification-history-content').append(historyButton);

        // เพิ่ม event listener
        historyButton.on('click', toggleHistoryPanel);

        updateHistoryBadge();
    }
});

// ฟังก์ชันแสดง/ซ่อน history panel
function toggleHistoryPanel() {
    if (isHistoryPanelOpen) {
        closeHistoryPanel();
    } else {
        openHistoryPanel();
    }
}

function openHistoryPanel() {
    isHistoryPanelOpen = true;

    // ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว
    notificationHistory.forEach(item => item.isRead = true);
    saveHistoryToStorage();
    updateHistoryBadge();

    const panel = $(`
        <div id="notification-history-panel" class="fixed inset-0 bg-black bg-opacity-25 z-30">
            <div class="fade-in h-full w-5/6 sm:w-full max-w-md fixed right-0 top-0 bg-[color:var(--white-smoker)] border-l shadow-xl">
                <div class="flex items-center justify-between border-b">
                    <h3 class="uppercase p-4 md:py-8">Notification history</h3>
                    <div class="flex items-center space-x-2">
                        <button id="clear-history-btn" title="delete all" class="fade-in relative bg-[color:var(--bg-color)] text-red-500 rounded shadow-inner m-3 px-2 py-1 cursor-pointer md:mx-4 md:my-5 md:px-4 md:py-3 hover:text-red-700 active:bg-[color:var(--accent-color)]"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div id="history-content" class="p-4 h-full overflow-y-scroll pb-20">
                    ${renderHistoryItems()}
                </div>
            </div>
        </div>
    `);

    $('body').append(panel);

    // ปิด panel
    $('#close-history-panel, #notification-history-panel').on('click', function (e) {
        if (e.target === this) {
            closeHistoryPanel();
        }
    });

    // ปุ่ม "Delete all"
    $('#clear-history-btn').on('click', function () {
        const $items = $('#history-content').children();

        if ($items.length === 0) return;

        // เพิ่ม animation ออกไปทางขวา
        $items.addClass('animate-slide-out');

        // รอ animation เสร็จแล้วค่อยลบจริง
        setTimeout(() => {
            clearHistory(); // ลบประวัติ
            $('#history-content').html(renderHistoryItems());
        }, 300); // เวลาเดียวกับ duration ของ animation
    });

}

// ฟังก์ชันปิด history panel
function closeHistoryPanel() {
    isHistoryPanelOpen = false;
    $('#notification-history-panel').remove();
}

// ฟังก์ชันแสดงรายการ history
function renderHistoryItems() {
    if (notificationHistory.length === 0) {
        return '<div class="!translate-x-0 text-center text-[color:var(--text-color)] py-8">No notification history</div>';
    }

    return notificationHistory.map(item => {
        const date = new Date(item.timestamp);
        const timeStr = date.toLocaleString('th-TH');
        const typeIcon = getTypeIcon(item.type);

        return `
            <div class="history-item bg-[color:var(--bg-color)] border rounded-lg shadow-inner mb-2 p-2 ${!item.isRead ? 'border-l-2 !border-l-[color:var(--primary-color)]' : ''}">
                <div class="flex items-start space-x-2">
                    <div class="flex-shrink-0 mt-1">
                        ${typeIcon}
                    </div>
                    <div class="flex-1 min-w-0">
                        ${item.link ?
                `<a href="${item.link}" class="text-sm text-[color:var(--primary-color)] hover:opacity-50 underline break-words" target="_blank" rel="noopener noreferrer">${item.message}</a>` :
                `<p class="text-sm break-words">${item.message}</p>`
            }
                        <p class="text-xs text-gray-500 mt-1">${timeStr}</p>
                    </div>
                    <button class="delete-history-item flex-shrink-0 hover:text-red-500" data-id="${item.id}">
                        <i class="fa-solid fa-trash text-gray-500"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ฟังก์ชันลบรายการ history
$(document).on('click', '.delete-history-item', function () {
    const itemId = $(this).data('id');
    const $item = $(this).closest('.history-item');

    $item.addClass('animate-slide-out');

    setTimeout(() => {
        notificationHistory = notificationHistory.filter(item => item.id !== itemId);
        saveHistoryToStorage();
        updateHistoryBadge();

        if (isHistoryPanelOpen) {
            $('#history-content').html(renderHistoryItems());
        }
    }, 300);
});

function addNotification(item) {
    // เพิ่มแจ้งเตือนใหม่ลง array
    notificationHistory.unshift(item); // ใส่ไว้บนสุด
    saveHistoryToStorage();
    updateHistoryBadge();

    // ถ้า panel เปิดอยู่ → อัปเดตเนื้อหา
    if (isHistoryPanelOpen) {
        $('#history-content').html(renderHistoryItems());
    }
}

setInterval(renderHistoryItems, 1000);

// ฟังก์ชันได้ icon ตามประเภท
function getTypeIcon(type) {
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
}

// ฟังก์ชันลบ history ทั้งหมด
function clearHistory() {
    notificationHistory = [];
    saveHistoryToStorage();
    updateHistoryBadge();
}

// ฟังก์ชันดึงข้อมูล history (สำหรับใช้งานภายนอก)
function getNotificationHistory(limit = null) {
    return limit ? notificationHistory.slice(0, limit) : [...notificationHistory];
}

// ฟังก์ชันค้นหา history
function searchHistory(query) {
    return notificationHistory.filter(item =>
        item.message.toLowerCase().includes(query.toLowerCase())
    );
}

function showNotification(message, type = 'info', link = null) {
    // เพิ่มลง history ก่อน
    addToHistory(message, type, link);

    // สร้าง container ถ้ายังไม่มี
    if (!notificationContainer) {
        notificationContainer = $('<div class="fixed bottom-4 right-4 z-50 space-y-2"></div>');
        $('body').append(notificationContainer);
    }

    const notification = $(`
        <div class="notification-item max-w-sm min-w-min bg-[color:var(--white-smoker)] border rounded-xl shadow-inner px-2 py-1 sm:px-3 sm:py-2 transition-all duration-300 transform translate-x-full select-none ${!link ? 'cursor-pointer' : ''}">
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
            `<a href="${link}" target="_blank" class="btn-text text-sm text-[color:var(--primary-color)] font-normal" rel="noopener noreferrer">${message}</a>` :
            `<p class="text-sm font-normal break-words line-clamp-1">${message}</p>`
        }
                </div>
            </div>
        </div>
    `);

    // เพิ่ม notification ใน container
    notificationContainer.append(notification);

    // Animation เข้า
    setTimeout(() => {
        notification.removeClass('translate-x-full');
    }, 10);

    // ตัวแปรสำหรับจัดการ timer
    let timeoutId;
    let isHovered = false;
    let isFocused = false;

    // ฟังก์ชันเริ่ม timer
    function startTimer() {
        if (!isHovered && !isFocused) {
            timeoutId = setTimeout(() => {
                closeNotification();
            }, 5000);
        }
    }

    // ฟังก์ชันหยุด timer
    function stopTimer() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    // ฟังก์ชันปิด notification
    function closeNotification() {
        notification.addClass('translate-x-full opacity-0');
        setTimeout(() => {
            notification.remove();
            // ลบ notification ออกจาก queue
            const index = notificationQueue.indexOf(notification);
            if (index > -1) {
                notificationQueue.splice(index, 1);
            }
            // ลบ container ถ้าไม่มี notification แล้ว
            if (notificationQueue.length === 0) {
                notificationContainer.remove();
                notificationContainer = null;
            }
        }, 300);
    }

    // Event listeners สำหรับ hover และ focus
    notification.on('mouseenter', function () {
        isHovered = true;
        stopTimer();
    });

    notification.on('mouseleave', function () {
        isHovered = false;
        startTimer();
    });

    notification.on('focusin', function () {
        isFocused = true;
        stopTimer();
    });

    notification.on('focusout', function () {
        isFocused = false;
        startTimer();
    });

    // ถ้าไม่มีลิงก์ ให้คลิกเพื่อปิดได้
    if (!link) {
        notification.on('click', function () {
            closeNotification();
        });
    }

    // เพิ่ม notification ใน queue
    notificationQueue.push(notification);

    // เริ่ม timer
    startTimer();

    // จำกัดจำนวน notification ไม่เกิน 5 ตัว
    if (notificationQueue.length > 5) {
        const oldestNotification = notificationQueue[0];
        oldestNotification.addClass('translate-x-full opacity-0');
        setTimeout(() => {
            oldestNotification.remove();
            notificationQueue.shift();
        }, 300);
    }
}

// ฟังก์ชันปิด notification ทั้งหมด
function clearAllNotifications() {
    notificationQueue.forEach(notification => {
        notification.addClass('translate-x-full opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    notificationQueue = [];
    setTimeout(() => {
        if (notificationContainer) {
            notificationContainer.remove();
            notificationContainer = null;
        }
    }, 300);
}

// โหลด history เมื่อเริ่มต้น
$(document).ready(function () {
    loadHistoryFromStorage();
});

// ตัวอย่างการใช้งาน:
// showNotification('บันทึกข้อมูลสำเร็จ', 'success'); 
// showNotification('ดูรายละเอียดเพิ่มเติม', 'info', 'https://example.com'); 
// showNotification('เกิดข้อผิดพลาด', 'error'); 
// clearAllNotifications(); // ปิดการแจ้งเตือนทั้งหมด
// clearHistory(); // ลบประวัติทั้งหมด
// getNotificationHistory(); // ดึงข้อมูลประวัติทั้งหมด
// getNotificationHistory(10); // ดึงข้อมูล 10 รายการล่าสุด
// searchHistory('ออนไลน์'); // ค้นหาในประวัติ

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
