"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { content } from "@/lib/content";
import { Terminal, Database, Brain, Wrench, Sparkles, Code, Cpu, Compass } from "lucide-react";

export default function SkillsPage() {
  const { skills } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  // Springs for subtle cursor drift
  const mouseX = useSpring(0, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    // Check if device supports true hover (disable drift on touch)
    const isHoverable = window.matchMedia("(hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanHover(isHoverable && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const diffX = (e.clientX - centerX) / (rect.width / 2);
    const diffY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(diffX * 12);
    mouseY.set(diffY * 12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getGroupIcon = (name: string) => {
    if (name.includes("Language")) return <Code className="w-5 h-5 text-orange" />;
    if (name.includes("Backend")) return <Terminal className="w-5 h-5 text-orange" />;
    if (name.includes("Frontend")) return <Sparkles className="w-5 h-5 text-orange" />;
    if (name.includes("Oracle") || name.includes("Enterprise")) return <Cpu className="w-5 h-5 text-orange" />;
    if (name.includes("Database")) return <Database className="w-5 h-5 text-orange" />;
    if (name.includes("AI") || name.includes("Machine")) return <Brain className="w-5 h-5 text-orange" />;
    if (name.includes("Exploring")) return <Compass className="w-5 h-5 text-orange" />;
    return <Wrench className="w-5 h-5 text-orange" />;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
    >
      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
          Technical Competencies
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
          Technical <span className="text-orange">Skills.</span>
        </h1>
        <p className="text-sm sm:text-base text-cream/80 mt-2 font-medium">
          Core proficiencies across programming languages, backend systems, databases, and enterprise cloud technologies.
        </p>
      </div>

      {/* Grouped Skills Cloud */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skills.map((group, groupIdx) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all ${
              group.isOracleSpotlight
                ? "bg-cream border-4 border-orange shadow-[6px_6px_0px_#ff7a2f] ring-2 ring-orange/30"
                : "bg-cream border-2 border-deep-blue shadow-hard"
            }`}
          >
            {group.isOracleSpotlight && (
              <div className="absolute top-0 right-0 bg-orange text-ink font-mono text-[10px] uppercase font-black px-3.5 py-1 rounded-bl-xl tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-ink" /> Enterprise Spotlight
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {getGroupIcon(group.name)}
                <h2 className="text-2xl font-black font-grotesque text-ink tracking-tight">
                  {group.name}
                </h2>
              </div>

              {/* Chips Cloud */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, skillIdx) => {
                  return (
                    <motion.span
                      key={skill}
                      style={
                        canHover
                          ? {
                              x: mouseX,
                              y: mouseY,
                            }
                          : undefined
                      }
                      whileHover={{ scale: 1.06, rotate: skillIdx % 2 === 0 ? 1 : -1 }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border shadow-hard-sm cursor-default transition-colors ${
                        group.isOracleSpotlight
                          ? "bg-deep-blue text-cream border-orange hover:bg-orange hover:text-ink font-bold"
                          : "bg-deep-blue text-cream border-deep-blue hover:bg-orange hover:text-ink"
                      }`}
                    >
                      <Sparkles className={`w-3 h-3 ${group.isOracleSpotlight ? "text-orange" : "text-orange/90"}`} />
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-deep-blue/15 flex items-center justify-between text-xs font-mono text-ink/65">
              <span>{group.skills.length} core proficiencies</span>
              <span>Group 0{groupIdx + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
