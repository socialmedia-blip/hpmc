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
  "/products/co-rotating-twin-screw-extruder.png",
  "/products/co-rotating twing screw extruder/soft cable pvc/ELECTRICALPANEL-CO-ROTATING-TWIN-SCREW-EXTRUDER.jpg",
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
    question: "What is a Soft Cable Grade PVC Compounding Plant?",
    answer:
      "A Soft Cable Grade PVC Compounding Plant is a specialized extrusion system used to manufacture flexible PVC compounds for cable insulation, sheathing, and electrical wire applications with consistent quality and excellent mixing.",
  },
  {
    question: "What is Soft Cable Grade PVC Compound?",
    answer:
      "Soft Cable Grade PVC Compound is a flexible PVC formulation used for insulating and sheathing electrical wires, power cables, communication cables, and automotive cables.",
  },
  {
    question: "What is a PVC Compounding Plant used for?",
    answer:
      "A PVC Compounding Plant is used to mix PVC resin with plasticizers, stabilizers, fillers, pigments, and additives to produce high-quality PVC compounds for cable and industrial applications.",
  },
  {
    question: "How does a PVC Compounding Plant work?",
    answer:
      "The plant blends PVC resin with additives inside a co-rotating twin screw extruder, ensuring uniform mixing, plasticization, pelletizing, and consistent compound quality.",
  },
  {
    question: "What are the applications of Soft Cable Grade PVC Compound?",
    answer:
      "Soft Cable Grade PVC Compound is used for electrical wire insulation, cable sheathing, power cables, control cables, flexible cables, automotive wiring, and communication cables.",
  },
  {
    question: "What materials are used to manufacture PVC cable compounds?",
    answer:
      "PVC resin, plasticizers, stabilizers, calcium carbonate, lubricants, pigments, flame retardants, and specialty additives are commonly used in cable compound formulations.",
  },
  {
    question: "Why is a Twin Screw Extruder preferred for PVC compounding?",
    answer:
      "Twin Screw Extruders provide excellent mixing, efficient dispersion of additives, better temperature control, and consistent pellet quality for PVC cable compounds.",
  },
  {
    question: "Can this plant manufacture PVC insulation compounds?",
    answer:
      "Yes. It is specifically designed to produce high-quality PVC insulation compounds used in electrical and power cable manufacturing.",
  },
  {
    question: "Can this plant manufacture PVC sheathing compounds?",
    answer:
      "Yes. The machine produces PVC sheathing compounds with excellent flexibility, weather resistance, and mechanical strength.",
  },
  {
    question: "Can the machine produce flexible PVC compounds?",
    answer:
      "Yes. It is ideal for manufacturing flexible PVC compounds for cable insulation, wire coatings, and industrial applications.",
  },
  {
    question: "Can flame-retardant PVC compounds be manufactured?",
    answer:
      "Yes. The plant efficiently processes flame-retardant PVC formulations that meet the requirements of modern electrical cable manufacturers.",
  },
  {
    question: "What is the production capacity of the PVC Compounding Plant?",
    answer:
      "Depending on the selected model, production capacities range from approximately 2 kg/hr to 1000 kg/hr.",
  },
  {
    question: "Which industries use Soft Cable Grade PVC Compounds?",
    answer:
      "Electrical, power transmission, telecommunications, automotive, construction, industrial automation, and cable manufacturing industries widely use these compounds.",
  },
  {
    question: "Can recycled PVC be processed in this machine?",
    answer:
      "Yes. The machine can process recycled PVC materials along with virgin raw materials, depending on the formulation requirements.",
  },
  {
    question: "Can color PVC compounds be manufactured?",
    answer:
      "Yes. The plant provides excellent pigment dispersion, enabling the production of colored PVC compounds for various cable applications.",
  },
  {
    question: "Can custom PVC formulations be developed?",
    answer:
      "Yes. Different formulations can be produced by adjusting the combination of PVC resin, additives, stabilizers, fillers, and plasticizers.",
  },
  {
    question: "What are the benefits of Soft Cable Grade PVC Compounds?",
    answer:
      "They provide excellent flexibility, electrical insulation, flame resistance, abrasion resistance, weather durability, and long service life.",
  },
  {
    question: "What makes cable grade PVC different from regular PVC?",
    answer:
      "Cable grade PVC contains specialized additives that improve flexibility, insulation performance, flame resistance, and durability for electrical applications.",
  },
  {
    question: "Can the machine manufacture low-voltage cable compounds?",
    answer:
      "Yes. It is suitable for producing compounds used in low-voltage electrical cables and flexible wires.",
  },
  {
    question: "Can the machine produce automotive wire compounds?",
    answer:
      "Yes. It can manufacture flexible PVC compounds used in automotive wiring harnesses and electrical systems.",
  },
  {
    question: "Is the machine suitable for continuous production?",
    answer:
      "Yes. It is designed for continuous industrial operation with stable output and reliable performance.",
  },
  {
    question: "Does the machine provide uniform mixing?",
    answer:
      "Yes. The co-rotating twin screw design ensures homogeneous mixing of PVC resin, fillers, plasticizers, and additives.",
  },
  {
    question: "Can additive masterbatches be produced on this machine?",
    answer:
      "Yes. Besides PVC compounds, the plant can also manufacture additive masterbatches and specialty polymer compounds.",
  },
  {
    question: "Can filler-loaded PVC compounds be processed?",
    answer:
      "Yes. The machine efficiently processes calcium carbonate and other mineral-filled PVC formulations while maintaining excellent compound quality.",
  },
  {
    question: "Why choose HPMC Soft Cable Grade PVC Compounding Plants?",
    answer:
      "HPMC plants offer advanced twin screw technology, superior mixing performance, consistent compound quality, energy-efficient operation, and reliable after-sales support for cable compound manufacturers.",
  },
  {
    question:
      "What is the price of a Soft Cable Grade PVC Compounding Plant in India?",
    answer:
      "The price depends on production capacity, automation level, screw size, and customization requirements. Contact HPMC for a customized quotation.",
  },
  {
    question: "How do I choose the right PVC Compounding Plant?",
    answer:
      "The ideal machine depends on your production capacity, cable compound formulation, output requirements, automation preferences, and future expansion plans.",
  },
  {
    question: "Which machine is best for PVC cable compound manufacturing?",
    answer:
      "A Co-Rotating Twin Screw PVC Compounding Plant is considered one of the best solutions for manufacturing high-quality PVC cable compounds due to its excellent mixing and processing capabilities.",
  },
  {
    question: "Can the PVC Compounding Plant be customized?",
    answer:
      "Yes. HPMC offers customized machine configurations, screw designs, feeding systems, pelletizing options, and automation based on customer requirements.",
  },
  {
    question: "What screw sizes are available?",
    answer:
      "Multiple screw diameters are available to meet laboratory, pilot-scale, and high-volume industrial production requirements.",
  },
  {
    question: "How much electricity does a PVC Compounding Plant consume?",
    answer:
      "Power consumption depends on the machine model, motor size, production capacity, and PVC formulation being processed.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry and efficient drive systems reduce power consumption while maximizing production efficiency.",
  },
  {
    question: "What output capacity can I expect?",
    answer:
      "Depending on the selected model, production capacities range from approximately 2 kg/hr to 1000 kg/hr.",
  },
  {
    question: "Can the machine operate 24 hours a day?",
    answer:
      "Yes. It is designed for continuous industrial production with stable performance and minimum downtime.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with an HMI touchscreen is available for easy operation, monitoring, and production control.",
  },
  {
    question: "Can production recipes be stored?",
    answer:
      "Yes. The control system allows operators to save and recall processing recipes for consistent production quality.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide precise temperature control for stable PVC processing.",
  },
  {
    question: "Can liquid plasticizers be added during processing?",
    answer:
      "Yes. Liquid feeding systems can be integrated for plasticizers and other liquid additives.",
  },
  {
    question: "Can side feeders be installed?",
    answer:
      "Yes. Side feeders can be provided for fillers, pigments, flame retardants, and specialty additives.",
  },
  {
    question: "Which pelletizing systems are supported?",
    answer:
      "The machine supports strand pelletizing, die-face pelletizing, water-ring pelletizing, and other pelletizing systems based on customer requirements.",
  },
  {
    question: "Is vacuum degassing available?",
    answer:
      "Yes. Optional vacuum degassing systems help remove moisture and volatile gases for improved compound quality.",
  },
  {
    question: "How easy is screw maintenance?",
    answer:
      "The modular screw design allows quick replacement of individual screw elements, reducing maintenance time and cost.",
  },
  {
    question: "How often should the machine be serviced?",
    answer:
      "Routine preventive maintenance based on operating hours helps ensure reliable operation and long machine life.",
  },
  {
    question: "Does HPMC provide installation services?",
    answer:
      "Yes. HPMC provides installation, commissioning, startup assistance, and production trials.",
  },
  {
    question: "Is operator training included?",
    answer:
      "Yes. Comprehensive operator training is provided during installation to ensure efficient and safe machine operation.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. HPMC supplies genuine spare parts to ensure reliable machine performance and minimize downtime.",
  },
  {
    question: "Does HPMC provide after-sales support?",
    answer:
      "Yes. HPMC offers technical support, maintenance assistance, spare parts, troubleshooting, and process optimization services.",
  },
  {
    question: "Can I request a machine demonstration?",
    answer:
      "Yes. Product demonstrations and technical consultations can be arranged based on customer requirements.",
  },
  {
    question: "Can production trials be conducted before purchase?",
    answer:
      "Yes. Trial production can be performed using customer formulations to verify machine performance and compound quality.",
  },
  {
    question: "How can I request a quotation for a PVC Compounding Plant?",
    answer:
      "Simply contact HPMC with your production capacity, compound formulation, and application details to receive a customized quotation.",
  },
  {
    question:
      "Can the PVC Compounding Plant manufacture RoHS-compliant PVC compounds?",
    answer:
      "Yes. The plant can process RoHS-compliant PVC formulations when approved raw materials and additives are used.",
  },
  {
    question: "Can the machine produce low-smoke PVC cable compounds?",
    answer:
      "Yes. It is suitable for manufacturing low-smoke PVC compounds used in electrical and communication cable applications.",
  },
  {
    question: "Can heat-resistant PVC compounds be manufactured?",
    answer:
      "Yes. The plant can process heat-resistant PVC formulations for high-performance cable insulation and sheathing.",
  },
  {
    question: "Can UV-resistant PVC compounds be produced?",
    answer:
      "Yes. UV stabilizers can be incorporated into the formulation to manufacture weather-resistant PVC cable compounds.",
  },
  {
    question: "Can the machine process flexible and semi-rigid PVC compounds?",
    answer:
      "Yes. It can manufacture both flexible and semi-rigid PVC compounds by adjusting the formulation and processing parameters.",
  },
  {
    question: "Can customized cable compound formulations be developed?",
    answer:
      "Yes. HPMC machines support customized formulations based on electrical, thermal, mechanical, and environmental performance requirements.",
  },
  {
    question:
      "What makes Twin Screw technology suitable for PVC cable compounds?",
    answer:
      "Twin Screw technology provides uniform dispersion of plasticizers, stabilizers, fillers, pigments, and additives, resulting in consistent compound quality.",
  },
  {
    question: "Does the plant improve cable compound quality?",
    answer:
      "Yes. The machine produces homogeneous PVC compounds with excellent flexibility, insulation performance, and mechanical strength.",
  },
  {
    question: "Can this machine reduce production costs?",
    answer:
      "Yes. Higher productivity, efficient material utilization, lower energy consumption, and reduced wastage help decrease manufacturing costs.",
  },
  {
    question: "Can different cable grades be produced on one machine?",
    answer:
      "Yes. Different cable grades can be manufactured by changing formulations and processing parameters without major machine modifications.",
  },
  {
    question: "Can PVC compounds for automotive cables be manufactured?",
    answer:
      "Yes. The machine is suitable for producing PVC compounds used in automotive wiring and cable harness applications.",
  },
  {
    question: "Can the machine process communication cable compounds?",
    answer:
      "Yes. It is widely used for manufacturing PVC compounds used in communication, telecom, and data cables.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Installation time depends on the plant size and site readiness, but most systems are commissioned within a few days.",
  },
  {
    question: "What is the expected lifespan of a PVC Compounding Plant?",
    answer:
      "With proper maintenance and genuine spare parts, HPMC PVC Compounding Plants provide reliable operation for many years.",
  },
  {
    question: "Can the machine be upgraded in the future?",
    answer:
      "Yes. Automation systems, feeding equipment, pelletizing systems, and screw configurations can be upgraded as production requirements grow.",
  },
  {
    question: "Does HPMC manufacture PVC Compounding Plants in India?",
    answer:
      "Yes. HPMC designs and manufactures PVC Compounding Plants in India using advanced engineering and precision manufacturing techniques.",
  },
  {
    question: "Does HPMC export PVC Compounding Plants worldwide?",
    answer:
      "Yes. HPMC supplies PVC Compounding Plants to customers across domestic and international markets with complete technical support.",
  },
  {
    question: "Can the machine be integrated into an existing production line?",
    answer:
      "Yes. The plant can be integrated with existing material handling, pelletizing, cooling, and packaging systems.",
  },
  {
    question: "Can online technical support be provided?",
    answer:
      "Yes. HPMC offers remote technical support, troubleshooting, and process optimization assistance.",
  },
  {
    question: "Does HPMC provide formulation guidance?",
    answer:
      "Yes. Technical experts can assist customers with PVC compound formulations and process optimization.",
  },
  {
    question: "How quickly are spare parts delivered?",
    answer:
      "Standard spare parts are generally available for quick dispatch to minimize production downtime.",
  },
  {
    question: "Can I visit the HPMC manufacturing facility?",
    answer:
      "Yes. Customers can schedule a factory visit to inspect machine manufacturing, quality processes, and discuss project requirements.",
  },
  {
    question: "Can production trials be conducted using my raw materials?",
    answer:
      "Yes. HPMC can conduct trial runs using customer-supplied formulations to verify machine performance before purchase.",
  },
  {
    question:
      "Why should I choose HPMC over other PVC Compounding Plant manufacturers?",
    answer:
      "HPMC combines advanced Twin Screw technology, robust machine construction, customized engineering solutions, reliable after-sales service, and decades of experience in plastic processing machinery.",
  },
  {
    question: "Why choose HPMC Soft Cable Grade PVC Compounding Plants?",
    answer:
      "HPMC delivers complete PVC compounding solutions with superior mixing performance, consistent compound quality, energy-efficient operation, customized machine configurations, reliable technical support, and long-term manufacturing reliability.",
  },
];

