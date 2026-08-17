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

const galleryImages = ["/products/two-stage.png"];

const specifications = [
  {
    parameter: "Production (Kg/Hr)",
    values: ["80-100", "140-160", "150-175", "200-220"],
  },
  {
    parameter: "Screw Diameter (mm)",
    values: ["90", "100", "110", "120"],
  },
  {
    parameter: "Main Motor (HP)",
    values: ["30", "40", "50", "75"],
  },
  {
    parameter: "Heating Load (kW)",
    values: ["15", "18", "22", "28"],
  },
  {
    parameter: "Hydraulic Screen Changer (Inch/HP)",
    values: ["7/3", "8/3", "9/3", "10/5"],
  },
  {
    parameter: "L/D Ratio",
    values: ["33/1", "33/1", "33/1", "33/1"],
  },
  {
    parameter: "Heating Zones",
    values: ["6", "7", "8", "9"],
  },
  {
    parameter: "Rotating Speed (RPM)",
    values: ["50-70", "50-70", "50-70", "50-70"],
  },
];

const faqData = [
  {
    question: "What is a Two Stage Recycling Plant?",
    answer:
      "A Two Stage Recycling Plant is an advanced plastic recycling system that uses two extrusion stages to improve plasticization, degassing, filtration, and pellet quality while recycling plastic waste.",
  },
  {
    question: "How does a Two Stage Recycling Plant work?",
    answer:
      "The first stage melts and homogenizes plastic waste, while the second stage improves degassing, filtration, and pellet formation to produce high-quality recycled plastic granules.",
  },
  {
    question:
      "Why is a Two Stage Recycling Plant better than a Single Stage Recycling Plant?",
    answer:
      "Two-stage recycling provides better melt quality, improved degassing, higher filtration efficiency, lower moisture content, and more consistent recycled pellets.",
  },
  {
    question: "What is a Plastic Pelletizing Plant?",
    answer:
      "A Plastic Pelletizing Plant converts recycled molten plastic into uniform granules or pellets that can be reused in manufacturing various plastic products.",
  },
  {
    question: "Which plastic materials can be recycled using this machine?",
    answer:
      "The plant can recycle HIPS, Crystal, PP, HDPE, LDPE, ABS, and several engineering plastics commonly used in industrial applications.",
  },
  {
    question: "Can the machine recycle post-consumer plastic waste?",
    answer:
      "Yes. The machine is suitable for processing post-consumer as well as post-industrial plastic waste after proper washing and preparation.",
  },
  {
    question: "Can printed plastic waste be recycled?",
    answer:
      "Yes. Printed plastic films and rigid plastic scrap can be recycled efficiently using the two-stage recycling process.",
  },
  {
    question: "Can contaminated plastic be recycled?",
    answer:
      "Yes. The hydraulic screen changer and advanced filtration system help remove contaminants, improving the quality of recycled pellets.",
  },
  {
    question: "What industries use Two Stage Recycling Plants?",
    answer:
      "Plastic recycling companies, packaging manufacturers, injection molding units, pipe manufacturers, automotive suppliers, and extrusion industries widely use these recycling plants.",
  },
  {
    question: "What are recycled plastic pellets used for?",
    answer:
      "Recycled plastic pellets are used for injection molding, blown film, pipe extrusion, sheet extrusion, profiles, household products, and packaging applications.",
  },
  {
    question: "Can engineering plastics be recycled?",
    answer:
      "Yes. Engineering plastics such as ABS, HIPS, and other compatible polymers can be processed efficiently.",
  },
  {
    question: "Can rigid plastic waste be processed?",
    answer:
      "Yes. The plant is ideal for recycling rigid plastic products such as crates, containers, industrial scrap, and molded components.",
  },
  {
    question: "Can plastic film waste be recycled?",
    answer:
      "Yes. LDPE, HDPE, and PP plastic films can be recycled after proper cleaning and shredding.",
  },
  {
    question: "Why is degassing important in plastic recycling?",
    answer:
      "Degassing removes trapped gases, moisture, and volatile substances from molten plastic, improving pellet quality and processing stability.",
  },
  {
    question: "What is the role of the second extrusion stage?",
    answer:
      "The second extrusion stage improves melt homogeneity, removes residual gases, enhances filtration, and produces stronger recycled pellets.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "HPMC offers models with production capacities ranging from approximately 80 kg/hr to 220 kg/hr depending on machine configuration.",
  },
  {
    question: "Can the plant recycle mixed plastic scrap?",
    answer:
      "Compatible plastic materials can be recycled together, although proper material segregation is recommended for optimal pellet quality.",
  },
  {
    question: "Can colored plastic waste be recycled?",
    answer:
      "Yes. Colored plastic waste can be recycled into reusable plastic granules suitable for many industrial applications.",
  },
  {
    question: "How does the hydraulic screen changer improve recycling?",
    answer:
      "It continuously removes impurities from molten plastic without stopping production, reducing downtime and improving pellet quality.",
  },
  {
    question: "What are the advantages of Two Stage Recycling technology?",
    answer:
      "It offers superior plasticization, excellent degassing, improved filtration, better pellet quality, reduced contamination, and higher process stability.",
  },
  {
    question: "Can the machine produce uniform plastic pellets?",
    answer:
      "Yes. Optimized extrusion and pelletizing systems ensure consistent pellet size and excellent product quality.",
  },
  {
    question: "Does the machine improve recycled plastic quality?",
    answer:
      "Yes. The two-stage process improves melt consistency, reduces impurities, and enhances the physical properties of recycled plastic.",
  },
  {
    question: "Is the plant suitable for continuous industrial production?",
    answer:
      "Yes. The recycling plant is designed for continuous operation with stable output and reliable long-term performance.",
  },
  {
    question: "Can the machine reduce plastic waste?",
    answer:
      "Yes. It converts plastic scrap into reusable raw material, helping manufacturers reduce waste and improve sustainability.",
  },
  {
    question: "Why choose HPMC Two Stage Recycling Plants?",
    answer:
      "HPMC Two Stage Recycling Plants combine advanced extrusion technology, efficient degassing, superior filtration, consistent pellet quality, energy-efficient operation, and dependable after-sales support.",
  },
  {
    question: "What is the price of a Two Stage Recycling Plant in India?",
    answer:
      "The price depends on machine capacity, screw diameter, motor power, automation level, and customization requirements. Contact HPMC for a customized quotation.",
  },
  {
    question: "How do I choose the right Two Stage Recycling Plant?",
    answer:
      "The ideal machine depends on the type of plastic waste, required output, contamination level, pellet quality, and production capacity.",
  },
  {
    question: "Which recycling machine is best for PP and HDPE waste?",
    answer:
      "A Two Stage Recycling Plant is one of the best solutions for PP, HDPE, LDPE, HIPS, and ABS recycling because it offers superior filtration and degassing.",
  },
  {
    question: "Can the recycling plant be customized?",
    answer:
      "Yes. HPMC offers customized screw configurations, feeding systems, pelletizing units, filtration systems, and automation options.",
  },
  {
    question: "What screw diameters are available?",
    answer:
      "HPMC offers multiple screw diameters to meet different production capacities and plastic recycling applications.",
  },
  {
    question: "How much electricity does a Two Stage Recycling Plant consume?",
    answer:
      "Power consumption depends on machine size, motor capacity, production output, and the type of plastic material being processed.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. The optimized screw design and efficient heating system reduce energy consumption while maintaining high productivity.",
  },
  {
    question: "Can the recycling plant operate continuously?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with stable output and minimal downtime.",
  },
  {
    question: "Does the machine include PLC automation?",
    answer:
      "Yes. PLC automation with HMI touchscreen is available for simplified machine operation, monitoring, and production control.",
  },
  {
    question: "Can production recipes be saved?",
    answer:
      "Yes. Operators can save and recall machine settings to ensure consistent pellet quality and reduce setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide precise temperature control for consistent melting and recycling performance.",
  },
  {
    question: "Which pelletizing systems are available?",
    answer:
      "The machine supports strand pelletizing, die-face pelletizing, water-ring pelletizing, and customized pelletizing systems.",
  },
  {
    question: "Can vacuum degassing be added?",
    answer:
      "Yes. Optional vacuum venting systems can be integrated to improve moisture removal and melt quality.",
  },
  {
    question: "How often should the recycling plant be serviced?",
    answer:
      "Routine preventive maintenance based on operating hours helps maximize machine life and production efficiency.",
  },
  {
    question: "Is screw maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient maintenance, allowing quick inspection and replacement of wear components.",
  },
  {
    question: "Does HPMC provide installation services?",
    answer:
      "Yes. HPMC provides installation, commissioning, startup assistance, and production trials.",
  },
  {
    question: "Is operator training included?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe operation and optimum machine performance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. HPMC supplies genuine spare parts to ensure reliable operation and minimize production downtime.",
  },
  {
    question: "Does HPMC provide after-sales support?",
    answer:
      "Yes. HPMC offers technical assistance, maintenance support, spare parts, troubleshooting, and process optimization.",
  },
  {
    question: "Can I request a machine demonstration?",
    answer:
      "Yes. Product demonstrations and technical consultations can be arranged to help customers evaluate machine performance.",
  },
  {
    question: "Can production trials be conducted before purchase?",
    answer:
      "Yes. HPMC can conduct production trials using customer materials to verify recycling performance and pellet quality.",
  },
  {
    question:
      "Can the recycling plant be integrated into an existing recycling line?",
    answer:
      "Yes. The machine can be integrated with shredders, washing systems, dryers, conveyors, and downstream pelletizing equipment.",
  },
  {
    question: "What safety features are included in the recycling plant?",
    answer:
      "The machine includes emergency stop systems, overload protection, temperature monitoring, and operator safety features for reliable operation.",
  },
  {
    question: "Can the machine be upgraded in the future?",
    answer:
      "Yes. Automation systems, pelletizing units, filtration equipment, and feeding systems can be upgraded as production requirements grow.",
  },
  {
    question: "How can I request a quotation for a Two Stage Recycling Plant?",
    answer:
      "Simply contact HPMC with your material type, production capacity, and recycling requirements to receive a customized quotation.",
  },
  {
    question:
      "Can the Two Stage Recycling Plant process moisture-rich plastic waste?",
    answer:
      "Yes. The second extrusion stage helps remove residual moisture and volatile gases, resulting in better melt quality and superior recycled pellets.",
  },
  {
    question: "Can multilayer plastic waste be recycled?",
    answer:
      "Compatible multilayer plastic materials can be recycled after evaluating their composition and recycling suitability.",
  },
  {
    question: "Can the machine recycle industrial plastic scrap?",
    answer:
      "Yes. It is suitable for recycling post-industrial plastic scrap generated during manufacturing processes.",
  },
  {
    question: "Can the machine recycle factory production waste?",
    answer:
      "Yes. Production rejects, startup waste, edge trims, and plastic scrap can be efficiently recycled into reusable pellets.",
  },
  {
    question: "Does the Two Stage Recycling Plant improve melt quality?",
    answer:
      "Yes. The second extrusion stage improves melt homogeneity, removes contaminants, and enhances overall pellet quality.",
  },
  {
    question: "Can recycled pellets be used for injection molding?",
    answer:
      "Yes. High-quality recycled pellets produced by the plant are suitable for many injection molding applications.",
  },
  {
    question: "Can recycled pellets be used for extrusion applications?",
    answer:
      "Yes. The recycled pellets can be used for pipe extrusion, sheet extrusion, profile extrusion, and other compatible manufacturing processes.",
  },
  {
    question: "Can the recycling plant reduce raw material costs?",
    answer:
      "Yes. Recycling plastic waste into reusable pellets significantly reduces dependence on virgin raw materials and lowers manufacturing costs.",
  },
  {
    question: "How does the machine improve production efficiency?",
    answer:
      "Continuous operation, efficient filtration, improved degassing, and consistent pellet quality help increase overall production efficiency.",
  },
  {
    question: "What is the expected lifespan of a Two Stage Recycling Plant?",
    answer:
      "With regular preventive maintenance and genuine spare parts, HPMC recycling plants provide reliable long-term industrial performance.",
  },
  {
    question: "Does HPMC manufacture Two Stage Recycling Plants in India?",
    answer:
      "Yes. HPMC designs and manufactures high-performance Two Stage Recycling Plants in India using advanced extrusion technology.",
  },
  {
    question: "Does HPMC export recycling plants internationally?",
    answer:
      "Yes. HPMC supplies recycling plants to customers across domestic and international markets with complete technical support.",
  },
  {
    question: "Can the recycling plant be installed in an existing factory?",
    answer:
      "Yes. HPMC customizes plant layouts for seamless installation within existing manufacturing and recycling facilities.",
  },
  {
    question: "Is online technical support available?",
    answer:
      "Yes. HPMC provides remote troubleshooting, technical consultation, and process optimization support.",
  },
  {
    question: "Does HPMC help optimize recycling processes?",
    answer:
      "Yes. HPMC engineers assist customers with machine settings, process improvements, and production optimization.",
  },
  {
    question: "How quickly are spare parts supplied?",
    answer:
      "Standard spare parts are generally available for prompt dispatch to minimize production downtime.",
  },
  {
    question: "Can I visit the HPMC manufacturing facility?",
    answer:
      "Yes. Customers can schedule a factory visit to inspect machine manufacturing, quality control processes, and discuss project requirements.",
  },
  {
    question: "Can production trials be conducted using my material?",
    answer:
      "Yes. HPMC can perform recycling trials using customer-supplied plastic materials to verify machine performance.",
  },
  {
    question: "Is the Two Stage Recycling Plant environmentally friendly?",
    answer:
      "Yes. Recycling plastic waste reduces landfill disposal, conserves natural resources, and supports sustainable manufacturing.",
  },
  {
    question: "Can the recycling plant help reduce carbon emissions?",
    answer:
      "Yes. Recycling existing plastic materials reduces the need for virgin plastic production, helping lower the overall carbon footprint.",
  },
  {
    question: "Does the machine produce consistent pellet quality?",
    answer:
      "Yes. The combination of two-stage extrusion, efficient filtration, and controlled processing ensures uniform pellet quality.",
  },
  {
    question: "Which industries benefit most from recycled plastic pellets?",
    answer:
      "Packaging, automotive, construction, agriculture, furniture, consumer products, and extrusion industries widely use recycled plastic pellets.",
  },
  {
    question:
      "What makes a Two Stage Recycling Plant better for contaminated materials?",
    answer:
      "The additional extrusion stage improves filtration and degassing, making it more effective for processing difficult or lightly contaminated plastic waste.",
  },
  {
    question:
      "Why should I choose HPMC over other recycling machine manufacturers?",
    answer:
      "HPMC offers advanced engineering, customized recycling solutions, reliable machinery, comprehensive after-sales support, and decades of expertise in plastic processing equipment.",
  },
  {
    question: "Why choose HPMC Two Stage Recycling Plants?",
    answer:
      "HPMC Two Stage Recycling Plants deliver excellent plasticization, efficient degassing, superior filtration, consistent pellet quality, energy-efficient operation, robust construction, and dependable long-term technical support.",
  },
];

