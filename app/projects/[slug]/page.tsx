import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, Zap } from "lucide-react";
import { getProjectBySlug, getRelatedProjects, projects } from "@/app/data/portfolio";
import { notFound } from "next/navigation";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Pranshu Chauhan",
    };
  }

  return {
    title: `${project.title} | Projects | Pranshu Chauhan`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project, 2);

  return (
    <div className="relative">
      {/* Animated background blur */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-indigo-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[90px]" />

      <section className="section relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="text-gray-500 dark:text-slate-400 transition hover:text-gray-900 dark:text-white">
                Home
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li>
              <Link href="/projects" className="text-gray-500 dark:text-slate-400 transition hover:text-gray-900 dark:text-white">
                Projects
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">{project.title}</li>
          </ol>
        </nav>

        {/* Hero Image */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 backdrop-blur">
          <div className="relative h-72 w-full sm:h-96 lg:h-125">
            <Image
              src={project.image}
              alt={`${project.title} hero preview`}
              fill
              priority
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-transparent to-cyan-500/10" />
          </div>
        </div>

        {/* Main Content */}
        <article className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-10">
          <div>
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-indigo-300">
                  <Zap className="mr-2 h-4 w-4" />
                  {project.category}
                </span>
              </div>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-slate-300 sm:mt-6 sm:text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-10">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Tech Stack</h2>
              <div className="flex flex-wrap gap-2.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/7 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 transition hover:bg-gray-100 dark:bg-white/12 hover:border-indigo-400/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-5 backdrop-blur sm:p-8">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-indigo-400" />
                Project Highlights
              </h2>
              <ul className="mt-6 space-y-4">
                {project.highlights.map((point, index) => (
                  <li key={point} className="flex gap-4">
                    <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-300">
                      {index + 1}
                    </span>
                    <span className="text-gray-600 dark:text-slate-300 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-6 text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-cyan-400" />
                  Gallery
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.gallery.map((image, index) => (
                    <div
                      key={`${project.slug}-${index}`}
                      className="group relative h-64 overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 backdrop-blur"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} gallery ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent transition duration-300 group-hover:from-black/20" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit">
            {/* Quick Links Card */}
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-5 backdrop-blur sm:p-6 lg:sticky lg:top-32">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-6">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 w-full items-center justify-between rounded-xl border border-indigo-400/30 bg-indigo-500/15 px-4 py-3 text-sm font-semibold text-indigo-200 transition hover:border-indigo-400/50 hover:bg-indigo-500/25"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 w-full items-center justify-between rounded-xl border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/7 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-slate-200 transition hover:border-white/25 hover:bg-gray-100 dark:bg-white/12"
                >
                  <span>Source Code</span>
                  <Github className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/projects"
                  className="group flex min-h-11 w-full items-center justify-between rounded-xl border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/7 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-slate-200 transition hover:bg-gray-100 dark:bg-white/12"
                >
                  <span>All Projects</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </aside>
        </article>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-10 text-3xl font-bold text-foreground flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-indigo-400 to-cyan-400" />
              Related Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 backdrop-blur p-6 transition hover:border-indigo-400/30 hover:bg-gray-100 dark:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">{item.category}</p>
                      <h3 className="mt-2 text-xl font-bold text-foreground group-hover:text-indigo-300 transition">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500 dark:text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-300 shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
