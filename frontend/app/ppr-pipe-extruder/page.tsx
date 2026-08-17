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
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Play,
  Sparkles,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import DemoPopup from "../components/PopupDemo";

const galleryImages = ["/products/hdpe-pipe-plant.jpg"];

const faqData = [
  {
    question: "What is a Single Screw Plant for PPR Pipe?",
    answer:
      "A Single Screw Plant for PPR Pipe is an advanced extrusion system designed to manufacture high-quality PPR-C pipes for hot and cold water supply, plumbing systems, and industrial piping applications.",
  },
  {
    question: "How does a PPR Pipe Extrusion Plant work?",
    answer:
      "The plant melts PPR raw material using a precision single screw extruder, followed by vacuum calibration, cooling, haul-off, and cutting systems to manufacture high-quality PPR pipes.",
  },
  {
    question: "Which materials can be processed using a PPR Pipe Plant?",
    answer:
      "The machine is specially designed for processing PPR-C (Polypropylene Random Copolymer) raw materials used in plumbing, water supply, heating, and industrial piping applications.",
  },
  {
    question: "Which products can be manufactured using a PPR Pipe Plant?",
    answer:
      "The machine manufactures PPR hot water pipes, cold water pipes, plumbing pipes, industrial fluid pipes, compressed air pipes, and building water distribution systems.",
  },
  {
    question: "What are PPR pipes used for?",
    answer:
      "PPR pipes are widely used in residential plumbing, commercial buildings, hospitals, hotels, schools, industrial water supply systems, and hot and cold water distribution networks.",
  },
  {
    question: "Which is the best PPR Pipe Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best PPR Pipe Plant manufacturers in India, offering advanced extrusion technology, reliable performance, and energy-efficient pipe production solutions.",
  },
  {
    question:
      "Who is the top PPR Pipe Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures precision-engineered PPR Pipe Extrusion Machines with consistent output, superior pipe quality, and dependable after-sales support.",
  },
  {
    question: "What are the advantages of a PPR Pipe Extrusion Plant?",
    answer:
      "The machine delivers excellent pipe quality, stable production, energy-efficient operation, precise dimensions, smooth surface finish, and long-term reliability.",
  },
  {
    question: "Why should manufacturers choose a PPR Pipe Plant?",
    answer:
      "A PPR Pipe Plant offers high productivity, consistent pipe quality, lower operating costs, and reliable performance, making it ideal for modern pipe manufacturing businesses.",
  },
  {
    question: "What pipe sizes can be manufactured?",
    answer:
      "Depending on the selected machine model and tooling, the plant can manufacture PPR pipes ranging from 16 mm to 160 mm.",
  },
  {
    question: "What is the production capacity of the PPR Pipe Plant?",
    answer:
      "Depending on the selected machine model, production capacities range from approximately 90 kg/hr to 160 kg/hr while maintaining excellent dimensional accuracy.",
  },
  {
    question: "Why is a Single Screw Extruder used for PPR pipe manufacturing?",
    answer:
      "A Single Screw Extruder provides efficient melting, uniform plasticization, stable material flow, and consistent production of premium-quality PPR pipes.",
  },
  {
    question: "What are the benefits of PPR-C pipes?",
    answer:
      "PPR-C pipes offer corrosion resistance, high temperature resistance, leak-proof joints, lightweight construction, long service life, and excellent chemical resistance.",
  },
  {
    question: "How are PPR pipes joined together?",
    answer:
      "PPR pipes are joined using heat fusion welding, creating strong, leak-proof, and permanent joints without the need for adhesives.",
  },
  {
    question: "Can the machine manufacture hot and cold water PPR pipes?",
    answer:
      "Yes. The extrusion line is specifically designed to manufacture PPR pipes suitable for both hot and cold water supply systems.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The Single Screw PPR Pipe Plant is designed for continuous industrial production with stable operation and minimal downtime.",
  },
  {
    question: "Is the PPR Pipe Plant energy efficient?",
    answer:
      "Yes. Optimized screw design, efficient heating systems, and modern drive technology help reduce power consumption while maintaining high productivity.",
  },
  {
    question: "Can the PPR Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, automation systems, die heads, downstream equipment, and machine layouts based on customer requirements.",
  },
  {
    question: "Which industries use PPR Pipe Plants?",
    answer:
      "Plumbing manufacturers, construction companies, infrastructure developers, industrial pipe manufacturers, hospitals, commercial projects, and water supply companies use PPR Pipe Plants.",
  },
  {
    question:
      "Is this machine suitable for starting a PPR pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a profitable PPR pipe manufacturing business.",
  },
  {
    question: "How long do PPR pipes last?",
    answer:
      "High-quality PPR pipes manufactured with proper raw materials and processing can provide a service life of more than 50 years under recommended operating conditions.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for PPR Pipe Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered PPR Pipe Plants with advanced extrusion technology, robust construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top PPR Pipe Machine manufacturers in India?",
    answer:
      "With decades of experience in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question: "Can the machine manufacture export-quality PPR pipes?",
    answer:
      "Yes. The machine is capable of producing consistent, high-quality PPR pipes suitable for both domestic and international markets.",
  },
  {
    question: "How can I get the best price for a PPR Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a PPR Pipe Plant in India?",
    answer:
      "The price of a PPR Pipe Plant depends on the machine model, pipe diameter range, production capacity, automation level, and optional equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PPR Pipe Extrusion Machine?",
    answer:
      "The ideal PPR Pipe Extrusion Machine depends on your required pipe sizes, production capacity, automation preferences, raw material grade, and future expansion plans.",
  },
  {
    question: "Which is the best PPR Pipe Making Machine in India?",
    answer:
      "Single Screw PPR Pipe Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, energy efficiency, precise pipe dimensions, and reliable long-term performance.",
  },
  {
    question: "Can the PPR Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, die heads, vacuum tanks, cooling systems, haul-off units, cutting machines, and PLC automation options.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Different machine models are available with production capacities ranging from approximately 90 kg/hr to 160 kg/hr depending on the pipe size and selected configuration.",
  },
  {
    question: "How much electricity does a PPR Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production capacity, pipe diameter, and operating conditions. The machine is designed for energy-efficient production.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen is available for process monitoring, parameter control, alarm management, and production optimization.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall production settings for different pipe sizes, improving consistency and reducing machine setup time.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones maintain precise temperature control for uniform melting and high-quality PPR pipe production.",
  },
  {
    question:
      "Can different PPR pipe diameters be manufactured on one machine?",
    answer:
      "Yes. By changing dies, calibration sleeves, and related tooling, the machine can manufacture multiple PPR pipe sizes within its operating range.",
  },
  {
    question: "How often does the PPR Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of the screw and barrel, gearbox, cooling systems, and electrical components help ensure reliable long-term operation.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection and maintenance, reducing downtime and ensuring dependable production.",
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
      "Yes. Professional operator training is provided to ensure safe operation, efficient production, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimum production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical support, troubleshooting, preventive maintenance, spare parts assistance, and production optimization services.",
  },
  {
    question: "Can I request a live machine demonstration?",
    answer:
      "Yes. Live demonstrations and technical consultations can be arranged to help customers evaluate machine performance before making a purchase decision.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied PPR raw materials can be conducted to verify machine performance, output, and finished pipe quality.",
  },
  {
    question:
      "Can the PPR Pipe Plant be integrated into an existing production line?",
    answer:
      "Yes. The extrusion line can be integrated with existing downstream equipment, printing units, coilers, stacking systems, and pipe handling equipment.",
  },
  {
    question:
      "Can the machine manufacture PPR pipes for drinking water applications?",
    answer:
      "Yes. The machine produces PPR pipes widely used for potable water supply systems when processed with quality PPR-C raw materials.",
  },
  {
    question:
      "Can the machine manufacture PPR pipes for industrial fluid transfer?",
    answer:
      "Yes. The extrusion line manufactures PPR pipes suitable for industrial fluid transportation, compressed air systems, and chemical applications.",
  },
  {
    question:
      "Can the machine produce PPR pipes for residential and commercial plumbing?",
    answer:
      "Yes. The machine is ideal for manufacturing PPR plumbing pipes used in homes, apartments, hotels, hospitals, offices, and commercial buildings.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PPR Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PPR pipe production systems.",
  },
  {
    question: "Can the PPR Pipe Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with automation, additional downstream equipment, and customized tooling to meet growing production requirements.",
  },
  {
    question: "How can I get the best quotation for a PPR Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Single Screw PPR Pipe Plant process different grades of PPR raw material?",
    answer:
      "Yes. The machine is designed to process various grades of PPR-C raw materials used for hot water, cold water, plumbing, and industrial piping applications.",
  },
  {
    question:
      "Can the machine manufacture PN10, PN16, PN20, and PN25 PPR pipes?",
    answer:
      "Yes. With suitable tooling and processing parameters, the machine can manufacture different pressure-rated PPR pipes such as PN10, PN16, PN20, and PN25.",
  },
  {
    question: "Can the machine manufacture food-grade PPR pipes?",
    answer:
      "Yes. Using certified food-grade PPR raw materials, the extrusion line can manufacture pipes suitable for potable water and drinking water distribution systems.",
  },
  {
    question:
      "Can the PPR Pipe Plant manufacture pipes for industrial applications?",
    answer:
      "Yes. The machine manufactures PPR pipes used in chemical processing, industrial water supply, compressed air systems, and fluid transportation.",
  },
  {
    question:
      "Can the machine manufacture PPR pipes that meet international standards?",
    answer:
      "Yes. With proper tooling, quality raw materials, and controlled processing, the machine can manufacture PPR pipes that comply with applicable national and international standards.",
  },
  {
    question: "How does the Single Screw PPR Pipe Plant improve pipe quality?",
    answer:
      "Efficient plasticization, precise temperature control, stable extrusion pressure, and accurate vacuum calibration produce PPR pipes with smooth surfaces, excellent strength, and consistent dimensions.",
  },
  {
    question:
      "Can PPR pipes manufactured on this machine be used in residential and commercial projects?",
    answer:
      "Yes. The machine produces PPR pipes widely used in homes, apartments, hotels, hospitals, schools, office buildings, shopping malls, and commercial plumbing systems.",
  },
  {
    question: "Can this machine reduce PPR pipe manufacturing costs?",
    answer:
      "Yes. Energy-efficient operation, stable production, optimized material usage, and reduced wastage help lower the overall manufacturing cost per pipe.",
  },
  {
    question: "What is the expected lifespan of a Single Screw PPR Pipe Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the PPR Pipe Plant be upgraded in the future?",
    answer:
      "Yes. Automation systems, die heads, vacuum tanks, haul-off units, cutting systems, and downstream equipment can be upgraded as production requirements grow.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture PPR Pipe Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Single Screw PPR Pipe Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PPR Pipe Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports PPR Pipe Plants and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PPR Pipe Plant can be integrated into existing production facilities with customized layouts and compatible downstream equipment.",
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
      "Yes. Our technical experts assist customers in optimizing machine settings, PPR processing parameters, production efficiency, and overall extrusion performance.",
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
      "Yes. Trial production can be arranged using customer-supplied PPR raw materials to evaluate machine performance, production output, and finished pipe quality.",
  },
  {
    question: "Is the Single Screw PPR Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question: "Which industries benefit from Single Screw PPR Pipe Plants?",
    answer:
      "Plumbing manufacturers, construction companies, infrastructure developers, hospitals, hotels, commercial builders, industrial facilities, and water supply projects benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture PPR pipes for green building and smart city projects?",
    answer:
      "Yes. The machine is ideal for manufacturing PPR pipes used in green buildings, smart cities, commercial complexes, residential projects, hospitals, educational institutions, and modern infrastructure developments.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best PPR Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable PPR pipe production systems.",
  },
  {
    question:
      "Who is the top PPR Pipe Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance PPR Pipe Plants with excellent productivity, energy efficiency, and consistent pipe quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your PPR Pipe Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Single Screw PPR Pipe Plant one of the best solutions for PPR pipe manufacturing?",
    answer:
      "Its stable extrusion process, energy-efficient operation, precise pipe dimensions, excellent surface finish, reliable performance, and low operating costs make it an ideal solution for manufacturing premium-quality PPR pipes.",
  },
];

