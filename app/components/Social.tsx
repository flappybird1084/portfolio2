import { profile, socials } from "@/app/lib/data";

export default function Social({ withResume = true }: { withResume?: boolean }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-bold tracking-[0.12em]">
      {withResume && (
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-bright transition-colors"
        >
          RÉSUMÉ ↓
        </a>
      )}
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-muted hover:text-accent transition-colors"
        >
          {s.name.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
