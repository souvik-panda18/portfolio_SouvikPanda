import Link from "next/link";
import { content } from "@/lib/content";
import { Github, Linkedin, Code, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 py-12 mt-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-grotesque font-bold text-lg text-white">
            Souvik <span className="text-orange">Panda</span>
          </p>
          <p className="text-white/70 text-sm mt-1">
            Software &amp; Systems Engineer • India • Oracle Cloud &amp; Backend Development
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={content.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-full bg-cream text-ink flex items-center justify-center border-2 border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-transform"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={content.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-full bg-cream text-ink flex items-center justify-center border-2 border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-transform"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={content.personal.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode Profile"
            className="w-10 h-10 rounded-full bg-cream text-ink flex items-center justify-center border-2 border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-transform"
          >
            <Code className="w-5 h-5" />
          </a>
          {content.personal.socials.instagram && (
            <a
              href={content.personal.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-10 h-10 rounded-full bg-cream text-ink flex items-center justify-center border-2 border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-transform"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          <a
            href={`mailto:${content.personal.email}`}
            aria-label="Send Email"
            className="w-10 h-10 rounded-full bg-orange text-ink flex items-center justify-center border-2 border-deep-blue shadow-hard-sm hover:translate-y-[-2px] transition-transform"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
        <p>&copy; {new Date().getFullYear()} Souvik Panda. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="/#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="/#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="/#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="/#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
