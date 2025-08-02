// File: app/api/user/profile/route.ts
// Mục đích: Proxy lấy profile từ backend, sử dụng token từ cookie, lưu roles vào cookie HttpOnly.

import { NextRequest, NextResponse } from "next/server";
import { GetProfileUser } from "@/app/service/User";
import { serialize } from "cookie"; // Sử dụng cookie để serialize

export async function GET(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Lấy token từ cookie
  console.log("Token nhận được:", token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Trả lỗi nếu không có token
  }

  try {
    const response = await GetProfileUser(token); // Gọi service để lấy profile từ backend
    console.log("Response from backend:", response.status, response.data); // Log toàn bộ response

    if (response.status !== 200) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 }); // Trả lỗi nếu backend từ chối
    }

    const data = response.data; // Lấy dữ liệu từ response
    console.log("Data từ backend:", data); // Log để kiểm tra cấu trúc

    const profile = data.result.profile; // Lấy profile từ result
    const rawRoles = data.result.roles; // Lấy raw roles từ result
    console.log("Profile from backend:", profile);
    console.log("Raw roles từ backend:", rawRoles);

    // Xử lý roles (giả định roles là mảng object [{ name: "ROLE_ADMIN" }])
    let rolesToStore: string[] = [];
    if (Array.isArray(rawRoles)) {
      rolesToStore = rawRoles.map((role) =>
        typeof role === "object" ? role.name || role.value || "UNKNOWN" : role
      );
      console.log("Roles đã xử lý:", rolesToStore);
    }

    // Lưu roles vào cookie nếu có
    let serializedCookie = null;
    if (rolesToStore.length > 0) {
      serializedCookie = serialize("roles", JSON.stringify(rolesToStore), {
        httpOnly: true, // Ngăn JavaScript client-side truy cập
        secure: process.env.NODE_ENV === "production", // Chỉ secure ở production
        path: "/", // Áp dụng cho toàn site
        maxAge: 7 * 24 * 60 * 60, // 7 ngày hết hạn
        sameSite: "strict", // Ngăn CSRF
      });
      console.log("Cookie roles được set:", serializedCookie); // Log để debug
    } else {
      console.log("Không có roles hợp lệ để lưu vào cookie."); // Log nếu không có roles
    }

    const res = NextResponse.json(profile); // Tạo response với profile
    if (serializedCookie) {
      res.headers.set("Set-Cookie", serializedCookie); // Set cookie vào response
    }

    return res; // Trả response về client
  } catch (error: any) {
    console.error("Lỗi lấy profile:", error.response?.data || error.message); // Log lỗi
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
