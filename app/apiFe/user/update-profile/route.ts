import { UpdateProfileUser } from "@/app/service/User";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  console.log("Cookies trong request:", req.cookies.getAll());
  try {
    console.log("Token trong route", (await cookies()).get("authToken")?.value);
    console.log("Request headers:", req.headers.get("cookie"));
    const token = await req.cookies.get("authToken")?.value;
    if (!token) {
      console.log("Token ko có trong route", token);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const response = await UpdateProfileUser(formData, token);
    console.log(
      "Response từ UpdateProfileUser.route:",
      JSON.stringify(response)
    );

    // profileCache.delete(token); // Xóa cache
    // console.log("Đã xóa profileCache cho token:", token);

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Lỗi update:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
