// ตรวจสอบว่าผู้ใช้กำลังอยู่บนเว็บไซต์ Instagram หรือไม่
if (window.location.origin !== "https://www.instagram.com") {
    window.alert(
      "เฮ้! คุณต้องอยู่ในเว็บไซต์ Instagram ก่อนที่จะรันโค้ดนี้ ฉันจะพาคุณไปที่นั่นตอนนี้ แต่คุณจะต้องรันโค้ดนี้ในคอนโซลอีกครั้ง",
    );
    window.location.href = "https://www.instagram.com";
    console.clear();
}

// ตัวเลือกสำหรับการดึงข้อมูลจาก API
const fetchOptions = {
    credentials: "include",
    headers: {
      "X-IG-App-ID": "936619743392459", // ใส่ App ID ของ Instagram ที่ใช้
    },
    method: "GET",
};

// ตัวแปรสำหรับเก็บชื่อผู้ใช้
let username;

// ฟังก์ชันหน่วงเวลา
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// ฟังก์ชันสุ่มจำนวนระหว่าง min และ max
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// ฟังก์ชันจัดการการแบ่งหน้าและดึงข้อมูลผู้ติดตาม/การติดตาม
const concatFriendshipsApiResponse = async (
    list,
    user_id,
    count,
    next_max_id = "",
) => {
    // สร้าง URL สำหรับ API request
    let url = `https://www.instagram.com/api/v1/friendships/${user_id}/${list}/?count=${count}`;
    if (next_max_id) {
        url += `&max_id=${next_max_id}`;
    }

    // ดึงข้อมูลจาก API
    const data = await fetch(url, fetchOptions).then((r) => r.json());

    // ถ้ามีหน้าเพิ่มเติมให้โหลด
    if (data.next_max_id) {
        const timeToSleep = random(800, 1500);
        console.log(
          `Loaded ${data.users.length} ${list}. Sleeping ${timeToSleep}ms to avoid rate limiting`,
        );

        await sleep(timeToSleep);

        // รวมข้อมูลจากหน้าถัดไป
        return data.users.concat(
            await concatFriendshipsApiResponse(
                list,
                user_id,
                count,
                data.next_max_id,
            ),
        );
    }

    return data.users;
};

// ฟังก์ชันดึงผู้ติดตาม
const getFollowers = (user_id, count = 50, next_max_id = "") => {
    return concatFriendshipsApiResponse("followers", user_id, count, next_max_id);
};

// ฟังก์ชันดึงบัญชีที่ติดตาม
const getFollowing = (user_id, count = 50, next_max_id = "") => {
    return concatFriendshipsApiResponse("following", user_id, count, next_max_id);
};

// ฟังก์ชันดึง ID ของผู้ใช้จากชื่อผู้ใช้
const getUserId = async (username) => {
    let user = username;
    const lower = user.toLowerCase();
    const url = `https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${lower}&include_reel=false`;
    const data = await fetch(url, fetchOptions).then((r) => r.json());

    const result = data.users?.find(
      (result) => result.user.username.toLowerCase() === lower,
    );

    return result?.user?.pk || null;
};

// ฟังก์ชันดึงข้อมูลสถิติการเป็นเพื่อนของผู้ใช้
const getUserFriendshipStats = async (username) => {
    const user_id = await getUserId(username);

    if (!user_id) {
      throw new Error(`ไม่สามารถหาผู้ใช้ที่มีชื่อผู้ใช้ ${username} ได้`);
    }

    // ดึงข้อมูลผู้ติดตามและบัญชีที่ติดตาม
    const followers = await getFollowers(user_id);
    const following = await getFollowing(user_id);

    // แปลงข้อมูลเป็นชื่อผู้ใช้แบบตัวพิมพ์เล็ก
    const followersUsernames = followers.map((follower) =>
      follower.username.toLowerCase(),
    );
    const followingUsernames = following.map((followed) =>
      followed.username.toLowerCase(),
    );

    const followerSet = new Set(followersUsernames);
    const followingSet = new Set(followingUsernames);

    console.log(Array(28).fill("-").join(""));
    console.log(
      `ดึงข้อมูล`,
      followerSet.size,
      "ผู้ติดตามและ",
      followingSet.size,
      "การติดตาม.",
    );

    console.log(
      `หากสิ่งนี้ดูไม่ถูกต้อง ข้อมูลบางส่วนที่แสดงผลอาจไม่แม่นยำ`,
    );

    // หาผู้ติดตามที่คุณไม่ติดตามกลับ
    const PeopleIDontFollowBack = Array.from(followerSet).filter(
      (follower) => !followingSet.has(follower),
    );

    // หาบัญชีที่ติดตามคุณแต่คุณไม่ติดตามกลับ
    const PeopleNotFollowingMeBack = Array.from(followingSet).filter(
      (following) => !followerSet.has(following),
    );

    return {
      PeopleIDontFollowBack,
      PeopleNotFollowingMeBack,
    };
  };

// ตรวจสอบให้แน่ใจว่าคุณไม่ลบเครื่องหมายคำพูดออก
// แทนที่ "example_username" ด้านล่างด้วยชื่อผู้ใช้ Instagram ของคุณ
//
username = "example_username"; // 👈👈👈
//
getUserFriendshipStats(username).then(console.log);
