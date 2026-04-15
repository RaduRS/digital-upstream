"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { Check, LogOut, Copy, CheckCheck, Download, Save, ArrowLeft, X } from "lucide-react";
import { marked } from "marked";

type Post = {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  target_keywords: string | null;
  content: string;
  cover_image_url: string | null;
  secondary_image_url: string[] | Record<string, string> | string | null;
  video_url: string | null;
  video_thumbnail_url: string | null;
  source: string;
  original_url: string | null;
  published_at: string | null;
  status: "published" | "draft" | "review";
  created_at: string;
  updated_at: string;
};

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState<"medium" | "beehiiv" | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
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

  function selectForEditing(id: string) {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setEditingPost(post);
      setEditedContent(post.content);
      setSaveSuccess(false);
    }
  }

  function closeEditor() {
    setEditingPost(null);
    setEditedContent("");
    setSaveSuccess(false);
  }

  async function savePost() {
    if (!editingPost) return;

    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPost.id,
          content: editedContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEditingPost({ ...editingPost, ...data.post });
        setPosts(posts.map((p) => (p.id === editingPost.id ? { ...p, ...data.post } : p)));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } finally {
      setSaving(false);
    }
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

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim().startsWith("|") && !line.trim().startsWith("|---")) {
        const cells = line.split("|").filter((c) => c.trim() !== "");
        if (cells.length >= 2) {
          const tableLines = [line];
          i++;

          if (i < lines.length && lines[i].match(/^\|[\s\-:|]+\|$/)) {
            tableLines.push(lines[i]);
            i++;
          }

          while (i < lines.length && lines[i].trim().startsWith("|")) {
            tableLines.push(lines[i]);
            i++;
          }

          const allRows = tableLines.map((l) =>
            l.split("|").map((c) => c.trim()).filter((c) => c !== "")
          );

          const header = allRows[0];
          const dataRows = allRows.slice(tableLines[0].match(/^\|[\s\-:|]+\|$/) ? 2 : 1);

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
          continue;
        }
      }

      let stripped = line
        .replace(/^#{1,6}\s+/, "")
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/_(.+?)_/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^>\s+/, "")
        .replace(/^[-*_]{3,}\s*$/, "")
        .replace(/^[-*+]\s+/, "• ")
        .replace(/^\d+\.\s+/, "");

      if (stripped.trim() !== "") {
        result.push(stripped);
      } else if (result.length > 0 && result[result.length - 1] !== "") {
        result.push("");
      }

      i++;
    }

    return result.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  async function transformForMedium() {
    const selectedPosts = posts.filter((p) => selected.has(p.id));
    const lines: string[] = [];

    for (const post of selectedPosts) {
      lines.push(`# ${post.title}`);
      lines.push("");
      lines.push(post.content.trim());
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
      lines.push(post.content.trim());
      lines.push("\n---\n");
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

  function getPreviewHtml(content: string): string {
    // If post has cover image, strip the first image from content to match blog page behavior
    if (editingPost?.cover_image_url) {
      content = content.replace(/^!\[[^\]]*\]\([^)]+\)\n?/, "");
    }
    return marked.parse(content, { gfm: true, breaks: false }) as string;
  }

  function estimateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  if (unauthorized) {
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    return null;
  }

  if (editingPost) {
    const previewHtml = getPreviewHtml(editedContent);
    const readTime = estimateReadTime(editedContent);

    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Fixed header */}
        <header className="shrink-0 border-b border-foreground/10 bg-background z-50">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={closeEditor}
                  className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="font-sans text-sm">Back to posts</span>
                </button>
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8">
                    <Logo className="p-1" priority />
                  </div>
                  <span className="font-sans text-sm text-foreground/50">Admin</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                {saveSuccess && (
                  <span className="font-sans text-sm text-green-600">Saved!</span>
                )}
                <button
                  onClick={savePost}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-sans font-medium text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors font-sans text-sm"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Container>
        </header>

        {/* Side-by-side panels - both scroll independently */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Editor panel - stays fixed, only textarea scrolls internally */}
          <div className="w-1/2 border-r border-foreground/10 flex flex-col">
            <div className="px-6 py-4 flex items-center justify-between border-b border-foreground/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-widest text-foreground/50">
                  Edit Content (Markdown)
                </span>
                {(() => {
                  const raw = editingPost.secondary_image_url;
                  let urls: string[] = [];
                  if (Array.isArray(raw)) {
                    urls = raw as string[];
                  } else if (typeof raw === "string") {
                    if (raw.startsWith("[")) {
                      try { urls = JSON.parse(raw); } catch { urls = []; }
                    }
                  } else if (raw && typeof raw === "object") {
                    urls = Object.values(raw as Record<string, string>);
                  }
                  if (urls.length === 0) return null;
                  return (
                    <div className="flex flex-wrap gap-1">
                      {urls.map((url, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            navigator.clipboard.writeText(`![](${url})`);
                            setCopiedUrl(String(i));
                            setTimeout(() => setCopiedUrl(null), 2000);
                          }}
                          className="px-2 py-1 rounded border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors font-sans text-xs"
                        >
                          {copiedUrl === String(i) ? `✓ ${i}` : String(i)}
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>
              <span className="font-sans text-xs text-foreground/40">
                {editedContent.length} chars
              </span>
            </div>

            <div className="flex-1 overflow-hidden p-6">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-full px-5 py-4 bg-foreground/5 rounded-lg border border-foreground/10 text-foreground font-mono text-sm resize-none focus:outline-none focus:border-foreground/30"
              />
            </div>
          </div>

          {/* Right: Preview panel - scrolls */}
          <div className="w-1/2 overflow-y-auto">
            {/* Meta line */}
            <div className="pt-12 sm:pt-16 pb-8 sm:pb-12">
              <Container>
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <time className="text-xs uppercase tracking-[0.15em] text-foreground/40 font-sans">
                      {formatDate(editingPost.published_at)}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span className="text-xs text-foreground/40 font-sans">
                      {readTime} min read
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tight text-foreground mb-6">
                    {editingPost.title}
                  </h1>

                  {editingPost.meta_description && (
                    <p className="text-lg sm:text-xl text-foreground/55 leading-relaxed font-sans max-w-2xl mb-10">
                      {editingPost.meta_description}
                    </p>
                  )}
                  <hr className="border-t border-foreground/10 mb-0" />
                </div>
              </Container>
            </div>

            {/* Cover image */}
          {editingPost.cover_image_url && (
            <Container>
              <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl bg-foreground/5">
                  <img
                    src={editingPost.cover_image_url}
                    alt={editingPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Container>
          )}

          {/* Preview content */}
          <article className="pb-20 sm:pb-28 lg:pb-36">
            <Container>
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-sans text-xs uppercase tracking-widest text-foreground/50">
                    Preview
                  </span>
                  <span className="text-foreground/30">·</span>
                  <span className="font-sans text-xs text-foreground/40">
                    As it appears on /blog/{editingPost.slug}
                  </span>
                </div>
                <div className="prose-custom">
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                </div>
              </div>
            </Container>
          </article>

          {/* Video */}
          {editingPost.video_url && (
            <Container>
              <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
                {editingPost.video_thumbnail_url ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-foreground/5">
                    <video
                      src={editingPost.video_url}
                      poster={editingPost.video_thumbnail_url}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-foreground/5">
                    <video
                      src={editingPost.video_url}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Container>
          )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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

      <main className="py-10 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto w-full">
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
                      className="flex items-center gap-4 px-4 py-4 rounded-lg border cursor-pointer transition-all"
                      onClick={() => togglePost(post.id)}
                    >
                      <div
                        className={`
                          w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0
                          ${selected.has(post.id)
                            ? "bg-foreground text-background border-foreground"
                            : "border-foreground/20"
                          }
                        `}
                      >
                        {selected.has(post.id) && <Check className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base text-foreground leading-snug truncate">
                          {post.title}
                        </p>
                        <p className="font-sans text-xs text-foreground/40 mt-0.5">
                          {formatDate(post.published_at)} · /blog/{post.slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectForEditing(post.id);
                          }}
                          className="px-3 py-1.5 rounded border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors font-sans text-xs"
                        >
                          Edit
                        </button>
                        {post.video_url && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(post.video_url!, "_blank");
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors font-sans text-xs"
                            title="Download video"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Video
                          </button>
                        )}
                        {post.cover_image_url && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(post.cover_image_url!, "_blank");
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors font-sans text-xs"
                            title="Download cover"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Cover
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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