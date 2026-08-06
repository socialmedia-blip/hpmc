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

const galleryImages = ["/products/wpc/sspfpc.png"];

const faqData = [
  {
    question: "What is a Single Screw Plant for PVC Compounding?",
    answer:
      "A Single Screw Plant for PVC Compounding is an advanced extrusion system designed to manufacture rigid and soft PVC compounds with excellent plasticization, uniform mixing, and consistent pellet quality for industrial applications.",
  },
  {
    question: "How does a Single Screw PVC Compounding Plant work?",
    answer:
      "The machine melts, plasticizes, and mixes PVC resin with fillers, stabilizers, lubricants, pigments, and additives before producing high-quality PVC compounds for downstream manufacturing.",
  },
  {
    question:
      "Which materials can be processed using a Single Screw PVC Compounding Plant?",
    answer:
      "The machine processes rigid PVC, soft PVC, PVC compounds with calcium carbonate, stabilizers, plasticizers, lubricants, pigments, and customized PVC formulations.",
  },
  {
    question:
      "Which products can be manufactured using this PVC Compounding Plant?",
    answer:
      "The plant manufactures PVC compounds for pipes, profiles, cable insulation, moulding applications, construction products, industrial components, and consumer goods.",
  },
  {
    question: "What is PVC compounding?",
    answer:
      "PVC compounding is the process of blending PVC resin with additives, fillers, stabilizers, lubricants, and pigments to produce customized PVC compounds with specific physical and mechanical properties.",
  },
  {
    question:
      "Which is the best Single Screw PVC Compounding Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Single Screw PVC Compounding Plants with precision engineering, energy-efficient operation, and reliable long-term industrial performance.",
  },
  {
    question: "Who is the best PVC Compounding Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of PVC Compounding Machines, offering customized solutions, modern extrusion technology, and dependable after-sales support.",
  },
  {
    question:
      "What are the advantages of a Single Screw PVC Compounding Plant?",
    answer:
      "The machine offers excellent plasticization, stable processing, consistent output, low maintenance, energy-efficient operation, and reliable PVC compound quality.",
  },
  {
    question: "Why choose a Single Screw Plant for PVC compounding?",
    answer:
      "Single Screw PVC Compounding Plants provide reliable processing, simple operation, lower maintenance costs, and excellent production efficiency for a wide range of PVC formulations.",
  },
  {
    question: "Can the machine process high-filler PVC compounds?",
    answer:
      "Yes. The machine efficiently processes PVC compounds containing up to 100 PHR calcium carbonate while maintaining stable extrusion and consistent quality.",
  },
  {
    question: "Can soft PVC compounds be manufactured on this machine?",
    answer:
      "Yes. The machine is suitable for producing soft PVC compounds used in cable insulation, moulding applications, and flexible PVC products.",
  },
  {
    question: "Can rigid PVC compounds be manufactured?",
    answer:
      "Yes. The machine produces high-quality rigid PVC compounds used in pipe manufacturing, profiles, fittings, and construction products.",
  },
  {
    question: "Which industries use Single Screw PVC Compounding Plants?",
    answer:
      "Pipe manufacturers, cable producers, profile manufacturers, construction companies, packaging industries, consumer goods manufacturers, and plastic processors widely use these machines.",
  },
  {
    question: "What is the maximum production capacity of the machine?",
    answer:
      "Depending on the selected model, the machine offers production capacities up to approximately 225 kg/hr while maintaining excellent compound quality.",
  },
  {
    question: "How does the machine improve PVC compound quality?",
    answer:
      "Efficient plasticization, accurate temperature control, stable screw design, and uniform mixing help produce PVC compounds with consistent quality and excellent processing characteristics.",
  },
  {
    question:
      "Is the Single Screw PVC Compounding Plant suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with reliable performance, stable output, and minimal downtime.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient heating systems, and reliable drive technology help reduce power consumption while maintaining high production efficiency.",
  },
  {
    question: "Can the PVC Compounding Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized machine configurations, automation systems, feeding units, and downstream equipment based on production requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC compound manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a PVC compound manufacturing business.",
  },
  {
    question:
      "Can the machine manufacture PVC compounds for cable applications?",
    answer:
      "Yes. The machine produces PVC cable compounds with excellent dispersion, flexibility, and electrical insulation properties.",
  },
  {
    question: "Can the machine manufacture PVC profile compounds?",
    answer:
      "Yes. The plant is widely used for manufacturing PVC profile compounds with high filler loading and consistent processing performance.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for Single Screw PVC Compounding Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered PVC Compounding Plants with advanced technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top PVC Compounding Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, robust manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question: "Can this machine manufacture export-quality PVC compounds?",
    answer:
      "Yes. The machine is designed to produce consistent, high-quality PVC compounds suitable for manufacturers serving both domestic and international markets.",
  },
  {
    question:
      "How can I get the best price for a Single Screw PVC Compounding Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your production capacity, PVC formulation, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "What is the price of a Single Screw PVC Compounding Plant in India?",
    answer:
      "The price of a Single Screw PVC Compounding Plant depends on the machine model, production capacity, automation level, and optional equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PVC Compounding Plant?",
    answer:
      "The right machine depends on your required production capacity, PVC formulation, filler percentage, automation requirements, and future production expansion.",
  },
  {
    question:
      "Which is the best Single Screw PVC Compounding Machine in India?",
    answer:
      "Single Screw PVC Compounding Plants from Hindustan Plastics and Machine Corporation are engineered for stable production, energy efficiency, reliable performance, and consistent compound quality.",
  },
  {
    question: "Can the Single Screw PVC Compounding Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized machine configurations, feeding systems, automation options, pelletizing solutions, and complete production lines.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Different machine models are available for small, medium, and high-capacity PVC compound production depending on customer requirements.",
  },
  {
    question:
      "How much electricity does a Single Screw PVC Compounding Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, formulation, and operating conditions. The machine is designed for energy-efficient operation.",
  },
  {
    question: "Is the Single Screw PVC Compounding Plant energy efficient?",
    answer:
      "Yes. Optimized screw design, efficient heating systems, and reliable drive technology help reduce power consumption while maintaining high productivity.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The Single Screw PVC Compounding Plant is designed for continuous industrial production with stable operation and consistent compound quality.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen can be provided for easy machine operation, production monitoring, and process control.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Automated control systems allow operators to save and recall processing parameters for different PVC formulations.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for uniform plasticization and consistent PVC compound quality.",
  },
  {
    question: "Can different PVC formulations be processed using one machine?",
    answer:
      "Yes. The machine can process various rigid and soft PVC formulations by adjusting processing parameters according to production requirements.",
  },
  {
    question: "How often does the PVC Compounding Plant require maintenance?",
    answer:
      "Routine maintenance includes lubrication, inspection of screw and barrel, heaters, gearbox, cooling systems, and electrical components to ensure reliable operation.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient inspection and replacement of wear components, helping minimize maintenance downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, startup assistance, and machine testing are provided by experienced technical engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Professional operator training is provided to ensure safe operation, efficient production, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and reduced production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical assistance, troubleshooting, preventive maintenance, spare parts support, and process optimization services.",
  },
  {
    question: "Can I request a live machine demonstration?",
    answer:
      "Yes. Live demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance and finished compound quality.",
  },
  {
    question:
      "Can the Single Screw PVC Compounding Plant be integrated into an existing production line?",
    answer:
      "Yes. The machine can be integrated with existing mixers, feeders, pelletizers, cooling systems, storage units, and downstream processing equipment.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC compound manufacturing business?",
    answer:
      "Yes. It is an ideal investment for entrepreneurs and manufacturers planning to establish or expand a PVC compound manufacturing business.",
  },
  {
    question:
      "Can the machine manufacture PVC compounds for multiple industries?",
    answer:
      "Yes. The machine produces PVC compounds used in pipes, cable insulation, profiles, moulding products, construction materials, consumer goods, and industrial applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Compounding Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC compounding systems.",
  },
  {
    question:
      "How can I get the best quotation for a Single Screw PVC Compounding Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your production capacity, formulation details, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Single Screw PVC Compounding Plant process recycled PVC materials?",
    answer:
      "Yes. The machine can process compatible recycled PVC materials along with virgin PVC resin, depending on the required formulation and end-use application.",
  },
  {
    question:
      "Can different PVC formulations be processed on the same machine?",
    answer:
      "Yes. The machine can process rigid PVC, soft PVC, cable compounds, profile compounds, and customized PVC formulations by adjusting processing parameters.",
  },
  {
    question: "Can the machine manufacture PVC cable compounds?",
    answer:
      "Yes. The Single Screw PVC Compounding Plant is widely used for producing PVC cable compounds with excellent flexibility, dispersion, and electrical insulation properties.",
  },
  {
    question: "Can the machine produce PVC profile compounds?",
    answer:
      "Yes. The machine manufactures PVC profile compounds with high filler loading, making them suitable for window profiles, doors, panels, and construction applications.",
  },
  {
    question: "Can the machine manufacture medical-grade PVC compounds?",
    answer:
      "Yes. With suitable formulations and controlled processing conditions, the machine can produce PVC compounds for medical and healthcare applications where applicable standards are met.",
  },
  {
    question:
      "How does the Single Screw PVC Compounding Plant improve compound quality?",
    answer:
      "Efficient plasticization, stable extrusion, accurate temperature control, and uniform mixing help produce consistent PVC compounds with excellent processing characteristics.",
  },
  {
    question:
      "Can PVC compounds produced on this machine be used in different industries?",
    answer:
      "Yes. The compounds are widely used in pipe manufacturing, cable insulation, PVC profiles, moulded products, construction materials, packaging, consumer goods, and industrial applications.",
  },
  {
    question: "Can this machine reduce PVC compound manufacturing costs?",
    answer:
      "Yes. Energy-efficient operation, reduced material wastage, reliable production, and stable processing help lower the overall manufacturing cost of PVC compounds.",
  },
  {
    question:
      "What is the expected lifespan of a Single Screw PVC Compounding Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question:
      "Can the Single Screw PVC Compounding Plant be upgraded in the future?",
    answer:
      "Yes. Feeding systems, automation controls, pelletizing equipment, and downstream processing units can be upgraded as production requirements increase.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture Single Screw PVC Compounding Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Single Screw PVC Compounding Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PVC Compounding Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports Single Screw PVC Compounding Plants and plastic processing machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PVC Compounding Plant can be integrated into existing production facilities with customized layouts and compatible upstream and downstream equipment.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, production guidance, and machine optimization support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide process optimization support?",
    answer:
      "Yes. Our technical experts help optimize machine settings, PVC formulations, additive ratios, production efficiency, and overall compounding performance.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required spare parts are readily available for quick dispatch, helping minimize downtime and maintain uninterrupted production.",
  },
  {
    question:
      "Can I visit the Hindustan Plastics and Machine Corporation manufacturing facility?",
    answer:
      "Yes. Customers are welcome to visit our manufacturing facility to inspect machine manufacturing, quality testing, and discuss project requirements with our engineering team.",
  },
  {
    question: "Can machine trials be conducted before purchase?",
    answer:
      "Yes. Trial production can be arranged using customer-supplied PVC formulations to evaluate machine performance, compound quality, and production output.",
  },
  {
    question:
      "Is the Single Screw PVC Compounding Plant environmentally friendly?",
    answer:
      "Yes. The machine is designed with energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question:
      "Which industries benefit from Single Screw PVC Compounding Plants?",
    answer:
      "PVC pipe manufacturers, cable manufacturers, profile producers, construction companies, packaging industries, consumer goods manufacturers, and plastic processors benefit from this compounding system.",
  },
  {
    question:
      "Can this machine manufacture PVC compounds for export-quality products?",
    answer:
      "Yes. The machine is designed to produce consistent, high-quality PVC compounds suitable for manufacturers serving domestic as well as international markets.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best Single Screw PVC Compounding Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable PVC compounding systems.",
  },
  {
    question:
      "Who is the top Single Screw PVC Compounding Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance Single Screw PVC Compounding Plants with excellent productivity, energy efficiency, and consistent compound quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your Single Screw PVC Compounding Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Single Screw PVC Compounding Plant one of the best solutions for PVC compound manufacturing?",
    answer:
      "Its reliable plasticization, stable processing, energy-efficient operation, consistent compound quality, low maintenance requirements, and dependable industrial performance make it an excellent solution for manufacturing premium-quality PVC compounds.",
  },
];

