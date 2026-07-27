"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type LandingLeadFormProps = {
  product: string;
  className?: string;
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  message: "",
  website: "",
};

export default function LandingLeadForm({
  product,
  className = "",
}: LandingLeadFormProps) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const updateValue = (field: keyof typeof initialValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/lead/landing`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, product }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit your enquiry.");
      }

      setValues(initialValues);
      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your enquiry. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className={`flex min-h-[390px] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-2xl shadow-slate-950/10 ${className}`}
      >
        <CheckCircle2 className="h-14 w-14 text-[#65BC4F]" />
        <h2 className="mt-5 text-2xl font-bold text-[#0B1220]">
          Thank you for your enquiry
        </h2>
        <p className="mt-3 max-w-sm leading-7 text-slate-600">
          Our extrusion specialists will contact you shortly with the right
          solution for your application.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 font-semibold text-[#438f32] underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitLead}
      className={`rounded-3xl bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7 ${className}`}
    >
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#579f42]">
          Free consultation
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#0B1220]">
          Talk to an extrusion expert
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tell us about your material and output requirements.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          value={values.name}
          onChange={(value) => updateValue("name", value)}
          autoComplete="name"
          required
        />
        <Field
          label="Work email"
          type="email"
          value={values.email}
          onChange={(value) => updateValue("email", value)}
          autoComplete="email"
          required
        />
        <Field
          label="Phone number"
          type="tel"
          value={values.phone}
          onChange={(value) => updateValue("phone", value)}
          autoComplete="tel"
          required
        />
        <Field
          label="Company name"
          value={values.companyName}
          onChange={(value) => updateValue("companyName", value)}
          autoComplete="organization"
        />
      </div>

      <label className="mt-4 block text-sm font-semibold text-slate-700">
        Message <span className="text-[#579f42]">*</span>
        <textarea
          required
          rows={4}
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          placeholder="E.g. material, capacity, filler percentage or project details"
          className="mt-2 block w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#65BC4F] focus:ring-4 focus:ring-[#65BC4F]/10"
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateValue("website", event.target.value)}
        />
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        disabled={status === "loading"}
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#65BC4F] px-5 py-3.5 font-bold text-white transition hover:bg-[#4fa23a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {status === "loading" ? "Submitting…" : "Request a callback"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        By submitting, you agree to be contacted by HPMC about this enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-[#579f42]">*</span>}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#65BC4F] focus:ring-4 focus:ring-[#65BC4F]/10"
      />
    </label>
  );
}
