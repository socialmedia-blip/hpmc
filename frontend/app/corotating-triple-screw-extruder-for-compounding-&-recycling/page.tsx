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

const galleryImages = [
  "/products/co-rotating twing screw extruder/corotating-triple-screw-extruder-for-compounding-recycling-engineering-plastic/triple-screw-extruder-for-high-filler-main.jpg",
  "/products/co-rotating twing screw extruder/corotating-triple-screw-extruder-for-compounding-recycling-engineering-plastic/triple-screw-extruder-for-high-filler-v1.jpg",
  "/products/co-rotating twing screw extruder/corotating-triple-screw-extruder-for-compounding-recycling-engineering-plastic/triple-screw-extruder-for-high-filler-v2.jpg",
];

const specifications = [
  {
    parameter: "Screw Diameter (mm)",
    values: ["21.7", "30", "35.6", "50.5", "62.4", "71.2", "91"],
  },
  {
    parameter: "Max Rotary Speed (RPM)",
    values: ["600", "400", "600", "500/600", "400/500", "400/500", "400/500"],
  },
  {
    parameter: "Main Motor Power (kW)",
    values: ["4", "11", "11/15", "37/45", "55/75", "90/110", "220/250"],
  },
  {
    parameter: "L/D Ratio",
    values: ["32-40", "28-48", "32-48", "32-48", "32-48", "32-48", "32-40"],
  },
  {
    parameter: "Capacity (kg/h)",
    values: [
      "2-10",
      "5-30",
      "10-80",
      "20-150",
      "100-300",
      "300-600",
      "600-1000",
    ],
  },
];
const faqData = [
  {
    question: "What is a Co-Rotating Triple Screw Extruder?",
    answer:
      "A Co-Rotating Triple Screw Extruder is a high-performance polymer processing machine designed for compounding, masterbatch production, recycling, and high-filler formulations requiring exceptional mixing, plasticization, and throughput.",
  },
  {
    question: "What applications are suitable for a Triple Screw Extruder?",
    answer:
      "The machine is widely used for direct compounding, PVC cable compounds, masterbatch production, engineering plastics, polymer alloys, film and sheet extrusion compounds, injection molding compounds, and recycling applications.",
  },
  {
    question: "What materials can be processed using this extruder?",
    answer:
      "The system can process PVC, PP, PE, ABS, PA, PC, engineering plastics, recycled polymers, filler compounds, masterbatches, and specialty polymer formulations.",
  },
  {
    question: "What is the production capacity of the Triple Screw Extruder?",
    answer:
      "Depending on the machine model, production capacities range from 2 Kg/hr to 1500 Kg/hr, making it suitable for laboratory development, pilot production, and large-scale industrial manufacturing.",
  },
  {
    question: "What are the advantages of Triple Screw Technology?",
    answer:
      "Triple Screw Technology provides superior distributive mixing, enhanced dispersive mixing, higher throughput, better plasticization, improved filler dispersion, and greater process efficiency compared to conventional extrusion systems.",
  },
  {
    question: "Can the machine process high filler formulations?",
    answer:
      "Yes. The Triple Screw Extruder is specifically designed for high-filler compounding applications, ensuring excellent dispersion, stable processing, and consistent product quality.",
  },
  {
    question: "Is the machine suitable for masterbatch production?",
    answer:
      "Yes. The system is ideal for color masterbatches, additive masterbatches, filler masterbatches, and specialty compounds requiring precise dispersion and mixing.",
  },
  {
    question: "Can the machine process engineering plastics?",
    answer:
      "Yes. The extruder is widely used for engineering plastic compounding, polymer modification, reinforced compounds, and advanced material formulations.",
  },
  {
    question: "What are polymer alloys and composite applications?",
    answer:
      "Polymer alloys combine multiple polymers to improve performance characteristics, while composite applications include materials reinforced with fillers, fibers, or additives to achieve specific mechanical and thermal properties.",
  },
  {
    question: "Can the Triple Screw Extruder process wood fiber composites?",
    answer:
      "Yes. The machine is suitable for manufacturing wood-plastic composites (WPC), fiber-reinforced compounds, and other composite material formulations.",
  },
  {
    question: "How does the modular screw design improve performance?",
    answer:
      "The modular screw configuration allows customized processing setups, optimized mixing zones, improved flexibility, and adaptation for different materials and production requirements.",
  },
  {
    question: "What is the role of the Die Face Cutter and Vibratory Sieve?",
    answer:
      "The Die Face Cutter produces uniform pellets while the Vibratory Sieve removes irregular particles, ensuring consistent pellet size and high-quality finished compounds.",
  },
  {
    question: "Which industries use Triple Screw Extruders?",
    answer:
      "These machines are widely used in plastics processing, automotive, cable manufacturing, packaging, construction materials, polymer compounding, recycling, and engineering plastics industries.",
  },
  {
    question: "Does HPMC provide installation and technical support?",
    answer:
      "Yes. HPMC provides installation, commissioning, operator training, process optimization support, spare parts supply, and comprehensive after-sales service.",
  },
  {
    question: "Why choose HPMC Co-Rotating Triple Screw Extruders?",
    answer:
      "HPMC Triple Screw Extruders offer exceptional mixing performance, high production capacity, superior compound quality, flexible processing capabilities, energy-efficient operation, and reliable long-term performance.",
  },
];

