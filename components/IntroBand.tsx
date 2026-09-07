import { cn } from "@utils/cn";

type IntroBandProps = {
  text: string;
  className?: string;
  titleClassName?: string;
};

export default function IntroBand({ text, className, titleClassName = "text-brand-teal" }: IntroBandProps) {
  return (
    <section className={className}>
      <div className="max-w-page mx-auto px-8 py-12 lg:py-36">
        <h2 className={cn("max-w-225 text-4xl leading-10.5 font-bold", titleClassName)}>{text}</h2>
      </div>
    </section>
  );
}
