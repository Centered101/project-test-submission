// —[ preloader ]———————————————————————————————————————————————————————————————————————————————————————————————————

$('#preloader').addClass('fixed touch-none visible');

$(window).on(function () {
    $('#preloader').addClass('invisible');
    $('#preloader').removeClass('fixed touch-none visible');
});

// —[ search ]———————————————————————————————————————————————————————————————————————————————————————————————————

function $(id) {
    var el = 'string' == typeof id
        ? document.getElementById(id)
        : id;

    el.on = function (event, fn) {
        if ('content loaded' == event) {
            event = window.attachEvent ? "load" : "DOMContentLoaded";
        }
        el.addEventListener
            ? el.addEventListener(event, fn, false)
            : el.attachEvent("on" + event, fn);
    };

    el.all = function (selector) {
        return $(el.querySelectorAll(selector));
    };

    el.each = function (fn) {
        for (var i = 0, len = el.length; i < len; ++i) {
            fn($(el[i]), i);
        }
    };

    el.getClasses = function () {
        return this.getAttribute('class').split(/\s+/);
    };

    el.addClass = function (name) {
        var classes = this.getAttribute('class');
        el.setAttribute('class', classes
            ? classes + ' ' + name
            : name);
    };

    el.removeClass = function (name) {
        var classes = this.getClasses().filter(function (curr) {
            return curr != name;
        });
        this.setAttribute('class', classes.join(' '));
    };

    return el;
}

function search() {
    var str = $('search').value.toLowerCase();
    var links = $('files').all('a');

    links.each(function (link) {
        var text = link.textContent.toLowerCase();

        if ('..' == text) return;
        if (str.length && ~text.indexOf(str)) {
            link.addClass('highlight');
        } else {
            link.removeClass('highlight');
        }
    });
}

$(window).on('content loaded', function () {
    $('search').on('keyup', search);
});

// —[ copyText ]———————————————————————————————————————————————————————————————————————————————————————————————————

function copyText() {
    const text = window.location.href;
    navigator.clipboard.writeText(text)
        .then(() => showToast("คัดลอก URL แล้ว: " + text))
        .catch(err => console.error("คัดลอกไม่สำเร็จ", err));
}

const urlElement = document.getElementById("url");
if (urlElement) {
    let pressTimer;

    urlElement.addEventListener("mousedown", function (event) {
        if (event.button === 2) {
            event.preventDefault();
            copyText();  // คลิกขวาคัดลอก
        } else if (event.button === 0) {
            window.location.href = "/";
        }
    });

    // รองรับ long press บนมือถือ
    urlElement.addEventListener("touchstart", function () {
        pressTimer = setTimeout(() => {
            copyText();
        }, 500); // กดค้าง 500ms เพื่อคัดลอก
    });

    urlElement.addEventListener("touchend", function () {
        clearTimeout(pressTimer);
    });

    urlElement.addEventListener("touchmove", function () {
        clearTimeout(pressTimer); // ถ้าลากนิ้วออกไป จะไม่คัดลอก
    });
}

// —[ Toastify ]———————————————————————————————————————————————————————————————————————————————————————————————————

function showToast(message, bgColor = "#FFF", color = "#0D0D0D", duration = 2750) {
    Toastify({
        newWindow: true,
        text: message,
        duration: duration,
        gravity: "bottom",
        position: "right",
        style: {
            position: "fixed",
            bottom: "32px",
            right: "32px",
            background: bgColor,
            color: color,
            border: "solid 1px #CCC",
            borderRadius: "12px",
            paddingBlock: "8px",
            paddingInline: "16px",
            zIndex: 100,
        }
    }).showToast();
}

// ตรวจจับเมื่อออฟไลน์
window.addEventListener("offline", () => {
    showToast("⚠️ ให้ตายเถอะ! คุณออฟไลน์ไปแล้ว 😐", '#FF7070', '#FFF', 10000);
});

// ตรวจจับเมื่อกลับมาออนไลน์
window.addEventListener("online", () => {
    showToast("ดีใจที่คุณกลับมาออนไลน์แล้ว! 😍", '#1ED760', '#FFF', 5000);
});

// —[ Go Black ]———————————————————————————————————————————————————————————————————————————————————————————————————

document.querySelectorAll("[id='goBack']").forEach(button => {
    button.addEventListener("click", function () {
        if (!document.referrer || document.referrer === window.location.href) {
            window.location.href = "/";
        } else {
            window.history.back();
        }
    });
});
