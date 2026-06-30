import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Slide } from "../../components/Slide";
import { projects } from "../../lib/data";

type Params = { params: Promise<{ project: string }> };

function getProjectBody(slug: string): string | null {
  const file = path.join(process.cwd(), "content", "projects", `${slug}.mdx`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project: slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { project: slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const body = getProjectBody(project.slug);

  return (
    <main className="max-w-3xl mx-auto px-8 pb-[16vh]">
      <Slide>
        <Link
          href="/projects"
          className="inline-block mb-8 text-[12px] font-bold tracking-[0.12em] text-muted hover:text-accent transition-colors"
        >
          ← ALL PROJECTS
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-[12px] font-bold text-faint">{project.tech}</span>
          {project.award && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent text-white text-[11px] font-bold px-2.5 py-1">
              <span aria-hidden="true">★</span>
              {project.award}
            </span>
          )}
        </div>

        <h1 className="font-display font-black tracking-tight text-paper sm:text-5xl text-3xl leading-[0.95] mb-5">
          {project.name}
        </h1>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] font-bold tracking-[0.12em] mb-8">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-bright transition-colors"
          >
            GITHUB ↗
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-bright transition-colors"
            >
              ▶ {project.liveDemo.label.toUpperCase()} ↗
            </a>
          )}
        </div>

        {project.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-black/10 bg-[#eef0f4] mb-8">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {body ? (
          <div className="glass md:p-10 p-6 mb-8">
            <article className="prose-knot">
              <MDXRemote source={body} />
            </article>
          </div>
        ) : (
          <p className="text-[16px] leading-relaxed text-soft">
            {project.description}
          </p>
        )}
      </Slide>
    </main>
  );
}
