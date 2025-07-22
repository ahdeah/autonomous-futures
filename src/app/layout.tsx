// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer"; // Import the new Footer

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
    <html lang="en">
      <body className="antialiased bg-af-background text-af-charcoal flex flex-col min-h-screen">
        <QueryProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> {/* Add the Footer here */}
        </QueryProvider>
      </body>
    </html>
  );
}