import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="section">
      <div className="rounded-3xl border border-white/10 bg-secondary/60 p-10 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Project not found</h1>
        <p className="mt-3 text-sm text-slate-300">
          The project you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Back to projects
        </Link>
      </div>
    </section>
  );
}
