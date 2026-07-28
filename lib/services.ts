export type Service = {
  title: string;
  desc: string;
  /** Front-of-card quick capability points. */
  points: string[];
  /** Tech / tools line on the front. */
  tags: string;
  /** Panel headline pitch. */
  why: string;
  /** Panel SME use cases. */
  cases: string[];
  /** Panel closing tools line. */
  tools: string;
};

export const services: Service[] = [
  {
    title: "Web Development",
    desc: "Fast, resilient sites and web apps on modern stacks, from marketing sites to full products.",
    points: ["Marketing sites", "Web apps & dashboards", "E-commerce builds"],
    tags: "REACT · NEXT.JS · NODE · SUPABASE",
    why: "A fast, custom site you own and can grow, built to convert visitors into customers.",
    cases: [
      "A slow template becomes a site that books jobs overnight",
      "A messy spreadsheet becomes a real web app your team uses daily",
      "A landing page that finally turns ad spend into leads",
    ],
    tools: "REACT · NEXT.JS · NODE · PRISMA",
  },
  {
    title: "Web Design",
    desc: "Interfaces with a point of view. Art direction, design systems and prototypes that feel inevitable.",
    points: ["Brand and art direction", "Design systems", "Interactive prototypes"],
    tags: "FIGMA · ADOBE · UI · UX · PROTOTYPING",
    why: "Look as premium as the work you sell, so every touchpoint earns trust before a word is read.",
    cases: [
      "A sharper brand wins more proposals at higher prices",
      "One design system keeps every page and post on brand",
      "A prototype settles arguments before a line of code is written",
    ],
    tools: "FIGMA · ADOBE · FRAMER",
  },
  {
    title: "AI Automation",
    desc: "We wire AI into your operations so the boring work disappears and the team moves faster.",
    points: ["Workflow automation", "Document and email handling", "System integrations"],
    tags: "N8N · LLMS · WEBHOOKS · APIS",
    why: "The repetitive work runs itself, quietly, in the background, while your people do the work that matters.",
    cases: [
      "Reclaim a full day a week from copy and paste tasks",
      "Leads get qualified and routed the moment they arrive",
      "Invoices, reports and follow ups send themselves",
    ],
    tools: "N8N · OPENAI · ZAPIER · APIS",
  },
  {
    title: "AI Agents",
    desc: "Autonomous agents that research, answer, route and act. Your always on operators.",
    points: ["Support and sales agents", "Voice agents", "Retrieval over your docs"],
    tags: "AGENTS · RAG · VOICE · TOOLS",
    why: "An operator that never sleeps, answers instantly and hands off to a human only when it should.",
    cases: [
      "Round the clock support with instant, accurate answers",
      "A voice agent that calls and qualifies leads for you",
      "An assistant that knows your whole knowledge base",
    ],
    tools: "CLAUDE · RAG · VOICE · MCP",
  },
  {
    title: "Data Analysis",
    desc: "From raw data to decisions. Pipelines, dashboards and insight you will actually use.",
    points: ["Data pipelines", "Live dashboards", "Reporting and insight"],
    tags: "PYTHON · SQL · DASHBOARDS · BI",
    why: "Turn scattered numbers into clear decisions you can act on this week, not next quarter.",
    cases: [
      "See exactly what makes money and what quietly loses it",
      "One dashboard replaces twelve confusing spreadsheets",
      "Weekly numbers that arrive on their own, already explained",
    ],
    tools: "PYTHON · SQL · POWER BI · LOOKER",
  },
  {
    title: "Mobile Development",
    desc: "Native feeling apps for iOS and Android, shipped from one codebase.",
    points: ["iOS and Android apps", "One shared codebase", "Push and offline support"],
    tags: "REACT NATIVE · EXPO · SWIFT",
    why: "Reach every phone in your customer's pocket for roughly half the cost of building two apps.",
    cases: [
      "One build ships to both app stores at once",
      "Push offers land far better than email",
      "An app your customers keep on the home screen",
    ],
    tools: "REACT NATIVE · EXPO · FIREBASE",
  },
  {
    title: "WordPress",
    desc: "Custom themes, plugins and stores on the world's most used CMS. Fast, secure and easy to manage.",
    points: ["Custom themes", "Plugins and stores", "Speed and security"],
    tags: "THEMES · PLUGINS · WOOCOMMERCE",
    why: "A fast, secure site you can run yourself, without waiting on a developer for every small change.",
    cases: [
      "Update prices, posts and pages in minutes, on your own",
      "A store that actually converts, not just collects carts",
      "A site that loads fast and stays out of trouble",
    ],
    tools: "WORDPRESS · WOOCOMMERCE · ELEMENTOR",
  },
  {
    title: "SEO",
    desc: "Be found. Technical SEO, content architecture and performance that ranks.",
    points: ["Technical SEO", "Content strategy", "Performance and Core Web Vitals"],
    tags: "TECHNICAL · CONTENT · PERFORMANCE",
    why: "Get found by people already searching for what you sell, and turn that traffic into enquiries.",
    cases: [
      "Climb to the first page for the terms that matter locally",
      "Double organic traffic without spending more on ads",
      "A site structure search engines actually understand",
    ],
    tools: "SEARCH CONSOLE · SCHEMA · ANALYTICS",
  },
];
