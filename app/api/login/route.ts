// File: app/api/login/route.ts
// Mục đích: Proxy đăng nhập đến backend, nhận email/password, lưu token vào cookie.

import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { login } from "@/app/service/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  console.log("Nhận request đăng nhập với:", { email, password });
  try {
    const response = await login(email, password);
    console.log("Response từ backend:", response.status, response.data);

    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    const data = response.data;
    console.log("Full response từ backend:", data);

    const { token } = data.result;
    if (!token) {
      console.log("Không tìm thấy token trong data.result:", data.result);
      return NextResponse.json({ error: "No token returned" }, { status: 500 });
    }

    const serializedCookie = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
    });

    const res = NextResponse.json({
      message: "Login successful",
      user: data.user || {},
    });
    res.headers.set("Set-Cookie", serializedCookie);
    return res;
  } catch (error: any) {
    console.error("Lỗi đăng nhập:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
