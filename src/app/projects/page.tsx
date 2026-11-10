"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/lib/content";
import { ArrowRight, Github, ExternalLink, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const { projects, spotlightTools } = content;
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion Scroll tracking for horizontal gallery
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical progress (0 to 1) into horizontal X translation
  // Desktop gallery has 4 project cards; we translate across ~70% of total width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-4">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
          Featured Engineering Works
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-1">
          <h1 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight">
            Featured <span className="text-orange">Projects.</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-white/70">
            Selected engineering applications and software systems
          </p>
        </div>
      </div>

      {/* Desktop: Pinned Horizontal Scroll Section */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[280vh] w-full"
      >
        <div className="sticky top-16 h-[calc(100vh-64px)] w-full overflow-hidden flex flex-col justify-center">
          {/* Progress Bar */}
          <div className="max-w-6xl mx-auto w-full px-6 mb-4">
            <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-orange rounded-full"
              />
            </div>
          </div>

          {/* Horizontally moving track */}
          <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-12 w-max">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className="w-[500px] lg:w-[580px] h-[520px] rounded-3xl bg-cream p-7 border-4 border-deep-blue shadow-hard-lg flex flex-col justify-between flex-shrink-0 group hover:translate-y-[-4px] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-md bg-deep-blue text-cream text-xs font-mono font-bold uppercase tracking-wider">
                      {project.badge || project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-ink/60">
                      0{i + 1} / 0{projects.length}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black font-grotesque text-ink tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-ink/80 leading-relaxed mb-4 line-clamp-2">
                    {project.oneLiner}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-deep-blue/10 text-ink font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Media Preview */}
                <div className="relative w-full h-56 rounded-2xl bg-deep-blue overflow-hidden border-2 border-deep-blue my-auto">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1200px) 50vw, 580px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs text-white font-mono font-semibold">
                      Role: {project.role} • {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 font-grotesque font-bold text-sm text-ink group-hover:text-orange transition-colors"
                  >
                    Read Case Study
                    <ArrowRight className="w-4 h-4 text-orange group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="p-2 rounded-full bg-deep-blue text-cream hover:bg-orange hover:text-ink transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: Vertical Stack (Responsive down to 360px) */}
      <section className="md:hidden max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="w-full rounded-3xl bg-cream p-6 border-4 border-deep-blue shadow-hard flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-deep-blue text-cream text-xs font-mono font-bold uppercase tracking-wider">
                {project.badge || project.category}
              </span>
              <span className="text-xs font-mono font-bold text-ink/60">
                0{i + 1}
              </span>
            </div>

            <h3 className="text-2xl font-black font-grotesque text-ink tracking-tight">
              {project.title}
            </h3>

            <p className="text-sm text-ink/80 leading-relaxed">
              {project.oneLiner}
            </p>

            <div className="relative w-full aspect-video rounded-2xl bg-deep-blue overflow-hidden border-2 border-deep-blue">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-deep-blue/10 text-ink font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-deep-blue/15">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 font-grotesque font-bold text-sm text-ink hover:text-orange transition-colors"
              >
                Case Study <ArrowRight className="w-4 h-4 text-orange" />
              </Link>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-deep-blue text-cream"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Spotlight Strip at Bottom of Projects Page */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="border-t border-white/15 pt-10">
          <div className="mb-6">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
              Developer Tooling
            </span>
            <h2 className="text-3xl font-black text-white font-grotesque tracking-tight mt-1">
              Spotlight Tools & Synthesizers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spotlightTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cream rounded-2xl p-5 border-2 border-deep-blue shadow-hard hover:translate-y-[-2px] transition-all flex items-start gap-4 group"
              >
                <div className="w-14 h-14 rounded-xl bg-deep-blue flex-shrink-0 relative overflow-hidden border border-deep-blue">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    sizes="56px"
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-grotesque font-bold text-ink text-base truncate">
                      {tool.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-ink/60 group-hover:text-orange transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-xs text-ink/75 mt-0.5 line-clamp-2">
                    {tool.desc}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-orange/20 text-ink">
                    {tool.tag}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
