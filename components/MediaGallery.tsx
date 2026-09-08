"use client";

import GalleryImage from "@components/GalleryImage";
import Lightbox from "@components/Lightbox";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type GalleryImageItem = {
  src: StaticImageData;
  alt: string;
};

type MediaGalleryProps = {
  images: GalleryImageItem[];
};

const AUTOPLAY_DELAY_MS = 4000;

export default function MediaGallery({ images }: MediaGalleryProps) {
  const t = useTranslations("Gallery");
  const prefersReducedMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const isLightboxOpen = openIndex !== null;

  const plugins = useMemo(
    () =>
      // Dropping the plugin (rather than calling `.stop()`) is required while the lightbox is
      // open: Embla Autoplay's `stopOnMouseEnter` binds a `mouseleave` listener on the carousel
      // root that restarts the timer, and moving the pointer onto the Lightbox's portalled
      // overlay fires that `mouseleave`, resuming autoplay behind the dimmed backdrop.
      prefersReducedMotion || isLightboxOpen
        ? []
        : [
            Autoplay({
              delay: AUTOPLAY_DELAY_MS,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ],
    [prefersReducedMotion, isLightboxOpen]
  );

  return (
    <section data-component="MediaGallery" className="max-w-wide mx-auto px-4 py-12">
      <Carousel opts={{ loop: true, align: "start" }} plugins={plugins} aria-label={t("label")}>
        <CarouselContent className="-ml-9">
          {images.map(({ src, alt }, index) => (
            <CarouselItem key={alt} className="w-86.5 shrink-0 grow-0 basis-auto pl-9 lg:w-138.5">
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpenIndex(index);
                }}
                aria-label={t("openImage", { alt })}
                className="block w-full cursor-zoom-in"
              >
                <GalleryImage
                  src={src}
                  alt={alt}
                  className="h-48.75 lg:h-78"
                  sizes="(min-width: 1024px) 554px, 346px"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-6 flex justify-end gap-2 px-1">
          <CarouselPrevious
            variant="ghost"
            aria-label={t("previous")}
            className="border-brand-gray-200 text-brand-teal static translate-y-0 border"
          />
          <CarouselNext
            variant="ghost"
            aria-label={t("next")}
            className="border-brand-gray-200 text-brand-teal static translate-y-0 border"
          />
        </div>
      </Carousel>

      <Lightbox images={images} openIndex={openIndex} onOpenChange={setOpenIndex} triggerRef={triggerRef} />
    </section>
  );
}
