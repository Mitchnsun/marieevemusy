import { cn } from "@utils/cn";
import Image, { type StaticImageData } from "next/image";

type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  title: string;
  align?: "left" | "right";
  objectPosition?: "left" | "center";
};

export default function Hero({ image, imageAlt, title, align = "left", objectPosition = "left" }: HeroProps) {
  return (
    <section data-component="Hero" className="relative h-screen">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        placeholder="blur"
        // object-cover on a full-height hero scales these 16:9 sources well past the
        // viewport width on portrait phones, so the mobile slot exceeds 100vw on purpose.
        sizes="(max-width: 1024px) 200vw, 100vw"
        className={cn("object-cover", {
          "object-left": objectPosition === "left",
          "object-center": objectPosition === "center",
        })}
      />
      <div className="absolute inset-0 bg-neutral-900/16" />
      <div
        className={cn("max-w-page relative mx-auto flex h-full items-center px-9", {
          "justify-center lg:justify-end": align === "right",
          "justify-start": align === "left",
        })}
      >
        <h1
          className={cn(
            "animate-title-reveal text-4xl leading-10.5 font-extrabold text-white motion-reduce:animate-none lg:text-8xl lg:leading-27",
            {
              "text-center lg:text-right": align === "right",
              "text-left": align === "left",
            }
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
