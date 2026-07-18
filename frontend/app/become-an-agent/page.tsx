"use client";
import Image from "next/image";

import Link from "next/link";

import { useEffect, useState } from "react";
import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScheduleDemoForm from "../components/LeadFormDemo";

export default function BecomeAgent() {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "Distributor",
    experience: "",
    state: "",
    city: "",
    currentProducts: "",
    monthlyRequirement: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/agent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            experience: Number(formData.experience || 0),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setSuccessMessage(
        data.message || "Agent application submitted successfully!",
      );
      setErrorMessage("");

      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        businessType: "Distributor",
        experience: "",
        state: "",
        city: "",
        currentProducts: "",
        monthlyRequirement: "",
        message: "",
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <title>Worldwide Representatives | Become an Agent | HPMC</title>

      <meta
        name="description"
        content="Connect with HPMC's worldwide representatives and authorized overseas agents for plastic extrusion machinery, technical support, sales assistance, and local customer service. Find your nearest HPMC representative today."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/become-an-agent"
      />
      <Navbar />

      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
              <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
                Partnership Program
              </span>

              <h1 className="mt-4 text-5xl font-bold text-[var(--text-primary)]">
                Become an
                <span className="text-[var(--primary)]"> Agent</span>
              </h1>

              <p className="mt-6 text-[var(--text-secondary)] leading-8">
                Join HPMC's growing global network of sales and service
                partners. Expand your business by representing one of India's
                leading plastic extrusion machinery manufacturers.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Strong Brand Reputation",
                  "Technical & Sales Support",
                  "Exclusive Territory Opportunities",
                  "Training & Marketing Assistance",
                  "Attractive Business Potential",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                    <span className="font-medium text-[var(--text-primary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-10 p-6 rounded-3xl border bg-[var(--card)]"
                style={{ borderColor: "var(--border)" }}
              >
                <h3 className="font-bold text-xl text-[var(--text-primary)]">
                  Who Can Apply?
                </h3>

                <p className="mt-3 text-[var(--text-secondary)] leading-7">
                  Machinery dealers, industrial distributors, engineering
                  companies, sales professionals, and organizations with
                  experience in industrial equipment sales.
                </p>
              </div>
            </div>

            {/* FORM */}
            <div
              className="lg:col-span-3 rounded-[32px] border bg-[var(--card)] p-8 lg:p-10"
              style={{ borderColor: "var(--border)" }}
            >
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                Agent Registration Form
              </h2>

              <p className="mt-3 text-[var(--text-secondary)]">
                Complete the form below and our partnership team will contact
                you.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    required
                    placeholder="Company Name *"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyName: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <select
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessType: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <option value="Distributor">Distributor</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Trader">Trader</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Other">Other</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Industry Experience (Years)"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="State *"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        state: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    required
                    placeholder="City *"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Current Products"
                  value={formData.currentProducts}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentProducts: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <input
                  type="text"
                  placeholder="Expected Monthly Requirement"
                  value={formData.monthlyRequirement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyRequirement: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <textarea
                  rows={5}
                  placeholder="Tell us about your business, market coverage and customer base..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-xl border bg-transparent resize-none"
                  style={{ borderColor: "var(--border)" }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="
      bg-[var(--primary)]
      hover:opacity-90
      disabled:opacity-70
      text-white
      font-semibold
      px-8
      py-4
      rounded-xl
      transition-all
      duration-300
    "
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <ScrollToTop />
      <FloatingContact />
      <Footer />
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}
