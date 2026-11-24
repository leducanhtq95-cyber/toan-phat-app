# Toàn Phát — Bộ đóng gói Android (.apk), Windows (.exe) & iOS

Bộ mã nguồn đóng gói trang web **https://toanphat.ap.vn** kèm biểu tượng logo riêng thành ứng dụng cài đặt trên:
1. **Android (`mobile-apk/` → `app-debug.apk`)**
2. **Windows PC (`desktop-exe/` → `ToanPhat-Portable.exe` & `ToanPhat-Setup.exe`)**
3. **iOS / iPhone (`mobile-apk/` → `ToanPhat-unsigned.ipa`)**

## Cách xuất file tự động trên GitHub Actions (không cần cài Android Studio / Xcode)

1. Tạo một repository mới trên GitHub và đẩy toàn bộ thư mục này lên (gồm `mobile-apk/`, `desktop-exe/` và `.github/workflows/`).
2. Vào tab **Actions** trên GitHub:
   - Workflow **Build Android APK** sẽ tự chạy và xuất ra **`app-debug.apk`** trong mục **Artifacts**.
   - Workflow **Build Windows EXE** sẽ tự chạy và xuất ra **`ToanPhat-Portable.exe`** (chạy ngay) và **`ToanPhat-Setup.exe`** (bộ cài có shortcut Desktop).
   - Workflow **Build iOS IPA (Unsigned)** có thể bấm **Run workflow** khi cần xuất file `.ipa` chưa ký (cần chứng chỉ Apple Developer $99/năm hoặc công cụ ký AltStore/Sideloadly để cài lên iPhone; nếu không dùng chứng chỉ, người dùng iPhone nên mở Safari vào `https://toanphat.ap.vn` → **Chia sẻ** → **Thêm vào Màn hình chính**).
