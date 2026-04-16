import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-grey-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <Link
        href={ROUTES.HOME}
        className="mb-8 text-xl font-bold text-black tracking-tight"
      >
        RevOps AI
      </Link>

      {/* Auth card */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-card">
        {children}
      </div>
    </div>
  );
}
