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

const galleryImages = ["/products/wpc/garden.png"];

const faqData = [
  {
    question: "What is a Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "A Soft PVC Garden Pipe Extrusion Line is a complete plastic extrusion system designed to manufacture flexible PVC garden pipes with excellent dimensional accuracy, smooth surface finish, and consistent production quality for residential, agricultural, and industrial applications.",
  },
  {
    question: "How does a Soft PVC Garden Pipe Extrusion Machine work?",
    answer:
      "The machine melts soft PVC compounds inside the extruder, shapes the material through a precision pipe die, cools the pipe in a water tank, pulls it at a constant speed, and winds or cuts it into finished products.",
  },
  {
    question:
      "Which materials can be processed using a Soft PVC Garden Pipe Plant?",
    answer:
      "The machine processes soft PVC compounds, flexible PVC resin, stabilizers, plasticizers, color masterbatch, fillers, and other additives used for manufacturing premium-quality flexible PVC pipes.",
  },
  {
    question:
      "Which products can be manufactured using a Soft PVC Garden Pipe Machine?",
    answer:
      "The machine manufactures garden hoses, flexible PVC water pipes, irrigation hoses, household water supply pipes, transparent PVC tubing, industrial flexible hoses, and customized soft PVC pipes.",
  },
  {
    question: "What are Soft PVC Garden Pipes used for?",
    answer:
      "Soft PVC Garden Pipes are widely used for garden watering, agriculture, irrigation, water supply, construction sites, homes, factories, hotels, hospitals, commercial buildings, and industrial applications.",
  },
  {
    question:
      "Which is the best Soft PVC Garden Pipe Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best Soft PVC Garden Pipe Machine manufacturers in India, offering advanced extrusion technology, high productivity, and dependable machine performance.",
  },
  {
    question:
      "Who is the top Soft PVC Garden Pipe Extrusion Line manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance Soft PVC Garden Pipe Extrusion Lines trusted by customers across India and international markets.",
  },
  {
    question:
      "What are the advantages of a Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "The extrusion line provides high production efficiency, excellent pipe quality, smooth surface finish, dimensional accuracy, energy-efficient operation, and reliable long-term industrial performance.",
  },
  {
    question:
      "Why should manufacturers invest in a Soft PVC Garden Pipe Plant?",
    answer:
      "A Soft PVC Garden Pipe Plant enables manufacturers to produce high-demand flexible PVC pipes with excellent quality, low production cost, and strong market demand across residential and agricultural sectors.",
  },
  {
    question:
      "What production capacity does the Soft PVC Garden Pipe Plant offer?",
    answer:
      "Depending on the selected machine model, production capacity ranges from approximately 50 kg/hr to 130 kg/hr while maintaining excellent pipe quality and dimensional consistency.",
  },
  {
    question:
      "What machine models are available for the Soft PVC Garden Pipe Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers HPMC 75, HPMC 90, HPMC 100, HPMC 75/45, and HPMC 90/55 models to meet different production capacity requirements.",
  },
  {
    question: "What pipe sizes can be manufactured using this machine?",
    answer:
      "The machine can manufacture flexible PVC garden pipes ranging from ½ inch to 2 inches in diameter depending on the selected machine model and extrusion tooling.",
  },
  {
    question: "Can customized PVC garden pipe sizes be manufactured?",
    answer:
      "Yes. Customized dies can be developed to manufacture different pipe diameters, wall thicknesses, and customer-specific flexible PVC pipe designs.",
  },
  {
    question: "Which industries use Soft PVC Garden Pipe Extrusion Lines?",
    answer:
      "Agriculture, irrigation, construction, plumbing, water distribution, gardening, infrastructure, manufacturing industries, and commercial building projects widely use Soft PVC Garden Pipe Plants.",
  },
  {
    question: "Can the machine manufacture irrigation hoses?",
    answer:
      "Yes. The machine is ideal for manufacturing flexible irrigation hoses used in farming, landscaping, horticulture, nurseries, and agricultural water distribution.",
  },
  {
    question: "Can the machine manufacture household water supply hoses?",
    answer:
      "Yes. The extrusion line produces flexible PVC hoses suitable for household water supply, kitchen connections, bathroom plumbing, and utility applications.",
  },
  {
    question: "Can the machine manufacture industrial flexible PVC hoses?",
    answer:
      "Yes. The machine can manufacture industrial-grade flexible PVC hoses used for water transfer, chemical handling, air supply, and light-duty industrial applications.",
  },
  {
    question:
      "Why are Soft PVC Garden Pipes better than conventional rubber hoses?",
    answer:
      "Soft PVC Garden Pipes are lightweight, flexible, corrosion-resistant, weather-resistant, easy to handle, economical, and require minimal maintenance compared to traditional rubber hoses.",
  },
  {
    question: "Is the Soft PVC Garden Pipe Extrusion Machine energy efficient?",
    answer:
      "Yes. Optimized screw design, efficient heating systems, and advanced drive technology help reduce electricity consumption while maintaining high production output.",
  },
  {
    question: "Can the Soft PVC Garden Pipe Plant operate continuously?",
    answer:
      "Yes. The machine is engineered for continuous industrial production with stable output, reliable performance, and minimal downtime.",
  },
  {
    question: "Can the Soft PVC Garden Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation provides customized extrusion lines, pipe dies, cooling tanks, haul-off units, winding systems, automation, and turnkey production solutions.",
  },
  {
    question:
      "Is this machine suitable for starting a PVC garden pipe manufacturing business?",
    answer:
      "Yes. The Soft PVC Garden Pipe Plant is an excellent investment for entrepreneurs and manufacturers planning to establish or expand a flexible PVC pipe manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for a Soft PVC Garden Pipe Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered extrusion lines with advanced technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Soft PVC Garden Pipe Machine manufacturers in India?",
    answer:
      "With decades of experience in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and reliable after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers worldwide.",
  },
  {
    question:
      "How can I get the best price for a Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "What is the price of a Soft PVC Garden Pipe Extrusion Line in India?",
    answer:
      "The price of a Soft PVC Garden Pipe Extrusion Line depends on the machine model, pipe size range, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question:
      "How do I choose the best Soft PVC Garden Pipe Extrusion Machine?",
    answer:
      "The ideal Soft PVC Garden Pipe Extrusion Machine depends on your pipe diameter, production capacity, PVC formulation, automation requirements, and future production expansion plans.",
  },
  {
    question: "Which is the best Soft PVC Garden Pipe Making Machine in India?",
    answer:
      "Soft PVC Garden Pipe Extrusion Lines from Hindustan Plastics and Machine Corporation are engineered for high productivity, consistent pipe quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the Soft PVC Garden Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion dies, cooling tanks, haul-off units, winding systems, cutting units, PLC automation, and complete turnkey production solutions.",
  },
  {
    question: "Can one machine manufacture different PVC garden pipe sizes?",
    answer:
      "Yes. By changing the extrusion die and sizing components, the same machine can manufacture multiple pipe diameters and wall thicknesses.",
  },
  {
    question: "How much electricity does a Soft PVC Garden Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, pipe dimensions, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the Soft PVC Garden Pipe Plant support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables operators to monitor production, control machine parameters, manage alarms, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different pipe sizes and PVC formulations, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable PVC processing and premium-quality flexible pipe production.",
  },
  {
    question: "Can recycled PVC materials be processed?",
    answer:
      "Yes. Depending on product requirements, the machine can process recycled PVC blends along with virgin PVC compounds while maintaining consistent production quality.",
  },
  {
    question:
      "How often does the Soft PVC Garden Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance includes inspecting the screw and barrel, gearbox, heaters, cooling tank, haul-off unit, lubrication system, and electrical components.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection, cleaning, and maintenance, reducing downtime and improving long-term operational efficiency.",
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
      "Yes. Comprehensive operator training is provided to ensure safe operation, maximum productivity, and proper preventive maintenance.",
  },
  {
    question:
      "Are genuine spare parts available for the Soft PVC Garden Pipe Plant?",
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
    question:
      "Can I request a live demonstration of the Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied PVC compounds can be conducted to verify machine performance, production capacity, and finished pipe quality.",
  },
  {
    question:
      "Can the Soft PVC Garden Pipe Plant be integrated into an existing production facility?",
    answer:
      "Yes. The extrusion line can be integrated with existing material handling systems, automatic coilers, printing units, packaging equipment, and downstream automation.",
  },
  {
    question: "Can the machine manufacture colored PVC garden pipes?",
    answer:
      "Yes. Using suitable color masterbatches, the machine can manufacture PVC garden pipes in multiple colors according to customer and market requirements.",
  },
  {
    question: "Can the machine manufacture transparent PVC hoses?",
    answer:
      "Yes. Depending on the PVC formulation and die design, the extrusion line can manufacture transparent and semi-transparent flexible PVC hoses.",
  },
  {
    question: "Can the machine manufacture braided garden hoses?",
    answer:
      "Yes. With suitable downstream braiding equipment, the production line can be integrated to manufacture reinforced braided PVC garden hoses.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Soft PVC Garden Pipe Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC garden pipe production systems.",
  },
  {
    question:
      "Can the Soft PVC Garden Pipe Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, PLC automation, automatic winding systems, additional downstream equipment, and customized tooling as production requirements increase.",
  },
  {
    question:
      "How can I get the best quotation for a Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "What is the price of a Soft PVC Garden Pipe Extrusion Line in India?",
    answer:
      "The price of a Soft PVC Garden Pipe Extrusion Line depends on the machine model, pipe size range, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question:
      "How do I choose the best Soft PVC Garden Pipe Extrusion Machine?",
    answer:
      "The ideal Soft PVC Garden Pipe Extrusion Machine depends on your pipe diameter, production capacity, PVC formulation, automation requirements, and future production expansion plans.",
  },
  {
    question: "Which is the best Soft PVC Garden Pipe Making Machine in India?",
    answer:
      "Soft PVC Garden Pipe Extrusion Lines from Hindustan Plastics and Machine Corporation are engineered for high productivity, consistent pipe quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the Soft PVC Garden Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion dies, cooling tanks, haul-off units, winding systems, cutting units, PLC automation, and complete turnkey production solutions.",
  },
  {
    question: "Can one machine manufacture different PVC garden pipe sizes?",
    answer:
      "Yes. By changing the extrusion die and sizing components, the same machine can manufacture multiple pipe diameters and wall thicknesses.",
  },
  {
    question: "How much electricity does a Soft PVC Garden Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, production output, pipe dimensions, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the Soft PVC Garden Pipe Plant support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables operators to monitor production, control machine parameters, manage alarms, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different pipe sizes and PVC formulations, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable PVC processing and premium-quality flexible pipe production.",
  },
  {
    question: "Can recycled PVC materials be processed?",
    answer:
      "Yes. Depending on product requirements, the machine can process recycled PVC blends along with virgin PVC compounds while maintaining consistent production quality.",
  },
  {
    question:
      "How often does the Soft PVC Garden Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance includes inspecting the screw and barrel, gearbox, heaters, cooling tank, haul-off unit, lubrication system, and electrical components.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection, cleaning, and maintenance, reducing downtime and improving long-term operational efficiency.",
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
      "Yes. Comprehensive operator training is provided to ensure safe operation, maximum productivity, and proper preventive maintenance.",
  },
  {
    question:
      "Are genuine spare parts available for the Soft PVC Garden Pipe Plant?",
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
    question:
      "Can I request a live demonstration of the Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied PVC compounds can be conducted to verify machine performance, production capacity, and finished pipe quality.",
  },
  {
    question:
      "Can the Soft PVC Garden Pipe Plant be integrated into an existing production facility?",
    answer:
      "Yes. The extrusion line can be integrated with existing material handling systems, automatic coilers, printing units, packaging equipment, and downstream automation.",
  },
  {
    question: "Can the machine manufacture colored PVC garden pipes?",
    answer:
      "Yes. Using suitable color masterbatches, the machine can manufacture PVC garden pipes in multiple colors according to customer and market requirements.",
  },
  {
    question: "Can the machine manufacture transparent PVC hoses?",
    answer:
      "Yes. Depending on the PVC formulation and die design, the extrusion line can manufacture transparent and semi-transparent flexible PVC hoses.",
  },
  {
    question: "Can the machine manufacture braided garden hoses?",
    answer:
      "Yes. With suitable downstream braiding equipment, the production line can be integrated to manufacture reinforced braided PVC garden hoses.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Soft PVC Garden Pipe Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC garden pipe production systems.",
  },
  {
    question:
      "Can the Soft PVC Garden Pipe Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, PLC automation, automatic winding systems, additional downstream equipment, and customized tooling as production requirements increase.",
  },
  {
    question:
      "How can I get the best quotation for a Soft PVC Garden Pipe Extrusion Line?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
];

const specifications = [
  {
    parameter: "Pipe Range",
    values: ['½"–2"', '½"–2"', '½"–2"', '½"–2"', '½"–2"'],
  },
  {
    parameter: "Output (kg/hr)",
    values: ["50-60", "80-100", "100-130", "70-80", "120-130"],
  },
  {
    parameter: "Main Drive (kW)",
    values: ["15", "22.5", "30", "15/5", "22.5/7.5"],
  },
  {
    parameter: "Barrel (kW)",
    values: ["8", "10", "12", "8/5", "10/5"],
  },
  {
    parameter: "Die (kW)",
    values: ["2", "2", "2", "3", "3"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["15-45", "15-45", "15-45", "15-45", "15-45"],
  },
  {
    parameter: "Water Tank Length (m)",
    values: ["3", "4", "4", "3", "4"],
  },
  {
    parameter: "Haul Off Motor (kW)",
    values: ["1.5", "1.5", "2.2", "1.5", "2.2"],
  },
];

export default function SingleScrewPlantPvcCompounding() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [catalogueToDownload, setCatalogueToDownload] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [active, setActive] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? faqData : faqData.slice(0, 10);

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
      <title>Soft PVC Garden Pipe Extrusion Line | HPMC</title>

      <meta
        name="description"
        content="Soft PVC garden pipe extrusion lines designed for smooth production, consistent quality, and high productivity."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/soft-pvc-garden-pipe-extrusion-line"
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
          <div className="max-w-[620px] pt-24 lg:pt-0">
            <h1 className="mt-6 text-[34px] sm:text-[46px] md:text-[58px] lg:text-[60px] leading-[1.05] font-bold text-[#0B1220]">
              Soft PVC
              <span className="block text-[#65BC4F]">
                Garden Pipe Extrusion Line
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-lg leading-8 text-gray-700">
              HPMC Soft PVC Garden Pipe Extrusion Lines are engineered for the
              efficient production of high-quality flexible PVC garden pipes,
              delivering consistent output, excellent dimensional accuracy, and
              reliable performance for domestic, agricultural, and industrial
              water supply applications.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={() => setOpenPopup(true)}
                className="flex items-center gap-3 bg-[#65BC4F] hover:bg-[#54a63f] transition-all duration-300 px-7 py-4 rounded-xl"
              >
                <span className="text-white font-semibold uppercase text-sm">
                  Request a Demo
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
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
            Soft PVC Garden Pipe
            <span className="text-[var(--primary)]"> Extrusion Line</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
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
                  alt="Soft PVC Garden Pipe Extrusion Line"
                  fill
                  className="object-contain p-8 transition-all duration-700"
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
              <p className="text-[var(--text-secondary)] leading-8">
                HPMC Soft PVC Garden Pipe Extrusion Lines are designed for the
                efficient production of flexible PVC garden pipes with excellent
                dimensional accuracy, smooth surface finish, and consistent
                output. The system provides stable extrusion performance with
                low energy consumption and reliable long-term operation.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                These extrusion lines are widely used for manufacturing garden
                hoses, water supply pipes, household connection pipes,
                irrigation hoses, and other flexible PVC tubing applications for
                residential, agricultural, and commercial sectors.
              </p>

              {/* Applications */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                  Applications
                </h4>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    "Garden Watering",
                    "Bathroom Connections",
                    "Kitchen Water Supply",
                    "Residential Buildings",
                    "Hospitals & Public Places",
                    "Agricultural Irrigation",
                    "Hotels & Offices",
                    "Village Water Distribution",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[var(--text-primary)]"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    130
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Max Output (kg/hr)
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    ½"–2"
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Pipe Size Range
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h4 className="text-3xl font-bold text-[var(--primary)]">
                    5
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Machine Models
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => handleDownload("/catalogue.pdf")}
                  className="bg-[var(--primary)] hover:opacity-90 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  Download Catalogue
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    ↓
                  </span>
                </button>

                <button
                  onClick={() => setOpenPopup2(true)}
                  className="border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white text-[var(--text-primary)] px-7 py-4 rounded-xl font-semibold transition-all duration-300"
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
                    "HPMC 75",
                    "HPMC 90",
                    "HPMC 100",
                    "HPMC 75/45",
                    "HPMC 90/55",
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

      {/* Faqs */}
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
                Single Screw Plant For PVC Compounding
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
