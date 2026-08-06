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
  "/products/TWIN-SCREW-PLANT-FOR-PVC-PROFILE.jpeg",
  "/products/pvc profile extruder/twin screw/automatic.png",
  "/products/pvc profile extruder/twin screw/cutting.png",
  "/products/pvc profile extruder/twin screw/Vaccum-Callobration-Tank-1.jpg",
];
const faqData = [
  {
    question: "What is a Twin Screw Plant for PVC Profile?",
    answer:
      "A Twin Screw Plant for PVC Profile is an advanced extrusion system used to manufacture high-quality PVC profiles for doors, windows, wall panels, partitions, cable trunking, decorative trims, and customized construction applications.",
  },
  {
    question: "How does a Twin Screw PVC Profile Extrusion Plant work?",
    answer:
      "The plant melts and plasticizes PVC compounds using a twin screw extruder, then shapes the material through a profile die, followed by vacuum calibration, cooling, haul-off, and cutting to produce finished PVC profiles.",
  },
  {
    question:
      "Which materials can be processed using a PVC Profile Extrusion Plant?",
    answer:
      "The machine processes rigid PVC compounds, high-calcium PVC formulations, profile-grade PVC materials, recycled PVC blends, and customized PVC profile compounds.",
  },
  {
    question: "Which products can be manufactured using a PVC Profile Plant?",
    answer:
      "The machine manufactures PVC door profiles, window profiles, false ceiling profiles, wall panels, partitions, decorative trims, cable trunking, fencing profiles, furniture profiles, and customized PVC sections.",
  },
  {
    question: "What are PVC profiles used for?",
    answer:
      "PVC profiles are widely used in residential buildings, commercial projects, office interiors, modular furniture, cable management systems, partitions, doors, windows, and decorative construction applications.",
  },
  {
    question:
      "Which is the best PVC Profile Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best PVC Profile Extrusion Machine manufacturers in India, offering advanced Twin Screw Plants with high productivity, excellent profile quality, and reliable long-term performance.",
  },
  {
    question:
      "Who is the top PVC Profile Making Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures precision-engineered PVC Profile Making Machines trusted by profile manufacturers across India and international markets.",
  },
  {
    question: "What are the advantages of a Twin Screw PVC Profile Plant?",
    answer:
      "The machine offers superior mixing, excellent plasticization, high production output, consistent profile dimensions, smooth surface finish, low power consumption, and stable extrusion performance.",
  },
  {
    question:
      "Why is a Twin Screw Extruder preferred for PVC profile manufacturing?",
    answer:
      "Twin Screw Extruders provide better material fusion, uniform additive dispersion, stable melt pressure, and improved profile quality, making them ideal for PVC profile production.",
  },
  {
    question: "Can the machine process high-calcium PVC formulations?",
    answer:
      "Yes. The Twin Screw Plant efficiently processes high-calcium PVC compounds while maintaining profile strength, dimensional stability, and surface finish.",
  },
  {
    question: "Can customized PVC profile sections be manufactured?",
    answer:
      "Yes. The extrusion line supports customized profile dies to manufacture unique PVC sections based on customer drawings and application requirements.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Production capacity depends on the selected machine model, profile design, raw material formulation, and extrusion configuration. Customized solutions are available for different production needs.",
  },
  {
    question: "How does the Twin Screw Plant improve PVC profile quality?",
    answer:
      "Uniform plasticization, stable extrusion pressure, efficient cooling, and precise calibration ensure smooth surfaces, accurate dimensions, and consistent profile quality.",
  },
  {
    question: "Which industries use PVC Profile Extrusion Plants?",
    answer:
      "Construction companies, window and door manufacturers, furniture industries, interior designers, electrical industries, infrastructure projects, and modular building manufacturers widely use PVC Profile Plants.",
  },
  {
    question: "Can the machine manufacture PVC door and window profiles?",
    answer:
      "Yes. The machine is specifically designed for manufacturing high-quality PVC door frames, window frames, sliding window profiles, and customized architectural profiles.",
  },
  {
    question: "Can the machine manufacture PVC wall panel profiles?",
    answer:
      "Yes. The extrusion line produces PVC wall panel profiles used in interior decoration, modular buildings, ceilings, and commercial construction.",
  },
  {
    question: "Can the machine manufacture cable trunking profiles?",
    answer:
      "Yes. The plant is suitable for producing PVC cable trunking and cable management profiles used in residential, commercial, and industrial electrical installations.",
  },
  {
    question:
      "Is the Twin Screw PVC Profile Plant suitable for continuous production?",
    answer:
      "Yes. The machine is engineered for continuous industrial production with stable output, minimal downtime, and reliable long-term performance.",
  },
  {
    question: "Is the PVC Profile Extrusion Machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient drive systems, and advanced extrusion technology help reduce energy consumption while maintaining high productivity.",
  },
  {
    question: "Can the PVC Profile Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized profile dies, extrusion lines, automation systems, downstream equipment, and complete production solutions.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC profile manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a PVC profile manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for PVC Profile Extrusion Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered PVC Profile Plants with advanced extrusion technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Profile Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers worldwide.",
  },
  {
    question: "Can the machine manufacture export-quality PVC profiles?",
    answer:
      "Yes. The machine is capable of producing high-quality PVC profiles suitable for domestic as well as international markets.",
  },
  {
    question:
      "How can I get the best price for a Twin Screw PVC Profile Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your profile design, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a Twin Screw PVC Profile Plant in India?",
    answer:
      "The price of a Twin Screw PVC Profile Plant depends on the machine model, profile design, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PVC Profile Extrusion Machine?",
    answer:
      "The ideal PVC Profile Extrusion Machine depends on your profile design, production capacity, PVC formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best PVC Profile Making Machine in India?",
    answer:
      "Twin Screw PVC Profile Plants from Hindustan Plastics and Machine Corporation are designed for excellent profile quality, high productivity, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the Twin Screw PVC Profile Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized profile dies, calibration tables, haul-off units, cutting systems, stacking solutions, and PLC automation based on customer requirements.",
  },
  {
    question: "Can one machine manufacture different PVC profile designs?",
    answer:
      "Yes. By changing the extrusion die and calibration tooling, the machine can manufacture multiple PVC profile designs using the same extrusion line.",
  },
  {
    question:
      "How much electricity does a PVC Profile Extrusion Machine consume?",
    answer:
      "Power consumption depends on the machine model, profile size, production output, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables easy operation, production monitoring, parameter adjustment, alarm management, and improved process control.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall production parameters for different PVC profile designs, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating and cooling zones provide precise temperature control for uniform PVC plasticization and stable profile extrusion.",
  },
  {
    question: "Can recycled PVC material be processed?",
    answer:
      "Yes. Depending on the formulation and application, the machine can process recycled PVC blends along with virgin PVC compounds.",
  },
  {
    question: "How often does the PVC Profile Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of screw elements, gearbox, barrel sections, heaters, cooling systems, and electrical components helps ensure reliable long-term performance.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The modular design allows convenient inspection and maintenance, helping reduce downtime and maintenance costs.",
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
      "Yes. Live demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied PVC compounds can be conducted to verify machine performance and finished profile quality.",
  },
  {
    question:
      "Can the PVC Profile Plant be integrated into an existing production line?",
    answer:
      "Yes. The machine can be integrated with existing material feeding systems, printing units, stacking systems, and downstream profile handling equipment.",
  },
  {
    question: "Can the machine manufacture PVC profiles for modular furniture?",
    answer:
      "Yes. The extrusion line is suitable for producing PVC profiles used in modular furniture, wardrobes, cabinets, kitchen systems, and decorative applications.",
  },
  {
    question: "Can the machine manufacture decorative PVC trims and mouldings?",
    answer:
      "Yes. The machine can produce decorative trims, mouldings, edge profiles, ceiling profiles, and customized architectural PVC sections.",
  },
  {
    question:
      "Can the machine manufacture PVC profiles for electrical applications?",
    answer:
      "Yes. The extrusion line manufactures PVC cable trunking, wiring ducts, conduit accessories, and electrical profile sections.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Profile Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC profile production systems.",
  },
  {
    question: "Can the PVC Profile Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with automation, customized tooling, and additional downstream equipment as production requirements increase.",
  },
  {
    question:
      "How can I get the best quotation for a Twin Screw PVC Profile Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your profile drawings, production capacity, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Twin Screw PVC Profile Plant process different PVC formulations?",
    answer:
      "Yes. The machine is designed to process rigid PVC compounds, profile-grade PVC formulations, high-calcium PVC blends, recycled PVC blends, and customized formulations for different profile applications.",
  },
  {
    question: "Can the machine manufacture uPVC window and door profiles?",
    answer:
      "Yes. The extrusion line is suitable for manufacturing high-quality uPVC window frames, door frames, sliding window profiles, and customized architectural sections.",
  },
  {
    question:
      "Can the machine manufacture PVC wall panels and ceiling profiles?",
    answer:
      "Yes. The machine produces PVC wall panels, ceiling profiles, decorative panels, and interior finishing profiles for residential and commercial buildings.",
  },
  {
    question:
      "Can the machine manufacture PVC cable trunking and wiring ducts?",
    answer:
      "Yes. The machine is widely used for manufacturing PVC cable trunking, wiring ducts, electrical conduit accessories, and cable management profiles.",
  },
  {
    question:
      "Can the Twin Screw PVC Profile Plant manufacture profiles that meet international quality standards?",
    answer:
      "Yes. With suitable tooling, quality PVC compounds, and controlled processing, the machine can manufacture profiles that comply with applicable national and international standards.",
  },
  {
    question:
      "How does the Twin Screw PVC Profile Plant improve profile quality?",
    answer:
      "Efficient plasticization, uniform material flow, precise temperature control, accurate calibration, and stable extrusion pressure produce PVC profiles with smooth surfaces, excellent strength, and consistent dimensions.",
  },
  {
    question:
      "Can PVC profiles manufactured on this machine be used in residential and commercial projects?",
    answer:
      "Yes. The machine manufactures PVC profiles widely used in homes, apartments, commercial buildings, shopping malls, offices, hotels, hospitals, schools, and industrial projects.",
  },
  {
    question: "Can this machine reduce PVC profile manufacturing costs?",
    answer:
      "Yes. High production efficiency, optimized energy consumption, reduced material wastage, and stable processing help lower the overall manufacturing cost of PVC profiles.",
  },
  {
    question:
      "What is the expected lifespan of a Twin Screw PVC Profile Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the PVC Profile Plant be upgraded in the future?",
    answer:
      "Yes. The machine can be upgraded with new profile dies, automation systems, calibration equipment, downstream machinery, and customized accessories as production requirements grow.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture PVC Profile Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Twin Screw PVC Profile Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PVC Profile Extrusion Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports PVC Profile Extrusion Machines and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PVC Profile Plant can be integrated into existing manufacturing facilities with customized layouts and compatible downstream equipment.",
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
      "Yes. Our technical experts assist customers in optimizing machine settings, PVC formulations, extrusion parameters, and overall profile production efficiency.",
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
      "Yes. Trial production can be arranged using customer-supplied PVC compounds and profile dies to evaluate machine performance and finished profile quality.",
  },
  {
    question: "Is the Twin Screw PVC Profile Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question: "Which industries benefit from Twin Screw PVC Profile Plants?",
    answer:
      "Window and door manufacturers, furniture manufacturers, construction companies, modular building manufacturers, electrical industries, interior designers, infrastructure developers, and plastic profile manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture PVC profiles for smart buildings and modern infrastructure projects?",
    answer:
      "Yes. The machine is ideal for manufacturing PVC profiles used in smart buildings, commercial complexes, residential projects, industrial facilities, modular construction, and modern infrastructure developments.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best PVC Profile Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable PVC profile production systems.",
  },
  {
    question:
      "Who is the top PVC Profile Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance Twin Screw PVC Profile Plants with excellent productivity, energy efficiency, and consistent profile quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your PVC Profile Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Twin Screw PVC Profile Plant one of the best solutions for PVC profile manufacturing?",
    answer:
      "Its superior plasticization, stable extrusion process, excellent dimensional accuracy, energy-efficient operation, and reliable industrial performance make it an ideal solution for manufacturing premium-quality PVC profiles.",
  },
];

