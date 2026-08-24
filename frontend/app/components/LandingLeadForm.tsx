"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateValue = (field: keyof typeof initialValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/landing-leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            message: values.message,
            website: values.website,
            companyName: values.companyName,
            product,
            landingPage: window.location.pathname,
            source: `Landing page - ${product}`,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit your enquiry.");
      }

      setValues(initialValues);
      router.push("/thank-you");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitEnquiry}
      className={`rounded-3xl bg-[var(--card)] p-5 shadow-2xl shadow-slate-950/10 sm:p-7 ${className}`}
    >
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#579f42]">
          Free consultation
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
          Talk to an extrusion expert
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Tell us about your material and output requirements. Submit your
          enquiry and our team will get back to you shortly.
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

      <label className="mt-4 block text-sm font-semibold text-[var(--text-primary)]">
        Message <span className="text-[#579f42]">*</span>
        <textarea
          required
          rows={4}
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          placeholder="E.g. material, capacity, filler percentage or project details"
          className="mt-2 block w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-light)] focus:border-[#65BC4F] focus:ring-4 focus:ring-[#65BC4F]/10"
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

      {error && <ErrorMessage message={error} />}

      <button
        disabled={loading}
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#65BC4F] px-5 py-3.5 font-bold text-white transition hover:bg-[#4fa23a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {loading ? "Submitting…" : "Submit"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-[var(--text-light)]">
        By continuing, you agree to be contacted by HPMC about this enquiry.
      </p>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
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
    <label className="block text-sm font-semibold text-[var(--text-primary)]">
      {label} {required && <span className="text-[#579f42]">*</span>}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-light)] focus:border-[#65BC4F] focus:ring-4 focus:ring-[#65BC4F]/10"
      />
    </label>
  );
}
