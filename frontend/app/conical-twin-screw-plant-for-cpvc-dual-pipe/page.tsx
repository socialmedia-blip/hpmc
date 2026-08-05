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

const galleryImages = ["/products/conical-twin-screw-extruder.jpg"];

const specifications = [
  {
    parameter: "Min Pipe OD (mm)",
    values: ["16", "16", "16", "63", "110"],
  },
  {
    parameter: "Max Pipe OD (mm)",
    values: ["50", "200", "200", "225", "315"],
  },
  {
    parameter: "Max Plasticizing Capacity (Kg/hr)",
    values: ["90", "170", "190", "300", "425"],
  },
  {
    parameter: "Max Output (Kg/hr)",
    values: ["80", "150", "170", "250", "350"],
  },
  {
    parameter: "Main Drive (Kw)",
    values: ["15", "18.5", "22", "37", "55"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Heating",
  },
  {
    parameter: "Barrel (Kw)",
    values: ["11", "15", "18", "20", "35"],
  },
  {
    parameter: "Die (Kw)",
    values: ["3", "5", "5", "8", "12"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["1 - 37", "1 - 37", "1 - 37", "1 - 37", "1 - 37"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Vaccum Sizing Tank",
  },
  {
    parameter: "Pump Drive (KW)",
    values: ["2.25", "2.25", "2.25", "-", "-"],
  },
  {
    parameter: "Length (Mtrs)",
    values: ["3.0", "1.0", "1.0", "-", "-"],
  },
  {
    parameter: "Water Circulating Requirement (Ltrs/min)",
    values: ["400", "400", "400", "-", "-"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Spray Bath",
  },
  {
    parameter: "Length (mtrs)",
    values: ["3", "5", "5", "6", "6"],
  },
  {
    parameter: "Water Requirement Circulating(Ltrs/Min)",
    values: ["-", "-", "-", "450", "500"],
  },
  {
    parameter: "Drive Range (kw)",
    values: ["1.5", "4", "4", "4", "5.5"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Haul Off",
  },
  {
    parameter: "No. of Arms",
    values: ["2", "2", "2", "2", "3"],
  },
  {
    parameter: "Width of Belt (inch)",
    values: ["4", "6", "6", "6", "2.5"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Cutting Saw",
  },
  {
    parameter: "Saw Diameter (mm)",
    values: ["300", "500", "500", "500", "200"],
  },
  {
    parameter: "Saw Drive Load (KW)",
    values: ["0.75", "1.5", "1.5", "1.5", "2.25"],
  },
];

const faqData = [
  {
    question: "What is a Conical Twin Screw Plant for CPVC Dual Pipe?",
    answer:
      "A Conical Twin Screw Plant for CPVC Dual Pipe is an advanced extrusion system designed to manufacture two CPVC pipes simultaneously with high productivity, excellent dimensional accuracy, and superior pipe quality.",
  },
  {
    question: "How does a CPVC Dual Pipe Extrusion Plant work?",
    answer:
      "The plant uses a Conical Twin Screw Extruder, dual pipe die head, vacuum sizing tank, spray cooling system, haul-off unit, and cutting machine to produce two CPVC pipes simultaneously.",
  },
  {
    question: "Which materials can be processed using a CPVC Dual Pipe Plant?",
    answer:
      "The machine is specially designed for processing CPVC compounds used in hot and cold water plumbing systems, industrial piping, and pressure pipe applications.",
  },
  {
    question: "Which products can be manufactured using this machine?",
    answer:
      "The plant manufactures CPVC plumbing pipes, hot water pipes, cold water pipes, industrial pressure pipes, chemical transfer pipes, and fire sprinkler pipes.",
  },
  {
    question: "What are CPVC Dual Pipes used for?",
    answer:
      "CPVC pipes produced on this machine are widely used for residential plumbing, commercial buildings, hospitals, hotels, industrial plants, fire protection systems, and chemical processing applications.",
  },
  {
    question: "Which is the best CPVC Dual Pipe Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Conical Twin Screw CPVC Dual Pipe Plants with precision engineering, energy-efficient operation, and reliable industrial performance.",
  },
  {
    question: "Who is the best CPVC Dual Pipe Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of CPVC Dual Pipe extrusion plants, offering customized solutions, modern technology, and dependable after-sales support.",
  },
  {
    question: "What are the advantages of a CPVC Dual Pipe Plant?",
    answer:
      "The machine increases production capacity, reduces manufacturing costs per pipe, lowers energy consumption, improves machine utilization, and delivers consistent pipe quality.",
  },
  {
    question: "Why should manufacturers choose a Dual Pipe CPVC Plant?",
    answer:
      "Producing two CPVC pipes simultaneously increases output, improves productivity, reduces operating costs, and maximizes return on investment.",
  },
  {
    question: "What pipe sizes can be manufactured?",
    answer:
      "Depending on the selected machine model and tooling, the plant can manufacture CPVC pipes ranging from approximately 20 mm to 150 mm for various plumbing and industrial applications.",
  },
  {
    question:
      "Can two different pipe diameters be manufactured simultaneously?",
    answer:
      "Yes. With suitable tooling, the machine can produce two different CPVC pipe diameters simultaneously while maintaining excellent dimensional accuracy.",
  },
  {
    question: "What is the advantage of the Dual Pipe Die Head?",
    answer:
      "The Dual Pipe Die Head provides balanced material flow, uniform melt distribution, stable pressure, and consistent quality across both pipes.",
  },
  {
    question: "What are the benefits of Barrier Screw technology?",
    answer:
      "Barrier Screw technology improves plasticizing efficiency, melt homogeneity, production stability, output, and overall pipe quality while reducing material degradation.",
  },
  {
    question: "Why is a bi-metallic screw and barrel important?",
    answer:
      "A bi-metallic screw and barrel provide superior wear resistance, longer service life, stable processing performance, and reduced maintenance costs.",
  },
  {
    question: "Can the machine process high-performance CPVC compounds?",
    answer:
      "Yes. The Conical Twin Screw Plant is designed to process premium CPVC compounds used in demanding plumbing and industrial piping applications.",
  },
  {
    question: "Which industries use CPVC Dual Pipe Plants?",
    answer:
      "Construction, plumbing, infrastructure, chemical processing, water treatment, fire protection, and plastic pipe manufacturing industries widely use these extrusion plants.",
  },
  {
    question: "What is the production capacity of a CPVC Dual Pipe Plant?",
    answer:
      "Production capacity depends on the selected machine model, pipe size, and material formulation, with models capable of delivering outputs up to 450 kg/hr.",
  },
  {
    question: "How does the machine improve CPVC pipe quality?",
    answer:
      "Accurate temperature control, efficient plasticizing, balanced melt flow, and stable extrusion produce CPVC pipes with smooth surfaces, excellent strength, and consistent dimensions.",
  },
  {
    question: "Is the CPVC Dual Pipe Plant suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with reliable performance, stable output, and minimal downtime.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Producing two pipes simultaneously improves energy efficiency per pipe while maximizing production output and reducing operating costs.",
  },
  {
    question: "Can the CPVC Dual Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized machine configurations, automation systems, downstream equipment, and tooling based on customer production requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a CPVC pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a profitable CPVC pipe manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for CPVC Dual Pipe Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation provides precision-engineered extrusion machinery, advanced technology, durable machine construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top CPVC Pipe Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, robust manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question: "How can I get the best price for a CPVC Dual Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a CPVC Dual Pipe Plant in India?",
    answer:
      "The price of a CPVC Dual Pipe Plant depends on the machine model, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best CPVC Dual Pipe Plant?",
    answer:
      "The ideal machine depends on pipe diameter, production capacity, automation requirements, CPVC formulation, and future production expansion.",
  },
  {
    question: "Which is the best CPVC Dual Pipe Making Machine in India?",
    answer:
      "Conical Twin Screw CPVC Dual Pipe Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the CPVC Dual Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, die heads, cooling systems, haul-off units, cutting machines, and PLC automation options.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Multiple machine models are available to support small, medium, and high-capacity CPVC pipe manufacturing with outputs based on pipe size and production requirements.",
  },
  {
    question: "How much electricity does a CPVC Dual Pipe Machine consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, pipe diameter, and operating conditions. Dual pipe production improves energy efficiency per pipe.",
  },
  {
    question: "Is the CPVC Dual Pipe Plant energy efficient?",
    answer:
      "Yes. Producing two pipes simultaneously helps reduce energy consumption per pipe while increasing overall production efficiency.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The CPVC Dual Pipe Plant is designed for continuous industrial production with stable operation, reliable performance, and consistent output.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen is available for production monitoring, recipe management, process control, and alarm handling.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall production parameters for different pipe sizes, helping improve production consistency and reduce setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide precise temperature control for uniform CPVC melting and excellent pipe quality.",
  },
  {
    question:
      "Can different CPVC pipe diameters be manufactured using one machine?",
    answer:
      "Yes. By changing dies, calibration sleeves, and related tooling, the machine can manufacture different pipe diameters within its operating range.",
  },
  {
    question: "How often does the CPVC Dual Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of screw and barrel components, and electrical system checks help ensure reliable long-term operation.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection and replacement of wear components, minimizing maintenance time and production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, production trials, and startup assistance are provided by experienced service engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe machine operation, efficient production, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimum downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical support, preventive maintenance, troubleshooting, spare parts assistance, and production optimization services.",
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
      "Yes. Trial production using customer-supplied CPVC compounds can be conducted to verify machine performance and finished pipe quality.",
  },
  {
    question:
      "Can the CPVC Dual Pipe Plant be integrated into an existing production line?",
    answer:
      "Yes. The extrusion line can be integrated with existing downstream equipment, vacuum tanks, spray baths, haul-off units, cutting machines, and pipe collection systems.",
  },
  {
    question:
      "Is this machine suitable for starting a CPVC pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a profitable CPVC pipe manufacturing business.",
  },
  {
    question:
      "Can the machine manufacture CPVC pipes for plumbing and industrial applications?",
    answer:
      "Yes. The machine produces CPVC pipes suitable for residential plumbing, commercial buildings, industrial piping, hot and cold water systems, and fire protection applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best CPVC Dual Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable CPVC pipe manufacturing systems.",
  },
  {
    question: "How can I get the best quotation for a CPVC Dual Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Conical Twin Screw Plant process different CPVC formulations?",
    answer:
      "Yes. The machine is designed to process a wide range of CPVC compounds used for plumbing systems, industrial piping, pressure applications, and hot and cold water distribution.",
  },
  {
    question: "Can the machine manufacture hot and cold water CPVC pipes?",
    answer:
      "Yes. The extrusion line is specifically designed for manufacturing CPVC pipes used in hot and cold water plumbing systems with consistent quality.",
  },
  {
    question:
      "Can industrial CPVC pressure pipes be manufactured using this machine?",
    answer:
      "Yes. The CPVC Dual Pipe Plant is suitable for manufacturing industrial pressure pipes used in chemical processing, water treatment, and industrial fluid handling systems.",
  },
  {
    question: "Can the machine manufacture CPVC fire sprinkler pipes?",
    answer:
      "Yes. With the appropriate CPVC compound and tooling, the machine can manufacture CPVC pipes for fire sprinkler systems and fire protection applications.",
  },
  {
    question:
      "Can the CPVC Dual Pipe Plant manufacture ASTM or other standard pipes?",
    answer:
      "Yes. Using suitable tooling, quality raw materials, and proper process control, the machine can manufacture CPVC pipes that comply with applicable national and international standards.",
  },
  {
    question: "How does the CPVC Dual Pipe Plant improve pipe quality?",
    answer:
      "Balanced material flow, efficient plasticizing, precise temperature control, and stable extrusion pressure produce CPVC pipes with smooth surfaces, excellent strength, and consistent dimensions.",
  },
  {
    question:
      "Can CPVC pipes manufactured on this machine be used in commercial and industrial projects?",
    answer:
      "Yes. The machine produces CPVC pipes suitable for residential buildings, commercial complexes, hospitals, hotels, industrial plants, and infrastructure projects.",
  },
  {
    question: "Can this machine reduce CPVC pipe manufacturing costs?",
    answer:
      "Yes. Dual-pipe production increases productivity, reduces energy consumption per pipe, minimizes material wastage, and lowers the overall manufacturing cost.",
  },
  {
    question:
      "What is the expected lifespan of a Conical Twin Screw CPVC Dual Pipe Plant?",
    answer:
      "With regular preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the CPVC Dual Pipe Plant be upgraded in the future?",
    answer:
      "Yes. Automation systems, die heads, downstream equipment, calibration units, and control systems can be upgraded as production requirements grow.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture CPVC Dual Pipe Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Conical Twin Screw CPVC Dual Pipe Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export CPVC Dual Pipe Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports CPVC Dual Pipe Plants and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The CPVC Dual Pipe Plant can be integrated into existing production facilities with customized layouts and compatible downstream equipment.",
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
      "Yes. Our technical experts help optimize machine settings, CPVC formulations, production efficiency, and overall extrusion performance.",
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
      "Yes. Trial production can be arranged using customer-supplied CPVC compounds to evaluate machine performance, production output, and finished pipe quality.",
  },
  {
    question:
      "Is the Conical Twin Screw CPVC Dual Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine is designed with energy-efficient technology that helps reduce power consumption, optimize raw material usage, and support sustainable manufacturing.",
  },
  {
    question: "Which industries benefit from CPVC Dual Pipe Plants?",
    answer:
      "Plumbing manufacturers, construction companies, fire protection contractors, chemical processing industries, water treatment plants, infrastructure developers, and industrial pipe manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture CPVC pipes for green building and infrastructure projects?",
    answer:
      "Yes. The machine is suitable for manufacturing CPVC pipes used in green buildings, smart cities, commercial projects, hospitals, hotels, industrial plants, and modern infrastructure developments.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best CPVC Dual Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, precision engineering, advanced manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable CPVC pipe production systems.",
  },
  {
    question: "Who is the top CPVC Dual Pipe Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance CPVC Dual Pipe extrusion lines with excellent productivity, energy efficiency, and consistent product quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your CPVC Dual Pipe Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Conical Twin Screw Plant for CPVC Dual Pipe one of the best solutions for high-volume CPVC pipe manufacturing?",
    answer:
      "Its dual-pipe production capability, superior plasticizing, stable extrusion process, energy-efficient operation, and consistent pipe quality make it an ideal solution for manufacturers seeking higher productivity and lower production costs.",
  },
];

export default function TwinScrewExtruder() {
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
      <title>Conical Twin Screw Plant for CPVC Dual Pipe | HPMC</title>

      <meta
        name="description"
        content="Conical twin screw CPVC dual pipe extrusion plants for high-speed and precision manufacturing applications."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/conical-twin-screw-plant-cpvc-dual-pipe"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroSection/tsehero.png')",
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
          <div className="max-w-[520px] pt-24 lg:pt-0">
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[60px] leading-[1.05] font-bold text-[#0B1220]">
              Conical Twin Screw Plant For
              <span className="text-[#65BC4F]"> CPVC Dual Pipe</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Conical Twin Screw Plant For CPVC Dual Pipe are engineered
              for high-efficiency PVC pipe production with superior plasticizing
              performance and consistent output. Designed for both small and
              large diameter pipes, the series delivers excellent productivity
              with low power consumption and output capacities up to 150 kg/hr.
              Available in HPMC 45/90, HPMC 51/105, HPMC 65/132, HPMC 80/156,
              and HPMC 92/188 models.
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
            PVC Pipe Plant -
            <span className="text-[var(--primary)]">
              {" "}
              Conical Twin Screw Plant For CPVC Dual Pipe
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
                HPMC Conical Twin Screw Plant For CPVC Dual Pipe for PVC Pipe
                Plants are available in HPMC 45/90, HPMC 51/105, HPMC 65/132,
                HPMC 80/156, and HPMC 92/188 models. The extruders are equipped
                with a compact and reliable gearbox along with bi-metallic screw
                and barrel technology for longer service life and dependable
                performance in PVC pipe manufacturing applications.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Featuring Barrier Design (Double Thread) screw technology, the
                system delivers consistent melt homogeneity, excellent process
                control, and stable operation for superior end-product quality.
                Suitable for all pelletized materials, the extruder offers
                output capacities up to 450 Kg/hr for polyolefin processing.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Up to 450 Kg/hr Output",
                  "Bi-Metallic Screw & Barrel",
                  "Barrier Design Screw",
                  "Excellent Melt Homogeneity",
                  "Reliable Gearbox System",
                  "5 Machine Models",
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
                    5
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Machine Models
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    20–150mm
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Screw Diameter Range
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    450+
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Kg/hr Output
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

                  {[
                    "HPMC 45/90",
                    "HPMC 51/105",
                    "HPMC 55/110",
                    "HPMC 65/132",
                    "HPMC 80/156",
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
                  if (item.type === "blank") {
                    return (
                      <tr key={index}>
                        <td
                          colSpan={5}
                          className="h-16 border-b"
                          style={{ borderColor: "var(--border)" }}
                        />
                      </tr>
                    );
                  }

                  if (item.type === "section") {
                    return (
                      <tr
                        key={index}
                        className="border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <td className="px-8 py-5 font-semibold text-left text-[var(--text-primary)]">
                          {item.parameter}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }

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
                Conical Twin Screw Plant For CPVC Dual Pipe
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
