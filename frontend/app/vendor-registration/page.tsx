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

export default function VendorRegistration() {
  const [openPopup, setOpenPopup] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    panNumber: "",
    businessType: "Manufacturer",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    productsServices: "",
    experience: "",
    website: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vendor`,
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
        throw new Error(data.message || "Failed to submit registration");
      }

      alert("Vendor registration submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        gstNumber: "",
        panNumber: "",
        businessType: "Manufacturer",
        address: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        productsServices: "",
        experience: "",
        website: "",
        message: "",
      });
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />

      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
              <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
                Supply Chain Partnership
              </span>

              <h1 className="mt-4 text-5xl font-bold text-[var(--text-primary)]">
                Vendor
                <span className="text-[var(--primary)]"> Registration</span>
              </h1>

              <p className="mt-6 text-[var(--text-secondary)] leading-8">
                HPMC welcomes manufacturers, suppliers, distributors, and
                service providers to become part of our trusted vendor network.
                Register your organization and explore long-term business
                opportunities with us.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Transparent Procurement Process",
                  "Long-Term Business Opportunities",
                  "Professional Vendor Evaluation",
                  "Timely Communication & Support",
                  "Growing Manufacturing Requirements",
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
                  Eligible Vendors
                </h3>

                <p className="mt-3 text-[var(--text-secondary)] leading-7">
                  Raw material suppliers, component manufacturers, industrial
                  equipment suppliers, logistics providers, packaging vendors,
                  and service organizations supporting manufacturing operations.
                </p>
              </div>
            </div>

            {/* FORM */}
            <div
              className="lg:col-span-3 rounded-[32px] border bg-[var(--card)] p-8 lg:p-10"
              style={{ borderColor: "var(--border)" }}
            >
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                Vendor Registration Form
              </h2>

              <p className="mt-3 text-[var(--text-secondary)]">
                Complete the form below and our team will contact you.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Contact Person Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number *"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessType: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                >
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Trader">Trader</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Raw Material Supplier">
                    Raw Material Supplier
                  </option>
                  <option value="Transporter">Transporter</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="text"
                  required
                  placeholder="Products / Services Offered *"
                  value={formData.productsServices}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productsServices: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="number"
                    placeholder="Years of Experience"
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

                  <input
                    type="text"
                    placeholder="Website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        website: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gstNumber: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="PAN Number"
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        panNumber: e.target.value,
                      })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Address *"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <div className="grid md:grid-cols-3 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Country *"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    required
                    placeholder="State *"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
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
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pincode: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <textarea
                  rows={5}
                  placeholder="Tell us about your organization, manufacturing capabilities, certifications, major clients, and products/services."
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
                  {loading ? "Submitting..." : "Submit Registration"}
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
