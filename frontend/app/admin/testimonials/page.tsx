"use client";

import {
  CalendarDays,
  Eye,
  EyeOff,
  MessageSquareQuote,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  type?: "written" | "video";
  review?: string;
  youtubeUrl?: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

interface TestimonialForm {
  type: "written" | "video";
  name: string;
  company: string;
  review: string;
  youtubeUrl: string;
  rating: number;
  isActive: boolean;
}

const emptyForm: TestimonialForm = {
  type: "written",
  name: "",
  company: "",
  review: "",
  youtubeUrl: "",
  rating: 5,
  isActive: true,
};

async function requestTestimonials(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/testimonial`, { cache: "no-store" });
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch testimonials");
  }

  return (result.data || []) as Testimonial[];
}

export default function AdminTestimonials() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);

  const loadTestimonials = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      setError("");
      setTestimonials(await requestTestimonials(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    requestTestimonials(API_BASE)
      .then((data) => {
        if (!cancelled) setTestimonials(data);
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

  const filteredTestimonials = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return testimonials;

    return testimonials.filter((testimonial) =>
      [testimonial.name, testimonial.company, testimonial.review]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query)),
    );
  }, [searchQuery, testimonials]);

  const stats = useMemo(
    () => ({
      total: testimonials.length,
      active: testimonials.filter((item) => item.isActive).length,
      written: testimonials.filter((item) => getTestimonialType(item) === "written").length,
      videos: testimonials.filter((item) => getTestimonialType(item) === "video").length,
    }),
    [testimonials],
  );

  const openCreateModal = (type: "written" | "video") => {
    setEditing(null);
    setForm({ ...emptyForm, type });
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setForm({
      type: getTestimonialType(testimonial),
      name: testimonial.name,
      company: testimonial.company || "",
      review: testimonial.review || "",
      youtubeUrl: testimonial.youtubeUrl || "",
      rating: testimonial.rating || 5,
      isActive: testimonial.isActive,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
  };

  const submitTestimonial = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setFormError("Customer name is required");
      return;
    }

    if (form.type === "written" && !form.review.trim()) {
      setFormError("Written review is required");
      return;
    }

    if (form.type === "video" && !form.youtubeUrl.trim()) {
      setFormError("YouTube link is required");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      const res = await fetch(
        `${API_BASE}/testimonial${editing ? `/${editing._id}` : ""}`,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Save failed");
      }

      closeModal();
      await loadTestimonials();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (testimonial: Testimonial) => {
    if (!confirm(`Delete testimonial from "${testimonial.name}"?`)) return;

    try {
      setDeletingId(testimonial._id);

      const res = await fetch(`${API_BASE}/testimonial/${testimonial._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Delete failed");
      }

      setTestimonials((prev) =>
        prev.filter((item) => item._id !== testimonial._id),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="pb-24 md:pb-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
            Admin Panel
          </p>
          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Testimonials
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Add written reviews and YouTube video reviews for the homepage.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void loadTestimonials(true)}
            disabled={refreshing}
            className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium transition hover:bg-[var(--background-secondary)] disabled:opacity-60"
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => openCreateModal("written")}
            className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 font-medium text-white"
          >
            <Plus size={18} />
            Add Written Review
          </button>
          <button
            type="button"
            onClick={() => openCreateModal("video")}
            className="flex h-11 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 font-medium text-red-600"
          >
            <Video size={18} />
            Add Video Review
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" value={stats.total} icon={<MessageSquareQuote size={18} />} />
        <StatCard label="Active" value={stats.active} icon={<Eye size={18} />} />
        <StatCard label="Written Reviews" value={stats.written} icon={<MessageSquareQuote size={18} />} />
        <StatCard label="Video Reviews" value={stats.videos} icon={<Video size={18} />} />
      </div>

      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search testimonials..."
            className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      {loading && (
        <div className="flex h-[320px] flex-col items-center justify-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-[var(--text-secondary)]">Loading testimonials...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && filteredTestimonials.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center text-[var(--text-secondary)]">
          No testimonials found.
        </div>
      )}

      {!loading && !error && filteredTestimonials.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTestimonials.map((testimonial) => (
            <article
              key={testimonial._id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--primary)]/40 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex gap-1">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        className="fill-[var(--primary)] text-[var(--primary)]"
                      />
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold">{testimonial.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {testimonial.company || "No company"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      getTestimonialType(testimonial) === "video"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    {getTestimonialType(testimonial) === "video" ? "Video" : "Written"}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    testimonial.isActive
                      ? "bg-green-500/10 text-green-600"
                      : "bg-slate-500/10 text-slate-600"
                  }`}>
                    {testimonial.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>

              {testimonial.review && (
                <p className="mb-4 line-clamp-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {testimonial.review}
                </p>
              )}

              <div className="mb-5 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
                {testimonial.youtubeUrl && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-red-600">
                    <Video size={13} />
                    YouTube review
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--background-secondary)] px-3 py-1">
                  <CalendarDays size={13} />
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2 border-t border-[var(--border)] pt-4">
                <button
                  type="button"
                  onClick={() => openEditModal(testimonial)}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 text-sm font-medium text-blue-600"
                >
                  <Pencil size={15} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteTestimonial(testimonial)}
                  disabled={deletingId === testimonial._id}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 disabled:opacity-50"
                >
                  {deletingId === testimonial._id ? (
                    <RefreshCw size={15} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
                  Testimonials
                </p>
                <h2 className="text-2xl font-semibold">
                  {editing ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {form.type === "video"
                    ? "Video review needs a YouTube link."
                    : "Written review needs customer feedback text."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)]"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={submitTestimonial} className="max-h-[75vh] overflow-y-auto p-6">
              {formError && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                  label="Customer Name"
                  value={form.name}
                  onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                  placeholder="John Smith"
                />
                <TextInput
                  label="Company"
                  value={form.company}
                  onChange={(value) => setForm((prev) => ({ ...prev, company: value }))}
                  placeholder="ABC Industries"
                />
              </div>

              {form.type === "written" ? (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium">Written Review</label>
                  <textarea
                    value={form.review}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        review: event.target.value,
                        youtubeUrl: "",
                      }))
                    }
                    placeholder="Write the customer review here..."
                    className="min-h-[130px] w-full rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <TextInput
                    label="YouTube Link"
                    value={form.youtubeUrl}
                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        youtubeUrl: value,
                        review: "",
                      }))
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">
                    Paste the customer video review link from YouTube.
                  </p>
                </div>
              )}

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        rating: Number(event.target.value),
                      }))
                    }
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-3 outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} star{rating > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-4">
                  <span className="flex items-center gap-2 font-medium">
                    {form.isActive ? <Eye size={17} /> : <EyeOff size={17} />}
                    Show on homepage
                  </span>
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        isActive: event.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-[var(--primary)]"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-[var(--border)] pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 rounded-xl border border-[var(--border)] px-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-11 rounded-xl bg-[var(--primary)] px-6 font-medium text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-3 flex items-center justify-between text-[var(--text-secondary)]">
        <span className="text-sm">{label}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
      />
    </div>
  );
}

function getTestimonialType(testimonial: Testimonial): "written" | "video" {
  if (testimonial.type === "video" || testimonial.youtubeUrl) return "video";
  return "written";
}
