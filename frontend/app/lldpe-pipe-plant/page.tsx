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

const galleryImages = ["/products/lldpe pipe extruder/image.-12.jpg"];

const specifications = [
  {
    model: "HPMC 75",
    pipeRange: '2" - 8"',
    output: "50-60",
    mainDrive: "15",
    barrel: "8",
    die: "2",
    screwSpeed: "15-45",
    length: "3",
    motor: "1.5",
  },
  {
    model: "HPMC 90",
    pipeRange: '2" - 8"',
    output: "80-100",
    mainDrive: "22.5",
    barrel: "10",
    die: "2",
    screwSpeed: "15-45",
    length: "4",
    motor: "2.2",
  },
  {
    model: "HPMC 100",
    pipeRange: '2" - 8"',
    output: "125-150",
    mainDrive: "30",
    barrel: "14",
    die: "3",
    screwSpeed: "15-45",
    length: "4",
    motor: "2.2",
  },
  {
    model: "HPMC 75/45",
    pipeRange: '2" - 8"',
    output: "60-70",
    mainDrive: "15/5",
    barrel: "8/5",
    die: "3",
    screwSpeed: "15-45",
    length: "3",
    motor: "1.5",
  },
  {
    model: "HPMC 90/55",
    pipeRange: '2" - 8"',
    output: "100-120",
    mainDrive: "22.5/7.5",
    barrel: "10/5",
    die: "3",
    screwSpeed: "15-45",
    length: "4",
    motor: "2.2",
  },
];
const faqData = [
  {
    question: "What is an LLDPE Pipe Plant?",
    answer:
      "An LLDPE Pipe Plant is an advanced extrusion system designed to manufacture Linear Low-Density Polyethylene (LLDPE) pipes with excellent flexibility, durability, chemical resistance, and long service life for agricultural and industrial applications.",
  },
  {
    question: "How does an LLDPE Pipe Extrusion Line work?",
    answer:
      "The extrusion line melts LLDPE resin inside the extruder, forms the molten material through a precision pipe die, cools the pipe in a vacuum and water cooling system, pulls it continuously, and cuts it into finished pipe lengths.",
  },
  {
    question: "Which materials can be processed using an LLDPE Pipe Plant?",
    answer:
      "The machine processes virgin LLDPE resin, recycled LLDPE blends, color masterbatch, UV stabilizers, antioxidants, processing aids, and other additives used for manufacturing premium-quality LLDPE pipes.",
  },
  {
    question: "Which products can be manufactured using an LLDPE Pipe Machine?",
    answer:
      "The machine manufactures LLDPE irrigation pipes, agricultural pipes, water supply pipes, industrial fluid transfer pipes, flexible distribution pipes, and customized polyethylene pipe products.",
  },
  {
    question: "What are LLDPE pipes used for?",
    answer:
      "LLDPE pipes are widely used in agriculture, irrigation, water distribution, landscaping, industrial fluid transfer, rural water supply, horticulture, and infrastructure projects.",
  },
  {
    question: "Which is the best LLDPE Pipe Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best LLDPE Pipe Machine manufacturers in India, offering advanced extrusion technology, high production efficiency, and dependable machine performance.",
  },
  {
    question: "Who is the top LLDPE Pipe Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance LLDPE Pipe Plants trusted by customers across India and international markets.",
  },
  {
    question: "What are the advantages of an LLDPE Pipe Extrusion Line?",
    answer:
      "The extrusion line offers high production efficiency, excellent pipe quality, dimensional accuracy, smooth surface finish, energy-efficient operation, and reliable long-term industrial performance.",
  },
  {
    question: "Why should manufacturers invest in an LLDPE Pipe Plant?",
    answer:
      "An LLDPE Pipe Plant enables manufacturers to produce high-demand polyethylene pipes with low production costs, excellent durability, and strong market demand in agriculture and water management.",
  },
  {
    question: "What production capacity does the LLDPE Pipe Plant offer?",
    answer:
      "Depending on the selected machine model, production capacity ranges from approximately 50 kg/hr to 150 kg/hr while maintaining excellent pipe quality and dimensional consistency.",
  },
  {
    question: "What machine models are available for the LLDPE Pipe Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers HPMC 75, HPMC 90, HPMC 100, HPMC 75/45, and HPMC 90/55 models to suit different production capacity requirements.",
  },
  {
    question: "What pipe sizes can be manufactured using this machine?",
    answer:
      "The machine can manufacture LLDPE pipes ranging from 2 inches to 8 inches depending on the selected machine model and extrusion tooling.",
  },
  {
    question: "Can customized LLDPE pipe sizes be manufactured?",
    answer:
      "Yes. Customized dies can be developed to manufacture different pipe diameters, wall thicknesses, pressure ratings, and customer-specific pipe designs.",
  },
  {
    question: "Which industries use LLDPE Pipe Extrusion Lines?",
    answer:
      "Agriculture, irrigation, water management, landscaping, infrastructure, construction, industrial fluid transfer, mining, and rural water supply projects widely use LLDPE Pipe Plants.",
  },
  {
    question: "Can the machine manufacture irrigation pipes?",
    answer:
      "Yes. The machine is specially designed for manufacturing LLDPE irrigation pipes used in agriculture, horticulture, nurseries, farms, and landscaping applications.",
  },
  {
    question: "Can the machine manufacture industrial LLDPE pipes?",
    answer:
      "Yes. The extrusion line manufactures industrial-grade LLDPE pipes suitable for chemical transfer, fluid handling, water transportation, and industrial processing systems.",
  },
  {
    question: "Can the machine manufacture water distribution pipes?",
    answer:
      "Yes. The machine manufactures LLDPE water distribution pipes used in irrigation systems, rural water supply, and low-pressure water transportation.",
  },
  {
    question: "Why are LLDPE pipes better than conventional metal pipes?",
    answer:
      "LLDPE pipes are lightweight, corrosion-resistant, chemically resistant, flexible, easy to install, durable, and require significantly lower maintenance than conventional metal pipes.",
  },
  {
    question: "Is the LLDPE Pipe Extrusion Machine energy efficient?",
    answer:
      "Yes. Optimized screw design, efficient heating systems, and advanced drive technology help reduce electricity consumption while maintaining high production output.",
  },
  {
    question: "Can the LLDPE Pipe Plant operate continuously?",
    answer:
      "Yes. The machine is engineered for continuous industrial production with stable output, reliable performance, and minimal downtime.",
  },
  {
    question: "Can the LLDPE Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation provides customized extrusion lines, pipe dies, vacuum tanks, cooling systems, haul-off units, cutting systems, PLC automation, and turnkey production solutions.",
  },
  {
    question:
      "Is this machine suitable for starting an LLDPE pipe manufacturing business?",
    answer:
      "Yes. The LLDPE Pipe Plant is an excellent investment for entrepreneurs and manufacturers planning to establish or expand an LLDPE pipe manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for an LLDPE Pipe Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered extrusion lines with advanced technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best LLDPE Pipe Machine manufacturers in India?",
    answer:
      "With decades of experience in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers worldwide.",
  },
  {
    question: "How can I get the best price for an LLDPE Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of an LLDPE Pipe Plant in India?",
    answer:
      "The price of an LLDPE Pipe Plant depends on the machine model, pipe diameter range, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best LLDPE Pipe Extrusion Machine?",
    answer:
      "The ideal LLDPE Pipe Extrusion Machine depends on your required pipe sizes, production capacity, raw material formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best LLDPE Pipe Making Machine in India?",
    answer:
      "LLDPE Pipe Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, consistent pipe quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the LLDPE Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion dies, vacuum calibration tanks, cooling tanks, haul-off units, cutting systems, PLC automation, and complete turnkey production solutions.",
  },
  {
    question: "Can one machine manufacture different LLDPE pipe sizes?",
    answer:
      "Yes. By changing the extrusion die and sizing components, the same machine can manufacture multiple pipe diameters and wall thicknesses.",
  },
  {
    question: "How much electricity does an LLDPE Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, pipe dimensions, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the LLDPE Pipe Plant support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables operators to monitor production, control machine parameters, manage alarms, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different pipe sizes and raw material formulations, reducing setup time and ensuring consistent production quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable LLDPE processing and premium-quality pipe production.",
  },
  {
    question: "Can recycled LLDPE material be processed?",
    answer:
      "Yes. Depending on product requirements, the machine can process recycled LLDPE blends along with virgin material while maintaining excellent production quality.",
  },
  {
    question: "How often does the LLDPE Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance includes inspecting the screw and barrel, gearbox, heaters, cooling tanks, haul-off unit, lubrication system, and electrical components.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient inspection and maintenance, helping reduce downtime and improve long-term operational efficiency.",
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
      "Yes. Comprehensive operator training is provided to ensure safe machine operation, maximum productivity, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available for the LLDPE Pipe Plant?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimum production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical support, troubleshooting assistance, preventive maintenance services, spare parts supply, and production optimization support.",
  },
  {
    question: "Can I request a live demonstration of the LLDPE Pipe Plant?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance, production capacity, and finished pipe quality.",
  },
  {
    question:
      "Can the LLDPE Pipe Plant be integrated into an existing manufacturing facility?",
    answer:
      "Yes. The extrusion line can be integrated with existing material handling systems, printing units, coiling equipment, packaging systems, and downstream automation.",
  },
  {
    question: "Can the machine manufacture colored LLDPE pipes?",
    answer:
      "Yes. By using suitable color masterbatches, the machine can manufacture LLDPE pipes in various colors according to customer requirements and industry standards.",
  },
  {
    question: "Can the machine manufacture UV-resistant LLDPE pipes?",
    answer:
      "Yes. UV stabilizers can be added to the raw material formulation to manufacture LLDPE pipes suitable for long-term outdoor applications.",
  },
  {
    question: "Can the machine manufacture multilayer LLDPE pipes?",
    answer:
      "Yes. With suitable extrusion configuration and tooling, the production line can be customized to manufacture multilayer LLDPE pipe structures.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best LLDPE Pipe Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable LLDPE pipe production systems.",
  },
  {
    question: "Can the LLDPE Pipe Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, PLC automation, automatic cutting systems, additional downstream equipment, and customized tooling as production requirements increase.",
  },
  {
    question: "How can I get the best quotation for an LLDPE Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "Can the LLDPE Pipe Plant process different LLDPE formulations?",
    answer:
      "Yes. The machine is designed to process virgin LLDPE resin, recycled LLDPE blends, UV-stabilized compounds, color masterbatches, antioxidants, and customized formulations for various pipe applications.",
  },
  {
    question: "Can the machine manufacture different colors of LLDPE pipes?",
    answer:
      "Yes. By using suitable color masterbatches, the machine can manufacture black, blue, green, white, yellow, and customized color LLDPE pipes according to customer requirements.",
  },
  {
    question: "Can the machine manufacture pressure-rated LLDPE pipes?",
    answer:
      "Yes. With suitable raw material formulations and precision extrusion tooling, the machine can manufacture pressure-rated LLDPE pipes for water distribution and irrigation applications.",
  },
  {
    question: "Can the machine manufacture flexible LLDPE pipes?",
    answer:
      "Yes. The extrusion line is specifically designed to manufacture flexible LLDPE pipes that offer excellent bendability, durability, and crack resistance.",
  },
  {
    question:
      "Can the LLDPE Pipe Plant manufacture pipes that meet international quality standards?",
    answer:
      "Yes. With quality LLDPE raw materials, precision extrusion tooling, and controlled processing parameters, the machine can manufacture pipes that comply with applicable national and international quality standards.",
  },
  {
    question: "How does the LLDPE Pipe Plant improve pipe quality?",
    answer:
      "Optimized screw design, stable melt pressure, accurate temperature control, efficient cooling, and precision sizing ensure smooth surface finish, uniform wall thickness, and excellent dimensional accuracy.",
  },
  {
    question:
      "Can LLDPE pipes manufactured on this machine be used for agriculture?",
    answer:
      "Yes. The machine produces LLDPE pipes widely used for agriculture, irrigation systems, horticulture, nurseries, landscaping, and farm water distribution.",
  },
  {
    question: "Can this machine reduce LLDPE pipe manufacturing costs?",
    answer:
      "Yes. High production efficiency, optimized raw material utilization, energy-saving operation, and reduced production waste help lower the overall manufacturing cost of LLDPE pipes.",
  },
  {
    question: "What is the expected lifespan of an LLDPE Pipe Plant?",
    answer:
      "With regular preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation and continuous production.",
  },
  {
    question: "Can the LLDPE Pipe Plant be upgraded in the future?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, PLC automation, automatic cutting systems, online printing units, additional downstream equipment, and customized tooling as production requirements grow.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture LLDPE Pipe Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced LLDPE Pipe Plants in India using precision engineering, premium-quality components, and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export LLDPE Pipe Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports LLDPE Pipe Extrusion Lines and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The LLDPE Pipe Plant can be integrated into existing production facilities with customized layouts and compatible upstream and downstream equipment.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, production guidance, machine optimization, and operational support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide process optimization support?",
    answer:
      "Yes. Our technical experts help optimize LLDPE formulations, machine settings, extrusion parameters, and production efficiency to maximize output and improve finished pipe quality.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required genuine spare parts are readily available for quick dispatch, helping minimize downtime and maintain uninterrupted production.",
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
      "Yes. Trial production can be arranged using customer-supplied raw materials to evaluate machine performance, production capacity, and finished pipe quality.",
  },
  {
    question: "Is the LLDPE Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology, supports optimized raw material utilization, and can process suitable recycled LLDPE materials, helping reduce manufacturing waste.",
  },
  {
    question: "Which industries benefit from LLDPE Pipe Plants?",
    answer:
      "Agriculture, irrigation, landscaping, construction, water supply, infrastructure development, industrial fluid handling, mining, and municipal projects benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture pipes for water supply and irrigation projects?",
    answer:
      "Yes. The machine is ideal for manufacturing LLDPE pipes used in agricultural irrigation, water distribution, landscaping, rural water supply, and industrial fluid transportation.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best LLDPE Pipe Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable LLDPE pipe production systems.",
  },
  {
    question: "Who is the top LLDPE Pipe Extrusion Line manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance LLDPE Pipe Extrusion Lines with excellent productivity, energy efficiency, and consistent pipe quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your LLDPE Pipe Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the LLDPE Pipe Plant one of the best solutions for polyethylene pipe manufacturing?",
    answer:
      "Its stable extrusion process, energy-efficient operation, accurate pipe sizing, excellent surface finish, high production capacity, and reliable industrial performance make it an ideal solution for manufacturing premium-quality LLDPE pipes.",
  },
];

