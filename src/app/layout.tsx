import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
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
  title: "Unicorn UI Components Collection",
  description:
    "Six card components built with React, TypeScript and Tailwind CSS on top of shadcn/ui, with live previews and copy-paste code.",
  keywords: [
    "unicorn-ui",
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
  // The deployed demo. unicorn-ui.vercel.app is someone else's site.
  metadataBase: new URL("https://shadcn-ui-library.vercel.app"),
  openGraph: {
    title: "Unicorn UI Components Collection",
    description:
      "Six card components built with React, TypeScript and Tailwind CSS on top of shadcn/ui, with live previews and copy-paste code.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unicorn UI Components Collection",
    description:
      "Six card components built with React, TypeScript and Tailwind CSS on top of shadcn/ui, with live previews and copy-paste code.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
