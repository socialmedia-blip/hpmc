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

const awards = [
  {
    year: "2026",
    title: "Global Conclave on Plastic Recycling & Sustainability",
    image: "/awards/global-conclave-2026.webp",
  },
  {
    year: "2026",
    title: "PlastIndia 2026 Exhibitor Appreciation",
    image: "/awards/plastindia-2026.webp",
  },
  {
    year: "2023",
    title: "Plastivision India 2023 Participation Award",
    image: "/awards/plastivision-2023.webp",
  },
  {
    year: "2022",
    title: "IndPlas 2022 Silver Sponsor",
    image: "/awards/indplas-2022-silver-sponsor.webp",
  },
  {
    year: "2022",
    title: "Nepal 5P International Expo Appreciation",
    image: "/awards/nepal-5p-2022.webp",
  },
  {
    year: "2022",
    title: "PlastAsia 2022 Certificate of Participation",
    image: "/awards/plastasia-2022.webp",
  },
  {
    year: "2020",
    title: "Plastivision India 2020 Memento",
    image: "/awards/plastivision-2020.webp",
  },
  {
    year: "2020",
    title: "Plastivision India 2020 Exhibitor Excellence Award",
    image: "/awards/plastivision-2020-excellence.webp",
  },
  {
    year: "2019",
    title: "World Environment Expo 2019 Appreciation",
    image: "/awards/world-environment-expo-2019.webp",
  },
  {
    year: "2018",
    title: "IPLEX'18 Participation Recognition",
    image: "/awards/iplex-2018.webp",
  },
  {
    year: "2018",
    title: "IndPlas 2018 Participation Certificate",
    image: "/awards/indplas-2018.webp",
  },
  {
    year: "2022",
    title: "IndPlas 2022 Exhibitor Trophy",
    image: "/awards/indplas-exhibitor-trophy.webp",
  },
];

export default function AwardsRecognition() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/awards.png')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center">
          <div className="max-w-[520px] pt-24 lg:pt-0">
            {/* Heading */}
            <p className="text-[#65BC4F] text-xs md:text-sm font-semibold uppercase tracking-wider mb-3">
              Home &gt; Awards & Recognition
            </p>

            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] leading-[1.05] font-bold text-[#0B1220]">
              Excellence
              <span className="text-[#65BC4F]"> Recognized</span>
            </h1>

            <p className="mt-6 text-gray-600 text-sm md:text-base leading-7 max-w-[540px]">
              Our achievements reflect decades of dedication to innovation,
              manufacturing excellence, customer satisfaction, and industry
              leadership.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-5">
              <button
                onClick={() => setOpenPopup(true)}
                className="flex items-center gap-3 bg-[#65BC4F] hover:bg-[#54a63f] transition-all px-6 py-3 rounded-lg"
              >
                <span className="text-white font-semibold uppercase text-sm">
                  Talk To Our Experts Team
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Awards Timeline
            </span>

            <h2 className="mt-4 text-5xl lg:text-6xl font-bold text-[var(--text-primary)]">
              Recognized Through The Years
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <div
                key={award.title}
                className="group overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Year Badge */}
                  <div className="absolute left-5 top-5 rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-bold text-white shadow-lg">
                    {award.year}
                  </div>

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold leading-snug text-[var(--text-primary)]">
                    {award.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto text-center px-5">
          <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
            Looking Forward
          </span>

          <h2 className="text-5xl lg:text-7xl font-bold mt-5">
            Recognition Drives
            <span className="text-[var(--primary)]"> Responsibility</span>
          </h2>

          <p className="mt-8 text-lg text-[var(--text-secondary)] leading-8">
            Every award and recognition strengthens our commitment to
            innovation, quality, and customer success as we continue building
            the future of extrusion technology.
          </p>
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
