"use client";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard"; // Redirect ke dashboard jika berhasil [cite: 13]
    } else {
      const data = await res.json();
      setError(data.message); // Tampilkan pesan error jika gagal [cite: 12]
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Login Javis Tech</h2>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Email / Username</label>
            <input 
              type="email" required
              className="w-full p-2.5 border border-slate-300 rounded-lg mt-1 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="admin@javis.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <input 
              type={show ? "text" : "password"} required
              className="w-full p-2.5 border border-slate-300 rounded-lg mt-1 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Tombol Show/Hide Password [cite: 14] */}
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-10 text-slate-400 hover:text-slate-600">
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-md shadow-blue-200"
          >
            {/* Animasi loading saat login [cite: 28] */}
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Masuk ke Akun"}
          </button>
        </form>
      </div>
    </div>
  );
}