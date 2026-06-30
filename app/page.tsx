import { Slide } from "./components/Slide";
import Social from "./components/Social";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { profile, projects, experience } from "./lib/data";

export default function Home() {
  const featured = projects.slice(0, 2);

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

      {/* SELECTED WORK — two featured projects */}
      <section className="mt-32">
        <SectionHeading
          title="Selected Work"
          link={{ href: "/projects", label: "ALL PROJECTS" }}
        />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-7">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* WORK EXPERIENCE — two-column timeline grid */}
      <section className="mt-32">
        <SectionHeading title="Work Experience" />
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
      </section>
    </main>
  );
}
