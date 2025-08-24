// app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  // Tạo cookie với maxAge = 0 để xóa
  const serializedCookie = serialize("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  });

  const serializedRefreshToken = serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  });

  const res = NextResponse.redirect(new URL("/authenticate/loggin", req.url));

  // Đặt nhiều cookie bằng cách append từng cookie
  res.headers.append("Set-Cookie", serializedCookie);
  res.headers.append("Set-Cookie", serializedRefreshToken);

  return res;
}
