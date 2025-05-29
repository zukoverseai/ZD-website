import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// SEO metadata for Next.js
export const metadata: Metadata = {
  title: "Zoftware Development - Anything is possible with Zoftware",
  description: "Zoftware Development is a software development company that provides software development services to businesses.",
  keywords: "software development, software development services, software development company, software development agency, software development firm, software development services company, software development services agency, software development services firm",
  generator: "v0.dev",
  // Icons for browser and iOS (apple touch)
  icons: {
    icon: '/images/just-logo.png',       // standard favicon
    shortcut: '/images/just-logo.png',  // shortcut icon
    apple: '/images/just-logo.png',     // apple touch icon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className}`}>

        {children}

        {/* Place the Toaster at the root so any page or component can toast */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />

      </body>
    </html>
  );
}
