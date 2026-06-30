import type { Metadata } from "next";
import { Slide } from "../components/Slide";
import PageHeading from "../components/PageHeading";
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
      <PageHeading
        label="02 · SELECTED WORK"
        title="Projects"
        description="I reimplement recent ML papers from scratch to understand them end to end, then build real systems on top. These are the ones I'm most proud of — many are open-source with live demos."
      />

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
