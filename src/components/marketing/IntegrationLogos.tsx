import { cn } from "@/lib/cn";

const integrations = [
  "HubSpot",
  "Salesforce",
  "Stripe",
  "Intercom",
  "Slack",
  "Google Analytics",
];

export function IntegrationLogos() {
  return (
    <section id="integrations" className="w-full py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-black text-center tracking-tight">
          Connects With Your Favorite Tools
        </h2>

        {/* Integration badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {integrations.map((name) => (
            <span
              key={name}
              className={cn(
                "bg-grey-100 rounded-pill px-5 py-2 text-sm font-medium text-black"
              )}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
