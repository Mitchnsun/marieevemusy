import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Journalisme" },
  { href: "/biographie/", label: "Biographie" },
  { href: "/ecriture/", label: "Écriture" },
  { href: "/acting/", label: "Acting" },
];

export default function Nav() {
  return (
    <header className="border-brand-gray-200 border-b">
      <nav aria-label="Navigation principale" className="container mx-auto p-4">
        <ul className="flex gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-brand-gray-900 hover:text-brand-teal">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
