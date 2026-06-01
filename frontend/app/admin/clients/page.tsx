"use client";

import ClientModal from "@/app/components/ClientModal";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface Client {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 20;

export default function AdminClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  /* Fetch */
  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/client`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Fetch failed");
      }

      const sortedClients = result.data.sort(
        (a: Client, b: Client) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setClients(sortedClients);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* Create */
  const handleCreate = async (formData: FormData) => {
    try {
      const res = await fetch(`${API_BASE}/client`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Create failed");
      }

      setIsModalOpen(false);
      await fetchClients();
    } catch (err) {
      alert("Create failed");
    }
  };

  /* Edit */
  const handleEdit = async (formData: FormData) => {
    if (!editClient) return;

    try {
      const res = await fetch(`${API_BASE}/client/${editClient._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setEditClient(null);
      setIsModalOpen(false);

      await fetchClients();
    } catch {
      alert("Update failed");
    }
  };

  /* Delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;

    await fetch(`${API_BASE}/client/${id}`, {
      method: "DELETE",
    });

    setClients((prev) => prev.filter((c) => c._id !== id));
  };

  /* Pagination */
  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);

  const currentClients = clients.slice(
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

          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            Clients
          </h1>
        </div>

        <button
          onClick={() => {
            setEditClient(null);
            setIsModalOpen(true);
          }}
          className="
            h-11 px-6
            bg-[var(--primary)]
            text-white
            rounded-xl
            flex items-center gap-2
            hover:bg-[var(--primary-dark)]
            transition-all
          "
        >
          <Plus size={16} />
          Create Client
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mb-4" />

          <p className="text-[var(--text-secondary)]">Loading clients...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-red-600 font-semibold mb-2">
            Failed to load clients
          </h3>

          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && clients.length === 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-3">
            No Clients Found
          </h3>

          <p className="text-[var(--text-secondary)]">
            Create your first client.
          </p>
        </div>
      )}

      {/* Mobile Cards */}
      {!loading && clients.length > 0 && (
        <>
          <div className="md:hidden space-y-4">
            {currentClients.map((client) => (
              <div
                key={client._id}
                className="
                    bg-[var(--card)]
                    border border-[var(--border)]
                    rounded-2xl
                    p-5
                  "
              >
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {client.name}
                  </h3>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditClient(client);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-500"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(client._id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <img src={client.image} className="h-16 object-contain" />
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  <th className="px-5 py-4 text-left">Logo</th>

                  <th className="px-5 py-4 text-left">Name</th>

                  <th className="px-5 py-4 text-left">Created</th>

                  <th className="px-5 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentClients.map((client) => (
                  <tr
                    key={client._id}
                    className="border-t border-[var(--border)] hover:bg-[var(--bg-secondary)]"
                  >
                    <td className="px-5 py-4">
                      <img src={client.image} className="h-10 object-contain" />
                    </td>

                    <td className="px-5 py-4 text-[var(--text-primary)]">
                      {client.name}
                    </td>

                    <td className="px-5 py-4 text-[var(--text-secondary)]">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 flex gap-4">
                      <button
                        onClick={() => {
                          setEditClient(client);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(client._id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end mt-8 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="
                    h-10 px-5
                    border border-[var(--border)]
                    text-[var(--text-secondary)]
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                    disabled:opacity-40
                  "
              >
                Prev
              </button>

              <div className="h-10 px-5 flex items-center">{currentPage}</div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="
                    h-10 px-5
                    border border-[var(--border)]
                    text-[var(--text-secondary)]
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                    disabled:opacity-40
                  "
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
