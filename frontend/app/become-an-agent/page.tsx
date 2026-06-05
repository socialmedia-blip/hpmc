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
  return (
    <div>
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

              <form className="mt-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
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
                    type="text"
                    placeholder="Country *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="City / State *"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Industry Experience (Years)"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />

                  <input
                    type="text"
                    placeholder="Current Business"
                    className="h-14 px-4 rounded-xl border bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Website (Optional)"
                  className="w-full h-14 px-4 rounded-xl border bg-transparent"
                  style={{ borderColor: "var(--border)" }}
                />

                <textarea
                  rows={5}
                  placeholder="Tell us about your business, market coverage, customer base, and why you want to become an HPMC agent..."
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
                  Submit Application
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
