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
    "A curated collection of beautiful, accessible, and reusable components built with React, TypeScript, and Tailwind CSS",
  keywords: [
    "unicorn-ui",
    "ui",
    "components",
    "react",
    "typescript",
    "tailwind",
    "nextjs",
  ],
  authors: [{ name: "Unicorn UI Team" }],
  creator: "Unicorn UI Team",
  publisher: "Unicorn UI Team",
  metadataBase: new URL("https://unicorn-ui.vercel.app"),
  openGraph: {
    title: "Unicorn UI Components Collection",
    description:
      "A curated collection of beautiful, accessible, and reusable components built with React, TypeScript, and Tailwind CSS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unicorn UI Components Collection",
    description:
      "A curated collection of beautiful, accessible, and reusable components built with React, TypeScript, and Tailwind CSS",
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
