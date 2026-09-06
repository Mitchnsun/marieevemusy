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
    <section className="nav:py-36 max-w-page mx-auto overflow-x-auto px-8 py-12">
      <ul className="flex w-max gap-9">
        {images.map(({ src, alt }) => (
          <li key={alt} className="nav:w-138.5 w-86.5 shrink-0">
            <GalleryImage src={src} alt={alt} className="nav:h-78 h-48.75" sizes="(min-width: 960px) 554px, 346px" />
          </li>
        ))}
      </ul>
    </section>
  );
}
