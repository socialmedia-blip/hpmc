"use client";

import ClientModal from "@/app/components/ClientModal";
import {
  Building2,
  CalendarDays,
  ImageIcon,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface Client {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 12;

async function requestClients(apiBase: string | undefined) {
  const res = await fetch(`${apiBase}/client`, {
    cache: "no-store",
  });
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch clients");
  }

  return [...(result.data || [])].sort(
    (a: Client, b: Client) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ) as Client[];
}

export default function AdminClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    let cancelled = false;

    requestClients(API_BASE)
      .then((data) => {
        if (!cancelled) setClients(data);
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

  const filteredClients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch = !query || client.name.toLowerCase().includes(query);
      const matchesDate =
        !selectedDate ||
        new Date(client.createdAt).toISOString().startsWith(selectedDate);

      return matchesSearch && matchesDate;
    });
  }, [clients, searchQuery, selectedDate]);

  const stats = useMemo(() => {
    const now = new Date();

    return {
      total: clients.length,
      thisMonth: clients.filter((client) => {
        const createdAt = new Date(client.createdAt);
        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        );
      }).length,
      latest: clients[0]
        ? new Date(clients[0].createdAt).toLocaleDateString()
        : "No data",
    };
  }, [clients]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const currentClients = filteredClients.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );
  const hasActiveFilters = Boolean(searchQuery || selectedDate);

  const refreshClients = async () => {
    try {
      setRefreshing(true);
      setError("");
      setClients(await requestClients(API_BASE));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditClient(null);
    setIsModalOpen(true);
  };

  const openEditModal = (client: Client) => {
    setEditClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditClient(null);
  };

  const handleCreate = async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/client`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Create failed");
    }

    closeModal();
    setClients(await requestClients(API_BASE));
  };

  const handleEdit = async (formData: FormData) => {
    if (!editClient) return;

    const res = await fetch(`${API_BASE}/client/${editClient._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Update failed");
    }

    closeModal();
    setClients(await requestClients(API_BASE));
  };

  const handleDelete = async (client: Client) => {
    if (!confirm(`Delete "${client.name}"?`)) return;

    try {
      setDeletingId(client._id);

      const res = await fetch(`${API_BASE}/client/${client._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setClients((prev) => prev.filter((item) => item._id !== client._id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId("");
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDate("");
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
              Admin Panel
            </p>
            <h1 className="font-serif text-4xl text-[var(--text-primary)]">
              Clients
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Manage the client logos displayed across the website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refreshClients}
              disabled={refreshing}
              className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 font-medium text-white transition hover:opacity-90"
            >
              <Plus size={18} />
              Add Client
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
          <OverviewCard
            label="Total Clients"
            value={String(stats.total)}
            icon={<UsersRound size={19} />}
            color="blue"
          />
          <OverviewCard
            label="Added This Month"
            value={String(stats.thisMonth)}
            icon={<CalendarDays size={19} />}
            color="green"
          />
          <OverviewCard
            label="Latest Addition"
            value={stats.latest}
            icon={<Building2 size={19} />}
            color="violet"
            compact
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search clients by name..."
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value);
                setCurrentPage(1);
              }}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="h-11 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Clear
              </button>
            )}
          </div>

          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            Showing{" "}
            <span className="font-semibold text-[var(--primary)]">
              {filteredClients.length}
            </span>{" "}
            of <span className="font-semibold">{clients.length}</span> clients
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex h-[320px] flex-col items-center justify-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-[var(--text-secondary)]">Loading clients...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h3 className="mb-2 font-semibold text-red-600">
            Failed to load clients
          </h3>
          <p className="mb-5 text-sm text-red-500">{error}</p>
          <button
            type="button"
            onClick={refreshClients}
            className="h-10 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredClients.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-10 text-center md:p-14">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <ImageIcon size={27} />
          </div>
          <h3 className="mb-3 font-serif text-2xl text-[var(--text-primary)]">
            {hasActiveFilters ? "No Matching Clients" : "No Clients Found"}
          </h3>
          <p className="mx-auto max-w-md text-sm text-[var(--text-secondary)]">
            {hasActiveFilters
              ? "Try changing or clearing the current search filters."
              : "Add your first client logo to begin building the showcase."}
          </p>
          {!hasActiveFilters && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mx-auto mt-6 flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 font-medium text-white"
            >
              <Plus size={18} />
              Add First Client
            </button>
          )}
        </div>
      )}

      {!loading && !error && filteredClients.length > 0 && (
        <>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Logo
                    </th>
                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Client Name
                    </th>
                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Added On
                    </th>
                    <th className="px-5 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentClients.map((client) => (
                    <tr
                      key={client._id}
                      className="border-b border-[var(--border)] transition hover:bg-[var(--background-secondary)] last:border-0"
                    >
                      {/* Logo */}
                      <td className="px-5 py-4">
                        <div className="relative h-14 w-20 overflow-hidden rounded-lg border border-[var(--border)] bg-white">
                          <Image
                            src={client.image}
                            alt={client.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          {client.name}
                        </h3>
                      </td>

                      {/* Created */}
                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(client)}
                            className="grid h-9 w-9 place-items-center rounded-lg text-blue-600 hover:bg-blue-500/10"
                            title="Edit Client"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(client)}
                            disabled={deletingId === client._id}
                            className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-500/10 disabled:opacity-50"
                            title="Delete Client"
                          >
                            {deletingId === client._id ? (
                              <RefreshCw size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
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
            <div className="flex items-center justify-center gap-3 pb-16 pt-8 md:justify-end">
              <button
                type="button"
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
                type="button"
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

      <ClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editClient ? handleEdit : handleCreate}
        initialData={
          editClient
            ? {
                name: editClient.name,
                image: editClient.image,
              }
            : undefined
        }
      />
    </div>
  );
}

function OverviewCard({
  label,
  value,
  icon,
  color,
  compact = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "violet";
  compact?: boolean;
}) {
  const styles = {
    blue: {
      card: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
      icon: "bg-blue-500/10 text-blue-600",
      value: "text-blue-600",
    },
    green: {
      card: "from-green-500/10 to-green-600/5 border-green-500/20",
      icon: "bg-green-500/10 text-green-600",
      value: "text-green-600",
    },
    violet: {
      card: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
      icon: "bg-violet-500/10 text-violet-600",
      value: "text-violet-600",
    },
  }[color];

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 ${styles.card}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          {icon}
        </div>
      </div>
      <p
        className={`font-bold ${styles.value} ${
          compact ? "text-xl md:text-2xl" : "text-3xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
