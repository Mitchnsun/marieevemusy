import ButtonLink from "@components/ButtonLink";
import ContactCta from "@components/ContactCta";
import Hero from "@components/Hero";
import IntroBand from "@components/IntroBand";
import MediaGallery from "@components/MediaGallery";
import ShowSection from "@components/ShowSection";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import galerie1 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-1.jpg";
import galerie2 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-2.jpg";
import galerie3 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-3.jpg";
import galerie4 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-4.jpg";
import galerie5 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-5.jpg";
import galerie6 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-6.jpg";
import galerie7 from "@/public/images/ecriture/marie-eve-musy-degenre-galerie-7.jpg";
import coverImage from "@/public/images/ecriture/marie-eve-musy-degenre-livre-couverture.jpg";
import heroImage from "@/public/images/ecriture/marie-eve-musy-degenre-spectacle-scene.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EcriturePage" });

  return {
    title: `${t("title")} — Marie-Eve Musy`,
    description: t("lead"),
  };
}

export default async function EcriturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("EcriturePage");
  const tFooter = await getTranslations("Footer");
  const distribution = t.raw("degenre.distribution") as { role: string; name: string }[];
  const quotes = t.raw("degenre.quotes") as { text: string; author: string }[];

  return (
    <>
      <Hero image={heroImage} imageAlt={t("heroAlt")} title={t("title")} />

      <IntroBand text={t("lead")} />

      <section className="max-w-page mx-auto px-8">
        <p className="text-brand-gray-900 nav:max-w-208.75 text-lg leading-6">{t("intro")}</p>
      </section>

      {/*
       * TODO(#4): scroll-in animation on the titles and quotes, not implemented here.
       * Also check whether the "Article du Courrier" PDF should be moved into public/
       * instead of staying linked to the old site.
       */}
      <ShowSection
        title={t("degenre.title")}
        lead={t("degenre.lead")}
        paragraphs={[t("degenre.paragraph")]}
        image={coverImage}
        imageAlt={t("degenre.coverAlt")}
        imageClassName="h-auto w-53.25 object-cover"
        imageSizes="213px"
      >
        <h4 className="text-brand-teal mt-9 text-lg font-bold">{t("degenre.distributionTitle")}</h4>
        <dl className="mt-4.5">
          {distribution.map((entry) => (
            <div key={entry.role} className="text-brand-gray-900 flex flex-wrap gap-2 text-lg leading-6">
              <dt className="font-semibold">{entry.role}:</dt>
              <dd>{entry.name}</dd>
            </div>
          ))}
        </dl>

        {quotes.map((quote) => (
          <blockquote key={quote.author} className="text-brand-gray-900 mt-9 text-lg leading-6 italic">
            «{quote.text}»<cite className="mt-1 block text-base not-italic">— {quote.author}</cite>
          </blockquote>
        ))}

        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href={t("degenre.links.book.href")} external>
            {t("degenre.links.book.label")}
          </ButtonLink>
          <ButtonLink href={t("degenre.links.backstage.href")} external>
            {t("degenre.links.backstage.label")}
          </ButtonLink>
          <ButtonLink href={t("degenre.links.radioShow.href")} external>
            {t("degenre.links.radioShow.label")}
          </ButtonLink>
          <ButtonLink href={t("degenre.links.article.href")} external>
            {t("degenre.links.article.label")}
          </ButtonLink>
        </div>
      </ShowSection>

      <ShowSection
        title={t("chroniques.title")}
        lead={t("chroniques.lead")}
        paragraphs={t.raw("chroniques.paragraphs") as string[]}
      >
        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href={t("chroniques.links.anxiety.href")} external>
            {t("chroniques.links.anxiety.label")}
          </ButtonLink>
          <ButtonLink href={t("chroniques.links.euphoricJoy.href")} external>
            {t("chroniques.links.euphoricJoy.label")}
          </ButtonLink>
        </div>
      </ShowSection>

      <MediaGallery
        images={[
          { src: galerie1, alt: t("gallery.alt1") },
          { src: galerie2, alt: t("gallery.alt2") },
          { src: galerie3, alt: t("gallery.alt3") },
          { src: galerie4, alt: t("gallery.alt4") },
          { src: galerie5, alt: t("gallery.alt5") },
          { src: galerie6, alt: t("gallery.alt6") },
          { src: galerie7, alt: t("gallery.alt7") },
        ]}
      />

      <ContactCta text={tFooter("contactCtaEcriture")} />
    </>
  );
}
