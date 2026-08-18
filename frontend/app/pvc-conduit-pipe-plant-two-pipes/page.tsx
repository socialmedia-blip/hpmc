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

const galleryImages = [
  "/products/conical-twin-screw-extruder.jpg",
  "/products/pcpptp/pcpptp.jpg",
  "/products/pcpptp/pcpptp2.jpg",
  "/products/pcpptp/pcpptp3.jpg",
];

const faqData = [
  {
    question: "What is a PVC Conduit Pipe Plant (Two Pipes)?",
    answer:
      "A PVC Conduit Pipe Plant (Two Pipes) is an advanced extrusion system designed to manufacture two PVC conduit pipes simultaneously from a single extrusion line, increasing productivity while reducing manufacturing costs.",
  },
  {
    question: "How does a Twin Pipe PVC Conduit Plant work?",
    answer:
      "The plant uses a Conical Twin Screw Extruder, dual pipe die head, vacuum sizing system, haul-off unit, and cutting system to produce two PVC conduit pipes simultaneously with excellent dimensional accuracy.",
  },
  {
    question:
      "Which materials can be processed using a Twin Pipe PVC Conduit Plant?",
    answer:
      "The machine is primarily designed for rigid PVC compounds used in manufacturing electrical conduit pipes, cable protection pipes, and related PVC extrusion products.",
  },
  {
    question: "Which products can be manufactured using this machine?",
    answer:
      "The plant manufactures PVC electrical conduit pipes, cable protection pipes, electrical casing pipes, telecom conduit pipes, and underground duct pipes.",
  },
  {
    question: "What are PVC conduit pipes used for?",
    answer:
      "PVC conduit pipes are widely used for protecting electrical wiring and communication cables in residential buildings, commercial complexes, industrial facilities, and infrastructure projects.",
  },
  {
    question:
      "Which is the best PVC Conduit Pipe Plant (Two Pipes) manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Twin Pipe PVC Conduit Pipe Plants with precision engineering, energy-efficient operation, and reliable long-term performance.",
  },
  {
    question:
      "Who is the best Twin Pipe PVC Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of Twin Pipe PVC extrusion lines, offering customized solutions, modern technology, and dependable after-sales support.",
  },
  {
    question: "What are the advantages of a Twin Pipe PVC Conduit Plant?",
    answer:
      "The machine increases production capacity, reduces energy consumption per pipe, lowers manufacturing costs, improves machine utilization, and delivers consistent product quality.",
  },
  {
    question: "Why should manufacturers choose a Twin Pipe PVC Conduit Plant?",
    answer:
      "Twin pipe production enables manufacturers to produce two conduit pipes simultaneously, improving productivity and reducing production costs without compromising quality.",
  },
  {
    question: "What pipe sizes can be manufactured?",
    answer:
      "Depending on the tooling configuration, the machine can manufacture PVC conduit pipes ranging from 16 mm to 50 mm for electrical and cable protection applications.",
  },
  {
    question:
      "Can two different pipe diameters be manufactured simultaneously?",
    answer:
      "Yes. The Twin Pipe PVC Conduit Plant can manufacture two different conduit pipe diameters simultaneously from a single mould while maintaining consistent quality.",
  },
  {
    question: "What is the advantage of the Dual Pipe Die Head?",
    answer:
      "The Dual Pipe Die Head ensures balanced PVC flow, uniform pressure distribution, and consistent temperature across both pipes for superior product quality.",
  },
  {
    question: "How does the Dual Pipe Vacuum Tank improve production?",
    answer:
      "Independent vacuum chambers and separate pumping systems allow one production line to continue operating even if the other line is temporarily stopped, minimizing downtime.",
  },
  {
    question: "What are the benefits of Conical Twin Screw Technology?",
    answer:
      "Conical Twin Screw Technology provides excellent plasticizing, higher filler loading capability, stable extrusion pressure, improved output, and better conduit pipe quality.",
  },
  {
    question: "Can the machine process high-filler PVC compounds?",
    answer:
      "Yes. The Twin Pipe PVC Conduit Plant is engineered to process high-filler PVC formulations efficiently while maintaining stable extrusion and excellent finished product quality.",
  },
  {
    question: "Which industries use Twin Pipe PVC Conduit Plants?",
    answer:
      "Construction, electrical infrastructure, telecom, real estate, cable manufacturers, industrial projects, and plastic processing industries widely use these extrusion plants.",
  },
  {
    question:
      "What is the production capacity of a Twin Pipe PVC Conduit Plant?",
    answer:
      "Production capacity depends on the selected machine model and PVC formulation, with output suitable for medium and high-volume conduit pipe manufacturing.",
  },
  {
    question: "How does the machine improve conduit pipe quality?",
    answer:
      "Accurate temperature control, efficient plasticizing, balanced PVC flow, and stable extrusion produce conduit pipes with smooth surfaces, uniform wall thickness, and consistent dimensions.",
  },
  {
    question:
      "Is the Twin Pipe PVC Conduit Plant suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with stable performance, high productivity, and minimal downtime.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Producing two pipes simultaneously helps reduce energy consumption per pipe while maximizing production efficiency.",
  },
  {
    question: "Can the Twin Pipe PVC Conduit Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized machine configurations, automation options, downstream equipment, and tooling to match customer production requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC conduit pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers looking to establish or expand a PVC conduit pipe manufacturing business with higher productivity.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for Twin Pipe PVC Conduit Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation delivers precision-engineered extrusion machinery, advanced technology, customized solutions, and dependable after-sales support for long-term manufacturing success.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top PVC Pipe Machine manufacturers in India?",
    answer:
      "With decades of expertise in plastic extrusion machinery, innovative engineering, robust machine construction, and reliable customer support, Hindustan Plastics and Machine Corporation serves customers across India and international markets.",
  },
  {
    question:
      "How can I get the best price for a Twin Pipe PVC Conduit Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your conduit pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "What is the price of a Twin Pipe PVC Conduit Pipe Plant in India?",
    answer:
      "The price of a Twin Pipe PVC Conduit Pipe Plant depends on the machine model, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best Twin Pipe PVC Conduit Pipe Plant?",
    answer:
      "The ideal machine depends on conduit pipe diameter, production capacity, PVC formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best Twin Pipe PVC Conduit Pipe Machine in India?",
    answer:
      "Twin Pipe PVC Conduit Pipe Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the Twin Pipe PVC Conduit Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, die heads, automation systems, cooling tanks, haul-off units, cutters, and pipe handling equipment.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Multiple machine models are available for medium and large-scale conduit pipe manufacturing with different production capacities to suit customer requirements.",
  },
  {
    question:
      "How much electricity does a Twin Pipe PVC Conduit Pipe Machine consume?",
    answer:
      "Power consumption depends on the machine model, production output, pipe diameter, and operating conditions. Twin pipe production helps improve overall energy efficiency.",
  },
  {
    question: "Is the Twin Pipe PVC Conduit Pipe Plant energy efficient?",
    answer:
      "Yes. Producing two pipes simultaneously reduces energy consumption per pipe and increases production efficiency.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The Twin Pipe PVC Conduit Pipe Plant is designed for continuous industrial production with stable operation and consistent output.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen is available for easy machine operation, production monitoring, alarm management, and process control.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall production parameters for different conduit pipe sizes, improving efficiency and reducing setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable PVC processing and consistent conduit pipe quality.",
  },
  {
    question:
      "Can different conduit pipe sizes be manufactured on one machine?",
    answer:
      "Yes. By changing dies, calibration sleeves, and related tooling, different conduit pipe diameters can be manufactured using the same extrusion line.",
  },
  {
    question: "How often does the machine require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of wear parts, and electrical checks help ensure reliable long-term machine performance.",
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
      "Yes. Complete installation, commissioning, production trials, and startup assistance are provided by experienced technical engineers.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe operation, efficient production, and proper machine maintenance.",
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
      "Yes. Customers receive technical assistance, maintenance support, troubleshooting, spare parts, and production optimization services.",
  },
  {
    question: "Can I request a live machine demonstration?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before making a purchase.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied PVC compounds can be performed to verify machine performance and conduit pipe quality.",
  },
  {
    question:
      "Can the Twin Pipe PVC Conduit Pipe Plant be integrated into an existing production line?",
    answer:
      "Yes. The machine can be integrated with existing downstream equipment, cooling systems, haul-off units, cutting machines, and pipe collection systems.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC conduit pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a profitable PVC conduit pipe manufacturing business.",
  },
  {
    question:
      "Can the machine manufacture conduit pipes for residential and industrial projects?",
    answer:
      "Yes. It produces conduit pipes suitable for residential buildings, commercial projects, industrial facilities, infrastructure, and utility installations.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Twin Pipe PVC Conduit Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC conduit pipe manufacturing systems.",
  },
  {
    question:
      "How can I get the best quotation for a Twin Pipe PVC Conduit Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your conduit pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Twin Pipe PVC Conduit Pipe Plant process recycled PVC material?",
    answer:
      "Yes. Compatible recycled PVC compounds can be blended with virgin material depending on the conduit pipe specifications and quality requirements.",
  },
  {
    question:
      "Can different PVC formulations be processed on the same machine?",
    answer:
      "Yes. By adjusting processing parameters and tooling, the machine can handle different rigid PVC formulations for various conduit pipe applications.",
  },
  {
    question:
      "Can the machine manufacture heavy-duty electrical conduit pipes?",
    answer:
      "Yes. The Twin Pipe PVC Conduit Pipe Plant can produce standard and heavy-duty electrical conduit pipes using the appropriate die and PVC formulation.",
  },
  {
    question: "Can the machine manufacture telecom conduit pipes?",
    answer:
      "Yes. The machine is suitable for producing telecom conduit pipes used for fiber optic cables, communication networks, and underground cable protection.",
  },
  {
    question:
      "Can the Twin Pipe PVC Conduit Pipe Plant manufacture ISI standard conduit pipes?",
    answer:
      "Yes. With the correct tooling, quality raw materials, and proper process control, the machine can manufacture conduit pipes that meet applicable industry standards.",
  },
  {
    question:
      "How does the Twin Pipe PVC Conduit Pipe Plant improve product quality?",
    answer:
      "Balanced material flow, accurate temperature control, precision calibration, and stable extrusion produce conduit pipes with smooth surfaces and consistent wall thickness.",
  },
  {
    question:
      "Can conduit pipes manufactured on this machine be used for commercial and industrial projects?",
    answer:
      "Yes. The machine produces conduit pipes suitable for residential buildings, commercial complexes, factories, warehouses, hospitals, educational institutions, and infrastructure projects.",
  },
  {
    question: "Can this machine reduce manufacturing costs?",
    answer:
      "Yes. Producing two pipes simultaneously increases productivity, reduces energy consumption per pipe, lowers labor costs, and improves overall manufacturing efficiency.",
  },
  {
    question:
      "What is the expected lifespan of a Twin Pipe PVC Conduit Pipe Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question:
      "Can the Twin Pipe PVC Conduit Pipe Plant be upgraded in the future?",
    answer:
      "Yes. Automation systems, downstream equipment, die heads, calibration units, and control systems can be upgraded as production requirements increase.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture Twin Pipe PVC Conduit Pipe Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Twin Pipe PVC Conduit Pipe Plants in India using modern extrusion technology and precision engineering.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export Twin Pipe PVC Pipe Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports Twin Pipe PVC Conduit Pipe Plants and plastic extrusion machinery to customers across India and international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The Twin Pipe PVC Conduit Pipe Plant can be integrated into existing manufacturing facilities with customized layouts and compatible downstream equipment.",
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
      "Yes. Our technical team helps optimize machine settings, PVC formulations, production efficiency, and overall extrusion performance.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required spare parts are readily available for quick dispatch, helping minimize downtime and maintain continuous production.",
  },
  {
    question:
      "Can I visit the Hindustan Plastics and Machine Corporation manufacturing facility?",
    answer:
      "Yes. Customers are welcome to visit our manufacturing facility to inspect machine production, quality testing, and discuss project requirements with our engineering experts.",
  },
  {
    question: "Can machine trials be conducted before purchase?",
    answer:
      "Yes. Trial production can be arranged using customer-supplied PVC compounds to evaluate machine performance, output, and conduit pipe quality.",
  },
  {
    question:
      "Is the Twin Pipe PVC Conduit Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology that helps reduce power consumption, optimize raw material usage, and minimize production waste.",
  },
  {
    question:
      "Which industries benefit from Twin Pipe PVC Conduit Pipe Plants?",
    answer:
      "Electrical contractors, cable manufacturers, construction companies, infrastructure developers, telecom projects, real estate developers, and plastic pipe manufacturers benefit from this high-output extrusion system.",
  },
  {
    question:
      "Can this machine manufacture conduit pipes for smart city and infrastructure projects?",
    answer:
      "Yes. The machine is ideal for manufacturing PVC conduit pipes used in smart cities, metro rail projects, airports, highways, commercial buildings, and industrial infrastructure.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best Twin Pipe PVC Conduit Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, durable machine construction, customized solutions, and dependable after-sales support to deliver high-performance PVC conduit pipe manufacturing systems.",
  },
  {
    question:
      "Who is the top Twin Pipe PVC Conduit Pipe Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing reliable Twin Pipe PVC extrusion lines with high productivity, energy efficiency, and consistent product quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your Twin Pipe PVC Conduit Pipe Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for precision-engineered machinery, advanced extrusion technology, customized production solutions, timely technical support, and long-term machine reliability.",
  },
  {
    question:
      "Why is the Twin Pipe PVC Conduit Pipe Plant one of the best solutions for high-volume conduit pipe manufacturing?",
    answer:
      "Its dual-pipe production technology, energy-efficient operation, consistent pipe quality, lower production cost per pipe, and reliable industrial performance make it an excellent choice for manufacturers looking to increase output and profitability.",
  },
];

