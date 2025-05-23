import type { ReactNode } from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import { inter } from "@/app/fonts";

// SEO metadata for Next.js
export const metadata: Metadata = {
  title: "Zoftware Development - Anything is possible with Zoftware",
  description: "If you can imagine it, we can build it.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Apply only the clear font (Inter) globally */}
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
