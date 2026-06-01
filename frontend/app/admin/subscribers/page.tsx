"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

export default function AdminSubscriber() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>(
    [],
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Fetch */
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/subscribers`,
        {
          cache: "no-store",
        },
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to fetch subscribers");
      }

      const sorted = json.data.sort(
        (a: Subscriber, b: Subscriber) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setSubscribers(sorted);
      setFilteredSubscribers(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  /* Date filter */
  useEffect(() => {
    if (!selectedDate) {
      setFilteredSubscribers(subscribers);
      setCurrentPage(1);
      return;
    }

    const filtered = subscribers.filter((s) =>
      new Date(s.createdAt).toISOString().startsWith(selectedDate),
    );

    setFilteredSubscribers(filtered);

    setCurrentPage(1);
  }, [selectedDate, subscribers]);

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subscribers/${id}`, {
        method: "DELETE",
      });

      setSubscribers((prev) => prev.filter((s) => s._id !== id));

      setFilteredSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  /* Pagination */
  const totalPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE);

  const currentSubscribers = filteredSubscribers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            Subscribers
          </h1>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="
    h-11 px-4 rounded-xl
    border border-[var(--border)]
    bg-[var(--background)]
    text-[var(--text-primary)]
    outline-none
    focus:border-[var(--primary)]
    focus:ring-2
    focus:ring-[var(--primary)]/20
  "
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mb-4" />

          <p className="text-[var(--text-secondary)]">Loading subscribers...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h3 className="text-red-600 font-semibold mb-2">
            Something went wrong
          </h3>

          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredSubscribers.length === 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-3">
            No Subscribers Found
          </h3>

          <p className="text-[var(--text-secondary)]">
            New subscribers will appear here.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && filteredSubscribers.length > 0 && (
        <>
          <div className="overflow-x-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  <th className="px-5 py-4 text-left text-sm text-[var(--text-primary)]">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-[var(--text-primary)]">
                    Subscribed At
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-[var(--text-primary)]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center text-sm text-[var(--text-primary)]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentSubscribers.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-t border-[var(--border)] hover:bg-[var(--muted)] transition"
                  >
                    <td className="px-5 py-4 text-sm text-[var(--text-primary)]">
                      {sub.email}
                    </td>

                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`
                              px-3 py-1 rounded-full text-xs font-medium
                              ${
                                sub.isActive
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-600"
                              }
                            `}
                      >
                        {sub.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
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
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                    disabled:opacity-40
                  "
              >
                Prev
              </button>

              <div className="h-10 px-5 flex items-center text-[var(--text-primary)]">
                {currentPage}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="
                    h-10 px-5
                    border border-[var(--border)]
                    text-[var(--text-secondary)]
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                    disabled:opacity-40
                  "
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
