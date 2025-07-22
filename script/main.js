// —[ preloader ]———————————————————————————————————————————————————————————————————————————————————————————————————

$('#preloader').addClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');

$(window).on('load', function () {
    $('#preloader').addClass('invisible');
    $('#preloader').removeClass('fixed inset-0 h-screen w-screen overflow-y-scroll touch-none');
});
// ฟังก์ชันปิดการใช้งานลิงก์
function disableLink(event) {
    event.preventDefault();
}

// Detect when offline
$(window).on("offline", function () {
    showNotification("Oh no! You are offline 😐", 'info');
});

// Detect when back online
$(window).on("online", function () {
    showNotification("Glad you're back online! 😍", 'success');
});

// ตัวแปรสำหรับจัดการ notification queue
let notificationQueue = [];
let notificationContainer = null;

function showNotification(message, type = 'info', link = null) {
    // สร้าง container ถ้ายังไม่มี
    if (!notificationContainer) {
        notificationContainer = $('<div class="fixed bottom-4 right-4 z-50 space-y-2"></div>');
        $('body').append(notificationContainer);
    }

    const notification = $(`
        <div class="notification-item max-w-sm bg-[color:var(--white-smoker)] border rounded-xl shadow-inner px-4 py-2 transition-all duration-300 transform translate-x-full select-none ${!link ? 'cursor-pointer' : ''}">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    ${type === 'success' ?
            '<svg class="size-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>' :
            type === 'error' ?
                '<svg class="size-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>' :
                '<svg class="size-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>'
        }
                </div>
                <div class="ml-2 flex-1">
                    ${link ?
            `<a href="${link}" class="text-sm text-[color:var(--main-color)] hover:opacity-50 hover:underline" rel="noopener noreferrer">${message}</a>` :
            `<p class="text-sm">${message}</p>`
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

// ตัวอย่างการใช้งาน:
// showNotification('บันทึกข้อมูลสำเร็จ', 'success'); // ไม่มีลิงก์ - คลิกเพื่อปิด
// showNotification('ดูรายละเอียดเพิ่มเติม', 'info', 'https://example.com'); // มีลิงก์ - คลิกเพื่อเปิดลิงก์
// showNotification('เกิดข้อผิดพลาด', 'error'); // ไม่มีลิงก์ - คลิกเพื่อปิด
// clearAllNotifications(); // ปิดการแจ้งเตือนทั้งหมด

$(document).ready(function () {
    const defaultClassName = "icon-default";

    // แมปนามสกุล -> class ที่จะใช้
    const extensionClassMap = {
        // HTML
        'html': 'icon-text-html',
        'htm': 'icon-text-html',

        // CSS & JavaScript
        'css': 'icon-text-css',
        'js': 'icon-application-javascript',

        // JSON & Text/Code
        'json': 'icon-json',
        'txt': 'icon-text',
        'cpp': 'icon-cpp',
        'sql': 'icon-application-x-sql',

        // Image
        'jpg': 'icon-image',
        'jpeg': 'icon-image',
        'png': 'icon-image',
        'gif': 'icon-image',
        'webp': 'icon-image',
        'ico': 'icon-image',
        'svg': 'icon-svg',

        // Video
        'mp4': 'icon-video',
        'webm': 'icon-video',

        // No extension = folder/directory
        '': 'icon-directory'
    };

    $.each(files, function (_, { path, name }) {
        const cleanName = path.split('/').pop();
        const fileName = name || cleanName;

        const ext = cleanName.includes('.') ? cleanName.split('.').pop().toLowerCase() : '';
        const classToUse = extensionClassMap[ext] || defaultClassName;

        $('<li></li>')
            .append(`
            <a href="${path}" class="${classToUse}" title="${cleanName}">
                <span class="name">${fileName}</span>
            </a>
        `)
            .appendTo('#files');
    });

    // ฟังก์ชันค้นหา
    function search() {
        const str = $('#search').val().toLowerCase();

        $('#files a').each(function () {
            const $link = $(this);
            const text = $link.text().toLowerCase();

            if (text === '..') return;

            if (str.length && text.includes(str)) {
                $link.addClass('highlight');
            } else {
                $link.removeClass('highlight');
            }
        });
    }

    $('#search').on('keyup', search);
});


let stats = {
    colors: 0,
    hashtags: 0,
    mentions: 0
};

function detectAndHighlightColors() {
    const colorRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

    function isLightColor(hex) {
        let r, g, b;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5;
    }

    function processTextNode($element) {
        const tag = $element.prop("tagName");
        if (tag === 'SCRIPT' || tag === 'STYLE' ||
            $element.hasClass('color-preview') ||
            $element.hasClass('hashtag-mention')) return;

        const childNodes = $element.contents();

        if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
            const originalText = $element.text();
            if (colorRegex.test(originalText)) {
                colorRegex.lastIndex = 0;
                const coloredText = originalText.replace(colorRegex, (match) => {
                    stats.colors++;
                    const isLight = isLightColor(match);
                    const lightClass = isLight ? ' light-color' : '';
                    return `<span class="color-preview${lightClass}" style="--color: ${match};" title="Color: ${match}">${match}</span>`;
                });
                $element.html(coloredText);
            }
        } else {
            childNodes.each(function () {
                if (this.nodeType === 1 && !$(this).hasClass("color-preview")) {
                    processTextNode($(this));
                }
            });
        }
    }

    processTextNode($('body'));
}

function highlightHashtagsAndMentions() {
    // ปรับปรุง regex ให้รองรับ unicode และ dash
    const hashtagRegex = /(#[\w\u0E00-\u0E7F\-]+)/g;
    const mentionRegex = /(?<![a-zA-Z0-9\u0E00-\u0E7F])(@[\w\u0E00-\u0E7F\-_.]+)/g;

    function processElement($el) {
        const tag = $el.prop("tagName");
        if (tag === 'SCRIPT' || tag === 'STYLE' ||
            $el.hasClass('hashtag-mention') ||
            $el.hasClass('color-preview')) return;

        const children = $el.contents();
        children.each(function () {
            if (this.nodeType === 3) {
                let text = this.nodeValue;
                let hasChanges = false;

                // ประมวลผล hashtags
                if (hashtagRegex.test(text)) {
                    hashtagRegex.lastIndex = 0;
                    text = text.replace(hashtagRegex, match => {
                        stats.hashtags++;
                        hasChanges = true;
                        return `<span class="hashtag-mention" title="Hashtag: ${match}">${match}</span>`;
                    });
                }

                // ประมวลผล mentions
                if (mentionRegex.test(text)) {
                    mentionRegex.lastIndex = 0;
                    text = text.replace(mentionRegex, match => {
                        stats.mentions++;
                        hasChanges = true;
                        return `<span class="hashtag-mention mention" title="Mention: ${match}">${match}</span>`;
                    });
                }

                if (hasChanges) {
                    $(this).replaceWith(text);
                }
            } else if (this.nodeType === 1 &&
                !$(this).hasClass("hashtag-mention") &&
                !$(this).hasClass("color-preview")) {
                processElement($(this));
            }
        });
    }

    processElement($('body'));
}

// ประมวลผล
detectAndHighlightColors();
highlightHashtagsAndMentions();