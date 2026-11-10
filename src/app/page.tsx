"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { content, Project } from "@/lib/content";
import {
  ArrowRight,
  ArrowDownToLine,
  ExternalLink,
  Sparkles,
  Github,
  Linkedin,
  Instagram,
  Code,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Compass,
  Clock,
  Terminal,
  Database,
  Brain,
  Wrench,
  Mail,
  Copy,
  Check,
  Send,
  Cpu,
  Award,
  Briefcase,
} from "lucide-react";

export default function SinglePagePortfolio() {
  const { personal, education, projects, spotlightTools, timeline, skills } = content;

  // Project Category Tab State
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & Databases" },
    { id: "fullstack", label: "Full Stack & Web" },
    { id: "robotics", label: "Robotics & Hardware" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "ai")
      return (
        project.category.toLowerCase().includes("ai") ||
        project.category.toLowerCase().includes("computer vision")
      );
    if (activeTab === "fullstack")
      return project.category.toLowerCase().includes("full stack");
    if (activeTab === "robotics")
      return (
        project.category.toLowerCase().includes("robotics") ||
        project.category.toLowerCase().includes("engineering")
      );
    return true;
  });

  // Projects Horizontal Scroll State
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkProjectScroll = () => {
    if (!projectsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = projectsScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollProjects = (direction: "left" | "right") => {
    if (!projectsScrollRef.current) return;
    const offset = direction === "left" ? -460 : 460;
    projectsScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  useEffect(() => {
    checkProjectScroll();
  }, [activeTab]);

  // Timeline Scroll Animation for center line
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 80%"],
  });
  const lineScaleY = useSpring(timelineProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  // Skills Cursor Drift
  const skillsRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const mouseX = useSpring(0, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const isHoverable = window.matchMedia("(hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanHover(isHoverable && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !skillsRef.current) return;
    const rect = skillsRef.current.getBoundingClientRect();
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

  // Contact Form & Email Copy States
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormState("error");
      return;
    }
    setFormState("submitting");
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    }, 600);
  };

  const getTimelineIcon = (category: string) => {
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

  const getSkillGroupIcon = (name: string) => {
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
    <div className="w-full flex flex-col gap-24 sm:gap-32 px-4 sm:px-6 max-w-6xl mx-auto py-6 sm:py-10">

      {/* ===================================================================
          1. HERO SECTION (#home)
          =================================================================== */}
      <section id="home" className="pt-2 sm:pt-6 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Giant Reveal Headlines */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-cream text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-orange" />
                Software &amp; Systems Engineer
              </span>

              {/* Giant Two-Line Name */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-grotesque tracking-tighter leading-[0.9] text-white">
                <span className="block">{personal.firstName}</span>
                <span className="block text-orange">{personal.lastName}</span>
              </h1>
            </motion.div>

            {/* Role line */}
            <p className="text-xl sm:text-2xl text-cream/90 font-medium max-w-xl leading-snug">
              {personal.heroRoleLine}
            </p>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {personal.skillChips.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-deep-blue text-cream text-xs font-semibold border border-white/15 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-full bg-cream text-ink font-bold font-grotesque text-sm uppercase tracking-wider border-2 border-deep-blue shadow-hard hover:translate-y-[-2px] transition-transform flex items-center gap-2 group"
              >
                Get in touch
                <ArrowRight className="w-4 h-4 text-orange group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3.5 rounded-full bg-white/10 text-white hover:text-ink hover:bg-cream border-2 border-white/20 hover:border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3.5 rounded-full bg-white/10 text-white hover:text-ink hover:bg-cream border-2 border-white/20 hover:border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {personal.socials.instagram && (
                <a
                  href={personal.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-3.5 rounded-full bg-white/10 text-white hover:text-ink hover:bg-cream border-2 border-white/20 hover:border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              <a
                href={personal.socials.resume}
                download
                className="px-5 py-3.5 rounded-full bg-orange text-ink font-bold font-grotesque text-sm uppercase tracking-wider border-2 border-deep-blue shadow-hard hover:translate-y-[-2px] transition-transform flex items-center gap-2"
              >
                <ArrowDownToLine className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Column: Tilted Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-[28px] bg-orange p-3 border-4 border-deep-blue shadow-hard-lg overflow-hidden group">
              <div className="relative w-full h-full rounded-[20px] bg-cream border-2 border-deep-blue overflow-hidden flex flex-col justify-between p-5">
                <div className="relative w-full h-4/5 rounded-2xl overflow-hidden bg-deep-blue flex items-center justify-center border border-deep-blue">
                  {personal.heroAvatar || personal.avatar ? (
                    <Image
                      src={personal.heroAvatar || personal.avatar}
                      alt={personal.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <span className="text-7xl font-black text-orange font-grotesque">
                      {personal.initials}
                    </span>
                  )}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-ink/80 backdrop-blur-md text-white text-xs font-mono font-bold">
                    {personal.initials}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="font-grotesque font-bold text-ink text-sm leading-tight">
                      {personal.name}
                    </p>
                    <p className="text-xs text-ink/70">{personal.role}</p>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience Highlights Strip (4 Cards under Name & Photo) */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personal.stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden bg-cream rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-deep-blue shadow-hard hover:shadow-hard-lg hover:border-orange flex flex-col justify-between transition-all duration-300 group cursor-pointer"
            >
              {/* Top Accent Highlight Bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange via-amber-400 to-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange/20 text-ink group-hover:bg-orange group-hover:text-ink transition-colors duration-200">
                    {stat.tag}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-orange/15 border border-deep-blue/10 flex items-center justify-center group-hover:bg-orange group-hover:border-deep-blue group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {i === 0 && <Briefcase className="w-4 h-4 text-orange group-hover:text-ink transition-colors" />}
                    {i === 1 && <Cpu className="w-4 h-4 text-orange group-hover:text-ink transition-colors" />}
                    {i === 2 && <Brain className="w-4 h-4 text-orange group-hover:text-ink transition-colors" />}
                    {i === 3 && <Terminal className="w-4 h-4 text-orange group-hover:text-ink transition-colors" />}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black font-grotesque text-ink tracking-tight leading-snug group-hover:text-orange transition-colors duration-200">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-ink/85 mt-1">
                  {stat.label}
                </div>
              </div>
              <p className="text-xs text-ink/70 mt-3 pt-3 border-t border-deep-blue/10 group-hover:border-orange/30 group-hover:text-ink/90 transition-colors duration-200 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          2. ABOUT SECTION (#about)
          =================================================================== */}
      <section id="about" className="scroll-mt-28">
        <div className="mb-8 sm:mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
            01 / Background & Narrative
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
            About <span className="text-orange">Me.</span>
          </h2>
        </div>

        {/* Split Layout: Left sticky card, right scrolling story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Sticky Portrait Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-cream p-4 border-4 border-deep-blue shadow-hard-lg flex flex-col gap-4">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-deep-blue border-2 border-deep-blue">
                {personal.avatar ? (
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-[50%_15%]"
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
                <a
                  href="#contact"
                  className="px-3.5 py-1.5 rounded-full bg-orange text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:translate-y-[-1px] transition-transform"
                >
                  Connect <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Scrolling Story Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Bio Card */}
            <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard">
              <div className="flex items-center gap-2 mb-3 text-orange">
                <Sparkles className="w-5 h-5 text-orange" />
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-ink">
                  Engineering Journey
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-grotesque text-ink tracking-tight mb-4">
                Building scalable systems behind the scenes.
              </h3>
              <p className="text-ink/85 text-base sm:text-lg leading-relaxed max-w-prose">
                {personal.bio}
              </p>
            </div>

            {/* Signature Philosophy Quote (Newsreader Italic) */}
            <div className="bg-orange rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard text-ink relative overflow-hidden">
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
            </div>

            {/* Now Card */}
            <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard">
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
            </div>

            {/* Education Card */}
            <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard">
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
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. PROJECTS SECTION (#projects) WITH TABS
          =================================================================== */}
      <section id="projects" className="scroll-mt-28">
        <div className="mb-8">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
            02 / Engineering Showcase
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-1">
            <h2 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight">
              Selected <span className="text-orange">Projects.</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-white/70">
              Interactive category tabs • Direct GitHub repos
            </p>
          </div>
        </div>

        {/* Controls row: Category Filter Tabs on left, Sidewise Navigation Arrows on right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  if (projectsScrollRef.current) {
                    projectsScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                  }
                }}
                className={`px-4 py-2 rounded-full font-grotesque text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-2 ${
                  activeTab === cat.id
                    ? "bg-cream text-ink border-deep-blue shadow-hard-sm"
                    : "bg-white/10 text-white/80 border-white/15 hover:bg-white/20 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono font-bold text-white/60 hidden sm:inline-block mr-1">
              Side-wise scroll
            </span>
            <button
              onClick={() => scrollProjects("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll projects left"
              className="w-10 h-10 rounded-full bg-cream text-ink border-2 border-deep-blue shadow-hard-sm flex items-center justify-center hover:bg-orange hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-cream"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollProjects("right")}
              disabled={!canScrollRight}
              aria-label="Scroll projects right"
              className="w-10 h-10 rounded-full bg-cream text-ink border-2 border-deep-blue shadow-hard-sm flex items-center justify-center hover:bg-orange hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-cream"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Side-wise Scroll Track */}
        <div
          ref={projectsScrollRef}
          onScroll={checkProjectScroll}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#ff7a2f_rgba(255,255,255,0.1)] -mx-4 px-4 sm:-mx-6 sm:px-6"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-[88vw] sm:w-[440px] md:w-[480px] flex-shrink-0 snap-start rounded-3xl bg-cream p-6 sm:p-7 border-4 border-deep-blue shadow-hard hover:shadow-hard-lg hover:border-orange flex flex-col justify-between group hover:translate-y-[-3px] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-md bg-deep-blue text-cream text-xs font-mono font-bold uppercase tracking-wider group-hover:bg-orange group-hover:text-ink transition-colors">
                    {project.badge || project.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-ink/60">
                    0{i + 1} / 0{filteredProjects.length}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-grotesque text-ink tracking-tight mb-2 group-hover:text-orange transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-ink/80 leading-relaxed mb-4 min-h-[40px]">
                  {project.oneLiner}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-deep-blue/10 text-ink font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Card Media Preview */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-deep-blue overflow-hidden border-2 border-deep-blue my-2">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 88vw, 480px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs text-white font-mono font-semibold">
                      {project.role} • {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 flex items-center justify-between border-t border-deep-blue/15 mt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-grotesque font-bold text-sm text-ink group-hover:text-orange transition-colors"
                  >
                    Read Case Study
                    <ArrowRight className="w-4 h-4 text-orange group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="p-2.5 rounded-full bg-deep-blue text-cream hover:bg-orange hover:text-ink transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Navigation Hint */}
        <div className="flex items-center justify-between mt-2 text-xs font-mono text-white/50 px-1">
          <span>← Swipe sideways or click arrow buttons to explore →</span>
          <span>{filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}</span>
        </div>

        {/* Spotlight Tools Strip */}
        <div className="mt-12 bg-cream/10 rounded-3xl p-6 sm:p-8 border border-white/15">
          <div className="mb-6">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
              Developer Tooling
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-grotesque tracking-tight mt-1">
              Spotlight Tools & Synthesizers
            </h3>
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
                    <h4 className="font-grotesque font-bold text-ink text-base truncate">
                      {tool.title}
                    </h4>
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

      {/* ===================================================================
          4. EXPERIENCE SECTION (#experience)
          =================================================================== */}
      <section id="experience" className="scroll-mt-28">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
            03 / Timeline & Milestones
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
            Experience & <span className="text-orange">Milestones.</span>
          </h2>
          <p className="text-sm sm:text-base text-cream/80 mt-2 font-medium">
            A chronologic journey through my education, roles, and technical achievements.
          </p>
        </div>

        {/* Dynamic Zig-Zag Timeline */}
        <div ref={timelineRef} className="relative w-full pb-8">
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-white/15 rounded-full" />
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-orange origin-top rounded-full shadow-[0_0_12px_#ff7a2f]"
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.title + item.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-6 md:gap-12`}
                >
                  {/* Center Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10 w-9 h-9 rounded-full bg-cream border-4 border-deep-blue shadow-hard-sm flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange" />
                  </div>

                  {/* Card Content */}
                  <div
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
                        {getTimelineIcon(item.category)}
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
                  </div>

                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SKILLS SECTION (#skills)
          =================================================================== */}
      <section
        id="skills"
        ref={skillsRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="scroll-mt-28"
      >
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
            04 / Technical Competencies
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
            Technical <span className="text-orange">Skills.</span>
          </h2>
          <p className="text-sm sm:text-base text-cream/80 mt-2 font-medium">
            Core proficiencies across programming languages, backend systems, databases, and enterprise cloud technologies.
          </p>
        </div>

        {/* 8 Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skills.map((group, groupIdx) => {
            const isOracle = !!group.isOracleSpotlight;
            return (
              <div
                key={group.name}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative overflow-hidden ${
                  isOracle
                    ? "bg-cream border-4 border-orange shadow-[6px_6px_0px_#ff7a2f] ring-2 ring-orange/30"
                    : "bg-cream border-2 border-deep-blue shadow-hard"
                }`}
              >
                {isOracle && (
                  <div className="absolute top-0 right-0 bg-orange text-ink font-mono text-[10px] uppercase font-black px-3.5 py-1 rounded-bl-xl tracking-wider shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-ink" /> Enterprise Spotlight
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {getSkillGroupIcon(group.name)}
                    <h3 className="text-2xl font-black font-grotesque text-ink tracking-tight">
                      {group.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill, skillIdx) => (
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
                        whileHover={{ scale: 1.05, rotate: skillIdx % 2 === 0 ? 1 : -1 }}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border shadow-hard-sm cursor-default transition-colors ${
                          isOracle
                            ? "bg-deep-blue text-cream border-orange hover:bg-orange hover:text-ink font-bold"
                            : "bg-deep-blue text-cream border-deep-blue hover:bg-orange hover:text-ink"
                        }`}
                      >
                        <Sparkles className={`w-3 h-3 ${isOracle ? "text-orange" : "text-orange/90"}`} />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div
                  className={`pt-6 mt-6 border-t flex items-center justify-between text-xs font-mono ${
                    isOracle
                      ? "border-orange/20 text-ink/80 font-bold"
                      : "border-deep-blue/15 text-ink/65"
                  }`}
                >
                  <span>{group.skills.length} core proficiencies</span>
                  <span>Group 0{groupIdx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          6. CONTACT SECTION (#contact)
          =================================================================== */}
      <section id="contact" className="scroll-mt-28">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
            05 / Get In Touch
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
            Say <span className="text-orange">Hi.</span>
          </h2>
          <p className="text-sm sm:text-base text-cream/80 mt-2 font-medium">
            Open to software engineering opportunities, internships, and collaborative projects.
          </p>
        </div>

        {/* Signature ONE BIG EMAIL BUTTON */}
        <div className="mb-8">
          <button
            onClick={handleCopyEmail}
            className="w-full bg-cream rounded-3xl p-6 sm:p-10 border-4 border-deep-blue shadow-hard-lg hover:translate-y-[-3px] transition-transform flex flex-col sm:flex-row items-center justify-between gap-4 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange flex items-center justify-center border-2 border-deep-blue text-ink flex-shrink-0 shadow-hard-sm">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/70">
                  Direct Email Inquiries
                </span>
                <p className="font-grotesque font-black text-xl sm:text-3xl text-ink tracking-tight break-all">
                  {personal.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-deep-blue text-cream font-bold font-grotesque text-sm shadow-sm group-hover:bg-orange group-hover:text-ink transition-colors flex-shrink-0">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Copied to clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Click to copy address
                </>
              )}
            </div>
          </button>
        </div>

        {/* Two Column Grid: Contact Form & Social Connect Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard">
            <h3 className="text-2xl sm:text-3xl font-black font-grotesque text-ink tracking-tight mb-2">
              Send a direct message
            </h3>
            <p className="text-xs sm:text-sm text-ink/75 mb-6">
              Fill out the form below and I&apos;ll get back to you promptly.
            </p>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono font-bold uppercase text-ink/80 mb-1"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-deep-blue text-ink font-grotesque text-sm outline-none focus:ring-2 focus:ring-orange shadow-inner"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono font-bold uppercase text-ink/80 mb-1"
                >
                  Your Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-deep-blue text-ink font-grotesque text-sm outline-none focus:ring-2 focus:ring-orange shadow-inner"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono font-bold uppercase text-ink/80 mb-1"
                >
                  Project Scope or Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Souvik, I would like to discuss an opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-deep-blue text-ink font-grotesque text-sm outline-none focus:ring-2 focus:ring-orange shadow-inner resize-y"
                />
              </div>

              {formState === "error" && (
                <div className="p-3 rounded-xl bg-red-100 border border-red-400 text-red-700 text-xs font-semibold">
                  Please fill out all fields before submitting.
                </div>
              )}

              {formState === "success" && (
                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="mt-2 w-full py-4 rounded-xl bg-orange text-ink font-bold font-grotesque text-sm uppercase tracking-wider border-2 border-deep-blue shadow-hard hover:translate-y-[-2px] transition-transform flex items-center justify-center gap-2"
              >
                {formState === "submitting" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Channels Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange">
                  Professional Channels
                </span>
                <h3 className="text-2xl font-black font-grotesque text-ink tracking-tight mt-1 mb-4">
                  Connect Online
                </h3>

                <div className="flex flex-col gap-3">
                  <a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-deep-blue text-ink hover:bg-deep-blue hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-orange" />
                      <div>
                        <p className="font-bold text-sm">GitHub</p>
                        <p className="text-xs text-ink/70 group-hover:text-cream/70">
                          @souvik-panda18
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange" />
                  </a>

                  <a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-deep-blue text-ink hover:bg-deep-blue hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-orange" />
                      <div>
                        <p className="font-bold text-sm">LinkedIn</p>
                        <p className="text-xs text-ink/70 group-hover:text-cream/70">
                          /in/souvik-panda
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange" />
                  </a>

                  <a
                    href={personal.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-deep-blue text-ink hover:bg-deep-blue hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-orange" />
                      <div>
                        <p className="font-bold text-sm">LeetCode</p>
                        <p className="text-xs text-ink/70 group-hover:text-cream/70">
                          @Souvik_panda
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange" />
                  </a>

                  {personal.socials.instagram && (
                    <a
                      href={personal.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-deep-blue text-ink hover:bg-deep-blue hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-orange" />
                        <div>
                          <p className="font-bold text-sm">Instagram</p>
                          <p className="text-xs text-ink/70 group-hover:text-cream/70">
                            @craftwithpanda
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange" />
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-deep-blue/15 text-xs font-mono text-ink/75 flex items-center justify-between">
                <span>Timezone: IST (UTC+5:30)</span>
                <span>Based in Kolkata</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
