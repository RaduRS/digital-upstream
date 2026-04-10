"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "Invalid password");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container>
        <div className="max-w-sm mx-auto w-full">
          <div className="flex justify-center mb-10">
            <div className="w-12 h-12">
              <Logo className="p-1" priority />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl font-medium text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-foreground/50 font-sans text-sm">
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground font-sans placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-destructive text-sm font-sans text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-foreground text-background font-sans font-medium text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}