import type { PortableTextBlock } from "@portabletext/react";
import { p, h2, h3, quote, bullet, numbered, code, figure } from "./portable-text";

/**
 * Single source of truth for the studio's own articles. Used by the seed
 * script to populate Sanity, and by the site as fallback content so the blog
 * is fully readable before (or without) a Sanity project.
 */

export const categories = [
  { title: "TUTORIAL", slug: "tutorial", description: "Step by step, hands on guides." },
  { title: "GUIDE", slug: "guide", description: "Deeper strategy and how to." },
  { title: "CASE STUDY", slug: "case-study", description: "Real projects, from brief to launch." },
  { title: "LIST", slug: "list", description: "Curated tools and resources." },
  { title: "SEO", slug: "seo", description: "Search, content and performance." },
];

export function categoryTitle(slug: string): string {
  return categories.find((c) => c.slug === slug)?.title ?? slug.toUpperCase();
}

export type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  /** Category slug. */
  category: string;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
  /** Local path under /public for the built-in fallback featured image. */
  featuredImage?: string;
  featuredImageAlt?: string;
  body: PortableTextBlock[];
};

export const articles: Article[] = [
  {
    _id: "article-your-site-is-live-is-it-legal",
    title: "Your Site Is Live. Is It Legal?",
    slug: "your-site-is-live-is-it-legal",
    excerpt:
      "The compliance documents every website and mobile app needs, and what happens when you skip them.",
    metaTitle: "Your Site Is Live. Is It Legal? Website and App Compliance | Zenith Forge",
    metaDescription:
      "The compliance documents every website and mobile app needs: privacy policy, terms, cookie consent, app store labels, Nigeria's Data Protection Act and GDPR, and what happens when you skip them.",
    category: "guide",
    tags: [
      "compliance",
      "privacy policy",
      "gdpr",
      "ndpc",
      "data protection",
      "app store",
    ],
    publishedAt: "2026-07-25T09:00:00Z",
    featured: true,
    featuredImage: "/blog/compliance-stack.png",
    featuredImageAlt:
      "The compliance stack, from privacy policy up to app store disclosures.",
    body: [
      h3(
        "The compliance documents every website and mobile app needs, and what happens when you skip them"
      ),
      p("You spent weeks on the design. The animations are smooth, the load time is under two seconds, the copy finally sounds right. You push it live and it looks brilliant."),
      p("Then a user emails asking what you did with their data. Or Apple rejects your app three days before launch. Or a regulator sends a letter with your company name on it."),
      p("None of that is about your code. It is about a handful of documents most people treat as an afterthought, copied from some other site at the last minute and buried in the footer."),
      p("Here is the thing worth knowing early: those documents are not decoration. They are the difference between a product that can operate and one that cannot. And enforcement is no longer a distant European problem. In Nigeria, the Data Protection Commission has already issued a fine of 220 million dollars against Meta and 766.2 million naira against MultiChoice Nigeria. This is happening here, at home, right now."),
      p("Let us walk through what you actually need."),
      figure(
        "/blog/compliance-stack.png",
        "Build from the bottom up. Each layer rests on the one beneath it."
      ),
      h2("First, a better way to think about it"),
      p("Compliance is not one file you upload once and forget. It is a small stack of documents, and which ones you need depends on three simple questions:"),
      numbered("What data do you collect? Names, emails, IP addresses, location, payment details, anything."),
      numbered("Who are your users? Someone in Lagos, someone in London, and someone in California are protected by three different laws."),
      numbered("Where do you publish? A website has one set of rules. An app store adds a whole extra gate."),
      p("Answer those three honestly and the rest of this becomes straightforward."),
      h2("The privacy policy: the one you cannot skip"),
      p("If your site or app collects any personal information at all, you need a privacy policy. And “any” is broader than most people realise. A contact form counts. A newsletter signup counts. Google Analytics counts, because it collects IP addresses. If you have any of those, you are collecting personal data."),
      p("A privacy policy that actually does its job explains:"),
      bullet("What you collect. Be specific. Names, emails, device identifiers, cookies, payment information."),
      bullet("Why you collect it. Analytics, order fulfilment, marketing, improving the service."),
      bullet("Your legal basis for collecting it. This one gets skipped constantly and regulators notice."),
      bullet("Who you share it with. Every analytics tool, payment processor, email platform, and embedded widget on your site is a third party receiving data."),
      bullet("How long you keep it. Vague promises are not good enough."),
      bullet("What rights users have. Access, correction, deletion, and how to actually exercise those rights."),
      bullet("How to reach you. A real, working contact route."),
      p("Two practical notes. Host it at a predictable URL like yoursite.com/privacy-policy, and if you have both a website and an app, the policy must cover the app specific data too, things like device identifiers, push notification tokens, and mobile analytics. A web only policy attached to an app is an incomplete policy."),
      h2("Terms of service: the rulebook"),
      p("Where the privacy policy is about data, terms of service is about the relationship between you and your user. It is the document that saves you when a user does something you never anticipated."),
      p("Good terms cover what your service does and does not promise, what counts as acceptable use, who owns the content and intellectual property, how accounts get suspended or closed, how you limit your liability, and which country's law governs any dispute."),
      p("Nobody reads it until something goes wrong. Then everybody reads it very carefully."),
      h2("Cookies and consent: where most sites quietly fail"),
      p("If you run analytics, advertising pixels, or embedded widgets, you are using cookies, and cookies come with rules of their own."),
      p("Under GDPR, consent has to be a genuine yes. That means:"),
      bullet("Opt in, not opt out. Cookies cannot fire before the user agrees. Loading trackers on arrival and offering a settings menu afterwards is a violation, not a compromise."),
      bullet("No pre ticked boxes. Silence and inactivity do not count as consent."),
      bullet("Refusing must be as easy as accepting. If “Accept All” is a bright button and declining is buried three clicks deep, that is a design problem with legal consequences."),
      bullet("No cookie walls. You cannot lock basic functionality behind acceptance."),
      bullet("Granular where possible. Users should be able to accept analytics but refuse marketing."),
      p("Regulators have moved well past warnings on this. France's data protection authority fined Google 325 million euros in 2025 over cookie consent practices, and a much smaller company was fined 1.5 million euros simply for dropping advertising cookies before users had a chance to respond to the banner."),
      p("The banner alone is not compliance. What the banner actually does is compliance."),
      h2("Selling something? Add these"),
      p("If money changes hands, you need clear terms of sale covering pricing, what is included, delivery timelines, refund and return conditions, cancellation rights, and how disputes get resolved. Consumers are entitled to know these things before they pay, not after they complain."),
      p("If you give advice of any kind, whether financial, medical, legal, or fitness related, add a disclaimer. Same goes for affiliate links and any earnings claims."),
      h2("The extra gate: publishing a mobile app"),
      p("This is where founders get blindsided. You can build a flawless app and still be stopped at the door."),
      figure(
        "/blog/app-store-rejection.png",
        "A missing or unreachable privacy policy URL is one of the most common rejection reasons on both stores."
      ),
      p("Apple requires a live, publicly accessible privacy policy URL in App Store Connect. It must not sit behind a login. You must also complete App Privacy labels declaring what data you collect, and if your app creates accounts, you must let users delete those accounts from inside the app. Apps using external AI services now have to disclose that too."),
      p("Google Play requires a privacy policy for any app requesting sensitive permissions such as camera, location, contacts, microphone, or storage. You also complete a Data Safety section in the Play Console."),
      p("Now the part that catches people out. Both stores compare three things: what your app actually does, what your labels declare, and what your privacy policy says. If those three do not agree, you get rejected. Repeat mismatches can get a live listing pulled."),
      p("So the labels are not a form to rush through. They are a public statement about your data practices, and public statements are enforceable well beyond the app store."),
      h2("The law at home: Nigeria's Data Protection Act"),
      p("If you are building for Nigerian users, this is the one closest to you."),
      p("The Nigeria Data Protection Act 2023 came into force on 12 June 2023, replacing the old NDPR and creating the Nigeria Data Protection Commission as a regulator with real enforcement powers. The Commission's General Application and Implementation Directive, which spells out how to comply in practice, has been in effect since September 2025."),
      p("What it asks of you in plain terms:"),
      bullet("Process data fairly, lawfully, and transparently."),
      bullet("Collect only for specific, legitimate purposes, and do not quietly repurpose it later."),
      bullet("Have a lawful basis for what you are doing, and get consent that is informed, specific, freely given, and unambiguous."),
      bullet("Publish a privacy policy people can find and understand."),
      bullet("Sign data processing agreements with anyone processing data on your behalf."),
      bullet("Run impact assessments before high risk processing."),
      bullet("Register with the NDPC and appoint a data protection officer if you qualify as a data controller of major importance, which can apply once you process the data of more than 200 people within six months."),
      bullet("Document your basis and safeguards before moving personal data outside Nigeria."),
      p("Penalties reach the greater of 2 percent of annual gross revenue or 10 million naira, with criminal exposure for wilful violations."),
      p("The 200 person threshold deserves a second look, because a modest Nigerian startup with a mailing list can cross it faster than expected."),
      h2("And if you have users in Europe: GDPR"),
      p("GDPR applies based on where your users are, not where your company is. If people in the EU can use your product, it reaches you in Abuja just as it reaches a company in Berlin."),
      p("The core of it: every processing activity needs a lawful basis, privacy information must be in clear plain language, and users have real, enforceable rights to access, correct, delete, and port their data. Fines run up to 20 million euros or 4 percent of global annual turnover, whichever is higher."),
      p("Many Nigerian businesses assume this is somebody else's problem. If you have a single European client, or a signup form the whole internet can reach, it is your problem too."),
      h2("The mistakes that keep catching people"),
      bullet("Generic templates. A policy copied from another site describes that site's data practices, not yours. Regulators compare the document against what your product actually does."),
      bullet("The document says one thing, the product does another. This is the single fastest route to a rejection or a fine."),
      bullet("Set and forget. You added a new analytics tool, a chatbot, a payment provider. Your policy did not change. It is now inaccurate."),
      bullet("Treating the app like the website. An app collects device level data a website never touches. It needs its own coverage."),
      bullet("Design that manipulates the choice. Regulators now look at the actual user experience, not just the legal text. A banner engineered to push acceptance is a finding waiting to happen."),
      h2("So what do you actually need?"),
      figure(
        "/blog/compliance-matrix.png",
        "A starting point. Your real data practices decide the final answer."
      ),
      p("Use this as a starting point, not a verdict. A simple brochure site with no forms sits at the light end. The moment you add a signup form, analytics, payments, or an app, you move up the stack quickly."),
      h2("The honest summary"),
      p("Compliance is not paperwork you do to keep lawyers happy. It is what lets you enter markets, pass app review, close enterprise deals, and tell users something true about how you treat them. Skipping it does not save time. It moves the cost to a worse moment, usually the week you launch."),
      p("Start here: write down every piece of data your product touches and every third party tool that sees it. That single list is the foundation of every document above. Once you have it, none of this is mysterious."),
      h3("A necessary note"),
      p("This article is educational. It is a solid foundation, not legal advice, and it cannot account for the specifics of your business, your users, or your jurisdiction."),
      p("If you need advice on your actual situation, speak to a lawyer who can look at your product properly. Ochasi Darlington, founder of Zenith Forge, is a qualified Nigerian lawyer and can advise you directly. Reach out through the contact form and we will take it from there."),
      quote("That is the part most tech companies cannot offer you. We build the product, and we can stand behind the compliance too."),
    ],
  },
  {
    _id: "article-how-to-install-claude-code",
    title: "Claude Code for Dummies",
    slug: "claude-code-for-dummies",
    excerpt:
      "What Claude Code is, the friendliest way to install it through VS Code, and why you do not need to be a developer to get real value from it.",
    metaTitle: "Claude Code for Dummies | Zenith Forge",
    metaDescription:
      "A plain English guide to installing Claude Code through VS Code, plus the nontechnical tasks anyone can hand to it, from renaming files to summarising folders.",
    category: "tutorial",
    tags: ["claude code", "anthropic", "ai tools", "vs code", "tutorial"],
    publishedAt: "2026-07-10T09:00:00Z",
    body: [
      h2("First, what is Claude?"),
      p("Before we talk about Claude Code, it helps to know what Claude is. Claude is an AI assistant built by a company called Anthropic. You can chat with it the same way you would text a very capable colleague. You ask a question, it answers. You give it a task, it works through it. Most people first meet Claude through the chat window on the web or the mobile app, and for a lot of everyday work that is all you need."),
      h2("So what is Claude Code?"),
      p("Claude Code is a different way of using that same intelligence. Instead of living in a chat window, Claude Code sits right inside the tools you build with and works directly on your files. It can read a whole project, make changes, run commands, and show you exactly what it did before anything is saved. Think of it less as a chat and more as an assistant that rolls up its sleeves and gets into the actual work with you."),
      p("The name has the word Code in it, and that scares people off. Hold that thought. We will come back to it, because it matters less than you think."),
      h2("The many ways to install it, and the one we actually use"),
      p("There is more than one way to get Claude Code running. Some people run it purely from the terminal, that black window full of typed commands. Others wire it into different editors. At Zenith Forge, the way we install it and the way we recommend to almost everyone is through Visual Studio Code, usually just called VS Code."),
      p("We prefer this route for one simple reason. It is friendlier. The terminal is powerful, but it asks you to remember commands and type everything by hand, which is a lot to ask of someone who does not write code for a living. VS Code gives you buttons, panels, and clear visual changes you can approve with a click. You see what Claude wants to do, you say yes or no, and you move on. No memorising commands, no guesswork."),
      h2("Installing Claude Code in VS Code"),
      p("If you already have VS Code on your computer, the whole thing takes about two minutes."),
      numbered("Open VS Code."),
      numbered("Open the Extensions panel. On a Mac press Cmd + Shift + X. On Windows or Linux press Ctrl + Shift + X."),
      numbered("In the search box, type Claude Code."),
      numbered("Find the one published by Anthropic and click Install."),
      numbered("Once it finishes, a small spark icon appears in the top right corner of your editor whenever you have a file open. That icon is how you open Claude."),
      numbered("The first time you click it, you will be asked to sign in with your Anthropic account. After that, you are ready."),
      p("One thing worth knowing upfront. Claude Code is not available on the free plan. You need a paid plan such as Claude Pro to use it, so check the current plans on Anthropic's site before you start."),
      p("If you ever prefer the terminal route instead, you can install it with a single command:"),
      code("bash", "npm install -g @anthropic-ai/claude-code"),
      figure("/blog/claude-code-terminal.png", "Installing and launching Claude Code from the terminal."),
      p("Then type claude in your terminal to start. But for most people, the VS Code extension is the gentler path."),
      h2("But I am not technical. Is this for me?"),
      p("Yes. This is the part people get wrong. Because the tool has Code in the name, everyone assumes you need to be a developer to touch it. You do not."),
      p("Claude Code is very good at plain, nontechnical tasks. A few things you can ask it to do without writing a single line of code:"),
      bullet("Read through a long folder of documents and summarise what is inside."),
      bullet("Rename dozens of files in one go following a rule you describe in plain English."),
      bullet("Organise a messy folder into tidy, sensibly named subfolders."),
      bullet("Turn a rough set of notes into a clean, formatted document."),
      bullet("Pull specific information out of a spreadsheet and reshape it the way you want."),
      bullet("Fill out a repetitive form or template over and over with different details."),
      p("You describe what you want in normal language. Claude does the work and shows you the result before saving anything. You stay in control the entire time."),
      p("That is really the whole point. Claude Code is not a wall you have to be technical enough to climb. It is a capable assistant that happens to be excellent at fiddly, repetitive jobs, whether those jobs involve code or not."),
    ],
  },
  {
    _id: "article-take-claude-to-the-next-level",
    title: "Take Your Use of Claude to the Next Level",
    slug: "take-claude-to-the-next-level",
    excerpt:
      "Skills, plugins and MCP turn Claude from a clever chat window into an assistant that knows your standards, gains new powers, and reaches into the tools where your work actually lives.",
    metaTitle: "Take Your Use of Claude to the Next Level: Skills, Plugins, MCP | Zenith Forge",
    metaDescription:
      "Learn how Claude skills, plugins and MCP work together so Claude follows your standards, gains new abilities, and connects to the apps you already use.",
    category: "guide",
    tags: ["claude", "skills", "plugins", "mcp", "ai automation"],
    publishedAt: "2026-07-03T09:00:00Z",
    body: [
      p("By now you have Claude in your corner and you are comfortable asking it for things. Good. This is where it gets interesting. Claude on its own is powerful, but you can teach it new tricks and connect it to the rest of your world. Three ideas make that possible: skills, plugins, and something called MCP."),
      h2("Skills: giving Claude a specialty"),
      p("A skill is a set of instructions you hand to Claude so it knows how to do a specific kind of task really well, every time, without you re-explaining it."),
      p("Think of it like training a new team member. The first week you explain how your company writes proposals, how your invoices are laid out, the tone your brand uses. You do it once, they remember it forever. Skills work the same way. Instead of explaining your preferred format every single time, you save it once as a skill and Claude follows it automatically whenever the task comes up."),
      p("The result is consistency. Whether you ask on a Monday or a Friday, the output matches your standard because the instructions live inside the skill, not inside your memory."),
      h2("Plugins: adding whole abilities at once"),
      p("Where a skill teaches Claude how you like things done, a plugin adds a bundle of new abilities in one move. A plugin can bring in several skills, commands, and tools together, packaged and ready to use."),
      p("In the VS Code extension this is refreshingly simple. Type /plugins in the prompt box and a small manager opens. From there you can browse what is available, switch plugins on or off with a toggle, and add new sources to pull more from. No hunting through settings. You pick what you want, and Claude picks up the new abilities right away."),
      p("This is how you shape Claude around the way your business actually works, rather than bending your work to fit a generic tool."),
      h2("MCP: connecting Claude to your other tools"),
      p("This is the big one. MCP stands for Model Context Protocol, but forget the long name. In plain terms, MCP is a standard way to plug Claude into the other apps and services you already use, so it can act on your behalf inside them."),
      p("Once connected, Claude is no longer stuck in a box on its own. It can reach into the tools where your real work lives. A few examples of what a connection makes possible:"),
      bullet("Read and draft emails in your inbox."),
      bullet("Look through files in your cloud storage and pull out what you need."),
      bullet("Check your calendar and help you plan around it."),
      bullet("Fetch information from a project or task tool and update it."),
      p("Setting one up is a matter of choosing the connector for the tool you want, granting permission once, and letting Claude use it from then on. You stay in control of what it can and cannot touch."),
      p("Put the three together and Claude stops being just a clever chat window. Skills give it your standards, plugins give it new powers, and MCP gives it hands to reach into your actual workflow. That is the difference between using Claude and building Claude into how you work."),
    ],
  },
  {
    _id: "article-introduction-to-automation",
    title: "An Introduction to Automation",
    slug: "introduction-to-automation",
    excerpt:
      "Every business has tasks that repeat. Automation hands them to software so they run on their own. Here is how to get started with n8n, the free tool we reach for first.",
    metaTitle: "An Introduction to Automation with n8n | Zenith Forge",
    metaDescription:
      "A beginner friendly introduction to automation and n8n, the free open source workflow tool. Learn what it is and how to run it locally with npm or Docker.",
    category: "tutorial",
    tags: ["automation", "n8n", "workflows", "docker", "tutorial"],
    publishedAt: "2026-06-26T09:00:00Z",
    body: [
      p("Every business has tasks that repeat. The same email that goes out after every enquiry. The same row copied from one place into another. The same file saved, renamed, and filed away. None of it is hard. It is just endless, and it quietly eats hours you would rather spend elsewhere."),
      p("Automation is simply the practice of handing those repeating tasks to software so they run on their own. You set up the steps once, and from then on the machine does the work while you get on with something that actually needs your judgement."),
      h2("Meet n8n"),
      p("There are many automation tools out there. The one we want to introduce you to is called n8n. It is an open source workflow automation platform, and the reason we like it is straightforward: it is free to run yourself, it is powerful, and it does not lock your data away on someone else's servers."),
      p("n8n works on a simple idea. You build a workflow visually by joining boxes together. One box is a trigger, the thing that starts the workflow, like a new email arriving or a form being filled. The boxes after it are actions, the steps that follow, like saving a file, sending a message, or updating a spreadsheet. You connect them in the order you want, and n8n runs the chain whenever the trigger fires. No code required to get going."),
      figure("/blog/n8n-workflow.png", "A simple workflow: an email arrives, the details are pulled out, saved to a sheet, and an alert goes out."),
      h2("Running n8n on your own machine"),
      p("The nicest way to learn n8n is to run it locally, meaning on your own computer, for free. Nothing leaves your machine, so it is a safe place to experiment. There are two common ways to do it."),
      h3("Option one: with npm"),
      p("If you already have Node.js installed, this is the quickest start. Open your terminal and run:"),
      code("bash", "npx n8n"),
      p("That single command downloads and launches n8n for you. Once it finishes starting up, open your browser and go to:"),
      code("text", "http://localhost:5678"),
      p("You will see the n8n editor, ready to build your first workflow."),
      p("If you would rather keep it installed permanently rather than running it fresh each time, use:"),
      code("bash", "npm install n8n -g\nn8n start"),
      h3("Option two: with Docker"),
      p("Docker keeps n8n and everything it needs neatly separated from the rest of your computer, which makes it cleaner to manage and easier to update later. You will need Docker Desktop installed first."),
      p("Create a storage space so your workflows survive restarts, then start n8n:"),
      code("bash", "docker volume create n8n_data\n\ndocker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n"),
      p("As before, open your browser to:"),
      code("text", "http://localhost:5678"),
      p("The first time you open it, n8n asks you to create a local account with your name, email, and password. This is only for your own machine. There is no cloud signup and no licence key needed for the free Community edition."),
      h2("What to build first"),
      p("Once you are in, start small. A good first workflow is one you fully understand, so you can watch it work and trust it. Something like: when a new file lands in a folder, rename it and move it into the right place. Or: when a form is submitted, drop the details into a spreadsheet and send yourself a summary. Nothing dramatic. The magic is not in the size of the task. It is in the fact that it now happens without you."),
      p("That is the doorway into automation. You start with one dull, repeating job, hand it to n8n, and get your time back. Then you find the next one, and the one after that. Before long, a good chunk of the busywork simply runs itself."),
    ],
  },
];

export function articleSummaries() {
  return [...articles]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map((a) => ({
      _id: a._id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
      featured: a.featured,
      category: { title: categoryTitle(a.category), slug: a.category },
      featuredImage: a.featuredImage ?? null,
      featuredImageAlt: a.featuredImageAlt,
    }));
}
