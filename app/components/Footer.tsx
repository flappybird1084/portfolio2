import { profile, socials } from "@/app/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/[0.08] mt-32 md:px-16 px-6 py-14">
      <div className="max-w-6xl mx-auto flex md:flex-row flex-col md:items-center items-start justify-between gap-y-6">
        <div className="flex flex-col gap-y-2">
          <span className="font-display font-black text-paper text-lg">
            {profile.name}
          </span>
          <small className="text-faint text-[12px]">
            Built with Next.js · Deployed on Vercel
          </small>
        </div>

        <ul className="flex items-center gap-x-5 flex-wrap">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[12px] font-bold tracking-[0.1em] text-muted hover:text-accent transition-colors"
              >
                {s.name.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
