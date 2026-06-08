"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Career {
  _id?: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
}

interface CareerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => Promise<void>;
  initialData?: Career | null;
}

export default function CareerPopup({
  isOpen,
  onClose,
  refreshData,
  initialData,
}: CareerPopupProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Career>({
    title: "",
    department: "",
    location: "",
    employmentType: "Full Time",
    experience: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id,
        title: initialData.title || "",
        department: initialData.department || "",
        location: initialData.location || "",
        employmentType: initialData.employmentType || "Full Time",
        experience: initialData.experience || "",
        description: initialData.description || "",
        responsibilities: initialData.responsibilities?.length
          ? initialData.responsibilities
          : [""],
        requirements: initialData.requirements?.length
          ? initialData.requirements
          : [""],
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        title: "",
        department: "",
        location: "",
        employmentType: "Full Time",
        experience: "",
        description: "",
        responsibilities: [""],
        requirements: [""],
        isActive: true,
      });
    }

    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof Career, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (
    field: "responsibilities" | "requirements",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const addField = (field: "responsibilities" | "requirements") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (
    field: "responsibilities" | "requirements",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!formData.title.trim()) {
        throw new Error("Job title is required");
      }

      if (!formData.department.trim()) {
        throw new Error("Department is required");
      }

      if (!formData.location.trim()) {
        throw new Error("Location is required");
      }

      formData.responsibilities = formData.responsibilities.filter(
        (item) => item.trim() !== "",
      );

      formData.requirements = formData.requirements.filter(
        (item) => item.trim() !== "",
      );

      const isEdit = Boolean(initialData?._id);

      const response = await fetch(
        isEdit
          ? `${API_BASE}/career/${initialData?._id}`
          : `${API_BASE}/career`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            (isEdit ? "Failed to update opening" : "Failed to create opening"),
        );
      }

      await refreshData();

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
          w-full max-w-3xl
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
            {initialData ? "Edit Opening" : "Create Opening"}
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-[var(--text-secondary)] hover:text-[var(--primary)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-5">
            <input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Job Title"
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                bg-[var(--card)]
                text-[var(--text-primary)]
                outline-none
                rounded-xl
              "
            />

            <input
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              placeholder="Department"
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                bg-[var(--card)]
                text-[var(--text-primary)]
                outline-none
                rounded-xl
              "
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-5">
            <input
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Location"
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                bg-[var(--card)]
                text-[var(--text-primary)]
                outline-none
                rounded-xl
              "
            />

            <select
              value={formData.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                bg-[var(--card)]
                text-[var(--text-primary)]
                outline-none
                rounded-xl
              "
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Experience */}
          <input
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="Experience (e.g. 2-5 Years)"
            className="
              w-full h-12 px-4
              border border-[var(--border)]
              bg-[var(--card)]
              text-[var(--text-primary)]
              outline-none
              rounded-xl
            "
          />

          {/* Description */}
          <textarea
            rows={8}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Job Description..."
            className="
              w-full p-4
              border border-[var(--border)]
              bg-[var(--card)]
              text-[var(--text-primary)]
              outline-none
              rounded-xl
              resize-none
            "
          />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[var(--text-primary)]">
                Responsibilities
              </h3>

              <button
                type="button"
                onClick={() => addField("responsibilities")}
                className="px-3 py-1 rounded-lg bg-[var(--primary)] text-white text-sm"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {formData.responsibilities.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(
                        "responsibilities",
                        index,
                        e.target.value,
                      )
                    }
                    placeholder={`Responsibility ${index + 1}`}
                    className="
            flex-1 h-11 px-4
            border border-[var(--border)]
            rounded-xl
            bg-[var(--card)]
          "
                  />

                  <button
                    type="button"
                    onClick={() => removeField("responsibilities", index)}
                    className="px-3 rounded-xl border border-red-200 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[var(--text-primary)]">
                Requirements
              </h3>

              <button
                type="button"
                onClick={() => addField("requirements")}
                className="px-3 py-1 rounded-lg bg-[var(--primary)] text-white text-sm"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {formData.requirements.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange("requirements", index, e.target.value)
                    }
                    placeholder={`Requirement ${index + 1}`}
                    className="
            flex-1 h-11 px-4
            border border-[var(--border)]
            rounded-xl
            bg-[var(--card)]
          "
                  />

                  <button
                    type="button"
                    onClick={() => removeField("requirements", index)}
                    className="px-3 rounded-xl border border-red-200 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
            />

            <span className="text-[var(--text-primary)]">Active Opening</span>
          </label>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="
                h-11 px-6
                border border-[var(--border)]
                text-[var(--text-secondary)]
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                rounded-xl
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
                disabled:opacity-70
              "
            >
              {loading
                ? initialData
                  ? "Updating..."
                  : "Creating..."
                : initialData
                  ? "Update Opening"
                  : "Create Opening"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
