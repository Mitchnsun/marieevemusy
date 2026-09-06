import ButtonLink from "@components/ButtonLink";
import { cn } from "@utils/cn";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type ShowSectionProps = {
  title?: string;
  lead?: string;
  paragraphs: string[];
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageClassName?: string;
  imageSizes?: string;
  children?: ReactNode;
} & ({ image: StaticImageData; imageAlt: string } | { image?: never; imageAlt?: never });

export default function ShowSection({
  title,
  lead,
  paragraphs,
  note,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  imageClassName,
  imageSizes,
  children,
}: ShowSectionProps) {
  return (
    <section className="nav:py-36 max-w-page mx-auto px-8 py-12">
      <div className={cn("gap-18", image ? "nav:grid-cols-[835fr_533fr] nav:items-start grid" : "nav:max-w-208.75")}>
        <div className={cn({ "nav:order-1 order-2": image })}>
          {title ? <h2 className="text-brand-teal text-4xl leading-10.5 font-normal">{title}</h2> : null}
          {lead ? (
            <h3 className={cn("text-brand-teal text-2xl leading-7 font-bold", { "mt-6": title })}>{lead}</h3>
          ) : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-brand-gray-900 mt-4.5 text-lg leading-6">
              {paragraph}
            </p>
          ))}
          {note ? <p className="text-brand-gray-900 mt-4.5 text-lg leading-6 italic">{note}</p> : null}
          {children}
          {ctaLabel && ctaHref ? (
            <ButtonLink href={ctaHref} external className="mt-9">
              {ctaLabel}
            </ButtonLink>
          ) : null}
        </div>
        {image ? (
          <div className="nav:order-2 order-1">
            <Image
              src={image}
              alt={imageAlt}
              placeholder="blur"
              className={imageClassName ?? "h-auto w-full object-cover"}
              sizes={imageSizes ?? "(min-width: 960px) 533px, 100vw"}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
