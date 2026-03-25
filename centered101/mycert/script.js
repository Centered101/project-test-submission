/**
 * ══════════════════════════════════════════════════════════════════
 *  mycert — shared script
 *  by Centered101
 *
 *  ใส่ไว้ท้าย <body> ทุกหน้า:
 *    <script src="script.js"></script>
 * ══════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────
//  ✏️  CONFIG — แก้ที่นี่ที่เดียว ใช้ทุกหน้า
// ─────────────────────────────────────────────────────────────────
window.MYCERT = {

  // 🔗 GAS REST API URL — วาง URL หลัง deploy เป็น Web App
  API_URL: 'https://script.google.com/macros/s/AKfycbysyL_ugQqCQ0aHB13FfJ7z5nLuQ6kzzHDCVDB890rl3RwH-5j8dXPZ13Rc_-lrotqaPg/exec',

  // 🖼️ ImgBB API Key
  IMGBB_KEY: 'dac9107419e9c9cb4acbf457f9db52e8',

  // ⏱️ Cache (ms)
  CACHE_KEY: 'mycert_cache',
  CACHE_TTL: 5 * 60 * 1000, // 5 นาที

  // 🏠 หน้าหลัก
  HOME_URL: 'index.html',

  // 👤 ข้อมูลเจ้าของ
  OWNER: {
    name:       'พงศ์พล พรมผา',
    nameEn:     'Phongphon Phompha',
    avatar:     'https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/user_files/392/1408392/profilepict/profilepict-1408392-17542882116511.png',
    studentId:  '-',
    school:     '-',
    major:      'เทคโนโลยีธุรกิจดิจิทัล',
    track:      'Programmer / Web Dev',
    profileUrl: 'https://project-test-submission.netlify.app/centered101/',
  },

  // 🏷️ ประเภทใบประกาศ — ตรงกับ Sheet คอลัมน์ type
  TYPES: [
    { label: 'เวิร์กชอป',                 icon: 'fa-tools' },
    { label: 'อบรม / สัมมนา',             icon: 'fa-chalkboard-teacher' },
    { label: 'หลักสูตรออนไลน์',           icon: 'fa-laptop' },
    { label: 'การแข่งขัน',                icon: 'fa-trophy' },
    { label: 'รางวัล',                    icon: 'fa-medal' },
    { label: 'ทักษะเฉพาะทาง',            icon: 'fa-star' },
    { label: 'ประกาศนียบัตร / วุฒิบัตร', icon: 'fa-scroll' },
  ],

  // 🎨 สีแต่ละประเภท
  TYPE_COLORS: {
    'เวิร์กชอป':                 'bg-purple-100 text-purple-700 border-purple-200',
    'อบรม / สัมมนา':             'bg-blue-100 text-blue-700 border-blue-200',
    'หลักสูตรออนไลน์':           'bg-sky-100 text-sky-700 border-sky-200',
    'การแข่งขัน':                'bg-orange-100 text-orange-700 border-orange-200',
    'รางวัล':                    'bg-yellow-100 text-yellow-700 border-yellow-200',
    'ทักษะเฉพาะทาง':            'bg-green-100 text-green-700 border-green-200',
    'ประกาศนียบัตร / วุฒิบัตร': 'bg-red-100 text-red-700 border-red-200',
  },

  // 🖼️ fallback รูปภาพ
  NO_IMAGE_URL: 'https://project-test-submission.netlify.app/images/img/noitems.svg',
};
// ─────────────────────────────────────────────────────────────────


// ── NAV: fill ข้อมูลเจ้าของจาก MYCERT.OWNER ──────────────────────
$(document).ready(function () {
  const o = MYCERT.OWNER;
  $('#nav-owner-avatar').attr({ src: o.avatar, alt: o.name });
  $('#nav-owner-name').text(o.name);
  $('#nav-owner-name-en').text(o.nameEn);
});


// ── STUDENT INFO POPUP ────────────────────────────────────────────
(function () {
  function buildPopup() {
    if ($('#student-info').length) return;
    const o = MYCERT.OWNER;
    $('body').append(`
      <div id="student-info"
        class="hidden fixed top-24 left-1/2 -translate-x-1/2 z-40
               bg-[color:var(--white-smoker)] border rounded-2xl shadow-xl
               w-[90%] max-w-md p-4 space-y-3">
        <div class="flex items-center gap-4">
          <img src="${o.avatar}" class="size-16 border rounded-md object-cover" draggable="false">
          <div>
            <p class="text-lg font-semibold line-clamp-1">${o.name}</p>
            <p class="text-xs sm:text-sm text-gray-500 line-clamp-1">${o.nameEn}</p>
            <p class="text-xs sm:text-sm text-gray-500 line-clamp-1">นักศึกษา ${o.major}</p>
          </div>
        </div>
        <div class="bg-gray-50 sm:text-sm text-xs text-gray-600 border rounded-md shadow-inner space-y-1 p-2">
          <p><i class="fas fa-id-card mr-2"></i>รหัสนักศึกษา: ${o.studentId}</p>
          <p><i class="fas fa-school mr-2"></i>${o.school}</p>
          <p><i class="fas fa-laptop-code mr-2"></i>สาย: ${o.track}</p>
        </div>
      </div>
    `);
  }

  $(document).ready(buildPopup);

  $(document).on('click', '#student-btn', function (e) {
    e.stopPropagation();
    const $info = $('#student-info');
    if ($info.hasClass('hidden')) $info.removeClass('hidden').hide().fadeIn(300);
    else $info.fadeOut(300, () => $info.addClass('hidden'));
  });

  $(document).on('click', function () {
    const $info = $('#student-info');
    if (!$info.hasClass('hidden')) $info.fadeOut(300, () => $info.addClass('hidden'));
  });

  $(document).on('click', '#student-info', e => e.stopPropagation());
})();