import "./globals.css";

import ContactCta from "@components/ContactCta";
import Nav from "@components/Nav";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marie-Eve Musy",
  description:
    "Profil de Marie-Eve Musy, journaliste et comédienne à Genève. Présentatrice TV en Suisse: démos, parcours, prestations et prise de contact",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="bg-brand-gray-50 text-brand-gray-900 relative flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="bg-brand-gray-50 text-brand-gray-900 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:rounded focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <ContactCta />
      </body>
    </html>
  );
}
