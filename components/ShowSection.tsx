import Image, { type StaticImageData } from "next/image";

type ShowSectionProps = {
  title: string;
  lead: string;
  paragraphs: string[];
  note?: string;
  ctaLabel: string;
  ctaHref: string;
  image: StaticImageData;
  imageAlt: string;
};

export default function ShowSection({
  title,
  lead,
  paragraphs,
  note,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
}: ShowSectionProps) {
  return (
    <section className="nav:py-36 max-w-page mx-auto px-8 py-12">
      <div className="nav:grid-cols-[835fr_533fr] nav:items-start grid gap-18">
        <div className="nav:order-1 order-2">
          <h2 className="text-brand-teal text-4xl leading-10.5 font-normal">{title}</h2>
          <h3 className="text-brand-teal mt-6 text-2xl leading-7 font-bold">{lead}</h3>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-brand-gray-900 mt-4.5 text-lg leading-6">
              {paragraph}
            </p>
          ))}
          {note ? <p className="text-brand-gray-900 mt-4.5 text-lg leading-6 italic">{note}</p> : null}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-blue-light text-brand-teal mt-9 inline-block rounded-full px-10.5 py-4.25 text-base font-semibold"
          >
            {ctaLabel}
          </a>
        </div>
        <div className="nav:order-2 order-1">
          <Image
            src={image}
            alt={imageAlt}
            placeholder="blur"
            className="h-auto w-full object-cover"
            sizes="(min-width: 960px) 533px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
