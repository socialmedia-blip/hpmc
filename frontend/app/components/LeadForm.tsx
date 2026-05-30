"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const services = [
  "Product 1",
  "Product 2",
  "Product 3",
  "Product 4",
  "Product 5",
  "Product 6",
];

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  message: string;
};

export default function LeadForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputStyle = {
    background: "var(--background)",
    color: "var(--text-primary)",
    borderColor: "var(--border)",
  };

  const handleChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service],
    );

    if (errors.services) {
      setErrors((prev) => ({
        ...prev,
        services: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (selectedServices.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setServerError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/lead/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            companyName: formData.company,
            products: selectedServices,
            message: formData.message,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setShowOtpBox(true);
      setSuccessMessage("OTP sent successfully to your email.");
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setServerError("Please enter OTP");
      return;
    }

    try {
      setOtpLoading(true);
      setServerError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/lead/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            otp,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setSuccessMessage(
        "Thank you! Your inquiry has been submitted successfully.",
      );

      setShowOtpBox(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        city: "",
        message: "",
      });

      setSelectedServices([]);
      setOtp("");
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border p-6 md:p-8"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
          Quick Inquiry
        </span>

        <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">
          Let's Plan Something Amazing
        </h2>

        <p className="mt-3 text-[var(--text-secondary)]">
          Share your requirements and our team will get back to you shortly.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Name */}
        <div>
          <label
            className="mb-2 block font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your name"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all placeholder:text-[var(--text-light)]
            ${
              errors.name ? "border-red-500" : "focus:border-[var(--primary)]"
            }`}
            style={inputStyle}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="mb-2 block font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all placeholder:text-[var(--text-light)]
            ${
              errors.email ? "border-red-500" : "focus:border-[var(--primary)]"
            }`}
            style={inputStyle}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            className="mb-2 block font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Phone Number <span className="text-red-500">*</span>
          </label>

          <div
            className="rounded-xl border px-4 py-3"
            style={{
              background: "var(--background)",
              borderColor: errors.phone ? "#ef4444" : "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            <PhoneInput
              international
              defaultCountry="IN"
              value={formData.phone}
              onChange={(value) => handleChange("phone", value || "")}
            />
          </div>

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label
            className="mb-2 block font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Company Name
          </label>

          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Your company"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[var(--primary)] placeholder:text-[var(--text-light)]"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Services */}
      <div className="mt-6">
        <label
          className="mb-3 block font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Interested Services <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {services.map((service) => (
            <button
              type="button"
              key={service}
              onClick={() => toggleService(service)}
              className="rounded-xl border p-3 text-sm font-medium transition-all hover:border-[var(--primary)]"
              style={{
                borderColor: selectedServices.includes(service)
                  ? "var(--primary)"
                  : "var(--border)",
                background: selectedServices.includes(service)
                  ? "var(--primary)"
                  : "var(--background)",
                color: selectedServices.includes(service)
                  ? "#fff"
                  : "var(--text-primary)",
              }}
            >
              {service}
            </button>
          ))}
        </div>

        {errors.services && (
          <p className="mt-2 text-sm text-red-500">{errors.services}</p>
        )}
      </div>

      {/* Message */}
      <div className="mt-6">
        <label
          className="mb-2 block font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Message <span className="text-red-500">*</span>
        </label>

        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell us about your requirements..."
          className={`w-full resize-none rounded-xl border px-4 py-3 outline-none placeholder:text-[var(--text-light)]
          ${
            errors.message ? "border-red-500" : "focus:border-[var(--primary)]"
          }`}
          style={inputStyle}
        />

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 rounded-xl border border-green-500 bg-green-50 p-3 text-green-700">
          {successMessage}
        </div>
      )}

      {serverError && (
        <div className="mb-4 rounded-xl border border-red-500 bg-red-50 p-3 text-red-700">
          {serverError}
        </div>
      )}

      {showOtpBox && (
        <div className="mt-6 rounded-xl border p-4">
          <label className="mb-2 block font-medium">Enter OTP</label>

          <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6 digit OTP"
            className="w-full rounded-xl border px-4 py-3 outline-none"
            style={inputStyle}
          />

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={otpLoading}
            className="mt-3 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white"
          >
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || showOtpBox}
        className="mt-8 w-full rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 disabled:opacity-70"
        style={{
          background: "var(--primary)",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending OTP...
          </div>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  );
}
