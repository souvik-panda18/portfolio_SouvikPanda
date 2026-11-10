"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { ArrowRight, Sparkles, GraduationCap, Compass, Clock } from "lucide-react";

export default function AboutPage() {
  const { personal, education } = content;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-12"
      >
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
          About & Background
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
          About <span className="text-orange">Me.</span>
        </h1>
      </motion.div>

      {/* Split Layout: Sticky Left Portrait, Scrolling Right Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Sticky Portrait */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] bg-cream p-4 border-4 border-deep-blue shadow-hard-lg flex flex-col gap-4"
          >
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-deep-blue border-2 border-deep-blue">
              {personal.avatar ? (
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-[50%_15%]"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-black text-orange font-grotesque">
                    {personal.initials}
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-ink/80 backdrop-blur-md text-white text-xs font-mono font-bold">
                {personal.initials} • Kolkata
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-grotesque font-bold text-ink text-lg leading-tight">
                  {personal.name}
                </h3>
                <p className="text-xs text-ink/75">{personal.role}</p>
              </div>
              <Link
                href="/contact"
                className="px-3.5 py-1.5 rounded-full bg-orange text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:translate-y-[-1px] transition-transform"
              >
                Connect <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Scrolling Story Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard"
          >
            <div className="flex items-center gap-2 mb-3 text-orange">
              <Sparkles className="w-5 h-5 text-orange" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
                Engineering Journey
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-grotesque text-ink tracking-tight mb-4">
              Building scalable systems behind the scenes.
            </h2>
            <p className="text-ink/85 text-base sm:text-lg leading-relaxed max-w-prose">
              {personal.bio}
            </p>
          </motion.div>

          {/* Card 2: Signature Philosophy Quote (Warm Italic Serif - Newsreader) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-orange rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard text-ink relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-ink" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink/80">
                Guiding Philosophy
              </span>
            </div>
            <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-tight font-medium tracking-tight">
              “{personal.philosophy}”
            </blockquote>
            <p className="font-mono text-xs uppercase tracking-wider mt-4 text-ink/80 font-bold">
              — Principles of Engineering & Problem Solving
            </p>
          </motion.div>

          {/* Card 3: Now */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard"
          >
            <div className="flex items-center gap-2 mb-3 text-orange">
              <Clock className="w-5 h-5 text-orange" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
                Current Focus (Now)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-grotesque text-ink tracking-tight mb-2">
              What I&apos;m actively working on
            </h3>
            <p className="text-ink/85 text-base leading-relaxed max-w-prose">
              {personal.now}
            </p>
          </motion.div>

          {/* Card 4: Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard"
          >
            <div className="flex items-center gap-2 mb-4 text-orange">
              <GraduationCap className="w-5 h-5 text-orange" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
                Academic Background
              </span>
            </div>

            <div className="flex flex-col gap-6 divide-y divide-deep-blue/15">
              {education.map((edu, idx) => (
                <div key={edu.degree} className={idx > 0 ? "pt-5" : ""}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-grotesque font-bold text-ink text-lg sm:text-xl">
                      {edu.degree}
                    </h4>
                    <span className="font-mono text-xs font-bold text-orange">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-ink/75 mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="text-xs sm:text-sm text-ink/70 mt-2 max-w-prose">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
