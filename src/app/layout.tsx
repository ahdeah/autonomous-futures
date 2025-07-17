import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";

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
      <body className="antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}