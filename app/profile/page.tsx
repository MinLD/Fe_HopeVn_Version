// File: app/profile/page.server.tsx
// Mục đích: Server Component lấy dữ liệu profile ban đầu để tránh nhấp nháy.

import ProfileClient from "@/app/components/initialProfile";
import axios from "axios";
async function getInitialProfile() {
  const token = (await (await import("next/headers")).cookies()).get(
    "authToken"
  )?.value;
  // Lấy token từ cookie trên server bằng next/headers.
  //  import("next/headers") là dynamic import
  //  vì next/headers chỉ dùng ở server. ?.value tránh lỗi nếu cookie không tồn tại.
  console.log("Token trong getInitialProfile:", token);

  if (!token) {
    return null; // Trả null nếu không có token, Client sẽ xử lý
  }

  try {
    const response = await axios.get("http://localhost:3000/api/user/profile", {
      headers: {
        Cookie: `authToken=${token}`,
      },
    });

    if (response.status === 200) {
      return response.data as ProfileUser;
    }

    return null;
  } catch (error) {
    console.error("Lỗi lấy profile ban đầu:", error);
    return null;
  }
}
//Vai trò trong luồng: Hàm này chạy async trên server,
// lấy dữ liệu ban đầu từ API. Nó là "cửa ngõ" để tránh
//  gọi API client-side, giảm thời gian tải và nhấp nháy.
// Kết quả initialProfile được truyền cho Client Component.
export default async function ProfilePage() {
  const initialProfile = await getInitialProfile();
  return <ProfileClient initialProfile={initialProfile || null} />;
  // Giải thích: Hàm async để chờ getInitialProfile().
  //  Truyền initialProfile cho <profileclient> qua props.
  //  Vai trò: Render Server Component, tạo HTML ban đầu với dữ liệu từ server,
  //  gửi về browser.</profileclient>
}
