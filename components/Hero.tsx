import { cn } from "@utils/cn";
import Image, { type StaticImageData } from "next/image";

type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  title: string;
  align?: "left" | "right";
};

export default function Hero({ image, imageAlt, title, align = "left" }: HeroProps) {
  return (
    <section data-component="Hero" className="relative h-screen">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-left"
      />
      <div className="absolute inset-0 bg-neutral-900/16" />
      <div
        className={cn("max-w-page relative mx-auto flex h-full items-center justify-center px-9", {
          "lg:justify-end": align === "right",
          "lg:justify-start": align === "left",
        })}
      >
        <h1
          className={cn(
            "animate-title-reveal text-center text-4xl leading-10.5 font-extrabold text-white motion-reduce:animate-none lg:text-8xl lg:leading-27",
            {
              "lg:text-right": align === "right",
              "lg:text-left": align === "left",
            }
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
