"use client";
import Image from "next/image";

import Link from "next/link";

import { useRef, useState, type MouseEvent } from "react";
import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import {
  Play,
  Pause,
  ChevronDown,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import DemoPopup from "../components/PopupDemo";

const galleryImages = ["/products/shredder/shredder.png"];

const machineGallery = [
  "/products/shredder/SK7A9375.JPG",
  "/products/shredder/SK7A9376.JPG",
  "/products/shredder/SK7A9378.JPG",
  "/products/shredder/SK7A9379.JPG",
  "/products/shredder/SK7A9380.JPG",
  "/products/shredder/SK7A9381.JPG",
];

const specifications = [
  [
    "Size of crushing chamber",
    "600 × 600 mm (L × W)",
    "800 × 900 mm (L × W)",
    "1200 × 1200 mm (L × W)",
  ],
  ["Blade material", "SKD 11", "SKD 11", "SKD 11"],
  ["Hardness of blade", "HRC60", "HRC60", "HRC60"],
  ["Qty of rotary blade", "26 pcs", "38 pcs", "64 pcs"],
  ["Power of drive motor", "22 kW AC", "37 kW AC", "45 kW AC"],
  ["Oil pump motor", "2.2 kW", "3 kW", "4 kW AC"],
  ["Size of screen sieve", "16 mm", "40 mm", "40 mm"],
];

export default function SingleShaftShredder() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [catalogueToDownload, setCatalogueToDownload] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [active, setActive] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const handleDownload = (catalogue: string) => {
    const access = localStorage.getItem("catalogue_access");

    if (access) {
      window.open(catalogue, "_blank");
      return;
    }

    setCatalogueToDownload(catalogue);
    setOpenPopup(true);
  };

  const handleImageZoom = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div>
      <title>Single Shaft Shredder | HPMC</title>

      <meta
        name="description"
        content="Industrial single shaft shredders for efficient plastic waste size reduction and recycling applications."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/single-shaft-shredder"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/home-hero1.png')",
          }}
        />

        <div className="absolute inset-0 hidden lg:block bg-white/10" />

        {/* Mobile Overlay */}
        <div
          className="
    absolute inset-0 lg:hidden
    bg-gradient-to-r
    from-white/95
    via-white/90
    to-white/40
  "
        />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center">
          <div className="max-w-[620px] pt-24 lg:pt-0">
            <h1 className="mt-6 text-[34px] sm:text-[46px] md:text-[58px] lg:text-[60px] leading-[1.05] font-bold text-[#0B1220]">
              Single Shaft
              <span className="block text-[#65BC4F]">Shredder</span>
            </h1>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={() => setOpenPopup(true)}
                className="flex items-center gap-3 bg-[#65BC4F] hover:bg-[#54a63f] transition-all duration-300 px-7 py-4 rounded-xl"
              >
                <span className="text-white font-semibold uppercase text-sm">
                  Request a Demo
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <span className="text-[var(--primary)] uppercase tracking-[3px] font-semibold text-sm">
            Product Overview
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            Single Shaft Shredder -
            <span className="text-[var(--primary)]">
              {" "}
              Single Shaft Shredder
            </span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* PRODUCT GALLERY */}
            <div>
              {/* Main Image */}
              <div
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleImageZoom}
                className="
            relative
            h-[520px]
            rounded-[32px]
            bg-[var(--card)]
            border
            border-[var(--border)]
            shadow-[var(--shadow-primary)]
            group
            cursor-zoom-in
          "
              >
                <Image
                  src={galleryImages[activeImage]}
                  alt="Single Screw Extruder"
                  fill
                  className="
              object-contain
              p-8
              transition-all
              duration-700
              
            "
                />

                {isZooming && (
                  <>
                    <div
                      className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-[var(--primary)] bg-[var(--primary)]/10 shadow-[0_12px_35px_rgba(0,0,0,0.18)] hidden lg:block"
                      style={{
                        left: `${zoomPosition.x}%`,
                        top: `${zoomPosition.y}%`,
                      }}
                    />

                    <div
                      className="pointer-events-none absolute left-[calc(100%+24px)] top-0 z-40 hidden h-[520px] w-[520px] rounded-[28px] border border-[var(--border)] bg-white shadow-2xl xl:block"
                      style={{
                        backgroundImage: `url(${galleryImages[activeImage]})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "240%",
                      }}
                    />
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mt-5">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`
                relative
                h-24
                rounded-2xl
                overflow-hidden
                border-2
                transition-all
                duration-300
                ${
                  activeImage === index
                    ? "border-[var(--primary)] scale-105"
                    : "border-[var(--border)] hover:border-[var(--primary)]"
                }
              `}
                  >
                    <Image
                      src={img}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[var(--primary)] uppercase tracking-[3px] font-semibold text-sm">
              Technical Specifications
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Choose the Right{" "}
              <span className="text-[var(--primary)]">Model</span>
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-[var(--border)] bg-white shadow-[var(--shadow-primary)]">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-[var(--primary)] text-white">
                <tr>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    Machine model
                  </th>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    WT 600
                  </th>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    WT 800
                  </th>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    WT 1000
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                {specifications.map(([label, wt600, wt800, wt1000]) => (
                  <tr key={label} className="even:bg-[var(--surface)]">
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-[var(--text-primary)]"
                    >
                      {label}
                    </th>
                    <td className="px-6 py-4">{wt600}</td>
                    <td className="px-6 py-4">{wt800}</td>
                    <td className="px-6 py-4">{wt1000}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[var(--primary)] uppercase tracking-[3px] font-semibold text-sm">
              Gallery
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Machine <span className="text-[var(--primary)]">Gallery</span>
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] leading-8">
              Explore different views of the HPMC Single Shaft Shredder,
              showcasing its robust construction, precision engineering, and
              industrial-grade components.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {machineGallery.map((image, index) => (
              <div
                key={index}
                className="
            group
            overflow-hidden
            rounded-3xl
            border
            border-[var(--border)]
            bg-white
            shadow-[var(--shadow-primary)]
            hover:shadow-2xl
            transition-all
            duration-500
          "
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={image}
                    alt={`Single Shaft Shredder ${index + 1}`}
                    fill
                    className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
      <ScrollToTop />
      <FloatingContact />
      <Footer />
      <DemoPopup open={openPopup} onClose={() => setOpenPopup(false)} />
      <PopupForm open={openPopup2} onClose={() => setOpenPopup2(false)} />
    </div>
  );
}