export default function SoftCableGradePVC() {
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
      <title>Soft Cable Grade PVC Compounding Plant | HPMC</title>

      <meta
        name="description"
        content="Soft cable grade PVC compounding plants engineered for consistent quality, precision mixing, and efficient production."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/soft-cable-grade-pvc-compounding-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/herosection/co-rotating-twin-screw-extruder.png')",
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
              Soft cable grade
              <span className="text-[#65BC4F]"> PVC Compounding Plant</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Single Screw Plants for Soft Garden Pipes are designed for
              efficient processing of PVC and polymer compounds. Equipped with
              advanced extrusion technology, they deliver excellent
              plasticization, uniform material mixing, and reliable production
              for soft pipe manufacturing applications.
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
              Soft cable grade PVC Compounding Plant
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
              <p className="mt-8 text-[var(--text-secondary)] leading-8">
                HPMC Single Screw Plants for Soft Garden Pipes are engineered
                for efficient processing of PVC compounds and polymer materials.
                Designed with advanced extrusion technology, the system ensures
                uniform material flow, excellent plasticization, and reliable
                production performance.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Suitable for soft garden pipe manufacturing, masterbatch
                production, recycling applications, and polymer compounding, the
                plant delivers consistent output while maintaining high product
                quality and operational efficiency.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Soft Garden Pipe Production",
                  "Excellent Plasticization",
                  "Uniform Material Mixing",
                  "Masterbatch Compatible",
                  "Recycling Applications",
                  "Reliable Performance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-[var(--text-primary)] font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    PVC
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Material Processing
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    High
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Output Efficiency
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    Multi
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Application Support
                  </p>
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

      <section className="py-16 bg-[var(--background)]">
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
                poster="/videos/capture.png"
                className="w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/videos/softcable.mp4" type="video/mp4" />
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
                Soft Cable Grade PVC Compounding Plant
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
