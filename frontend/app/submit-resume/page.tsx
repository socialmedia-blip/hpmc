"use client";

import { useState } from "react";
import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function SubmitResume() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div>
      <Navbar />

      {/* FORM */}
      <section className="pt-24 pb-16 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div
            className="rounded-[40px] border bg-[var(--card)] p-8 md:p-12"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div className="text-center mb-12">
              <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
                Application Form
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                Join Our Team
              </h2>

              <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto leading-8">
                Fill in your details and upload your latest resume. Our HR team
                will review your profile and contact you if a suitable
                opportunity is available.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-14 px-4 rounded-xl border bg-transparent outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-14 px-4 rounded-xl border bg-transparent outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    className="w-full h-14 px-4 rounded-xl border bg-transparent outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                    Position Applying For
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Sales Engineer"
                    className="w-full h-14 px-4 rounded-xl border bg-transparent outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                    Experience
                  </label>

                  <select
                    className="w-full h-14 px-4 rounded-xl border bg-transparent outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  >
                    <option>Fresher</option>
                    <option>1-3 Years</option>
                    <option>3-5 Years</option>
                    <option>5-10 Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                    Current Location
                  </label>

                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full h-14 px-4 rounded-xl border bg-transparent outline-none"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                  Upload Resume *
                </label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full p-4 rounded-xl border"
                  style={{
                    borderColor: "var(--border)",
                  }}
                />

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
                  Cover Letter / Additional Information
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us about yourself..."
                  className="w-full p-4 rounded-xl border bg-transparent outline-none resize-none"
                  style={{
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-4 bg-[var(--primary)] hover:opacity-90 transition px-8 py-4 rounded-xl"
              >
                <span className="text-white font-semibold uppercase text-sm">
                  Submit Application
                </span>

                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white">→</span>
                </div>
              </button>
            </form>
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
