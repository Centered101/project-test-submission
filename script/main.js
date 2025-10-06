// ————————————————————————————————————————————————————————————————————————————————
// File Browser & Highlight System
// ————————————————————————————————————————————————————————————————————————————————

$(document).ready(function () {
    const defaultClassName = "icon-default";

    // แมปนามสกุลไฟล์กับ CSS class
    const extensionClassMap = {
        'html': 'icon-text-html', 'htm': 'icon-text-html',
        'css': 'icon-text-css', 'js': 'icon-application-javascript',
        'json': 'icon-json', 'txt': 'icon-text',
        'cpp': 'icon-cpp', 'sql': 'icon-application-x-sql',
        'jpg': 'icon-image', 'jpeg': 'icon-image', 'png': 'icon-image',
        'gif': 'icon-image', 'webp': 'icon-image', 'ico': 'icon-image',
        'svg': 'icon-svg', 'mp4': 'icon-video', 'webm': 'icon-video',
        '': 'icon-directory'
    };

    // สร้างรายการไฟล์
    $.each(files, function (_, { path, name, status }) {
        const cleanName = path.split('/').pop();
        const fileName = name || cleanName;
        const ext = cleanName.includes('.') ? cleanName.split('.').pop().toLowerCase() : '';
        const classToUse = extensionClassMap[ext] || defaultClassName;

        const $li = $('<li></li>').append(
            $('<a></a>', {
                href: path,
                class: classToUse,
                title: cleanName,
                html: `<span class="name">${fileName}</span>`
            })
        );

        // ปิดการใช้งานไฟล์ที่ status = 0
        if (status == 0) {
            $li.find('a')
                .addClass('opacity-50 pointer-events-none cursor-not-allowed')
                .on('click', e => e.preventDefault());
        }

        $li.appendTo('#files');
    });

    // ฟังก์ชันค้นหาไฟล์ (highlight ผลลัพธ์)
    function search() {
        const str = $('#search').val().toLowerCase();
        $('#files a').each(function () {
            const text = $(this).text().toLowerCase();
            if (text !== '..' && str.length && text.includes(str)) {
                $(this).addClass('highlight');
            } else {
                $(this).removeClass('highlight');
            }
        });
    }

    $('#search').on('keyup', search);

    // จัดการการนำทาง - ถ้าคลิก .. ให้ใช้ history.back()
    $('#files').on('click', 'a', function (e) {
        const path = $(this).attr('href');
        if (path === '..' || path === '/..') {
            e.preventDefault();
            history.back();
        }
    });

    // ประมวลผล highlight สี, hashtags, mentions
    detectAndHighlightColors();
    highlightHashtagsAndMentions();
});


// ————————————————————————————————————————————————————————————————————————————————
// Statistics
// ————————————————————————————————————————————————————————————————————————————————
let stats = { colors: 0, hashtags: 0, mentions: 0 };


// ————————————————————————————————————————————————————————————————————————————————
// ตรวจจับและแสดง Color Codes (#hex)
// ————————————————————————————————————————————————————————————————————————————————
function detectAndHighlightColors() {
    const colorRegex = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

    // คำนวณความสว่างของสี
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
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
    }

    // ประมวลผล text node
    function processTextNode($el) {
        const tag = $el.prop("tagName");
        if (tag === 'SCRIPT' || tag === 'STYLE' ||
            $el.hasClass('color-preview') || $el.hasClass('hashtag-mention')) return;

        const nodes = $el.contents();
        if (nodes.length === 1 && nodes[0].nodeType === 3) {
            const text = $el.text();
            if (colorRegex.test(text)) {
                colorRegex.lastIndex = 0;
                $el.html(text.replace(colorRegex, match => {
                    stats.colors++;
                    const lightClass = isLightColor(match) ? ' light-color' : '';
                    return `<span class="color-preview${lightClass}" style="--color: ${match};" title="Color: ${match}">${match}</span>`;
                }));
            }
        } else {
            nodes.each(function () {
                if (this.nodeType === 1 && !$(this).hasClass("color-preview")) {
                    processTextNode($(this));
                }
            });
        }
    }

    processTextNode($('body'));
}


// ————————————————————————————————————————————————————————————————————————————————
// ตรวจจับและ Highlight #hashtags และ @mentions
// ————————————————————————————————————————————————————————————————————————————————
function highlightHashtagsAndMentions() {
    const hashtagRegex = /(#[\w\u0E00-\u0E7F\-]+)/g;
    const mentionRegex = /(?<![a-zA-Z0-9\u0E00-\u0E7F])(@[\w\u0E00-\u0E7F\-_.]+)/g;

    function processElement($el) {
        const tag = $el.prop("tagName");
        if (tag === 'SCRIPT' || tag === 'STYLE' ||
            $el.hasClass('hashtag-mention') || $el.hasClass('color-preview')) return;

        $el.contents().each(function () {
            if (this.nodeType === 3) {
                let text = this.nodeValue;
                let changed = false;

                // ประมวลผล hashtags
                if (hashtagRegex.test(text)) {
                    hashtagRegex.lastIndex = 0;
                    text = text.replace(hashtagRegex, match => {
                        stats.hashtags++;
                        changed = true;
                        return `<span class="hashtag-mention" title="Hashtag: ${match}">${match}</span>`;
                    });
                }

                // ประมวลผล mentions
                if (mentionRegex.test(text)) {
                    mentionRegex.lastIndex = 0;
                    text = text.replace(mentionRegex, match => {
                        stats.mentions++;
                        changed = true;
                        return `<span class="hashtag-mention mention" title="Mention: ${match}">${match}</span>`;
                    });
                }

                if (changed) $(this).replaceWith(text);
            } else if (this.nodeType === 1 &&
                !$(this).hasClass("hashtag-mention") &&
                !$(this).hasClass("color-preview")) {
                processElement($(this));
            }
        });
    }

    processElement($('body'));
}