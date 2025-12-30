$('body').append(`
    <!-- Student Info Card -->
    <div id="student-info"
    class="hidden fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-[color:var(--white-smoker)] border rounded-2xl shadow-xl w-[90%] max-w-md p-4 space-y-3">

    <div class="flex items-center gap-4">
    <img src="https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/user_files/392/1408392/profilepict/profilepict-1408392-17542882116511.png"
    class="size-16 border rounded-md object-cover" draggable="false">

    <div>
    <p class="text-lg font-semibold line-clamp-1">
    พงศ์พล พรมผา
    </p>
    <p class="text-sm text-gray-500 line-clamp-1">
    นักศึกษา เทคโนโลยีธุรกิจดิจิทัล
    </p>
    <p class="text-sm text-gray-500 line-clamp-1">
    ว่าที่นักศึกษา วิทยาการคอมพิวเตอร์ และไซเบอร์ซีเคียวริตี้
    </p>
    </div>
    </div>

    <div class="bg-gray-50 text-sm text-gray-600 border rounded-md shadow-inner space-y-1 p-2">
    <p>
    <i class="fas fa-id-card mr-2"></i>รหัสนักศึกษา: 36887
    </p>
    <p>
    <i class="fas fa-school mr-2"></i>โรงเรียนพระนารายณ์
    </p>
    <p>
    <i class="fas fa-laptop-code mr-2"></i>สาย: Programmer / Web Dev
    </p>
    </div>
    </div>
    `);

// Toggle student info
$('#student-btn').on('click', function (e) {
    e.stopPropagation();

    const $info = $('#student-info');

    if ($info.is(':visible')) {
        $info.fadeOut(300).addClass('hidden');
    } else {
        $info.removeClass('hidden').hide().fadeIn(300);
    }
});

// คลิกที่อื่นให้ปิด
$(document).on('click', function () {
    $('#student-info').fadeOut(300).addClass('hidden');
});

// กันไม่ให้คลิกในกล่องแล้วปิด
$('#student-info').on('click', function (e) {
    e.stopPropagation();
});