"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-30 border-b border-black/[0.08] py-6 md:px-16 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-black tracking-tight text-paper text-lg hover:text-accent transition-colors"
        >
          RB
        </Link>

        <nav className="md:block hidden">
          <ul className="flex items-center gap-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-mono text-[13px] font-bold tracking-[0.12em] transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  {link.title.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2"
        >
          <span className="block h-[2px] w-5 bg-muted" />
          <span className="block h-[2px] w-5 bg-muted" />
          <span className="block h-[2px] w-5 bg-muted" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden mt-4 max-w-6xl mx-auto">
          <ul className="flex flex-col gap-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-[13px] font-bold tracking-[0.12em] ${
                    isActive(link.href) ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.title.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
