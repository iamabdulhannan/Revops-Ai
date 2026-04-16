"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ChevronDown, BarChart3, Shield, Zap } from "lucide-react";

const roles = [
  "CEO / Founder",
  "VP of Sales",
  "VP of Revenue Operations",
  "RevOps Manager",
  "Sales Manager",
  "Customer Success Manager",
  "Marketing Manager",
  "Other",
];

const teamSizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen">
      {/* Left panel — product value props (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12">
        <div>
          <Link
            href={ROUTES.HOME}
            className="text-xl font-bold tracking-tight text-white"
          >
            RevOps AI
          </Link>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Unify your revenue operations
          </h2>
          <p className="text-lg text-grey-400 leading-relaxed">
            Connect Marketing, Sales &amp; Customer Success in one intelligent
            platform.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="font-semibold">AI-Powered Pipeline Intelligence</p>
                <p className="text-sm text-grey-400 mt-1">
                  Predict deal outcomes and optimize your pipeline with machine
                  learning.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div>
                <p className="font-semibold">Churn Prediction &amp; Prevention</p>
                <p className="text-sm text-grey-400 mt-1">
                  Identify at-risk accounts before it&apos;s too late with
                  predictive analytics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Zap size={20} />
              </div>
              <div>
                <p className="font-semibold">Automated Playbooks</p>
                <p className="text-sm text-grey-400 mt-1">
                  Trigger the right actions at the right time, automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-grey-500">
          Trusted by 500+ revenue teams worldwide
        </p>
      </div>

      {/* Right panel — registration form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link
              href={ROUTES.HOME}
              className="text-xl font-bold text-black tracking-tight"
            >
              RevOps AI
            </Link>
          </div>

          <h1 className="text-xl font-bold text-black tracking-tight">
            Create your workspace
          </h1>
          <p className="mt-2 text-sm text-grey-500">
            Start your 14-day free trial. No credit card required.
          </p>

          <form className="mt-6 space-y-4">
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="workspace"
                className="text-xs font-medium text-grey-700 uppercase tracking-wider"
              >
                Company Name
              </label>
              <input
                id="workspace"
                name="workspace"
                type="text"
                placeholder="Acme Inc"
                className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-grey-700 uppercase tracking-wider"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Work Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-grey-700 uppercase tracking-wider"
              >
                Work Email
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

            {/* Two-column row: Role + Team Size */}
            <div className="grid grid-cols-2 gap-3">
              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="role"
                  className="text-xs font-medium text-grey-700 uppercase tracking-wider"
                >
                  Your Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-10 w-full px-3 pr-8 border border-grey-300 rounded-sm bg-white text-base appearance-none transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Team Size */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="teamSize"
                  className="text-xs font-medium text-grey-700 uppercase tracking-wider"
                >
                  Team Size
                </label>
                <div className="relative">
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="h-10 w-full px-3 pr-8 border border-grey-300 rounded-sm bg-white text-base appearance-none transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    {teamSizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-grey-700 uppercase tracking-wider"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded-sm border-grey-300 text-black focus:ring-black"
              />
              <label
                htmlFor="terms"
                className="text-xs text-grey-500 leading-relaxed"
              >
                I agree to the{" "}
                <a href="#" className="text-black hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-black hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-10 px-5 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
            >
              Create Workspace
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-grey-500">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="font-medium text-black hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
