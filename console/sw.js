// ✅ ฟังชั่นดักจับการคลิกแจ้งเตือน
self.addEventListener("notificationclick", event => {
    event.notification.close(); // ปิดการแจ้งเตือน

    let url = event.notification.data ? event.notification.data.url : "https://project-test-submission.netlify.app/";
    
    // ✅ เปิด URL ในแท็บใหม่
    event.waitUntil(
        clients.matchAll({ type: "window" }).then(windowClients => {
            for (let client of windowClients) {
                if (client.url === url && "focus" in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
