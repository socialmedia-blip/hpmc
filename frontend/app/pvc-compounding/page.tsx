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

const galleryImages = ["/products/wpc/sspfpc.png"];

const faqData = [
  {
    question: "What is a Twin Screw Extruder for PVC Compounding?",
    answer:
      "A Twin Screw Extruder for PVC Compounding is an advanced plastic processing machine used to blend PVC resin, stabilizers, fillers, additives, and modifiers into high-quality PVC compounds with consistent properties.",
  },
  {
    question: "How does a PVC Compounding Extruder work?",
    answer:
      "The machine melts, mixes, disperses, and homogenizes PVC raw materials using twin screws before converting the compound into uniform pellets for downstream plastic manufacturing.",
  },
  {
    question:
      "Which materials can be processed using a PVC Compounding Extruder?",
    answer:
      "The machine processes PVC resin, polymer blends, engineering plastics, masterbatches, calcium carbonate-filled compounds, additives, stabilizers, and reinforced plastic compounds.",
  },
  {
    question:
      "Which products can be manufactured using a PVC Compounding Extruder?",
    answer:
      "It is widely used for manufacturing PVC compounds for pipes, cable insulation, profiles, fittings, sheets, footwear, medical products, and engineering plastic applications.",
  },
  {
    question: "What is PVC compounding?",
    answer:
      "PVC compounding is the process of mixing PVC resin with additives, stabilizers, lubricants, pigments, fillers, and modifiers to produce customized PVC compounds with specific performance characteristics.",
  },
  {
    question:
      "Which is the best PVC Compounding Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Twin Screw PVC Compounding Extruders engineered for high productivity, excellent mixing, energy efficiency, and long-term industrial performance.",
  },
  {
    question: "Who is the best PVC Compounding Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of PVC Compounding Extruders, offering customized solutions, precision engineering, and dependable after-sales support.",
  },
  {
    question:
      "What are the advantages of a Twin Screw PVC Compounding Extruder?",
    answer:
      "The machine provides excellent mixing, uniform additive dispersion, stable processing, higher output, energy-efficient operation, and consistent pellet quality.",
  },
  {
    question: "Why is a Twin Screw Extruder preferred for PVC compounding?",
    answer:
      "Twin Screw Extruders provide superior mixing, better filler distribution, improved additive dispersion, precise temperature control, and excellent compound consistency compared to conventional extrusion systems.",
  },
  {
    question: "Which industries use PVC Compounding Extruders?",
    answer:
      "Pipe manufacturing, cable production, automotive, construction, electrical products, footwear, medical plastics, packaging, and polymer processing industries extensively use PVC Compounding Extruders.",
  },
  {
    question: "Can the machine process high-filler PVC compounds?",
    answer:
      "Yes. The machine is designed to process high-filler PVC formulations while maintaining excellent dispersion, stable extrusion, and superior compound quality.",
  },
  {
    question: "Can engineering plastics be processed?",
    answer:
      "Yes. The Twin Screw Extruder can process several engineering plastics and customized polymer blends for industrial applications.",
  },
  {
    question: "Can polymer blending be performed on this machine?",
    answer:
      "Yes. The machine is ideal for polymer blending, additive incorporation, filler modification, and customized compound manufacturing.",
  },
  {
    question: "Can glass fiber reinforced compounds be manufactured?",
    answer:
      "Yes. The machine supports glass fiber reinforcement while maintaining uniform distribution and minimizing fiber damage during processing.",
  },
  {
    question: "What are the benefits of pellet production?",
    answer:
      "Pellet production creates uniform PVC granules that are easier to store, transport, feed into downstream machines, and maintain consistent product quality.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Depending on the selected model, production capacities range from approximately 150 kg/hr to 350 kg/hr, making the machine suitable for medium and high-volume production.",
  },
  {
    question: "How does the machine improve PVC compound quality?",
    answer:
      "Efficient plasticizing, homogeneous mixing, accurate temperature control, and stable screw design ensure consistent PVC compound quality and uniform pellet production.",
  },
  {
    question:
      "Is the PVC Compounding Extruder suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with reliable performance, stable output, and minimal downtime.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient drive systems, and advanced process control help reduce energy consumption while maintaining high productivity.",
  },
  {
    question: "Can the PVC Compounding Extruder be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized screw configurations, feeding systems, pelletizing options, automation, and machine layouts based on customer requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC compounding business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a PVC compound manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for PVC Compounding Extruders?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered PVC Compounding Extruders with advanced technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top PVC Compounding Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, quality manufacturing, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question:
      "Can the machine manufacture PVC compounds for cable applications?",
    answer:
      "Yes. The machine is widely used for producing PVC cable compounds with excellent dispersion, flexibility, and electrical insulation properties.",
  },
  {
    question: "How can I get the best price for a PVC Compounding Extruder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your production capacity, raw material details, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a PVC Compounding Extruder in India?",
    answer:
      "The price of a PVC Compounding Extruder depends on the machine model, production capacity, screw configuration, automation level, and pelletizing system. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PVC Compounding Machine?",
    answer:
      "The ideal machine depends on production capacity, PVC formulation, filler percentage, pelletizing requirements, automation level, and future expansion plans.",
  },
  {
    question: "Which is the best PVC Compounding Machine in India?",
    answer:
      "Twin Screw PVC Compounding Extruders from Hindustan Plastics and Machine Corporation are engineered for high productivity, superior mixing, energy efficiency, and consistent compound quality.",
  },
  {
    question: "Can the PVC Compounding Extruder be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized screw designs, feeding systems, pelletizing units, automation options, and complete compounding lines based on customer requirements.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Different machine models are available for medium and high-volume PVC compounding with production capacities based on the selected model and material formulation.",
  },
  {
    question: "How much electricity does a PVC Compounding Machine consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, formulation, and operating conditions. The machine is designed for energy-efficient production.",
  },
  {
    question: "Is the PVC Compounding Extruder energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient drive systems, and advanced process controls help reduce energy consumption while maximizing production output.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The PVC Compounding Extruder is designed for continuous industrial production with stable operation, reliable performance, and consistent compound quality.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen is available for production monitoring, process control, alarm management, and easy machine operation.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall processing parameters for different PVC formulations, helping improve consistency and reduce setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for uniform melting, efficient mixing, and high-quality PVC compounds.",
  },
  {
    question: "Can different PVC formulations be processed on one machine?",
    answer:
      "Yes. By adjusting screw configuration and processing parameters, the machine can process various PVC compounds and customized formulations.",
  },
  {
    question:
      "How often does the PVC Compounding Extruder require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of screw elements, barrel sections, gearbox, and electrical systems help maximize machine life and production efficiency.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The modular screw and barrel design allows convenient inspection, maintenance, and replacement of wear components.",
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
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable performance and minimize production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical assistance, troubleshooting, preventive maintenance, spare parts support, and production optimization services.",
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
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance and compound quality.",
  },
  {
    question:
      "Can the PVC Compounding Extruder be integrated into an existing production line?",
    answer:
      "Yes. The machine can be integrated with existing feeding systems, pelletizers, cooling systems, storage units, and downstream processing equipment.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC compound manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a PVC compound manufacturing business.",
  },
  {
    question:
      "Can the machine manufacture PVC compounds for different industries?",
    answer:
      "Yes. The machine produces PVC compounds for pipes, cables, profiles, fittings, footwear, automotive parts, construction materials, and engineering plastic applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Compounding Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced compounding technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC compounding systems.",
  },
  {
    question:
      "How can I get the best quotation for a PVC Compounding Extruder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your production capacity, raw material details, formulation requirements, and application to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Twin Screw PVC Compounding Extruder process recycled PVC materials?",
    answer:
      "Yes. The machine can process compatible recycled PVC materials along with virgin PVC resin, depending on the required formulation and end-use application.",
  },
  {
    question:
      "Can different PVC formulations be processed on the same machine?",
    answer:
      "Yes. By changing screw configurations and processing parameters, the machine can efficiently process rigid PVC, flexible PVC, and customized PVC compound formulations.",
  },
  {
    question: "Can the machine manufacture PVC cable compounds?",
    answer:
      "Yes. The Twin Screw Extruder is widely used for producing PVC cable compounds with excellent dispersion, flexibility, and electrical insulation properties.",
  },
  {
    question: "Can the machine produce PVC compounds for pipe manufacturing?",
    answer:
      "Yes. The machine manufactures high-quality PVC compounds used in PVC pipes, fittings, conduit pipes, profiles, and other extrusion products.",
  },
  {
    question:
      "Can the PVC Compounding Extruder manufacture medical-grade PVC compounds?",
    answer:
      "Yes. With suitable formulations and processing conditions, the machine can produce PVC compounds for medical and healthcare applications where applicable standards are met.",
  },
  {
    question:
      "How does the Twin Screw PVC Compounding Extruder improve compound quality?",
    answer:
      "Efficient mixing, homogeneous additive dispersion, accurate temperature control, and stable extrusion help produce uniform PVC compounds with consistent physical and mechanical properties.",
  },
  {
    question:
      "Can PVC compounds produced on this machine be used in different industries?",
    answer:
      "Yes. The compounds are widely used in pipe manufacturing, cable insulation, automotive components, construction products, footwear, packaging, medical products, and engineering plastic applications.",
  },
  {
    question: "Can this machine reduce PVC compound manufacturing costs?",
    answer:
      "Yes. High production efficiency, optimized energy consumption, reduced material wastage, and stable processing help lower the overall cost of PVC compound production.",
  },
  {
    question:
      "What is the expected lifespan of a Twin Screw PVC Compounding Extruder?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the PVC Compounding Extruder be upgraded in the future?",
    answer:
      "Yes. Screw elements, feeding systems, pelletizing units, automation controls, and downstream equipment can be upgraded to meet future production requirements.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture PVC Compounding Extruders in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Twin Screw PVC Compounding Extruders in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PVC Compounding Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports PVC Compounding Extruders and plastic processing machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PVC Compounding Extruder can be integrated into existing production facilities with customized layouts and compatible upstream and downstream equipment.",
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
      "Yes. Trial production can be arranged using customer-supplied raw materials to evaluate machine performance, mixing quality, and pellet output.",
  },
  {
    question:
      "Is the Twin Screw PVC Compounding Extruder environmentally friendly?",
    answer:
      "Yes. The machine is designed with energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question:
      "Which industries benefit from Twin Screw PVC Compounding Extruders?",
    answer:
      "PVC pipe manufacturers, cable manufacturers, profile producers, automotive suppliers, construction companies, footwear manufacturers, packaging industries, and engineering plastic processors benefit from this machine.",
  },
  {
    question:
      "Can this machine manufacture PVC compounds for export-quality products?",
    answer:
      "Yes. The machine is designed to produce consistent, high-quality PVC compounds suitable for manufacturers serving domestic and international markets.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best PVC Compounding Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable PVC compounding systems.",
  },
  {
    question:
      "Who is the top Twin Screw PVC Compounding Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance PVC Compounding Extruders with excellent productivity, energy efficiency, and consistent compound quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your PVC Compounding Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced compounding technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Twin Screw PVC Compounding Extruder one of the best solutions for PVC compound manufacturing?",
    answer:
      "Its superior mixing capability, homogeneous additive dispersion, energy-efficient operation, flexible processing options, and reliable industrial performance make it an ideal solution for manufacturing premium-quality PVC compounds.",
  },
];

