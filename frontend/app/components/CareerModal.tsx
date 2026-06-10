"use client";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  Check,
  CirclePlus,
  GripVertical,
  MapPin,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

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

const emptyCareer: Career = {
  title: "",
  department: "",
  location: "",
  employmentType: "Full Time",
  experience: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  isActive: true,
};

const fieldInputClasses =
  "h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)]";

function getInitialCareer(initialData?: Career | null): Career {
  if (!initialData) {
    return { ...emptyCareer, responsibilities: [""], requirements: [""] };
  }

  return {
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
  };
}

export default function CareerPopup({
  isOpen,
  initialData,
  ...props
}: CareerPopupProps) {
  if (!isOpen) return null;

  return (
    <CareerPopupContent
      key={initialData?._id || "create"}
      isOpen={isOpen}
      initialData={initialData}
      {...props}
    />
  );
}

function CareerPopupContent({
  onClose,
  refreshData,
  initialData,
}: CareerPopupProps) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Career>(() =>
    getInitialCareer(initialData),
  );

  const isEdit = Boolean(initialData?._id);

  const completion = useMemo(() => {
    const checks = [
      formData.title.trim(),
      formData.department.trim(),
      formData.location.trim(),
      formData.experience.trim(),
      formData.description.trim(),
      formData.responsibilities.some((item) => item.trim()),
      formData.requirements.some((item) => item.trim()),
    ];

    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [formData]);

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
    setFormData((prev) => {
      const nextValues = prev[field].filter(
        (_, itemIndex) => itemIndex !== index,
      );

      return {
        ...prev,
        [field]: nextValues.length ? nextValues : [""],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      const payload: Career = {
        ...formData,
        title: formData.title.trim(),
        department: formData.department.trim(),
        location: formData.location.trim(),
        experience: formData.experience.trim(),
        description: formData.description.trim(),
        responsibilities: formData.responsibilities.filter(
          (item) => item.trim() !== "",
        ),
        requirements: formData.requirements.filter(
          (item) => item.trim() !== "",
        ),
      };

      const response = await fetch(
        isEdit
          ? `${API_BASE}/career/${initialData?._id}`
          : `${API_BASE}/career`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:rounded-[32px]">
        <div className="border-b border-[var(--border)] bg-[var(--card)] px-5 py-5 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[var(--primary)] sm:text-xs sm:tracking-[4px]">
                {isEdit ? "Edit Opening" : "Create Opening"}
              </p>
              <h2
                id="career-modal-title"
                className="truncate font-serif text-2xl text-[var(--text-primary)] md:text-3xl"
              >
                {formData.title || "New Job Opening"}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Keep the posting sharp, complete, and ready for applicants.
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:opacity-50 md:h-11 md:w-11"
              aria-label="Close opening modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MiniStat
              icon={<BriefcaseBusiness size={16} />}
              label="Type"
              value={formData.employmentType}
            />
            <MiniStat
              icon={<Building2 size={16} />}
              label="Department"
              value={formData.department || "Not set"}
            />
            <MiniStat
              icon={<MapPin size={16} />}
              label="Location"
              value={formData.location || "Not set"}
            />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Completion
              </span>
              <span className="font-semibold text-[var(--primary)]">
                {completion}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--background-secondary)]">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-8">
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <FormField label="Job Title" required>
                <input
                  value={formData.title}
                  onChange={(event) =>
                    handleChange("title", event.target.value)
                  }
                  placeholder="Senior Sales Executive"
                  className={fieldInputClasses}
                />
              </FormField>

              <FormField label="Department" required>
                <input
                  value={formData.department}
                  onChange={(event) =>
                    handleChange("department", event.target.value)
                  }
                  placeholder="Sales, Production, Service..."
                  className={fieldInputClasses}
                />
              </FormField>

              <FormField label="Location" required>
                <input
                  value={formData.location}
                  onChange={(event) =>
                    handleChange("location", event.target.value)
                  }
                  placeholder="Ahmedabad, Gujarat"
                  className={fieldInputClasses}
                />
              </FormField>

              <FormField label="Employment Type">
                <select
                  value={formData.employmentType}
                  onChange={(event) =>
                    handleChange("employmentType", event.target.value)
                  }
                  className={`${fieldInputClasses} cursor-pointer`}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </FormField>

              <FormField label="Experience" className="lg:col-span-2">
                <input
                  value={formData.experience}
                  onChange={(event) =>
                    handleChange("experience", event.target.value)
                  }
                  placeholder="2-5 Years"
                  className={fieldInputClasses}
                />
              </FormField>

              <FormField label="Job Description" className="lg:col-span-2">
                <textarea
                  rows={7}
                  value={formData.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  placeholder="Describe the role, team, goals, and candidate profile..."
                  className={`${fieldInputClasses} min-h-[180px] resize-none py-4`}
                />
              </FormField>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <ArrayField
                title="Responsibilities"
                values={formData.responsibilities}
                placeholder="Own regional sales targets"
                onAdd={() => addField("responsibilities")}
                onRemove={(index) => removeField("responsibilities", index)}
                onChange={(index, value) =>
                  handleArrayChange("responsibilities", index, value)
                }
              />

              <ArrayField
                title="Requirements"
                values={formData.requirements}
                placeholder="Experience in capital equipment sales"
                onAdd={() => addField("requirements")}
                onRemove={(index) => removeField("requirements", index)}
                onChange={(index, value) =>
                  handleArrayChange("requirements", index, value)
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    Publish opening
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Active openings are visible on the public careers page.
                  </p>
                </div>
                <span
                  className={`relative h-7 w-12 rounded-full transition ${
                    formData.isActive ? "bg-[var(--primary)]" : "bg-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(event) =>
                      handleChange("isActive", event.target.checked)
                    }
                    className="sr-only"
                  />
                  <span
                    className={`absolute top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[var(--primary)] shadow transition ${
                      formData.isActive ? "left-6" : "left-1"
                    }`}
                  >
                    {formData.isActive && <Check size={12} />}
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="border-t border-[var(--border)] bg-[var(--card)] px-5 py-4 md:px-8">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[var(--text-secondary)]">
                {formData.isActive
                  ? "Public listing enabled"
                  : "Saved as inactive"}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={onClose}
                  className="h-11 flex-1 rounded-xl border border-[var(--border)] px-5 font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:opacity-50 sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 font-medium text-white transition hover:opacity-90 disabled:opacity-70 sm:flex-none"
                >
                  <Save size={17} />
                  {loading
                    ? isEdit
                      ? "Updating..."
                      : "Creating..."
                    : isEdit
                      ? "Update Opening"
                      : "Create Opening"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
  required = false,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ArrayField({
  title,
  values,
  placeholder,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  values: string[];
  placeholder: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{title}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Add concise points for clearer candidate screening.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-9 items-center gap-2 rounded-xl bg-[var(--primary)] px-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <CirclePlus size={15} />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex h-11 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]">
              <GripVertical size={15} />
            </div>
            <input
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className={`${fieldInputClasses} h-11 flex-1`}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 text-red-500 transition hover:bg-red-500/10"
              aria-label={`Remove ${title} ${index + 1}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
