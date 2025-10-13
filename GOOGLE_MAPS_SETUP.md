# Hướng dẫn cài đặt Google Maps API

## Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Google
3. Tạo project mới hoặc chọn project hiện có

## Bước 2: Bật Google Maps JavaScript API

1. Trong Google Cloud Console, chọn project của bạn
2. Đi đến **APIs & Services** > **Library**
3. Tìm kiếm "Maps JavaScript API"
4. Click **Enable**

## Bước 3: Tạo API Key

1. Đi đến **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy API key được tạo

## Bước 4: Cấu hình API Key

1. Mở file `src/config/maps.js`
2. Thay thế `"YOUR_GOOGLE_MAPS_API_KEY"` bằng API key thật của bạn:

```javascript
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // API key thật của bạn
  // ... các cấu hình khác
};
```

## Bước 5: (Tùy chọn) Giới hạn API Key

Để bảo mật, bạn nên giới hạn API key:

1. Trong Google Cloud Console, click vào API key vừa tạo
2. Trong **Application restrictions**:
   - Chọn **HTTP referrers (web sites)**
   - Thêm domain của bạn (ví dụ: `localhost:3000/*`, `yourdomain.com/*`)
3. Trong **API restrictions**:
   - Chọn **Restrict key**
   - Chọn **Maps JavaScript API**

## Bước 6: Kiểm tra

1. Chạy ứng dụng: `npm run dev`
2. Truy cập trang bản đồ
3. Bản đồ Google Maps sẽ hiển thị với các trạm sạc

## Lưu ý quan trọng

- **Không commit API key vào Git**: Thêm `src/config/maps.js` vào `.gitignore`
- **Sử dụng biến môi trường**: Tạo file `.env` để lưu API key
- **Giới hạn API key**: Luôn giới hạn API key để tránh lạm dụng
- **Theo dõi usage**: Kiểm tra usage trong Google Cloud Console

## Cấu trúc file

```
src/
├── config/
│   └── maps.js          # Cấu hình Google Maps
├── components/
│   └── Map/
│       └── ChargingStationMap.jsx  # Component bản đồ
└── .env                 # Biến môi trường (không commit)
```

## Troubleshooting

### Lỗi "This page can't load Google Maps correctly"

- Kiểm tra API key có đúng không
- Kiểm tra API key có được enable Maps JavaScript API không
- Kiểm tra domain có được thêm vào restrictions không

### Bản đồ không hiển thị

- Kiểm tra console browser có lỗi gì không
- Kiểm tra network tab xem API call có thành công không
- Kiểm tra API key có đủ quyền không

### Markers không hiển thị

- Kiểm tra coordinates có đúng format không
- Kiểm tra icon URL có hợp lệ không
- Kiểm tra console có lỗi JavaScript không
