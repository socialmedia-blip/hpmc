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
  "/products/trunking.png",
  "/products/pvc trunking extruder/PNEUAMTIC-HAUL-OFF.jpg",
  "/products/pvc trunking extruder/SPRAY-BATH-TANK.jpg",
  "/products/pvc trunking extruder/AUTOMATIC-CUTTING-UNIT-UPTO-200-MM.jpg",
];

const features = [
  {
    title: "Conical Twin Screw Extruder",
    desc: "Counter-rotating conical twin screw extruder manufactured on CNC WMW German thread milling machines using simulation software. Designed for high calcium loading, low power consumption, and high output performance.",
    image: "/product.jpg",
    highlights: [
      "CNC machined twin screws",
      "High calcium loading",
      "Low power consumption",
    ],
  },

  {
    title: "Die Head",
    desc: "Manufactured from high carbon content forged alloy steel to provide superior durability, longer service life, and reliable production performance.",

    highlights: [
      "Forged alloy steel",
      "Extended service life",
      "High durability",
    ],
  },

  {
    title: "Spray Bath",
    desc: "Intensive cooling system equipped with self-cleaning spray nozzles, axial tank adjustment, and an acrylic transparent cover for easy monitoring and inspection.",
    image: "/products/pvc trunking extruder/SPRAY-BATH-TANK.jpg",
    highlights: [
      "Self-cleaning nozzles",
      "Axial tank adjustment",
      "Transparent cover",
    ],
  },

  {
    title: "Pneumatic Haul Off",
    desc: "Twin and multi-track haul-off system suitable for pipe sizes from 20mm to 315mm. Features AC drive synchronization and pneumatic pressure adjustment for smooth operation.",
    image: "/products/pvc trunking extruder/PNEUAMTIC-HAUL-OFF.jpg",
    highlights: [
      "20mm–315mm pipe range",
      "AC drive synchronized",
      "Twin & multi-track system",
    ],
  },

  {
    title: "Automatic Cutting Unit",
    desc: "Equipped with a carborundum cutter for smooth and precise cutting with minimal wastage. Pneumatic cylinders and adjustable clamping ensure accurate operation.",
    image:
      "/products/pvc trunking extruder/AUTOMATIC-CUTTING-UNIT-UPTO-200-MM.jpg",
    highlights: [
      "Low-wastage cutting",
      "Smooth & clean cuts",
      "Adjustable clamping force",
    ],
  },

  {
    title: "Tipping Chute",
    desc: "Automatic pipe stacking system operated through pneumatic cylinders and limit switches for efficient handling and collection of finished products.",
    image: "/products/pvc trunking extruder/ohoopee10.jpg",
    highlights: [
      "Automatic stacking",
      "Pneumatic operation",
      "Limit switch control",
    ],
  },
];
const faqData = [
  {
    question: "What is a Twin Screw Plant for PVC Trunking?",
    answer:
      "A Twin Screw Plant for PVC Trunking is an advanced extrusion system designed to manufacture PVC trunking, wiring ducts, cable management profiles, and electrical cable protection systems with high dimensional accuracy and excellent surface finish.",
  },
  {
    question: "How does a PVC Trunking Extrusion Plant work?",
    answer:
      "The plant melts PVC compounds using a Conical Twin Screw Extruder, shapes the material through a precision die head, and uses vacuum cooling, haul-off, cutting, and stacking systems to manufacture finished PVC trunking profiles.",
  },
  {
    question: "Which materials can be processed using a PVC Trunking Plant?",
    answer:
      "The machine processes rigid PVC compounds, high-calcium PVC formulations, profile-grade PVC materials, and customized PVC blends used for cable management products.",
  },
  {
    question:
      "Which products can be manufactured using this PVC Trunking Machine?",
    answer:
      "The machine manufactures PVC trunking, cable ducts, wiring ducts, electrical cable channels, cable raceways, communication cable trunking, and customized cable management profiles.",
  },
  {
    question: "What is PVC trunking used for?",
    answer:
      "PVC trunking is widely used to organize, protect, and route electrical wires, network cables, communication cables, and power distribution systems in residential, commercial, and industrial buildings.",
  },
  {
    question: "Which is the best PVC Trunking Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best PVC Trunking Machine manufacturers in India, offering advanced Twin Screw extrusion plants with high productivity, energy efficiency, and reliable long-term performance.",
  },
  {
    question:
      "Who is the top PVC Trunking Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures precision-engineered PVC Trunking Extrusion Machines trusted by electrical product manufacturers across India and international markets.",
  },
  {
    question: "What are the advantages of a Twin Screw PVC Trunking Plant?",
    answer:
      "The machine offers superior PVC plasticization, excellent mixing, stable extrusion, smooth surface finish, accurate profile dimensions, low power consumption, and high production efficiency.",
  },
  {
    question:
      "Why is a Conical Twin Screw Extruder preferred for PVC trunking manufacturing?",
    answer:
      "A Conical Twin Screw Extruder provides better PVC fusion, excellent filler dispersion, stable melt pressure, and consistent profile quality, making it ideal for PVC trunking production.",
  },
  {
    question: "Can the machine process high-calcium PVC formulations?",
    answer:
      "Yes. The Twin Screw Plant efficiently processes high-calcium PVC compounds while maintaining product strength, dimensional stability, and excellent surface finish.",
  },
  {
    question: "Can customized PVC trunking profiles be manufactured?",
    answer:
      "Yes. Customized extrusion dies can be developed to manufacture different trunking sizes, cable ducts, wiring channels, and customer-specific PVC profiles.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Production capacity depends on the selected machine model, trunking size, PVC formulation, and extrusion configuration. Customized production solutions are available.",
  },
  {
    question: "How does the Twin Screw Plant improve PVC trunking quality?",
    answer:
      "Efficient material fusion, stable extrusion pressure, accurate cooling, and precision calibration produce PVC trunking with smooth surfaces, excellent strength, and consistent dimensions.",
  },
  {
    question: "Which industries use PVC Trunking Extrusion Plants?",
    answer:
      "Electrical product manufacturers, cable management companies, telecom infrastructure providers, commercial construction firms, industrial projects, and panel board manufacturers widely use PVC Trunking Plants.",
  },
  {
    question: "Can the machine manufacture electrical cable trunking?",
    answer:
      "Yes. The machine is specifically designed for manufacturing electrical cable trunking used in residential, commercial, and industrial electrical installations.",
  },
  {
    question: "Can the machine manufacture PVC wiring ducts?",
    answer:
      "Yes. The extrusion line produces PVC wiring ducts and cable channels for control panels, electrical cabinets, automation systems, and building wiring.",
  },
  {
    question: "Can the machine manufacture communication cable ducts?",
    answer:
      "Yes. The plant manufactures communication cable ducts used for networking, fiber optic cables, data centers, and telecommunication infrastructure.",
  },
  {
    question:
      "Is the Twin Screw PVC Trunking Plant suitable for continuous production?",
    answer:
      "Yes. The machine is engineered for continuous industrial production with stable output, minimal downtime, and reliable long-term performance.",
  },
  {
    question: "Is the PVC Trunking Extrusion Machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient drive systems, and advanced extrusion technology help reduce power consumption while maintaining high productivity.",
  },
  {
    question: "Can the PVC Trunking Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, profile dies, calibration systems, automation, and downstream equipment according to customer requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC trunking manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a PVC trunking and cable management products manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for PVC Trunking Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered PVC Trunking Plants with advanced extrusion technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Trunking Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and worldwide.",
  },
  {
    question:
      "Can the machine manufacture export-quality PVC trunking products?",
    answer:
      "Yes. The machine is capable of producing premium-quality PVC trunking and wiring duct products suitable for domestic as well as international markets.",
  },
  {
    question:
      "How can I get the best price for a Twin Screw PVC Trunking Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your trunking profile design, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a Twin Screw PVC Trunking Plant in India?",
    answer:
      "The price of a Twin Screw PVC Trunking Plant depends on the machine model, trunking profile size, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PVC Trunking Extrusion Machine?",
    answer:
      "The ideal PVC Trunking Extrusion Machine depends on your product dimensions, production capacity, PVC formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best PVC Trunking Making Machine in India?",
    answer:
      "Twin Screw PVC Trunking Plants from Hindustan Plastics and Machine Corporation are designed for excellent product quality, high productivity, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the Twin Screw PVC Trunking Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized profile dies, calibration systems, spray baths, haul-off units, cutting systems, stacking units, and PLC automation based on production requirements.",
  },
  {
    question: "Can one machine manufacture different PVC trunking sizes?",
    answer:
      "Yes. By changing the extrusion die and calibration tooling, the same machine can manufacture multiple PVC trunking sizes and cable duct profiles.",
  },
  {
    question:
      "How much electricity does a PVC Trunking Extrusion Machine consume?",
    answer:
      "Power consumption depends on the machine model, trunking dimensions, production output, and operating conditions. The machine is engineered for energy-efficient operation.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen allows operators to monitor production, adjust machine parameters, manage alarms, and improve production efficiency.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different PVC trunking sizes, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating and cooling zones provide accurate temperature control for efficient PVC processing and stable extrusion.",
  },
  {
    question: "Can recycled PVC materials be processed?",
    answer:
      "Yes. Depending on the formulation and application, the machine can process recycled PVC blends along with virgin PVC compounds.",
  },
  {
    question: "How often does the PVC Trunking Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of screw and barrel, gearbox, heaters, cooling systems, and electrical components ensures reliable long-term performance.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection and maintenance, reducing downtime and maintenance costs.",
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
      "Yes. Comprehensive operator training is provided to ensure safe machine operation, efficient production, and proper preventive maintenance.",
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
      "Yes. Production trials using customer-supplied PVC compounds can be conducted to verify machine performance and finished trunking quality.",
  },
  {
    question:
      "Can the PVC Trunking Plant be integrated into an existing production line?",
    answer:
      "Yes. The extrusion line can be integrated with existing material feeding systems, printing units, packaging equipment, and downstream handling systems.",
  },
  {
    question: "Can the machine manufacture PVC trunking with different colors?",
    answer:
      "Yes. By using suitable masterbatches and PVC formulations, the machine can manufacture PVC trunking in various colors based on customer requirements.",
  },
  {
    question:
      "Can the machine manufacture heavy-duty industrial cable trunking?",
    answer:
      "Yes. The extrusion line can produce heavy-duty PVC trunking profiles designed for industrial cable management and electrical installations.",
  },
  {
    question:
      "Can the machine manufacture PVC wiring ducts for electrical panels?",
    answer:
      "Yes. The machine is widely used to manufacture PVC wiring ducts for electrical control panels, switchboards, automation systems, and distribution panels.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Trunking Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC trunking production systems.",
  },
  {
    question: "Can the PVC Trunking Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with automation, customized tooling, additional downstream equipment, and higher-capacity components as production requirements increase.",
  },
  {
    question:
      "How can I get the best quotation for a Twin Screw PVC Trunking Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your trunking dimensions, production capacity, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Twin Screw PVC Trunking Plant process different PVC formulations?",
    answer:
      "Yes. The machine is designed to process rigid PVC compounds, high-calcium PVC formulations, profile-grade PVC materials, recycled PVC blends, and customized PVC compounds for different cable management applications.",
  },
  {
    question:
      "Can the machine manufacture mini, medium, and heavy-duty PVC trunking?",
    answer:
      "Yes. By changing the extrusion die and calibration tooling, the machine can manufacture mini, medium, and heavy-duty PVC trunking in various dimensions.",
  },
  {
    question: "Can the machine manufacture slotted wiring ducts?",
    answer:
      "Yes. The Twin Screw PVC Trunking Plant can manufacture slotted wiring ducts widely used in electrical control panels and industrial automation systems.",
  },
  {
    question: "Can the machine manufacture PVC raceways for cable management?",
    answer:
      "Yes. The extrusion line is suitable for manufacturing PVC raceways used for protecting and organizing electrical, networking, and communication cables.",
  },
  {
    question:
      "Can the Twin Screw PVC Trunking Plant manufacture products that meet international quality standards?",
    answer:
      "Yes. With suitable tooling, quality PVC compounds, and controlled processing, the machine can manufacture PVC trunking products that comply with applicable national and international standards.",
  },
  {
    question:
      "How does the Twin Screw PVC Trunking Plant improve product quality?",
    answer:
      "Efficient plasticization, stable extrusion pressure, precise temperature control, and accurate calibration produce PVC trunking with smooth surfaces, excellent strength, and consistent dimensions.",
  },
  {
    question:
      "Can PVC trunking manufactured on this machine be used in residential and commercial buildings?",
    answer:
      "Yes. The machine manufactures PVC trunking widely used in homes, apartments, offices, shopping malls, hospitals, schools, hotels, factories, and commercial buildings.",
  },
  {
    question: "Can this machine reduce PVC trunking manufacturing costs?",
    answer:
      "Yes. High production efficiency, energy-saving operation, reduced material wastage, and stable processing help lower the overall manufacturing cost of PVC trunking.",
  },
  {
    question:
      "What is the expected lifespan of a Twin Screw PVC Trunking Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the PVC Trunking Plant be upgraded in the future?",
    answer:
      "Yes. The machine can be upgraded with new profile dies, PLC automation, calibration equipment, downstream machinery, and higher-capacity components as production requirements increase.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture PVC Trunking Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Twin Screw PVC Trunking Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PVC Trunking Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports PVC Trunking Plants and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PVC Trunking Plant can be integrated into existing manufacturing facilities with customized layouts and compatible downstream equipment.",
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
      "Yes. Our technical experts help optimize machine settings, PVC formulations, extrusion parameters, and overall production efficiency to maximize output and product quality.",
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
      "Yes. Trial production can be arranged using customer-supplied PVC compounds to evaluate machine performance, production output, and finished trunking quality.",
  },
  {
    question: "Is the Twin Screw PVC Trunking Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question: "Which industries benefit from Twin Screw PVC Trunking Plants?",
    answer:
      "Electrical product manufacturers, panel builders, telecom companies, infrastructure developers, construction companies, automation industries, data centers, and cable management system manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture PVC trunking for smart buildings and industrial automation projects?",
    answer:
      "Yes. The machine is ideal for manufacturing PVC trunking used in smart buildings, industrial automation, commercial complexes, IT infrastructure, hospitals, educational institutions, and modern construction projects.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best PVC Trunking Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable PVC trunking production systems.",
  },
  {
    question:
      "Who is the top PVC Trunking Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance PVC Trunking Extrusion Machines with excellent productivity, energy efficiency, and consistent product quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your PVC Trunking Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Twin Screw PVC Trunking Plant one of the best solutions for PVC cable trunking manufacturing?",
    answer:
      "Its superior PVC plasticization, stable extrusion process, excellent dimensional accuracy, energy-efficient operation, and reliable industrial performance make it an ideal solution for manufacturing premium-quality PVC trunking, cable ducts, and wiring channels.",
  },
];

