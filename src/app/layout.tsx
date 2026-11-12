import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { MenuCloser } from "./_site/menu-closer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tapas UI: launch pages that actually work",
  description:
    "Free waitlist, pricing and checkout sections for Next.js and shadcn/ui, wired up and ready to ship. Install each with one command.",
  keywords: [
    "tapas-ui",
    "ui",
    "components",
    "react",
    "typescript",
    "tailwind",
    "nextjs",
  ],
  authors: [
    { name: "Tahmid Bin Taslim Rafi", url: "https://github.com/tahmidbintaslim" },
  ],
  creator: "Tahmid Bin Taslim Rafi",
  // The deployed demo. Update this when the Vercel project or domain is renamed.
  metadataBase: new URL("https://tapasui.tahmid.space"),
  openGraph: {
    title: "Tapas UI: launch pages that actually work",
    description:
      "Free waitlist, pricing and checkout sections for Next.js and shadcn/ui, wired up and ready to ship. Install each with one command.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapas UI: launch pages that actually work",
    description:
      "Free waitlist, pricing and checkout sections for Next.js and shadcn/ui, wired up and ready to ship. Install each with one command.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <MenuCloser />
        </ThemeProvider>
      </body>
    </html>
  );
}
