import Link from "next/link";
import type { Metadata } from "next";
import { Slide } from "../components/Slide";
import PageHeading from "../components/PageHeading";
import { getAllPosts, formatDate } from "../lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on the ML I reimplement from scratch and the systems I build on top.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className="max-w-content mx-auto px-8 pb-[16vh]">
      <PageHeading
        title="Blog"
        description="Notes that don't fit in a README: the bugs that took a week, the ideas that didn't pan out, and the occasional one that did."
      />

      <Slide delay={0.1}>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass p-7 hover:border-black/20 transition-colors"
              >
                <div className="text-[12px] font-bold text-faint mb-2">
                  {formatDate(post.date)}
                </div>
                <h2 className="font-display font-bold text-paper text-[23px] group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-[14px] leading-relaxed text-muted mt-2">
                  {post.summary}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted text-[15px]">No posts yet. Check back soon.</p>
        )}
      </Slide>
    </main>
  );
}
