/** Every string the mobile app template shows. Edit here, or pass overrides via `content`. All sample copy. */
export const mobileAppContent = {
  brand: { name: "Pocket Habits", href: "/" },
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Reviews", href: "#reviews" },
    ],
    action: { label: "Get the app", href: "#download" },
  },
  hero: {
    eyebrow: "New: home screen widgets",
    title: "Small habits, tracked in seconds",
    description: "Pocket Habits turns daily goals into one tap. Streaks, reminders and gentle nudges, all on your phone. Sample copy.",
    primaryAction: { label: "Download for iOS", href: "#download" },
    secondaryAction: { label: "Get it on Android", href: "#download" },
  },
  features: {
    title: "Built for your pocket",
    rows: [
      { label: "Track", title: "One tap to check in", description: "Log a habit from the home screen widget without opening the app." },
      { label: "Remind", title: "Reminders that respect you", description: "Nudges arrive when you usually have a free minute, never at night." },
      { label: "Reflect", title: "See your week at a glance", description: "A simple weekly view shows streaks and the days you missed." },
    ],
  },
  testimonials: {
    title: "What people say",
    description: "Sample quotes.",
    items: [
      { quote: "The widget is the only reason I still drink water.", author: "Nina B.", role: "Designer" },
      { quote: "Reminders that actually fit my day.", author: "Omar F.", role: "Nurse" },
      { quote: "My longest reading streak ever.", author: "Kate L.", role: "Student" },
      { quote: "Simple enough that I kept using it.", author: "Raj P.", role: "Developer" },
      { quote: "The weekly view keeps me honest.", author: "Lena S.", role: "Teacher" },
      { quote: "No clutter, no guilt. Just progress.", author: "Dan M.", role: "Runner" },
    ],
  },
  cta: {
    title: "Start a habit today",
    description: "Free to download. Sample copy.",
    primaryAction: { label: "Download for iOS", href: "#download" },
    secondaryAction: { label: "Get it on Android", href: "#download" },
  },
  footer: {
    note: "© Pocket Habits. Made-up app for this template.",
    columns: [
      { title: "App", links: [{ label: "Features", href: "#features" }, { label: "Download", href: "#download" }] },
      { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Press", href: "#press" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }, { label: "Terms", href: "#terms" }] },
    ],
  },
};

export type MobileAppContent = typeof mobileAppContent;
