// Cấu hình Google Maps API
export const GOOGLE_MAPS_CONFIG = {
  // Thay thế bằng API key thật của bạn
  // Lấy API key tại: https://console.cloud.google.com/google/maps-apis
  API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",

  // Các thư viện cần thiết
  LIBRARIES: ["places"],

  // Phiên bản API
  VERSION: "weekly",

  // Cấu hình mặc định cho map
  DEFAULT_CENTER: {
    lat: 21.0285, // Hà Nội
    lng: 105.8542,
  },

  DEFAULT_ZOOM: 12,

  // Style cho map
  MAP_STYLES: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

// Hướng dẫn cài đặt API key:
// 1. Truy cập https://console.cloud.google.com/
// 2. Tạo project mới hoặc chọn project hiện có
// 3. Bật Google Maps JavaScript API
// 4. Tạo API key trong phần Credentials
// 5. Thêm domain của bạn vào API key restrictions (optional)
// 6. Thay thế "YOUR_GOOGLE_MAPS_API_KEY" bằng API key thật
