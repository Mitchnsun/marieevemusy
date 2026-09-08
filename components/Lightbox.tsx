"use client";

import { Button } from "@components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@components/ui/dialog";
import { cn } from "@utils/cn";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

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
  const total = images.length;
  const isOpen = openIndex !== null;

  const goTo = useCallback(
    (nextIndex: number) => {
      onOpenChange(((nextIndex % total) + total) % total);
    },
    [onOpenChange, total]
  );

  const goPrevious = useCallback(() => {
    if (openIndex !== null) goTo(openIndex - 1);
  }, [goTo, openIndex]);

  const goNext = useCallback(() => {
    if (openIndex !== null) goTo(openIndex + 1);
  }, [goTo, openIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrevious();
      else if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goPrevious, goNext]);

  if (openIndex === null) return null;

  const image = images[openIndex];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onOpenChange(null)}>
      <DialogContent
        data-component="Lightbox"
        showCloseButton={false}
        className="flex h-screen max-w-screen cursor-zoom-out flex-col items-center gap-4 border-none bg-transparent p-4 shadow-none sm:max-w-screen lg:p-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) onOpenChange(null);
        }}
        onCloseAutoFocus={(event) => {
          if (!triggerRef?.current) return;
          event.preventDefault();
          triggerRef.current.focus();
        }}
      >
        <DialogTitle className="sr-only">{t("dialogTitle", { current: openIndex + 1, total })}</DialogTitle>
        <DialogDescription className="sr-only">{image.alt}</DialogDescription>

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

        <Image
          src={image.src}
          alt={image.alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="m-auto max-h-[90vh] max-w-full cursor-default object-contain"
        />

        {image.caption && <p className="cursor-default text-center text-sm text-white/80">{image.caption}</p>}

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
      </DialogContent>
    </Dialog>
  );
}
