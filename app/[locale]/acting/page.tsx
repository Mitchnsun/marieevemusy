import CalloutBand from "@components/CalloutBand";
import ContactCta from "@components/ContactCta";
import Hero from "@components/Hero";
import IntroBand from "@components/IntroBand";
import PhotoGrid from "@components/PhotoGrid";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import bobEtLesSexPistaches1 from "@/public/images/acting/marie-eve-musy-bob-et-les-sex-pistaches-1.jpg";
import bobEtLesSexPistaches2 from "@/public/images/acting/marie-eve-musy-bob-et-les-sex-pistaches-2.jpg";
import breakUps from "@/public/images/acting/marie-eve-musy-break-ups.jpg";
import heroImage from "@/public/images/acting/marie-eve-musy-comedienne-portrait-nature.jpg";
import degenre from "@/public/images/acting/marie-eve-musy-degenre.jpg";
import iSwear1 from "@/public/images/acting/marie-eve-musy-i-swear-1.jpg";
import iSwear2 from "@/public/images/acting/marie-eve-musy-i-swear-2.jpg";
import laMere1 from "@/public/images/acting/marie-eve-musy-la-mere-1.jpg";
import laMere2 from "@/public/images/acting/marie-eve-musy-la-mere-2.jpg";
import lesTroisSoeurs from "@/public/images/acting/marie-eve-musy-les-trois-soeurs.jpg";
import miTemps1 from "@/public/images/acting/marie-eve-musy-mi-temps-1.jpg";
import miTemps2 from "@/public/images/acting/marie-eve-musy-mi-temps-2.jpg";
import miTemps3 from "@/public/images/acting/marie-eve-musy-mi-temps-3.jpg";
import myrtille1 from "@/public/images/acting/marie-eve-musy-myrtille-1.jpg";
import myrtille2 from "@/public/images/acting/marie-eve-musy-myrtille-2.jpg";
import myrtille3 from "@/public/images/acting/marie-eve-musy-myrtille-3.jpg";
import myrtille4 from "@/public/images/acting/marie-eve-musy-myrtille-4.jpg";

const GALLERY_IMAGES = [
  { key: "degenre", src: degenre },
  { key: "myrtille1", src: myrtille1 },
  { key: "miTemps1", src: miTemps1 },
  { key: "laMere1", src: laMere1 },
  { key: "bobEtLesSexPistaches1", src: bobEtLesSexPistaches1 },
  { key: "myrtille2", src: myrtille2 },
  { key: "miTemps2", src: miTemps2 },
  { key: "lesTroisSoeurs", src: lesTroisSoeurs },
  { key: "bobEtLesSexPistaches2", src: bobEtLesSexPistaches2 },
  { key: "laMere2", src: laMere2 },
  { key: "breakUps", src: breakUps },
  { key: "miTemps3", src: miTemps3 },
  { key: "myrtille3", src: myrtille3 },
  { key: "iSwear1", src: iSwear1 },
  { key: "iSwear2", src: iSwear2 },
  { key: "myrtille4", src: myrtille4 },
] as const;

type GalleryCaption = { alt: string; title: string; credit: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ActingPage" });

  return {
    title: `${t("title")} — Marie-Eve Musy`,
    description: t("lead"),
  };
}

export default async function ActingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ActingPage");
  const tFooter = await getTranslations("Footer");
  const gallery = t.raw("gallery") as Partial<Record<string, GalleryCaption>>;
  const items = GALLERY_IMAGES.map(({ key, src }) => {
    const caption = gallery[key];
    if (!caption) {
      throw new Error(`ActingPage: missing "gallery.${key}" translation entry`);
    }
    return { src, ...caption };
  });

  return (
    <>
      <Hero image={heroImage} imageAlt={t("heroAlt")} title={t("title")} />

      {/*
       * TODO(#5): the live site opens each gallery photo in a lightbox on click —
       * deliberately not implemented here, along with the scroll-in animations.
       */}
      <div className="bg-brand-navy">
        <IntroBand text={t("lead")} titleClassName="text-brand-blue-muted" />

        <section className="max-w-page mx-auto px-8 pb-12">
          <p className="nav:max-w-208.75 text-lg leading-6 text-white">{t("intro")}</p>
        </section>

        <section className="max-w-page mx-auto px-8 pb-12">
          <PhotoGrid items={items} />
        </section>
      </div>

      <CalloutBand
        text={t("callout.text")}
        ctaLabel={t("callout.ctaLabel")}
        ctaHref={t("callout.ctaHref")}
        external
        variant="teal"
      />

      <ContactCta text={tFooter("contactCta")} />
    </>
  );
}
