"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function ScheduleSiteVisitForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    date: "",
    time: "",
    message: "",
  });

  const inputStyle = {
    background: "var(--background)",
    color: "var(--text-primary)",
    borderColor: "var(--border)",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const visitDateTime = new Date(
        `${formData.date}T${formData.time}`,
      ).toISOString();

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        visitDateTime,
        message: formData.message,
      };

      if (!formData.phone) {
        setErrorMessage("Phone number is required");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/sitevisit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setSuccessMessage(
        data.message || "Site visit request submitted successfully!",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-w-0 overflow-hidden py-2 sm:py-4">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-0 sm:px-3 md:px-5">
        {/* Header */}
        <div className="mb-6 min-w-0 text-center sm:mb-10 md:mb-12">
          <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-5 py-2 text-sm font-semibold text-[var(--primary)]">
            Schedule a Site Visit
          </span>

          <h2 className="mt-4 text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl md:mt-5 md:text-5xl">
            Book Your Factory Site Visit
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-secondary)] sm:mt-4 sm:text-base">
            Choose your preferred date and time. Our team will coordinate your
            visit and provide a guided tour of our facility.
          </p>
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[360px_1fr] lg:gap-6">
          {/* Left Panel */}
          <div
            className="hidden lg:block rounded-[30px] border p-8 h-fit"
            style={{
              background: "var(--sidebar-bg)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Why Schedule a Site Visit?
            </h3>

            <p className="mt-3 text-[var(--text-secondary)]">
              Experience our facility and products firsthand with our expert
              team.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Factory & Facility Tour",
                "Meet Our Technical Team",
                "Product Manufacturing Overview",
                "Customized Business Discussion",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    ✓
                  </div>

                  <span className="font-medium text-[var(--text-primary)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="demo-form-shell min-w-0 rounded-2xl border p-3 sm:p-5 md:rounded-[30px] md:p-8"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="min-w-0 space-y-4 sm:space-y-6"
            >
              {successMessage && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-600">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-500">
                  {errorMessage}
                </div>
              )}
              <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-5">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="block w-full min-w-0 rounded-2xl border px-4 py-3 outline-none focus:border-[var(--primary)] sm:py-4"
                  style={inputStyle}
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="block w-full min-w-0 rounded-2xl border px-4 py-3 outline-none focus:border-[var(--primary)] sm:py-4"
                  style={inputStyle}
                />
              </div>

              <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-5">
                <div
                  className="min-w-0 rounded-2xl border px-3 py-3 sm:px-4 sm:py-4"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                >
                  <PhoneInput
                    className="demo-phone-input"
                    international
                    defaultCountry="IN"
                    required
                    value={formData.phone}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        phone: value || "",
                      })
                    }
                  />
                </div>

                <input
                  type="text"
                  placeholder="Company Name *"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyName: e.target.value,
                    })
                  }
                  className="block w-full min-w-0 rounded-2xl border px-4 py-3 outline-none focus:border-[var(--primary)] sm:py-4"
                  style={inputStyle}
                />
              </div>

              {/* Date & Time */}
              <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-5">
                <div>
                  <label className="mb-2 block font-medium text-[var(--text-primary)]">
                    Preferred Date *
                  </label>

                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                    className="block w-full min-w-0 rounded-2xl border px-4 py-3 outline-none focus:border-[var(--primary)] sm:py-4"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-[var(--text-primary)]">
                    Preferred Time (IST) *
                  </label>

                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        time: e.target.value,
                      })
                    }
                    className="block w-full min-w-0 rounded-2xl border px-4 py-3 outline-none focus:border-[var(--primary)] sm:py-4"
                    style={inputStyle}
                  />
                </div>
              </div>

              <textarea
                rows={5}
                placeholder="Additional Notes"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                className="block w-full min-w-0 resize-none rounded-2xl border px-4 py-3 outline-none focus:border-[var(--primary)] sm:py-4"
                style={inputStyle}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[var(--primary)] px-4 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
              >
                {loading ? "Submitting..." : "Request Site Visit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