export default function PPRPipeExtruder() {
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
      <title>Two Stage Recycling Plant | HPMC</title>

      <meta
        name="description"
        content="Efficient two-stage plastic recycling plants for superior filtration, higher output, and quality recycled plastic production."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/two-stage-recycling-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroSection/two-stage.png')",
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
              Two Stage
              <span className="text-[#65BC4F]"> Recycling Plant</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Recycling Extruders are designed for processing HIPS, PP,
              LDPE, HDPE, ABS, and other engineering plastics. Equipped with
              high-efficiency venting screw technology, they deliver excellent
              plasticization and cost-effective recycling of reclaimed
              materials.
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
            Plastic Palletizing Plant -
            <span className="text-[var(--primary)]">
              {" "}
              Two Stage Recycling Plant
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
                HPMC Recycling Extruders are designed for processing HIPS,
                Crystal, PP, LDPE, HDPE, ABS, and a wide range of engineering
                plastics. Developed with advanced extrusion technology, these
                machines deliver reliable performance, excellent venting, and
                consistent processing results.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Equipped with high-efficiency venting screws and optimized
                plasticizing systems, the extruder ensures superior melt quality
                while reducing production costs through efficient recycling of
                reclaimed materials. It is ideal for plastic reprocessing and
                recycling applications across various industries.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Engineering Plastics Processing",
                  "High-Efficiency Venting",
                  "Excellent Plasticization",
                  "Reclaimed Material Recycling",
                  "Cost-Effective Production",
                  "Reliable Performance",
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
                    HIPS / PP / ABS
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Material Support
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    Advanced
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Venting Technology
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    Lower
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Processing Cost
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
                    "EXTRUSION 90",
                    "EXTRUSION 100",
                    "EXTRUSION 110",
                    "EXTRUSION 120",
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
                Two Stage Recycling Plant
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
