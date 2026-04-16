import { MarketingNavbar, MarketingFooter } from "@/components/layout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingNavbar />
      <main className="pt-16">{children}</main>
      <MarketingFooter />
    </>
  );
}
