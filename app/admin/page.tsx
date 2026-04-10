"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { Check, LogOut, Copy, CheckCheck } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  content: string;
  published_at: string | null;
};

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState<"medium" | "beehiiv" | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => {
        if (res.status === 401) {
          setUnauthorized(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.posts) setPosts(data.posts);
      })
      .catch(() => setUnauthorized(true))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function togglePost(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    setOutput("");
    setOutputType(null);
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function stripMarkdown(text: string): string {
    const lines = text.split("\n");
    const result: string[] = [];
    let i = 0;
    let tableCount = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Detect table: line starts with | and has at least 2 cells
      if (line.trim().startsWith("|") && !line.trim().startsWith("|---")) {
        const cells = line.split("|").filter((c) => c.trim() !== "");
        if (cells.length >= 2) {
          // It's a header row — collect the whole table
          const tableLines = [line];
          i++;

          // Skip separator row (e.g., |---|---|---|)
          if (i < lines.length && lines[i].match(/^\|[\s\-:|]+\|$/)) {
            tableLines.push(lines[i]);
            i++;
          }

          // Collect all data rows
          while (i < lines.length && lines[i].trim().startsWith("|")) {
            tableLines.push(lines[i]);
            i++;
          }

          // Format as ASCII table
          const allRows = tableLines.map((l) =>
            l.split("|").map((c) => c.trim()).filter((c) => c !== "")
          );

          // Skip header row for formatting
          const header = allRows[0];
          const dataRows = allRows.slice(tableLines[0].match(/^\|[\s\-:|]+\|$/) ? 2 : 1);

          // Pad each column to max width
          const colWidths = header.map((_: string, colIdx: number) =>
            Math.max(
              header[colIdx].length,
              ...dataRows.map((row: string[]) => (row[colIdx] || "").length)
            )
          );

          const divider = colWidths.map((w: number) => "-".repeat(w)).join(" | ");
          const pad = (cell: string, colIdx: number) => cell.padEnd(colWidths[colIdx]);

          result.push(header.map(pad).join(" | "));
          result.push(divider);
          for (const row of dataRows) {
            result.push(row.map(pad).join(" | "));
          }
          result.push("");

          tableCount++;
          continue;
        }
      }

      // Not a table — strip markdown from line
      let stripped = line
        .replace(/^#{1,6}\s+/, "") // headers
        .replace(/\*\*(.+?)\*\*/g, "$1") // bold
        .replace(/\*(.+?)\*/g, "$1") // italic
        .replace(/_(.+?)_/g, "$1") // italic underscore
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // images
        .replace(/`([^`]+)`/g, "$1") // inline code
        .replace(/^>\s+/, "") // blockquotes
        .replace(/^[-*_]{3,}\s*$/, "") // hr
        .replace(/^[-*+]\s+/, "• ") // ul
        .replace(/^\d+\.\s+/, ""); // ol

      if (stripped.trim() !== "") {
        result.push(stripped);
      } else if (result.length > 0 && result[result.length - 1] !== "") {
        result.push("");
      }

      i++;
    }

    // Clean up triple+ newlines
    return result.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  async function transformForMedium() {
    const selectedPosts = posts.filter((p) => selected.has(p.id));
    const lines: string[] = [];

    for (const post of selectedPosts) {
      lines.push(post.title.toUpperCase());
      lines.push("");
      lines.push(stripMarkdown(post.content));
      lines.push("\n---\n");
    }

    setOutput(lines.join("\n").trim());
    setOutputType("medium");
    setCopied(false);
  }

  async function transformForBeehiiv() {
    const selectedPosts = posts.filter((p) => selected.has(p.id));
    const lines: string[] = [];

    for (const post of selectedPosts) {
      lines.push(post.title.toUpperCase());
      lines.push("");
      lines.push(stripMarkdown(post.content));
      lines.push("\n\n");
    }

    setOutput(lines.join("\n").trim());
    setOutputType("beehiiv");
    setCopied(false);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleSelectAll() {
    if (selected.size === posts.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(posts.map((p) => p.id)));
    }
    setOutput("");
    setOutputType(null);
  }

  if (unauthorized) {
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/10">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8">
                <Logo className="p-1" priority />
              </div>
              <span className="font-sans text-sm text-foreground/50">Admin</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors font-sans text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="py-10 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto w-full">

            {/* Posts list */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-foreground/40 font-sans text-sm">Loading posts...</p>
              </div>
            ) : (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-sans text-xs uppercase tracking-[0.15em] text-foreground/40">
                    All Posts ({posts.length})
                  </h2>
                  <button
                    onClick={toggleSelectAll}
                    className="font-sans text-xs text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {selected.size === posts.length ? "Deselect all" : "Select all"}
                  </button>
                </div>

                <div className="space-y-2">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => togglePost(post.id)}
                      className={`
                        flex items-center gap-4 px-4 py-4 rounded-lg border cursor-pointer transition-all
                        ${selected.has(post.id)
                          ? "border-foreground/20 bg-foreground/5"
                          : "border-foreground/5 bg-transparent hover:border-foreground/10"
                        }
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0
                        ${selected.has(post.id)
                          ? "bg-foreground text-background border-foreground"
                          : "border-foreground/20"
                        }
                      `}>
                        {selected.has(post.id) && <Check className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base text-foreground leading-snug truncate">
                          {post.title}
                        </p>
                        <p className="font-sans text-xs text-foreground/40 mt-0.5">
                          {formatDate(post.published_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transform buttons */}
            {posts.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={transformForMedium}
                  disabled={selected.size === 0}
                  className="px-6 py-3 rounded-lg bg-foreground text-background font-sans font-medium text-sm hover:bg-foreground/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Transform for Medium
                </button>
                <button
                  onClick={transformForBeehiiv}
                  disabled={selected.size === 0}
                  className="px-6 py-3 rounded-lg border border-foreground/20 text-foreground font-sans font-medium text-sm hover:border-foreground/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Transform for Beehiiv
                </button>
                {selected.size > 0 && (
                  <span className="font-sans text-xs text-foreground/40">
                    {selected.size} selected
                  </span>
                )}
              </div>
            )}

            {/* Output */}
            {output && (
              <div className="border border-foreground/10 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-foreground/10 bg-foreground/5">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs uppercase tracking-widest text-foreground/50">
                      {outputType === "medium" ? "Medium" : "Beehiiv"} Output
                    </span>
                    <span className="text-foreground/30">·</span>
                    <span className="font-sans text-xs text-foreground/40">
                      {output.length} chars
                    </span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 rounded text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors font-sans text-xs"
                  >
                    {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={output}
                  className="w-full h-80 px-5 py-4 bg-transparent text-foreground font-mono text-sm resize-none focus:outline-none"
                />
              </div>
            )}

          </div>
        </Container>
      </main>
    </div>
  );
}