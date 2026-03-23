# Full Stack Engineer Portfolio

A premium dark-themed portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Multi-page routing with route-level SEO metadata
- Responsive hero, about, skills, projects, experience, stats, and contact pages
- Smooth animations and micro-interactions powered by Framer Motion
- Project filter tabs (Web, Mobile, AI/ML)
- Dynamic project detail routes with breadcrumbs (`/projects/[slug]`)
- API route for contact form validation and submission
- Modern glassmorphism UI with strong accessibility and performance defaults

## Route Map

- `/` Home (hero + highlights + featured projects)
- `/about` About page
- `/projects` Project listing with filters
- `/projects/[slug]` Dynamic project details
- `/skills` Skills page
- `/experience` Experience timeline
- `/contact` Contact page

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React Icons

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Open http://localhost:3000

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Use default Next.js build settings:
	- Build command: `npm run build`
	- Output directory: `.next`
4. Deploy.

## Customization Checklist

- Replace placeholder profile/project SVG assets in [public/projects](public/projects)
- Replace social links and personal details in [app/data/portfolio.ts](app/data/portfolio.ts)
- Replace resume file [public/resume.txt](public/resume.txt) with your real PDF
- Update site metadata in [app/layout.tsx](app/layout.tsx)
- Add/edit page-level metadata in each route file under [app](app)

## Contact Form Backend Extension

The API endpoint is available at [app/api/contact/route.ts](app/api/contact/route.ts). You can extend it with MongoDB, Nodemailer, or Resend for production message delivery.
