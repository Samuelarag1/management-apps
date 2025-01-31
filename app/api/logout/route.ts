import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successfully" });

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Error al hacer logout:", error);
    return NextResponse.json(
      { message: "Error al hacer logout" },
      { status: 500 }
    );
  }
}
