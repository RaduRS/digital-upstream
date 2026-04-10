import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  const adminPassword = process.env.ADMIN_PASSWORD ?? "hello";

  if (password !== adminPassword) {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 86400,
  });

  return response;
}