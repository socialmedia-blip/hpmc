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

const galleryImages = ["/products/wpc/wet-recycling.png"];

const faqData = [
  {
    question: "What is a Wet Recycling Extrusion Line?",
    answer:
      "A Wet Recycling Extrusion Line is an advanced plastic recycling machine that processes wet plastic flakes and film without extensive pre-drying, converting them into high-quality recycled plastic pellets.",
  },
  {
    question: "How does a Wet Recycling Extrusion Line work?",
    answer:
      "The machine feeds wet plastic material directly into the extrusion system, where moisture is managed during processing to produce uniform recycled plastic granules with consistent quality.",
  },
  {
    question:
      "Which plastic materials can be recycled using a Wet Recycling Extrusion Line?",
    answer:
      "The machine can process PP, PE, HDPE, LDPE, LLDPE, plastic film, plastic flakes, woven bags, raffia, and other compatible thermoplastic materials.",
  },
  {
    question: "Can wet plastic flakes be recycled without drying?",
    answer:
      "Yes. The Wet Recycling Extrusion Line is specially designed to process plastic flakes containing moisture, reducing the need for complete pre-drying before extrusion.",
  },
  {
    question: "How much moisture can the Wet Recycling Extrusion Line handle?",
    answer:
      "Depending on the material and process conditions, the machine is designed to handle plastic materials containing up to 25% moisture.",
  },
  {
    question: "Is an agglomerator required before extrusion?",
    answer:
      "No. One of the biggest advantages of this machine is that it can process wet plastic materials directly without requiring an agglomerator.",
  },
  {
    question: "Which is the best Wet Recycling Extrusion Line in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance Wet Recycling Extrusion Lines designed for efficient processing of wet plastic waste with reliable industrial performance.",
  },
  {
    question:
      "Who is the best Wet Plastic Recycling Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted manufacturer of advanced plastic recycling machines, extrusion lines, and pelletizing plants for customers across India and international markets.",
  },
  {
    question: "Can the machine recycle post-consumer plastic waste?",
    answer:
      "Yes. It efficiently processes washed post-consumer and post-industrial plastic waste into reusable plastic pellets.",
  },
  {
    question: "Can plastic film waste be processed?",
    answer:
      "Yes. The machine is ideal for recycling LDPE film, HDPE film, LLDPE film, agricultural film, stretch film, and packaging film.",
  },
  {
    question: "Can rigid plastic materials be recycled?",
    answer:
      "Yes. The Wet Recycling Extrusion Line can also process compatible rigid plastic materials depending on the recycling application.",
  },
  {
    question: "What industries use Wet Recycling Extrusion Lines?",
    answer:
      "Plastic recycling companies, packaging manufacturers, agricultural film recyclers, extrusion plants, and plastic processing industries widely use these recycling systems.",
  },
  {
    question: "What are recycled plastic pellets used for?",
    answer:
      "Recycled pellets are used in pipe extrusion, blown film, sheet manufacturing, injection molding, household products, packaging materials, and industrial plastic products.",
  },
  {
    question: "What are the advantages of a Wet Recycling Extrusion Line?",
    answer:
      "The machine reduces drying requirements, improves production efficiency, lowers operating costs, saves energy, and produces consistent recycled plastic pellets.",
  },
  {
    question: "Can engineering plastics be processed?",
    answer:
      "Yes. The machine can process several engineering plastics depending on material compatibility and processing requirements.",
  },
  {
    question: "Can contaminated plastic waste be recycled?",
    answer:
      "Yes. After proper washing and preparation, the machine efficiently recycles plastic waste while maintaining excellent pellet quality.",
  },
  {
    question:
      "What is the production capacity of a Wet Recycling Extrusion Line?",
    answer:
      "Production capacity depends on the selected model, with machines available for medium and high-capacity industrial recycling operations up to 600 kg/hr.",
  },
  {
    question: "How does the Wet Recycling Extrusion Line improve productivity?",
    answer:
      "Direct processing of wet plastic materials reduces production steps, minimizes downtime, and increases overall recycling efficiency.",
  },
  {
    question: "Can recycled pellets be reused in manufacturing?",
    answer:
      "Yes. High-quality recycled pellets produced by the machine can be reused for extrusion, injection molding, packaging, and various industrial applications.",
  },
  {
    question: "Is this machine suitable for continuous industrial production?",
    answer:
      "Yes. The machine is designed for stable, continuous operation with reliable output and consistent pellet quality.",
  },
  {
    question:
      "Does the Wet Recycling Extrusion Line reduce energy consumption?",
    answer:
      "Yes. By eliminating unnecessary drying and improving extrusion efficiency, the machine helps reduce overall energy consumption.",
  },
  {
    question: "Is this machine suitable for plastic recycling businesses?",
    answer:
      "Yes. It is an excellent solution for plastic recycling companies, manufacturers, and entrepreneurs looking to improve recycling efficiency and profitability.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for Wet Recycling Extrusion Lines?",
    answer:
      "Hindustan Plastics and Machine Corporation designs reliable, energy-efficient Wet Recycling Extrusion Lines with advanced engineering, customized solutions, and dependable after-sales support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the top Plastic Recycling Machine manufacturers in India?",
    answer:
      "With decades of manufacturing experience, precision engineering, modern recycling technology, and customer-focused support, Hindustan Plastics and Machine Corporation supplies high-quality recycling machinery trusted by customers across India and global markets.",
  },
  {
    question:
      "How can I get the best price for a Wet Recycling Extrusion Line?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your plastic material details, production capacity, and recycling requirements to receive a customized quotation and the most suitable recycling solution.",
  },
  {
    question: "What is the price of a Wet Recycling Extrusion Line in India?",
    answer:
      "The price of a Wet Recycling Extrusion Line depends on production capacity, automation level, motor power, and customization requirements. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best Wet Recycling Extrusion Line?",
    answer:
      "The ideal machine depends on the type of plastic waste, moisture content, production capacity, pellet quality requirements, and future expansion plans.",
  },
  {
    question:
      "Which is the best Plastic Recycling Machine for wet plastic waste?",
    answer:
      "A Wet Recycling Extrusion Line is one of the best solutions for processing wet plastic flakes and films because it reduces drying requirements while delivering high-quality recycled pellets.",
  },
  {
    question: "Can the Wet Recycling Extrusion Line be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized screw designs, feeding systems, pelletizing units, automation options, and machine configurations to suit different recycling applications.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Machines are available in multiple production capacities for small, medium, and large-scale plastic recycling operations, with models producing up to 600 kg/hr.",
  },
  {
    question:
      "How much electricity does a Wet Recycling Extrusion Line consume?",
    answer:
      "Power consumption depends on the machine model, production output, material type, and operating conditions. The machine is designed for energy-efficient recycling.",
  },
  {
    question: "Is the Wet Recycling Extrusion Line energy efficient?",
    answer:
      "Yes. By processing wet materials directly and reducing drying requirements, the machine helps lower overall energy consumption.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The Wet Recycling Extrusion Line is designed for continuous industrial production with stable output and consistent pellet quality.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with an HMI touchscreen is available for easy operation, production monitoring, alarm management, and process control.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall processing parameters for different materials, improving production consistency and reducing setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable extrusion and consistent pellet quality.",
  },
  {
    question: "Which pelletizing systems are available?",
    answer:
      "The machine supports strand pelletizing, water-ring pelletizing, die-face pelletizing, and other customized pelletizing systems.",
  },
  {
    question:
      "Can the Wet Recycling Extrusion Line process different grades of plastic?",
    answer:
      "Yes. The machine is suitable for processing various grades of compatible thermoplastics, depending on the application and formulation.",
  },
  {
    question: "How often does the machine require maintenance?",
    answer:
      "Routine preventive maintenance based on operating hours helps maximize machine life, reduce downtime, and maintain optimum recycling performance.",
  },
  {
    question: "Is screw maintenance easy?",
    answer:
      "Yes. The screw assembly is designed for convenient inspection, cleaning, and replacement of wear components.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, startup assistance, and production trials are provided with the machine.",
  },
  {
    question: "Is operator training included?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe operation, efficient production, and proper machine maintenance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimize downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical assistance, troubleshooting, maintenance support, spare parts, and process optimization services.",
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
      "Yes. Production trials using customer-supplied materials can be performed to verify recycling efficiency and pellet quality.",
  },
  {
    question:
      "Can the Wet Recycling Extrusion Line be integrated into an existing recycling plant?",
    answer:
      "Yes. The machine can be integrated with washing lines, shredders, conveyors, dryers, storage silos, and downstream packaging equipment.",
  },
  {
    question:
      "Is this machine suitable for starting a plastic recycling business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers looking to establish or expand a profitable plastic recycling business.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Plastic Recycling Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines advanced engineering, energy-efficient recycling technology, customized machine solutions, and dependable after-sales support to deliver high-performance recycling equipment.",
  },
  {
    question:
      "How can I get the best quotation for a Wet Recycling Extrusion Line?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your material type, production capacity, and recycling requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Wet Recycling Extrusion Line process plastic with high moisture content?",
    answer:
      "Yes. The machine is specially designed to process washed plastic flakes and film with high moisture content, reducing the need for extensive pre-drying.",
  },
  {
    question: "Can the machine recycle agricultural plastic film?",
    answer:
      "Yes. It efficiently processes agricultural films, greenhouse films, mulch films, irrigation films, and other compatible plastic film waste.",
  },
  {
    question: "Can the Wet Recycling Extrusion Line recycle packaging waste?",
    answer:
      "Yes. It is suitable for recycling packaging films, shopping bags, stretch films, shrink films, woven bags, and industrial packaging scrap.",
  },
  {
    question: "Can industrial plastic production waste be recycled?",
    answer:
      "Yes. The machine can recycle factory rejects, edge trims, startup waste, production scrap, and other post-industrial plastic materials.",
  },
  {
    question:
      "How does the Wet Recycling Extrusion Line improve pellet quality?",
    answer:
      "Efficient moisture handling, stable extrusion, and optimized pelletizing produce uniform recycled plastic pellets with consistent quality.",
  },
  {
    question: "Can recycled pellets be reused for injection molding?",
    answer:
      "Yes. High-quality recycled pellets can be reused in injection molding applications, depending on the material and product specifications.",
  },
  {
    question: "Can recycled pellets be used for extrusion applications?",
    answer:
      "Yes. The pellets are suitable for pipe extrusion, sheet extrusion, profile extrusion, blown film production, and other compatible manufacturing processes.",
  },
  {
    question: "Can this machine reduce raw material costs?",
    answer:
      "Yes. By converting plastic waste into reusable pellets, manufacturers can reduce their dependence on virgin plastic and lower production costs.",
  },
  {
    question:
      "Does the Wet Recycling Extrusion Line improve production efficiency?",
    answer:
      "Yes. Direct processing of wet plastic materials simplifies recycling operations, reduces processing time, and increases overall productivity.",
  },
  {
    question:
      "What is the expected lifespan of a Wet Recycling Extrusion Line?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed to provide reliable long-term industrial performance.",
  },
  {
    question:
      "Is this Wet Recycling Machine suitable for export-oriented recycling businesses?",
    answer:
      "Yes. It is suitable for manufacturers producing recycled plastic pellets for both domestic and international markets.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture Wet Recycling Extrusion Lines in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Wet Recycling Extrusion Lines in India using modern extrusion technology and precision engineering.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export Plastic Recycling Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies plastic recycling machinery to customers across India and international markets.",
  },
  {
    question: "Can the machine be installed in an existing recycling facility?",
    answer:
      "Yes. The Wet Recycling Extrusion Line can be integrated into existing washing lines, shredding systems, conveyors, and downstream pelletizing operations.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, and process optimization support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation help optimize recycling processes?",
    answer:
      "Yes. Our technical team assists customers with machine setup, process optimization, material handling, and production improvement.",
  },
  {
    question: "How quickly are machine spare parts supplied?",
    answer:
      "Frequently used spare parts are readily available for quick dispatch to minimize downtime and maintain continuous production.",
  },
  {
    question:
      "Can I visit the Hindustan Plastics and Machine Corporation manufacturing facility?",
    answer:
      "Yes. Customers are welcome to schedule a factory visit to inspect machine manufacturing, quality testing, and discuss project requirements with our engineering team.",
  },
  {
    question: "Can production trials be conducted using my plastic material?",
    answer:
      "Yes. Production trials can be performed using customer-supplied materials to verify machine performance and recycled pellet quality.",
  },
  {
    question: "Is the Wet Recycling Extrusion Line environmentally friendly?",
    answer:
      "Yes. The machine supports sustainable plastic recycling by converting plastic waste into reusable raw material while reducing landfill waste.",
  },
  {
    question: "Can this recycling machine help reduce carbon emissions?",
    answer:
      "Yes. Recycling plastic waste reduces the demand for virgin plastic production and supports environmentally responsible manufacturing.",
  },
  {
    question:
      "Which industries benefit most from Wet Recycling Extrusion Lines?",
    answer:
      "Plastic recycling companies, packaging manufacturers, agricultural film recyclers, extrusion plants, injection molding units, and plastic processors benefit from this recycling technology.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your Plastic Recycling Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for reliable engineering, energy-efficient recycling technology, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of India's leading Plastic Recycling Plant manufacturers?",
    answer:
      "With decades of experience, advanced extrusion technology, precision manufacturing, and strong customer support, Hindustan Plastics and Machine Corporation delivers high-performance recycling solutions for industries in India and worldwide.",
  },
  {
    question:
      "Why is the Wet Recycling Extrusion Line one of the best plastic recycling solutions for wet plastic waste?",
    answer:
      "Its ability to process wet plastic without an agglomerator, combined with energy-efficient operation, reliable extrusion, and consistent pellet quality, makes it an ideal solution for modern plastic recycling plants.",
  },
];

