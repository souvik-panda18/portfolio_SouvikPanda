"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { content } from "@/lib/content";
import { Menu, X, Sun, Moon, ArrowDownToLine } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", targetId: "home" },
    { label: "About", targetId: "about" },
    { label: "Projects", targetId: "projects" },
    { label: "Experience", targetId: "experience" },
    { label: "Skills", targetId: "skills" },
    { label: "Contact", targetId: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scrollspy
      const sections = ["home", "about", "projects", "experience", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(targetId);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 py-4">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 py-3 rounded-full transition-all duration-300 border border-white/15 ${
          scrolled
            ? "bg-[#10186e]/90 backdrop-blur-md shadow-hard-sm"
            : "bg-white/10 backdrop-blur-sm"
        }`}
      >
        {/* Brand Name */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 group text-white font-grotesque font-bold text-lg sm:text-xl tracking-tight"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
          <span>
            Souvik <span className="text-orange group-hover:underline">Panda</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.targetId;
            const href = pathname === "/" ? `#${link.targetId}` : `/#${link.targetId}`;

            return (
              <a
                key={link.targetId}
                href={href}
                onClick={(e) => handleNavClick(e, link.targetId)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-cream text-ink shadow-sm"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Theme Toggle & Resume */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Cobalt or Dark Mode"
            className="p-2 rounded-full text-white/90 hover:text-white bg-white/10 hover:bg-white/20 transition-all text-xs"
            title={theme === "cobalt" ? "Switch to Dark Cobalt" : "Switch to Vibrant Cobalt"}
          >
            {theme === "cobalt" ? (
              <Moon className="w-4 h-4 text-orange" />
            ) : (
              <Sun className="w-4 h-4 text-orange" />
            )}
          </button>

          <a
            href={content.personal.socials.resume}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange text-ink font-grotesque font-bold text-xs uppercase tracking-wider shadow-hard-sm hover:translate-y-[-1px] transition-transform active:translate-y-[1px]"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/90 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-cream text-ink rounded-3xl p-5 border-2 border-deep-blue shadow-hard flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              const href = pathname === "/" ? `#${link.targetId}` : `/#${link.targetId}`;

              return (
                <a
                  key={link.targetId}
                  href={href}
                  onClick={(e) => handleNavClick(e, link.targetId)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-base transition-colors ${
                    isActive ? "bg-cobalt text-white" : "hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <a
            href={content.personal.socials.resume}
            download
            className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange text-ink font-bold text-sm uppercase tracking-wider"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Download Resume (PDF)
          </a>
        </div>
      )}
    </header>
  );
}
