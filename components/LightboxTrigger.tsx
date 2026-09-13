"use client";

import GalleryImage from "@components/GalleryImage";
import { cn } from "@utils/cn";
import { Plus } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

type LightboxTriggerProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars -- named param in a function *type* has no scope to be "unused" in
  onOpen: (trigger: HTMLElement) => void;
};

export default function LightboxTrigger({ src, alt, sizes, className, onOpen }: LightboxTriggerProps) {
  const t = useTranslations("Gallery");

  return (
    <button
      type="button"
      data-component="LightboxTrigger"
      onClick={(event) => onOpen(event.currentTarget)}
      aria-label={t("openImage", { alt })}
      className="group relative block w-full cursor-zoom-in overflow-hidden"
    >
      <GalleryImage src={src} alt={alt} className={className} sizes={sizes} />
      <span
        aria-hidden="true"
        className={cn(
          "bg-brand-navy/40 pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        )}
      >
        <Plus className="size-10 text-white" strokeWidth={1.5} />
      </span>
    </button>
  );
}
