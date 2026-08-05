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
import { thead } from "framer-motion/client";

const galleryImages = [
  "/products/cpvc pipe extruder/conical-twin-screw-extruder.jpg",
  "/products/cpvc pipe extruder/AUTOMATIC-CUTTING-UNIT-UPTO-200-MM.jpg",
  "/products/cpvc pipe extruder/PNEUAMTIC-HAUL-OFF.jpg",
  "/products/cpvc pipe extruder/SPRAY-BATH-TANK.jpg",
];

const features = [
  {
    title: "CPVC Conical Twin Screw Extruder",
    desc: "Counter-rotating conical twin screw extruder manufactured on CNC WMW German thread milling machines using simulation software. Designed for high calcium loading with compact gearbox, synchronized drives, high output, and low power consumption.",
    image: "/products/cpvc pipe extruder/conical-twin-screw-extruder.jpg",
    highlights: [
      "CNC machined twin screws",
      "High calcium loading capability",
      "Low power consumption",
    ],
  },

  {
    title: "Die Head",
    desc: "Manufactured from high carbon content forged alloy steel for enhanced durability, longer service life, and reliable performance during CPVC pipe production.",
    image: "/products/cpvc pipe extruder/ohoopee6.jpg",
    highlights: [
      "Forged alloy steel",
      "High carbon content",
      "Long service life",
    ],
  },

  {
    title: "Spray Bath",
    desc: "Intensive pipe cooling system equipped with multiple self-cleaning spray nozzles, axial tank adjustment on slide rails, and an acrylic transparent cover for easy inspection.",
    image: "/products/cpvc pipe extruder/SPRAY-BATH-TANK.jpg",
    highlights: [
      "Self-cleaning spray nozzles",
      "Axial tank adjustment",
      "Transparent inspection cover",
    ],
  },

  {
    title: "Pneumatic Haul Off",
    desc: "Twin and multi-track haul-off system suitable for pipe sizes from 20mm to 315mm. Synchronized with the extruder through AC frequency variable drive and equipped with pneumatic pressure adjustment.",
    image: "/products/cpvc pipe extruder/PNEUAMTIC-HAUL-OFF.jpg",
    highlights: [
      "20mm–315mm pipe range",
      "AC drive synchronization",
      "Pneumatic pressure control",
    ],
  },

  {
    title: "Planetary Cutting Saw",
    desc: "PLC-controlled planetary cutting system for pipe diameters up to 315mm. Includes UPVC chamfering rotary cutting, dust extraction system, and hard alloy saw blades for thick-wall pipes.",
    image: "/products/cpvc pipe extruder/ohoopee26.jpg",
    highlights: [
      "PLC controlled operation",
      "Up to 315mm diameter",
      "Dust extraction system",
    ],
  },

  {
    title: "Automatic Cutting Unit",
    desc: "Automatic cutting unit for pipes up to 200mm diameter featuring a carborundum cutter, pneumatic cylinder movements, adjustable clamping force, and length sensing limit switch.",
    image:
      "/products/cpvc pipe extruder/AUTOMATIC-CUTTING-UNIT-UPTO-200-MM.jpg",
    highlights: [
      "Up to 200mm pipes",
      "Low material wastage",
      "Adjustable clamping force",
    ],
  },

  {
    title: "Tipping Chute",
    desc: "Automatic pipe stacking system operated using pneumatic cylinders and limit switches for smooth handling and efficient collection of finished pipes.",
    image: "/products/cpvc pipe extruder/ohoopee10.jpg",
    highlights: [
      "Automatic pipe stacking",
      "Pneumatic operation",
      "Limit switch controlled",
    ],
  },
];

const applications = [
  {
    image: "/images (2).png",
    title: "Oil Packaging Film",
    description: "Used for edible oil and liquid packaging solutions.",
  },
  {
    image: "/images (3).png",
    title: "Vacuum Bags",
    description: "Ideal for food preservation and industrial packaging.",
  },
  {
    image: "/images (4).png",
    title: "Food Packaging Film",
    description: "Safe and durable packaging for food products.",
  },
  {
    image: "/images (5).png",
    title: "Stretch Film",
    description: "Widely used for pallet wrapping and logistics.",
  },
  {
    image: "/images (2).png",
    title: "Milk Packaging Film",
    description: "Flexible film solutions for dairy packaging.",
  },
  {
    image: "/images (3).png",
    title: "Industrial Packaging",
    description: "Heavy-duty packaging for industrial applications.",
  },
];

