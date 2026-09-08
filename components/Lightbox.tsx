"use client";

import { Button } from "@components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@components/ui/dialog";
import { cn } from "@utils/cn";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import type { RefObject } from "react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type LightboxImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  openIndex: number | null;
  // eslint-disable-next-line no-unused-vars -- named param in a function *type* has no scope to be "unused" in
  onOpenChange: (index: number | null) => void;
  /**
   * The gallery thumbnail that opened the lightbox. We don't use Radix's `DialogTrigger` (one
   * Dialog is shared by N thumbnails, toggled by index), so Radix has no trigger to return focus
   * to on close — this restores it via `onCloseAutoFocus` instead.
   */
  triggerRef?: RefObject<HTMLElement | null>;
};

const NAV_BUTTON_CLASSES = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full";

export default function Lightbox({ images, openIndex, onOpenChange, triggerRef }: LightboxProps) {
  const t = useTranslations("Gallery");
  const isOpen = openIndex !== null;

  // Retain the last opened index across the close animation: Radix keeps `LightboxCarousel`
  // mounted while the dialog plays its exit fade, then unmounts it once closed — that unmount
  // is what gives the next open a fresh `startIndex` instead of a stale `useState`.
  const [carouselIndex, setCarouselIndex] = useState(0);
  if (openIndex !== null && openIndex !== carouselIndex) setCarouselIndex(openIndex);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onOpenChange(null)}>
      <DialogContent
        data-component="Lightbox"
        showCloseButton={false}
        className="flex h-screen max-w-screen cursor-zoom-out flex-col items-center gap-4 overflow-hidden border-none bg-transparent p-4 shadow-none sm:max-w-screen lg:p-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) onOpenChange(null);
        }}
        onCloseAutoFocus={(event) => {
          if (!triggerRef?.current) return;
          event.preventDefault();
          triggerRef.current.focus();
        }}
      >
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={t("close")}
            className="absolute top-2 right-2 z-10 rounded-full"
          >
            <X />
          </Button>
        </DialogClose>

        <LightboxCarousel images={images} startIndex={carouselIndex} />
      </DialogContent>
    </Dialog>
  );
}

type LightboxCarouselProps = {
  images: LightboxImage[];
  startIndex: number;
};

function LightboxCarousel({ images, startIndex }: LightboxCarouselProps) {
  const t = useTranslations("Gallery");
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = images.length;
  const [api, setApi] = useState<CarouselApi>();

  // Same `useSyncExternalStore` over Embla's event emitter as `components/ui/carousel.tsx`, kept
  // local here since the current slide index is only needed by this component.
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onStoreChange);
      api.on("reInit", onStoreChange);
      return () => {
        api.off("select", onStoreChange);
        api.off("reInit", onStoreChange);
      };
    },
    [api]
  );
  const getServerSnapshot = useCallback(() => startIndex, [startIndex]);
  const current = useSyncExternalStore(subscribe, () => api?.selectedScrollSnap() ?? startIndex, getServerSnapshot);

  const goPrevious = useCallback(() => api?.scrollPrev(), [api]);
  const goNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goPrevious, goNext]);

  const image = images[current];

  return (
    <>
      <DialogTitle className="sr-only">{t("dialogTitle", { current: current + 1, total })}</DialogTitle>
      <DialogDescription className="sr-only">{image.alt}</DialogDescription>

      {total > 1 && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={t("previous")}
          onClick={goPrevious}
          className={cn(NAV_BUTTON_CLASSES, "left-2")}
        >
          <ChevronLeft />
        </Button>
      )}

      <Carousel
        // An explicit `duration: undefined` would still override Embla's own default (its option
        // merge treats any present key as an override, undefined included) — only set the key at
        // all when motion is actually reduced.
        opts={{ loop: total > 1, startIndex, align: "center", ...(prefersReducedMotion && { duration: 0 }) }}
        setApi={setApi}
        aria-label={t("label")}
        className="my-auto w-full"
      >
        <CarouselContent className="ml-0" viewportClassName="overflow-visible">
          {images.map(({ src, alt, caption }, index) => (
            <CarouselItem key={alt} className="flex flex-col items-center justify-center gap-4 px-2 lg:px-4">
              <Image
                src={src}
                alt={alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 90vw, 100vw"
                loading={Math.abs(index - current) <= 1 ? "eager" : "lazy"}
                className="max-h-[85vh] w-auto max-w-full cursor-default object-contain"
              />
              {caption && <p className="cursor-default text-center text-sm text-white/80">{caption}</p>}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {total > 1 && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={t("next")}
          onClick={goNext}
          className={cn(NAV_BUTTON_CLASSES, "right-2")}
        >
          <ChevronRight />
        </Button>
      )}
    </>
  );
}
