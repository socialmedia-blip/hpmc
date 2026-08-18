"use client";
import Image from "next/image";

import { useRef, useState, type MouseEvent } from "react";
import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import {
  Play,
  ChevronDown,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import "swiper/css";
import DemoPopup from "../components/PopupDemo";

const galleryImages = [
  "/products/co-rotating twing screw extruder/corotating-twin-screw-extruder-for-compounding-recycling-engineering-plastic/corotating-twin-screw-extruder-for-compounding-recycling2.jpg",
];

const baseFaqData = [
  {
    question: "What is a Co-rotating Twin Screw Extruder?",
    answer:
      "A Co-rotating Twin Screw Extruder is a high-performance compounding machine designed for superior mixing, melting, and homogenization of polymers, additives, fillers, and reinforcing materials. It is widely used in plastic compounding and masterbatch production.",
  },
  {
    question:
      "What materials can be processed using the HPMC Co-rotating Twin Screw Extruder?",
    answer:
      "The HPMC Co-rotating Twin Screw Extruder can process engineering plastics, polypropylene (PP), polyethylene (PE), PVC, thermoplastic elastomers (TPE), masterbatches, recycled plastics, glass fibre reinforced compounds, talc-filled compounds, and various polymer blends.",
  },
  {
    question:
      "What are the main applications of the Co-rotating Twin Screw Extruder?",
    answer:
      "It is widely used for polymer compounding, color masterbatch production, filler masterbatch, engineering plastics, plastic recycling, cable compounds, biodegradable plastics, and reinforced composite materials.",
  },
  {
    question: "What is the maximum production capacity of the machine?",
    answer:
      "Depending on the machine model, the HPMC Co-rotating Twin Screw Extruder offers production capacities ranging from approximately 20 kg/hr up to 1000 kg/hr while maintaining excellent product quality.",
  },
  {
    question: "Can the machine process high filler loading formulations?",
    answer:
      "Yes. The machine is capable of processing polymers containing up to 80% talc filler, making it ideal for high filler masterbatch and compound production.",
  },
  {
    question: "Can it process glass fibre reinforced materials?",
    answer:
      "Yes. HPMC Co-rotating Twin Screw Extruders can process formulations containing up to 50% glass fibre while ensuring excellent fibre dispersion and product consistency.",
  },
  {
    question: "What are the advantages of co-rotating twin screw technology?",
    answer:
      "Co-rotating twin screw technology provides superior distributive and dispersive mixing, excellent material homogenization, high productivity, stable processing, and consistent product quality.",
  },
  {
    question: "Is the screw configuration customizable?",
    answer:
      "Yes. The modular screw design allows different screw element configurations to suit specific materials, compounding requirements, and production processes.",
  },
  {
    question: "Can additional feeders be installed?",
    answer:
      "Yes. The extruder can be equipped with up to three side feeders for adding talc, glass fibre, or other additives during processing, improving flexibility for different formulations.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. The optimized L/D ratio, efficient drive system, and advanced temperature control help reduce power consumption while maintaining high throughput and stable operation.",
  },
  {
    question: "Does HPMC provide installation and technical support?",
    answer:
      "Yes. HPMC provides installation, commissioning, operator training, spare parts support, preventive maintenance, and comprehensive after-sales service for all extrusion systems.",
  },
  {
    question: "Which industries use Co-rotating Twin Screw Extruders?",
    answer:
      "These machines are widely used in the plastics, automotive, packaging, electrical, construction, polymer compounding, masterbatch manufacturing, and recycling industries.",
  },
  {
    question: "What maintenance is required for the machine?",
    answer:
      "Regular maintenance includes inspecting the screw and barrel, gearbox lubrication, heating and cooling systems, feeders, electrical components, and cleaning the processing section to ensure reliable performance.",
  },
  {
    question: "What machine models are available?",
    answer:
      "HPMC offers Co-rotating Twin Screw Extruders in multiple models, including 50 mm, 65 mm, 72 mm, and 92 mm screw diameter configurations to suit different production capacities.",
  },
  {
    question: "Why choose HPMC Co-rotating Twin Screw Extruders?",
    answer:
      "HPMC machines deliver excellent mixing efficiency, high throughput, modular screw design, energy-efficient operation, reliable performance, and outstanding after-sales support, making them ideal for demanding polymer compounding applications.",
  },
];
const extraFaqData = [
  {
    question:
      "How is a co-rotating twin screw extruder different from a counter-rotating twin screw extruder?",
    answer:
      "A co-rotating twin screw extruder is preferred for plastic compounding, masterbatch, filler loading, engineering plastic, and recycling applications because both screws rotate in the same direction and create strong mixing and self-wiping action. Counter-rotating twin screw extruders are commonly used for PVC pipe and profile extrusion.",
  },
  {
    question:
      "Is the HPMC Co-rotating Twin Screw Extruder suitable for color masterbatch production?",
    answer:
      "Yes. It provides excellent pigment dispersion, uniform melt mixing, stable output, and consistent granule quality for PE, PP, ABS, PS, PET, and engineering plastic color masterbatch formulations.",
  },
  {
    question: "Can this machine be used for filler masterbatch manufacturing?",
    answer:
      "Yes. It is widely used for filler masterbatch with calcium carbonate, talc, barium sulphate, mica, and other mineral fillers, depending on polymer base, filler percentage, and final application.",
  },
  {
    question:
      "What type of pelletizing system can be supplied with the extruder?",
    answer:
      "The line can be configured with strand pelletizing, water-ring pelletizing, die-face pelletizing, or underwater pelletizing based on material behavior, output requirement, pellet quality, and production process.",
  },
  {
    question:
      "Can the extruder process recycled plastic granules and reprocessed material?",
    answer:
      "Yes. It can process recycled PP, PE, ABS, HIPS, PC, PA, and other thermoplastics with additives, fillers, stabilizers, and compatibilizers to improve material consistency.",
  },
  {
    question: "Is vacuum venting available for moisture and volatile removal?",
    answer:
      "Yes. Vacuum venting can remove moisture, trapped air, monomers, and volatile gases during compounding, helping improve pellet quality, melt stability, and final product performance.",
  },
  {
    question: "What does L/D ratio mean in a twin screw extruder?",
    answer:
      "L/D ratio means screw length divided by screw diameter. A higher L/D ratio provides more processing zones for feeding, melting, mixing, venting, and pressure build-up.",
  },
  {
    question: "Which L/D ratio is best for polymer compounding?",
    answer:
      "The best L/D ratio depends on material and formulation. HPMC offers L/D ratios from 32 to 48 for masterbatch, high filler compounds, engineering plastics, recycling, and reinforced compounds.",
  },
  {
    question: "Can the machine produce engineering plastic compounds?",
    answer:
      "Yes. It can produce PA, PC, ABS, PBT, PET, PPO, PPS, TPE, TPU, and polymer blend compounds with additives, flame retardants, glass fibre, impact modifiers, and mineral fillers.",
  },
  {
    question: "Can flame retardant compounds be processed?",
    answer:
      "Yes. Flame retardant polymer compounds can be processed with the correct screw design, feeding system, temperature profile, and venting arrangement based on the resin and additive package.",
  },
  {
    question: "Can biodegradable plastic compounds be made on this machine?",
    answer:
      "Yes. It can be configured for biodegradable plastic compounding with PLA, PBAT, starch-based blends, and compostable polymer formulations when heat-sensitive processing is required.",
  },
  {
    question: "Can TPE, TPU, and elastomer compounds be processed?",
    answer:
      "Yes. HPMC Co-rotating Twin Screw Extruders can process TPE, TPU, TPR, and elastomer compounds with plasticizers, fillers, colors, and performance additives.",
  },
  {
    question: "What is the benefit of modular screw elements?",
    answer:
      "Modular screw elements allow conveying, kneading, mixing, reverse, and venting sections to be arranged according to the formulation, improving flexibility, dispersion, and process control.",
  },
  {
    question: "Can the barrel sections be customized?",
    answer:
      "Yes. Barrel sections can be configured for main feeding, side feeding, liquid dosing, venting, vacuum venting, mixing, and metering for different compounding requirements.",
  },
  {
    question: "What is side feeding in a twin screw extruder?",
    answer:
      "Side feeding introduces fillers, glass fibre, additives, or heat-sensitive materials after the polymer has melted. It supports higher loading levels and better process flexibility.",
  },
  {
    question: "Can liquid additives be dosed into the extruder?",
    answer:
      "Yes. Liquid dosing systems can be integrated for oils, plasticizers, processing aids, coupling agents, and other liquid additives depending on dosing accuracy requirements.",
  },
  {
    question: "What feeding systems are available?",
    answer:
      "The line can be supplied with volumetric feeders, gravimetric feeders, twin screw feeders, side feeders, liquid dosing systems, and material handling accessories.",
  },
  {
    question: "Can the machine handle powder, granules, flakes, and fibre?",
    answer:
      "Yes. With suitable feeding and screw configuration, it can process polymer granules, powder, regrind, flakes, mineral fillers, additives, pigments, and glass fibre.",
  },
  {
    question: "How does the extruder improve additive dispersion?",
    answer:
      "The intermeshing co-rotating screw design creates controlled shear and repeated material splitting and recombination, improving pigment, filler, stabilizer, and modifier dispersion.",
  },
  {
    question: "Can the machine reduce batch-to-batch variation?",
    answer:
      "Yes. Proper feeder selection, screw configuration, temperature control, and process settings improve consistency in melt quality, filler dispersion, color shade, and pellet size.",
  },
  {
    question: "What controls are provided with the machine?",
    answer:
      "HPMC can provide PLC-based controls, touch screen HMI, temperature controllers, drive controls, feeder controls, safety interlocks, and optional automation features.",
  },
  {
    question: "Is PLC automation available?",
    answer:
      "Yes. PLC automation and HMI control can support recipe management, temperature monitoring, motor load display, alarm handling, and operator-friendly machine operation.",
  },
  {
    question:
      "Can the extruder be connected with upstream and downstream equipment?",
    answer:
      "Yes. It can be integrated with mixers, feeders, material loaders, cooling tanks, air knives, pelletizers, classifiers, pellet cooling systems, storage silos, and packing systems.",
  },
  {
    question: "What utilities are required to install the machine?",
    answer:
      "Utility requirements depend on the model and line configuration. Common needs include electrical power, cooling water, compressed air, vacuum, material handling space, and proper ventilation.",
  },
  {
    question:
      "How much space is required for a co-rotating twin screw extrusion line?",
    answer:
      "Floor space depends on screw diameter, feeder layout, pelletizing system, cooling arrangement, and automation level. HPMC can help plan the line layout for the factory.",
  },
  {
    question: "Can HPMC help select the right screw diameter?",
    answer:
      "Yes. HPMC recommends screw diameter based on target output, material type, filler loading, formulation complexity, pelletizing method, budget, and future capacity requirement.",
  },
  {
    question: "Which model is suitable for small batch compounding?",
    answer:
      "For lower output and development-scale production, smaller models such as HPMC 50 may be suitable depending on material, formulation, trial need, and output expectation.",
  },
  {
    question: "Which model is suitable for high-output production?",
    answer:
      "For large-scale masterbatch, filler compound, and recycling applications, larger models such as HPMC 72 or HPMC 92 may be suitable depending on required kg/hr output.",
  },
  {
    question: "Can the machine be used for PVC compounding?",
    answer:
      "Yes. It can be configured for selected PVC compounding applications such as soft PVC compounds, cable grade PVC compounds, and additive-rich formulations.",
  },
  {
    question:
      "Can the co-rotating twin screw extruder make cable grade compounds?",
    answer:
      "Yes. It can be used for cable grade PVC, PE, and other polymer compounds where additive mixing, color dispersion, plasticizer distribution, and stable pellet quality are important.",
  },
  {
    question: "Can the extruder process glass fibre without fibre damage?",
    answer:
      "The screw configuration and side feeding position can support good fibre dispersion while helping control excessive fibre breakage, depending on glass fibre percentage and required properties.",
  },
  {
    question: "How is screw and barrel wear controlled?",
    answer:
      "Wear is managed through suitable metallurgy, screw element selection, barrel liner options, correct filler feeding, optimized speed, and preventive maintenance.",
  },
  {
    question: "What safety features are included?",
    answer:
      "Safety features may include emergency stop, drive protection, motor overload protection, temperature alarms, pressure monitoring, guards, interlocks, and electrical panel safety.",
  },
  {
    question: "Can pressure and melt temperature be monitored?",
    answer:
      "Yes. Melt pressure and melt temperature monitoring can be provided to help operators maintain stable processing, protect downstream equipment, and improve compound quality.",
  },
  {
    question: "How long does installation and commissioning take?",
    answer:
      "Installation and commissioning time depends on machine size, line configuration, utility readiness, material availability, and trial requirements. HPMC guides startup activities.",
  },
  {
    question:
      "Does HPMC support material trials before finalizing the machine?",
    answer:
      "Customers can discuss material trials or technical evaluation with HPMC to understand process feasibility, output range, pellet quality, screw configuration, and suitable line setup.",
  },
  {
    question: "Can the machine be customized for Indian and export markets?",
    answer:
      "Yes. HPMC can customize lines for Indian and international customers with suitable electrical standards, documentation, automation, spare parts planning, and shipment requirements.",
  },
  {
    question: "What information is needed to request a quotation?",
    answer:
      "Share raw material, filler or additive percentage, required output in kg/hr, final application, pelletizing preference, automation needs, available utilities, and factory location.",
  },
  {
    question:
      "How can I choose between strand pelletizing and water-ring pelletizing?",
    answer:
      "Strand pelletizing suits many engineering plastic and masterbatch applications. Water-ring pelletizing suits materials that cut well at the die face. Selection depends on polymer, viscosity, and throughput.",
  },
  {
    question: "Can HPMC provide spare screw elements and barrel parts?",
    answer:
      "Yes. HPMC provides spare screw elements, barrel sections, heaters, thermocouples, gearbox support, electrical parts, feeder components, pelletizer parts, and other critical spares.",
  },
  {
    question: "What are common signs that screw elements need inspection?",
    answer:
      "Common signs include reduced output, higher motor load, poor mixing, inconsistent pellet quality, pressure instability, unusual noise, temperature variation, or visible wear during maintenance.",
  },
  {
    question: "Can the line be upgraded later for higher automation?",
    answer:
      "Yes. Depending on the original configuration, upgrades may include gravimetric feeding, improved controls, additional side feeders, vacuum systems, pellet handling, and data monitoring.",
  },
  {
    question:
      "Why is HPMC considered a co-rotating twin screw extruder manufacturer in India?",
    answer:
      "HPMC manufactures plastic extrusion machinery in India and supplies co-rotating twin screw systems for compounding, masterbatch, filler compound, cable compound, engineering plastic, and recycling applications.",
  },
  {
    question:
      "How do I contact HPMC for a co-rotating twin screw extruder enquiry?",
    answer:
      "You can contact HPMC through the enquiry form, request a demo, request a quotation, or share your material, output capacity, formulation, and application details with the technical team.",
  },
];

const faqData = [...baseFaqData, ...extraFaqData];
export default function CorotatingTwinScrewExtruder() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [, setCatalogueToDownload] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const [active, setActive] = useState<number | null>(0);
  const [visibleFaqCount, setVisibleFaqCount] = useState(10);

  const displayedFaqs = faqData.slice(0, visibleFaqCount);
  const hasMoreFaqs = visibleFaqCount < faqData.length;
  const nextFaqCount = Math.min(10, faqData.length - visibleFaqCount);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

  return (
    <div>
      <title>Co-Rotating Twin Screw Extruder | HPMC</title>

      <meta
        name="description"
        content="Advanced co-rotating twin screw extruders for plastic compounding, masterbatch production, and engineering polymers."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/co-rotating-twin-screw-extruder"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroSection/co-rotating.png')",
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
              Co-rotating
              <span className="block text-[#65BC4F]">Twin Screw Extruder</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-700 max-w-[560px]">
              High-performance co-rotating twin screw extruder engineered for
              polymer compounding, masterbatch production, engineering plastics,
              glass fibre reinforced compounds, and high filler applications
              with excellent mixing efficiency and consistent output.
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
            Plastic Recycling Plant -
            <span className="text-[var(--primary)]">
              {" "}
              Co-Rotating Twin Screw Extruder
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
                HPMC Co-rotating Twin Screw Extruders are engineered for
                high-performance polymer compounding, delivering superior
                mixing, excellent dispersion, and consistent melt quality. The
                advanced screw design ensures efficient processing while
                maintaining high productivity and reliable operation for
                demanding industrial applications.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Designed for masterbatch production, engineering plastics,
                recycled materials, and high filler formulations, the extruder
                can process polymers with up to <strong>80% talc</strong> and{" "}
                <strong>50% glass fibre</strong> in a single process. Its
                modular configuration provides excellent flexibility for a wide
                range of compounding requirements.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Up to 80% Talc Loading",
                  "Up to 50% Glass Fibre",
                  "Excellent Mixing Performance",
                  "Modular Screw Design",
                  "High Production Efficiency",
                  "Energy-Efficient Operation",
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
                    4
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Machine Models
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    1000
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Max Output (kg/hr)
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    80%
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Talc Loading Capacity
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

      <section className="py-16 bg-[var(--background)]">
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
                poster="/videos/co-ro.png"
                className="w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/videos/cor-rotating.mp4" type="video/mp4" />
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

      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Technical Specifications
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Machine
              <span className="text-[var(--primary)]"> Specifications</span>
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] leading-7">
              Explore the available Co-Rotating Twin Screw Extruder models
              designed for different production capacities and compounding
              requirements.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-primary)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="bg-[var(--primary)] text-white">
                    <th className="px-6 py-5 font-semibold">Model</th>
                    <th className="px-6 py-5 font-semibold">
                      Screw Diameter (mm)
                    </th>
                    <th className="px-6 py-5 font-semibold">
                      Screw Speed (RPM)
                    </th>
                    <th className="px-6 py-5 font-semibold">Motor Power</th>
                    <th className="px-6 py-5 font-semibold">L/D Ratio</th>
                    <th className="px-6 py-5 font-semibold">Output (kg/hr)</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[var(--border)]">
                  {[
                    {
                      model: "HPMC 50",
                      diameter: "50.5",
                      speed: "500 / 600",
                      motor: "37 / 45",
                      ld: "32 – 48",
                      output: "20 – 150",
                    },
                    {
                      model: "HPMC 65",
                      diameter: "62.4",
                      speed: "400 / 500",
                      motor: "55 / 75",
                      ld: "32 – 48",
                      output: "100 – 300",
                    },
                    {
                      model: "HPMC 72",
                      diameter: "71.2",
                      speed: "400 / 500",
                      motor: "90 / 110",
                      ld: "32 – 48",
                      output: "300 – 600",
                    },
                    {
                      model: "HPMC 92",
                      diameter: "91",
                      speed: "400 / 500",
                      motor: "220 / 250",
                      ld: "32 – 40",
                      output: "600 – 1000",
                    },
                  ].map((item, index) => (
                    <tr
                      key={item.model}
                      className={`
                  transition-colors hover:bg-[var(--primary)]/5
                  ${index % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                `}
                    >
                      <td className="px-6 py-5 font-bold text-[var(--primary)]">
                        {item.model}
                      </td>

                      <td className="px-6 py-5 text-[var(--text-secondary)]">
                        {item.diameter}
                      </td>

                      <td className="px-6 py-5 text-[var(--text-secondary)]">
                        {item.speed}
                      </td>

                      <td className="px-6 py-5 text-[var(--text-secondary)]">
                        {item.motor}
                      </td>

                      <td className="px-6 py-5 text-[var(--text-secondary)]">
                        {item.ld}
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 font-semibold text-[var(--primary)]">
                          {item.output}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[var(--border)] px-6 py-4">
              <p className="text-sm text-[var(--text-secondary)]">
                * Production capacity may vary depending on material,
                formulation, filler loading, and processing conditions.
              </p>
            </div>
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
                Co-Rotating Twin Screw Extruder
              </span>
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
              Find answers to common questions about polymer compounding,
              machine specifications, applications, production capacity,
              installation, operation, and maintenance.
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
