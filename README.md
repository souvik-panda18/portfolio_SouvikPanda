# Souvik Panda — Multi-Page Personal Portfolio

A distinctive multi-page developer portfolio website built for **Souvik Panda**, Software Engineer from Kolkata.

Designed with a bold editorial visual language: **Cobalt & Dark Cobalt** background, **Cream** cards with hard offset shadows, **Deep Blue** borders, **Orange** accents, and **Ink** typography. Each page features a uniquely crafted layout inspired by the architectural concept wireframe.

---

## ⚡ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens & hard offset shadows
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) inertial scrolling on every route (respects `prefers-reduced-motion`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (load reveals, scroll-linked progress, interactive cursor drift)
- **Typography**:
  - **Bricolage Grotesque** (Tight, heavy grotesque headlines)
  - **Newsreader** (Warm italic serif exclusively for quotes & philosophy)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Zero-configuration deployment on [Vercel](https://vercel.com/)

---

## 📂 Page Layouts & Architectural Highlights

1. **`/` (Home)**:
   - Full-screen hero with giant two-line name (`Souvik` / `Panda` in orange).
   - Role line: *"I build robust backend systems and intelligent applications."*
   - Skill chips, primary call-to-actions, and social links.
   - Slightly tilted portrait card (`rotate-3`, hover un-tilt) with avatar/monogram.
   - Four-card statistics strip (250+ LeetCode, 30+ Repos, B.Tech ECE).
   - Spotlight strip featuring utilities (*Web Audio Drummer*, *Link-to-QR Generator*).

2. **`/about` (About)**:
   - **Split layout**: Left portrait is pinned sticky (`lg:sticky lg:top-28`).
   - Right column scrolls past: Bio narrative, Guiding Philosophy quote in warm Newsreader italic, Now section, and Academic Education (RCCIIT & Ballygunge Govt. High School).

3. **`/projects` (Projects)**:
   - **Pinned horizontal-scroll gallery** on desktop. Vertical scroll moves project cards sideways with a real-time progress bar.
   - Automatically degrades into a clean responsive vertical stack on mobile (tested down to 360px).
   - Links to detailed case studies.

4. **`/projects/[slug]` (Case Study Template)**:
   - Big cover image, facts summary row (Stack, Role, Year).
   - Problem statement, engineering approach, system architecture pipeline flow, and verifiable benchmarks.
   - Direct link to GitHub repository and a *"Next Project"* navigation button.

5. **`/experience` (Experience & Timeline)**:
   - **Zig-zag vertical timeline** with alternating left/right milestone cards.
   - Dynamic vertical center line that draws itself smoothly as you scroll down the page.

6. **`/skills` (Skills)**:
   - Grouped chip clouds: *Backend*, *Databases & Systems*, *AI & Machine Learning*, and *Developer Tools*.
   - Chips drift subtly with cursor movement (automatically disabled on touch devices and for reduced motion).

7. **`/contact` (Contact)**:
   - **One big email button** (`souvikpanda.work@gmail.com`) with one-click clipboard copy.
   - Working contact form with validation and animated success/error states.
   - Direct links to GitHub, LinkedIn, and LeetCode profiles.

---

## ✏️ How to Edit Content Easily

All textual data, project information, milestones, and links are stored in a single file:

```bash
src/lib/content.ts
```

Simply update `src/lib/content.ts` to add new projects, update bio information, or change statistics. The changes will automatically propagate across all pages.

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel (1-Click)

### Via GitHub (Recommended)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Multi-page Next.js portfolio"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Select your repository `portfolio_SouvikPanda` and click **Import**.
4. Leave settings as default (Framework: **Next.js**).
5. Click **Deploy**. Vercel will build and assign an SSL domain automatically.

### Via Vercel CLI
```bash
npx vercel
```
