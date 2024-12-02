#include <BlynkGOv3.h>

GWiFiManager wifi_manager;

void setup() {
    Serial.begin(115200);
    Serial.println();

    BlynkGO.begin();
    
    wifi_manager.align(ALIGN_TOP_RIGHT, -10); // ตั้งค่าให้ WiFi manager อยู่ที่มุมขวาบน
    
    MQTT.setServer("broker.hivemq.com");
    MQTT.subscribe("/BlynkGO/topic");
    MQTT.onMessage([](String topic, String message) {
        Serial.printf("[MQTT] Message: %s ---> %s\n", topic.c_str(), message.c_str());
    });
}

void loop() {
    BlynkGO.update();
    // MQTT.loop();
}
