import LanguageSwitcher from "@components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function ContactCta() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-brand-navy">
      <div className="container mx-auto flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-brand-blue-light text-xl font-semibold">{t("contactCta")}</p>
        <button
          type="button"
          className="bg-brand-blue-light text-brand-teal cursor-default rounded-full px-6 py-3 font-semibold"
        >
          {t("contactButton")}
        </button>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
