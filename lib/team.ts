export type TeamMember = {
  slug: string;
  name: string;
  /** Short role label shown on the card and profile badge. */
  role: string;
  /** Fuller role line for the profile header. */
  profileRole: string;
  quote: string;
  quoteAuthor: string;
  bio1: string;
  bio2: string;
  skills: string[];
  /** Path under /public, or empty string for the placeholder block. */
  photo: string;
  photoPlaceholder: string;
  /** Personal LinkedIn profile URL, when available. */
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    slug: "ochasi-darlington",
    name: "Ochasi Darlington",
    role: "TEAM LEAD",
    profileRole: "Team Lead, AI Automation & Agents",
    quote:
      "A jack of all trades is a master of none, but oftentimes better than a master of one.",
    quoteAuthor: "William Shakespeare",
    bio1: "Ochasi Darlington is a lawyer and the founder of Zenith Forge, a tech company born from connecting with like minded problem solvers who shared a passion for bringing visions to life through technology. He is a front end developer with genuine enthusiasm for AI as a frontier technology, and he specializes in building AI automations and AI agents that actually work. He believes tech should never be a barrier or limitation.",
    bio2: "Beyond the code, Ochasi is thoughtful and deliberate in how he moves. He loves chess, genuinely loves it, and that passion carries into everything he does. He brings this same energy and creativity to Zenith Forge, always pushing to solve problems that matter and build things that last.",
    skills: ["AI AUTOMATION", "AI AGENTS", "FRONT END", "STRATEGY"],
    photo: "/team/ochasi-darlington.png",
    photoPlaceholder: "Headshot: Ochasi Darlington",
    linkedin: "https://ng.linkedin.com/in/ochasi-darlington",
  },
  {
    slug: "olamide-sotunde",
    name: "Olamide Sotunde",
    role: "SENIOR FULLSTACK DEVELOPER",
    profileRole: "Senior Fullstack Developer",
    quote:
      "Whatever you do will be insignificant, but it is very important that you do it.",
    quoteAuthor: "Mahatma Gandhi",
    bio1: "Olamide Sotunde is a senior fullstack developer at Zenith Forge. He builds websites and apps that are fast, functional, and built to solve real problems. He specializes in React Native, Next.js, Supabase, and Express and Prisma, and he approaches every project with clean code, attention to security, and an eye for detail.",
    bio2: "When a project lands on Olamide's desk, it gets done right. He is also a law graduate. Outside of work, he is a self confessed series freak and loves music.",
    skills: ["REACT NATIVE", "NEXT.JS", "SUPABASE", "EXPRESS / PRISMA"],
    photo: "/team/olamide-sotunde.jpg",
    photoPlaceholder: "Headshot: Olamide Sotunde",
    linkedin: "https://ng.linkedin.com/in/sotunde",
  },
  {
    slug: "chinonso-odum",
    name: "Chinonso Odum",
    role: "DESIGNER",
    profileRole: "Product & Web Designer",
    quote: "The only way to do great work is to love what you do.",
    quoteAuthor: "Steve Jobs",
    bio1: "Chinonso Odum is a designer at Zenith Forge focused on creating modern websites, intuitive user experiences, and digital products that help businesses grow. He specializes in web design, UI and UX design, Framer, WordPress, and AI powered design workflows, blending creativity with strategy to build solutions that are both visually engaging and highly functional.",
    bio2: "Chinonso has a sharp eye for the details that make a design feel effortless, from the way a button responds to the rhythm of a layout. He thinks in colour, spacing, and flow, and he treats every project as a chance to make something people actually enjoy using. He is also a lawyer in equity and loves to workout as a hobby.",
    skills: ["WEB DESIGN", "UI / UX", "FRAMER", "WORDPRESS"],
    photo: "/team/chinonso-odum.png",
    photoPlaceholder: "Headshot: Chinonso Odum",
    linkedin: "https://ng.linkedin.com/in/chinonso-odum-56b787257",
  },
  {
    slug: "modadeoluwa-adedamola",
    name: "Modadeoluwa Adedamola",
    role: "DATA ANALYST & SEO",
    profileRole: "Data Analyst, Front End Developer & SEO Expert",
    quote:
      "The paradox of courage is that a man must be a little careless of his life even in order to keep it.",
    quoteAuthor: "Gilbert K. Chesterton",
    bio1: "Modadeoluwa Adedamola is a data analyst, frontend developer, and SEO expert at Zenith Forge. He turns raw numbers into clear stories, building charts and dashboards that help businesses see what is really going on and make sharper decisions. On the frontend, he brings that same clarity to the web, and his SEO work makes sure the right people actually find what he builds.",
    bio2: "Modadeoluwa also tutors data analysis, which speaks to how deeply he understands the craft. Outside of work, he is a big anime fan and a serious chess lover.",
    skills: ["DATA ANALYSIS", "DASHBOARDS", "FRONT END", "SEO"],
    photo: "/team/modadeoluwa-adedamola.jpg",
    photoPlaceholder: "Headshot: Modadeoluwa Adedamola",
  },
  {
    slug: "kemfon-edet",
    name: "Kemfon Edet",
    role: "LEAD SECURITY CONSULTANT",
    profileRole: "Lead Security Consultant",
    quote: "I am the master of my fate, I am the captain of my soul.",
    quoteAuthor: "William Ernest Henley",
    bio1: "Kemfon Donatus Edet is the Lead Security Consultant at Zenith Forge, with hands on experience in security operations, threat and risk analysis, and incident response built inside a live security operations center. He works across log analysis, vulnerability assessment, and security consulting, and he is the calm hand you want watching the dashboards when something starts to look wrong.",
    bio2: "He is also a natural in front of a room, having led cybersecurity awareness talks for both community and student audiences, the kind of speaker who makes a heavy subject land easily. Driven by a real passion for defensive security, he is currently sharpening his expertise with a master's in Cybersecurity and Digital Forensics.",
    skills: ["SECURITY OPERATIONS", "RISK ANALYSIS", "INCIDENT RESPONSE", "VULNERABILITY ASSESSMENT"],
    photo: "/team/kemfon-edet.jpg",
    photoPlaceholder: "Headshot: Kemfon Edet",
  },
  {
    slug: "olushayo-fagbenro",
    name: "Olushayo Fagbenro",
    role: "LEAD SYSTEMS ARCHITECT · CONSULTANT",
    profileRole: "Lead Systems Architect & Consultant",
    quote:
      "I am the wisest man alive, for I know one thing, and that is that I know nothing.",
    quoteAuthor: "Plato",
    bio1: "Olushayo Fagbenro Joshua is the Lead Systems Architect and a consultant at Zenith Forge, and a seasoned software engineer with a background in financial technology. He works at Moniepoint, building and scaling systems that thousands of people rely on every day. He holds professional training in Microsoft Azure solutions and responsive web design.",
    bio2: "When a problem is too tangled to move, Joshua is the one who finds the way through and keeps the build steady from start to finish. Outside of work, he is a devoted movie lover with strong opinions and no shortage of takes.",
    skills: ["SYSTEMS ARCHITECTURE", "FINTECH", "MICROSOFT AZURE", "SCALABILITY"],
    photo: "/team/olushayo-fagbenro.png",
    photoPlaceholder: "Headshot: Olushayo Fagbenro",
    linkedin: "https://ng.linkedin.com/in/olushayo-fagbenro-83a978206",
  },
];

export function getMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}
