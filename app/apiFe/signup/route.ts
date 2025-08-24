import { register_Api } from "@/app/service/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const res = await register_Api(email, password, name);
    if (res.status !== 200)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    return NextResponse.json(
      { message: "Register successful" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
