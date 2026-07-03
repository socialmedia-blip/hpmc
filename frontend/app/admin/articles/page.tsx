"use client";

import Addarticle from "@/app/components/Addarticle";
import { formatHtml } from "@/app/components/utils/formatHtml";
import Fuse from "fuse.js";
import {
  CalendarDays,
  Code,
  Edit,
  FileText,
  Filter,
  ImageIcon,
  Newspaper,
  Plus,
  RotateCcw,
  Search,
  Tags,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  datePublished: string;
  lastUpdated?: string;
  slug: string;
  coverImage?: string;
  coverImageAlt?: string;
  tags?: string[] | string;
  faqs?: { question: string; answer: string }[];
}

const ITEMS_PER_PAGE = 10;

async function requestarticles(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/article/viewarticle`, { cache: "no-store" });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || "Failed to fetch articles");
  }

  return [...(data || [])].sort(
    (a: Article, b: Article) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  ) as Article[];
}

export default function AdminArticlesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingarticle, setEditingarticle] = useState<Article | null>(null);
  const [articles, setarticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const fetcharticles = async () => {
    try {
      setLoading(true);
      setError("");
      setarticles(await requestarticles(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    requestarticles(API_BASE)
      .then((data) => {
        if (!cancelled) setarticles(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: ["title", "author", "excerpt", "slug", "tags"],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [articles],
  );

  const filteredarticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [articles, fuse, searchQuery]);

  const stats = {
    total: articles.length,
    authors: new Set(articles.map((article) => article.author).filter(Boolean)).size,
    tagged: articles.filter((article) => normalizeTags(article.tags).length > 0).length,
    latest: articles[0]
      ? new Date(articles[0].datePublished).toLocaleDateString()
      : "None",
  };

  const hasActiveFilters = Boolean(searchQuery);
  const totalPages = Math.ceil(filteredarticles.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedarticles = filteredarticles.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleUpdateImage = async () => {
    if (!selectedImage || !editingSlug) return;

    const formData = new FormData();
    formData.append("coverImage", selectedImage);

    try {
      const res = await fetch(`${API_BASE}/article/${editingSlug}/image`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Failed to update image");
      }

      setShowImageModal(false);
      setSelectedImage(null);
      fetcharticles();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update image");
    }
  };

  const handleDelete = async (article: Article) => {
    if (!confirm("Delete this article?")) return;

    try {
      const res = await fetch(`${API_BASE}/article/${article.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || result.msg || "Delete failed");
      }

      setarticles((prev) => prev.filter((item) => item._id !== article._id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleSaveHtml = async () => {
    if (!editingSlug) return;

    const res = await fetch(`${API_BASE}/article/${editingSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: htmlContent }),
    });

    if (!res.ok) {
      const result = await res.json();
      alert(result.message || result.msg || "Failed to save HTML");
      return;
    }

    setShowHtmlEditor(false);
    fetcharticles();
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
              Admin Panel
            </p>
            <h1 className="font-serif text-4xl text-[var(--text-primary)]">
              Articles
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)]"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            )}

            <button
              onClick={() => {
                setEditingarticle(null);
                setShowAddModal(true);
              }}
              className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 font-medium text-white transition hover:opacity-90"
            >
              <Plus size={18} />
              Add Article
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-4">
          <StatCard
            label="Published"
            value={stats.total}
            icon={<Newspaper size={18} />}
            color="blue"
          />
          <StatCard
            label="Authors"
            value={stats.authors}
            icon={<UserRound size={18} />}
            color="green"
          />
          <StatCard
            label="Tagged"
            value={stats.tagged}
            icon={<Tags size={18} />}
            color="violet"
          />
          <StatCard
            label="Latest Post"
            value={stats.latest}
            icon={<CalendarDays size={18} />}
            color="cyan"
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Article Search
              </p>
              {hasActiveFilters && (
                <span className="rounded-full bg-[var(--primary)]/15 px-2 py-1 text-xs font-semibold text-[var(--primary)]">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Showing{" "}
              <span className="font-semibold text-[var(--primary)]">
                {filteredarticles.length}
              </span>{" "}
              of <span className="font-semibold">{articles.length}</span>
            </p>
          </div>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, author, excerpt, slug, or tags..."
              className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] pl-10 pr-4 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex h-[300px] flex-col items-center justify-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-[var(--text-secondary)]">Loading articles...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h3 className="mb-2 font-semibold text-red-600">
            Something went wrong
          </h3>
          <p className="mb-5 text-sm text-red-500">{error}</p>
          <button
            onClick={fetcharticles}
            className="h-10 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredarticles.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <FileText size={25} />
          </div>
          <h3 className="mb-3 font-serif text-2xl text-[var(--text-primary)]">
            No Articles Found
          </h3>
          <p className="text-[var(--text-secondary)]">
            {hasActiveFilters
              ? "No articles match the current search."
              : "Publish your first article to start building the library."}
          </p>
        </div>
      )}

      {!loading && !error && filteredarticles.length > 0 && (
        <>
          <div className="mb-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed md:table-auto">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                    <th className="w-[48%] px-3 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Article
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] lg:table-cell">
                      Author
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] xl:table-cell">
                      Tags
                    </th>
                    <th className="w-[25%] px-2 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Published
                    </th>
                    <th className="w-[27%] px-2 py-4 text-right text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedarticles.map((article) => (
                    <tr
                      key={article._id}
                      className="border-b border-[var(--border)] transition last:border-b-0 hover:bg-[var(--background-secondary)]"
                    >
                      <td className="px-3 py-4 sm:px-4 md:px-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="hidden h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-[var(--background-secondary)] sm:block">
                            {article.coverImage ? (
                              <img
                                src={article.coverImage}
                                alt={article.coverImageAlt || article.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[var(--text-secondary)]">
                                <ImageIcon size={18} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[var(--text-primary)] md:text-base">
                              {article.title}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[var(--text-secondary)] sm:text-xs">
                              {stripHtml(article.excerpt || article.content)}
                            </p>
                            <p className="mt-1 truncate text-[11px] text-[var(--text-secondary)] lg:hidden">
                              {article.author || "Unknown author"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="hidden px-5 py-4 lg:table-cell">
                        <p className="max-w-[180px] truncate text-sm font-medium text-[var(--text-primary)]">
                          {article.author || "-"}
                        </p>
                        <p className="mt-1 max-w-[180px] truncate text-xs text-[var(--text-secondary)]">
                          /{article.slug}
                        </p>
                      </td>

                      <td className="hidden px-5 py-4 xl:table-cell">
                        <div className="flex max-w-[260px] flex-wrap gap-2">
                          {normalizeTags(article.tags).length > 0 ? (
                            normalizeTags(article.tags)
                              .slice(0, 3)
                              .map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]"
                                >
                                  {tag}
                                </span>
                              ))
                          ) : (
                            <span className="text-sm text-[var(--text-secondary)]">
                              No tags
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-2 py-4 text-xs text-[var(--text-secondary)] sm:px-4 md:px-5 md:text-sm">
                        {new Date(article.datePublished).toLocaleDateString()}
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <button
                            onClick={() => {
                              setEditingarticle(article);
                              setShowAddModal(true);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition hover:bg-blue-500/10 md:h-9 md:w-9"
                            title="Edit article"
                            aria-label={`Edit ${article.title}`}
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingSlug(article.slug);
                              setShowImageModal(true);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-violet-500 transition hover:bg-violet-500/10 md:h-9 md:w-9"
                            title="Update image"
                            aria-label={`Update image for ${article.title}`}
                          >
                            <ImageIcon size={15} />
                          </button>
                          <button
                            onClick={async () => {
                              setEditingSlug(article.slug);
                              setHtmlContent(await formatHtml(article.content));
                              setShowHtmlEditor(true);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-500 transition hover:bg-amber-500/10 md:h-9 md:w-9"
                            title="Edit HTML"
                            aria-label={`Edit HTML for ${article.title}`}
                          >
                            <Code size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(article)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10 md:h-9 md:w-9"
                            title="Delete"
                            aria-label={`Delete ${article.title}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pb-20 md:justify-end">
              <button
                disabled={activePage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="h-11 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <div className="flex h-11 min-w-[52px] items-center justify-center rounded-xl bg-[var(--primary)] px-4 font-medium text-white">
                {activePage}
              </div>
              <button
                disabled={activePage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="h-11 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {showAddModal && (
        <Addarticle
          onClose={() => {
            setShowAddModal(false);
            setEditingarticle(null);
          }}
          onSuccess={fetcharticles}
          existingarticle={editingarticle}
        />
      )}

      {showHtmlEditor && (
        <EditorModal
          title="HTML Editor"
          eyebrow="Advanced Content"
          onClose={() => setShowHtmlEditor(false)}
          footer={
            <>
              <button
                onClick={() => setShowHtmlEditor(false)}
                className="h-11 rounded-xl border border-[var(--border)] px-6 text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHtml}
                className="h-11 rounded-xl bg-[var(--primary)] px-6 font-medium text-white transition hover:opacity-90"
              >
                Save Changes
              </button>
            </>
          }
        >
          <textarea
            value={htmlContent}
            onChange={(event) => setHtmlContent(event.target.value)}
            className="h-[55vh] w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4 font-mono text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </EditorModal>
      )}

      {showImageModal && (
        <EditorModal
          title="Update Cover Image"
          eyebrow="Media Library"
          onClose={() => {
            setShowImageModal(false);
            setSelectedImage(null);
          }}
          footer={
            <>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setSelectedImage(null);
                }}
                className="h-11 rounded-xl border border-[var(--border)] px-6 text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateImage}
                disabled={!selectedImage}
                className="h-11 rounded-xl bg-[var(--primary)] px-6 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Update Image
              </button>
            </>
          }
        >
          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--background-secondary)] p-6 text-center transition hover:border-[var(--primary)]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <ImageIcon size={22} />
            </div>
            <p className="font-medium text-[var(--text-primary)]">
              {selectedImage ? selectedImage.name : "Choose a new cover image"}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              JPG, PNG, or WebP works best for article cards.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setSelectedImage(event.target.files?.[0] || null)
              }
              className="hidden"
            />
          </label>
        </EditorModal>
      )}
    </div>
  );
}

