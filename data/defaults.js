// Fallback content. The live site reads from Appwrite (edited in /dashboard);
// anything missing there falls back to these values so the site never renders empty.

export const defaultProfile = {
  name: "Efegi Edisemi",
  headline: "Frontend Engineer",
  tagline: "I turn ideas into interfaces you want to touch.",
  bio: "I’m a frontend developer who enjoys building thoughtful interfaces and bringing designs to life on the web. I love working with modern tools, paying attention to detail, and constantly improving how users experience products.",
  hobbie:
    "Beyond coding, I enjoy exploring new ideas, journaling my thoughts, and engaging with meaningful conversations. I value continuous learning, intentional living, and the belief that small, consistent efforts lead to lasting impact. In my free time, I enjoy watching K-dramas and anime.",
  email: "edisemiefegi@gmail.com",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  available: true,
  github: "https://github.com/Edisemiefegi",
  linkedin: "https://linkedin.com/in/efegi-edisemi",
  twitter: "",
  resume: "/Resume.pdf",
  photo: "/didi.PNG",
};

export const defaultExperiences = [
  {
    company: "Glown",
    role: "Frontend Engineer",
    summary:
      "Developed and maintained responsive frontend features for a booking and management platform serving salons, barbershops, spas, and beauty businesses in Nigeria.",
    date: "Nov 2025 – Jul 2026",
  },
  {
    company: "OpenProdkt LLC",
    role: "Software Developer (Part-time)",
    summary:
      "Contributing to a greenfield cloud-native platform for small enterprises. Designing scalable components, maintaining high availability, and ensuring observability using modern tooling.",
    date: "Mar 2025 – Oct 2025",
  },
  {
    company: "Ogilvista",
    role: "Frontend Engineer",
    summary:
      "Enhanced advertising tech platforms using Vue.js. Collaborated on responsive layouts and cross-platform UI improvements.",
    date: "Sep 2024 – Oct 2024",
  },
  {
    company: "Goofer Food",
    role: "Frontend Engineer",
    summary:
      "Improved UI consistency by building reusable components and aligning frontend deliverables with team goals.",
    date: "Oct 2022 – Jan 2023",
  },
  {
    company: "Freelance",
    role: "Frontend Developer",
    summary:
      "Developed escrow and fundraising applications using Vue. Collaborated with design teams using Figma to deliver intuitive user experiences.",
    date: "2022",
  },
];

export const defaultProjects = [
  {
    image: "/project/helpmebook.png",
    title: "HelpMeBook",
    description:
      "A third-party hotel booking platform with guided, preference-based user flows, partner dashboards and real-time booking interactions.",
    role: "Frontend Developer",
    learning: [
      "Built structured booking flows based on user preferences like budget and stay needs",
      "Designed role-based dashboards for admins and hotel partners",
      "Handled dynamic UI states for multi-step booking interactions",
    ],
    challenge: [
      "Managing complex booking states across multiple steps",
      "Designing scalable dashboards for different user roles",
      "Ensuring smooth UX across devices",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    url: "http://helpmebook.com.ng/",
    githubLink: "",
    status: "published",
  },
  {
    image: "/project/moments.png",
    title: "Moments",
    description:
      "An AI-powered platform for creating and sharing personalised date experiences with timelines, real place suggestions and custom letters.",
    role: "Frontend Developer",
    learning: [
      "Integrated AI-driven features for generating date ideas and place suggestions",
      "Designed interactive timelines for structuring date experiences",
      "Built shareable invitation flows with personalised letter features",
    ],
    challenge: [
      "Designing engaging UX for personalised interactions",
      "Handling dynamic content across timelines and invitations",
      "Balancing feature complexity with clean UI",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "AI"],
    url: "https://momentsblues.vercel.app/",
    githubLink: "https://github.com/Edisemiefegi/moments",
    status: "published",
  },
  {
    image: "/project/ediwise.png",
    title: "EdiWise",
    description:
      "A personal finance dashboard to track income, expenses and net worth with real-time insights and interactive charts.",
    role: "Frontend Developer",
    learning: [
      "Used Next.js for performance optimisation and rendering",
      "Applied TypeScript for scalable and maintainable code",
      "Built interactive chart components for financial data",
    ],
    challenge: [
      "Ensuring accurate financial calculations",
      "Optimising performance for large datasets",
      "Designing intuitive financial UI",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    url: "https://ediwise.vercel.app/",
    githubLink: "https://github.com/Edisemiefegi/ediwise",
    status: "published",
  },
  {
    image: "/project/campus-connect.png",
    title: "Campus Connect",
    description:
      "A social network for university communities with profiles, forums and structured discussions.",
    role: "Lead Frontend Developer",
    learning: [
      "Built nested layouts and routing with Nuxt 3",
      "Implemented authentication and protected routes",
      "Designed forum-style interaction flows",
    ],
    challenge: [
      "Managing nested layouts and dynamic content",
      "Handling authentication and navigation guards",
      "Maintaining UI clarity with multiple features",
    ],
    stack: ["Nuxt 3", "Pinia", "Tailwind CSS", "Firebase"],
    url: "https://campus-connect-tyzz.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/campus-connect",
    status: "published",
  },
  {
    image: "/project/edimov.png",
    title: "EdiMov",
    description:
      "A movie explorer that fetches and displays trending and top-rated content with a fast, dynamic UI.",
    role: "Lead Frontend Developer",
    learning: [
      "Integrated external APIs efficiently",
      "Handled dynamic routing and state",
      "Designed responsive UI layouts",
    ],
    challenge: [
      "Managing large data display cleanly",
      "Handling loading states and errors",
      "Ensuring responsive design",
    ],
    stack: ["Vue", "Pinia", "Tailwind CSS", "Firebase"],
    url: "https://edimov.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/edimov",
    status: "published",
  },
  {
    image: "/project/instaclone.png",
    title: "InstaClone",
    description:
      "A frontend clone of Instagram focused on layout accuracy, UI interactions and component-based architecture.",
    role: "Frontend Developer",
    learning: [
      "Practised component-driven architecture",
      "Built responsive layouts",
      "Improved UI consistency",
    ],
    challenge: [
      "Achieving pixel-perfect UI",
      "Handling interactive elements",
      "Maintaining reusable components",
    ],
    stack: ["Vue", "Tailwind CSS", "Firebase", "Pinia"],
    url: "https://instaclone-ni86.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/instaclone",
    status: "published",
  },
  {
    image: "/project/edirecipes.png",
    title: "EdiRecipe",
    description:
      "A recipe discovery platform with instant filtering by category and ingredients.",
    role: "Frontend Developer",
    learning: [
      "Built filtering logic",
      "Managed reactive state",
      "Designed responsive UI",
    ],
    challenge: [
      "Efficient filtering without reload",
      "Handling missing data",
      "Maintaining UI consistency",
    ],
    stack: ["Vue", "Tailwind CSS", "Firebase", "Pinia"],
    url: "https://recipie-app-556v.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/recipie-app",
    status: "published",
  },
];

export const defaultSkills = [
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "HTML & CSS", category: "Languages" },
  { name: "Vue", category: "Frameworks" },
  { name: "Nuxt", category: "Frameworks" },
  { name: "React", category: "Frameworks" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Tailwind CSS", category: "Frameworks" },
  { name: "Pinia", category: "Tools" },
  { name: "Firebase", category: "Tools" },
  { name: "Appwrite", category: "Tools" },
  { name: "Git & GitHub", category: "Tools" },
  { name: "Figma", category: "Tools" },
];
