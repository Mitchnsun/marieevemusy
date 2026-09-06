import { getTranslations } from "next-intl/server";

type ContactCtaProps = {
  text: string;
};

export default async function ContactCta({ text }: ContactCtaProps) {
  const t = await getTranslations("Footer");

  return (
    <section className="bg-brand-blue-muted">
      <div className="container mx-auto flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-brand-teal text-xl font-semibold">{text}</p>
        <button
          type="button"
          className="bg-brand-blue-light text-brand-teal cursor-default rounded-full px-6 py-3 font-semibold"
        >
          {t("contactButton")}
        </button>
      </div>
    </section>
  );
}