const features = [
  {
    title: "Spiral Type Die Head",
    desc: "Advanced spiral type die head designed to maintain stable wall thickness even at high production outputs. The low-pressure diagonal channel and spiral mixing section ensure homogeneous plasticization and efficient extrusion at lower temperatures.",
    image: "/product.jpg",
    highlights: [
      "Pipe production up to 630mm",
      "Stable wall thickness",
      "Homogeneous plasticization",
    ],
  },

  {
    title: "Screw & Barrel",
    desc: "Equipped with a barrier-type mixing screw and hard-alloy groove feed bush, the system delivers higher output rates, consistent material flow, and excellent plasticizing performance while reducing material slippage.",
    image: "/product.jpg",
    highlights: [
      "Barrier-type mixing screw",
      "Hard alloy feed bush",
      "Higher output rates",
    ],
  },

  {
    title: "PLC Control System",
    desc: "Integrated PLC-based control system with a large liquid crystal display provides convenient operation, precise process monitoring, and easy adjustment of production parameters.",
    image: "/product.jpg",
    highlights: [
      "PLC controlled operation",
      "Large LCD interface",
      "Easy process monitoring",
    ],
  },

  {
    title: "Vacuum Tank",
    desc: "Specially designed vacuum sizing tank ensures excellent pipe diameter accuracy and roundness, even for pipes with higher wall thickness. The high-speed spray vortex system provides uniform and efficient cooling.",
    image: "/product.jpg",
    highlights: [
      "Accurate pipe sizing",
      "Excellent roundness",
      "High-speed spray cooling",
    ],
  },

  {
    title: "Multiple Arm Haul-Off",
    desc: "Heavy-duty haul-off unit with up to six arms for pipes up to 630mm diameter. Designed to maintain perfect pipe roundness while delivering smooth traction, durability, and energy-efficient performance.",
    image: "/product.jpg",
    highlights: [
      "Up to 630mm pipe diameter",
      "Six-arm configuration",
      "Low power consumption",
    ],
  },

  {
    title: "Planetary Cutting Saw",
    desc: "High-performance planetary cutting system engineered for smooth and precise pipe cutting. Designed to complement high-output extrusion lines while ensuring consistent cut quality and operational reliability.",
    image: "/product.jpg",
    highlights: [
      "Smooth pipe cutting",
      "High cutting precision",
      "Reliable operation",
    ],
  },

  {
    title: "Double / Single Station Coiler",
    desc: "Available in both double and single station configurations for efficient pipe collection and winding. Suitable for different pipe diameters to support continuous production and easy handling.",
    image: "/product.jpg",
    highlights: [
      "Double station up to 63mm",
      "Single station up to 110mm",
      "Continuous pipe winding",
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
    parameter: "Max Plasticizing Capacity (Kg/Hr)",
    values: ["180", "275", "400"],
  },
  {
    parameter: "Max Output (Kg/Hr)",
    values: ["150", "250", "350"],
  },
  {
    parameter: "Main Drive (kW)",
    values: ["18.5", "37", "55"],
  },
  {
    parameter: "Barrel Heating (kW)",
    values: ["15", "24", "35"],
  },
  {
    parameter: "Die Heating (kW)",
    values: ["3", "3", "4"],
  },
  {
    parameter: "Screw Speed Range (RPM)",
    values: ["1-37", "1-37", "1-37"],
  },
];

export default function PVCCompounding() {
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
      <title>Conical Twin Screw Plant for PVC Compounding | HPMC</title>

      <meta
        name="description"
        content="Advanced PVC compounding solutions for consistent quality, high output, and efficient plastic processing operations."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/pvc-compounding"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/pvc-compounding.png')",
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
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px]  leading-[1.05] font-bold text-[#0B1220]">
              Twin Screw Extruder
              <span className="text-[#65BC4F]"> For PVC Compounding</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC PVC Compounding Extruders are designed for polymer blending,
              filler modification, and PVC compound production. Available in
              HPMC 51/105, 65/132, and 80/156 models, they deliver efficient and
              reliable compounding performance.
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
            PVC Compounding Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              Twin Screw Extruder For PVC Compounding
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
                HPMC PVC Compounding Extruders are available in HPMC 51/105,
                HPMC 65/132, and HPMC 80/156 models. Designed for polymer
                blending, filler modification, engineering polymers, and glass
                fiber reinforcement, these machines provide efficient and
                reliable compounding performance.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Equipped with advanced compounding and extrusion technology, the
                system supports complete PVC processing operations from raw
                material feeding and dry blend preparation to pellet production,
                ensuring consistent quality and high productivity.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "PVC Compounding",
                  "Polymer Blending",
                  "Filler Modification",
                  "Glass Fiber Reinforcement",
                  "Pellet Production",
                  "High Productivity",
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
                    PVC
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Compounding
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    Complete
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Processing Solution
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

      {/* <section className="py-10 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Key Features
            </span>

            <h2 className="mt-4 text-5xl lg:text-5xl font-bold">
              Sections of
              <span className="text-[var(--primary)]">
                {" "}
                High Speed HDPE Pipe Plant
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
                   
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      
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
      </section> */}

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

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Heading */}
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

          {/* Main Layout */}
          <div>
            {/* Video */}
            <div className="relative h-[500px] rounded-[32px] overflow-hidden border border-[var(--border)] shadow-xl">
              <video
                ref={videoRef}
                controls
                poster="/videos/pvc-compounding.png"
                className="w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/videos/PVC-COMPOUNDING.mp4" type="video/mp4" />
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
                PVC Compounding Extruder
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
