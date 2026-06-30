import Link from "next/link";

type SectionHeadingProps = {
  number?: string;
  title: string;
  link?: { href: string; label: string };
};

// Large, in-your-face section header used across the wide homepage layout.
export default function SectionHeading({
  number,
  title,
  link,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-6 mb-12">
      <div>
        {number && (
          <div className="section-label mb-3">{number}</div>
        )}
        <h2 className="font-display font-black tracking-tight text-paper sm:text-5xl text-4xl leading-[0.95]">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="shrink-0 text-[12px] font-bold tracking-[0.12em] text-accent hover:text-accent-bright transition-colors pb-2 whitespace-nowrap"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
