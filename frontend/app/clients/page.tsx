"use client";

import Image from "next/image";
import { Building2, Globe2, Handshake, Award } from "lucide-react";

import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useState } from "react";

const clients = [
  "/clients/client (1).jpg",
  "/clients/client (2).jpg",
  "/clients/client (3).jpg",
  "/clients/client (4).jpg",
  "/clients/client (5).jpg",
  "/clients/client (6).jpg",
  "/clients/client (8).jpg",
];

export default function Clients() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="bg-[var(--background)]">
      <Navbar />

      {/* CLIENT LOGO WALL */}
      <section className="mt-24 pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--primary)]">
              Companies That Trust Us
            </h2>

            <p className="mt-4 text-[var(--text-secondary)]">
              Building long-term partnerships through quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 flex items-center justify-center h-[180px] hover:border-[var(--primary)] hover:shadow-[var(--shadow-primary)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={client}
                    alt={`Client ${index + 1}`}
                    fill
                    className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST MESSAGE */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[32px] p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Built On Trust & Long-Term Relationships
            </h2>

            <p className="mt-6 text-[var(--text-secondary)] leading-8">
              Many of our customers continue to partner with us for multiple
              projects, capacity expansions, and new production lines. Their
              continued trust reflects our commitment to quality, innovation,
              and dependable technical support.
            </p>
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