const specifications = [
  {
    parameter: "Max. Plasticizing Capacity (kg/hr)",
    values: ["120", "150", "225"],
  },
  {
    parameter: "Max. Output (kg/hr)",
    values: ["100", "140", "225"],
  },
  {
    parameter: "Main Drive (kW)",
    values: ["22.5", "30", "45"],
  },
  {
    parameter: "Barrel (kW)",
    values: ["12", "15", "20"],
  },
  {
    parameter: "Die (kW)",
    values: ["3", "3", "3"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["20-50", "20-50", "20-40"],
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
      <title>Single Screw Plant for PVC Compounding | HPMC</title>

      <meta
        name="description"
        content="Efficient single screw PVC compounding plants designed for reliable performance and superior compound quality."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/single-screw-plant-for-pvc-compounding"
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
              Single Screw Plant For
              <span className="block text-[#65BC4F]">PVC Compounding</span>
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
            PVC Compounding Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              Single Screw Plant For PVC Compounding
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
              <p className="mt-6 text-[var(--text-secondary)] leading-8">
                HPMC PVC Compounding Plants are engineered for efficient
                production of rigid and soft PVC compounds with excellent
                mixing, uniform dispersion, and consistent output. The system
                ensures high productivity while maintaining superior compound
                quality for various industrial applications.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Suitable for PVC profiles, cable compounds, moulding compounds,
                and high-filler formulations up to 100 PHR CaCO₃, the plant
                delivers reliable performance with energy-efficient operation
                and low maintenance requirements.
              </p>

              {/* Applications */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                  Applications
                </h4>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    "Medical Products",
                    "Food Packaging",
                    "Industrial Components",
                    "Building & Construction",
                    "Consumer Goods",
                    "Institutional Products",
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
                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    225
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Max Output (kg/hr)
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    100
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    PHR CaCO₃ Support
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    3
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

                  {["HPMC 90", "HPMC 100", "HPMC 120"].map((model) => (
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
