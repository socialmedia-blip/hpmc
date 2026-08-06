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

const galleryImages = ["/products/wpc/laserfilter.png"];
const faqData = [
  {
    question: "What is a Self Cleaning Laser Filter?",
    answer:
      "A Self Cleaning Laser Filter is an advanced melt filtration system used in plastic extrusion lines to continuously remove contaminants from molten plastic without interrupting production, ensuring superior product quality and higher manufacturing efficiency.",
  },
  {
    question: "How does a Self Cleaning Laser Filter work?",
    answer:
      "The filter continuously removes impurities from molten plastic using a precision laser-drilled filter screen and an automatic self-cleaning mechanism, maintaining uninterrupted melt flow and consistent filtration.",
  },
  {
    question:
      "Which materials can be processed using a Self Cleaning Laser Filter?",
    answer:
      "The system is suitable for processing PP, PE, HDPE, LDPE, LLDPE, PVC, ABS, PS, PET, recycled plastics, and various engineering polymers used in plastic extrusion.",
  },
  {
    question: "Which industries use Self Cleaning Laser Filters?",
    answer:
      "Plastic recycling plants, blown film manufacturers, pipe extrusion companies, sheet extrusion plants, compounding industries, pelletizing plants, and masterbatch manufacturers widely use Self Cleaning Laser Filters.",
  },
  {
    question:
      "Why is a Self Cleaning Laser Filter important in plastic extrusion?",
    answer:
      "The filter removes contaminants, protects extrusion equipment, improves product quality, reduces downtime, increases production efficiency, and minimizes manual screen changing.",
  },
  {
    question:
      "Which is the best Self Cleaning Laser Filter manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best Self Cleaning Laser Filter manufacturers in India, offering advanced melt filtration systems with reliable performance and long service life.",
  },
  {
    question: "Who is the top Laser Filter manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance Self Cleaning Laser Filters trusted by plastic recycling and extrusion companies across India and international markets.",
  },
  {
    question: "What are the advantages of a Self Cleaning Laser Filter?",
    answer:
      "The system provides continuous filtration, automatic cleaning, stable melt pressure, excellent filtration efficiency, reduced production downtime, energy-efficient operation, and improved product quality.",
  },
  {
    question:
      "Why should manufacturers invest in a Self Cleaning Laser Filter?",
    answer:
      "A Self Cleaning Laser Filter increases production efficiency, reduces labor costs, minimizes material wastage, improves finished product quality, and extends the life of extrusion equipment.",
  },
  {
    question: "Can the Self Cleaning Laser Filter operate continuously?",
    answer:
      "Yes. The system is designed for continuous industrial operation without frequent production interruptions for manual screen replacement.",
  },
  {
    question: "What types of contamination can the filter remove?",
    answer:
      "The filter effectively removes paper particles, aluminum foil, dust, wood particles, rubber, unmelted plastic, labels, fibers, and other contaminants present in recycled plastic materials.",
  },
  {
    question: "Can the Laser Filter be used in plastic recycling plants?",
    answer:
      "Yes. The Self Cleaning Laser Filter is widely used in plastic recycling plants to improve melt purity and produce high-quality recycled plastic granules.",
  },
  {
    question: "Can the Laser Filter be installed on existing extrusion lines?",
    answer:
      "Yes. The filtration system can be integrated into most existing plastic extrusion, recycling, compounding, and pelletizing lines with suitable engineering support.",
  },
  {
    question: "Which extrusion processes use Self Cleaning Laser Filters?",
    answer:
      "The system is widely used in blown film extrusion, pipe extrusion, sheet extrusion, profile extrusion, compounding, pelletizing, raffia production, and plastic recycling lines.",
  },
  {
    question: "Can the Laser Filter improve recycled plastic quality?",
    answer:
      "Yes. Continuous removal of impurities significantly improves melt cleanliness, resulting in better-quality recycled pellets and finished plastic products.",
  },
  {
    question: "Does the Self Cleaning Laser Filter reduce production downtime?",
    answer:
      "Yes. Automatic screen cleaning eliminates frequent manual screen changes, allowing uninterrupted production and higher manufacturing efficiency.",
  },
  {
    question: "Can the filter improve extrusion output?",
    answer:
      "Yes. Stable melt flow, continuous filtration, and reduced machine stoppages help improve overall extrusion productivity and output.",
  },
  {
    question: "Is the Self Cleaning Laser Filter energy efficient?",
    answer:
      "Yes. The optimized filtration design minimizes pressure loss and supports energy-efficient plastic extrusion with reduced operating costs.",
  },
  {
    question:
      "Can the Laser Filter process highly contaminated recycled plastic?",
    answer:
      "Yes. The system is specially designed for processing contaminated recycled plastics by continuously removing impurities while maintaining stable melt flow.",
  },
  {
    question: "Can the Self Cleaning Laser Filter be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized filtration capacities, screen sizes, automation options, and integration solutions based on customer production requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a plastic recycling business?",
    answer:
      "Yes. A Self Cleaning Laser Filter is an excellent investment for recycling businesses aiming to manufacture premium-quality recycled plastic granules and finished products.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for a Self Cleaning Laser Filter?",
    answer:
      "Hindustan Plastics and Machine Corporation provides precision-engineered filtration systems with advanced technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Laser Filter manufacturers in India?",
    answer:
      "With decades of expertise in plastic processing machinery, innovative engineering, premium manufacturing standards, and reliable after-sales support, Hindustan Plastics and Machine Corporation is trusted worldwide.",
  },
  {
    question:
      "Can the Self Cleaning Laser Filter improve finished product quality?",
    answer:
      "Yes. By removing contaminants before extrusion, the filter improves surface finish, mechanical properties, appearance, and consistency of the final plastic products.",
  },
  {
    question: "How can I get the best price for a Self Cleaning Laser Filter?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your extrusion capacity, material type, contamination level, and project requirements to receive a customized quotation and expert recommendation.",
  },
];