export default function TwoStageRecyclingPlant() {
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
      <title>Wet Recycling Extrusion Line | HPMC</title>

      <meta
        name="description"
        content="HPMC Wet Recycling Extrusion Line is engineered for processing high-moisture plastic flakes without an agglomerator. Ideal for post-consumer and post-industrial plastic waste, it delivers energy-efficient recycling, consistent extrusion quality, and production capacity up to 600 KG/HR."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/wet-recycling-extrusion-line"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/wetrecycling.png')",
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
              Wet Recycling
              <span className="text-[#65BC4F]"> Extrusion Line</span>
            </h1>

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
            <span className="text-[var(--primary)]">
              Wet Recycling Extrusion Line
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
                HPMC Wet Recycling Extrusion Line is designed for processing
                plastic materials with high moisture content. The advanced
                extrusion system enables efficient recycling while maintaining
                consistent output quality and reducing energy consumption.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                The line can process wet plastic flakes without the need for an
                agglomerator, making recycling simpler and more cost-effective
                for post-consumer and post-industrial plastic waste.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "High Moisture Processing",
                  "No Agglomerator Required",
                  "Energy Efficient Operation",
                  "Consistent Extrusion Output",
                  "Easy Material Feeding",
                  "Reliable Recycling Solution",
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
                    Up to 25%
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Moisture Handling
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    600 KG/HR
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Production Capacity
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    40%
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Power Saving*
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

      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[var(--primary)] uppercase tracking-[3px] font-semibold text-sm">
              Machine in Action
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Wet Recycling{" "}
              <span className="text-[var(--primary)]">Process</span>
            </h2>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-[var(--border)] bg-black shadow-[var(--shadow-primary)]">
            <video
              ref={videoRef}
              className="block w-full max-h-[680px]"
              controls
              playsInline
              preload="metadata"
              poster="/products/wpc/wet-recycling.png"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src="/videos/wet-recycling.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              type="button"
              onClick={toggleVideo}
              aria-label={
                playing
                  ? "Pause wet recycling video"
                  : "Play wet recycling video"
              }
              className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg transition hover:scale-105 hover:bg-[#54a63f]"
            >
              <Play
                size={22}
                fill="currentColor"
                className={playing ? "hidden" : "block"}
              />
              <span
                className={playing ? "block text-xl leading-none" : "hidden"}
              >
                ❚❚
              </span>
            </button>
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
                Vented Recycling Plant
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
