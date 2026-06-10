"use client";

import {
  Download,
  Eye,
  FileText,
  Filter,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
  Search,
  Star,
  Trash2,
  Trophy,
  UserCheck,
  UserRoundX,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";
type FilterType = "all" | "today" | "range";

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
  status: ApplicationStatus;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

async function requestApplications(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/job-application`, { cache: "no-store" });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch job applications");
  }

  return [...(result.data || [])].sort(
    (a: JobApplication, b: JobApplication) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ) as JobApplication[];
}

export default function AdminJobApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ApplicationStatus>(
    "all",
  );
  const [positionFilter, setPositionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    let cancelled = false;

    requestApplications(API_BASE)
      .then((data) => {
        if (!cancelled) setApplications(data);
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

  const positions = useMemo(
    () =>
      Array.from(
        new Set(
          applications.map(
            (application) =>
              application.careerId?.title || "General Application",
          ),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [applications],
  );

  const filteredApplications = useMemo(() => {
    let filtered = applications;

    if (filterType === "today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((application) =>
        new Date(application.createdAt).toISOString().startsWith(today),
      );
    } else if (filterType === "range" && startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00`).getTime();
      const end = new Date(`${endDate}T23:59:59.999`).getTime();
      filtered = filtered.filter((application) => {
        const createdAt = new Date(application.createdAt).getTime();
        return createdAt >= start && createdAt <= end;
      });
    } else if (filterType === "all" && selectedDate) {
      filtered = filtered.filter((application) =>
        new Date(application.createdAt).toISOString().startsWith(selectedDate),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (application) => application.status === statusFilter,
      );
    }

    if (positionFilter !== "all") {
      filtered = filtered.filter(
        (application) =>
          (application.careerId?.title || "General Application") ===
          positionFilter,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((application) => {
        const position = application.careerId?.title || "General Application";

        return (
          application.name.toLowerCase().includes(query) ||
          application.email.toLowerCase().includes(query) ||
          application.phone.toLowerCase().includes(query) ||
          position.toLowerCase().includes(query) ||
          (application.currentLocation || "").toLowerCase().includes(query) ||
          (application.experience || "").toLowerCase().includes(query) ||
          (application.currentCompany || "").toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [
    applications,
    filterType,
    selectedDate,
    startDate,
    endDate,
    searchQuery,
    statusFilter,
    positionFilter,
  ]);

  const stats = {
    total: applications.length,
    new: applications.filter((application) => application.status === "new")
      .length,
    reviewing: applications.filter(
      (application) => application.status === "reviewing",
    ).length,
    shortlisted: applications.filter(
      (application) => application.status === "shortlisted",
    ).length,
    hired: applications.filter((application) => application.status === "hired")
      .length,
    rejected: applications.filter(
      (application) => application.status === "rejected",
    ).length,
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    statusFilter !== "all" ||
    positionFilter !== "all" ||
    filterType !== "all" ||
    Boolean(selectedDate || startDate || endDate);

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const currentApplications = filteredApplications.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setFilterType("all");
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    setStatusFilter("all");
    setPositionFilter("all");
    setCurrentPage(1);
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setApplications(await requestApplications(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application?")) return;

    try {
      const res = await fetch(`${API_BASE}/job-application/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Delete failed");
      }

      setApplications((prev) =>
        prev.filter((application) => application._id !== id),
      );
      if (selectedApplication?._id === id) setSelectedApplication(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    const previousStatus = applications.find(
      (application) => application._id === id,
    )?.status;

    setApplications((prev) =>
      prev.map((application) =>
        application._id === id ? { ...application, status } : application,
      ),
    );
    setSelectedApplication((prev) =>
      prev?._id === id ? { ...prev, status } : prev,
    );

    try {
      const res = await fetch(`${API_BASE}/job-application/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Status update failed");
      }
    } catch (err) {
      if (previousStatus) {
        setApplications((prev) =>
          prev.map((application) =>
            application._id === id
              ? { ...application, status: previousStatus }
              : application,
          ),
        );
        setSelectedApplication((prev) =>
          prev?._id === id ? { ...prev, status: previousStatus } : prev,
        );
      }
      alert(err instanceof Error ? err.message : "Status update failed");
    }
  };

  const handleExport = () => {
    if (filteredApplications.length === 0) return;

    const escapeCell = (value: string | number) =>
      `"${String(value).replaceAll('"', '""')}"`;
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Position",
        "Current Location",
        "Experience",
        "Current Company",
        "Current CTC",
        "Expected CTC",
        "Notice Period",
        "Cover Letter",
        "Resume URL",
        "Status",
        "Applied At",
      ],
      ...filteredApplications.map((application) => [
        application.name,
        application.email,
        application.phone,
        application.careerId?.title || "General Application",
        application.currentLocation || "",
        application.experience || "",
        application.currentCompany || "",
        application.currentCTC || "",
        application.expectedCTC || "",
        application.noticePeriod || "",
        application.coverLetter || "",
        application.resumeUrl,
        application.status,
        new Date(application.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `job-applications-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
              Job Applications
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              disabled={filteredApplications.length === 0}
              className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-6 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <Download size={18} />
              Export CSV
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)]"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 md:gap-4">
          <StatCard
            label="Total"
            value={stats.total}
            icon={<Users size={18} />}
            color="blue"
          />
          <StatCard
            label="New"
            value={stats.new}
            icon={<Star size={18} />}
            color="yellow"
          />
          <StatCard
            label="Reviewing"
            value={stats.reviewing}
            icon={<FileText size={18} />}
            color="violet"
          />
          <StatCard
            label="Shortlisted"
            value={stats.shortlisted}
            icon={<UserCheck size={18} />}
            color="cyan"
          />
          <StatCard
            label="Hired"
            value={stats.hired}
            icon={<Trophy size={18} />}
            color="green"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={<UserRoundX size={18} />}
            color="red"
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Candidate Filters
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
                {filteredApplications.length}
              </span>{" "}
              of <span className="font-semibold">{applications.length}</span>
            </p>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              Search
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />
              <input
                type="search"
                placeholder="Search by candidate, email, phone, position, company, location, or experience..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] pl-10 pr-4 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <FilterField label="Period">
              <select
                value={filterType}
                onChange={(event) => {
                  setFilterType(event.target.value as FilterType);
                  setSelectedDate("");
                  setStartDate("");
                  setEndDate("");
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="range">Date Range</option>
              </select>
            </FilterField>

            {filterType === "all" && (
              <FilterField label="Date">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </FilterField>
            )}

            {filterType === "range" && (
              <>
                <FilterField label="From">
                  <input
                    type="date"
                    value={startDate}
                    max={endDate || undefined}
                    onChange={(event) => {
                      setStartDate(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </FilterField>
                <FilterField label="To">
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(event) => {
                      setEndDate(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </FilterField>
              </>
            )}

            <FilterField label="Status">
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(
                    event.target.value as "all" | ApplicationStatus,
                  );
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </FilterField>

            <FilterField label="Position">
              <select
                value={positionFilter}
                onChange={(event) => {
                  setPositionFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Positions</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </FilterField>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex h-[300px] flex-col items-center justify-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-[var(--text-secondary)]">
            Loading job applications...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h3 className="mb-2 font-semibold text-red-600">
            Something went wrong
          </h3>
          <p className="mb-5 text-sm text-red-500">{error}</p>
          <button
            onClick={handleRetry}
            className="h-10 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredApplications.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <FileText size={25} />
          </div>
          <h3 className="mb-3 font-serif text-2xl text-[var(--text-primary)]">
            No Job Applications Found
          </h3>
          <p className="text-[var(--text-secondary)]">
            {hasActiveFilters
              ? "No applications match the selected filters."
              : "New candidate applications will appear here."}
          </p>
        </div>
      )}

      {!loading && !error && filteredApplications.length > 0 && (
        <>
          <div className="mb-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed md:table-auto">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                    <th className="w-[42%] px-3 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Candidate
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] md:table-cell">
                      Position
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] lg:table-cell">
                      Location
                    </th>
                    <th className="w-[31%] px-2 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Status
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] xl:table-cell">
                      Applied
                    </th>
                    <th className="w-[27%] px-2 py-4 text-right text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentApplications.map((application) => (
                    <tr
                      key={application._id}
                      className="border-b border-[var(--border)] transition last:border-b-0 hover:bg-[var(--background-secondary)]"
                    >
                      <td className="px-3 py-4 sm:px-4 md:px-5">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)] md:text-base">
                          {application.name}
                        </p>
                        <p className="mt-1 truncate text-[11px] text-[var(--text-secondary)] sm:text-xs">
                          {application.experience || "Experience NA"} ·{" "}
                          {application.currentCompany || "Company NA"}
                        </p>
                      </td>

                      <td className="hidden px-5 py-4 md:table-cell">
                        <p className="max-w-[240px] truncate text-sm text-[var(--text-primary)]">
                          {application.careerId?.title || "General Application"}
                        </p>
                        <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                          {application.email}
                        </p>
                      </td>

                      <td className="hidden px-5 py-4 lg:table-cell">
                        <div className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                          <MapPin
                            size={15}
                            className="mt-0.5 shrink-0 text-[var(--primary)]"
                          />
                          <span>{application.currentLocation || "-"}</span>
                        </div>
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <select
                          value={application.status}
                          onChange={(event) =>
                            handleStatusChange(
                              application._id,
                              event.target.value as ApplicationStatus,
                            )
                          }
                          aria-label={`Update status for ${application.name}`}
                          className={`h-8 w-full max-w-[112px] cursor-pointer rounded-lg border bg-[var(--card)] px-1 text-[10px] font-medium capitalize text-[var(--text-primary)] outline-none sm:px-2 sm:text-xs md:h-9 md:max-w-[130px] md:text-sm ${statusBorderClass(
                            application.status,
                          )}`}
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                      </td>

                      <td className="hidden whitespace-nowrap px-5 py-4 text-xs text-[var(--text-secondary)] xl:table-cell">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <div className="flex justify-end gap-0.5 sm:gap-1 md:gap-2">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition hover:bg-blue-500/10 md:h-9 md:w-9"
                            title="View details"
                            aria-label={`View ${application.name}`}
                          >
                            <Eye size={15} />
                          </button>
                          <a
                            href={application.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden h-9 w-9 items-center justify-center rounded-lg text-indigo-500 transition hover:bg-indigo-500/10 sm:flex"
                            title="View resume"
                            aria-label={`View resume for ${application.name}`}
                          >
                            <FileText size={16} />
                          </a>
                          <a
                            href={`https://wa.me/${application.phone.replace(/[^\d+]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden h-9 w-9 items-center justify-center rounded-lg text-green-500 transition hover:bg-green-500/10 sm:flex"
                            title="Send WhatsApp message"
                            aria-label={`Message ${application.name} on WhatsApp`}
                          >
                            <MessageCircle size={16} />
                          </a>
                          <button
                            onClick={() => handleDelete(application._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10 md:h-9 md:w-9"
                            title="Delete"
                            aria-label={`Delete ${application.name}`}
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

      {selectedApplication && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-details-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedApplication(null);
            }
          }}
        >
          <div className="relative max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:rounded-[32px]">
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-5 py-5 md:px-8">
              <div className="min-w-0 pr-3">
                <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[var(--primary)] sm:text-xs sm:tracking-[4px]">
                  Candidate Application Details
                </p>
                <h2
                  id="application-details-title"
                  className="truncate font-serif text-2xl text-[var(--text-primary)] md:text-3xl"
                >
                  {selectedApplication.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] md:h-11 md:w-11"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[calc(94vh-190px)] overflow-y-auto p-5 md:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DetailCard label="Name" value={selectedApplication.name} />
                <DetailCard
                  label="Email"
                  value={selectedApplication.email}
                  breakAll
                />
                <DetailCard label="Phone" value={selectedApplication.phone} />
                <DetailCard
                  label="Position"
                  value={
                    selectedApplication.careerId?.title || "General Application"
                  }
                />
                <DetailCard
                  label="Experience"
                  value={selectedApplication.experience || "Not provided"}
                />
                <DetailCard
                  label="Current Location"
                  value={selectedApplication.currentLocation || "Not provided"}
                />
                <DetailCard
                  label="Current Company"
                  value={selectedApplication.currentCompany || "Not provided"}
                />
                <DetailCard
                  label="Current CTC"
                  value={selectedApplication.currentCTC || "Not provided"}
                />
                <DetailCard
                  label="Expected CTC"
                  value={selectedApplication.expectedCTC || "Not provided"}
                />
                <DetailCard
                  label="Notice Period"
                  value={selectedApplication.noticePeriod || "Not provided"}
                />
                <DetailCard
                  label="Applied On"
                  value={new Date(
                    selectedApplication.createdAt,
                  ).toLocaleString()}
                />
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                  <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Status
                  </p>
                  <StatusBadge status={selectedApplication.status} />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                    <p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                      Cover Letter
                    </p>
                    <p className="whitespace-pre-wrap leading-7 text-[var(--text-primary)]">
                      {selectedApplication.coverLetter ||
                        "No cover letter provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--card)] px-5 py-4 md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-indigo-500/30 px-5 font-medium text-indigo-600 transition hover:bg-indigo-500/10"
                  >
                    <FileText size={17} />
                    Resume
                  </a>
                  <a
                    href={`mailto:${selectedApplication.email}`}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-500/30 px-5 font-medium text-blue-600 transition hover:bg-blue-500/10"
                  >
                    <Mail size={17} />
                    Email
                  </a>
                  <a
                    href={`tel:${selectedApplication.phone}`}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-500/30 px-5 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)]"
                  >
                    <Phone size={17} />
                    Call
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="h-11 flex-1 rounded-xl border border-[var(--border)] px-5 text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] sm:flex-none"
                  >
                    Close
                  </button>
                  <select
                    value={selectedApplication.status}
                    onChange={(event) =>
                      handleStatusChange(
                        selectedApplication._id,
                        event.target.value as ApplicationStatus,
                      )
                    }
                    className="h-11 flex-1 cursor-pointer rounded-xl border border-[var(--primary)] bg-[var(--primary)] px-4 font-medium text-white outline-none sm:flex-none"
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
          </div>
        </div>
      )}
    </div>
  );
}

function statusBorderClass(status: ApplicationStatus) {
  const classes: Record<ApplicationStatus, string> = {
    new: "border-yellow-500/40",
    reviewing: "border-violet-500/40",
    shortlisted: "border-cyan-500/40",
    rejected: "border-red-500/40",
    hired: "border-green-500/40",
  };
  return classes[status];
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const classes: Record<ApplicationStatus, string> = {
    new: "bg-yellow-500/10 text-yellow-600",
    reviewing: "bg-violet-500/10 text-violet-600",
    shortlisted: "bg-cyan-500/10 text-cyan-600",
    rejected: "bg-red-500/10 text-red-600",
    hired: "bg-green-500/10 text-green-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${classes[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </label>
      {children}
    </div>
  );
}

function DetailCard({
  label,
  value,
  breakAll = false,
}: {
  label: string;
  value: string;
  breakAll?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
      <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </p>
      <p
        className={`font-medium text-[var(--text-primary)] ${
          breakAll ? "break-all" : ""
        }`}
      >
        {value}
      </p>
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
  value: number;
  icon: ReactNode;
  color: "blue" | "yellow" | "violet" | "cyan" | "green" | "red";
}) {
  const styles = {
    blue: {
      card: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
      icon: "bg-blue-500/10 text-blue-600",
      value: "text-blue-600",
    },
    yellow: {
      card: "from-yellow-500/10 to-yellow-600/5 border-yellow-500/20",
      icon: "bg-yellow-500/10 text-yellow-600",
      value: "text-yellow-600",
    },
    violet: {
      card: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
      icon: "bg-violet-500/10 text-violet-600",
      value: "text-violet-600",
    },
    cyan: {
      card: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20",
      icon: "bg-cyan-500/10 text-cyan-600",
      value: "text-cyan-600",
    },
    green: {
      card: "from-green-500/10 to-green-600/5 border-green-500/20",
      icon: "bg-green-500/10 text-green-600",
      value: "text-green-600",
    },
    red: {
      card: "from-red-500/10 to-red-600/5 border-red-500/20",
      icon: "bg-red-500/10 text-red-600",
      value: "text-red-600",
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
