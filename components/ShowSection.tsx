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
  image: StaticImageData;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imageClassName?: string;
  imageSizes?: string;
  children?: ReactNode;
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
  imageClassName,
  imageSizes,
  imagePosition = "right",
  children,
}: ShowSectionProps) {
  const imageLeft = imagePosition === "left";

  return (
    <section data-component="ShowSection" className={cn("px-8 py-12", { "bg-gray-100": imageLeft })}>
      <div
        className={cn("mx-auto grid max-w-7xl gap-18 lg:items-start", {
          "lg:grid-cols-[533fr_835fr]": imageLeft,
          "lg:grid-cols-[835fr_533fr]": !imageLeft,
        })}
      >
        <div className={cn("order-2", { "lg:order-2": imageLeft, "lg:order-1": !imageLeft })}>
          {title ? <h2 className="text-brand-teal text-4xl leading-10.5 font-extrabold">{title}</h2> : null}
          {lead ? (
            <h3 className={cn("text-brand-teal text-2xl leading-7 font-semibold", { "mt-6": title })}>{lead}</h3>
          ) : null}
          <div className="mt-3 h-px w-full bg-gray-200" />
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-brand-gray-900 mt-4.5 text-lg leading-6">
              {paragraph}
            </p>
          ))}
          {note ? <p className="text-brand-gray-500 mt-4.5 text-lg leading-6 italic">{note}</p> : null}
          {children}
          {ctaLabel && ctaHref ? (
            <ButtonLink href={ctaHref} external className="mt-9">
              {ctaLabel}
            </ButtonLink>
          ) : null}
        </div>
        <div className={cn("order-1", imageLeft ? "lg:order-1" : "lg:order-2")}>
          <Image
            src={image}
            alt={imageAlt}
            placeholder="blur"
            className={imageClassName ?? "h-auto w-full object-cover"}
            sizes={imageSizes ?? "(min-width: 1024px) 533px, 100vw"}
          />
        </div>
      </div>
    </section>
  );
}
