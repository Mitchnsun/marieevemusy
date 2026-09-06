import Image, { type StaticImageData } from "next/image";

type GalleryImage = {
  src: StaticImageData;
  alt: string;
};

type MediaGalleryProps = {
  images: GalleryImage[];
};

export default function MediaGallery({ images }: MediaGalleryProps) {
  return (
    <section className="nav:py-36 max-w-page mx-auto overflow-x-auto px-8 py-12">
      <ul className="flex w-max gap-9">
        {images.map(({ src, alt }) => (
          <li key={alt} className="nav:w-138.5 w-86.5 shrink-0">
            <Image
              src={src}
              alt={alt}
              placeholder="blur"
              className="nav:h-78 h-48.75 w-full object-cover"
              sizes="(min-width: 960px) 554px, 346px"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
