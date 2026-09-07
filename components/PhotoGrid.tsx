import GalleryImage from "@components/GalleryImage";
import type { StaticImageData } from "next/image";

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
  return (
    <ul className="columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-6">
      {items.map(({ src, alt, title, credit }, index) => (
        <li key={`${title}-${index}`} className="mb-4 break-inside-avoid lg:mb-6">
          <figure className="relative overflow-hidden">
            <GalleryImage
              src={src}
              alt={alt}
              className="h-auto"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 50vw"
            />
            <figcaption className="bg-brand-navy/70 absolute inset-x-0 bottom-0 px-2 py-1.5 text-xs leading-tight text-white backdrop-blur-sm">
              {title} © {credit}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
