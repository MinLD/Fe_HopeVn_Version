import { NextRequest, NextResponse } from "next/server";
import { GetProfileUser } from "@/app/service/User";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    console.log("Token nhận được trong api cục bộ profile:", token);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const profile = await GetProfileUser(token || "");
    const { data } = profile;
    console.log("Data profile:", data);
    return NextResponse.json(data.result, { status: 200 });
  } catch (error: any) {
    // Chỉ log thông tin an toàn từ error
    console.error("Lỗi lấy profile - Message:", error.message);
    console.error("Lỗi lấy profile - Stack:", error.stack);

    // Nếu error từ axios, log response nếu có
    if (error.response) {
      console.error(
        "Backend response error:",
        error.response.status,
        error.response.data
      );
    }

    // Trả JSON an toàn, chỉ message
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
