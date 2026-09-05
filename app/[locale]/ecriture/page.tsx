import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function EcriturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("EcriturePage");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
    </div>
  );
}
