"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Efek untuk mengganti tema (Dark Mode)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        // Menangani error termasuk rate limit (429)
        setError(data.message || "Terjadi kesalahan saat login");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
      
      {/* Tombol Toggle Dark Mode (Bonus) */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-5 right-5 p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:scale-110"
      >
        {darkMode ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-slate-600 w-5 h-5" />}
      </button>

      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-all">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">Login Javis Tech</h2>
        
        {/* Alert Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email / Username</label>
            <input 
              type="email" 
              required
              value={email}
              className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg mt-1 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="admin@javis.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <input 
              type={show ? "text" : "password"} 
              required
              value={password}
              className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg mt-1 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Tombol Show/Hide Password */}
            <button 
              type="button" 
              onClick={() => setShow(!show)} 
              className="absolute right-3 top-10 text-slate-400 hover:text-blue-500 transition-colors"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none ${loading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Memproses...
              </>
            ) : "Masuk ke Akun"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          © 2026 PT. Javis Teknologi Albarokah - Challenge by Ragil
        </p>
      </div>
    </div>
  );
}