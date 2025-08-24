
// ปิด contextmenu ทั้งหมด
document.addEventListener("contextmenu", function (e) {
    // เช็คว่าคลิกที่ #files หรือเปล่า
    if (e.target.closest("#files")) {
        return true; // อนุญาต
    }
    e.preventDefault(); // ที่อื่นไม่ให้คลิกขวา
});

// —[  ]———————————————————————————————————————————————————————————————————————————————————————————————————

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

    $.each(files, function (_, { path, name, status }) {
        const cleanName = path.split('/').pop();
        const fileName = name || cleanName;

        const ext = cleanName.includes('.') ? cleanName.split('.').pop().toLowerCase() : '';
        const classToUse = extensionClassMap[ext] || defaultClassName;

        const $li = $('<li></li>').append(`
        <a href="${path}" class="${classToUse}" title="${cleanName}">
            <span class="name">${fileName}</span>
        </a>
    `);

        if (status) {
            $li.find('a')
                .addClass('opacity-50 pointer-events-none cursor-not-allowed')
                .on('click', function (e) {
                    e.preventDefault();
                });
        }

        // เพิ่มลงใน ul
        $li.appendTo('#files');
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