export default function SelfCleaningLaserFilter() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [catalogueToDownload, setCatalogueToDownload] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [active, setActive] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? faqData : faqData.slice(0, 10);

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
      <title>Self Cleaning Laser Filter | HPMC</title>

      <meta
        name="description"
        content="Advanced self-cleaning laser filters for efficient melt filtration and improved plastic extrusion quality."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/self-cleaning-laser-filter"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/laser.png')",
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
              Self Cleaning
              <span className="block text-[#65BC4F]">Laser Filter</span>
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
            Laser Filter -
            <span className="text-[var(--primary)]">
              {" "}
              Self Cleaning Laser Filter
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

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Everything About Our
              <span className="text-[var(--primary)]">
                {" "}
                self Cleaning Laser Filter
              </span>
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
              Find answers to common questions about PVC pipe extrusion, machine
              specifications, applications, output capacity, installation, and
              maintenance.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-4 top-10 bottom-0 rounded-[32px] bg-[linear-gradient(180deg,rgba(101,188,79,0.08),rgba(255,255,255,0))] pointer-events-none" />

            <div className="relative overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--card)] shadow-[0_24px_70px_rgba(11,18,32,0.08)]">
              <div className="grid gap-5 border-b border-[var(--border)] bg-white/70 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                    <HelpCircle size={24} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                      Expert Support
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      Quick answers before you enquire
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">
                  <Sparkles size={16} className="text-[var(--primary)]" />
                  {displayedFaqs.length} of {faqData.length} FAQs
                </div>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {displayedFaqs.map((faq, index) => {
                  const isOpen = active === index;

                  return (
                    <div
                      key={index}
                      className="
                                    transition-all
                                    duration-300
                                    hover:bg-[var(--muted)]
                                  "
                    >
                      <button
                        onClick={() => setActive(isOpen ? null : index)}
                        className="
                                      w-full
                                      flex
                                      items-center
                                      justify-between
                                      gap-5
                                      px-5
                                      py-5
                                      sm:px-7
                                      sm:py-6
                                      text-left
                                    "
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`
                                            mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold
                                            transition-all duration-300
                                            ${
                                              isOpen
                                                ? "bg-[var(--primary)] text-white"
                                                : "bg-[var(--primary)]/10 text-[var(--primary)]"
                                            }
                                          `}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h3 className="text-base font-semibold leading-7 text-[var(--text-primary)] sm:text-lg lg:text-xl">
                            {faq.question}
                          </h3>
                        </div>

                        <div
                          className={`
                                        w-10 h-10 rounded-full shrink-0
                                        flex items-center justify-center
                                        border border-[var(--border)]
                                        bg-white
                                        transition-all duration-300
                                        ${isOpen ? "rotate-180 border-[var(--primary)] text-[var(--primary)]" : "text-[var(--text-secondary)]"}
                                      `}
                        >
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <div
                        className={`
                                      grid
                                      transition-all
                                      duration-500
                                      ease-in-out
                                      ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                                    `}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-6 pl-[72px] pr-7 text-[var(--text-secondary)] leading-8 sm:px-7 sm:pl-20">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {faqData.length > 5 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-4
                                    rounded-full
                                    border
                                    border-[var(--primary)]/25
                                    bg-white
                                    px-5
                                    py-3
                                    text-[var(--text-primary)]
                                    shadow-[0_18px_45px_rgba(11,18,32,0.08)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-[var(--primary)]
                                    hover:shadow-[0_22px_55px_rgba(101,188,79,0.18)]
                        "
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] text-white transition-transform duration-300 group-hover:scale-105">
                  {showAllFaqs ? (
                    <ChevronDown size={20} className="rotate-180" />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </span>

                <span className="text-left">
                  <span className="block text-sm font-bold sm:text-base">
                    {showAllFaqs ? "View less FAQs" : `View more FAQs`}
                  </span>
                </span>
              </button>
            </div>
          )}
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
