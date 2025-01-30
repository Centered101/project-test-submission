# การใช้งาน Animation ด้วย JavaScript และ CSS

README นี้อธิบายเกี่ยวกับวิธีการสร้างและใช้งาน Animation โดยใช้ JavaScript ในการเพิ่มคลาส CSS ให้กับ HTML แบบไดนามิก เพื่อให้หน้าเว็บสามารถแสดงผลที่ดูน่าสนใจและโต้ตอบกับผู้ใช้งานได้ดียิ่งขึ้น โดยโค้ด JavaScript จะวางไว้ใน `<head>` และทำงานร่วมกับคลาส CSS ที่กำหนดไว้ เช่น:

- `animationShow`
- `animationShow-y`
- `animationShow-x`
- `-animationShow-x`

## คุณสมบัติ

- **การเพิ่มคลาสแบบไดนามิก**: ใช้ JavaScript ในการจัดการคลาส CSS เพื่อควบคุมลักษณะการเคลื่อนไหวขององค์ประกอบ HTML
- **รองรับ CSS Animations**: การทำงานร่วมกับ CSS เพื่อสร้างเอฟเฟกต์ Animation ที่หลากหลาย
- **น้ำหนักเบาและใช้งานง่าย**: โค้ดสามารถรวมเข้ากับโปรเจกต์ได้โดยไม่เพิ่มภาระมากเกินไป
- **ความยืดหยุ่นในการปรับแต่ง**: ผู้ใช้งานสามารถปรับแต่ง Animation ต่าง ๆ ได้ผ่าน CSS

## วิธีการใช้งาน

### โครงสร้าง HTML

ในหน้า HTML เพิ่มคลาสที่ต้องการใช้งาน Animation เพื่อกำหนดพฤติกรรมขององค์ประกอบ ตัวอย่างโครงสร้าง HTML:

```html
<!DOCTYPE html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ตัวอย่าง Animation</title>
    <script
      src="https://project-test-submission.netlify.app/animation/script.js"
      defer
    ></script>
  </head>
  <body>
    <div class="animationShow">ตัวอย่าง Animation</div>
    <div class="animationShow-y">Animation แนวตั้ง</div>
    <div class="animationShow-x">Animation แนวนอน</div>
    <div class="-animationShow-x">Animation แนวนอนย้อนกลับ</div>
  </body>
</html>
```

## หมายเหตุ

- คุณสามารถปรับแต่งความยาวเวลา ความหน่วง และประเภทของเอฟเฟกต์ใน CSS ได้ตามความต้องการ
- โปรดตรวจสอบความเข้ากันได้ของเบราว์เซอร์สำหรับคุณสมบัติ CSS ที่ใช้งาน เช่น `@keyframes` และ `animation`
