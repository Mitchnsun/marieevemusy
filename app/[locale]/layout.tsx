import "../globals.css";

import Footer from "@components/Footer";
import Nav from "@components/Nav";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("Layout");

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="bg-brand-gray-50 text-brand-gray-900 relative flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="bg-brand-gray-50 text-brand-gray-900 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:rounded focus:px-4 focus:py-2"
          >
            {t("skipToContent")}
          </a>
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
