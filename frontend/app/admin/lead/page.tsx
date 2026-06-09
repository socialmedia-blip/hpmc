"use client";

import { Eye, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface LeadRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  products?: string[];
  message?: string;
  marked?: boolean;
  verified?: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

export default function AdminLead() {
  const [contacts, setContacts] = useState<LeadRequest[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<LeadRequest[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<LeadRequest | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  /* Fetch */
  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE}/lead`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: LeadRequest, b: LeadRequest) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setContacts(sorted);
        setFilteredContacts(sorted);
      })
      .catch((err) => console.error("Lead Error:", err))
      .finally(() => setLoading(false));
  }, []);

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

  /* Mark */
  const handleMark = async (id: string, marked: boolean) => {
    try {
      await fetch(`${API_BASE}/lead/${id}/mark`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marked,
        }),
      });

      setContacts((prev) =>
        prev.map((lead) =>
          lead._id === id
            ? {
                ...lead,
                marked,
              }
            : lead,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;

    try {
      await fetch(`${API_BASE}/lead/${id}`, {
        method: "DELETE",
      });

      setContacts((prev) => prev.filter((lead) => lead._id !== id));
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
            Leads
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
            No Leads Found
          </h3>

          <p className="text-[var(--text-secondary)]">
            New leads will appear here.
          </p>
        </div>
      )}

      {/* Leads */}
      {/* Leads */}
      {!loading && filteredContacts.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--background-secondary)] border-b border-[var(--border)]">
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Name
                      </th>

                      <th className="hidden md:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Phone
                      </th>

                      <th className="hidden md:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Company
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Status
                      </th>

                      <th className="hidden md:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
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

                            <p
                              className={`text-xs mt-1 ${
                                contact.verified
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {contact.verified ? "Verified" : "Not Verified"}
                            </p>
                          </div>
                        </td>

                        <td className="hidden md:table-cell px-5 py-4">
                          <div>
                            <p className="text-[var(--text-primary)]">
                              {contact.phone}
                            </p>

                            <p className="text-sm text-[var(--text-secondary)]">
                              {contact.email}
                            </p>
                          </div>
                        </td>

                        <td className="hidden md:table-cell px-5 py-4 text-[var(--text-primary)]">
                          {" "}
                          {contact.companyName || "—"}
                        </td>

                        <td className="px-3 md:px-5 py-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={contact.marked || false}
                              onChange={(e) =>
                                handleMark(contact._id, e.target.checked)
                              }
                              className="accent-[var(--primary)]"
                            />

                            <span
                              className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                                contact.marked
                                  ? "bg-green-500/10 text-green-600"
                                  : "bg-yellow-500/10 text-yellow-600"
                              }`}
                            >
                              {contact.marked ? "Completed" : "Pending"}
                            </span>
                          </div>
                        </td>

                        <td className="hidden md:table-cell px-5 py-4 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                          {" "}
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-3 md:px-5 py-4">
                          <div className="flex justify-end gap-1 md:gap-2">
                            <button
                              onClick={() => setSelectedLead(contact)}
                              className="h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-500/10 transition"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(contact._id)}
                              className="h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition"
                            >
                              <Trash2 size={16} />
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

          {selectedLead && (
            <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
              <div
                className="
        relative
        w-full
        max-w-4xl
        max-h-[90vh]
        overflow-hidden
        rounded-[32px]
        bg-[var(--card)]
        border border-[var(--border)]
        shadow-[0_30px_100px_rgba(0,0,0,0.35)]
      "
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-6 md:px-8 py-5 rounded-t-[32px]">
                  {" "}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
                        Lead Information
                      </p>

                      <h2 className="text-2xl md:text-3xl font-serif text-[var(--text-primary)]">
                        {selectedLead.name}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedLead(null)}
                      className="
              h-11 w-11
              rounded-xl
              border border-[var(--border)]
              flex items-center justify-center
              hover:bg-[var(--background-secondary)]
              transition
            "
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto max-h-[calc(90vh-240px)] p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Name */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Name
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedLead.name}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Phone
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedLead.phone}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Email
                      </p>

                      <p className="font-medium text-[var(--text-primary)] break-all">
                        {selectedLead.email}
                      </p>
                    </div>

                    {/* Company */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Company
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedLead.companyName || "—"}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Status
                      </p>

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedLead.marked
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        ● {selectedLead.marked ? "Completed" : "Pending"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Created On
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {new Date(selectedLead.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Products */}
                    <div className="md:col-span-3">
                      <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-4">
                          Interested Products
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {selectedLead.products?.length ? (
                            selectedLead.products.map((product, index) => (
                              <span
                                key={index}
                                className="
                        px-4 py-2
                        rounded-full
                        bg-[var(--primary)]/10
                        text-[var(--primary)]
                        text-sm
                        font-medium
                      "
                              >
                                {product}
                              </span>
                            ))
                          ) : (
                            <span className="text-[var(--text-secondary)]">
                              No Products Selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-3">
                      <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-4">
                          Message
                        </p>

                        <p className="text-[var(--text-primary)] leading-7 whitespace-pre-wrap">
                          {selectedLead.message || "No Message Provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="
    sticky bottom-0
    bg-[var(--card)]
    border-t border-[var(--border)]
    px-6 md:px-8 py-4
    rounded-b-[32px]
  "
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                        Lead Status
                      </p>

                      <p className="text-sm text-[var(--text-primary)] mt-1">
                        {selectedLead.marked
                          ? "This lead is completed"
                          : "This lead is pending"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedLead(null)}
                        className="
          h-11 px-5
          rounded-xl
          border border-[var(--border)]
          text-[var(--text-primary)]
          hover:bg-[var(--background-secondary)]
          transition
        "
                      >
                        Close
                      </button>

                      <button
                        onClick={() => {
                          handleMark(selectedLead._id, !selectedLead.marked);

                          setSelectedLead({
                            ...selectedLead,
                            marked: !selectedLead.marked,
                          });
                        }}
                        className={`
          h-11 px-6
          rounded-xl
          font-medium
          transition
          ${
            selectedLead.marked
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-green-600 text-white hover:bg-green-700"
          }
        `}
                      >
                        {selectedLead.marked
                          ? "Mark as Pending"
                          : "Mark as Completed"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
