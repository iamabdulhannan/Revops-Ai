import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-black tracking-tight">404</h1>
      <p className="mt-3 text-md text-grey-500">Page Not Found</p>
      <p className="mt-1 text-sm text-grey-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href={ROUTES.HOME}
        className="mt-8 inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150"
      >
        Back to Home
      </Link>
    </div>
  );
}
