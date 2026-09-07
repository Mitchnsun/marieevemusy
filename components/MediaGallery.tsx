import GalleryImage from "@components/GalleryImage";
import type { StaticImageData } from "next/image";

type GalleryImageItem = {
  src: StaticImageData;
  alt: string;
};

type MediaGalleryProps = {
  images: GalleryImageItem[];
};

export default function MediaGallery({ images }: MediaGalleryProps) {
  return (
    <section className="max-w-page mx-auto overflow-x-auto px-8 py-12 lg:py-36">
      <ul className="flex w-max gap-9">
        {images.map(({ src, alt }) => (
          <li key={alt} className="w-86.5 shrink-0 lg:w-138.5">
            <GalleryImage src={src} alt={alt} className="h-48.75 lg:h-78" sizes="(min-width: 1024px) 554px, 346px" />
          </li>
        ))}
      </ul>
    </section>
  );
}
