// นำเข้าฟังก์ชันจาก SDK ของ Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: เพิ่ม SDKs สำหรับผลิตภัณฑ์ของ Firebase ที่คุณต้องการใช้
// https://firebase.google.com/docs/web/setup#available-libraries

// การตั้งค่า Firebase สำหรับเว็บแอป
// สำหรับ Firebase JS SDK เวอร์ชัน 7.20.0 และหลังจากนั้น, measurementId เป็นตัวเลือก (optional)
const firebaseConfig = {
  apiKey: "AIzaSyCpZhY4WQtr8LV_KXM9pLrRtuKOZSY92C0",
  authDomain: "project-test-submission.firebaseapp.com",
  projectId: "project-test-submission",
  storageBucket: "project-test-submission.appspot.com",
  messagingSenderId: "322742881391",
  appId: "1:322742881391:web:b6d751b09aca2dc0f5919a",
  measurementId: "G-KTJ2LTWT0L"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);โ