export default function LldpePipePlante() {
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
      <title>LLDPE Pipe Plant | HPMC</title>

      <meta
        name="description"
        content="Advanced LLDPE pipe extrusion plants offering reliable performance, precision engineering, and high production output."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/lldpe-pipe-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/sseHero.png')",
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
              LLDPE
              <span className="text-[#65BC4F]"> Pipe Plant</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              We manufacture and export LLDPE Pipe Plants along with Plastic
              Extruders, Twin Screw Extruders, PVC and HDPE Pipe Plants,
              Recycling Machines, Compounding Extruders, and other plastic
              processing machinery. Our systems are designed for reliable
              performance, efficient production, and long service life.
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
            LLPDE Pipe Exturder -
            <span className="text-[var(--primary)]"> LLDPE Pipe Plant</span>
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
                Our LLDPE Pipe Plants are designed for efficient and reliable
                pipe production, delivering consistent output, excellent pipe
                quality, and smooth operation. Built with advanced extrusion
                technology, these plants ensure high productivity and long
                service life.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Suitable for various industrial and agricultural applications,
                the systems offer energy-efficient performance, low maintenance,
                and dependable operation for continuous manufacturing
                requirements.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "High Output Production",
                  "Energy Efficient Design",
                  "Consistent Pipe Quality",
                  "Low Maintenance",
                  "Reliable Operation",
                  "Long Service Life",
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
                    High
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Production Output{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    Low
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Power Consumption{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    24/7
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Reliable Operation{" "}
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
            <table className="w-full min-w-[1200px] border-collapse">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="px-4 py-4 border">MACHINE MODELS</th>
                  <th className="px-4 py-4 border">PIPE RANGE</th>
                  <th className="px-4 py-4 border">OUTPUT (kg/hr)</th>
                  <th className="px-4 py-4 border">MAIN DRIVE (kw)</th>
                  <th className="px-4 py-4 border">BARREL</th>
                  <th className="px-4 py-4 border">DIE</th>
                  <th className="px-4 py-4 border">SCREW SPEED VARIATION</th>
                  <th className="px-4 py-4 border">LENGTH (in Mtrs)</th>
                  <th className="px-4 py-4 border">MOTOR (Kw)</th>
                </tr>
              </thead>

              <tbody>
                {specifications.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[var(--muted)] transition-colors"
                  >
                    <td className="px-4 py-4 border text-center">
                      {item.model}
                    </td>
                    <td className="px-4 py-4 border text-center">
                      {item.pipeRange}
                    </td>
                    <td className="px-4 py-4 border text-center">
                      {item.output}
                    </td>
                    <td className="px-4 py-4 border text-center">
                      {item.mainDrive}
                    </td>
                    <td className="px-4 py-4 border text-center">
                      {item.barrel}
                    </td>
                    <td className="px-4 py-4 border text-center">{item.die}</td>
                    <td className="px-4 py-4 border text-center">
                      {item.screwSpeed}
                    </td>
                    <td className="px-4 py-4 border text-center">
                      {item.length}
                    </td>
                    <td className="px-4 py-4 border text-center">
                      {item.motor}
                    </td>
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
              <span className="text-[var(--primary)]"> LLDPE Pipe Plant</span>
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
