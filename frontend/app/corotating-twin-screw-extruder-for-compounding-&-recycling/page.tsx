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

const galleryImages = ["/products/co-rotating-twin-screw-extruder.png"];

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
    question: "What is a Co-Rotating Twin Screw Extruder?",
    answer:
      "A Co-Rotating Twin Screw Extruder is an advanced plastic processing machine used for polymer compounding, masterbatch production, recycling, filler modification and engineering plastic manufacturing.",
  },
  {
    question: "How does a Co-Rotating Twin Screw Extruder work?",
    answer:
      "Two screws rotate in the same direction to melt, mix, compound and convey polymer materials efficiently while ensuring excellent dispersion and homogeneous output.",
  },
  {
    question:
      "What is the difference between a single screw extruder and a twin screw extruder?",
    answer:
      "Single screw extruders are mainly used for extrusion, whereas co-rotating twin screw extruders provide superior mixing, compounding, filler dispersion and material homogenization.",
  },
  {
    question: "What is a Co-Rotating Twin Screw Extruder used for?",
    answer:
      "It is widely used for plastic compounding, color masterbatch, additive masterbatch, engineering plastics, recycling, PVC cable compounds and biodegradable plastic processing.",
  },
  {
    question: "Which materials can be processed in a twin screw extruder?",
    answer:
      "It can process PP, PE, ABS, PVC, PA, PC, PET, EVA, TPU, TPE, engineering plastics, recycled polymers and many specialty compounds.",
  },
  {
    question: "Can recycled plastic be processed in this machine?",
    answer:
      "Yes. The machine is designed for recycling applications and efficiently converts recycled plastic into high-quality reusable pellets.",
  },
  {
    question: "Can this machine produce color masterbatch?",
    answer:
      "Yes. It offers excellent pigment dispersion, making it ideal for manufacturing high-quality color masterbatches.",
  },
  {
    question: "Can additive masterbatch be manufactured?",
    answer:
      "Yes. The machine can manufacture UV, anti-static, flame-retardant, anti-block, antioxidant and other additive masterbatches.",
  },
  {
    question: "Can engineering plastics be compounded?",
    answer:
      "Yes. The machine is suitable for processing engineering plastics requiring excellent mixing and precise temperature control.",
  },
  {
    question: "What industries use Co-Rotating Twin Screw Extruders?",
    answer:
      "Automotive, packaging, electrical, cable, construction, consumer goods, medical, polymer compounding and recycling industries widely use these machines.",
  },
  {
    question: "What is the production capacity of a twin screw extruder?",
    answer:
      "Depending on the model, production capacity ranges from approximately 2 kg/hr to 1000 kg/hr.",
  },
  {
    question:
      "What is the price of a Co-Rotating Twin Screw Extruder in India?",
    answer:
      "The price depends on screw diameter, output capacity, automation level and application. Contact HPMC for a customized quotation.",
  },
  {
    question: "How do I choose the right twin screw extruder?",
    answer:
      "The right machine depends on your material, production capacity, filler loading, end product and automation requirements.",
  },
  {
    question: "What screw sizes are available?",
    answer:
      "HPMC offers multiple screw diameters suitable for laboratory, pilot and large-scale industrial production.",
  },
  {
    question: "Can this machine process biodegradable plastics?",
    answer:
      "Yes. Many biodegradable and bio-based polymers can be processed efficiently.",
  },
  {
    question: "Can glass fiber reinforced compounds be produced?",
    answer:
      "Yes. The extruder provides excellent glass fiber dispersion for reinforced engineering compounds.",
  },
  {
    question: "Can high filler compounds be manufactured?",
    answer:
      "Yes. The machine supports high filler loading while maintaining stable processing and excellent dispersion.",
  },
  {
    question: "How much electricity does a twin screw extruder consume?",
    answer:
      "Power consumption depends on machine size, motor rating, material type and production capacity.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Optimized screw design and efficient drive systems reduce power consumption while maximizing output.",
  },
  {
    question: "Does the machine provide uniform mixing?",
    answer:
      "Yes. The co-rotating screw configuration delivers superior distributive and dispersive mixing.",
  },
  {
    question: "What type of pelletizing system is available?",
    answer:
      "The machine supports strand pelletizing, water ring pelletizing, underwater pelletizing and die-face cutting.",
  },
  {
    question: "Is PLC automation available?",
    answer:
      "Yes. PLC with touchscreen HMI is available for easy monitoring and process control.",
  },
  {
    question: "Can recipes be saved in the control system?",
    answer:
      "Yes. Production recipes can be stored and recalled for consistent manufacturing.",
  },
  {
    question: "Does the machine include vacuum degassing?",
    answer:
      "Yes. Vacuum degassing removes moisture and volatile gases to improve product quality.",
  },
  {
    question: "Can liquid additives be injected?",
    answer:
      "Yes. Optional liquid injection systems can be integrated into the extrusion process.",
  },
  {
    question: "Can side feeders be installed?",
    answer:
      "Yes. Side feeders allow accurate feeding of fillers, fibers and additives.",
  },
  {
    question: "What type of heating system is used?",
    answer:
      "Efficient electric heating zones provide accurate temperature control for stable polymer processing.",
  },
  {
    question: "How many heating zones does the machine have?",
    answer:
      "The number of heating zones depends on the machine model and customer requirements.",
  },
  {
    question: "Is continuous production possible?",
    answer:
      "Yes. The machine is designed for continuous industrial production with consistent output quality.",
  },
  {
    question: "Can the machine operate 24 hours a day?",
    answer:
      "Yes. With proper maintenance, it is designed for reliable 24/7 production.",
  },
  {
    question: "How often does the machine require maintenance?",
    answer:
      "Routine preventive maintenance helps maximize performance and machine life.",
  },
  {
    question: "Is screw maintenance easy?",
    answer:
      "Yes. Modular screw elements can be replaced individually, reducing downtime.",
  },
  {
    question: "Can screw configurations be customized?",
    answer:
      "Yes. Screw elements can be configured according to specific materials and applications.",
  },
  {
    question: "What safety features are included?",
    answer:
      "Emergency stop systems, overload protection, temperature monitoring and operator safety features are provided.",
  },
  {
    question: "Can mineral-filled compounds be processed?",
    answer:
      "Yes. The machine processes calcium carbonate, talc, barium sulfate and similar fillers efficiently.",
  },
  {
    question: "Can flame-retardant compounds be produced?",
    answer:
      "Yes. The machine ensures excellent dispersion of flame-retardant additives.",
  },
  {
    question: "Can PVC compounds be manufactured?",
    answer:
      "Yes. The extruder is widely used for PVC cable compounds and specialty PVC formulations.",
  },
  {
    question: "Can laboratory trials be performed?",
    answer:
      "Yes. Smaller models are suitable for research, testing and product development.",
  },
  {
    question: "Does HPMC provide installation services?",
    answer:
      "Yes. HPMC provides installation, commissioning and machine setup support.",
  },
  {
    question: "Does HPMC provide operator training?",
    answer: "Yes. Complete operator training is provided during commissioning.",
  },
  {
    question: "Are spare parts available?",
    answer:
      "Yes. Genuine spare parts are readily available to minimize downtime.",
  },
  {
    question: "Does HPMC provide after-sales service?",
    answer:
      "Yes. HPMC offers technical support, maintenance services and spare parts assistance.",
  },
  {
    question: "Can the machine be customized?",
    answer:
      "Yes. Machine configuration can be customized according to production requirements.",
  },
  {
    question: "Does HPMC export twin screw extruders?",
    answer:
      "Yes. HPMC supplies extrusion machinery to domestic and international customers.",
  },
  {
    question: "How long does machine installation take?",
    answer:
      "Installation time depends on machine size and site readiness, but is typically completed within a few days.",
  },
  {
    question: "What makes HPMC Twin Screw Extruders different?",
    answer:
      "HPMC machines offer robust construction, efficient mixing, modular screw design, energy-efficient operation and reliable after-sales support.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Contact HPMC with your material type, production capacity and application to receive a customized quotation.",
  },
  {
    question: "Can I request a machine demonstration?",
    answer:
      "Yes. HPMC provides product demonstrations and technical consultations upon request.",
  },
  {
    question: "Which twin screw extruder is best for plastic compounding?",
    answer:
      "The ideal machine depends on your material, required output, filler percentage and production objectives. HPMC experts can recommend the most suitable model.",
  },
  {
    question: "Why choose HPMC for twin screw extrusion solutions?",
    answer:
      "HPMC combines decades of manufacturing experience, advanced engineering, reliable machinery, customized solutions and comprehensive after-sales support.",
  },
];

