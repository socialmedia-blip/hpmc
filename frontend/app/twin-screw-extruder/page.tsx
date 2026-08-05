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
  "/products/conical-twin-screw-extruder.jpg",
  "/products/tse/tse1.jpg",
  "/products/tse/tse2.jpg",
  "/products/tse/tse3.jpg",
];

const features = [
  {
    title: "Forged Alloy Steel Die Head",
    desc: "Manufactured from high carbon content forged alloy steel, the die head delivers superior durability, longer service life, and reliable performance for PVC pipe production.",
    image: "/products/tse/sse1.jpg",
    highlights: [
      "Forged alloy steel construction",
      "High carbon content",
      "Extended service life",
    ],
  },

  {
    title: "Spray Cooling Bath",
    desc: "Designed for intensive pipe cooling using multiple self-cleaning spray nozzles. The tank features axial adjustment on slide rails with locking arrangements and an acrylic transparent cover for easy inspection.",
    image: "/products/tse/tse1.jpg",
    highlights: [
      "Self-cleaning spray nozzles",
      "Axial tank adjustment",
      "Transparent inspection cover",
    ],
  },

  {
    title: "Pneumatic Caterpuller Haul-Off",
    desc: "Twin and multi-track haul-off system with pneumatic pressure adjustment and AC frequency variable drive synchronization. Suitable for pipe sizes ranging from 20mm to 315mm.",
    image: "/products/tse/tse2.jpg",
    highlights: [
      "20mm–315mm pipe range",
      "AC drive synchronized",
      "Pneumatic track adjustment",
    ],
  },

  {
    title: "Planetary Cutting Saw",
    desc: "PLC-controlled planetary cutting system designed for pipe diameters up to 315mm. Equipped with hard alloy saw blades and a dust extraction system for clean and efficient cutting.",
    image: "/products/tse/tse3.jpg",
    highlights: [
      "PLC controlled cutting",
      "Up to 315mm pipe diameter",
      "Dust extraction system",
    ],
  },

  {
    title: "Automatic Cutting Unit",
    desc: "Features a carborundum cutter for reduced material wastage and smooth cutting. Pneumatic cylinders and adjustable clamping force ensure accurate cutting across different wall thicknesses.",
    image: "/products/tse/sse4.jpg",
    highlights: [
      "Low-wastage cutting",
      "Adjustable clamping force",
      "Length sensing limit switch",
    ],
  },

  {
    title: "Automatic Tipping Chute",
    desc: "Operated through pneumatic cylinders and limit switches, the tipping chute ensures efficient pipe stacking and smooth handling during continuous production.",
    image: "/products/tse/sse5.jpg",
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
    question: "What is a Conical Twin Screw Extruder?",
    answer:
      "A Conical Twin Screw Extruder is a high-performance plastic processing machine specially designed for manufacturing PVC pipes, profiles, conduits, and other rigid PVC products with excellent plasticizing efficiency and consistent output.",
  },
  {
    question: "How does a Conical Twin Screw Extruder work?",
    answer:
      "The machine uses two conical intermeshing screws that efficiently melt, mix, compress, and convey PVC material through the die to produce high-quality pipes with excellent dimensional accuracy.",
  },
  {
    question:
      "Which materials can be processed using a Conical Twin Screw Extruder?",
    answer:
      "The machine is primarily designed for rigid PVC compounds and can process PVC raw materials used in pipe, conduit, profile, and other extrusion applications.",
  },
  {
    question: "What is a PVC Pipe Plant?",
    answer:
      "A PVC Pipe Plant is a complete extrusion system that includes a Conical Twin Screw Extruder, vacuum sizing tank, cooling system, haul-off unit, cutting machine, and pipe stacking system for manufacturing PVC pipes.",
  },
  {
    question:
      "Which products can be manufactured using a Conical Twin Screw Extruder?",
    answer:
      "The machine is widely used for manufacturing PVC water pipes, agricultural pipes, conduit pipes, plumbing pipes, electrical conduits, casing pipes, and industrial PVC pipe products.",
  },
  {
    question:
      "Which is the best Conical Twin Screw Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance Conical Twin Screw Extruders engineered for superior PVC processing, energy efficiency, and reliable long-term industrial production.",
  },
  {
    question: "Who is the best PVC Pipe Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of PVC Pipe Plants, offering advanced extrusion technology, customized solutions, and dependable after-sales support.",
  },
  {
    question: "What are the advantages of a Conical Twin Screw Extruder?",
    answer:
      "It provides superior plasticizing, excellent mixing, higher output, stable extrusion, lower energy consumption, and consistent PVC pipe quality.",
  },
  {
    question:
      "Why is a Conical Twin Screw Extruder preferred for PVC pipe manufacturing?",
    answer:
      "Its conical screw design generates high torque and excellent material compression, making it ideal for processing rigid PVC compounds efficiently.",
  },
  {
    question: "What pipe sizes can be manufactured using this machine?",
    answer:
      "Depending on the selected model and downstream equipment, the machine can manufacture PVC pipes in various diameters for plumbing, agriculture, drainage, and industrial applications.",
  },
  {
    question: "Can the machine produce pressure pipes?",
    answer:
      "Yes. The Conical Twin Screw Extruder is suitable for manufacturing pressure pipes used in water supply, irrigation, and industrial piping systems.",
  },
  {
    question: "Can electrical conduit pipes be manufactured?",
    answer:
      "Yes. The machine is widely used for manufacturing PVC electrical conduit pipes with smooth surface finish and consistent dimensions.",
  },
  {
    question: "What industries use Conical Twin Screw Extruders?",
    answer:
      "Construction, agriculture, infrastructure, plumbing, electrical, irrigation, and plastic processing industries extensively use these extrusion machines.",
  },
  {
    question: "What makes the Barrier Screw design beneficial?",
    answer:
      "Barrier Screw technology improves melt homogeneity, enhances plasticizing efficiency, reduces material degradation, and delivers superior PVC pipe quality.",
  },
  {
    question: "Why is a bi-metallic screw and barrel important?",
    answer:
      "A bi-metallic screw and barrel provide excellent wear resistance, longer service life, improved processing stability, and reduced maintenance costs.",
  },
  {
    question: "Can recycled PVC material be processed?",
    answer:
      "Yes. Depending on the formulation and material quality, compatible recycled PVC can be blended with virgin material for various extrusion applications.",
  },
  {
    question:
      "What is the production capacity of a Conical Twin Screw Extruder?",
    answer:
      "Production capacity depends on the selected model, raw material, and pipe size, with machines capable of delivering high-output industrial production.",
  },
  {
    question: "How does the machine improve PVC pipe quality?",
    answer:
      "Uniform melting, stable pressure, efficient plasticizing, and precise temperature control help produce smooth, dimensionally accurate PVC pipes.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The Conical Twin Screw Extruder is designed for continuous industrial production with reliable performance and consistent output.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient drive systems, and advanced heating control help reduce energy consumption while maintaining high productivity.",
  },
  {
    question: "Can the PVC Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized PVC Pipe Plants based on pipe diameter, production capacity, automation level, and customer requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC pipe manufacturing business?",
    answer:
      "Yes. It is an ideal solution for entrepreneurs and manufacturers looking to establish or expand a PVC pipe production business with reliable and efficient machinery.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for PVC Pipe Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered PVC Pipe Plants with advanced extrusion technology, durable components, energy-efficient operation, and comprehensive technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top PVC Pipe Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, and dependable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question: "How can I get the best price for a Conical Twin Screw Extruder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your pipe size, production capacity, and project requirements to receive a customized quotation and the most suitable machine recommendation.",
  },
  {
    question: "What is the price of a Conical Twin Screw Extruder in India?",
    answer:
      "The price of a Conical Twin Screw Extruder depends on the machine model, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PVC Pipe Plant for my business?",
    answer:
      "The right PVC Pipe Plant depends on the required pipe diameter, production capacity, raw material, automation level, and future expansion plans.",
  },
  {
    question: "Which is the best PVC Pipe Making Machine in India?",
    answer:
      "A Conical Twin Screw Extruder from Hindustan Plastics and Machine Corporation is an excellent choice for manufacturing high-quality PVC pipes with reliable performance, energy efficiency, and consistent output.",
  },
  {
    question: "Can the Conical Twin Screw Extruder be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized machine configurations, screw designs, downstream equipment, and automation options to meet specific production requirements.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Multiple machine models are available to suit small, medium, and large-scale PVC pipe manufacturing with different output capacities.",
  },
  {
    question: "How much electricity does a PVC Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, pipe diameter, and operating conditions. The machines are designed for energy-efficient production.",
  },
  {
    question: "Is the Conical Twin Screw Extruder energy efficient?",
    answer:
      "Yes. Advanced screw geometry, optimized heating zones, and efficient drive systems help reduce energy consumption while maintaining high production output.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The Conical Twin Screw Extruder is designed for continuous industrial production with stable operation and consistent pipe quality.",
  },
  {
    question: "Does the PVC Pipe Plant include PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen is available for easy operation, production monitoring, alarm management, and process control.",
  },
  {
    question: "Can production parameters be saved?",
    answer:
      "Yes. Operators can store and recall processing recipes, reducing setup time and ensuring consistent PVC pipe production.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for uniform melting, improved plasticizing, and superior pipe quality.",
  },
  {
    question:
      "Can different pipe sizes be manufactured using the same machine?",
    answer:
      "Yes. By changing dies, calibration sleeves, and related tooling, the machine can produce different PVC pipe sizes within its specified range.",
  },
  {
    question: "How often does the machine require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, and periodic inspection of wear parts help maximize machine life and production efficiency.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient maintenance, allowing easy inspection and replacement of wear components when required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, production trials, and startup assistance are provided by experienced engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Professional operator training is provided to ensure safe operation, efficient production, and proper machine maintenance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimize production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical assistance, maintenance support, spare parts, troubleshooting, and process optimization services.",
  },
  {
    question: "Can I request a live machine demonstration?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchase.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer materials can be performed to verify machine performance, pipe quality, and production output.",
  },
  {
    question:
      "Can the PVC Pipe Plant be integrated into an existing production line?",
    answer:
      "Yes. The Conical Twin Screw Extruder can be integrated with existing downstream equipment, calibration tanks, haul-off units, cutting machines, and pipe stacking systems.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC pipe manufacturing business?",
    answer:
      "Yes. It is an ideal investment for entrepreneurs and manufacturers planning to establish or expand a profitable PVC pipe manufacturing business.",
  },
  {
    question: "Can the machine manufacture PVC pipes for different industries?",
    answer:
      "Yes. It is suitable for producing pipes used in water supply, irrigation, drainage, electrical conduit, plumbing, and industrial applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, durable machine construction, advanced extrusion technology, and dependable after-sales support to deliver reliable PVC pipe production solutions.",
  },
  {
    question:
      "How can I get the best quotation for a Conical Twin Screw Extruder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your pipe size, production capacity, and project requirements to receive a customized quotation and expert guidance.",
  },
  {
    question:
      "Can the Conical Twin Screw Extruder process recycled PVC material?",
    answer:
      "Yes. The machine can process compatible recycled PVC blends along with virgin material, depending on the product specifications and formulation.",
  },
  {
    question:
      "Can different PVC formulations be processed on the same machine?",
    answer:
      "Yes. By adjusting processing parameters and tooling, the machine can handle various rigid PVC formulations for different pipe applications.",
  },
  {
    question: "Can the machine manufacture UPVC pipes?",
    answer:
      "Yes. The Conical Twin Screw Extruder is ideal for manufacturing UPVC pipes used in plumbing, agriculture, drainage, and water supply applications.",
  },
  {
    question: "Can CPVC pipes be manufactured using this machine?",
    answer:
      "Depending on the machine configuration and processing requirements, compatible CPVC pipe formulations can also be processed.",
  },
  {
    question: "Can the PVC Pipe Plant produce agricultural irrigation pipes?",
    answer:
      "Yes. The machine is widely used for manufacturing agricultural irrigation pipes with excellent dimensional accuracy and long service life.",
  },
  {
    question: "Can the machine manufacture plumbing pipes?",
    answer:
      "Yes. It is suitable for manufacturing PVC plumbing pipes used in residential, commercial, and industrial water distribution systems.",
  },
  {
    question: "Can the machine manufacture electrical conduit pipes?",
    answer:
      "Yes. The extrusion line produces smooth, durable PVC electrical conduit pipes for cable protection and electrical installations.",
  },
  {
    question: "How does the Conical Twin Screw Extruder improve pipe quality?",
    answer:
      "Uniform plasticizing, stable melt pressure, precise temperature control, and efficient screw design help produce PVC pipes with smooth surfaces and consistent wall thickness.",
  },
  {
    question: "Can this machine reduce manufacturing costs?",
    answer:
      "Yes. Energy-efficient operation, higher production output, lower material wastage, and reliable performance help reduce the overall cost of PVC pipe production.",
  },
  {
    question: "What is the expected lifespan of a Conical Twin Screw Extruder?",
    answer:
      "With regular maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the PVC Pipe Plant be upgraded in the future?",
    answer:
      "Yes. Automation systems, downstream equipment, dies, calibration units, and control systems can be upgraded as production requirements increase.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture Conical Twin Screw Extruders in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation designs and manufactures advanced Conical Twin Screw Extruders in India using precision engineering and modern manufacturing technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PVC Pipe Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies PVC Pipe Plants and extrusion machinery to customers across India and international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PVC Pipe Plant can be integrated into existing production facilities with customized layouts and compatible downstream equipment.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, machine guidance, and process optimization support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide process optimization support?",
    answer:
      "Yes. Our technical experts help optimize machine settings, material processing, production efficiency, and overall extrusion performance.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required spare parts are readily available for quick dispatch to minimize production downtime.",
  },
  {
    question:
      "Can I visit the Hindustan Plastics and Machine Corporation manufacturing facility?",
    answer:
      "Yes. Customers are welcome to visit our manufacturing facility to inspect machine production, quality control processes, and discuss project requirements with our engineering team.",
  },
  {
    question: "Can machine trials be conducted before purchase?",
    answer:
      "Yes. Trial runs can be arranged using customer materials to evaluate machine performance, production output, and finished pipe quality.",
  },
  {
    question: "Is the PVC Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine is designed with energy-efficient technology that helps reduce power consumption, material waste, and overall manufacturing costs.",
  },
  {
    question: "Which industries use Conical Twin Screw Extruders?",
    answer:
      "Construction, infrastructure, agriculture, plumbing, electrical, irrigation, chemical processing, and plastic manufacturing industries widely use these extrusion machines.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best PVC Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is known for precision-engineered extrusion machinery, advanced PVC processing technology, customized solutions, reliable after-sales support, and decades of manufacturing expertise.",
  },
  {
    question:
      "Who is the top Conical Twin Screw Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized by customers for delivering high-performance Conical Twin Screw Extruders with excellent productivity, energy efficiency, and dependable technical support.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your PVC Pipe Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized PVC Pipe Plant solutions, timely service support, and long-term reliability.",
  },
  {
    question:
      "Why is the Conical Twin Screw Extruder one of the best machines for PVC pipe manufacturing?",
    answer:
      "Its high-torque conical screw design, efficient plasticizing, stable extrusion process, low energy consumption, and consistent pipe quality make it one of the preferred solutions for modern PVC pipe manufacturing.",
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
      <title>Conical Twin Screw Extruder Manufacturer | HPMC</title>

      <meta
        name="description"
        content="Explore HPMC twin screw extruders designed for PVC processing, compounding, and high-performance extrusion applications."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/twin-screw-extruder"
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
              Conical Twin Screw
              <span className="text-[#65BC4F]"> Extruder</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Conical Twin Screw Extruders are engineered for
              high-efficiency PVC pipe production with superior plasticizing
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
              Conical Twin Screw Extruder
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
                HPMC Conical Twin Screw Extruders for PVC Pipe Plants are
                available in HPMC 45/90, HPMC 51/105, HPMC 65/132, HPMC 80/156,
                and HPMC 92/188 models. The extruders are equipped with a
                compact and reliable gearbox along with bi-metallic screw and
                barrel technology for longer service life and dependable
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
                    <div className="relative bg-gradient-to-br from-white to-[#f5f7f8]">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain p-8"
                      />
                    </div>
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
                Twin Screw Extruder
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