const specifications = [
  {
    parameter: "Max Plasticizing Capacity (Kg/hr)",
    values: ["180", "275", "400"],
  },
  {
    parameter: "Max Output (Kg/hr)",
    values: ["150", "250", "350"],
  },
  {
    parameter: "Main Drive KW",
    values: ["18.5", "37", "55"],
  },
  {
    parameter: "Heating Barrel (KW)",
    values: ["15", "24", "35"],
  },
  {
    parameter: "Heating Die (KW)",
    values: ["3", "3", "4"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["1-37", "1-37", "1-37"],
  },
];

const faqData = [
  {
    question: "What is a Twin Screw Plant for CPVC Pipe?",
    answer:
      "A Twin Screw Plant for CPVC Pipe is a high-performance extrusion system designed to manufacture CPVC pipes with excellent dimensional accuracy, superior surface finish, and consistent production for plumbing, industrial, and fire protection applications.",
  },
  {
    question: "How does a Twin Screw CPVC Pipe Plant work?",
    answer:
      "The plant uses a Conical Twin Screw Extruder to melt and homogenize CPVC material before it passes through the die head, cooling system, haul-off unit, cutting system, and stacking unit to produce high-quality CPVC pipes.",
  },
  {
    question:
      "Which materials can be processed using a CPVC Pipe Extrusion Plant?",
    answer:
      "The machine is specially designed for CPVC compounds and can process various CPVC formulations used in plumbing, industrial piping, and hot water distribution systems.",
  },
  {
    question: "Which products can be manufactured using this CPVC Pipe Plant?",
    answer:
      "The plant manufactures CPVC plumbing pipes, hot and cold water pipes, industrial process pipes, fire sprinkler pipes, chemical transportation pipes, and pressure piping systems.",
  },
  {
    question: "What are CPVC pipes used for?",
    answer:
      "CPVC pipes are widely used for residential plumbing, commercial buildings, industrial fluid transfer, hot and cold water supply, fire sprinkler systems, and chemical processing industries.",
  },
  {
    question: "Which is the best CPVC Pipe Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Twin Screw CPVC Pipe Plants engineered for high productivity, excellent plasticizing, low power consumption, and reliable long-term performance.",
  },
  {
    question:
      "Who is the best CPVC Pipe Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of CPVC Pipe Extrusion Plants, offering precision-engineered machinery, customized solutions, and dependable after-sales support.",
  },
  {
    question: "What are the advantages of a Twin Screw CPVC Pipe Plant?",
    answer:
      "The machine provides excellent plasticizing, stable extrusion, superior pipe quality, energy-efficient operation, high production output, and longer machine life.",
  },
  {
    question:
      "Why is a Twin Screw Extruder preferred for CPVC pipe manufacturing?",
    answer:
      "Twin Screw Extruders ensure better mixing, uniform melting, stable pressure, and precise temperature control, making them ideal for processing CPVC materials.",
  },
  {
    question: "What pipe sizes can be manufactured?",
    answer:
      "Depending on the selected machine model and tooling, the plant can manufacture a wide range of CPVC pipe sizes for plumbing and industrial applications.",
  },
  {
    question: "Can the machine manufacture hot water CPVC pipes?",
    answer:
      "Yes. The extrusion plant is specifically designed to manufacture CPVC pipes suitable for hot and cold water distribution systems.",
  },
  {
    question: "Can industrial CPVC pipes be manufactured?",
    answer:
      "Yes. The machine is suitable for producing industrial-grade CPVC pipes used for chemical handling, process piping, and pressure applications.",
  },
  {
    question: "Which industries use CPVC Pipe Plants?",
    answer:
      "Construction, plumbing, chemical processing, water treatment, fire protection, infrastructure, and plastic pipe manufacturing industries widely use CPVC Pipe Plants.",
  },
  {
    question: "What are the benefits of the Conical Twin Screw Extruder?",
    answer:
      "The Conical Twin Screw Extruder offers superior plasticizing, excellent mixing, high filler handling capability, low energy consumption, and stable pipe production.",
  },
  {
    question: "What is the advantage of the forged alloy steel die head?",
    answer:
      "The forged alloy steel die head provides excellent durability, precise material flow, long service life, and consistent pipe dimensions.",
  },
  {
    question: "How does the Spray Bath improve pipe quality?",
    answer:
      "The Spray Bath cools CPVC pipes uniformly using multiple spray nozzles, ensuring excellent dimensional accuracy, better surface finish, and stable production.",
  },
  {
    question: "What is the production capacity of a CPVC Pipe Plant?",
    answer:
      "Production capacity depends on the selected machine model, pipe size, and material formulation, making the plant suitable for medium and high-volume manufacturing.",
  },
  {
    question: "How does the machine improve CPVC pipe quality?",
    answer:
      "Accurate temperature control, efficient plasticizing, stable extrusion pressure, and precision calibration help produce strong, smooth, and dimensionally accurate CPVC pipes.",
  },
  {
    question:
      "Is the Twin Screw CPVC Pipe Plant suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with stable performance, consistent output, and minimal downtime.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient heating systems, and modern drive technology help reduce power consumption while maintaining high production output.",
  },
  {
    question: "Can the CPVC Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized machine configurations, automation options, downstream equipment, and tooling to meet customer production requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a CPVC pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers looking to establish or expand a profitable CPVC pipe manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for CPVC Pipe Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered CPVC Pipe Plants with advanced extrusion technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top CPVC Pipe Machine manufacturers in India?",
    answer:
      "With decades of experience in plastic extrusion machinery, innovative engineering, export-quality manufacturing, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question: "How can I get the best price for a CPVC Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a Twin Screw CPVC Pipe Plant in India?",
    answer:
      "The price of a Twin Screw CPVC Pipe Plant depends on the machine model, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best CPVC Pipe Plant?",
    answer:
      "Choose a CPVC Pipe Plant based on pipe diameter, production capacity, automation requirements, raw material specifications, and future expansion plans.",
  },
  {
    question: "Which is the best CPVC Pipe Making Machine in India?",
    answer:
      "Twin Screw CPVC Pipe Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, precise extrusion, energy efficiency, and reliable long-term performance.",
  },
  {
    question: "Can the CPVC Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, die heads, cooling systems, haul-off units, cutting machines, and automation options based on customer requirements.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Different machine models are available to support medium and large-scale CPVC pipe manufacturing with varying production capacities.",
  },
  {
    question: "How much electricity does a CPVC Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, pipe diameter, and operating conditions. The plant is designed for energy-efficient manufacturing.",
  },
  {
    question: "Is the Twin Screw CPVC Pipe Plant energy efficient?",
    answer:
      "Yes. Advanced screw technology, efficient heating zones, and optimized drive systems help reduce power consumption while maintaining high production output.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The CPVC Pipe Plant is designed for continuous industrial production with stable operation, reliable performance, and consistent pipe quality.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen is available for easy operation, production monitoring, process control, and alarm management.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall production parameters for different pipe sizes, improving consistency and reducing setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control to ensure uniform CPVC melting and consistent pipe quality.",
  },
  {
    question:
      "Can different CPVC pipe sizes be manufactured using one machine?",
    answer:
      "Yes. By changing dies, calibration sleeves, and related tooling, different pipe diameters can be produced on the same extrusion line.",
  },
  {
    question: "How often does the CPVC Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of wear parts, and regular servicing help maximize machine life and production efficiency.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient inspection and replacement of wear components, helping minimize production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, machine testing, and startup assistance are provided by experienced technical engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Professional operator training is provided to ensure safe machine operation, efficient production, and proper maintenance.",
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
      "Yes. Customers receive technical assistance, preventive maintenance, troubleshooting, spare parts support, and process optimization services.",
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
      "Can the CPVC Pipe Plant be integrated into an existing production line?",
    answer:
      "Yes. The extrusion line can be integrated with existing downstream equipment, cooling tanks, haul-off units, cutting machines, and pipe collection systems.",
  },
  {
    question:
      "Is this machine suitable for starting a CPVC pipe manufacturing business?",
    answer:
      "Yes. It is an ideal investment for entrepreneurs and manufacturers planning to establish or expand a profitable CPVC pipe manufacturing business.",
  },
  {
    question:
      "Can the machine manufacture CPVC pipes for residential and industrial applications?",
    answer:
      "Yes. The machine produces CPVC pipes suitable for residential plumbing, commercial buildings, industrial piping systems, chemical plants, and fire protection applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best CPVC Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable CPVC pipe manufacturing systems.",
  },
  {
    question: "How can I get the best quotation for a CPVC Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Twin Screw CPVC Pipe Plant process different CPVC formulations?",
    answer:
      "Yes. The machine is designed to process a wide range of CPVC compounds used for plumbing, industrial piping, fire sprinkler systems, and pressure pipe applications.",
  },
  {
    question: "Can the machine manufacture hot and cold water CPVC pipes?",
    answer:
      "Yes. The extrusion line is specifically engineered for manufacturing CPVC pipes used in both hot and cold water distribution systems.",
  },
  {
    question:
      "Can industrial CPVC pressure pipes be manufactured on this machine?",
    answer:
      "Yes. The Twin Screw CPVC Pipe Plant is suitable for manufacturing industrial pressure pipes used in chemical processing, water treatment, and industrial fluid transfer systems.",
  },
  {
    question: "Can the machine manufacture fire sprinkler CPVC pipes?",
    answer:
      "Yes. The machine can produce CPVC pipes suitable for fire sprinkler systems when processed with the appropriate CPVC compound and tooling.",
  },
  {
    question:
      "Can the CPVC Pipe Plant manufacture ASTM or other standard pipes?",
    answer:
      "Yes. With the correct tooling, raw materials, and process control, the machine can manufacture CPVC pipes that comply with applicable national and international standards.",
  },
  {
    question: "How does the Twin Screw CPVC Pipe Plant improve pipe quality?",
    answer:
      "Efficient plasticizing, stable extrusion pressure, precision calibration, and accurate temperature control produce CPVC pipes with excellent strength, smooth surfaces, and consistent dimensions.",
  },
  {
    question:
      "Can CPVC pipes manufactured on this machine be used in commercial and industrial projects?",
    answer:
      "Yes. The machine produces CPVC pipes suitable for residential buildings, commercial complexes, hospitals, hotels, factories, industrial plants, and infrastructure projects.",
  },
  {
    question: "Can this machine reduce CPVC pipe manufacturing costs?",
    answer:
      "Yes. Energy-efficient operation, reduced material wastage, consistent production, and high output help lower the overall manufacturing cost per pipe.",
  },
  {
    question: "What is the expected lifespan of a Twin Screw CPVC Pipe Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial performance.",
  },
  {
    question: "Can the CPVC Pipe Plant be upgraded in the future?",
    answer:
      "Yes. Automation systems, die heads, downstream equipment, calibration units, and control systems can be upgraded to meet future production requirements.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture CPVC Pipe Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Twin Screw CPVC Pipe Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export CPVC Pipe Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports CPVC Pipe Plants and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The CPVC Pipe Plant can be integrated into existing production facilities with customized layouts and compatible downstream equipment.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, machine guidance, and production optimization support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide process optimization support?",
    answer:
      "Yes. Our technical experts assist customers in optimizing machine settings, CPVC formulations, production efficiency, and overall extrusion performance.",
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
      "Yes. Customers are welcome to visit our manufacturing facility to inspect machine production, quality testing, and discuss project requirements with our engineering team.",
  },
  {
    question: "Can machine trials be conducted before purchase?",
    answer:
      "Yes. Trial production can be arranged using customer-supplied CPVC compounds to evaluate machine performance, production output, and finished pipe quality.",
  },
  {
    question: "Is the Twin Screw CPVC Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology that helps reduce power consumption, minimize material waste, and support sustainable manufacturing.",
  },
  {
    question: "Which industries benefit from Twin Screw CPVC Pipe Plants?",
    answer:
      "Plumbing manufacturers, construction companies, fire protection contractors, chemical processing plants, water treatment facilities, infrastructure developers, and industrial pipe manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture CPVC pipes for green building and infrastructure projects?",
    answer:
      "Yes. The machine is suitable for manufacturing CPVC pipes used in green buildings, smart cities, commercial projects, industrial plants, hospitals, hotels, and modern infrastructure developments.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best CPVC Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable CPVC pipe production systems.",
  },
  {
    question:
      "Who is the top CPVC Pipe Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance Twin Screw CPVC Pipe Plants with excellent productivity, energy efficiency, and consistent product quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your CPVC Pipe Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, reliable technical support, and long-term operational performance.",
  },
  {
    question:
      "Why is the Twin Screw CPVC Pipe Plant one of the best solutions for CPVC pipe manufacturing?",
    answer:
      "Its superior plasticizing, stable extrusion process, energy-efficient operation, consistent pipe quality, and reliable industrial performance make it an excellent choice for manufacturing high-quality CPVC pipes.",
  },
];

export default function TwinScrewPlantForCpvcPipe() {
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
      <title>Conical Twin Screw Plant for CPVC Pipe | HPMC</title>

      <meta
        name="description"
        content="Twin screw CPVC pipe extrusion plants engineered for accurate production and maximum operational efficiency."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/twin-screw-plant-cpvc-pipe"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/tseHero.png')",
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
              Twin Screw Plant
              <span className="text-[#65BC4F]"> For CPVC Pipe</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              Our Twin Screw Plants for CPVC Pipe production are engineered for
              efficient processing, consistent output, and excellent pipe
              quality. Designed for reliable performance and low power
              consumption, these extrusion systems ensure high productivity and
              long service life for a wide range of CPVC pipe manufacturing
              applications.
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
            CPVC Pipe Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              Twin Screw Plant For CPVC Pipe
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
                We manufacture and export a wide range of plastic processing
                machinery, including Plastic Extruders, Twin Screw Extruders,
                PVC Pipe Plants, Pipe Extruders, HDPE Pipe Plants, Recycling
                Machines, Plastic Reprocessing Plants, Co-Rotating Extruders,
                Drip Irrigation Systems, Compounding Extruders, Pipe Machinery,
                PVC Casing Capping Machinery, Plastic Profile Machinery, and
                LLDPE Pipe Plants.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Our machinery is designed for reliable performance, high
                productivity, and efficient processing across various plastic
                extrusion and manufacturing applications. We also provide
                customized extrusion solutions to meet diverse industrial
                requirements.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Plastic Extruders",
                  "Twin Screw Extruders",
                  "PVC Pipe Plants",
                  "HDPE Pipe Plants",
                  "Recycling Machines",
                  "Custom Extrusion Solutions",
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

              <div className="grid grid-cols-3 gap-4 mt-8">
                {" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    15+
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Machine Categories{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    100%
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Export Quality{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    24/7
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Technical Support{" "}
                  </p>{" "}
                </div>{" "}
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

      <section className="py-10 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Key Features
            </span>

            <h2 className="mt-4 text-5xl lg:text-5xl font-bold">
              Why Choose Our
              <span className="text-[var(--primary)]">
                {" "}
                Twin Screw Extruder
              </span>
            </h2>
          </div>

          <div className="relative">
            {features.map((feature, index) => (
              <div
                key={index}
                className="sticky flex min-h-[calc(100vh-120px)] items-center py-6"
                style={{
                  top: `${72 + index * 4}px`,
                  zIndex: index + 1,
                }}
              >
                <div className="bg-[var(--card)] rounded-[28px] overflow-hidden border border-[var(--border)] shadow-[0_15px_50px_rgba(0,0,0,0.08)] mb-6">
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] min-h-[380px]">
                    {/* LEFT */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      {/* Top */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="h-[1px] flex-1 bg-[var(--border)]" />
                      </div>

                      <h3 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">
                        {feature.title}
                      </h3>

                      <p className="mt-5 text-[var(--text-secondary)] leading-7">
                        {feature.desc}
                      </p>

                      {/* HIGHLIGHTS */}
                      <div className="mt-8 grid gap-3">
                        {feature.highlights.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 text-sm font-medium"
                          >
                            <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        className="
      mt-8
      w-fit
      px-6
      py-3
      rounded-xl
      bg-[var(--primary)]
      text-white
      font-medium
      transition
      hover:scale-105
    "
                      >
                        Request Quote
                      </button>
                    </div>

                    {/* RIGHT */}
                    {feature.image && (
                      <div className="relative min-h-[380px] bg-gradient-to-br from-white to-[#f5f7f8]">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-contain p-8"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

                  {["HPMC 51/105", "HPMC 65/132", "HPMC 80/156"].map(
                    (model) => (
                      <th
                        key={model}
                        className="px-8 py-6 text-center font-semibold border"
                        style={{ borderColor: "rgba(255,255,255,0.2)" }}
                      >
                        {model}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {specifications.map((item, index) => (
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

                    {item.values.map((value, idx) => (
                      <td
                        key={idx}
                        className="px-8 py-5 text-center border"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
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
                Twin Screw Plant For CPVC Pipe
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
