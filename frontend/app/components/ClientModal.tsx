"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: {
    name: string;
    image?: string;
  };
}

interface ClientInput {
  name: string;
  image: File | null;
  preview?: string;
}

export default function ClientModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ClientModalProps) {
  const [clients, setClients] = useState<ClientInput[]>([
    {
      name: "",
      image: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Initialize */
  useEffect(() => {
    if (initialData) {
      setClients([
        {
          name: initialData.name,
          image: null,
          preview: initialData.image,
        },
      ]);
    } else {
      setClients([
        {
          name: "",
          image: null,
        },
      ]);
    }

    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  /* Add */
  const addClientField = () => {
    setClients((prev) => [
      ...prev,
      {
        name: "",
        image: null,
      },
    ]);
  };

  /* Remove */
  const removeClientField = (index: number) => {
    setClients((prev) => prev.filter((_, i) => i !== index));
  };

  /* Change */
  const handleChange = (
    index: number,
    field: "name" | "image",
    value: string | File | null,
  ) => {
    const updated = [...clients];

    if (field === "name") {
      updated[index].name = value as string;
    } else {
      updated[index].image = value as File;
      updated[index].preview = value
        ? URL.createObjectURL(value as File)
        : undefined;
    }

    setClients(updated);
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      clients.forEach((client) => {
        if (!client.name.trim()) {
          throw new Error("All client names are required");
        }

        formData.append("names", client.name.trim());

        if (!initialData && !client.image) {
          throw new Error("All client images are required");
        }

        if (client.image) {
          formData.append("images", client.image);
        }
      });

      await onSubmit(formData);

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent" />

        {/* Header */}
        <div className="shrink-0 border-b border-[var(--border)] bg-[var(--card)] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
                Admin Panel
              </p>

              <h2 className="font-serif text-3xl text-[var(--text-primary)]">
                {initialData ? "Edit Client" : "Create Clients"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] transition hover:bg-[var(--background-secondary)]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-8">
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 transition hover:border-[var(--primary)]/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[3px] text-[var(--primary)]">
                      Client {index + 1}
                    </p>

                    {!initialData && clients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClientField(index)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <input
                    value={client.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    placeholder="Client name"
                    className="mb-4 h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 outline-none focus:border-[var(--primary)]"
                  />

                  {!initialData && (
                    <label className="group flex h-48 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--primary)]">
                      {client.preview ? (
                        <div className="relative h-28 w-40">
                          <img
                            src={client.preview}
                            alt="Preview"
                            className="h-full w-full object-contain transition group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
                            <Plus size={24} className="text-[var(--primary)]" />
                          </div>

                          <span className="font-medium">
                            Upload Client Logo
                          </span>

                          <span className="mt-1 text-sm text-[var(--text-secondary)]">
                            PNG, JPG, WEBP
                          </span>
                        </>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handleChange(
                            index,
                            "image",
                            e.target.files?.[0] || null,
                          )
                        }
                      />
                    </label>
                  )}
                </div>
              ))}

              {!initialData && (
                <button
                  type="button"
                  onClick={addClientField}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--primary)]"
                >
                  <Plus size={16} />
                  Add Another Client
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-[var(--border)] bg-[var(--card)] px-8 py-5">
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-12 rounded-xl border border-[var(--border)] px-6 transition hover:bg-[var(--background-secondary)]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="h-12 rounded-xl bg-[var(--primary)] px-8 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Client"}
              </button>
            </div>
          </div>
        </form>
        {/* FORM END */}
      </div>
    </div>
  );
}
