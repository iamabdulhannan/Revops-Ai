"use client";

import { cn } from "@/lib/cn";

const metrics = [
  {
    value: "$2.4B+",
    label: "Revenue Tracked",
    description: "Across all customer accounts",
  },
  {
    value: "340+",
    label: "Revenue Teams",
    description: "Trust RevOps AI daily",
  },
  {
    value: "47",
    label: "Countries",
    description: "Multi-currency intelligence",
  },
  {
    value: "4.9/5",
    label: "Customer Rating",
    description: "On G2 and Capterra",
  },
];

const testimonials = [
  {
    quote:
      "We were spending 3 days a month building board reports. Now it takes 30 seconds. The AI copilot understands our revenue better than most of our team.",
    author: "VP Revenue Operations",
    company: "Series B SaaS Company",
    metric: "90% time saved on reporting",
  },
  {
    quote:
      "The Revenue Health Score changed how our CEO thinks about the business. One number, updated in real time, that tells us exactly where we stand.",
    author: "Head of Sales",
    company: "Mid-Market IT Services",
    metric: "23% improvement in forecast accuracy",
  },
  {
    quote:
      "We finally see how marketing spend connects to closed revenue. The attribution model paid for the platform in the first month.",
    author: "Marketing Director",
    company: "B2B Platform Company",
    metric: "3.2x ROI in first quarter",
  },
];

export function SocialProof() {
  return (
    <section className="w-full py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Metrics bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-black">
                {m.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-black">
                {m.label}
              </div>
              <div className="text-xs text-grey-400">{m.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={cn(
                "bg-white border border-border rounded-lg p-8",
                "hover:shadow-card-hover transition-shadow duration-200"
              )}
            >
              <p className="text-sm text-grey-700 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-border-light">
                <p className="text-sm font-semibold text-black">{t.author}</p>
                <p className="text-xs text-grey-500">{t.company}</p>
              </div>
              <div className="mt-3">
                <span className="inline-block bg-success-light text-success text-2xs font-semibold px-3 py-1 rounded-pill">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
