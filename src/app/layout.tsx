import type { Metadata } from "next";
import { montserrat, inter } from "@/styles/fonts";
import { cn } from "@/lib/cn";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevOps AI - Revenue Operations Platform",
  description:
    "One platform that connects your Marketing, Sales & Customer Success tools — so every dollar is tracked, predicted, and optimized.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(montserrat.variable, inter.variable)}>
      <body className="font-sans bg-white text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
