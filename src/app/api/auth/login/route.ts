import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validasi Form: Field wajib diisi [cite: 11]
    if (!email || !password) {
      return NextResponse.json({ message: "Email dan Password wajib diisi" }, { status: 400 });
    }

    // Simulasi User (Gunakan Email: admin@javis.com | Password: password123)
    const userEmail = "admin@javis.com";
    const hashedPassword = await bcrypt.hash("password123", 10); // Hash password [cite: 21]

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (email === userEmail && isMatch) {
      // Buat JWT Token [cite: 22]
      const token = jwt.sign({ email }, 'RAHASIA_JAVIS_2026', { expiresIn: '1h' });

      const response = NextResponse.json({ message: "Login Berhasil" });

      // Gunakan JWT + HttpOnly Cookie untuk sesi login [cite: 22]
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 3600, // Sesi berlaku 1 jam
      });

      return response;
    }

    // Jika login gagal, kirim pesan error [cite: 12]
    return NextResponse.json({ message: "Email atau Password salah" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}