"use client";

import CareerPopup from "@/app/components/CareerModal";
import { Eye, Pencil, Power, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function AdminSiteVisit() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [viewCareer, setViewCareer] = useState<Career | null>(null);

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const fetchCareers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/career`);

      const result = await res.json();

      const data = result.data || [];

      setCareers(data);
      setFilteredCareers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    let filtered = [...careers];

    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter === "active") {
      filtered = filtered.filter((item) => item.isActive);
    }

    if (statusFilter === "inactive") {
      filtered = filtered.filter((item) => !item.isActive);
    }

    setFilteredCareers(filtered);
    setCurrentPage(1);
  }, [search, statusFilter, careers]);

  const handleToggleStatus = async (id: string) => {
    try {
      await fetch(`${API_BASE}/career/${id}/toggle`, {
        method: "PATCH",
      });

      setCareers((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this opening?")) return;

    try {
      await fetch(`${API_BASE}/career/${id}`, {
        method: "DELETE",
      });

      setCareers((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);

  const currentItems = filteredCareers.slice(
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

          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Job Openings
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search openings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
      h-11 px-4 rounded-xl
      border border-[var(--border)]
      bg-[var(--card)]
    "
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
      h-11 px-4 rounded-xl
      border border-[var(--border)]
      bg-[var(--card)]
    "
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => setOpenCreatePopup(true)}
            className="
    px-5 py-2
    rounded-xl
    bg-[var(--primary)]
    text-white
  "
          >
            Create Job
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mb-4" />

          <p className="text-[var(--text-secondary)]">
            Loading job openings...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredCareers.length === 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-3">
            No Job Openings Found
          </h3>

          <p className="text-[var(--text-secondary)]">
            New Job Openings will appear here.
          </p>
        </div>
      )}

      {/* Leads */}
      {/* Leads */}
      {!loading && filteredCareers.length > 0 && (
        <>
          {/* Desktop Table */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--background-secondary)] border-b border-[var(--border)]">
                      <th className="px-4 py-4">Title</th>

                      <th className="px-4 py-4 hidden md:table-cell">
                        Location
                      </th>

                      <th className="px-4 py-4 hidden md:table-cell">Type</th>

                      <th className="px-4 py-4">Status</th>

                      <th className="px-4 py-4 hidden lg:table-cell">
                        Created
                      </th>

                      <th className="px-4 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((career) => (
                      <tr
                        key={career._id}
                        className="border-b border-[var(--border)]"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium">{career.title}</p>

                            <p className="text-xs text-gray-500 md:hidden">
                              {career.location}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4 hidden md:table-cell">
                          {career.location}
                        </td>

                        <td className="px-4 py-4 hidden md:table-cell">
                          {career.employmentType}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              career.isActive
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {career.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-4 py-4 hidden lg:table-cell">
                          {new Date(career.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setViewCareer(career)}
                              className="h-9 w-9 rounded-lg flex items-center justify-center text-indigo-500 hover:bg-indigo-500/10"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedCareer(career);
                                setOpenEditPopup(true);
                              }}
                              className="h-9 w-9 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-500/10"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              onClick={() => handleToggleStatus(career._id)}
                              className="h-9 w-9 rounded-lg flex items-center justify-center text-yellow-500 hover:bg-yellow-500/10"
                            >
                              <Power size={18} />
                            </button>

                            <button
                              onClick={() => handleDelete(career._id)}
                              className="h-9 w-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10"
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
        px-4 h-11
        rounded-xl
        bg-[var(--primary)]
        text-white
        flex items-center justify-center
        font-medium
      "
              >
                {currentPage} / {totalPages}
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

      <CareerPopup
        isOpen={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        refreshData={fetchCareers}
      />

      <CareerPopup
        isOpen={openEditPopup}
        onClose={() => {
          setOpenEditPopup(false);
          setSelectedCareer(null);
        }}
        initialData={selectedCareer}
        refreshData={fetchCareers}
      />

      {viewCareer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{viewCareer.title}</h2>

              <button onClick={() => setViewCareer(null)}>✕</button>
            </div>

            <div className="space-y-4">
              <p>
                <strong>Department:</strong> {viewCareer.department}
              </p>

              <p>
                <strong>Location:</strong> {viewCareer.location}
              </p>

              <p>
                <strong>Type:</strong> {viewCareer.employmentType}
              </p>

              <p>
                <strong>Experience:</strong> {viewCareer.experience}
              </p>

              <div>
                <strong>Description</strong>

                <p className="mt-2">{viewCareer.description}</p>
              </div>

              <div>
                <strong>Responsibilities</strong>

                <ul className="list-disc pl-5 mt-2">
                  {viewCareer.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Requirements</strong>

                <ul className="list-disc pl-5 mt-2">
                  {viewCareer.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
