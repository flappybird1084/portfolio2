import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Slide } from "../../components/Slide";
import { getAllPosts, getPost, formatDate } from "../../lib/posts";

type Params = { params: Promise<{ post: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ post: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { post: slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function PostPage({ params }: Params) {
  const { post: slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-8 pb-[16vh]">
      <Slide>
        <Link
          href="/blog"
          className="inline-block mb-8 text-[12px] font-bold tracking-[0.12em] text-muted hover:text-accent transition-colors"
        >
          ← ALL POSTS
        </Link>

        <div className="glass md:p-10 p-6">
          <div className="text-[12px] font-bold text-faint mb-3">
            {formatDate(post.date)}
          </div>
          <h1 className="font-display font-black tracking-tight text-paper sm:text-5xl text-3xl leading-[0.95] mb-8">
            {post.title}
          </h1>

          <article className="prose-knot">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </Slide>
    </main>
  );
}
