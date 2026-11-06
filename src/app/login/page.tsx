import { authConfigured } from "@/lib/pro-config";
import Link from "next/link";
import { SiteFooter } from "../_site/site-footer";
import { SiteHeader } from "../_site/site-header";
import { GitHubButton } from "./github-button";

export const metadata = { title: "Sign in | Tapas UI", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next = "/account", error } = await searchParams;
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/account";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in to Tapas UI</h1>
        <p className="mt-3 text-muted-foreground">You only need an account for Tapas Pro. Every open-source section works without one.</p>
        <div className="mt-8">
          {authConfigured() ? (
            <GitHubButton next={safeNext} />
          ) : (
            <p className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">Sign-in isn&apos;t set up on this deployment yet.</p>
          )}
        </div>
        {error && (
          <p role="alert" className="mt-6 text-sm text-destructive">
            Sign-in didn&apos;t complete. Please try again.
          </p>
        )}
        <Link href="/" className="mt-10 text-sm text-muted-foreground hover:text-foreground">
          ← Back to the site
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
