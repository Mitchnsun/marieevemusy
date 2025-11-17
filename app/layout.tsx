import "./globals.css";

import type { Metadata, Viewport } from "next";

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
    <html lang="fr">
      <body className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased">
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