function normalizeTags(tags?: string[] | string) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function EditorModal({
  title,
  eyebrow,
  children,
  footer,
  onClose,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  footer: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:rounded-[32px]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-5 md:px-8">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[var(--primary)] sm:text-xs sm:tracking-[4px]">
              {eyebrow}
            </p>
            <h2 className="font-serif text-2xl text-[var(--text-primary)] md:text-3xl">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] md:h-11 md:w-11"
            aria-label={`Close ${title}`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[calc(94vh-180px)] overflow-y-auto p-5 md:p-8">
          {children}
        </div>
        <div className="flex justify-end gap-3 border-t border-[var(--border)] px-5 py-4 md:px-8">
          {footer}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: ReactNode;
  color: "blue" | "violet" | "green" | "cyan";
}) {
  const styles = {
    blue: {
      card: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
      icon: "bg-blue-500/10 text-blue-600",
      value: "text-blue-600",
    },
    violet: {
      card: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
      icon: "bg-violet-500/10 text-violet-600",
      value: "text-violet-600",
    },
    green: {
      card: "from-green-500/10 to-green-600/5 border-green-500/20",
      icon: "bg-green-500/10 text-green-600",
      value: "text-green-600",
    },
    cyan: {
      card: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20",
      icon: "bg-cyan-500/10 text-cyan-600",
      value: "text-cyan-600",
    },
  }[color];

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 ${styles.card}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles.icon}`}
        >
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold md:text-3xl ${styles.value}`}>
        {value}
      </p>
    </div>
  );
}

