/** Every string the changelog template shows. Edit here, or pass overrides via `content`. All sample copy. */
export const changelogContent = {
  brand: { name: "Driftwood", href: "/" },
  nav: {
    links: [
      { label: "Changelog", href: "#changelog" },
      { label: "Blog", href: "#blog" },
      { label: "Subscribe", href: "#subscribe" },
    ],
    action: { label: "Try Driftwood", href: "#start" },
  },
  hero: {
    eyebrow: "Changelog",
    title: "What's new in Driftwood",
    description: "Every release, big and small, in one place. Sample copy.",
    primaryAction: { label: "Get updates by email", href: "#subscribe" },
    secondaryAction: { label: "Read the blog", href: "#blog" },
  },
  changelog: {
    title: "Recent releases",
    entries: [
      { date: "2026-11-03", version: "2.4", title: "Shared boards", items: ["Invite teammates to any board.", "Comments with mentions.", "Faster loading on large boards."] },
      { date: "2026-10-14", version: "2.3", title: "Keyboard shortcuts", items: ["Press ? to see every shortcut.", "Move cards without a mouse."] },
      { date: "2026-09-22", version: "2.2", title: "Dark theme", items: ["Follows your system setting.", "Higher contrast for labels."] },
    ],
  },
  blog: {
    title: "From the blog",
    description: "Sample posts by made-up authors.",
    viewAll: { label: "All posts", href: "#blog" },
    posts: [
      { title: "How we built shared boards", excerpt: "The sync model behind real-time boards, and what we got wrong first.", author: "Sam Ortiz", date: "2026-11-04", readTime: "6 min read", category: "Engineering", href: "#post-1" },
      { title: "Designing for the keyboard", excerpt: "Why every action in Driftwood now has a shortcut.", author: "Jo Park", date: "2026-10-15", readTime: "4 min read", category: "Design", href: "#post-2" },
      { title: "Our first year, in numbers we can share", excerpt: "What we shipped, what we cut, and what is next. Sample post.", author: "Ria Mehta", date: "2026-09-30", readTime: "5 min read", category: "Company", href: "#post-3" },
    ],
  },
  newsletter: {
    title: "Get release notes by email",
    description: "One short email when something ships. No spam.",
    action: "#subscribe",
    note: "Sample form: it submits nowhere until you point action at your API.",
  },
  footer: {
    note: "© Driftwood. Made-up product for this template.",
    columns: [
      { title: "Product", links: [{ label: "Changelog", href: "#changelog" }, { label: "Blog", href: "#blog" }] },
      { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Careers", href: "#careers" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }] },
    ],
  },
};

export type ChangelogContent = typeof changelogContent;