export default function CorotatingTwinScrewExtruder() {
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

  const [visibleFaqCount, setVisibleFaqCount] = useState(10);
  const displayedFaqs = faqData.slice(0, visibleFaqCount);
  const hasMoreFaqs = visibleFaqCount < faqData.length;
  const nextFaqCount = Math.min(10, faqData.length - visibleFaqCount);

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
        Co-Rotating Twin Screw Extruder for Compounding & Recycling | HPMC
      </title>

      <meta
        name="description"
        content="Co-rotating twin screw extruders designed for plastic compounding and recycling with high performance and consistency."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/co-rotating-twin-screw-extruder-for-compounding-&-recycling"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/heroSection/co-rotating-twin-screw-extruder.png')",
          }}
        />

        {/* OVERLAY */}
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
          <div className="max-w-[520px] pt-24 lg:pt-0">
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] leading-[1.05] font-bold text-[#0B1220]">
              Corotating Twin Screw Extruder
              <span className="text-[#65BC4F]">
                {" "}
                For Compounding & Recycling
              </span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Co-Rotating Twin Screw Extruders provide efficient
              compounding, masterbatch production, and polymer processing with
              excellent mixing, high filler loading, and reliable performance.
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
            Co-Rotating Twin Screw Extruder -
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
                  HPMC Co-Rotating Twin Screw Extruders provide efficient
                  compounding, masterbatch production, recycling, and polymer
                  processing with superior mixing and plasticization
                  performance.
                </p>

                <p className="mt-5 text-[var(--text-secondary)] leading-8">
                  Their modular design supports high filler loading, glass fiber
                  reinforcement, and versatile material processing across
                  various industrial applications.
                </p>

                {/* Application & Features Grid */}
                <div className="grid md:grid-cols-2 gap-5 mt-10">
                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Applications
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• Direct Compounding</li>
                      <li>• PVC Cable Grade Compounds</li>
                      <li>• Inline Compounding</li>
                      <li>• Film & Sheet Extrusion</li>
                      <li>• Compression Molding</li>
                      <li>• Injection Molding</li>
                      <li>• Recycling Applications</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Key Features
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• Excellent Homogeneity</li>
                      <li>• Superior Plasticization</li>
                      <li>• Filling Modification</li>
                      <li>• Recovery & Granulation</li>
                      <li>• Modular Screw Design</li>
                      <li>• Reliable Gearbox System</li>
                      <li>• Die Face Cutter & Sieve</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Benefits
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• High Production Efficiency</li>
                      <li>• Lower Power Consumption</li>
                      <li>• Up to 80% Talc Loading</li>
                      <li>• Up to 50% Glass Fiber</li>
                      <li>• Supports Multiple Feeders</li>
                      <li>• Smooth Material Feeding</li>
                      <li>• Versatile Material Processing</li>
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
                Corotating Twin Screw Extruder
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

          {hasMoreFaqs && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() =>
                  setVisibleFaqCount((currentCount) =>
                    Math.min(currentCount + 10, faqData.length),
                  )
                }
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
                  <ArrowRight size={20} />
                </span>

                <span className="text-left">
                  <span className="block text-sm font-bold sm:text-base">
                    View more FAQs
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
