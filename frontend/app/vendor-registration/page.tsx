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

              <form className="mt-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Contact Person Name *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="Company Name *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <input
                    type="text"
                    placeholder="Country *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="State *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="City *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <select
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                >
                  <option>Business Type</option>
                  <option>Manufacturer</option>
                  <option>Trader</option>
                  <option>Distributor</option>
                  <option>Service Provider</option>
                </select>

                <input
                  type="text"
                  placeholder="Products / Services Offered *"
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Years of Experience"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="Annual Production Capacity"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="GST Number"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="PAN Number"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Website"
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <input
                  type="file"
                  className="w-full p-4 rounded-xl border"
                  style={{ borderColor: "var(--border)" }}
                />

                <textarea
                  rows={5}
                  placeholder="Tell us about your organization, manufacturing capabilities, certifications, major clients, and products/services."
                  className="w-full p-4 rounded-xl border bg-transparent resize-none"
                  style={{ borderColor: "var(--border)" }}
                />

                <button
                  type="submit"
                  className="
      bg-[var(--primary)]
      hover:opacity-90
      text-white
      font-semibold
      px-8
      py-4
      rounded-xl
      transition-all
      duration-300
    "
                >
                  Submit Registration
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
