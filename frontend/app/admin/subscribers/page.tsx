"use client";

import {
  CalendarDays,
  Download,
  Filter,
  Mail,
  RotateCcw,
  Search,
  Trash2,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

type FilterType = "all" | "today" | "range";
type StatusFilter = "all" | "active" | "inactive";

const ITEMS_PER_PAGE = 20;

async function requestSubscribers(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/subscribers`, {
    cache: "no-store",
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch subscribers");
  }

  return [...(json.data || [])].sort(
    (a: Subscriber, b: Subscriber) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export default function AdminSubscriber() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const fetchSubscribers = useCallback(async () => {
    try {
      setSubscribers(await requestSubscribers(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    let cancelled = false;

    requestSubscribers(API_BASE)
      .then((data) => {
        if (!cancelled) setSubscribers(data);
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

  const filteredSubscribers = useMemo(() => {
    let filtered = subscribers;

    if (filterType === "today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((subscriber) =>
        new Date(subscriber.createdAt).toISOString().startsWith(today),
      );
    } else if (filterType === "range" && startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00`).getTime();
      const end = new Date(`${endDate}T23:59:59.999`).getTime();
      filtered = filtered.filter((subscriber) => {
        const subscribedAt = new Date(subscriber.createdAt).getTime();
        return subscribedAt >= start && subscribedAt <= end;
      });
    } else if (filterType === "all" && selectedDate) {
      filtered = filtered.filter((subscriber) =>
        new Date(subscriber.createdAt).toISOString().startsWith(selectedDate),
      );
    }

    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter(
        (subscriber) => subscriber.isActive === isActive,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [
    subscribers,
    filterType,
    selectedDate,
    startDate,
    endDate,
    searchQuery,
    statusFilter,
  ]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;

    try {
      const res = await fetch(`${API_BASE}/subscribers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setSubscribers((prev) =>
        prev.filter((subscriber) => subscriber._id !== id),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleExport = () => {
    if (filteredSubscribers.length === 0) return;

    const escapeCsvCell = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const csvContent = [
      ["Email", "Status", "Subscribed At"],
      ...filteredSubscribers.map((subscriber) => [
        subscriber.email,
        subscriber.isActive ? "Active" : "Inactive",
        new Date(subscriber.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.map(escapeCsvCell).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setFilterType("all");
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handleRetry = () => {
    setLoading(true);
    setError("");
    void fetchSubscribers();
  };

  const stats = {
    total: subscribers.length,
    active: subscribers.filter((subscriber) => subscriber.isActive).length,
    inactive: subscribers.filter((subscriber) => !subscriber.isActive).length,
    thisMonth: subscribers.filter((subscriber) => {
      const date = new Date(subscriber.createdAt);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    statusFilter !== "all" ||
    filterType !== "all" ||
    Boolean(selectedDate || startDate || endDate);

  const totalPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const currentSubscribers = filteredSubscribers.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
              Admin Panel
            </p>
            <h1 className="font-serif text-4xl text-[var(--text-primary)]">
              Subscribers
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              disabled={filteredSubscribers.length === 0}
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

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard
            label="Total"
            value={stats.total}
            icon={<Users size={19} />}
            color="blue"
          />
          <StatCard
            label="Active"
            value={stats.active}
            icon={<UserCheck size={19} />}
            color="green"
          />
          <StatCard
            label="Inactive"
            value={stats.inactive}
            icon={<UserX size={19} />}
            color="red"
          />
          <StatCard
            label="This Month"
            value={stats.thisMonth}
            icon={<CalendarDays size={19} />}
            color="violet"
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Advanced Filters
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
                {filteredSubscribers.length}
              </span>{" "}
              of <span className="font-semibold">{subscribers.length}</span>
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
                placeholder="Search by email address..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] pl-10 pr-4 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  setStatusFilter(event.target.value as StatusFilter);
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FilterField>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex h-[300px] flex-col items-center justify-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-[var(--text-secondary)]">Loading subscribers...</p>
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

      {!loading && !error && filteredSubscribers.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Mail size={25} />
          </div>
          <h3 className="mb-3 font-serif text-2xl text-[var(--text-primary)]">
            No Subscribers Found
          </h3>
          <p className="text-[var(--text-secondary)]">
            {hasActiveFilters
              ? "No subscribers match the selected filters."
              : "New subscribers will appear here."}
          </p>
        </div>
      )}

      {!loading && !error && filteredSubscribers.length > 0 && (
        <>
          <div className="mb-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[var(--text-primary)] md:px-5">
                      Subscriber
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] sm:table-cell">
                      Status
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] md:table-cell">
                      Subscribed At
                    </th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-[var(--text-primary)] md:px-5">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber._id}
                      className="border-b border-[var(--border)] transition last:border-b-0 hover:bg-[var(--background-secondary)]"
                    >
                      <td className="px-4 py-4 md:px-5">
                        <div className="flex items-center gap-3">
                          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] sm:flex">
                            <Mail size={17} />
                          </div>
                          <div className="min-w-0">
                            <p className="break-all text-sm font-medium text-[var(--text-primary)] md:text-base">
                              {subscriber.email}
                            </p>
                            <p className="mt-1 text-xs text-[var(--text-secondary)] sm:hidden">
                              {subscriber.isActive ? "Active" : "Inactive"} ·{" "}
                              {new Date(
                                subscriber.createdAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="hidden px-5 py-4 sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            subscriber.isActive
                              ? "bg-green-500/10 text-green-600"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              subscriber.isActive
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          {subscriber.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="hidden px-5 py-4 md:table-cell">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                          {new Date(subscriber.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </td>

                      <td className="px-4 py-4 md:px-5">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDelete(subscriber._id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10"
                            title="Delete subscriber"
                            aria-label={`Delete ${subscriber.email}`}
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
    </div>
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

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  color: "blue" | "green" | "red" | "violet";
}) {
  const styles = {
    blue: {
      card: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
      accent: "bg-blue-500/10 text-blue-600",
      value: "text-blue-600",
    },
    green: {
      card: "from-green-500/10 to-green-600/5 border-green-500/20",
      accent: "bg-green-500/10 text-green-600",
      value: "text-green-600",
    },
    red: {
      card: "from-red-500/10 to-red-600/5 border-red-500/20",
      accent: "bg-red-500/10 text-red-600",
      value: "text-red-600",
    },
    violet: {
      card: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
      accent: "bg-violet-500/10 text-violet-600",
      value: "text-violet-600",
    },
  }[color];

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 ${styles.card}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles.accent}`}
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
