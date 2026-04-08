"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, User, Sun, Moon } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Cek preferensi mode saat pertama kali load
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }
  }, []);

  // Update class dark di HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xl">
            <LayoutDashboard size={24} />
            <span>Javis Panel</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Tombol Ganti Tema */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-yellow-400 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-medium text-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center transition-all">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Selamat Datang, Ragil!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
            Kamu berhasil masuk ke halaman dashboard yang diproteksi. Sesi login kamu sekarang aktif menggunakan JWT.
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-left border border-slate-100 dark:border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Status Akun
            </h3>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Terautentikasi (JWT Valid)
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs">
        &copy; 2026 PT. Javis Teknologi Albarokah - Web Programmer Challenge
      </footer>
    </div>
  );
}