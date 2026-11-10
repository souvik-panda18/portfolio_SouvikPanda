export interface Project {
  slug: string;
  title: string;
  badge?: string;
  category: string;
  cover: string;
  oneLiner: string;
  stack: string[];
  role: string;
  year: string;
  repoUrl: string;
  demoUrl?: string | null;
  problem: string;
  approach: string;
  architectureDiagram: string;
  results: string;
}

export interface SpotlightTool {
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  url: string;
  image: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  category: "work" | "education" | "milestone" | "project";
  bullets?: string[];
  technologies?: string[];
}

export interface SkillGroup {
  name: string;
  isOracleSpotlight?: boolean;
  skills: string[];
}

export const content = {
  personal: {
    name: "Souvik Panda",
    firstName: "Souvik",
    lastName: "Panda",
    initials: "SP",
    role: "Systems Engineer @ Trinamix",
    location: "India",
    heroRoleLine:
      "Software Engineer | Oracle Cloud & Enterprise Applications | Backend Development | AI/LLM Integration",
    bio: "I'm Souvik Panda, a Software Engineer with a background in Electronics and Communication Engineering. My interests revolve around backend engineering, database systems, and building intelligent applications. I enjoy working with Python, JavaScript, FastAPI, Node.js, and SQL, while exploring how AI and LLM-powered tools can solve practical engineering problems.\n\nOutside of development, I'm continuously learning, experimenting with new technologies, and solving Data Structures and Algorithms problems to strengthen my engineering fundamentals.",
    philosophy: "Build things that work, understand why they work, and keep improving them.",
    now: "Focusing on Oracle Cloud enterprise solutions (Oracle APEX, SQL/PL-SQL, OIC, VBCS, BIP, OTBI, FDI) and building AI-driven SQL automation tooling with Gemini and Claude APIs.",
    email: "souvikpanda.work@gmail.com",
    heroAvatar: "/hero.jpg",
    avatar: "/profile.jpg",
    socials: {
      github: "https://github.com/souvik-panda18",
      linkedin: "https://www.linkedin.com/in/souvik-panda-60bb02250/",
      leetcode: "https://leetcode.com/u/Souvik_panda/",
      instagram: "https://www.instagram.com/craftwithpanda?vrfl=ODN2Y2lkZnVhb2N2",
      resume: "/Souvik_Panda_Resume.pdf",
    },
    stats: [
      {
        value: "Systems Engineer",
        label: "Trinamix Systems Pvt. Ltd.",
        desc: "September 2025 – Present • Oracle Cloud technologies & enterprise solutions",
        tag: "Employment",
      },
      {
        value: "Oracle Cloud & APEX",
        label: "Enterprise Technologies",
        desc: "Oracle APEX, SQL/PL-SQL, OIC, VBCS, BI Publisher & OTBI/FDI analytics",
        tag: "Specialization",
      },
      {
        value: "AI & LLM Solutions",
        label: "Applied Machine Learning",
        desc: "Computer vision CNN pipelines, Gemini & Claude APIs, and dynamic neural control",
        tag: "AI Engineering",
      },
      {
        value: "Backend & Systems",
        label: "Core Architecture",
        desc: "FastAPI, Node.js, Python, Java & Relational Databases (TiDB, MySQL, Oracle)",
        tag: "Core Engineering",
      },
    ],
    skillChips: [
      "Oracle Cloud",
      "Oracle APEX",
      "Python",
      "FastAPI",
      "SQL / PL-SQL",
      "Node.js",
      "Gemini & Claude API",
      "React.js",
    ],
  },

  education: [
    {
      degree: "B.Tech in Electronics & Communication Engineering",
      institution: "RCC Institute of Information Technology, Kolkata",
      period: "2021 — 2025",
      description:
        "Comprehensive undergraduate coursework covering computing fundamentals, data structures, algorithms, computer networks, operating systems, and embedded hardware architectures.",
    },
  ],

  projects: [
    {
      slug: "honest-fit",
      title: "HonestFit — Health & Workout Tracker",
      badge: "FULL STACK",
      category: "Full Stack & Health Analytics",
      cover: "/honest-fit.jpg",
      oneLiner:
        "Intelligent fitness analytics application built with Next.js, Node.js, and FastAPI for transparent workout logging and health telemetry.",
      stack: [
        "Next.js",
        "TypeScript",
        "Recharts",
        "Node.js",
        "Python / FastAPI",
        "TiDB Cloud",
        "SQLite",
      ],
      role: "Full Stack Engineer",
      year: "2024",
      repoUrl: "https://github.com/souvik-panda18/HonestFit",
      demoUrl: null,
      problem:
        "Commercial workout trackers are filled with intrusive paywalls and opaque fitness metrics. The objective was to create a clean, telemetry-transparent application for progressive exercise and nutrition tracking.",
      approach:
        "Built a responsive Next.js and TypeScript frontend paired with Recharts data visualizations. Implemented a dual backend architecture utilizing Node.js and FastAPI, backed by TiDB Cloud for scalable cloud persistence and SQLite for local caching and offline execution.",
      architectureDiagram:
        "Next.js UI (Recharts) ──► Node.js / FastAPI Layer ──► Validation & Telemetry ──► TiDB Cloud (Relational) / SQLite Cache ──► Performance Dashboards",
      results:
        "Delivers fast dashboard queries, transparent metric breakdowns, and zero commercial tracking telemetry.",
    },
    {
      slug: "plant-detection-app",
      title: "Plant Detection Application",
      badge: "COMPUTER VISION",
      category: "Computer Vision & AI",
      cover: "/gpt.png",
      oneLiner:
        "Deep learning computer vision application for automated plant disease identification and foliage health classification.",
      stack: [
        "Python",
        "OpenCV",
        "TensorFlow / Keras",
        "Convolutional Neural Networks",
        "Machine Learning",
      ],
      role: "Machine Learning Engineer",
      year: "2024",
      repoUrl: "https://github.com/souvik-panda18",
      demoUrl: null,
      problem:
        "Visual inspection of agricultural foliage diseases is labor-intensive and subjective, leading to delayed disease identification and crop yield losses.",
      approach:
        "Developed a convolutional neural network pipeline in Python with TensorFlow and Keras to classify plant leaf pathology. Preprocessed image datasets using OpenCV for illumination equalization and morphological filtering to achieve consistent feature extraction.",
      architectureDiagram:
        "Leaf Image Input ──► OpenCV Preprocessing & Normalization ──► Deep CNN Feature Extraction ──► Fully Connected Classifier ──► Disease Diagnosis",
      results:
        "Automated the classification of foliage disease patterns with clear diagnostic confidence scores from captured images.",
    },
    {
      slug: "pid-line-follower-robot",
      title: "PID-Controlled Line Follower Robot",
      badge: "ROBOTICS / ECE",
      category: "Robotics & Embedded Systems",
      cover: "/Multithreded.png",
      oneLiner:
        "Autonomous line follower robot with a 3-DOF pick-and-place manipulator powered by neural network-tuned dynamic PID gains.",
      stack: [
        "Arduino (C/C++)",
        "Python",
        "TensorFlow Lite Micro",
        "PID Control",
        "IR Sensor Array",
        "L298N",
      ],
      role: "Hardware & Embedded Systems",
      year: "2025",
      repoUrl: "https://github.com/souvik-panda18/Final-year-Project-",
      demoUrl: null,
      problem:
        "Fixed-gain PID controllers suffer from path overshoot, oscillation, and poor adaptability when encountering varying line curvature and dynamic mechanical loads during pick-and-place operations.",
      approach:
        "Engineered an autonomous mobile robot platform with an IR sensor array, L298N motor drivers, and a 3-DOF servo-actuated robotic arm. Trained a neural network in Python and deployed it on-device via TensorFlow Lite Micro (pid_model.h) to predict and dynamically tune Kp, Ki, and Kd PID gains in real-time.",
      architectureDiagram:
        "IR Sensor Array ──► Real-Time Error State ──► TFLite Micro Neural Network ──► Dynamic (Kp, Ki, Kd) Prediction ──► Adaptive PID Motor Control ──► 3-DOF Arm Pick-and-Place",
      results:
        "Successfully reduced path overshoot on sharp curves and maintained steady trajectory stabilization with dynamic payload transitions.",
    },
  ],

  spotlightTools: [
    {
      title: "Web Audio Drummer",
      subtitle: "Interactive browser synthesizer",
      desc: "Low-latency browser sound synthesizer and drumming kit using the Web Audio API with responsive keyboard triggers and dynamic CSS animations.",
      tag: "Web Audio API",
      url: "https://souvik-panda18.github.io/drum_courseJs/",
      image: "/Drummer.png",
    },
    {
      title: "Link-to-QR Generator",
      subtitle: "Node.js developer CLI",
      desc: "High-speed developer tool converting URLs and arbitrary strings into customizable, downloadable QR matrix codes.",
      tag: "Node.js & CLI",
      url: "https://github.com/souvik-panda18/LinkTo_qrcode",
      image: "/Qrcode.png",
    },
  ],

  timeline: [
    {
      year: "September 2025 — Present",
      title: "Systems Engineer",
      institution: "Trinamix Systems Pvt. Ltd.",
      description:
        "Working with Oracle Cloud technologies and enterprise application development, focusing on database-driven solutions, reporting, integrations, and application development.",
      bullets: [
        "Developing database-driven applications using Oracle APEX.",
        "Writing and working with SQL and PL/SQL for data retrieval, business logic, and reporting.",
        "Working with Oracle BI Publisher (BIP), OTBI, and Fusion Data Intelligence (FDI) for enterprise reporting and analytics.",
        "Exploring enterprise application development and integrations using Oracle Integration Cloud (OIC) and Visual Builder Cloud Service (VBCS).",
        "Working across Oracle enterprise technologies and exploring AI-powered development workflows.",
      ],
      technologies: [
        "Oracle APEX",
        "Oracle Database",
        "SQL",
        "PL/SQL",
        "OIC",
        "VBCS",
        "BI Publisher",
        "OTBI",
        "FDI",
      ],
      category: "work",
    },
    {
      year: "2021 — 2025",
      title: "B.Tech in Electronics & Communication",
      institution: "RCC Institute of Information Technology, Kolkata",
      description:
        "Completed undergraduate degree focused on computing fundamentals, data structures, algorithms, computer networks, and embedded systems.",
      category: "education",
    },
    {
      year: "2024 — 2025",
      title: "Neural Network PID Robotics & Embedded Systems",
      institution: "Final Year Capstone Project",
      description:
        "Engineered the NNPID-controlled autonomous line follower pick-and-place robot using Arduino, C++, Python, and TensorFlow Lite Micro.",
      category: "project",
    },
    {
      year: "2024 — Present",
      title: "Full-Stack & Applied AI Engineering Projects",
      institution: "Independent Software Engineering",
      description:
        "Engineered HonestFit full-stack health telemetry application with Next.js, FastAPI, and TiDB Cloud, alongside computer vision and intelligent backend pipelines.",
      category: "project",
    },
  ] as TimelineItem[],

  skills: [
    {
      name: "Programming Languages",
      skills: ["Python", "Java", "JavaScript", "C", "C++", "SQL"],
    },
    {
      name: "Backend & API Development",
      skills: [
        "FastAPI",
        "Flask",
        "Node.js",
        "REST API Development",
        "Pydantic",
        "NPM",
      ],
    },
    {
      name: "Frontend Development",
      skills: [
        "React.js",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      name: "Oracle Cloud & Enterprise Technologies",
      isOracleSpotlight: true,
      skills: [
        "Oracle APEX",
        "Oracle Integration Cloud (OIC)",
        "Oracle Visual Builder (VBCS)",
        "Oracle BI Publisher (BIP)",
        "OTBI",
        "Oracle Fusion Data Intelligence (FDI)",
        "Oracle Fusion AI Agent Studio",
      ],
    },
    {
      name: "Databases",
      skills: ["Oracle Database", "MySQL", "PostgreSQL", "TiDB"],
    },
    {
      name: "AI, Machine Learning & LLM",
      skills: [
        "Google Gemini API",
        "Anthropic Claude API",
        "LLM Integration",
        "Machine Learning",
        "Computer Vision",
        "TensorFlow",
        "TensorFlow Lite",
      ],
    },
    {
      name: "Developer Tools",
      skills: ["Git", "GitHub", "Postman", "VS Code"],
    },
    {
      name: "Currently Exploring",
      skills: [
        "LangChain",
        "Agentic AI",
        "Model Context Protocol (MCP)",
        "Embeddings",
        "Vector Databases",
        "Advanced System Design",
        "LLM-powered Applications",
      ],
    },
  ] as SkillGroup[],
};
