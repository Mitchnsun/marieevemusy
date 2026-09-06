import Image, { type StaticImageData } from "next/image";

type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  title: string;
};

export default function Hero({ image, imageAlt, title }: HeroProps) {
  return (
    <section className="relative h-screen">
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
      <div className="nav:justify-end max-w-page relative mx-auto flex h-full items-center justify-center px-9">
        <h1 className="nav:text-right nav:text-8xl nav:leading-27 text-center text-4xl leading-10.5 font-extrabold text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