export default function TwinScrewPlantForPvcProfile() {
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
      <title>Twin Screw Plant for PVC Profile | HPMC</title>

      <meta
        name="description"
        content="Twin screw PVC profile extrusion plants delivering precision manufacturing and superior production performance."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/twin-screw-plant-for-pvc-profile"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/pvc-profile.png')",
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
              <span className="text-[#65BC4F]"> For PVC Profile</span>
            </h1>
            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              We manufacture and export Twin Screw Plants for PVC Profile
              production, along with Plastic Extruders, PVC Pipe Plants, HDPE
              Pipe Plants, Recycling Machines, Compounding Extruders, and other
              plastic processing machinery. Our systems are designed for
              efficient operation, reliable performance, and long service life.
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
            PVC Profile Exturder -
            <span className="text-[var(--primary)]">
              {" "}
              Twin Screw Plant For PVC Profile
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
                PVC Pipe Plants, HDPE Pipe Plants, Recycling Machines, Plastic
                Reprocessing Plants, Co-Rotating Extruders, Compounding
                Extruders, and Plastic Profile Machinery.
              </p>
              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Our machinery is engineered for efficient operation, reliable
                performance, and long service life, providing dependable
                solutions for various plastic extrusion and manufacturing
                applications.
              </p>
              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Twin Screw Extruders",
                  "PVC Pipe Plants",
                  "HDPE Pipe Plants",
                  "Plastic Profile Machinery",
                  "Recycling Machines",
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
                    Machine Types{" "}
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
                    Customer Support{" "}
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
                Twin Screw Plant For PVC Profile
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
