import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/#apps" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Help Center", href: "/help" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Top section: Logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold tracking-wide uppercase mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-grey-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-grey-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-grey-500">
            &copy; {currentYear} RevOps AI. All rights reserved.
          </p>
          <p className="text-sm text-grey-500">
            Built by{" "}
            <Link
              href="https://orbiqon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-400 hover:text-white transition-colors duration-150"
            >
              Orbiqon
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
