"use client";

import {
  Trash2,
  Search,
  Filter,
  RotateCcw,
  MessageCircle,
  Download,
  Eye,
  X,
} from "lucide-react";
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
  const [filterType, setFilterType] = useState<"all" | "today" | "range">(
    "all",
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "confirmed" | "completed" | "cancelled"
  >("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState<SiteVisit | null>(null);

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
    let filtered = contacts;

    // Date filters
    if (filterType === "today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((c) =>
        new Date(c.createdAt).toISOString().startsWith(today),
      );
    } else if (filterType === "range" && startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime() + 86400000;
      filtered = filtered.filter((c) => {
        const contactDate = new Date(c.createdAt).getTime();
        return contactDate >= start && contactDate <= end;
      });
    } else if (filterType === "all" && selectedDate) {
      filtered = filtered.filter((c) =>
        new Date(c.createdAt).toISOString().startsWith(selectedDate),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          (c.companyName && c.companyName.toLowerCase().includes(query)),
      );
    }

    setFilteredContacts(filtered);
    setCurrentPage(1);
  }, [
    filterType,
    selectedDate,
    startDate,
    endDate,
    contacts,
    searchQuery,
    statusFilter,
  ]);

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

  /* Export to CSV */
  const handleExport = () => {
    if (filteredContacts.length === 0) {
      alert("No site visits to export");
      return;
    }

    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Company",
        "Visit Date",
        "Visit Time",
        "Status",
        "Date Created",
      ],
      ...filteredContacts.map((visit) => [
        visit.name,
        visit.email,
        visit.phone,
        visit.companyName || "—",
        new Date(visit.visitDateTime).toLocaleDateString(),
        new Date(visit.visitDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        visit.status,
        new Date(visit.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `site-visits-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  /* Calculate Stats */
  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === "pending").length,
    confirmed: contacts.filter((c) => c.status === "confirmed").length,
    completed: contacts.filter((c) => c.status === "completed").length,
    cancelled: contacts.filter((c) => c.status === "cancelled").length,
  };

  const hasActiveFilters =
    searchQuery ||
    statusFilter !== "all" ||
    filterType !== "all" ||
    selectedDate ||
    startDate ||
    endDate;

  const resetFilters = () => {
    setFilterType("all");
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
              Admin Panel
            </p>

            <h1 className="font-serif text-4xl text-[var(--text-primary)]">
              Site Visits
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="
                h-11 px-6
                rounded-xl
                bg-[var(--primary)]
                text-white
                font-medium
                flex items-center gap-2
                hover:opacity-90
                transition
                disabled:opacity-50
              "
              disabled={filteredContacts.length === 0}
            >
              <Download size={18} />
              Export CSV
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="
                  h-11 px-4
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--card)]
                  text-[var(--text-primary)]
                  font-medium
                  flex items-center gap-2
                  hover:bg-[var(--background-secondary)]
                  transition
                "
              >
                <RotateCcw size={16} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
          {/* Total */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Total
            </p>
            <p className="text-3xl md:text-2xl font-bold text-blue-600">
              {stats.total}
            </p>
          </div>

          {/* Pending */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Pending
            </p>
            <p className="text-3xl md:text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>

          {/* Confirmed */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Confirmed
            </p>
            <p className="text-3xl md:text-2xl font-bold text-blue-600">
              {stats.confirmed}
            </p>
          </div>

          {/* Completed */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Completed
            </p>
            <p className="text-3xl md:text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
          </div>

          {/* Cancelled */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Cancelled
            </p>
            <p className="text-3xl md:text-2xl font-bold text-red-600">
              {stats.cancelled}
            </p>
          </div>
        </div>

        {/* Advanced Filter Section */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Advanced Filters
              </p>
              {hasActiveFilters && (
                <span className="px-2 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Showing{" "}
              <span className="font-semibold text-[var(--primary)]">
                {filteredContacts.length}
              </span>{" "}
              of <span className="font-semibold">{contacts.length}</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-5">
            <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
              Search
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]"
              />
              <input
                type="text"
                placeholder="Search by name, email, phone, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full h-11 pl-10 pr-4
                  border border-[var(--border)]
                  bg-[var(--background-secondary)]
                  text-[var(--text-primary)]
                  rounded-lg
                  outline-none
                  focus:ring-2 focus:ring-[var(--primary)]
                  placeholder:text-[var(--text-secondary)]
                "
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filter Type */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                Period
              </label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value as "all" | "today" | "range");
                  setStartDate("");
                  setEndDate("");
                  setSelectedDate("");
                }}
                className="
                  w-full h-10 px-3
                  border border-[var(--border)]
                  bg-[var(--background-secondary)]
                  text-[var(--text-primary)]
                  rounded-lg
                  outline-none
                  cursor-pointer
                  focus:ring-2 focus:ring-[var(--primary)]
                "
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="range">Date Range</option>
              </select>
            </div>

            {/* Single Date Filter */}
            {filterType === "all" && (
              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="
                    w-full h-10 px-3
                    border border-[var(--border)]
                    bg-[var(--background-secondary)]
                    text-[var(--text-primary)]
                    rounded-lg
                    outline-none
                    focus:ring-2 focus:ring-[var(--primary)]
                  "
                />
              </div>
            )}

            {/* Date Range */}
            {filterType === "range" && (
              <>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                    From
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="
                      w-full h-10 px-3
                      border border-[var(--border)]
                      bg-[var(--background-secondary)]
                      text-[var(--text-primary)]
                      rounded-lg
                      outline-none
                      focus:ring-2 focus:ring-[var(--primary)]
                    "
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                    To
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="
                      w-full h-10 px-3
                      border border-[var(--border)]
                      bg-[var(--background-secondary)]
                      text-[var(--text-primary)]
                      rounded-lg
                      outline-none
                      focus:ring-2 focus:ring-[var(--primary)]
                    "
                  />
                </div>
              </>
            )}

            {/* Status Filter */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "all"
                      | "pending"
                      | "confirmed"
                      | "completed"
                      | "cancelled",
                  )
                }
                className="
                  w-full h-10 px-3
                  border border-[var(--border)]
                  bg-[var(--background-secondary)]
                  text-[var(--text-primary)]
                  rounded-lg
                  outline-none
                  cursor-pointer
                  focus:ring-2 focus:ring-[var(--primary)]
                "
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
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
          {/* Unified Responsive Table */}
          <div className="w-full mb-20">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--background-secondary)] border-b border-[var(--border)]">
                      <th className="px-4 md:px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Name
                      </th>
                      <th className="hidden md:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Contact
                      </th>
                      <th className="hidden lg:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Company
                      </th>
                      <th className="hidden lg:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Visit Schedule
                      </th>
                      <th className="hidden md:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Status
                      </th>
                      <th className="hidden lg:table-cell px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                        Date
                      </th>
                      <th className="px-4 md:px-5 py-4 text-right text-sm font-semibold text-[var(--text-primary)]">
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
                        <td className="px-4 md:px-5 py-4">
                          <div>
                            <p className="font-medium text-[var(--text-primary)] text-sm md:text-base">
                              {contact.name}
                            </p>
                          </div>
                        </td>

                        <td className="hidden md:table-cell px-5 py-4">
                          <div>
                            <p className="text-[var(--text-primary)] text-sm">
                              {contact.phone}
                            </p>

                            <p className="text-xs text-[var(--text-secondary)]">
                              {contact.email}
                            </p>
                          </div>
                        </td>

                        <td className="hidden lg:table-cell px-5 py-4 text-[var(--text-primary)] text-sm">
                          {contact.companyName || "—"}
                        </td>

                        <td className="hidden lg:table-cell px-5 py-4">
                          <div>
                            <p className="font-medium text-[var(--text-primary)] text-sm">
                              {new Date(
                                contact.visitDateTime,
                              ).toLocaleDateString()}
                            </p>

                            <p className="text-xs text-[var(--text-secondary)]">
                              {new Date(
                                contact.visitDateTime,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </td>

                        <td className="hidden md:table-cell px-5 py-4">
                          <select
                            value={contact.status}
                            onChange={(e) =>
                              handleStatusChange(
                                contact._id,
                                e.target.value as SiteVisitStatus,
                              )
                            }
                            className={`
                              border rounded-lg px-2 py-1 text-xs md:text-sm
                              bg-[var(--card)] text-[var(--text-primary)]
                              cursor-pointer
                              ${
                                contact.status === "completed"
                                  ? "border-green-500/30"
                                  : contact.status === "confirmed"
                                    ? "border-blue-500/30"
                                    : contact.status === "cancelled"
                                      ? "border-red-500/30"
                                      : "border-yellow-500/30"
                              }
                            `}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="hidden lg:table-cell px-5 py-4 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-4 md:px-5 py-4">
                          <div className="flex justify-end gap-1 md:gap-2">
                            <button
                              onClick={() => setSelectedVisit(contact)}
                              className="h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-500/10 transition"
                              title="View details"
                            >
                              <Eye size={16} />
                            </button>

                            <a
                              href={`https://wa.me/${contact.phone.replace(/[^\d+]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-500/10 transition"
                              title="Send WhatsApp message"
                            >
                              <MessageCircle size={16} />
                            </a>

                            <button
                              onClick={() => handleDelete(contact._id)}
                              className="h-8 w-8 md:h-9 md:w-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition"
                              title="Delete"
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
            <div className="flex items-center justify-center md:justify-end gap-3 mt-8 pb-32">
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

          {/* Detail Popup Modal */}
          {selectedVisit && (
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
                        Site Visit Details
                      </p>

                      <h2 className="text-2xl md:text-3xl font-serif text-[var(--text-primary)]">
                        {selectedVisit.name}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedVisit(null)}
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

                {/* Body - Scrollable */}
                <div className="overflow-y-auto max-h-[calc(90vh-240px)] p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Name */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Name
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedVisit.name}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Email
                      </p>

                      <p className="font-medium text-[var(--text-primary)] break-all">
                        {selectedVisit.email}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Phone
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedVisit.phone}
                      </p>
                    </div>

                    {/* Company */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Company
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {selectedVisit.companyName || "—"}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Status
                      </p>

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedVisit.status === "completed"
                            ? "bg-green-500/10 text-green-600"
                            : selectedVisit.status === "confirmed"
                              ? "bg-blue-500/10 text-blue-600"
                              : selectedVisit.status === "cancelled"
                                ? "bg-red-500/10 text-red-600"
                                : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        ●{" "}
                        {selectedVisit.status.charAt(0).toUpperCase() +
                          selectedVisit.status.slice(1)}
                      </span>
                    </div>

                    {/* Verified */}
                    {/* Visit Date */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Visit Date
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {new Date(
                          selectedVisit.visitDateTime,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Visit Time */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Visit Time
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {new Date(
                          selectedVisit.visitDateTime,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Created Date */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Created On
                      </p>

                      <p className="font-medium text-[var(--text-primary)]">
                        {new Date(selectedVisit.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Message */}
                    {selectedVisit.message && (
                      <div className="md:col-span-2 lg:col-span-3">
                        <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                          <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-4">
                            Message
                          </p>

                          <p className="text-[var(--text-primary)] leading-7 whitespace-pre-wrap">
                            {selectedVisit.message}
                          </p>
                        </div>
                      </div>
                    )}
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
                        Visit Status
                      </p>

                      <p className="text-sm text-[var(--text-primary)] mt-1">
                        {selectedVisit.status === "completed"
                          ? "This visit is completed"
                          : selectedVisit.status === "confirmed"
                            ? "This visit is confirmed"
                            : selectedVisit.status === "cancelled"
                              ? "This visit is cancelled"
                              : "This visit is pending"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedVisit(null)}
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

                      <select
                        value={selectedVisit.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as SiteVisitStatus;
                          handleStatusChange(selectedVisit._id, newStatus);
                          setSelectedVisit({
                            ...selectedVisit,
                            status: newStatus,
                          });
                        }}
                        className="
          h-11 px-5
          rounded-xl
          border border-[var(--border)]
          bg-[var(--primary)]
          text-white
          font-medium
          cursor-pointer
          transition
        "
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
