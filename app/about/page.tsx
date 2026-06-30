import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import { profile, experience, education, focus, socials } from "../lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Rian Butala's background, experience, and focus.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="max-w-6xl mx-auto md:px-16 px-6 lg:mt-20 mt-12 pb-32">
      {/* INTRO — wide two-column: big statement + sticky info aside */}
      <section className="grid lg:grid-cols-[1.5fr_1fr] grid-cols-1 gap-x-16 gap-y-12 lg:mb-32 mb-20">
        <div className="order-2 lg:order-none glass-soft p-6 md:p-8">
          <h1 className="font-display font-black tracking-tight text-paper text-[clamp(40px,6vw,72px)] leading-[0.95] mb-8">
            I&apos;m Rian. I build the future, from the papers up.
          </h1>
          <div className="flex flex-col gap-5 text-[16px] sm:text-[17px] leading-relaxed text-soft max-w-2xl">
            <p>{profile.about}</p>
            <p>{profile.headline}</p>
          </div>
        </div>

        <aside className="order-1 lg:order-none">
          <div className="panel p-8 lg:sticky lg:top-12">
            <div className="text-[11px] font-bold tracking-[0.2em] text-faint mb-5">
              AT A GLANCE
            </div>
            <dl className="flex flex-col gap-4">
              <div>
                <dt className="text-[11px] font-bold tracking-[0.12em] text-faint">
                  LOCATION
                </dt>
                <dd className="text-[15px] text-paper mt-1">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.12em] text-faint">
                  EMAIL
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[15px] text-accent hover:text-accent-bright transition-colors break-words"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex items-center justify-center gap-x-2 bg-accent text-white rounded-md py-2.5 text-[13px] font-bold tracking-[0.1em] hover:bg-accent-bright transition-colors"
            >
              RÉSUMÉ ↓
            </a>

            <div className="mt-6 pt-6 border-t border-black/[0.08] flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-bold tracking-[0.1em]">
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
          </div>
        </aside>
      </section>

      {/* FOCUS */}
      <section className="lg:mb-32 mb-20">
        <SectionHeading title="What I work on" />
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-7">
          {focus.map((f) => (
            <div key={f.index} className="panel p-8 flex flex-col">
              <div className="font-display font-black text-accent text-[28px] mb-4">
                {f.index}
              </div>
              <div className="font-display font-bold text-paper text-[20px] mb-2">
                {f.title}
              </div>
              <div className="text-[14px] leading-relaxed text-muted">
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="lg:mb-32 mb-20">
        <SectionHeading title="Work Experience" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-12">
          {experience.map((job, i) => (
            <div key={`${job.role}-${job.org}`} className="flex items-start gap-x-5">
              <div className="grid place-items-center min-h-[64px] min-w-[64px] panel font-display font-black text-accent text-xl">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-col items-start glass-soft p-4">
                <h3 className="font-display font-bold text-paper text-xl">
                  {job.role}
                </h3>
                <p className="text-muted text-[15px]">{job.org}</p>
                <time className="text-[11px] text-faint mt-2 tracking-[0.15em] uppercase font-bold">
                  {job.period}
                </time>
                <p className="text-[14px] leading-relaxed text-soft mt-3 max-w-md">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <SectionHeading title="Education" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-7">
          {education.map((ed) => (
            <div key={ed.school} className="panel p-8">
              <h3 className="font-display font-bold text-paper text-[22px]">
                {ed.school}
              </h3>
              <div className="text-[12px] font-bold text-faint mt-1 tracking-[0.12em] uppercase">
                {ed.period}
              </div>
              <p className="text-[14px] leading-relaxed text-muted mt-3">
                {ed.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
