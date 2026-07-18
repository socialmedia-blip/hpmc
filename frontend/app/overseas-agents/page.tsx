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
const agents = [
  {
    country: "UAE",
    company: "ABC Industrial Solutions",
    contact: "+971 50 123 4567",
    email: "uae@company.com",
  },
  {
    country: "Saudi Arabia",
    company: "Gulf Machinery Trading",
    contact: "+966 50 123 4567",
    email: "ksa@company.com",
  },
  {
    country: "Egypt",
    company: "Cairo Engineering Services",
    contact: "+20 100 123 4567",
    email: "egypt@company.com",
  },
  {
    country: "Kenya",
    company: "East Africa Industrial",
    contact: "+254 700 123456",
    email: "kenya@company.com",
  },
];

export default function OverseasAgents() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      <title>Worldwide Representatives | Overseas Agents | HPMC</title>

      <meta
        name="description"
        content="Connect with HPMC's worldwide representatives and authorized overseas agents for plastic extrusion machinery, technical support, sales assistance, and local customer service. Find your nearest HPMC representative today."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/overseas-agents"
      />
      <Navbar />

      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Worldwide Representatives
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[var(--text-primary)]">
              Find Your Local
              <span className="text-[var(--primary)]"> Representative</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.country}
                className="rounded-3xl border bg-[var(--card)] p-8"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                    🌍
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-[var(--text-primary)]">
                      {agent.country}
                    </h3>

                    <p className="text-[var(--text-secondary)]">
                      Authorized Agent
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-[var(--primary)]">
                      Company
                    </p>
                    <p className="font-medium text-[var(--text-primary)]">
                      {agent.company}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-[var(--primary)]">
                      Contact
                    </p>
                    <p className="text-[var(--text-primary)]">
                      {agent.contact}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-[var(--primary)]">
                      Email
                    </p>
                    <p className="text-[var(--text-primary)]">{agent.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-5">
          <div
            className="rounded-[40px] p-12 text-center border bg-[var(--card)]"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">
              Interested in Becoming an Overseas Agent?
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] leading-8">
              We are continuously expanding our international presence and
              welcome experienced partners to represent HPMC in new markets.
            </p>

            <Link
              href="/become-an-agent"
              className="inline-flex mt-8 bg-[var(--primary)] text-white px-8 py-4 rounded-xl font-semibold"
            >
              Apply Now
            </Link>
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
