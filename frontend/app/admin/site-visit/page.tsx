"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type SiteVisitStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface SiteVisit {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  message?: string;
  visitDateTime: string;
  status: SiteVisitStatus;
  createdAt: string;
  verified: boolean;
}

const ITEMS_PER_PAGE = 20;

export default function AdminSiteVisit() {
  const [contacts, setContacts] = useState<SiteVisit[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<SiteVisit[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  /* Fetch */
  useEffect(() => {
    const fetchSiteVisits = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/sitevisit`);
        const result = await res.json();

        const visits = result.data || [];

        const sorted = visits.sort(
          (a: SiteVisit, b: SiteVisit) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setContacts(sorted);
        setFilteredContacts(sorted);
      } catch (err) {
        console.error("Site Visit Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteVisits();
  }, [API_BASE]);

  /* Filter */
  useEffect(() => {
    if (!selectedDate) {
      setFilteredContacts(contacts);
      setCurrentPage(1);
      return;
    }

    const filtered = contacts.filter((c) =>
      new Date(c.createdAt).toISOString().startsWith(selectedDate),
    );

    setFilteredContacts(filtered);
    setCurrentPage(1);
  }, [selectedDate, contacts]);

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);

  const currentContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this data?")) return;

    try {
      await fetch(`${API_BASE}/sitevisit/${id}`, {
        method: "DELETE",
      });

      setContacts((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, status: SiteVisitStatus) => {
    try {
      await fetch(`${API_BASE}/sitevisit/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      setContacts((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item)),
      );
    } catch (error) {
      console.error(error);
    }
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
            Site Visits
          </h1>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="
            h-11 px-4
            border border-[var(--border)]
            bg-[var(--card)]
            text-[var(--text-primary)]
            outline-none
          "
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mb-4" />

          <p className="text-[var(--text-secondary)]">Loading leads...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredContacts.length === 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-3">
            No Site Visit Found
          </h3>

          <p className="text-[var(--text-secondary)]">
            New Site Visits will appear here.
          </p>
        </div>
      )}

      {/* Leads */}
      {/* Leads */}
      {!loading && filteredContacts.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--background-secondary)] border-b border-[var(--border)]">
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Name
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Contact
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Company
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Visit Schedule
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Status
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Date
                      </th>
                      <th className="px-5 py-4 text-right text-sm font-semibold text-[var(--text-primary)]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentContacts.map((contact) => (
                      <tr
                        key={contact._id}
                        className="border-b border-[var(--border)] hover:bg-[var(--background-secondary)] transition"
                      >
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">
                              {contact.name}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="text-[var(--text-primary)]">
                              {contact.phone}
                            </p>

                            <p className="text-sm text-[var(--text-secondary)]">
                              {contact.email}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-[var(--text-primary)]">
                          {contact.companyName || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">
                              {new Date(
                                contact.visitDateTime,
                              ).toLocaleDateString()}
                            </p>

                            <p className="text-sm text-[var(--text-secondary)]">
                              {new Date(
                                contact.visitDateTime,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <select
                              value={contact.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  contact._id,
                                  e.target.value as SiteVisitStatus,
                                )
                              }
                              className="border rounded-lg px-3 py-2 bg-[var(--card)]"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleDelete(contact._id)}
                              className="
                          h-9 w-9
                          rounded-lg
                          flex items-center justify-center
                          text-red-500
                          hover:bg-red-500/10
                          transition
                        "
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
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-5 lg:hidden">
            {currentContacts.map((contact) => (
              <div
                key={contact._id}
                className="
            bg-[var(--card)]
            border border-[var(--border)]
            rounded-2xl
            p-5
            shadow-sm
          "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                      {contact.name}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="
      h-9 w-9
      rounded-lg
      flex items-center justify-center
      text-red-500
      hover:bg-red-500/10
    "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[var(--background-secondary)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[var(--text-secondary)]">
                      Status
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === "completed"
                          ? "bg-green-500/10 text-green-600"
                          : contact.status === "confirmed"
                            ? "bg-blue-500/10 text-blue-600"
                            : contact.status === "cancelled"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-yellow-500/10 text-yellow-600"
                      }`}
                    >
                      {contact.status.charAt(0).toUpperCase() +
                        contact.status.slice(1)}
                    </span>
                  </div>

                  <select
                    value={contact.status}
                    onChange={(e) =>
                      handleStatusChange(
                        contact._id,
                        e.target.value as
                          | "pending"
                          | "confirmed"
                          | "completed"
                          | "cancelled",
                      )
                    }
                    className="
      w-full
      rounded-lg
      border
      border-[var(--border)]
      bg-[var(--card)]
      px-3
      py-2
      text-sm
      text-[var(--text-primary)]
    "
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="mt-4 grid gap-4 text-sm">
                  <div>
                    <span className="text-[var(--text-secondary)]">Email</span>

                    <p className="text-[var(--text-primary)] break-all">
                      {contact.email}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">Phone</span>

                    <p className="text-[var(--text-primary)]">
                      {contact.phone}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Company
                    </span>

                    <p className="text-[var(--text-primary)]">
                      {contact.companyName || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Visit Schedule
                    </span>

                    <p className="text-[var(--text-primary)] font-medium">
                      {new Date(contact.visitDateTime).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {new Date(contact.visitDateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Message
                    </span>

                    <p className="text-[var(--text-primary)] whitespace-pre-wrap">
                      {contact.message || "—"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center md:justify-end gap-3 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="
            h-11 px-5
            rounded-xl
            border border-[var(--border)]
            bg-[var(--card)]
            text-[var(--text-primary)]
            disabled:opacity-40
          "
              >
                Prev
              </button>

              <div
                className="
            h-11 min-w-[50px]
            rounded-xl
            bg-[var(--primary)]
            text-white
            flex items-center justify-center
            font-medium
          "
              >
                {currentPage}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="
            h-11 px-5
            rounded-xl
            border border-[var(--border)]
            bg-[var(--card)]
            text-[var(--text-primary)]
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