const features = [
  {
    title: "Dual Pipe Die Head",
    desc: "Designed for smaller pipe sizes ranging from 16mm to 50mm, the dual pipe die head is equipped with a stainless steel spider and advanced flow channel design. It enables the production of two pipes from a single mould, reducing production costs while ensuring uniform PVC distribution, temperature, and pressure across both pipes.",
    image: "/products/pcpptp/pcpptp.jpg",
    highlights: [
      "16mm–50mm pipe range",
      "Dual pipe production from single mould",
      "Uniform PVC flow distribution",
    ],
  },

  {
    title: "Dual Pipe Vacuum Tank",
    desc: "Constructed from stainless steel, the dual pipe vacuum tank ensures uninterrupted production by allowing one pipe line to continue operating even if the other is stopped. It features separate vacuum and water pumps for each vacuum chamber, minimizing material wastage and improving efficiency.",
    image: "/products/pcpptp/pcpptp2.jpg",
    highlights: [
      "Stainless steel construction",
      "Independent vacuum chambers",
      "Reduced production wastage",
    ],
  },

  {
    title: "Dual Pipe Take-Up / Haul-Off",
    desc: "Engineered to provide traction at two different speeds, enabling simultaneous production of pipes with varying diameters. The system is powered by four geared motors driving all four belts, synchronized through an AC frequency variable drive. Pneumatic cylinders allow precise track adjustment, while PLC control ensures smooth operation.",
    image: "/products/pcpptp/pcpptp3.jpg",
    highlights: [
      "Dual-speed pipe traction",
      "Four geared motor drive system",
      "PLC controlled operation",
    ],
  },

  {
    title: "Dual Pipe Cutting Unit",
    desc: "Designed to cut two pipes independently at different lengths and timings. The cutting length can be accurately set through the tipping chute limit switch, while the high-speed blade delivers clean and precise cuts. The entire system operates through a PLC-controlled mechanism for reliable performance.",
    highlights: [
      "Independent dual-pipe cutting",
      "Adjustable cutting length",
      "High-speed smooth cutting blade",
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
    values: ["16", "16"],
  },
  {
    parameter: "Max Pipe OD (mm)",
    values: ["50", "50"],
  },
  {
    parameter: "Max Plasticizing Capacity (Kg/hr)",
    values: ["190", "300"],
  },
  {
    parameter: "Max Output (Kg/hr)",
    values: ["170", "250"],
  },
  {
    parameter: "Main Drive (Kw)",
    values: ["22", "37"],
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
    values: ["18", "20"],
  },
  {
    parameter: "Die (Kw)",
    values: ["5", "8"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["1 - 37", "1 - 37"],
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
    values: ["2.25", "-"],
  },
  {
    parameter: "Length (Mtrs)",
    values: ["1.0", "-"],
  },
  {
    parameter: "Water Requirement Circulating ( Ltrs/min)",
    values: ["400", "-"],
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
    values: ["5", "6"],
  },
  {
    parameter: "Water Requirement Circulating(Ltrs/Min)",
    values: ["-", "-"],
  },
  {
    parameter: "Drive Range (kw)",
    values: ["4", "4"],
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
    values: ["2", "2"],
  },
  {
    parameter: "Width of Belt (inch)",
    values: ["6", "6"],
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
    values: ["500", "500"],
  },
  {
    parameter: "Saw Drive Load (KW)",
    values: ["1.5", "1.5"],
  },
];

export default function PvcConduitPipePlantTwoPipes() {
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
      <title>Two Pipe PVC Conduit Plant | HPMC</title>

      <meta
        name="description"
        content="PVC conduit pipe extrusion plant designed for simultaneous two-pipe production with maximum productivity and efficiency."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/pvc-conduit-pipe-plant-two-pipes"
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
              PVC Conduit Pipe Plant
              <span className="text-[#65BC4F]"> (Two Pipes)</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              {" "}
              HPMC PVC Conduit Pipe Plant (Two Pipes) is a high-efficiency
              Conical Twin Screw Extruder designed to produce twin PVC pipes of
              different diameters simultaneously from a single mould. Built from
              high-grade steel, it delivers reliable performance with output
              capacities up to 150 Kg/hr.{" "}
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
              PVC Conduit Pipe Plant (Two Pipes)
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
                {" "}
                HPMC PVC Conduit Pipe Plant (Two Pipes), based on the HPMC
                51/105 Conical Twin Screw Extruder, is specially designed for
                the production of rigid and plasticized PVC dry bends. The
                system is engineered for high productivity, enabling the
                manufacture of a large number of small and large diameter pipes
                within a short production cycle.{" "}
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                {" "}
                Designed for electrical piping systems and underground duct
                applications, the plant can produce twin pipes of different
                diameters from a single mould. Featuring counter-rotating
                conical twin screws, bi-metallic screw and barrel technology,
                and high filler loading capability, it delivers reliable
                performance with output capacities ranging from 125 Kg/hr to 150
                Kg/hr.{" "}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Twin Pipe Production",
                  "125–150 Kg/hr Output",
                  "Single Mould Operation",
                  "High Filler Loading",
                  "Bi-Metallic Screw & Barrel",
                  "Electrical & Duct Applications",
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
                {" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-xl font-bold text-[var(--primary)]">
                    {" "}
                    HPMC 51/105{" "}
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Extruder Model{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    2 Pipes
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    from One Mould{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    {" "}
                    150 Kg/hr{" "}
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Maximum Output{" "}
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
              Sections of
              <span className="text-[var(--primary)]">
                {" "}
                PVC Conduit Pipe Plant (Two Pipes)
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

                  {["HPMC 55/110", "HPMC 65/132"].map((model) => (
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
                PVC Conduit Pipe Plant (Two Pipes)
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
