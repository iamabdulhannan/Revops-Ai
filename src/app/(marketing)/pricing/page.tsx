import { PricingTable } from "@/components/marketing";

export default function PricingPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black text-center tracking-tight">
          Pricing
        </h1>
        <p className="mt-3 text-md text-grey-500 text-center max-w-lg mx-auto">
          Choose the plan that fits your revenue operations needs.
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
