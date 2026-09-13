"use client";

import Lightbox from "@components/Lightbox";
import LightboxTrigger from "@components/LightboxTrigger";
import type { StaticImageData } from "next/image";
import { useRef, useState } from "react";

type PhotoGridItem = {
  src: StaticImageData;
  alt: string;
  title: string;
  credit: string;
};

type PhotoGridProps = {
  items: PhotoGridItem[];
};

export default function PhotoGrid({ items }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <ul data-component="PhotoGrid" className="columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-6">
        {items.map(({ src, alt, title, credit }, index) => (
          <li key={`${title}-${index}`} className="mb-4 break-inside-avoid lg:mb-6">
            <figure className="relative overflow-hidden">
              <LightboxTrigger
                src={src}
                alt={alt}
                className="h-auto"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 50vw"
                onOpen={(trigger) => {
                  triggerRef.current = trigger;
                  setOpenIndex(index);
                }}
              />
              <figcaption className="bg-brand-navy/70 pointer-events-none absolute inset-x-0 bottom-0 px-2 py-1.5 text-xs leading-tight text-white backdrop-blur-sm">
                {title} © {credit}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <Lightbox
        images={items.map(({ src, alt, title, credit }) => ({ src, alt, caption: `${title} © ${credit}` }))}
        openIndex={openIndex}
        onOpenChange={setOpenIndex}
        triggerRef={triggerRef}
      />
    </>
  );
}
