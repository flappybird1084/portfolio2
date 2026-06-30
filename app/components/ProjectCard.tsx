import Image from "next/image";
import Link from "next/link";
import { Project } from "@/app/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group panel flex flex-col overflow-hidden hover:border-black/20 transition-colors duration-200"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#eef0f4] border-b border-black/[0.08]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.03] duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display font-black text-faint text-3xl tracking-tight">
              {project.tech}
            </span>
          </div>
        )}
        {project.award && (
          <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-accent text-ink text-[11px] font-bold px-2.5 py-1 shadow-lg shadow-black/40">
            <span aria-hidden="true">★</span>
            {project.award}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="font-display font-bold tracking-tight text-paper text-xl group-hover:text-accent transition-colors">
            {project.name}
          </h2>
          <span className="shrink-0 text-[11px] font-bold text-faint whitespace-nowrap mt-1">
            {project.tech}
          </span>
        </div>
        <p className="text-[14px] leading-relaxed text-muted">{project.tagline}</p>
      </div>
    </Link>
  );
}
