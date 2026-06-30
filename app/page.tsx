import Link from "next/link";
import { Slide } from "./components/Slide";
import Social from "./components/Social";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { profile, focus, stack, projects, experience } from "./lib/data";

export default function Home() {
  const featured = projects.slice(0, 4);

  return (
    <main className="max-w-6xl mx-auto md:px-16 px-6 lg:mt-20 mt-12 pb-32">
      {/* HERO — big, left-aligned, knot reads through on the right */}
      <section className="min-h-[78vh] flex flex-col justify-center">
        <Slide>
          <div className="max-w-4xl">
            <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.24em] text-accent">
              {profile.kicker}
            </div>
            <h1 className="font-display font-black text-paper leading-[0.84] tracking-[-0.035em] text-[clamp(64px,13vw,184px)] mt-6">
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-soft max-w-2xl mt-8">
              {profile.headline}
            </p>
            <Social />
          </div>
        </Slide>
      </section>

      {/* SELECTED WORK — two-column card grid */}
      <section className="mt-32">
        <Slide>
          <SectionHeading
            number="01 · SELECTED WORK"
            title="Selected Work"
            link={{ href: "/projects", label: "ALL PROJECTS" }}
          />
        </Slide>
        <Slide delay={0.08}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-7">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Slide>
      </section>

      {/* WORK EXPERIENCE — two-column timeline grid (reference-style connectors) */}
      <section className="mt-32">
        <Slide>
          <SectionHeading number="02 · EXPERIENCE" title="Work Experience" />
        </Slide>
        <Slide delay={0.08}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-12">
            {experience.map((job, i) => (
              <div key={`${job.role}-${job.org}`} className="flex items-start gap-x-5">
                <div className="grid place-items-center min-h-[64px] min-w-[64px] panel font-display font-black text-accent text-xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-col items-start pt-1">
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
        </Slide>
      </section>

      {/* FOCUS + STACK */}
      <section className="mt-32">
        <Slide>
          <SectionHeading number="03 · FOCUS" title="What I work on" />
        </Slide>
        <Slide delay={0.08}>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-7 mb-10">
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
        </Slide>
        <Slide delay={0.1}>
          <div className="panel px-9 py-8">
            <div className="text-[11px] font-bold tracking-[0.2em] text-faint mb-6">
              STACK
            </div>
            <div className="flex flex-col gap-4">
              {stack.map((row) => (
                <div key={row.label} className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold tracking-[0.1em] text-accent min-w-[110px]">
                    {row.label}
                  </span>
                  {row.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Slide>
      </section>

      {/* ABOUT teaser — big statement */}
      <section className="mt-32">
        <Slide>
          <SectionHeading
            number="04 · ABOUT"
            title="About"
            link={{ href: "/about", label: "MORE ABOUT ME" }}
          />
        </Slide>
        <Slide delay={0.08}>
          <p className="font-display font-medium text-[clamp(24px,3.4vw,40px)] leading-[1.3] tracking-[-0.01em] text-[#2a2f37] max-w-4xl">
            {profile.about}
          </p>
        </Slide>
      </section>
    </main>
  );
}
