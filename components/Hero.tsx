import HeroBackdrop from "@components/HeroBackdrop";
import { cn } from "@utils/cn";
import type { StaticImageData } from "next/image";

type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  title: string;
  align?: "left" | "right";
  objectPosition?: "top" | "left" | "center" | "left-top";
};

export default function Hero({ image, imageAlt, title, align = "left", objectPosition = "top" }: HeroProps) {
  return (
    <section data-component="Hero" className="relative h-screen">
      <HeroBackdrop image={image} imageAlt={imageAlt} objectPosition={objectPosition} />
      <div
        className={cn("max-w-page relative z-10 mx-auto flex h-full items-center px-9", {
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
