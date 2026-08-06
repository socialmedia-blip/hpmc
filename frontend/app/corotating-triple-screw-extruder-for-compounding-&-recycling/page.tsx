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
  "/products/co-rotating twing screw extruder/corotating-triple-screw-extruder-for-compounding-recycling-engineering-plastic/triple-screw-extruder-for-high-filler-main.jpg",
  "/products/co-rotating twing screw extruder/corotating-triple-screw-extruder-for-compounding-recycling-engineering-plastic/triple-screw-extruder-for-high-filler-v1.jpg",
  "/products/co-rotating twing screw extruder/corotating-triple-screw-extruder-for-compounding-recycling-engineering-plastic/triple-screw-extruder-for-high-filler-v2.jpg",
];

const specifications = [
  {
    parameter: "Screw Diameter (mm)",
    values: ["21.7", "30", "35.6", "50.5", "62.4", "71.2", "91"],
  },
  {
    parameter: "Max Rotary Speed (RPM)",
    values: ["600", "400", "600", "500/600", "400/500", "400/500", "400/500"],
  },
  {
    parameter: "Main Motor Power (kW)",
    values: ["4", "11", "11/15", "37/45", "55/75", "90/110", "220/250"],
  },
  {
    parameter: "L/D Ratio",
    values: ["32-40", "28-48", "32-48", "32-48", "32-48", "32-48", "32-40"],
  },
  {
    parameter: "Capacity (kg/h)",
    values: [
      "2-10",
      "5-30",
      "10-80",
      "20-150",
      "100-300",
      "300-600",
      "600-1000",
    ],
  },
];
const faqData = [
  {
    question: "What is a Co-Rotating Triple Screw Extruder?",
    answer:
      "A Co-Rotating Triple Screw Extruder is an advanced polymer processing machine designed for high-performance compounding, masterbatch production, engineering plastics, recycling, and high-filler applications with superior mixing efficiency.",
  },
  {
    question: "How does a Triple Screw Extruder work?",
    answer:
      "Three co-rotating screws work together to melt, mix, plasticize, and convey polymer materials, providing better dispersion, higher throughput, and improved product consistency than conventional extrusion systems.",
  },
  {
    question:
      "What is the difference between a Twin Screw Extruder and a Triple Screw Extruder?",
    answer:
      "A Triple Screw Extruder offers higher mixing efficiency, improved filler dispersion, greater output, enhanced plasticization, and better process stability compared to a conventional Twin Screw Extruder.",
  },
  {
    question: "Why choose a Triple Screw Extruder over a Twin Screw Extruder?",
    answer:
      "Triple Screw technology provides superior mixing, higher productivity, improved material dispersion, reduced processing time, and better performance for demanding compounding applications.",
  },
  {
    question: "What is a Triple Screw Extruder used for?",
    answer:
      "It is used for polymer compounding, engineering plastics, masterbatch production, filler modification, recycling, PVC compounds, polymer alloys, and specialty plastic formulations.",
  },
  {
    question: "Which materials can be processed in a Triple Screw Extruder?",
    answer:
      "The machine processes PP, PE, ABS, PVC, PET, PA, PC, EVA, TPE, TPU, engineering plastics, recycled polymers, biodegradable plastics, and specialty compounds.",
  },
  {
    question: "Can recycled plastic be processed in a Triple Screw Extruder?",
    answer:
      "Yes. It efficiently processes recycled plastics into high-quality pellets while maintaining excellent dispersion and material consistency.",
  },
  {
    question: "Can the machine manufacture color masterbatch?",
    answer:
      "Yes. Triple Screw Extruders provide outstanding pigment dispersion for producing premium-quality color masterbatches.",
  },
  {
    question: "Can additive masterbatch be produced?",
    answer:
      "Yes. It is suitable for UV, antioxidant, anti-static, flame-retardant, anti-block, and other additive masterbatches.",
  },
  {
    question: "Can engineering plastics be compounded?",
    answer:
      "Yes. The machine is specifically designed for engineering plastic compounding with excellent mixing and temperature control.",
  },
  {
    question:
      "Is the Triple Screw Extruder suitable for high-filler applications?",
    answer:
      "Yes. It is specially engineered for high-filler compounds while maintaining excellent dispersion and processing stability.",
  },
  {
    question: "Can calcium carbonate filled compounds be produced?",
    answer:
      "Yes. The machine easily processes calcium carbonate-filled compounds with high filler loading.",
  },
  {
    question: "Can talc-filled compounds be manufactured?",
    answer:
      "Yes. Triple Screw technology provides excellent talc dispersion for high-quality compounded materials.",
  },
  {
    question: "Can glass fiber reinforced compounds be produced?",
    answer:
      "Yes. It offers superior glass fiber dispersion, resulting in stronger engineering plastic compounds.",
  },
  {
    question: "Can wood plastic composites (WPC) be processed?",
    answer:
      "Yes. Triple Screw Extruders are suitable for manufacturing wood-plastic composites and fiber-reinforced materials.",
  },
  {
    question: "Can biodegradable plastics be processed?",
    answer:
      "Yes. The machine supports various biodegradable and bio-based polymer formulations.",
  },
  {
    question: "Which industries use Triple Screw Extruders?",
    answer:
      "Automotive, cable, packaging, construction, consumer goods, recycling, engineering plastics, medical, and polymer compounding industries widely use Triple Screw Extruders.",
  },
  {
    question: "What is the production capacity of a Triple Screw Extruder?",
    answer:
      "Depending on the machine model, production capacity ranges from laboratory-scale output to approximately 1500 kg/hr.",
  },
  {
    question: "What are the advantages of Triple Screw Technology?",
    answer:
      "It provides higher throughput, excellent distributive mixing, better dispersive mixing, improved filler distribution, energy efficiency, and consistent compound quality.",
  },
  {
    question: "Can the machine process polymer alloys?",
    answer:
      "Yes. It is ideal for manufacturing polymer alloys requiring excellent compatibility and homogeneous blending.",
  },
  {
    question: "Is this machine suitable for PVC compounds?",
    answer:
      "Yes. It is widely used for PVC cable compounds and specialty PVC formulations.",
  },
  {
    question: "Can flame-retardant compounds be manufactured?",
    answer:
      "Yes. Triple Screw Extruders provide excellent dispersion of flame-retardant additives throughout the polymer.",
  },
  {
    question: "Can mineral-filled compounds be processed?",
    answer:
      "Yes. Materials containing calcium carbonate, talc, barium sulfate, and other mineral fillers can be processed efficiently.",
  },
  {
    question: "Can this machine produce engineering compounds?",
    answer:
      "Yes. It is ideal for reinforced engineering compounds used in automotive, electrical, and industrial applications.",
  },
  {
    question: "Is a Triple Screw Extruder suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial production with consistent quality and stable performance.",
  },
  {
    question:
      "What is the price of a Co-Rotating Triple Screw Extruder in India?",
    answer:
      "The price depends on the machine model, output capacity, screw diameter, automation level, and customization requirements. Contact HPMC for a customized quotation.",
  },
  {
    question: "How do I choose the right Triple Screw Extruder?",
    answer:
      "The right model depends on your raw material, production capacity, filler percentage, end application, and required output. HPMC experts can help you select the best machine.",
  },
  {
    question: "Which industries benefit most from Triple Screw Extruders?",
    answer:
      "Triple Screw Extruders are widely used in automotive, packaging, electrical, cable, medical, construction, engineering plastics, recycling, and masterbatch manufacturing industries.",
  },
  {
    question: "Can the machine be customized for specific applications?",
    answer:
      "Yes. HPMC offers customized screw configurations, feeding systems, pelletizing options, and automation features based on customer requirements.",
  },
  {
    question: "What screw diameters are available?",
    answer:
      "HPMC manufactures Triple Screw Extruders in multiple screw diameters suitable for laboratory, pilot-scale, and high-volume industrial production.",
  },
  {
    question: "What output capacity can I expect from a Triple Screw Extruder?",
    answer:
      "Output capacity varies by model and material but can range from a few kilograms per hour up to approximately 1500 kg/hr.",
  },
  {
    question: "How much power does a Triple Screw Extruder consume?",
    answer:
      "Power consumption depends on the machine size, motor capacity, material type, processing temperature, and production rate.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Triple Screw technology improves material mixing efficiency, reducing energy consumption while increasing production output.",
  },
  {
    question: "Is PLC automation available?",
    answer:
      "Yes. PLC-based automation with a user-friendly HMI touchscreen is available for easy machine operation and monitoring.",
  },
  {
    question: "Can processing recipes be stored in the control system?",
    answer:
      "Yes. Operators can save and recall production recipes for consistent product quality and faster machine setup.",
  },
  {
    question: "Does the machine include automatic temperature control?",
    answer:
      "Yes. Multiple heating zones with precise temperature control ensure stable polymer processing and consistent product quality.",
  },
  {
    question: "Is vacuum degassing available?",
    answer:
      "Yes. Optional vacuum degassing removes moisture, gases, and volatile substances from the polymer melt.",
  },
  {
    question: "Can liquid additives be injected during processing?",
    answer:
      "Yes. Liquid injection systems can be integrated for oils, plasticizers, and specialty additives.",
  },
  {
    question: "Can side feeders be installed?",
    answer:
      "Yes. Side feeders are available for accurate feeding of fillers, fibers, pigments, and additives.",
  },
  {
    question: "Which pelletizing systems are supported?",
    answer:
      "The machine supports strand pelletizing, die-face pelletizing, water-ring pelletizing, and underwater pelletizing systems.",
  },
  {
    question: "What type of gearbox is used?",
    answer:
      "HPMC uses heavy-duty, high-torque gearboxes designed for continuous industrial operation and long service life.",
  },
  {
    question: "Is screw maintenance easy?",
    answer:
      "Yes. The modular screw design allows individual screw elements to be replaced, reducing maintenance costs and downtime.",
  },
  {
    question: "How often should the machine be maintained?",
    answer:
      "Routine preventive maintenance based on operating hours helps maximize machine life and maintain optimum production efficiency.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. Triple Screw Extruders are designed for continuous 24/7 industrial production with reliable performance.",
  },
  {
    question: "Does HPMC provide installation services?",
    answer:
      "Yes. HPMC provides installation, commissioning, machine testing, and startup assistance.",
  },
  {
    question: "Is operator training included?",
    answer:
      "Yes. HPMC provides operator training to ensure safe operation, proper maintenance, and maximum machine performance.",
  },
  {
    question: "Are spare parts easily available?",
    answer:
      "Yes. Genuine HPMC spare parts are readily available to minimize production downtime.",
  },
  {
    question: "Does HPMC provide after-sales support?",
    answer:
      "Yes. HPMC offers comprehensive after-sales service including technical support, maintenance assistance, spare parts, and process optimization.",
  },
  {
    question: "Can I request a machine demonstration?",
    answer:
      "Yes. HPMC offers product demonstrations and technical consultations to help customers understand machine performance and capabilities.",
  },
  {
    question: "How can I get a quotation for a Triple Screw Extruder?",
    answer:
      "Simply contact HPMC with your production requirements, material details, and desired output capacity to receive a customized quotation.",
  },
  {
    question:
      "Can the Triple Screw Extruder process high-temperature engineering plastics?",
    answer:
      "Yes. It is designed to process high-temperature engineering plastics with precise temperature control and excellent melt homogeneity.",
  },
  {
    question: "Can reinforced plastic compounds be manufactured?",
    answer:
      "Yes. The machine efficiently processes glass fiber, mineral-filled, and reinforced engineering plastic compounds.",
  },
  {
    question: "What makes Triple Screw technology more efficient?",
    answer:
      "The additional screw improves material conveying, distributive mixing, dispersive mixing, and throughput, resulting in higher production efficiency.",
  },
  {
    question: "Can this machine reduce production costs?",
    answer:
      "Yes. Higher throughput, improved mixing efficiency, lower material wastage, and reduced energy consumption help lower overall production costs.",
  },
  {
    question: "Does the machine improve product quality?",
    answer:
      "Yes. Uniform mixing and precise process control ensure consistent pellet quality, color dispersion, and mechanical properties.",
  },
  {
    question:
      "Can the machine process multiple materials without major modifications?",
    answer:
      "Yes. Modular screw configurations allow the machine to process a wide variety of polymers and formulations with minimal setup changes.",
  },
  {
    question: "Is the screw configuration customizable?",
    answer:
      "Yes. Screw elements can be configured according to the polymer type, filler percentage, throughput, and final product requirements.",
  },
  {
    question: "What is the expected lifespan of a Triple Screw Extruder?",
    answer:
      "With proper maintenance and genuine spare parts, HPMC Triple Screw Extruders provide reliable performance for many years of continuous industrial use.",
  },
  {
    question: "Does HPMC manufacture Triple Screw Extruders in India?",
    answer:
      "Yes. HPMC designs and manufactures high-performance Triple Screw Extruders in India for domestic and international customers.",
  },
  {
    question: "Does HPMC export Triple Screw Extruders worldwide?",
    answer:
      "Yes. HPMC supplies extrusion machinery to customers across multiple international markets with complete installation and technical support.",
  },
  {
    question: "Can the machine be integrated into an existing production line?",
    answer:
      "Yes. HPMC can customize the machine for seamless integration with existing feeding, pelletizing, and downstream equipment.",
  },
  {
    question: "Is online technical support available?",
    answer:
      "Yes. HPMC provides online troubleshooting, technical consultation, and process optimization support whenever required.",
  },
  {
    question: "Does HPMC help with process optimization?",
    answer:
      "Yes. Our technical experts assist customers in optimizing formulations, machine settings, and production efficiency.",
  },
  {
    question: "How quickly can spare parts be supplied?",
    answer:
      "Most standard spare parts are readily available to minimize downtime and maintain uninterrupted production.",
  },
  {
    question: "What certifications does HPMC machinery comply with?",
    answer:
      "HPMC manufactures extrusion machinery following stringent quality standards and industry best practices. Specific certifications are available on request.",
  },
  {
    question: "Can the machine be upgraded in the future?",
    answer:
      "Yes. Many automation features, feeding systems, pelletizing systems, and screw configurations can be upgraded based on future production needs.",
  },
  {
    question: "Is this machine suitable for large-scale manufacturing plants?",
    answer:
      "Yes. Triple Screw Extruders are designed for high-output continuous production in large industrial manufacturing facilities.",
  },
  {
    question: "Can the machine produce consistent pellet sizes?",
    answer:
      "Yes. Combined with suitable pelletizing systems, the machine delivers uniform pellet size and excellent product consistency.",
  },
  {
    question: "How does Triple Screw technology improve filler dispersion?",
    answer:
      "The additional screw creates more effective mixing zones, resulting in superior filler distribution and improved compound performance.",
  },
  {
    question: "Can the machine process difficult-to-mix materials?",
    answer:
      "Yes. Triple Screw Extruders are particularly effective for challenging formulations requiring intensive mixing and dispersion.",
  },
  {
    question: "Why is HPMC a trusted Triple Screw Extruder manufacturer?",
    answer:
      "HPMC combines advanced engineering, robust machine construction, customized solutions, and reliable after-sales support backed by decades of industry experience.",
  },
  {
    question: "What information is required to select the right machine?",
    answer:
      "Material type, desired output capacity, filler loading, end application, pelletizing method, and automation requirements help determine the most suitable machine.",
  },
  {
    question: "Can I schedule a factory visit before purchasing?",
    answer:
      "Yes. Customers are welcome to schedule a factory visit to inspect manufacturing facilities and discuss project requirements with HPMC experts.",
  },
  {
    question: "Can production trials be conducted before purchase?",
    answer:
      "Yes. Trial runs can be arranged for selected applications to evaluate machine performance with your specific material.",
  },
  {
    question: "Why should I choose an HPMC Co-Rotating Triple Screw Extruder?",
    answer:
      "HPMC Triple Screw Extruders deliver superior mixing, higher productivity, excellent filler dispersion, customized configurations, energy-efficient operation, dependable after-sales support, and long-term manufacturing reliability for demanding polymer processing applications.",
  },
];

