# rianbutala.xyz

Personal site rebuilt as a **Next.js 15** app (App Router, TypeScript, Tailwind CSS).
Carries over the original spinning torus-knot canvas background and dark palette, with the
multi-page layout modeled on a clean Next.js portfolio structure.

## Pages

| Route                | Source                                   |
| -------------------- | ---------------------------------------- |
| `/`                  | `app/page.tsx` — hero, focus, work, about |
| `/about`             | `app/about/page.tsx` — focus, experience, education |
| `/projects`          | `app/projects/page.tsx` — project grid    |
| `/projects/[project]`| project detail pages (from `app/lib/data.ts`) |
| `/blog`              | `app/blog/page.tsx` — post list           |
| `/blog/[post]`       | renders MDX from `content/blog/`          |
| `/contact`           | `app/contact/page.tsx`                     |

## Editing content

- **Profile, focus, stack, projects, experience, education** → `app/lib/data.ts`
- **Blog posts** → add an `.mdx` file to `content/blog/` with frontmatter:

  ```mdx
  ---
  title: "Post title"
  date: "2026-06-30"
  summary: "One-line summary for the list page."
  tags: ["tag-one", "tag-two"]
  ---

  Markdown body here.
  ```

- **Static assets** (images, résumé, favicon) → `public/`
- **The knot background** → `app/components/KnotBackground.tsx`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected automatically.
3. Add your custom domain (`rianbutala.xyz`) in the Vercel project settings.

No environment variables are required.
