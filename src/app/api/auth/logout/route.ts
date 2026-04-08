import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout Berhasil" });

    // Menghapus cookie 'token' dengan mengatur masa berlaku ke masa lalu (expired)
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Langsung kadaluarsa
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Gagal logout" }, { status: 500 });
  }
}