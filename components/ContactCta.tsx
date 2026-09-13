import { getTranslations } from "next-intl/server";

type ContactCtaProps = {
  text: string;
};

const CONTACT_EMAIL = "contact@marieevemusy.com";

export default async function ContactCta({ text }: ContactCtaProps) {
  const t = await getTranslations("Footer");

  return (
    <section data-component="ContactCta" className="bg-brand-blue-muted">
      <div className="container mx-auto flex flex-col items-center gap-4 p-8 text-center lg:flex-row">
        <p className="text-brand-teal text-xl font-semibold">{text}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="bg-brand-blue-light hover:bg-brand-blue-light/80 text-brand-teal rounded-full px-6 py-3 font-semibold"
        >
          {t("contactButton")}
        </a>
      </div>
    </section>
  );
}
