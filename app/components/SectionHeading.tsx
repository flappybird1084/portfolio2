import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  link?: { href: string; label: string };
};

// Large section header used across the wide layout.
export default function SectionHeading({ title, link }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-6 mb-12">
      <h2 className="font-display font-black tracking-tight text-paper sm:text-5xl text-4xl leading-[0.95]">
        {title}
      </h2>
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
