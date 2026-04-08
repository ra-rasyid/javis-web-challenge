import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LRUCache } from 'lru-cache'; // Import cache untuk simpan data IP

// Setup Cache untuk Rate Limit (Simpan IP selama 1 menit)
const tokenCache = new LRUCache({
  max: 500,
  ttl: 60 * 1000, // 1 Menit
});

export async function POST(request: Request) {
  // Ambil IP (simulasi sederhana)
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const limit = 5; // Batas 5 percobaan
  const currentUsage = (tokenCache.get(ip) as number) || 0;

  // Cek jika sudah melebihi batas 
  if (currentUsage >= limit) {
    return NextResponse.json(
      { message: "Terlalu banyak percobaan login. Tunggu 1 menit lagi." },
      { status: 429 }
    );
  }

  // Update jumlah percobaan
  tokenCache.set(ip, currentUsage + 1);
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