const specifications = [
  {
    parameter: "Pipe Range (mm) ",
    values: ["16 - 63", "16 - 110", "63 - 160"],
  },
  {
    parameter: "Capacity (kg/hr)  ",
    values: ["90", "125", "160"],
  },
  {
    parameter: " Main Motor (kw)  ",
    values: ["37", "55", "75"],
  },
  {
    parameter: "Haulling Speed (max. m/min)  ",
    values: [" 2 - 8", "2 - 8", "2 - 8"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Vaccum Tank",
  },
  {
    parameter: "Pump Drive ( KW)",
    values: ["2.2", "3.7", "3.7 & 2.2"],
  },
  {
    parameter: "Length ( Mtrs) ",
    values: ["6", "6", "6"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Water Tank",
  },
  {
    parameter: "Pump Drive (KW)",
    values: ["3.7", "3.7", "3.7"],
  },
  {
    parameter: "Length (Mtrs)",
    values: ["-", "6", "6+6"],
  },

  // Blank Row
  {
    type: "blank",
  },

  {
    parameter: "Total Power (kw)",
    values: ["80", "105", "140"],
  },
  {
    parameter: "Line length (m)  ",
    values: ["30", "38", "50"],
  },
];

export default function PPRPipeExtruder() {
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

  const displayedFaqs = showAllFaqs ? faqData : faqData.slice(0, 10);

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
      <title>PPR Pipe Extruder Manufacturer | HPMC</title>

      <meta
        name="description"
        content="High-performance PPR pipe extrusion machines engineered for precision manufacturing and long-term reliability."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/ppr-pipe-extruder"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/hdpe.png')",
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
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] leading-[1.05] font-bold text-[#0B1220]">
              Single Screw Plant
              <span className="text-[#65BC4F]"> For PPR Pipe</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Single Screw PPR Pipe Plants are designed for efficient
              production of high-quality PPR pipes with consistent output and
              reliable performance. Built using advanced extrusion technology,
              the system ensures smooth processing, energy efficiency, and long
              service life.
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
            PPR Pipe Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              Single Screw Plant For PPR Pipe
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
                HPMC Single Screw Plants for PPR Pipe are designed for efficient
                manufacturing of high-quality PPR-C pipes used in water supply
                and plumbing systems. The extrusion line delivers reliable
                performance, consistent pipe quality, and long-term operational
                efficiency.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                PPR pipes are lightweight, corrosion-resistant, and capable of
                withstanding high temperatures. With excellent thermal
                insulation, leak-proof welded joints, and a service life of up
                to 50 years, they are an ideal solution for modern water
                distribution systems.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Water Supply Applications",
                  "Corrosion Resistant",
                  "High Temperature Resistance",
                  "Leak-Proof Joints",
                  "Lightweight Design",
                  "50+ Years Service Life",
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
                    PPR-C
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Pipe Material
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    95°C
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Heat Resistance
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    50+
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Years Lifespan
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

                  {["HPMC 60", "HPMC 75", "HPMC 90"].map((model) => (
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
              <span className="text-[var(--primary)]"> PPR Pipe Extruder</span>
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
