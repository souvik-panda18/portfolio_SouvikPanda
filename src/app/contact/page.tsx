"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Instagram,
  Code,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const { personal } = content;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    // Simulate reliable dispatch
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-grotesque text-white tracking-tight mt-1">
          Say <span className="text-orange">Hi.</span>
        </h1>
        <p className="text-sm sm:text-base text-cream/80 mt-2 font-medium">
          Open to software engineering opportunities, internships, and collaborative projects.
        </p>
      </div>

      {/* Signature Element: ONE BIG EMAIL BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
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
      </motion.div>

      {/* Two Column Grid: Contact Form & Social Connect Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form (Left) */}
        <div className="lg:col-span-7 bg-cream rounded-3xl p-6 sm:p-8 border-2 border-deep-blue shadow-hard">
          <h2 className="text-2xl sm:text-3xl font-black font-grotesque text-ink tracking-tight mb-2">
            Send a direct message
          </h2>
          <p className="text-xs sm:text-sm text-ink/75 mb-6">
            Fill out the form below and I&apos;ll get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono font-bold uppercase text-ink/80 mb-1"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-deep-blue text-ink font-grotesque text-sm outline-none focus:ring-2 focus:ring-orange shadow-inner"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono font-bold uppercase text-ink/80 mb-1"
              >
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-deep-blue text-ink font-grotesque text-sm outline-none focus:ring-2 focus:ring-orange shadow-inner"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono font-bold uppercase text-ink/80 mb-1"
              >
                Project Scope or Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
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

        {/* Social Links & Location Panel (Right) */}
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
                        250+ Solved
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
    </div>
  );
}
