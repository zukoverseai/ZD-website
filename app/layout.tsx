import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// SEO metadata for Next.js
export const metadata: Metadata = {
  title: "HOB Studio - Haus of Banstead Interior Design",
  description: "Where architectural precision meets artistic vision. Crafting spaces that transcend the ordinary.",
  keywords: "interior design, luxury interiors, home design, commercial design, Banstead, HOB Studio",
  generator: "v0.dev",
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