export default function CorotatingTripleScrewExtruder() {
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
  const [visibleFaqCount, setVisibleFaqCount] = useState(10);
  const displayedFaqs = faqData.slice(0, visibleFaqCount);
  const hasMoreFaqs = visibleFaqCount < faqData.length;
  const nextFaqCount = Math.min(10, faqData.length - visibleFaqCount);

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
      <title>
        Co-Rotating Triple Screw Extruder for Compounding & Recycling | HPMC
      </title>

      <meta
        name="description"
        content="Triple screw extruders for advanced plastic compounding and recycling applications with exceptional mixing efficiency."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/co-rotating-triple-screw-extruder-for-compounding-&-recycling"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/heroSection/co-rotating-twin-screw-extruder.png')",
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
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] leading-[1.05] font-bold text-[#0B1220]">
              Corotating Triple Screw Extruder
              <span className="text-[#65BC4F]">
                {" "}
                For Compounding & Recycling
              </span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Triple Screw Extruders provide high-output compounding and
              recycling solutions with excellent mixing, high filler loading
              capability, and production capacities up to 1500 Kg/hr.
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
            Co-Rotating Triple Screw Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              For Compounding & Recycling
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
              {/* CONTENT */}
              <div>
                <p className="mt-8 text-[var(--text-secondary)] leading-8">
                  HPMC Triple Screw Extruders are specially engineered for
                  high-filler compounding, masterbatch production, and recycling
                  applications. Delivering outputs up to 1500 Kg/hr, they
                  provide exceptional mixing, plasticization, and processing
                  efficiency for demanding polymer formulations.
                </p>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 gap-5 mt-10">
                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Applications
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• Direct Compounding</li>
                      <li>• PVC Cable Compounds</li>
                      <li>• Film & Sheet Extrusion</li>
                      <li>• Injection Molding</li>
                      <li>• Compression Molding</li>
                      <li>• Recycling</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      Key Features
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• High Precision Gearbox</li>
                      <li>• Modular Screw Design</li>
                      <li>• Reliable Lubrication System</li>
                      <li>• Die Face Cutter</li>
                      <li>• Vibratory Sieve</li>
                      <li>• Smooth Material Feeding</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)]">
                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                      High Filler Capability
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>• High Filler Compounding</li>
                      <li>• Masterbatch Production</li>
                      <li>• Engineering Plastics</li>
                      <li>• Polymer Alloys</li>
                      <li>• Wood Fiber Composites</li>
                      <li>• Consistent Product Quality</li>
                    </ul>
                  </div>
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

                  {["20", "30", "35", "50", "65", "72", "92"].map((model) => (
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
              <span className="text-[var(--primary)]">
                {" "}
                Corotating Triple Screw Extruder
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

          {hasMoreFaqs && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() =>
                  setVisibleFaqCount((currentCount) =>
                    Math.min(currentCount + 10, faqData.length),
                  )
                }
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
                  <ArrowRight size={20} />
                </span>

                <span className="text-left">
                  <span className="block text-sm font-bold sm:text-base">
                    View more FAQs
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
