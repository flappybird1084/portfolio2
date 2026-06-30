import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-content mx-auto px-8 min-h-[70vh] flex flex-col justify-center items-center text-center">
      <div className="font-display font-black text-paper text-[clamp(72px,16vw,180px)] leading-none tracking-[-0.04em]">
        404
      </div>
      <p className="text-[15px] text-muted mt-4 mb-8">
        That page wound off into the knot. Nothing here.
      </p>
      <Link
        href="/"
        className="text-[12px] font-bold tracking-[0.12em] text-accent hover:text-accent-bright transition-colors"
      >
        ← BACK HOME
      </Link>
    </main>
  );
}
