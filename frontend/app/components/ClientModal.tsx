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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-2xl
    max-h-[90vh]
    bg-[var(--card)]
    border border-[var(--border)]
    rounded-2xl
    shadow-2xl
    flex flex-col
    overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[var(--border)]">
          <h2 className="font-serif text-2xl text-[var(--text-primary)]">
            {initialData ? "Edit Client" : "Create Client"}
          </h2>

          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--primary)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-auto">
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
                  border border-[var(--border)]
                  rounded-2xl
                  p-5
                  bg-[var(--muted)]
                "
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  Client {index + 1}
                </p>

                {!initialData && clients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClientField(index)}
                    className="text-red-500"
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
                      flex items-center justify-center
                      h-28
                      border-2 border-dashed border-[var(--border)]
                      rounded-2xl
                      bg-[var(--card)]
                      cursor-pointer
                      hover:border-[var(--primary)]
                      transition
                    "
                >
                  {client.preview ? (
                    <img src={client.preview} className="h-16 object-contain" />
                  ) : (
                    <span className="text-sm text-[var(--text-secondary)]">
                      Upload logo
                    </span>
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

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={onClose}
              className="
                h-11 px-6
                border border-[var(--border)]
                text-[var(--text-secondary)]
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                h-11 px-6
                bg-[var(--primary)]
                text-white
                rounded-xl
                hover:bg-[var(--primary-dark)]
                transition
              "
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
