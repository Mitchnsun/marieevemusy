import { cn } from "@utils/cn";
import Image, { type StaticImageData } from "next/image";

type GalleryImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes: string;
};

export default function GalleryImage({ src, alt, className, sizes }: GalleryImageProps) {
  return (
    <Image src={src} alt={alt} placeholder="blur" className={cn("w-full object-cover", className)} sizes={sizes} />
  );
}
