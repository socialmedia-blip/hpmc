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

const galleryImages = ["/products/wpc/garden.png"];

const faqData = [
  {
    question: "What is a Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "A Soft PVC Garden Pipe Extrusion Line is a complete extrusion system designed to manufacture flexible PVC garden pipes with excellent surface finish, dimensional accuracy, and consistent production quality.",
  },
  {
    question:
      "What materials can be processed using the HPMC Garden Pipe Plant?",
    answer:
      "The HPMC Garden Pipe Plant is designed for processing soft PVC compounds used in manufacturing flexible garden hoses, water supply hoses, and other PVC tubing applications.",
  },
  {
    question: "What pipe sizes can be produced?",
    answer:
      "The extrusion line is capable of manufacturing soft PVC garden pipes ranging from ½ inch to 2 inches in diameter depending on the selected machine model.",
  },
  {
    question:
      "What is the production capacity of the Garden Pipe Extrusion Line?",
    answer:
      "Depending on the machine model, production capacity ranges from 50 kg/hr to 130 kg/hr while maintaining excellent pipe quality and dimensional consistency.",
  },
  {
    question: "Which machine models are available?",
    answer:
      "HPMC offers HPMC 75, HPMC 90, HPMC 100, HPMC 75/45, and HPMC 90/55 models to meet different production capacities and customer requirements.",
  },
  {
    question: "What are the applications of Soft PVC Garden Pipes?",
    answer:
      "Soft PVC garden pipes are widely used for garden watering, household water supply, kitchen and bathroom connections, irrigation, hospitals, commercial buildings, apartments, hotels, and public water distribution systems.",
  },
  {
    question: "Is the machine suitable for continuous production?",
    answer:
      "Yes. The HPMC Soft PVC Garden Pipe Extrusion Line is designed for continuous operation with stable output, low downtime, and reliable long-term performance.",
  },
  {
    question: "Does the line include a cooling system?",
    answer:
      "Yes. The extrusion line is equipped with an integrated water cooling tank to ensure efficient pipe cooling, dimensional stability, and consistent product quality.",
  },
  {
    question: "Can the machine be customized?",
    answer:
      "Yes. Machine configurations, extrusion dies, cooling tanks, haul-off units, winding systems, and other components can be customized according to customer production requirements.",
  },
  {
    question: "How energy efficient is the Garden Pipe Extrusion Line?",
    answer:
      "The machine utilizes optimized screw design, efficient heating systems, and reliable drive technology to maximize production while minimizing energy consumption.",
  },
  {
    question: "Does HPMC provide installation and technical support?",
    answer:
      "Yes. HPMC provides complete installation, commissioning, operator training, spare parts support, and comprehensive after-sales service for all garden pipe extrusion plants.",
  },
  {
    question: "What maintenance is required for the extrusion line?",
    answer:
      "Routine maintenance includes inspection of the screw and barrel, gearbox lubrication, heaters, cooling tank, haul-off unit, electrical components, and regular cleaning to ensure smooth operation.",
  },
  {
    question: "Why choose HPMC Soft PVC Garden Pipe Extrusion Lines?",
    answer:
      "HPMC Garden Pipe Extrusion Lines offer reliable performance, excellent pipe quality, energy-efficient operation, robust construction, low maintenance, and dependable after-sales support for long-term production.",
  },
];

