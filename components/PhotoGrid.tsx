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
    <ul className="nav:grid-cols-3 grid grid-cols-1 gap-9 md:grid-cols-2">
      {items.map(({ src, alt, title, credit }, index) => (
        <li key={`${title}-${index}`}>
          <figure>
            <GalleryImage
              src={src}
              alt={alt}
              className="h-auto"
              sizes="(min-width: 960px) 500px, (min-width: 768px) 45vw, 100vw"
            />
            <figcaption className="text-brand-blue-muted mt-2 text-sm">
              {title} © {credit}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
