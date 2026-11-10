import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content, Project } from "@/lib/content";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Layers,
  Calendar,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Cpu,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return content.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = content.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = content.projects[projectIndex];
  const nextProject: Project =
    content.projects[(projectIndex + 1) % content.projects.length];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-bold text-cream/80 hover:text-white mb-6 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform text-orange" />
        Back to projects gallery
      </Link>

      {/* Case Study Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-md bg-orange text-ink text-xs font-mono font-bold uppercase tracking-wider">
            {project.badge || project.category}
          </span>
          <span className="text-xs font-mono text-white/70">
            Case Study • {project.year}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="text-xl sm:text-2xl text-cream/90 font-medium mt-3 max-w-3xl">
          {project.oneLiner}
        </p>
      </div>

      {/* Big Cover Card */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-deep-blue border-4 border-deep-blue shadow-hard-lg mb-8">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-6 sm:p-8">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream text-ink font-grotesque font-bold text-sm shadow-hard-sm hover:translate-y-[-2px] transition-transform"
          >
            <Github className="w-4 h-4 text-orange" />
            View Source on GitHub
          </a>
        </div>
      </div>

      {/* Facts Row Card */}
      <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-deep-blue/15">
          {/* Tech Stack */}
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-orange">
              <Layers className="w-4 h-4" /> Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded bg-deep-blue/10 text-ink text-xs font-mono font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2 sm:pl-6 pt-4 sm:pt-0">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-orange">
              <UserCheck className="w-4 h-4" /> Engineering Role
            </span>
            <p className="font-grotesque font-bold text-ink text-lg">
              {project.role}
            </p>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-2 sm:pl-6 pt-4 sm:pt-0">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-orange">
              <Calendar className="w-4 h-4" /> Timeline
            </span>
            <p className="font-grotesque font-bold text-ink text-lg">
              {project.year}
            </p>
          </div>
        </div>
      </div>

      {/* Problem & Approach Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* The Problem */}
        <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-orange">
              <AlertCircle className="w-5 h-5 text-orange" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
                The Engineering Challenge
              </span>
            </div>
            <h2 className="text-2xl font-black font-grotesque text-ink tracking-tight mb-3">
              Problem Statement
            </h2>
            <p className="text-ink/85 text-base leading-relaxed">
              {project.problem}
            </p>
          </div>
        </div>

        {/* The Approach */}
        <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-orange">
              <Cpu className="w-5 h-5 text-orange" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
                System Design Strategy
              </span>
            </div>
            <h2 className="text-2xl font-black font-grotesque text-ink tracking-tight mb-3">
              Architecture & Approach
            </h2>
            <p className="text-ink/85 text-base leading-relaxed">
              {project.approach}
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Diagram Placeholder Box */}
      <div className="bg-deep-blue rounded-3xl p-6 sm:p-8 border-2 border-white/20 shadow-hard-lg mb-8 text-cream">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange mb-2 block">
          Data Flow & System Architecture
        </span>
        <h3 className="text-2xl font-black font-grotesque text-white mb-4">
          Pipeline Flow Representation
        </h3>
        <div className="bg-ink/80 rounded-2xl p-5 sm:p-6 border border-white/10 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-orange/90 whitespace-pre-wrap leading-relaxed">
            {project.architectureDiagram}
          </pre>
        </div>
      </div>

      {/* Results & Outcomes */}
      <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard mb-12">
        <div className="flex items-center gap-2 mb-3 text-orange">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
            Verification & Results
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-grotesque text-ink tracking-tight mb-3">
          Key Outcomes & Benchmarks
        </h2>
        <p className="text-ink/85 text-base sm:text-lg leading-relaxed max-w-prose">
          {project.results}
        </p>
      </div>

      {/* Navigation Footer: Next Project Button */}
      <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/projects"
          className="text-sm font-bold text-cream/70 hover:text-white transition-colors"
        >
          ← All Projects
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="px-6 py-3.5 rounded-full bg-orange text-ink font-bold font-grotesque text-sm uppercase tracking-wider border-2 border-deep-blue shadow-hard hover:translate-y-[-2px] transition-transform flex items-center gap-2 group"
        >
          Next: {nextProject.title}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
