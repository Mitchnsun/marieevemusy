const DEFAULT_TEXT = "Vous avez une question, une idée, un projet? On en discute?";

export default function ContactCta({ text = DEFAULT_TEXT }: { text?: string }) {
  return (
    <footer className="bg-brand-navy">
      <div className="container mx-auto flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-brand-blue-light text-xl font-semibold">{text}</p>
        <button
          type="button"
          className="bg-brand-blue-light text-brand-teal cursor-default rounded-full px-6 py-3 font-semibold"
        >
          Contact
        </button>
      </div>
    </footer>
  );
}
