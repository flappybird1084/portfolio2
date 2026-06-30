import type { Metadata } from "next";
import { Slide } from "../components/Slide";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Diffusion models, world models, LLMs from scratch, and the perception systems and apps built on top.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto md:px-16 px-6 pb-[16vh]">
      <div className="glass-soft md:p-8 p-6 md:mb-12 mb-8">
        <h1 className="font-display font-black tracking-tight text-paper sm:text-6xl text-4xl leading-[0.92] mb-5">
          Projects
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-soft">
          I reimplement recent ML papers from scratch to understand them end to end, then
          build real systems on top. These are the ones I&apos;m most proud of, and many are
          open-source with live demos.
        </p>
      </div>

      <Slide delay={0.1}>
        <section className="grid md:grid-cols-2 grid-cols-1 gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      </Slide>
    </main>
  );
}
