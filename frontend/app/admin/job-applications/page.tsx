"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface JobApplication {
  _id: string;
  careerId?: {
    _id: string;
    title: string;
  };

  name: string;
  email: string;
  phone: string;

  currentLocation?: string;
  experience?: string;

  currentCompany?: string;

  currentCTC?: string;
  expectedCTC?: string;

  noticePeriod?: string;

  coverLetter?: string;

  resumeUrl: string;

  status: "new" | "reviewing" | "shortlisted" | "rejected" | "hired";

  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

export default function AdminJobApplications() {
  const [contacts, setContacts] = useState<JobApplication[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<JobApplication[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  /* Fetch */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/job-application`);

        const result = await res.json();

        const applications = result.data || [];

        setContacts(applications);
        setFilteredContacts(applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
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

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application?")) return;

    try {
      await fetch(`${API_BASE}/job-application/${id}`, {
        method: "DELETE",
      });

      setContacts((prev) => prev.filter((item) => item._id !== id));

      setFilteredContacts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: JobApplication["status"],
  ) => {
    try {
      await fetch(`${API_BASE}/job-application/${id}/status`, {
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
            Job Application
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
            No Job Applications Found
          </h3>

          <p className="text-[var(--text-secondary)]">
            New Job Applications will appear here.
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
                        Candidate
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Position
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Experience
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Location
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Resume
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Status
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Applied On
                      </th>
                      <th className="px-5 py-4 text-right text-sm font-semibold text-[var(--text-primary)]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentContacts.map((contact) => (
                      <tr key={contact._id}>
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium">{contact.name}</p>

                            <p className="text-sm text-[var(--text-secondary)]">
                              {contact.email}
                            </p>

                            <p className="text-sm text-[var(--text-secondary)]">
                              {contact.phone}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {contact.careerId?.title || "General Application"}
                        </td>

                        <td className="px-5 py-4">
                          {contact.experience || "-"}
                        </td>

                        <td className="px-5 py-4">
                          {contact.currentLocation || "-"}
                        </td>

                        <td className="px-5 py-4">
                          <a
                            href={contact.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="
        text-blue-600
        underline
      "
                          >
                            View Resume
                          </a>
                        </td>

                        <td className="px-5 py-4">
                          <select
                            value={contact.status}
                            onChange={(e) =>
                              handleStatusChange(
                                contact._id,
                                e.target.value as JobApplication["status"],
                              )
                            }
                            className="
        border
        rounded-lg
        px-3
        py-2
        bg-[var(--card)]
      "
                          >
                            <option value="new">New</option>

                            <option value="reviewing">Reviewing</option>

                            <option value="shortlisted">Shortlisted</option>

                            <option value="rejected">Rejected</option>

                            <option value="hired">Hired</option>
                          </select>
                        </td>

                        <td className="px-5 py-4">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
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
                        contact.status === "hired"
                          ? "bg-green-500/10 text-green-600"
                          : contact.status === "shortlisted"
                            ? "bg-blue-500/10 text-blue-600"
                            : contact.status === "rejected"
                              ? "bg-red-500/10 text-red-600"
                              : contact.status === "reviewing"
                                ? "bg-purple-500/10 text-purple-600"
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
                        e.target.value as JobApplication["status"],
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
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                  </select>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-[var(--text-secondary)]">Email</span>
                    <p>{contact.email}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">Phone</span>
                    <p>{contact.phone}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Position
                    </span>
                    <p>{contact.careerId?.title || "General Application"}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Current Company
                    </span>
                    <p>{contact.currentCompany || "—"}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Experience
                    </span>
                    <p>{contact.experience || "—"}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Current CTC
                    </span>
                    <p>{contact.currentCTC || "—"}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Expected CTC
                    </span>
                    <p>{contact.expectedCTC || "—"}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Notice Period
                    </span>
                    <p>{contact.noticePeriod || "—"}</p>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">Resume</span>

                    <a
                      href={contact.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
        text-blue-600
        underline
      "
                    >
                      View Resume
                    </a>
                  </div>

                  <div>
                    <span className="text-[var(--text-secondary)]">Status</span>

                    <select
                      value={contact.status}
                      onChange={(e) =>
                        handleStatusChange(
                          contact._id,
                          e.target.value as JobApplication["status"],
                        )
                      }
                      className="
        mt-2
        w-full
        border
        rounded-lg
        px-3
        py-2
      "
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
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
