"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { content } from "@/lib/content";
import { GraduationCap, Award, Cpu, Sparkles, Terminal, Briefcase } from "lucide-react";

export default function ExperiencePage() {
  const { timeline } = content;
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to draw center line as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const getIcon = (category: string) => {
    switch (category) {
      case "work":
        return <Briefcase className="w-5 h-5 text-orange" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-orange" />;
      case "project":
        return <Cpu className="w-5 h-5 text-orange" />;
      case "milestone":
        return <Award className="w-5 h-5 text-orange" />;
      default:
        return <Sparkles className="w-5 h-5 text-orange" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
          Career & Learning Milestones
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
          Experience & <span className="text-orange">Milestones.</span>
        </h1>
        <p className="text-sm sm:text-base text-cream/80 mt-3 font-medium">
          A chronologic journey through my education, roles, and technical achievements.
        </p>
      </div>

      {/* Zig-Zag Timeline Container */}
      <div ref={containerRef} className="relative w-full pb-16">
        {/* Background track line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-white/15 rounded-full" />

        {/* Dynamic drawing line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-orange origin-top rounded-full shadow-[0_0_12px_#ff7a2f]"
        />

        {/* Timeline Items */}
        <div className="flex flex-col gap-10 md:gap-16">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.title + item.year}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-6 md:gap-12`}
              >
                {/* Center Node / Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10 w-9 h-9 rounded-full bg-cream border-4 border-deep-blue shadow-hard-sm flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange" />
                </div>

                {/* Card on Left or Right */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`w-full pl-14 md:pl-0 md:w-1/2 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="bg-cream rounded-3xl p-6 sm:p-7 border-2 border-deep-blue shadow-hard hover:translate-y-[-2px] transition-transform flex flex-col gap-2">
                    <div
                      className={`flex items-center gap-2 ${
                        isEven ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {getIcon(item.category)}
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-grotesque font-black text-ink text-xl sm:text-2xl leading-tight">
                      {item.title}
                    </h3>

                    <p className="font-semibold text-xs sm:text-sm text-ink/75">
                      {item.institution}
                    </p>

                    <p className="text-xs sm:text-sm text-ink/80 leading-relaxed mt-1 max-w-prose">
                      {item.description}
                    </p>

                    {/* Detailed Bullet Points */}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2 text-xs sm:text-sm text-ink/85 text-left">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technology Pills */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div
                        className={`mt-4 pt-3 border-t border-deep-blue/15 flex flex-wrap gap-1.5 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-deep-blue text-cream text-[11px] font-mono font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Spacer for empty side on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
