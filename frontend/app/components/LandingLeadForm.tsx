"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";

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

type FormStep = "form" | "otp" | "success";

export default function LandingLeadForm({
  product,
  className = "",
}: LandingLeadFormProps) {
  const [values, setValues] = useState(initialValues);
  const [step, setStep] = useState<FormStep>("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateValue = (field: keyof typeof initialValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const requestOtp = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/lead/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            message: values.message,
            website: values.website,
            source: "Google Ads - Co-Rotating Twin Screw Landing Page",
            activityMessage:
              "Lead verified through the Co-Rotating Twin Screw landing page",
            customFields: {
              companyName: values.companyName,
              product,
              landingPage: "/landing/Co-rotating-twin-screw-extruder",
            },
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send the verification code.");
      }
      if (data.alreadyRegistered) {
        throw new Error(
          "This email has already been verified. Please use another email for a new enquiry.",
        );
      }

      setOtp("");
      setStep("otp");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send the verification code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email, otp }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to verify the code.");
      }

      setValues(initialValues);
      setOtp("");
      setStep("success");
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Unable to verify the code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div
        className={`flex min-h-[390px] flex-col items-center justify-center rounded-3xl bg-[var(--card)] p-8 text-center shadow-2xl shadow-slate-950/10 ${className}`}
      >
        <CheckCircle2 className="h-14 w-14 text-[#65BC4F]" />
        <h2 className="mt-5 text-2xl font-bold text-[var(--text-primary)]">
          Thank you for your enquiry
        </h2>
        <p className="mt-3 max-w-sm leading-7 text-[var(--text-secondary)]">
          Your email is verified and your enquiry has been sent to our extrusion
          specialists.
        </p>
        <button
          type="button"
          onClick={() => setStep("form")}
          className="mt-7 font-semibold text-[#438f32] underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <form
        onSubmit={verifyOtp}
        className={`rounded-3xl bg-[var(--card)] p-5 shadow-2xl shadow-slate-950/10 sm:p-7 ${className}`}
      >
        <div className="mb-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#65BC4F]/15 text-[#438f32]">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#579f42]">
            Verify your email
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
            Enter your verification code
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            We sent a 6-digit code to <strong>{values.email}</strong>. Your
            enquiry will be saved after verification.
          </p>
        </div>

        <label className="block text-sm font-semibold text-[var(--text-primary)]">
          Verification code
          <input
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-center text-xl font-bold tracking-[0.35em] text-[var(--text-primary)] outline-none transition placeholder:tracking-normal placeholder:text-[var(--text-light)] focus:border-[#65BC4F] focus:ring-4 focus:ring-[#65BC4F]/10"
          />
        </label>

        {error && <ErrorMessage message={error} />}

        <button
          disabled={loading || otp.length !== 6}
          type="submit"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#65BC4F] px-5 py-3.5 font-bold text-white transition hover:bg-[#4fa23a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
          {loading ? "Verifying…" : "Verify and submit enquiry"}
        </button>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <button
            type="button"
            onClick={() => {
              setStep("form");
              setError("");
            }}
            className="font-semibold text-[var(--text-secondary)] transition hover:text-[#438f32]"
          >
            Change email
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => requestOtp()}
            className="font-semibold text-[#438f32] underline underline-offset-4 disabled:opacity-60"
          >
            Resend code
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={requestOtp}
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
          Tell us about your material and output requirements. We will verify
          your email before saving the enquiry.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" value={values.name} onChange={(value) => updateValue("name", value)} autoComplete="name" required />
        <Field label="Work email" type="email" value={values.email} onChange={(value) => updateValue("email", value)} autoComplete="email" required />
        <Field label="Phone number" type="tel" value={values.phone} onChange={(value) => updateValue("phone", value)} autoComplete="tel" required />
        <Field label="Company name" value={values.companyName} onChange={(value) => updateValue("companyName", value)} autoComplete="organization" />
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
        <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => updateValue("website", event.target.value)} />
      </label>

      {error && <ErrorMessage message={error} />}

      <button disabled={loading} type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#65BC4F] px-5 py-3.5 font-bold text-white transition hover:bg-[#4fa23a] disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Sending code…" : "Email me a verification code"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-[var(--text-light)]">
        By continuing, you agree to be contacted by HPMC about this enquiry.
      </p>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700">{message}</p>;
}

function Field({ label, type = "text", value, onChange, required = false, autoComplete }: { label: string; type?: string; value: string; onChange: (value: string) => void; required?: boolean; autoComplete?: string }) {
  return (
    <label className="block text-sm font-semibold text-[var(--text-primary)]">
      {label} {required && <span className="text-[#579f42]">*</span>}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-light)] focus:border-[#65BC4F] focus:ring-4 focus:ring-[#65BC4F]/10" />
    </label>
  );
}