export default function TwinScrewPlantForPVCTrunking() {
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
      <title>Twin Screw Plant for PVC Trunking | HPMC</title>

      <meta
        name="description"
        content="Twin screw PVC trunking extrusion plants delivering precision manufacturing and excellent production efficiency."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/twin-screw-plant-pvc-trunking"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/trunking.png')",
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
              <span className="text-[#65BC4F]"> For PVC Trunking</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              We manufacture and export Twin Screw Plants for PVC Trunking along
              with Plastic Extruders, PVC Pipe Plants, HDPE Pipe Plants,
              Recycling Machines, Compounding Extruders, and other plastic
              processing machinery. Our systems are designed for efficient
              production, reliable performance, and long service life.
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
            PVC Trunking Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              Twin Screw Plant For PVC Trunking
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
                We manufacture and export a comprehensive range of plastic
                processing machinery, including Plastic Extruders, Twin Screw
                Extruders, PVC Pipe Plants, HDPE Pipe Plants, Recycling
                Machines, Plastic Reprocessing Plants, Co-Rotating Extruders,
                and Compounding Extruders.
              </p>
              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Our machinery is engineered for reliable performance, efficient
                production, and long service life, delivering dependable
                solutions for various extrusion and plastic manufacturing
                applications.
              </p>
              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Twin Screw Extruders",
                  "PVC Pipe Plants",
                  "HDPE Pipe Plants",
                  "Recycling Machines",
                  "Plastic Profile Machinery",
                  "Compounding Extruders",
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
              {/* Stats Cards */}{" "}
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
                    Quality Assured{" "}
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

      {/* <section className="py-16 bg-[var(--background)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
          <div className="text-center mb-14">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Applications
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Products Manufactured Using Our
              <span className="text-[var(--primary)]"> PVC Pipe Plant</span>
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-[var(--text-secondary)] leading-8">
              HPMC Single Screw Extruders are widely used for manufacturing a
              variety of PVC pipes and profiles for infrastructure, agriculture,
              construction, and industrial applications.
            </p>
          </div>

    
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="applications-swiper"
          >
            {applications.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="
              group
              relative
              h-[320px]
              rounded-[20px]
              overflow-hidden
              cursor-pointer
            "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                object-cover
                transition-all
                duration-700
                group-hover:scale-110
              "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-white text-2xl font-bold">
                      {item.title}
                    </h3>

                    <p className="text-white/80 mt-3 leading-6">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}

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
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Everything About Our
              <span className="text-[var(--primary)]">
                {" "}
                Twin Screw Plant For PVC Trunking
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
