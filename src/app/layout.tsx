import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import { Navbar } from "@/components/Navbar";

const InterFont = Inter({
  subsets: ["latin"],
  style: "normal",
});

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased light", InterFont.className)}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        {/* @ts-expect-error Server Async Component */}
        <Navbar />
        <div className="container">{children}</div>

        <Toaster />
      </body>
    </html>
  );
}
