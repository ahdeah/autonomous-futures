// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { inter } from "./fonts"; // Import the new font object

export const metadata: Metadata = {
  title: "Autonomous Futures - Centering Marginalized Voices in Technology",
  description: "Exploring technology futures through Afrofuturist, Indigenous, and diverse speculative fiction traditions.",
  keywords: "Afrofuturism, Indigenous futures, speculative fiction, technology design, decolonial computing",
  authors: [{ name: "Autonomous Futures Team" }],
  openGraph: {
    title: "Autonomous Futures",
    description: "Centering marginalized voices in technology futures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // --- Start of Correction ---
    // Apply the font's class name and CSS variable to the <html> tag
    <html lang="en" className={inter.variable}>
    {/* --- End of Correction --- */}
      <body className="antialiased bg-af-background text-af-charcoal flex flex-col min-h-screen">
        <QueryProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}