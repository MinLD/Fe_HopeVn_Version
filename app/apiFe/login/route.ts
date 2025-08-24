import { login_Api } from "@/app/service/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const res = await login_Api(email, password);
    const { token, refreshToken } = res.data.result;
    (await cookies()).set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
      path: "/",
    });
    // Lưu refreshToken vào HttpOnly cookie
    if (refreshToken) {
      (await cookies()).set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2592000, // 30 ngày
        path: "/",
      });
    }
    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
