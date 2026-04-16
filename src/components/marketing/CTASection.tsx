import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 bg-grey-800 rounded-pill px-4 py-1.5 text-xs font-semibold text-grey-300 border border-grey-700">
            <Sparkles className="h-3.5 w-3.5" />
            Free 14-Day Trial · No Credit Card Required
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Stop Guessing. Start Knowing.
        </h2>
        <p className="mt-4 text-md text-grey-400 max-w-xl mx-auto">
          Your competitors are already using AI to predict revenue.
          Join the teams that replaced spreadsheets with intelligence
          and never looked back.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href={ROUTES.REGISTER}
            className="inline-flex items-center gap-2 justify-center px-7 py-3 text-sm font-medium rounded-sm bg-white text-black hover:bg-grey-100 transition-colors duration-150"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={ROUTES.USE_CASES}
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium rounded-sm text-grey-300 border border-grey-600 hover:bg-grey-800 hover:text-white transition-colors duration-150"
          >
            See Use Cases
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-xs text-grey-500">
          <span>✓ 10-minute setup</span>
          <span>✓ 50+ integrations</span>
          <span>✓ SOC 2 compliant</span>
          <span className="hidden sm:inline">✓ Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
