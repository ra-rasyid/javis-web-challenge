"use client";

import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, User } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    // Memanggil API logout untuk menghapus HttpOnly Cookie
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      // Jika berhasil, arahkan kembali ke halaman login
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar Sederhana */}
      <nav className="bg-white shadow-sm border-b border-slate-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <LayoutDashboard size={24} />
            <span>Javis Panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Selamat Datang, Ragil!
          </h1>
          <p className="text-slate-500 mb-8">
            Kamu berhasil masuk ke halaman dashboard yang diproteksi. Sesi login kamu sekarang aktif menggunakan JWT.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Status Akun
            </h3>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Terautentikasi (JWT Valid)
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-slate-400 text-xs">
        &copy; 2026 PT. Javis Teknologi Albarokah - Web Programmer Challenge
      </footer>
    </div>
  );
}