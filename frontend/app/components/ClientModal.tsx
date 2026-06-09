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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent pointer-events-none" />
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
                Admin Panel
              </p>

              <h2 className="font-serif text-3xl text-[var(--text-primary)]">
                {initialData ? "Edit Client" : "Create Clients"}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="
        h-11 w-11
        rounded-xl
        border border-[var(--border)]
        flex items-center justify-center
        hover:bg-[var(--background-secondary)]
        transition
      "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-180px)] p-8 space-y-6"
        >
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Fields */}
          {clients.map((client, index) => (
            <div
              key={index}
              className="
rounded-3xl
border border-[var(--border)]
bg-[var(--background-secondary)]
p-6
hover:border-[var(--primary)]/30
transition
"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="uppercase tracking-[3px] text-xs text-[var(--primary)]">
                  Client {index + 1}
                </p>

                {!initialData && clients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClientField(index)}
                    className="
    h-9 w-9
    rounded-xl
    bg-red-500/10
    text-red-500
    flex items-center justify-center
    hover:bg-red-500/20
    transition
  "
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Name */}
              <input
                value={client.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Client name"
                className="
                    w-full h-12 px-4 mb-4
                    border border-[var(--border)]
                    bg-[var(--card)]
                    text-[var(--text-primary)]
                    outline-none
                    focus:border-[var(--primary)]
                  "
              />

              {/* Upload */}
              {!initialData && (
                <label
                  className="
    group
    relative
    flex flex-col
    items-center
    justify-center
    h-48
    border-2
    border-dashed
    border-[var(--border)]
    rounded-3xl
    bg-[var(--card)]
    cursor-pointer
    hover:border-[var(--primary)]
    transition-all
  "
                >
                  {client.preview ? (
                    <img
                      src={client.preview}
                      className="
        h-28
        object-contain
        transition
        group-hover:scale-105
      "
                    />
                  ) : (
                    <>
                      <div
                        className="
          h-14 w-14
          rounded-2xl
          bg-[var(--primary)]/10
          flex items-center justify-center
          mb-3
        "
                      >
                        <Plus size={24} className="text-[var(--primary)]" />
                      </div>

                      <span className="font-medium text-[var(--text-primary)]">
                        Upload Client Logo
                      </span>

                      <span className="text-sm text-[var(--text-secondary)] mt-1">
                        PNG, JPG, WEBP
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleChange(index, "image", e.target.files?.[0] || null)
                    }
                  />
                </label>
              )}
            </div>
          ))}

          {/* Add */}
          {!initialData && (
            <button
              type="button"
              onClick={addClientField}
              className="
                flex items-center gap-2
                text-sm
                text-[var(--primary)]
              "
            >
              <Plus size={16} />
              Add Another Client
            </button>
          )}
        </form>
        {/* Footer */}
        <div
          className="
    sticky bottom-0
    bg-[var(--card)]
    border-t border-[var(--border)]
    px-8 py-5
  "
        >
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
        h-12 px-6
        rounded-xl
        border border-[var(--border)]
        text-[var(--text-primary)]
        hover:bg-[var(--background-secondary)]
        transition
      "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
        h-12 px-8
        rounded-xl
        bg-[var(--primary)]
        text-white
        font-medium
        hover:opacity-90
        disabled:opacity-50
        transition
      "
            >
              {loading ? "Saving..." : "Save Client"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