const specifications = [
  {
    parameter: "Pipe Range",
    values: ['½"–2"', '½"–2"', '½"–2"', '½"–2"', '½"–2"'],
  },
  {
    parameter: "Output (kg/hr)",
    values: ["50-60", "80-100", "100-130", "70-80", "120-130"],
  },
  {
    parameter: "Main Drive (kW)",
    values: ["15", "22.5", "30", "15/5", "22.5/7.5"],
  },
  {
    parameter: "Barrel (kW)",
    values: ["8", "10", "12", "8/5", "10/5"],
  },
  {
    parameter: "Die (kW)",
    values: ["2", "2", "2", "3", "3"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["15-45", "15-45", "15-45", "15-45", "15-45"],
  },
  {
    parameter: "Water Tank Length (m)",
    values: ["3", "4", "4", "3", "4"],
  },
  {
    parameter: "Haul Off Motor (kW)",
    values: ["1.5", "1.5", "2.2", "1.5", "2.2"],
  },
];

export default function SingleScrewPlantPvcCompounding() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [catalogueToDownload, setCatalogueToDownload] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [active, setActive] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? faqData : faqData.slice(0, 5);

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
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/sseHero.png')",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center">
          <div className="max-w-[620px] pt-24 lg:pt-0">
            <h1 className="mt-6 text-[34px] sm:text-[46px] md:text-[58px] lg:text-[60px] leading-[1.05] font-bold text-[#0B1220]">
              Soft PVC
              <span className="block text-[#65BC4F]">
                Garden Pipe Extrusion Line
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[#4B5563]">
              HPMC Soft PVC Garden Pipe Extrusion Lines are engineered for the
              efficient production of high-quality flexible PVC garden pipes,
              delivering consistent output, excellent dimensional accuracy, and
              reliable performance for domestic, agricultural, and industrial
              water supply applications.
            </p>

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
            Soft PVC Garden Pipe
            <span className="text-[var(--primary)]"> Extrusion Line</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
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
                  alt="Soft PVC Garden Pipe Extrusion Line"
                  fill
                  className="object-contain p-8 transition-all duration-700"
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

            {/* CONTENT */}
            <div>
              <p className="text-[var(--text-secondary)] leading-8">
                HPMC Soft PVC Garden Pipe Extrusion Lines are designed for the
                efficient production of flexible PVC garden pipes with excellent
                dimensional accuracy, smooth surface finish, and consistent
                output. The system provides stable extrusion performance with
                low energy consumption and reliable long-term operation.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                These extrusion lines are widely used for manufacturing garden
                hoses, water supply pipes, household connection pipes,
                irrigation hoses, and other flexible PVC tubing applications for
                residential, agricultural, and commercial sectors.
              </p>

              {/* Applications */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                  Applications
                </h4>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    "Garden Watering",
                    "Bathroom Connections",
                    "Kitchen Water Supply",
                    "Residential Buildings",
                    "Hospitals & Public Places",
                    "Agricultural Irrigation",
                    "Hotels & Offices",
                    "Village Water Distribution",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[var(--text-primary)]"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    130
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Max Output (kg/hr)
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    ½"–2"
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Pipe Size Range
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    5
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Machine Models
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => handleDownload("/catalogue.pdf")}
                  className="bg-[var(--primary)] hover:opacity-90 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  Download Catalogue
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    ↓
                  </span>
                </button>

                <button
                  onClick={() => setOpenPopup2(true)}
                  className="border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white text-[var(--text-primary)] px-7 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Machine Models
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[var(--text-primary)]">
              Technical
              <span className="text-[var(--primary)]"> Specifications</span>
            </h2>
          </div>

          <div
            className="overflow-x-auto rounded-3xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th
                    className="px-8 py-6 text-left font-semibold border"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    MACHINE MODELS
                  </th>

                  {[
                    "HPMC 75",
                    "HPMC 90",
                    "HPMC 100",
                    "HPMC 75/45",
                    "HPMC 90/55",
                  ].map((model) => (
                    <th
                      key={model}
                      className="px-8 py-6 text-center font-semibold border"
                      style={{ borderColor: "rgba(255,255,255,0.2)" }}
                    >
                      {model}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {specifications.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-[var(--muted)] transition-colors"
                    >
                      <td
                        className="px-8 py-5 font-semibold border"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {item.parameter}
                      </td>

                      {item.values?.map((value, idx) => (
                        <td
                          key={idx}
                          className="px-8 py-5 text-center border"
                          style={{ borderColor: "var(--border)" }}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Faqs */}
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
                Single Screw Plant For PVC Compounding
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
                  <span className="block text-xs font-semibold uppercase tracking-[2px] text-[var(--primary)]">
                    {showAllFaqs ? "Collapse List" : "Explore More"}
                  </span>
                  <span className="block text-sm font-bold sm:text-base">
                    {showAllFaqs
                      ? "Show fewer questions"
                      : `View ${faqData.length - displayedFaqs.length} more FAQs`}
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
