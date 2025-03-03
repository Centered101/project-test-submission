// ########  ########  ###   ##  ########  ########  #######   ########  #######   ##  ########  ##
// ##        ##        ## #  ##     ##     ##        ##    ##  ##        ##    ##  ##  ##    ##  ##
// ##        ######    ##  # ##     ##     ######    #######   ######    ##    ##  ##  ##    ##  ##
// ##        ##        ##   ###     ##     ##        ##   ##   ##        ##    ##  ##  ##    ##  ##
// ########  ########  ##    ##     ##     ########  ##    ##  ########  #######   ##  ########  ##

// -script-hbd-----------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    // กำหนดวันเกิด
    const birthday = new Date("2024-08-27 00:00:00").getTime();
    // ตั้งค่า interval ในการอัปเดต countdown ทุก 1 วินาที
    const interval = setInterval(updateCountdown, 1000);
  
    // กำหนดลิสต์ URL ของรูปภาพที่จะเปลี่ยนไปเรื่อยๆ
    const imageUrls = [
      "/images/",
      "/images/คนหล่อนมผง.png",
      "images/P1010452.JPG",
      // "/images/P1010425.JPG",
      "/images/หนุ่มเทคนิคลพบุรี.png",
      "/images/เด็กเรียนครับ.png",
      // "/images/หนุ่มasia.png",
      "/images/HBD/0.png",
      // "/images/HBD/1.png",
      //"/images/HBD/2.png",
      //"/images/HBD/3.png",
      "/images/HBD/4.png",
      //"/images/HBD/5.png",
      //"/images/HBD/6.png",
      "/images/HBD/7.png",
      "/images/HBD/8.png",
      "/images/HBD/9.png",
      "/images/HBD/10.png",
      "/images/HBD/11.png",
      "/images/HBD/12.png",
      "/images/HBD/13.png",
      "/images/HBD/14.png",
      "/images/HBD/15.png",
      "/images/HBD/16.png",
      "/images/HBD/17.png",
      "/images/HBD/18.png",
      "/images/HBD/19.png",
      "/images/HBD/20.png",
      "/images/HBD/21.png",
      "/images/HBD/22.png",
      "/images/HBD/23.png",
      "/images/HBD/24.png",
      "/images/HBD/25.png",
      "/images/HBD/26.png",
      "/images/HBD/27.png",
      "/images/HBD/28.png",
      "/images/HBD/29.png",
      "/images/HBD/30.png",
      "/images/HBD/31.png",
      "/images/HBD/32.png",
      "/images/HBD/33.png",
      "/images/HBD/34.png",
      "/images/HBD/35.png",
      "/images/HBD/36.png",
      "/images/HBD/37.png",
      "/images/HBD/38.png",
      "/images/HBD/39.png",
      "/images/HBD/40.png",
      "/images/HBD/41.png",
      "/images/HBD/42.png",
      "/images/HBD/43.png",
      "/images/HBD/44.png",
      "/images/HBD/45.png",
      "/images/HBD/46.png",
      "/images/HBD/47.png",
      "/images/HBD/48.png",
      "/images/HBD/49.png",
      "/images/HBD/50.png",
      "/images/HBD/51.png",
      "/images/HBD/52.png",
      "/images/HBD/53.png",
      "/images/HBD/54.png",
      "/images/HBD/55.png",
      "/images/HBD/56.png",
      "/images/HBD/57.png",
      "/images/HBD/58.png",
      "/images/HBD/59.png",
      "/images/HBD/60.png",
      "/images/HBD/61.png",
      "/images/HBD/62.png",
      "/images/HBD/63.png",
      "/images/HBD/64.png",
      "/images/HBD/65.png",
      "/images/HBD/66.png",
      "/images/HBD/67.png",
      "/images/HBD/68.png",
      "/images/HBD/69.png",
      "/images/HBD/70.png",
      "/images/HBD/71.png",
      "/images/HBD/72.png",
      "/images/HBD/73.png",
      "/images/HBD/74.png",
      "/images/HBD/75.png",
      "/images/HBD/76.png",
      "/images/HBD/77.png",
      "/images/HBD/78.png",
      "/images/HBD/79.png",
      "/images/HBD/80.png",
      "/images/HBD/81.png",
      "/images/HBD/82.png",
      "/images/HBD/83.png",
      "/images/HBD/84.png",
      "/images/HBD/85.png",
      "/images/HBD/86.png",
      "/images/HBD/87.png",
      "/images/HBD/88.png",
      "/images/HBD/89.png",
      "/images/HBD/90.png",
      "/images/HBD/91.png",
      "/images/HBD/92.png",
      "/images/HBD/93.png",
      "/images/HBD/94.png",
      "/images/HBD/95.png",
      "/images/HBD/96.png",
      "/images/HBD/97.png",
      "/images/HBD/98.png",
      "/images/HBD/99.png",
      "/images/HBD/100.png",
      "/images/HBD/101.png",
      "/images/HBD/102.png",
      "/images/HBD/103.png",
      "/images/HBD/104.png",
      "/images/HBD/105.png",
      "/images/HBD/106.png",
      "/images/HBD/107.png",
      "/images/HBD/108.png",
      "/images/HBD/109.png",
      "/images/HBD/110.png",
      "/images/HBD/111.png",
      "/images/HBD/112.png",
      "/images/HBD/113.png",
      "/images/HBD/114.png",
      "/images/HBD/115.png",
      "/images/HBD/116.png",
      "/images/HBD/117.png",
      "/images/HBD/118.png",
      "/images/HBD/119.png",
      "/images/HBD/120.png",
      "/images/HBD/121.png",
      "/images/HBD/122.png",
    ];
    let currentImageIndex = 0; // เก็บดัชนีของรูปภาพปัจจุบัน
  
    // ฟังก์ชันสำหรับอัปเดต countdown
    function updateCountdown() {
      // ดึงเวลาปัจจุบันและคำนวณความแตกต่างระหว่างเวลาปัจจุบันและวันเกิด
      const now = new Date().getTime();
      const difference = birthday - now;
  
      // คำนวณเวลาเป็นวัน ชั่วโมง นาที และวินาที
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      // แสดงผลในหน้าเว็บ
      document.getElementById("countdownDays").innerHTML = formatTime(days);
      document.getElementById("countdownHours").innerHTML = formatTime(hours);
      document.getElementById("countdownMinutes").innerHTML = formatTime(minutes);
      document.getElementById("countdownSeconds").innerHTML = formatTime(seconds);
      document.getElementById("countdown").innerHTML = `${replaceZeroWithHeart(
  
        formatTime(days)
      )} วัน ${replaceZeroWithHeart(
  
        formatTime(hours)
      )} ชั่วโมง ${replaceZeroWithHeart(
  
        formatTime(minutes)
      )} นาที ${replaceZeroWithHeart(formatTime(seconds))} วินาที`;
      document.getElementById(
        "daysSinceBirthday"
      ).innerHTML = `นับถอยหลัง: ${replaceZeroWithHeart(
  
        formatTime(days)
      )} วัน ${replaceZeroWithHeart(
  
        formatTime(hours)
      )} ชั่วโมง ${replaceZeroWithHeart(
  
        formatTime(minutes)
      )} นาที ${replaceZeroWithHeart(formatTime(seconds))} วินาที`;
  
      // คำนวณวันตั้งแต่เกิดและแสดงผล
      const dob = new Date("2007-08-27"); // ใส่วันเกิดของคุณที่นี่
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - dob.getTime();
  
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      const hoursDiff = Math.floor(
        (timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
      );
      const minutesDiff = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
      const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
      const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
      const monthsDiff = currentDate.getMonth() - dob.getMonth();
      const daysInMonthDiff = currentDate.getDate() - dob.getDate();
  
      // แปลงจำนวนเดือนเป็นปี
      let ageYears = yearsDiff;
      if (monthsDiff < 0 || (monthsDiff === 0 && daysInMonthDiff < 0)) {
        ageYears--;
      }
  
      // แปลงจำนวนเดือนให้อยู่ในช่วง 0-11
      let ageMonths = monthsDiff < 0 ? 12 + monthsDiff : monthsDiff;
      if (daysInMonthDiff < 0) {
        ageMonths--;
      }
  
      // แปลงจำนวนวันให้อยู่ในช่วง 0-30
      let ageDays =
        daysInMonthDiff < 0
          ? new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          ).getDate() + daysInMonthDiff
          : daysInMonthDiff;
  
      // แก้ไขกรณีที่เป็น -1 ให้เป็น 0
      ageYears = ageYears < 0 ? 0 : ageYears;
      ageMonths = ageMonths < 0 ? 0 : ageMonths;
      ageDays = ageDays < 0 ? 0 : ageDays;
  
      const daysText = replaceZeroWithHeart(daysDiff);
      const hoursText = replaceZeroWithHeart(hoursDiff);
      const minutesText = replaceZeroWithHeart(minutesDiff);
      const secondsText = replaceZeroWithHeart(secondsDiff);
  
      const ageYearsText = replaceZeroWithHeart(ageYears);
      const ageMonthsText = replaceZeroWithHeart(ageMonths);
      const ageDaysText = replaceZeroWithHeart(ageDays);
  
      document.getElementById("all_day_hbd").innerHTML =
        `อยู่บนโลกนี้มาแล้ว: ${daysText} วัน ${hoursText} ชั่วโมง ${minutesText} นาที ${secondsText} วินาที;` +
        `<br>` +
        `อายุของผมคือ: ${ageYearsText} ปี ${ageMonthsText} เดือน ${ageDaysText} วัน;`;
  
      if (difference <= 48 * 1000 && difference > 0) {
        playBirthdaySound();
  
        const header = document.querySelector('header')
        const footer = document.querySelector('footer')
        const goForward = document.querySelector('nav');
        const containerTime = document.querySelector('.container_time');
        const containerHBD = document.querySelector('.container_hbd');
        const containerSkill = document.querySelector('.container_skill');
        const containerMultiplication = document.querySelector('.container_multiplication');
        const toggleContainerButton = document.getElementById('toggleContainerButton');
  
        if (header) {header.style.display = 'none';}
        if (footer) {footer.style.display = 'none';}
        if (goForward) {goForward.style.display = 'none';}
        if (containerTime) {containerTime.style.display = 'none';}
        if (containerHBD) {containerHBD.style.width = '800px';}
        if (containerSkill) {containerSkill.style.display = 'none';}
        if (containerMultiplication) {containerMultiplication.style.display = 'none';}
        toggleContainerButton.style.display = 'block';
      }
  
      // เมื่อถึงวันเกิด
      if (difference <= 0) {
        const header = document.querySelector('header')
        const footer = document.querySelector('footer')
        const goForward = document.querySelector('nav');
        const containerTime = document.querySelector('.container_time');
        const containerHBD = document.querySelector('.container_hbd');
        const containerSkill = document.querySelector('.container_skill');
        const containerMultiplication = document.querySelector('.container_multiplication');
        const toggleContainerButton = document.getElementById('toggleContainerButton');
  
        if (header) {header.style.display = 'none';}
        if (footer) {footer.style.display = 'none';}
        if (goForward) {goForward.style.display = 'none';}
        if (containerTime) {containerTime.style.display = 'none';}
        if (containerHBD) {containerHBD.style.width = '800px';}
        if (containerSkill) {containerSkill.style.display = 'none';}
        if (containerMultiplication) {containerMultiplication.style.display = 'none';}
        toggleContainerButton.style.display = 'block';
  
        // ฟังก์ชันสำหรับแสดง/ซ่อนคอนเทนเนอร์เมื่อคลิกปุ่ม
        document.getElementById('toggleContainerButton').addEventListener('click', function () {
          const header = document.querySelector('header');
          const footer = document.querySelector('footer');
          const goForward = document.querySelector('nav');
          const containerTime = document.querySelector('.container_time');
          const containerSkill = document.querySelector('.container_skill');
          const containerMultiplication = document.querySelector('.container_multiplication');
          const containerHBD = document.querySelector('.container_hbd');
  
          if (header) header.style.display = 'flex';
          if (footer) footer.style.display = 'flex';
          if (goForward) goForward.style.display = 'flex';
          if (containerTime) containerTime.style.display = 'block';
          if (containerSkill) containerSkill.style.display = 'block';
          if (containerMultiplication) containerMultiplication.style.display = 'block';
          if (containerHBD) containerHBD.style.width = '400px';
  
          this.style.display = 'none';
        });
  
        // หยุดการนับถอยหลัง
        clearInterval(interval);
        document.getElementById("countdownDays").innerHTML = "🎂";
        document.getElementById("countdownHours").innerHTML = "🎉";
        document.getElementById("countdownMinutes").innerHTML = "❤";
        document.getElementById("countdownSeconds").innerHTML = "🎧🎶";
        document.getElementById("countdown").innerHTML =
          "Happy Birthday ครับสุดหล่อ🎉";
  
        document.getElementById("countdown").style.fontSize = "18px";
        document.getElementById("countdown").style.color = "#000000";
        document.getElementById("daysSinceBirthday").style.color = "#FE4040";
        document.getElementById("birthdayImage").style.animation = "none";
        document.getElementById("birthdayImage").style.boxShadow = "none";
  
        displayMessage("Happy Birthday ครับสุดหล่อ🎉");
  
        // เปลี่ยนสีพื้นหลังทุกๆ 1 วินาที
        setInterval(function () {
          document.body.style.backgroundColor = getRandomColor();
        }, 1000);
  
        // เล่นเสียงเพลงวันเกิด
        playBirthdaySound();
  
        // เปลี่ยนภาพไปเรื่อยๆ
        changeBirthdayImagePeriodically();
  
        // แสดงจำนวนวันที่เลยวันเกิดมาแล้ว
        displayDaysSinceBirthday();
      }
    }
  
    // ฟังก์ชันสำหรับแปลงเวลาให้อยู่ในรูปแบบ 2 หลัก
    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }
  
    // ฟังก์ชันแปลงตัวเลขตามที่กำหนด
    function replaceZeroWithHeart(time) {
      let result = time.toString();
      result = result.replace(/1/g, "<span class='color_change'>1</span>");
      result = result.replace(/2/g, "<span class='color_change'>2</span>");
      result = result.replace(/3/g, "<span class='color_change'>3</span>");
      result = result.replace(/4/g, "<span class='color_change'>4</span>");
      result = result.replace(/5/g, "<span class='color_change'>5</span>");
      result = result.replace(/6/g, "<span class='color_change'>6</span>");
      result = result.replace(/7/g, "<span class='color_change'>7</span>");
      result = result.replace(/8/g, "<span class='color_change'>8</span>");
      result = result.replace(/9/g, "<span class='color_change'>9</span>");
      result = result.replace(/0/g, "<span class='color_change'>0</span>");
      return result;
    }
  
    // ฟังก์ชันสุ่มสีในรูปแบบ #RRGGBB
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    // ฟังก์ชันเล่นเสียงเพลงวันเกิด
    function playBirthdaySound() {
      const sound = document.getElementById("birthdaySound");
      sound.play();
    }
  
    // ดึงแถบความคืบหน้าของเสียงเพลงวันเกิดด้วย ID
    var birthdayProgress = document.getElementById("birthdayProgress");
  
    // อัปเดตแถบความคืบหน้าของเสียงเพลงวันเกิด
    birthdaySound.addEventListener("timeupdate", function () {
      if (birthdayProgress) {
        birthdayProgress.value =
          birthdaySound.currentTime / birthdaySound.duration;
      }
    });
  
    // ฟังก์ชัน เปลี่ยนรูป
    function changeBirthdayImage() {
      const image = document.getElementById("birthdayImage");
      image.src = imageUrls[currentImageIndex];
      //image.style.width = '350px';
      //image.style.height = '500px';
    }
  
    // ฟังก์ชันสำหรับเปลี่ยนรูปภาพไปเรื่อยๆ
    function changeBirthdayImagePeriodically() {
      setInterval(function () {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        changeBirthdayImage();
        if (currentImageIndex === 0) {
          document.getElementById("countdown").innerHTML = "วนรูปอีกครั้ง";
          displayMessage("วนรูปอีกครั้ง");
        } else {
          document.getElementById("countdown").innerHTML =
            "Happy Birthday ครับสุดหล่อ🎉";
        }
      }, 2000);
    }
  
    // ฟังก์ชันแสดงจำนวนวันที่เลยวันเกิดมาแล้ว พร้อมด้วยจำนวนชั่วโมง นาที และวินาที
    function displayDaysSinceBirthday() {
      const now = new Date().getTime();
      const difference = now - birthday;
  
      const daysSinceBirthday = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursSinceBirthday = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesSinceBirthday = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsSinceBirthday = Math.floor((difference % (1000 * 60)) / 1000);
  
      document.getElementById(
        "daysSinceBirthday"
      ).innerHTML = `วันเกิดผ่านมาแล้ว: ${replaceZeroWithHeart(
        formatTime(daysSinceBirthday)
      )} วัน ${replaceZeroWithHeart(
        formatTime(hoursSinceBirthday)
      )} ชั่วโมง ${replaceZeroWithHeart(
        formatTime(minutesSinceBirthday)
      )} นาที ${replaceZeroWithHeart(formatTime(secondsSinceBirthday))} วินาที;`;
  
      // เรียกฟังก์ชันนี้ใหม่ทุกๆ 1 วินาที
      setTimeout(displayDaysSinceBirthday, 1000);
    }
  });