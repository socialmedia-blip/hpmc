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
  "/products/wpc/wpc.png",
  "/products/wpc/wpc1.png",
  "/products/wpc/wpc2.png",
  "/products/wpc/wpc3.png",
];

const specifications = [
  {
    parameter: "Main Motor Power (kW)",
    values: ["37", "55", "110"],
  },
  {
    parameter: "Production Capacity (kg/hr)",
    values: ["100", "150", "200"],
  },
];

const faqData = [
  {
    question: "What is a WPC Board Plant?",
    answer:
      "A WPC Board Plant is an advanced extrusion system designed to manufacture Wood Plastic Composite (WPC) boards by combining wood flour with thermoplastic materials. It produces durable, eco-friendly, moisture-resistant, and weather-resistant boards for construction and furniture applications.",
  },
  {
    question: "How does a WPC Board Extrusion Line work?",
    answer:
      "The extrusion line mixes wood flour, plastic resin, and additives, melts the material through the extruder, and forms it into WPC boards using a precision die. The boards are then calibrated, cooled, hauled off, and cut into finished products.",
  },
  {
    question: "Which materials can be processed using a WPC Board Plant?",
    answer:
      "The machine can process PVC, PE, PP, wood flour, wood fiber, calcium carbonate, stabilizers, lubricants, pigments, and other additives used in Wood Plastic Composite board manufacturing.",
  },
  {
    question:
      "Which products can be manufactured using a WPC Board Extrusion Machine?",
    answer:
      "The machine manufactures WPC boards, furniture boards, wall cladding panels, partition boards, ceiling boards, decorative boards, modular furniture panels, and customized Wood Plastic Composite sheets.",
  },
  {
    question: "What are WPC boards used for?",
    answer:
      "WPC boards are widely used for modular furniture, kitchen cabinets, wardrobes, wall cladding, ceilings, partitions, office interiors, commercial buildings, hotels, hospitals, and residential construction.",
  },
  {
    question: "Which is the best WPC Board Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best WPC Board Machine manufacturers in India, offering advanced extrusion technology, high productivity, and reliable long-term performance.",
  },
  {
    question: "Who is the top WPC Board Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance WPC Board Plants trusted by manufacturers across India and international markets.",
  },
  {
    question: "What are the advantages of a WPC Board Plant?",
    answer:
      "The machine offers high production efficiency, excellent board quality, smooth surface finish, dimensional stability, energy-efficient operation, and low maintenance.",
  },
  {
    question: "Why should manufacturers invest in a WPC Board Plant?",
    answer:
      "A WPC Board Plant enables manufacturers to produce eco-friendly, high-demand boards that offer excellent durability, low maintenance, and strong market demand in the construction and furniture industries.",
  },
  {
    question: "What production capacity does the WPC Board Plant offer?",
    answer:
      "Depending on the selected machine model, the production capacity ranges from approximately 100 kg/hr to 200 kg/hr while maintaining excellent board quality.",
  },
  {
    question: "What machine models are available for the WPC Board Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers HPMC 65/132, HPMC 80/156, and HPMC 80/56 models to meet different production requirements.",
  },
  {
    question:
      "Can the WPC Board Machine manufacture different board thicknesses?",
    answer:
      "Yes. By changing the extrusion die and calibration system, the machine can manufacture WPC boards in various thicknesses, widths, and specifications.",
  },
  {
    question: "Can customized WPC boards be manufactured?",
    answer:
      "Yes. Customized dies can be developed to manufacture WPC boards according to customer drawings and application requirements.",
  },
  {
    question: "Which industries use WPC Board Extrusion Lines?",
    answer:
      "Furniture manufacturers, construction companies, interior designers, modular kitchen manufacturers, architects, infrastructure developers, and building material manufacturers widely use WPC Board Plants.",
  },
  {
    question: "Can the machine manufacture WPC furniture boards?",
    answer:
      "Yes. The machine is specially designed for manufacturing WPC furniture boards used for wardrobes, modular kitchens, office furniture, cabinets, and interior applications.",
  },
  {
    question: "Can the machine manufacture WPC wall cladding panels?",
    answer:
      "Yes. The extrusion line produces decorative WPC wall cladding panels for residential, commercial, and hospitality projects.",
  },
  {
    question: "Can the machine manufacture WPC partition boards?",
    answer:
      "Yes. The machine manufactures WPC partition boards used in offices, commercial buildings, schools, hospitals, and modular construction.",
  },
  {
    question: "Why are WPC boards better than plywood and MDF?",
    answer:
      "WPC boards are moisture-resistant, termite-proof, weather-resistant, dimensionally stable, eco-friendly, and require significantly less maintenance than plywood or MDF.",
  },
  {
    question: "Is the WPC Board Extrusion Machine energy efficient?",
    answer:
      "Yes. Optimized heating systems, energy-efficient drives, and advanced extrusion technology help reduce electricity consumption while maintaining high productivity.",
  },
  {
    question: "Can the WPC Board Plant operate continuously?",
    answer:
      "Yes. The machine is engineered for continuous industrial production with stable output, reliable performance, and minimal downtime.",
  },
  {
    question: "Can the WPC Board Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, board dies, calibration systems, downstream equipment, automation, and turnkey production solutions.",
  },
  {
    question:
      "Is this machine suitable for starting a WPC board manufacturing business?",
    answer:
      "Yes. The WPC Board Plant is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a WPC board manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for a WPC Board Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered WPC Board Plants with advanced extrusion technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best WPC Board Machine manufacturers in India?",
    answer:
      "With decades of experience in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and reliable after-sales support, Hindustan Plastics and Machine Corporation is trusted by customers worldwide.",
  },
  {
    question: "How can I get the best price for a WPC Board Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your board dimensions, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a WPC Board Plant in India?",
    answer:
      "The price of a WPC Board Plant depends on the machine model, board dimensions, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best WPC Board Extrusion Machine?",
    answer:
      "The ideal WPC Board Extrusion Machine depends on your board size, thickness, production capacity, raw material formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best WPC Board Making Machine in India?",
    answer:
      "WPC Board Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, excellent board quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the WPC Board Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized board dies, calibration systems, cooling tables, haul-off units, cutting systems, stacking systems, and PLC automation according to customer requirements.",
  },
  {
    question: "Can one machine manufacture different WPC board sizes?",
    answer:
      "Yes. By changing the extrusion die and calibration system, the same machine can manufacture WPC boards in different widths, thicknesses, and customized dimensions.",
  },
  {
    question: "How much electricity does a WPC Board Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, board dimensions, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the WPC Board Plant support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen allows operators to monitor production, control machine parameters, manage alarms, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different WPC board specifications, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating and cooling zones provide accurate temperature control for stable WPC processing and premium-quality board production.",
  },
  {
    question:
      "Can recycled plastic materials be used for WPC board manufacturing?",
    answer:
      "Yes. Depending on the product requirements, the machine can process recycled plastics along with wood flour and additives to manufacture high-quality WPC boards.",
  },
  {
    question: "How often does the WPC Board Plant require maintenance?",
    answer:
      "Routine preventive maintenance includes inspecting the gearbox, screw and barrel, heaters, cooling system, lubrication points, and electrical components to ensure reliable long-term operation.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection and maintenance, helping reduce downtime and improve operational efficiency.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, production trials, and startup assistance are provided by experienced technical engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe operation, maximum productivity, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available for the WPC Board Plant?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimum production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical support, troubleshooting assistance, preventive maintenance services, spare parts, and production optimization support.",
  },
  {
    question: "Can I request a live demonstration of the WPC Board Plant?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance, production capacity, and finished WPC board quality.",
  },
  {
    question:
      "Can the WPC Board Plant be integrated into an existing manufacturing facility?",
    answer:
      "Yes. The extrusion line can be integrated with existing material handling systems, embossing units, sanding machines, cutting equipment, and downstream automation.",
  },
  {
    question: "Can the machine manufacture embossed WPC boards?",
    answer:
      "Yes. The WPC Board Plant can be integrated with embossing systems to manufacture textured and wood-grain finish WPC boards for premium applications.",
  },
  {
    question: "Can the machine manufacture high-density WPC boards?",
    answer:
      "Yes. The extrusion line can manufacture both standard-density and high-density WPC boards depending on the raw material formulation and production requirements.",
  },
  {
    question: "Can the machine manufacture waterproof WPC boards?",
    answer:
      "Yes. WPC boards produced on this machine offer excellent moisture resistance, making them suitable for waterproof furniture and interior applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best WPC Board Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable WPC board production systems.",
  },
  {
    question: "Can the WPC Board Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, automation systems, embossing units, additional downstream equipment, and customized tooling as production requirements grow.",
  },
  {
    question: "How can I get the best quotation for a WPC Board Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required board dimensions, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a WPC Board Plant in India?",
    answer:
      "The price of a WPC Board Plant depends on the machine model, board dimensions, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best WPC Board Extrusion Machine?",
    answer:
      "The ideal WPC Board Extrusion Machine depends on your board size, thickness, production capacity, raw material formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best WPC Board Making Machine in India?",
    answer:
      "WPC Board Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, excellent board quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the WPC Board Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized board dies, calibration systems, cooling tables, haul-off units, cutting systems, stacking systems, and PLC automation according to customer requirements.",
  },
  {
    question: "Can one machine manufacture different WPC board sizes?",
    answer:
      "Yes. By changing the extrusion die and calibration system, the same machine can manufacture WPC boards in different widths, thicknesses, and customized dimensions.",
  },
  {
    question: "How much electricity does a WPC Board Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, board dimensions, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the WPC Board Plant support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen allows operators to monitor production, control machine parameters, manage alarms, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different WPC board specifications, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating and cooling zones provide accurate temperature control for stable WPC processing and premium-quality board production.",
  },
  {
    question:
      "Can recycled plastic materials be used for WPC board manufacturing?",
    answer:
      "Yes. Depending on the product requirements, the machine can process recycled plastics along with wood flour and additives to manufacture high-quality WPC boards.",
  },
  {
    question: "How often does the WPC Board Plant require maintenance?",
    answer:
      "Routine preventive maintenance includes inspecting the gearbox, screw and barrel, heaters, cooling system, lubrication points, and electrical components to ensure reliable long-term operation.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection and maintenance, helping reduce downtime and improve operational efficiency.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, production trials, and startup assistance are provided by experienced technical engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe operation, maximum productivity, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available for the WPC Board Plant?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimum production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical support, troubleshooting assistance, preventive maintenance services, spare parts, and production optimization support.",
  },
  {
    question: "Can I request a live demonstration of the WPC Board Plant?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance, production capacity, and finished WPC board quality.",
  },
  {
    question:
      "Can the WPC Board Plant be integrated into an existing manufacturing facility?",
    answer:
      "Yes. The extrusion line can be integrated with existing material handling systems, embossing units, sanding machines, cutting equipment, and downstream automation.",
  },
  {
    question: "Can the machine manufacture embossed WPC boards?",
    answer:
      "Yes. The WPC Board Plant can be integrated with embossing systems to manufacture textured and wood-grain finish WPC boards for premium applications.",
  },
  {
    question: "Can the machine manufacture high-density WPC boards?",
    answer:
      "Yes. The extrusion line can manufacture both standard-density and high-density WPC boards depending on the raw material formulation and production requirements.",
  },
  {
    question: "Can the machine manufacture waterproof WPC boards?",
    answer:
      "Yes. WPC boards produced on this machine offer excellent moisture resistance, making them suitable for waterproof furniture and interior applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best WPC Board Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable WPC board production systems.",
  },
  {
    question: "Can the WPC Board Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, automation systems, embossing units, additional downstream equipment, and customized tooling as production requirements grow.",
  },
  {
    question: "How can I get the best quotation for a WPC Board Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required board dimensions, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
];

export default function WpcProfilePlant() {
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
      <title>WPC Board Plant | HPMC</title>

      <meta
        name="description"
        content="WPC board extrusion plants designed for manufacturing durable wood plastic composite boards with superior quality."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/wpc-board-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/wpcHero.png')",
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
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[60px] leading-[1.05] font-bold text-[#0B1220]">
              WPC
              <span className="text-[#65BC4F]"> Board Plant</span>
            </h1>

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
            WPC Board Plant -
            <span className="text-[var(--primary)]"> WPC Board Plant</span>
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
                HPMC Wood Plastic Composite (WPC) Profile Extrusion Line is
                designed for the efficient production of high-quality WPC
                profiles with excellent dimensional stability, surface finish,
                and long-term durability. The extrusion line delivers consistent
                output while ensuring reliable and energy-efficient operation.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                WPC products manufactured using this line are widely used in
                building, furniture, automotive, and measurement engineering
                applications. The system is suitable for manufacturing decking
                boards, wall panels, fencing, door frames, and other decorative
                profiles with superior strength and weather resistance.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "High Production Efficiency",
                  "Excellent Surface Finish",
                  "Energy Efficient Operation",
                  "Stable & Reliable Performance",
                  "Suitable for WPC Profiles",
                  "Low Maintenance Design",
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
                    3
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Machine Models
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    200
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Max Output (kg/hr)
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    4+
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Major Applications
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

                  {["HPMC 65/132", "HPMC 80/156", "HPMC 80/56"].map((model) => (
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
              <span className="text-[var(--primary)]"> WPC Board Plant</span>
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
