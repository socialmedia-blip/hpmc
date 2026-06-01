"use client";

import { Trash2 } from "lucide-react";
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
                        Products
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
                          <div className="flex flex-wrap gap-2">
                            {contact.products?.length ? (
                              contact.products.map((product, index) => (
                                <span
                                  key={index}
                                  className="
                              px-2 py-1
                              rounded-full
                              text-xs
                              bg-[var(--primary)]/10
                              text-[var(--primary)]
                            "
                                >
                                  {product}
                                </span>
                              ))
                            ) : (
                              <span className="text-[var(--text-secondary)]">
                                —
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
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
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                contact.marked
                                  ? "bg-green-500/10 text-green-600"
                                  : "bg-yellow-500/10 text-yellow-600"
                              }`}
                            >
                              {contact.marked ? "Completed" : "Pending"}
                            </span>
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
                <div className="flex justify-between items-start mb-4">
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

                <div className="space-y-3 text-sm">
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
                      Products
                    </span>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {contact.products?.length ? (
                        contact.products.map((product, index) => (
                          <span
                            key={index}
                            className="
                          px-2 py-1
                          rounded-full
                          text-xs
                          bg-[var(--primary)]/10
                          text-[var(--primary)]
                        "
                          >
                            {product}
                          </span>
                        ))
                      ) : (
                        <span className="text-[var(--text-secondary)]">—</span>
                      )}
                    </div>
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

                <div className="flex items-center justify-between mt-5 pt-5 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={contact.marked || false}
                      onChange={(e) =>
                        handleMark(contact._id, e.target.checked)
                      }
                      className="accent-[var(--primary)]"
                    />

                    <span className="text-sm text-[var(--text-secondary)]">
                      Completed
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contact.marked
                        ? "bg-green-500/10 text-green-600"
                        : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {contact.marked ? "Completed" : "Pending"}
                  </span>
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
