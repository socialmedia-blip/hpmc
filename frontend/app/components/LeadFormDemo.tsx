"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function ScheduleDemoForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    notes: "",
  });

  const inputStyle = {
    background: "var(--background)",
    color: "var(--text-primary)",
    borderColor: "var(--border)",
  };

  return (
    <section className="relative py-4">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-5 py-2 text-sm font-semibold text-[var(--primary)]">
            Schedule a Demo
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            Book Your Live Product Demo
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-[var(--text-secondary)]">
            Pick your preferred date and time. Our specialists will connect with
            you and provide a personalized demonstration.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left Panel */}
          <div
            className="rounded-[30px] border p-8 h-fit"
            style={{
              background: "var(--sidebar-bg)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Why Schedule a Demo?
            </h3>

            <p className="mt-3 text-[var(--text-secondary)]">
              Get a complete walkthrough from our technical experts.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Live Product Demonstration",
                "One-to-One Expert Consultation",
                "Technical Q&A Session",
                "30-Minute Guided Tour",
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
            className="rounded-[30px] border p-6 md:p-8"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="rounded-2xl border px-4 py-4 outline-none focus:border-[var(--primary)]"
                  style={inputStyle}
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="rounded-2xl border px-4 py-4 outline-none focus:border-[var(--primary)]"
                  style={inputStyle}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div
                  className="rounded-2xl border px-4 py-4"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                >
                  <PhoneInput
                    international
                    defaultCountry="IN"
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
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: e.target.value,
                    })
                  }
                  className="rounded-2xl border px-4 py-4 outline-none focus:border-[var(--primary)]"
                  style={inputStyle}
                />
              </div>

              {/* Date & Time Cards */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block font-medium text-[var(--text-primary)]">
                    Preferred Date
                  </label>

                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border px-4 py-4 outline-none focus:border-[var(--primary)]"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-[var(--text-primary)]">
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        time: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border px-4 py-4 outline-none focus:border-[var(--primary)]"
                    style={inputStyle}
                  />
                </div>
              </div>

              <textarea
                rows={5}
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
                className="w-full resize-none rounded-2xl border px-4 py-4 outline-none focus:border-[var(--primary)]"
                style={inputStyle}
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-[var(--primary)] py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Schedule Demo
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