export default function CorotatingTripleScrewExtruder() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [catalogueToDownload, setCatalogueToDownload] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const displayedFaqs = showAllFaqs ? faqData : faqData.slice(0, 5);

  const toggleVideo = async () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await videoRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
      <title>
        Co-Rotating Triple Screw Extruder for Compounding & Recycling | HPMC
      </title>

      <meta
        name="description"
        content="HPMC Co-Rotating Triple Screw Extruder is engineered for polymer compounding and recycling with high filler loading, superior mixing, masterbatch production, and output capacities up to 1500 kg/hr. Designed for reliable, energy-efficient industrial performance."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/co-rotating-triple-screw-extruder-for-compounding-&-recycling"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/home-hero3.png')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center">
          <div className="max-w-[520px] pt-24 lg:pt-0">
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] leading-[1.05] font-bold text-[#0B1220]">
              Corotating Triple Screw Extruder
              <span className="text-[#65BC4F]">
                {" "}
                For Compounding & Recycling
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Triple Screw Extruders provide high-output compounding and
              recycling solutions with excellent mixing, high filler loading
              capability, and production capacities up to 1500 Kg/hr.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => setOpenPopup(true)}
                className="flex items-center gap-3 bg-[#65BC4F] hover:bg-[#54a63f] transition-all px-6 py-3 rounded-lg"
              >
                <span className="text-white font-semibold uppercase text-sm">
                  Request a Demo
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
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
            Co-Rotating Triple Screw Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              For Compounding & Recycling
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

            {/* CONTENT */}
            <div>
              {/* CONTENT */}
              <div>
                <p className="mt-8 text-[var(--text-secondary)] leading-8">
                  HPMC Triple Screw Extruders are specially engineered for
                  high-filler compounding, masterbatch production, and recycling
                  applications. Delivering outputs up to 1500 Kg/hr, they
                  provide exceptional mixing, plasticization, and processing
                  efficiency for demanding polymer formulations.
                </p>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 gap-5 mt-10">
                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Applications
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• Direct Compounding</li>
                      <li>• PVC Cable Compounds</li>
                      <li>• Film & Sheet Extrusion</li>
                      <li>• Injection Molding</li>
                      <li>• Compression Molding</li>
                      <li>• Recycling</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Key Features
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• High Precision Gearbox</li>
                      <li>• Modular Screw Design</li>
                      <li>• Reliable Lubrication System</li>
                      <li>• Die Face Cutter</li>
                      <li>• Vibratory Sieve</li>
                      <li>• Smooth Material Feeding</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      High Filler Capability
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• High Filler Compounding</li>
                      <li>• Masterbatch Production</li>
                      <li>• Engineering Plastics</li>
                      <li>• Polymer Alloys</li>
                      <li>• Wood Fiber Composites</li>
                      <li>• Consistent Product Quality</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => handleDownload("/catalogue.pdf")}
                  className="
        bg-[var(--primary)]
        hover:opacity-90
        text-white
        font-semibold
        px-7
        py-4
        rounded-xl
        transition-all
        duration-300
        flex
        items-center
        gap-3
      "
                >
                  Download Catalogue
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    ↓
                  </span>
                </button>

                <button
                  onClick={() => setOpenPopup2(true)}
                  className="
        border
        border-[var(--border)]
        hover:border-[var(--primary)]
        hover:bg-[var(--primary)]
        hover:text-white
        text-[var(--text-primary)]
        px-7
        py-4
        rounded-xl
        font-semibold
        transition-all
        duration-300
      "
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Product Showcase
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              See Our Machine
              <span className="text-[var(--primary)]"> In Action</span>
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-[var(--text-secondary)]">
              Explore detailed machine visuals and watch real production
              demonstrations to understand the performance and quality of our
              extrusion systems.
            </p>
          </div>

          <div>
         
            <div className="relative h-[500px] rounded-[32px] overflow-hidden border border-[var(--border)] shadow-xl">
              <video
                ref={videoRef}
                controls
                poster="/capture.png"
                className="w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/abc.mp4" type="video/mp4" />
              </video>

              {!playing && (
                <>
                  <div className="absolute inset-0 bg-black/25 pointer-events-none" />

                  <button
                    onClick={toggleVideo}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all"
                  >
                    <Play size={34} className="ml-1 text-[var(--primary)]" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section> */}

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

                  {["20", "30", "35", "50", "65", "72", "92"].map((model) => (
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
                Corotating Triple Screw Extruder
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
