import ButtonLink from "@components/ButtonLink";
import { cn } from "@utils/cn";
import Image, { type StaticImageData } from "next/image";

type CalloutBandProps = {
  title?: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
} & (
  { variant?: "image"; image: StaticImageData; imageAlt: string } | { variant: "teal"; image?: never; imageAlt?: never }
);

export default function CalloutBand({
  title,
  text,
  ctaLabel,
  ctaHref,
  external = false,
  image,
  imageAlt,
  variant = "image",
}: CalloutBandProps) {
  const variantStyles = {
    image: { textColorClass: "text-white", buttonVariant: "light" },
    teal: { textColorClass: "text-brand-blue-muted", buttonVariant: "teal" },
  } as const;
  const { textColorClass, buttonVariant } = variantStyles[variant];

  return (
    <section className={cn("relative", { "bg-brand-teal": variant === "teal" })}>
      {image ? (
        <>
          <Image src={image} alt={imageAlt} fill placeholder="blur" sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-neutral-900/50" />
        </>
      ) : null}
      <div className="nav:flex-row nav:items-center nav:gap-9 max-w-page relative mx-auto flex flex-col items-start gap-6 px-8 py-12">
        <div className="flex-1">
          {title ? (
            <>
              <h2 className={cn("text-4xl leading-10.5 font-normal", textColorClass)}>{title}</h2>
              <p className={cn("mt-4.5 text-lg leading-6", textColorClass)}>{text}</p>
            </>
          ) : (
            <p className={cn("text-2xl leading-7 font-bold", textColorClass)}>{text}</p>
          )}
        </div>
        <ButtonLink href={ctaHref} external={external} variant={buttonVariant} className="shrink-0">
          {ctaLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
