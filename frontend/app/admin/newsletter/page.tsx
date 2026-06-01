"use client";

import CreateNewsletterModal from "@/app/components/CreateNewsletter";
import { Eye, Trash2, Plus, X, Mail } from "lucide-react";

import { useEffect, useState } from "react";

interface Attachment {
  name: string;
  url: string;
  type?: string;
  size?: number;
}

interface NewsletterListItem {
  _id: string;
  subject: string;
  totalRecipients: number;
  sentAt: string;
  createdAt: string;
}

interface NewsletterDetails extends NewsletterListItem {
  content: string;
  attachments: Attachment[];
}

const ITEMS_PER_PAGE = 10;

export default function AdminNewsletter() {
  const [newsletters, setNewsletters] = useState<NewsletterListItem[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedNewsletter, setSelectedNewsletter] =
    useState<NewsletterDetails | null>(null);

  const [viewLoading, setViewLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  /* Fetch */
  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter`,
        {
          cache: "no-store",
        },
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      setNewsletters(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  /* View */
  const handleView = async (id: string) => {
    try {
      setViewLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter/${id}`,
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      setSelectedNewsletter(json.data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setViewLoading(false);
    }
  };

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this newsletter?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/newsletter/${id}`, {
        method: "DELETE",
      });

      setNewsletters((prev) => prev.filter((item) => item._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* Pagination */
  const totalPages = Math.ceil(newsletters.length / ITEMS_PER_PAGE);

  const currentNewsletters = newsletters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* Helpers */
  const getFileIcon = (type?: string) => {
    if (!type) return "📎";
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";

    return "📎";
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
            Admin Panel
          </p>

          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Newsletters
          </h1>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="
            h-11 px-6
            bg-[var(--primary)]
            text-white
            rounded-xl
            flex items-center gap-2
            hover:bg-[var(--primary-dark)]
          "
        >
          <Plus size={16} />
          Create Newsletter
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mb-4" />

          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && newsletters.length === 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center">
          <Mail
            className="mx-auto text-[var(--text-secondary)] mb-4"
            size={32}
          />

          <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-2">
            No newsletters
          </h3>
        </div>
      )}

      {/* Table */}
      {!loading && newsletters.length > 0 && (
        <>
          <div className="overflow-x-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  <th className="px-5 py-4 text-left">Subject</th>

                  <th className="px-5 py-4 text-left">Sent At</th>

                  <th className="px-5 py-4 text-center">Recipients</th>

                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentNewsletters.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[var(--border)] hover:bg-[var(--muted)]"
                  >
                    <td className="px-5 py-4">{item.subject}</td>

                    <td className="px-5 py-4">
                      {new Date(item.sentAt).toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-center">
                      {item.totalRecipients}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleView(item._id)}
                          className="text-blue-500"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end mt-8 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="
                    h-10 px-5
                    border border-[var(--border)]
                    text-[var(--text-secondary)]
                    disabled:opacity-40
                  "
              >
                Prev
              </button>

              <div className="h-10 px-5 flex items-center">{currentPage}</div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="
                    h-10 px-5
                    border border-[var(--border)]
                    text-[var(--text-secondary)]
                    disabled:opacity-40
                  "
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* View Modal */}
      {selectedNewsletter && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-3xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-[var(--border)]">
              <div>
                <h2 className="font-serif text-2xl text-[var(--text-primary)]">
                  {selectedNewsletter.subject}
                </h2>

                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  {new Date(selectedNewsletter.sentAt).toLocaleString()}
                </p>
              </div>

              <button onClick={() => setSelectedNewsletter(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {viewLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div
                    className="prose max-w-none text-[var(--text-primary)]"
                    dangerouslySetInnerHTML={{
                      __html: selectedNewsletter.content,
                    }}
                  />

                  {/* Attachments */}
                  {selectedNewsletter.attachments?.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-medium mb-4">Attachments</h4>

                      <div className="space-y-3">
                        {selectedNewsletter.attachments.map((file, i) => (
                          <a
                            key={i}
                            href={file.url}
                            target="_blank"
                            className="flex items-center justify-between border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--text-secondary)]"
                          >
                            <div className="flex gap-3">
                              <span>{getFileIcon(file.type)}</span>

                              <div>
                                <p>{file.name}</p>

                                <p className="text-xs text-[var(--text-secondary)]">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>

                            <span className="text-sm text-[var(--primary)]">
                              View
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateNewsletterModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchNewsletters}
        />
      )}
    </div>
  );
}
