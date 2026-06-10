"use client";

import CareerPopup from "@/app/components/CareerModal";
import {
  BriefcaseBusiness,
  Building2,
  Download,
  Eye,
  Filter,
  MapPin,
  Pencil,
  Plus,
  Power,
  RotateCcw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type StatusFilter = "all" | "active" | "inactive";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

async function requestCareers(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/career`, { cache: "no-store" });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch job openings");
  }

  return [...(result.data || [])].sort(
    (a: Career, b: Career) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ) as Career[];
}

export default function AdminOpenings() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [viewCareer, setViewCareer] = useState<Career | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const refreshCareers = useCallback(async () => {
    setCareers(await requestCareers(API_BASE));
  }, [API_BASE]);

  useEffect(() => {
    let cancelled = false;

    requestCareers(API_BASE)
      .then((data) => {
        if (!cancelled) setCareers(data);
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

  const departments = useMemo(
    () => uniqueOptions(careers.map((career) => career.department)),
    [careers],
  );
  const employmentTypes = useMemo(
    () => uniqueOptions(careers.map((career) => career.employmentType)),
    [careers],
  );
  const locations = useMemo(
    () => uniqueOptions(careers.map((career) => career.location)),
    [careers],
  );

  const filteredCareers = useMemo(() => {
    let filtered = careers;

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      filtered = filtered.filter(
        (career) =>
          career.title.toLowerCase().includes(query) ||
          career.department.toLowerCase().includes(query) ||
          career.location.toLowerCase().includes(query) ||
          career.employmentType.toLowerCase().includes(query) ||
          career.experience.toLowerCase().includes(query),
      );
    }

    if (statusFilter === "active") {
      filtered = filtered.filter((career) => career.isActive);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((career) => !career.isActive);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter(
        (career) => career.department === departmentFilter,
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (career) => career.employmentType === typeFilter,
      );
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter(
        (career) => career.location === locationFilter,
      );
    }

    return filtered;
  }, [
    careers,
    search,
    statusFilter,
    departmentFilter,
    typeFilter,
    locationFilter,
  ]);

  const stats = {
    total: careers.length,
    active: careers.filter((career) => career.isActive).length,
    inactive: careers.filter((career) => !career.isActive).length,
    departments: departments.length,
    applicationsReady: careers.filter((career) => career.isActive).length,
  };

  const hasActiveFilters =
    Boolean(search) ||
    statusFilter !== "all" ||
    departmentFilter !== "all" ||
    typeFilter !== "all" ||
    locationFilter !== "all";

  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const currentItems = filteredCareers.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setTypeFilter("all");
    setLocationFilter("all");
    setCurrentPage(1);
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setCareers(await requestCareers(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const previousCareer = careers.find((career) => career._id === id);
    if (!previousCareer) return;

    setCareers((prev) =>
      prev.map((career) =>
        career._id === id ? { ...career, isActive: !career.isActive } : career,
      ),
    );
    setViewCareer((prev) =>
      prev?._id === id ? { ...prev, isActive: !prev.isActive } : prev,
    );

    try {
      const res = await fetch(`${API_BASE}/career/${id}/toggle`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Status update failed");
      }
    } catch (err) {
      setCareers((prev) =>
        prev.map((career) =>
          career._id === id
            ? { ...career, isActive: previousCareer.isActive }
            : career,
        ),
      );
      setViewCareer((prev) =>
        prev?._id === id
          ? { ...prev, isActive: previousCareer.isActive }
          : prev,
      );
      alert(err instanceof Error ? err.message : "Status update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this opening?")) return;

    try {
      const res = await fetch(`${API_BASE}/career/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Delete failed");
      }

      setCareers((prev) => prev.filter((career) => career._id !== id));
      if (viewCareer?._id === id) setViewCareer(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleExport = () => {
    if (filteredCareers.length === 0) return;

    const escapeCell = (value: string | number | boolean) =>
      `"${String(value).replaceAll('"', '""')}"`;
    const csvContent = [
      [
        "Title",
        "Department",
        "Location",
        "Employment Type",
        "Experience",
        "Description",
        "Responsibilities",
        "Requirements",
        "Active",
        "Created At",
      ],
      ...filteredCareers.map((career) => [
        career.title,
        career.department,
        career.location,
        career.employmentType,
        career.experience,
        career.description,
        career.responsibilities.join(" | "),
        career.requirements.join(" | "),
        career.isActive,
        new Date(career.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `job-openings-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const openEdit = (career: Career) => {
    setSelectedCareer(career);
    setOpenEditPopup(true);
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
              Job Openings
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              disabled={filteredCareers.length === 0}
              className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:opacity-50"
            >
              <Download size={17} />
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

            <button
              onClick={() => setOpenCreatePopup(true)}
              className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 font-medium text-white transition hover:opacity-90"
            >
              <Plus size={18} />
              Create Job
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
          <StatCard
            label="Total"
            value={stats.total}
            icon={<BriefcaseBusiness size={18} />}
            color="blue"
          />
          <StatCard
            label="Active"
            value={stats.active}
            icon={<Power size={18} />}
            color="green"
          />
          <StatCard
            label="Inactive"
            value={stats.inactive}
            icon={<X size={18} />}
            color="red"
          />
          <StatCard
            label="Departments"
            value={stats.departments}
            icon={<Building2 size={18} />}
            color="violet"
          />
          <StatCard
            label="Hiring"
            value={stats.applicationsReady}
            icon={<Users size={18} />}
            color="yellow"
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[var(--primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Opening Filters
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
                {filteredCareers.length}
              </span>{" "}
              of <span className="font-semibold">{careers.length}</span>
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
                placeholder="Search by title, department, location, type, or experience..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] pl-10 pr-4 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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

            <FilterField label="Department">
              <select
                value={departmentFilter}
                onChange={(event) => {
                  setDepartmentFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label="Type">
              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Types</option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label="Location">
              <select
                value={locationFilter}
                onChange={(event) => {
                  setLocationFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
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
            Loading job openings...
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

      {!loading && !error && filteredCareers.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <BriefcaseBusiness size={25} />
          </div>
          <h3 className="mb-3 font-serif text-2xl text-[var(--text-primary)]">
            No Job Openings Found
          </h3>
          <p className="text-[var(--text-secondary)]">
            {hasActiveFilters
              ? "No openings match the selected filters."
              : "Create your first job opening to publish it on the careers page."}
          </p>
        </div>
      )}

      {!loading && !error && filteredCareers.length > 0 && (
        <>
          <div className="mb-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed md:table-auto">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                    <th className="w-[42%] px-3 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Opening
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] md:table-cell">
                      Location
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] lg:table-cell">
                      Type
                    </th>
                    <th className="w-[31%] px-2 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Status
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] xl:table-cell">
                      Created
                    </th>
                    <th className="w-[27%] px-2 py-4 text-right text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((career) => (
                    <tr
                      key={career._id}
                      className="border-b border-[var(--border)] transition last:border-b-0 hover:bg-[var(--background-secondary)]"
                    >
                      <td className="px-3 py-4 sm:px-4 md:px-5">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)] md:text-base">
                          {career.title}
                        </p>
                        <p className="mt-1 truncate text-[11px] text-[var(--text-secondary)] sm:text-xs">
                          {career.department} ·{" "}
                          {career.experience || "Experience NA"}
                        </p>
                      </td>

                      <td className="hidden px-5 py-4 md:table-cell">
                        <div className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                          <MapPin
                            size={15}
                            className="mt-0.5 shrink-0 text-[var(--primary)]"
                          />
                          <span>{career.location}</span>
                        </div>
                      </td>

                      <td className="hidden px-5 py-4 lg:table-cell">
                        <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                          {career.employmentType}
                        </span>
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <StatusBadge isActive={career.isActive} />
                      </td>

                      <td className="hidden whitespace-nowrap px-5 py-4 text-xs text-[var(--text-secondary)] xl:table-cell">
                        {new Date(career.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <div className="flex justify-end gap-0.5 sm:gap-1 md:gap-2">
                          <button
                            onClick={() => setViewCareer(career)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-indigo-500 transition hover:bg-indigo-500/10 md:h-9 md:w-9"
                            title="View details"
                            aria-label={`View ${career.title}`}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEdit(career)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition hover:bg-blue-500/10 md:h-9 md:w-9"
                            title="Edit"
                            aria-label={`Edit ${career.title}`}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(career._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-yellow-500 transition hover:bg-yellow-500/10 md:h-9 md:w-9"
                            title={career.isActive ? "Deactivate" : "Activate"}
                            aria-label={`${career.isActive ? "Deactivate" : "Activate"} ${career.title}`}
                          >
                            <Power size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(career._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10 md:h-9 md:w-9"
                            title="Delete"
                            aria-label={`Delete ${career.title}`}
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
              <div className="flex h-11 min-w-[72px] items-center justify-center rounded-xl bg-[var(--primary)] px-4 font-medium text-white">
                {activePage} / {totalPages}
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

      <CareerPopup
        isOpen={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        refreshData={refreshCareers}
      />

      <CareerPopup
        isOpen={openEditPopup}
        onClose={() => {
          setOpenEditPopup(false);
          setSelectedCareer(null);
        }}
        initialData={selectedCareer}
        refreshData={refreshCareers}
      />

      {viewCareer && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="opening-details-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setViewCareer(null);
          }}
        >
          <div className="relative max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:rounded-[32px]">
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-5 py-5 md:px-8">
              <div className="min-w-0 pr-3">
                <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[var(--primary)] sm:text-xs sm:tracking-[4px]">
                  Opening Details
                </p>
                <h2
                  id="opening-details-title"
                  className="truncate font-serif text-2xl text-[var(--text-primary)] md:text-3xl"
                >
                  {viewCareer.title}
                </h2>
              </div>
              <button
                onClick={() => setViewCareer(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] md:h-11 md:w-11"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[calc(94vh-190px)] overflow-y-auto p-5 md:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DetailCard label="Title" value={viewCareer.title} />
                <DetailCard label="Department" value={viewCareer.department} />
                <DetailCard label="Location" value={viewCareer.location} />
                <DetailCard label="Type" value={viewCareer.employmentType} />
                <DetailCard label="Experience" value={viewCareer.experience} />
                <DetailCard
                  label="Created On"
                  value={new Date(viewCareer.createdAt).toLocaleString()}
                />
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                  <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Status
                  </p>
                  <StatusBadge isActive={viewCareer.isActive} />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <RichSection title="Description">
                    <p className="whitespace-pre-wrap leading-7 text-[var(--text-primary)]">
                      {viewCareer.description || "No description provided."}
                    </p>
                  </RichSection>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <RichSection title="Responsibilities">
                    <DetailList items={viewCareer.responsibilities} />
                  </RichSection>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <RichSection title="Requirements">
                    <DetailList items={viewCareer.requirements} />
                  </RichSection>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--card)] px-5 py-4 md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => handleToggleStatus(viewCareer._id)}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-yellow-500/30 px-5 font-medium text-yellow-600 transition hover:bg-yellow-500/10"
                >
                  <Power size={17} />
                  {viewCareer.isActive ? "Deactivate" : "Activate"}
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewCareer(null)}
                    className="h-11 flex-1 rounded-xl border border-[var(--border)] px-5 text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] sm:flex-none"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      openEdit(viewCareer);
                      setViewCareer(null);
                    }}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 font-medium text-white transition hover:opacity-90 sm:flex-none"
                  >
                    <Pencil size={17} />
                    Edit Opening
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function uniqueOptions(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-green-500/10 text-green-600"
          : "bg-red-500/10 text-red-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {isActive ? "Active" : "Inactive"}
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

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
      <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </p>
      <p className="font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

function RichSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
      <p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        {title}
      </p>
      {children}
    </div>
  );
}

function DetailList({ items }: { items: string[] }) {
  const cleanItems = items.filter((item) => item.trim());

  if (cleanItems.length === 0) {
    return <p className="text-[var(--text-secondary)]">No details provided.</p>;
  }

  return (
    <ul className="space-y-3">
      {cleanItems.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex gap-3 text-[var(--text-primary)]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
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
  color: "blue" | "yellow" | "violet" | "green" | "red";
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
