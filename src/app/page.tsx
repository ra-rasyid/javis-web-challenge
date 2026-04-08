import { redirect } from "next/navigation";

export default function RootPage() {
  // Otomatis mengarahkan ke /login saat aplikasi dibuka
  redirect("/login");
}