// File: app/api/logout/route.ts
// Mục đích: Xóa cookie khi đăng xuất.

import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  const serializedCookie = serialize("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Xóa ngay
    sameSite: "strict",
  });

  const res = NextResponse.json({ message: "Logout successful" });
  res.headers.set("Set-Cookie", serializedCookie);
  return res;
}
