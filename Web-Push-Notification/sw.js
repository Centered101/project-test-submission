self.addEventListener("push", function(event) {
    const data = event.data ? event.data.json() : { title: "🔔 แจ้งเตือนใหม่!", body: "ไม่มีข้อความ" };
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
    });
});
