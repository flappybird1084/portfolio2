import type { Metadata } from "next";
import { Slide } from "../components/Slide";
import PageHeading from "../components/PageHeading";
import { profile, socials } from "../lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rian Butala about internships and research.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main className="max-w-content mx-auto px-8 pb-[16vh]">
      <PageHeading
        label="06 · GET IN TOUCH"
        title="Contact"
        description="Open to internship and research opportunities. The fastest way to reach me is email."
      />

      <Slide delay={0.1}>
        <section className="panel px-11 py-12">
          <div className="text-[11px] font-bold tracking-[0.2em] text-faint mb-5">
            EMAIL
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="font-display font-black tracking-[-0.03em] text-paper text-[clamp(20px,4.6vw,40px)] leading-[0.95] hover:text-accent transition-colors break-words"
          >
            {profile.email}
          </a>

          <div className="mt-10 pt-8 border-t border-black/[0.08]">
            <div className="text-[11px] font-bold tracking-[0.2em] text-faint mb-5">
              ELSEWHERE
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-bold tracking-[0.1em]">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-bright transition-colors"
              >
                RÉSUMÉ ↓
              </a>
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
        </section>
      </Slide>
    </main>
  );
}
