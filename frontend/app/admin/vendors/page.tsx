"use client";

import {
  Building2,
  Download,
  Eye,
  Factory,
  Filter,
  MapPin,
  MessageCircle,
  PackageSearch,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  UserRoundX,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type VendorStatus = "pending" | "under_review" | "approved" | "rejected";
type FilterType = "all" | "today" | "range";

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  gstNumber?: string;
  panNumber?: string;
  businessType:
    | "Manufacturer"
    | "Trader"
    | "Service Provider"
    | "Raw Material Supplier"
    | "Transporter"
    | "Other";
  address: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;
  productsServices: string;
  experience?: number;
  website?: string;
  message?: string;
  status: VendorStatus;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

async function requestVendors(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/vendor`, { cache: "no-store" });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch vendor registrations");
  }

  return [...(result.data || [])].sort(
    (a: Vendor, b: Vendor) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ) as Vendor[];
}

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | VendorStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    let cancelled = false;

    requestVendors(API_BASE)
      .then((data) => {
        if (!cancelled) setVendors(data);
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

  const filteredVendors = useMemo(() => {
    let filtered = vendors;

    if (filterType === "today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((vendor) =>
        new Date(vendor.createdAt).toISOString().startsWith(today),
      );
    } else if (filterType === "range" && startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00`).getTime();
      const end = new Date(`${endDate}T23:59:59.999`).getTime();
      filtered = filtered.filter((vendor) => {
        const createdAt = new Date(vendor.createdAt).getTime();
        return createdAt >= start && createdAt <= end;
      });
    } else if (filterType === "all" && selectedDate) {
      filtered = filtered.filter((vendor) =>
        new Date(vendor.createdAt).toISOString().startsWith(selectedDate),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((vendor) => vendor.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.email.toLowerCase().includes(query) ||
          vendor.phone.toLowerCase().includes(query) ||
          vendor.companyName.toLowerCase().includes(query) ||
          vendor.businessType.toLowerCase().includes(query) ||
          vendor.city.toLowerCase().includes(query) ||
          vendor.state.toLowerCase().includes(query) ||
          vendor.productsServices.toLowerCase().includes(query) ||
          (vendor.gstNumber || "").toLowerCase().includes(query) ||
          (vendor.panNumber || "").toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [
    vendors,
    filterType,
    selectedDate,
    startDate,
    endDate,
    searchQuery,
    statusFilter,
  ]);

  const stats = {
    total: vendors.length,
    pending: vendors.filter((vendor) => vendor.status === "pending").length,
    underReview: vendors.filter((vendor) => vendor.status === "under_review")
      .length,
    approved: vendors.filter((vendor) => vendor.status === "approved").length,
    rejected: vendors.filter((vendor) => vendor.status === "rejected").length,
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    statusFilter !== "all" ||
    filterType !== "all" ||
    Boolean(selectedDate || startDate || endDate);

  const totalPages = Math.ceil(filteredVendors.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const currentVendors = filteredVendors.slice(
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
    setCurrentPage(1);
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setVendors(await requestVendors(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vendor registration?")) return;

    try {
      const res = await fetch(`${API_BASE}/vendor/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Delete failed");
      }

      setVendors((prev) => prev.filter((vendor) => vendor._id !== id));
      if (selectedVendor?._id === id) setSelectedVendor(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleStatusChange = async (id: string, status: VendorStatus) => {
    const previousStatus = vendors.find((vendor) => vendor._id === id)?.status;

    setVendors((prev) =>
      prev.map((vendor) =>
        vendor._id === id ? { ...vendor, status } : vendor,
      ),
    );
    setSelectedVendor((prev) =>
      prev?._id === id ? { ...prev, status } : prev,
    );

    try {
      const res = await fetch(`${API_BASE}/vendor/${id}/status`, {
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
        setVendors((prev) =>
          prev.map((vendor) =>
            vendor._id === id ? { ...vendor, status: previousStatus } : vendor,
          ),
        );
        setSelectedVendor((prev) =>
          prev?._id === id ? { ...prev, status: previousStatus } : prev,
        );
      }
      alert(err instanceof Error ? err.message : "Status update failed");
    }
  };

  const handleExport = () => {
    if (filteredVendors.length === 0) return;

    const escapeCell = (value: string | number) =>
      `"${String(value).replaceAll('"', '""')}"`;
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Company",
        "GST Number",
        "PAN Number",
        "Business Type",
        "Products / Services",
        "Experience",
        "Address",
        "City",
        "State",
        "Country",
        "Pincode",
        "Website",
        "Message",
        "Status",
        "Registered At",
      ],
      ...filteredVendors.map((vendor) => [
        vendor.name,
        vendor.email,
        vendor.phone,
        vendor.companyName,
        vendor.gstNumber || "",
        vendor.panNumber || "",
        vendor.businessType,
        vendor.productsServices,
        vendor.experience ?? 0,
        vendor.address,
        vendor.city,
        vendor.state,
        vendor.country,
        vendor.pincode || "",
        vendor.website || "",
        vendor.message || "",
        vendor.status,
        new Date(vendor.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vendor-registrations-${
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
              Vendor Registrations
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              disabled={filteredVendors.length === 0}
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

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
          <StatCard
            label="Total"
            value={stats.total}
            icon={<Users size={18} />}
            color="blue"
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            icon={<PackageSearch size={18} />}
            color="yellow"
          />
          <StatCard
            label="Under Review"
            value={stats.underReview}
            icon={<Factory size={18} />}
            color="violet"
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            icon={<ShieldCheck size={18} />}
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
                {filteredVendors.length}
              </span>{" "}
              of <span className="font-semibold">{vendors.length}</span>
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
                placeholder="Search by name, email, phone, company, GST, PAN, product, or location..."
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
                  setStatusFilter(event.target.value as "all" | VendorStatus);
                  setCurrentPage(1);
                }}
                className="h-10 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </FilterField>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex h-[300px] flex-col items-center justify-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-[var(--text-secondary)]">
            Loading vendor registrations...
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

      {!loading && !error && filteredVendors.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Building2 size={25} />
          </div>
          <h3 className="mb-3 font-serif text-2xl text-[var(--text-primary)]">
            No Vendor Registrations Found
          </h3>
          <p className="text-[var(--text-secondary)]">
            {hasActiveFilters
              ? "No registrations match the selected filters."
              : "New vendor registrations will appear here."}
          </p>
        </div>
      )}

      {!loading && !error && filteredVendors.length > 0 && (
        <>
          <div className="mb-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed md:table-auto">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                    <th className="w-[42%] px-3 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Vendor
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] md:table-cell">
                      Contact
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] lg:table-cell">
                      Location
                    </th>
                    <th className="w-[31%] px-2 py-4 text-left text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Status
                    </th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold text-[var(--text-primary)] xl:table-cell">
                      Date
                    </th>
                    <th className="w-[27%] px-2 py-4 text-right text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:text-sm md:w-auto md:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentVendors.map((vendor) => (
                    <tr
                      key={vendor._id}
                      className="border-b border-[var(--border)] transition last:border-b-0 hover:bg-[var(--background-secondary)]"
                    >
                      <td className="px-3 py-4 sm:px-4 md:px-5">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)] md:text-base">
                          {vendor.name}
                        </p>
                        <p className="mt-1 truncate text-[11px] text-[var(--text-secondary)] sm:text-xs">
                          {vendor.companyName}
                        </p>
                      </td>

                      <td className="hidden px-5 py-4 md:table-cell">
                        <p className="text-sm text-[var(--text-primary)]">
                          {vendor.phone}
                        </p>
                        <p className="mt-1 max-w-[220px] truncate text-xs text-[var(--text-secondary)]">
                          {vendor.email}
                        </p>
                      </td>

                      <td className="hidden px-5 py-4 lg:table-cell">
                        <div className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                          <MapPin
                            size={15}
                            className="mt-0.5 shrink-0 text-[var(--primary)]"
                          />
                          <span>
                            {vendor.city}, {vendor.state}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <select
                          value={vendor.status}
                          onChange={(event) =>
                            handleStatusChange(
                              vendor._id,
                              event.target.value as VendorStatus,
                            )
                          }
                          aria-label={`Update status for ${vendor.name}`}
                          className={`h-8 w-full max-w-[112px] cursor-pointer rounded-lg border bg-[var(--card)] px-1 text-[10px] font-medium capitalize text-[var(--text-primary)] outline-none sm:px-2 sm:text-xs md:h-9 md:max-w-[130px] md:text-sm ${statusBorderClass(
                            vendor.status,
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="hidden whitespace-nowrap px-5 py-4 text-xs text-[var(--text-secondary)] xl:table-cell">
                        {new Date(vendor.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-2 py-4 sm:px-4 md:px-5">
                        <div className="flex justify-end gap-0.5 sm:gap-1 md:gap-2">
                          <button
                            onClick={() => setSelectedVendor(vendor)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition hover:bg-blue-500/10 md:h-9 md:w-9"
                            title="View details"
                            aria-label={`View ${vendor.name}`}
                          >
                            <Eye size={15} />
                          </button>
                          <a
                            href={`https://wa.me/${vendor.phone.replace(/[^\d+]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden h-9 w-9 items-center justify-center rounded-lg text-green-500 transition hover:bg-green-500/10 sm:flex"
                            title="Send WhatsApp message"
                            aria-label={`Message ${vendor.name} on WhatsApp`}
                          >
                            <MessageCircle size={16} />
                          </a>
                          <button
                            onClick={() => handleDelete(vendor._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10 md:h-9 md:w-9"
                            title="Delete"
                            aria-label={`Delete ${vendor.name}`}
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

      {selectedVendor && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vendor-details-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedVendor(null);
          }}
        >
          <div className="relative max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:rounded-[32px]">
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-5 py-5 md:px-8">
              <div className="min-w-0 pr-3">
                <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[var(--primary)] sm:text-xs sm:tracking-[4px]">
                  Vendor Registration Details
                </p>
                <h2
                  id="vendor-details-title"
                  className="truncate font-serif text-2xl text-[var(--text-primary)] md:text-3xl"
                >
                  {selectedVendor.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedVendor(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] md:h-11 md:w-11"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[calc(94vh-190px)] overflow-y-auto p-5 md:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DetailCard label="Name" value={selectedVendor.name} />
                <DetailCard
                  label="Email"
                  value={selectedVendor.email}
                  breakAll
                />
                <DetailCard label="Phone" value={selectedVendor.phone} />
                <DetailCard
                  label="Company"
                  value={selectedVendor.companyName}
                />
                <DetailCard
                  label="Business Type"
                  value={selectedVendor.businessType}
                />
                <DetailCard
                  label="Experience"
                  value={`${selectedVendor.experience ?? 0} Years`}
                />
                <DetailCard
                  label="GST Number"
                  value={selectedVendor.gstNumber || "Not provided"}
                  breakAll
                />
                <DetailCard
                  label="PAN Number"
                  value={selectedVendor.panNumber || "Not provided"}
                  breakAll
                />
                <DetailCard
                  label="Registered On"
                  value={new Date(selectedVendor.createdAt).toLocaleString()}
                />
                <DetailCard label="City" value={selectedVendor.city} />
                <DetailCard label="State" value={selectedVendor.state} />
                <DetailCard label="Country" value={selectedVendor.country} />
                <DetailCard
                  label="Pincode"
                  value={selectedVendor.pincode || "Not provided"}
                />
                <DetailCard
                  label="Website"
                  value={selectedVendor.website || "Not provided"}
                  breakAll
                  large
                />
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
                  <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Status
                  </p>
                  <StatusBadge status={selectedVendor.status} />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                    <p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                      Products / Services
                    </p>
                    <p className="whitespace-pre-wrap leading-7 text-[var(--text-primary)]">
                      {selectedVendor.productsServices}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                    <p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                      Address
                    </p>
                    <p className="whitespace-pre-wrap leading-7 text-[var(--text-primary)]">
                      {selectedVendor.address || "No address provided."}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                    <p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                      Message
                    </p>
                    <p className="whitespace-pre-wrap leading-7 text-[var(--text-primary)]">
                      {selectedVendor.message || "No message provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--card)] px-5 py-4 md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`https://wa.me/${selectedVendor.phone.replace(/[^\d+]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-green-500/30 px-5 font-medium text-green-600 transition hover:bg-green-500/10"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="h-11 flex-1 rounded-xl border border-[var(--border)] px-5 text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] sm:flex-none"
                  >
                    Close
                  </button>
                  <select
                    value={selectedVendor.status}
                    onChange={(event) =>
                      handleStatusChange(
                        selectedVendor._id,
                        event.target.value as VendorStatus,
                      )
                    }
                    className="h-11 flex-1 cursor-pointer rounded-xl border border-[var(--primary)] bg-[var(--primary)] px-4 font-medium text-white outline-none sm:flex-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
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

function statusBorderClass(status: VendorStatus) {
  const classes: Record<VendorStatus, string> = {
    pending: "border-yellow-500/40",
    under_review: "border-violet-500/40",
    approved: "border-green-500/40",
    rejected: "border-red-500/40",
  };
  return classes[status];
}

function StatusBadge({ status }: { status: VendorStatus }) {
  const classes: Record<VendorStatus, string> = {
    pending: "bg-yellow-500/10 text-yellow-600",
    under_review: "bg-violet-500/10 text-violet-600",
    approved: "bg-green-500/10 text-green-600",
    rejected: "bg-red-500/10 text-red-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${classes[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status.replace("_", " ")}
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
  large = false,
}: {
  label: string;
  value: string;
  breakAll?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4 ${
        large ? "lg:col-span-1" : ""
      }`}
    >
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
