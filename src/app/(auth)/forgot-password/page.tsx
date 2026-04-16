import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-black text-center tracking-tight">
        Reset Password
      </h1>
      <p className="mt-2 text-sm text-grey-500 text-center">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <form className="mt-6 space-y-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-grey-700 uppercase tracking-wider"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-10 px-5 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back to Sign In */}
      <p className="mt-6 text-center text-sm text-grey-500">
        <Link
          href={ROUTES.LOGIN}
          className="font-medium text-black hover:underline"
        >
          Back to Sign In
        </Link>
      </p>
    </div>
  );
}
