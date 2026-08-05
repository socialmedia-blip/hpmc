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

const galleryImages = ["/products/vented.png"];

const faqData = [
  {
    question: "What is a Vented Recycling Plant?",
    answer:
      "A Vented Recycling Plant is a plastic recycling system that uses a vented extruder to remove moisture, gases, and volatile contaminants while converting plastic waste into high-quality reusable pellets.",
  },
  {
    question: "How does a Vented Recycling Plant work?",
    answer:
      "The plant melts plastic waste, removes moisture and trapped gases through a venting system, filters impurities, and converts the molten polymer into uniform recycled plastic pellets.",
  },
  {
    question: "Why is venting important in plastic recycling?",
    answer:
      "Venting removes moisture, air, volatile compounds, and contaminants from molten plastic, improving pellet quality, surface finish, and processing stability.",
  },
  {
    question: "What is devolatilization in plastic extrusion?",
    answer:
      "Devolatilization is the process of removing moisture, solvents, gases, and volatile substances from molten polymers during extrusion to produce cleaner, higher-quality recycled plastic.",
  },
  {
    question: "Which plastic materials can be recycled using this plant?",
    answer:
      "The plant processes PP, HDPE, LDPE, LLDPE, HIPS, ABS, PS, PMMA, PA, PC, and many engineering plastics.",
  },
  {
    question: "Can the machine recycle post-consumer plastic waste?",
    answer:
      "Yes. It is suitable for recycling post-consumer and post-industrial plastic waste into reusable plastic granules.",
  },
  {
    question: "Can the plant recycle plastic film waste?",
    answer:
      "Yes. It efficiently processes LDPE film, LLDPE film, agricultural film, and industrial plastic film after proper preparation.",
  },
  {
    question: "Can rigid plastic waste be recycled?",
    answer:
      "Yes. The machine is suitable for rigid plastics such as HDPE containers, PP crates, ABS components, and engineering plastic scrap.",
  },
  {
    question: "What are recycled plastic pellets used for?",
    answer:
      "Recycled plastic pellets are used in injection molding, pipe manufacturing, blown film, sheet extrusion, household products, automotive components, and packaging.",
  },
  {
    question: "What is a Plastic Pelletizing Plant?",
    answer:
      "A Plastic Pelletizing Plant converts molten recycled plastic into uniform plastic pellets that can be reused as raw material in various manufacturing processes.",
  },
  {
    question:
      "What is the difference between a Recycling Plant and a Pelletizing Plant?",
    answer:
      "A recycling plant includes washing, shredding, drying, extrusion, and pelletizing, while a pelletizing plant mainly converts molten plastic into reusable pellets.",
  },
  {
    question: "What are the advantages of a Vented Extruder?",
    answer:
      "A vented extruder improves melt quality, removes moisture, reduces bubbles, increases productivity, and produces better-quality recycled plastic pellets.",
  },
  {
    question: "Can contaminated plastic be processed?",
    answer:
      "Yes. The venting system and hydraulic screen changer help remove contaminants, although proper washing before recycling is recommended.",
  },
  {
    question: "Can engineering plastics be recycled?",
    answer:
      "Yes. Engineering plastics such as ABS, PMMA, PA, and PC can be processed with efficient degassing and stable extrusion.",
  },
  {
    question: "What production capacity is available?",
    answer:
      "Depending on the machine model, production capacities range from approximately 80 kg/hr to 500 kg/hr.",
  },
  {
    question: "Which industries use recycled plastic pellets?",
    answer:
      "Packaging, automotive, construction, furniture, agriculture, consumer goods, pipe manufacturing, and injection molding industries widely use recycled plastic pellets.",
  },
  {
    question: "Can the machine process virgin and recycled materials together?",
    answer:
      "Yes. Virgin and recycled polymers can be blended according to production requirements and material compatibility.",
  },
  {
    question: "How does a hydraulic screen changer work?",
    answer:
      "The hydraulic screen changer continuously filters impurities from molten plastic without stopping production, improving product quality and reducing downtime.",
  },
  {
    question: "What types of impurities can be removed during recycling?",
    answer:
      "The recycling process helps remove moisture, gases, dust, paper particles, labels, fine contaminants, and other unwanted materials through filtration and venting.",
  },
  {
    question: "Can colored plastic waste be recycled?",
    answer:
      "Yes. Colored plastic scrap can be recycled into reusable pellets suitable for various industrial applications.",
  },
  {
    question: "Is the machine suitable for continuous production?",
    answer:
      "Yes. The Vented Recycling Plant is designed for continuous industrial operation with stable output and consistent pellet quality.",
  },
  {
    question: "Does the machine improve recycled plastic quality?",
    answer:
      "Yes. Efficient degassing, melt filtration, and optimized screw design significantly improve recycled plastic quality.",
  },
  {
    question: "Can moisture-rich plastic materials be processed?",
    answer:
      "Yes. The venting section removes residual moisture during processing, improving melt consistency and pellet quality.",
  },
  {
    question:
      "What makes vented recycling technology better than standard extrusion?",
    answer:
      "Vented recycling technology removes gases and moisture during processing, resulting in cleaner pellets, fewer defects, and improved processing efficiency.",
  },
  {
    question: "Why choose HPMC Vented Recycling Plants?",
    answer:
      "HPMC Vented Recycling Plants combine advanced venting technology, efficient degassing, high-quality pellet production, energy-efficient operation, robust construction, and dependable after-sales support.",
  },
  {
    question: "What is the price of a Vented Recycling Plant in India?",
    answer:
      "The price depends on production capacity, screw diameter, motor power, automation level, and customization requirements. Contact HPMC for a customized quotation.",
  },
  {
    question: "How do I choose the right Vented Recycling Plant?",
    answer:
      "The right machine depends on the type of plastic waste, required output capacity, contamination level, pellet quality, and future production requirements.",
  },
  {
    question: "Which plastic recycling machine is best for PP and PE waste?",
    answer:
      "A Vented Recycling Plant is one of the best solutions for recycling PP, HDPE, LDPE, and LLDPE because it effectively removes moisture and volatile gases during processing.",
  },
  {
    question: "Can the Vented Recycling Plant be customized?",
    answer:
      "Yes. HPMC offers customized screw designs, feeding systems, pelletizing units, automation options, and filtration systems based on customer requirements.",
  },
  {
    question: "What screw sizes are available?",
    answer:
      "Multiple screw diameters are available to suit medium and high-capacity plastic recycling operations.",
  },
  {
    question: "How much electricity does a Vented Recycling Plant consume?",
    answer:
      "Power consumption depends on the machine model, motor capacity, production rate, and material being processed.",
  },
  {
    question: "Is the machine energy efficient?",
    answer:
      "Yes. Advanced screw geometry and optimized heating systems maximize output while minimizing energy consumption.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. HPMC Vented Recycling Plants are designed for continuous industrial production with stable performance and minimal downtime.",
  },
  {
    question: "Does the machine include PLC automation?",
    answer:
      "Yes. PLC-based automation with an HMI touchscreen is available for easy operation, monitoring, and production management.",
  },
  {
    question: "Can processing parameters be saved?",
    answer:
      "Yes. Operators can store and recall production settings to ensure consistent product quality and faster setup.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide precise temperature control throughout the recycling process.",
  },
  {
    question: "Can different screen changer options be installed?",
    answer:
      "Yes. Hydraulic screen changers and other filtration systems can be configured according to the recycling application.",
  },
  {
    question: "Can the machine recycle mixed plastic materials?",
    answer:
      "It can process compatible plastic materials, but proper material segregation is recommended for the best recycling performance.",
  },
  {
    question: "Which pelletizing systems are available?",
    answer:
      "The plant supports strand pelletizing, water-ring pelletizing, die-face pelletizing, and customized pelletizing solutions.",
  },
  {
    question: "Can vacuum venting be added to the machine?",
    answer:
      "Yes. Optional vacuum venting systems can further improve moisture removal and devolatilization performance.",
  },
  {
    question: "How often should the recycling plant be serviced?",
    answer:
      "Routine preventive maintenance based on operating hours helps maintain consistent performance and extend machine life.",
  },
  {
    question: "Is screw maintenance easy?",
    answer:
      "Yes. The screw assembly is designed for convenient maintenance, reducing downtime during servicing.",
  },
  {
    question: "Does HPMC provide installation services?",
    answer:
      "Yes. HPMC provides installation, commissioning, machine testing, and startup assistance.",
  },
  {
    question: "Is operator training provided?",
    answer:
      "Yes. Comprehensive operator training is provided to ensure safe operation and maximum production efficiency.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. HPMC supplies genuine spare parts to ensure reliable machine performance and minimize downtime.",
  },
  {
    question: "Does HPMC provide after-sales support?",
    answer:
      "Yes. HPMC offers technical support, maintenance services, troubleshooting, spare parts, and process optimization.",
  },
  {
    question: "Can I request a machine demonstration?",
    answer:
      "Yes. Product demonstrations and technical consultations can be arranged to help customers evaluate machine performance.",
  },
  {
    question: "Can production trials be conducted before purchase?",
    answer:
      "Yes. Trial production using customer materials can be conducted to verify machine performance and pellet quality.",
  },
  {
    question:
      "Can the recycling plant be integrated into an existing recycling line?",
    answer:
      "Yes. HPMC machines can be integrated with shredders, washing plants, dryers, conveyors, and downstream pelletizing systems.",
  },
  {
    question: "How can I get a quotation for a Vented Recycling Plant?",
    answer:
      "Simply contact HPMC with your material type, production capacity, and recycling requirements to receive a customized quotation.",
  },
  {
    question:
      "Can the Vented Recycling Plant process moisture-rich plastic waste?",
    answer:
      "Yes. The venting system efficiently removes residual moisture from molten plastic, producing high-quality recycled pellets.",
  },
  {
    question: "Can the machine recycle printed plastic film?",
    answer:
      "Yes. Printed plastic films can be recycled after proper washing and preparation, depending on contamination levels.",
  },
  {
    question: "Can multilayer plastic waste be processed?",
    answer:
      "Compatible multilayer plastic materials can be recycled after evaluation of their composition and processing characteristics.",
  },
  {
    question: "What makes vented extrusion better than standard extrusion?",
    answer:
      "Vented extrusion removes trapped gases and moisture during processing, resulting in stronger pellets, fewer defects, and improved product quality.",
  },
  {
    question: "Does the machine improve melt quality?",
    answer:
      "Yes. Efficient degassing and optimized screw design produce a cleaner, more homogeneous polymer melt.",
  },
  {
    question: "Can recycled pellets be used for injection molding?",
    answer:
      "Yes. High-quality recycled pellets can be used in injection molding, depending on the polymer type and application.",
  },
  {
    question: "Can recycled pellets be used for extrusion applications?",
    answer:
      "Yes. The recycled pellets are suitable for pipe extrusion, sheet extrusion, profile extrusion, and other compatible applications.",
  },
  {
    question: "Can the machine reduce material wastage?",
    answer:
      "Yes. Efficient processing and continuous filtration help minimize material loss and improve raw material utilization.",
  },
  {
    question: "Does the recycling plant reduce production costs?",
    answer:
      "Yes. Recycling plastic waste reduces raw material costs while improving manufacturing efficiency and sustainability.",
  },
  {
    question: "What is the expected lifespan of the recycling plant?",
    answer:
      "With proper maintenance and genuine spare parts, HPMC recycling plants provide reliable performance for many years.",
  },
  {
    question: "Can the machine be upgraded in the future?",
    answer:
      "Yes. Automation systems, pelletizing units, feeding systems, and filtration equipment can be upgraded as production requirements grow.",
  },
  {
    question: "Does HPMC manufacture Vented Recycling Plants in India?",
    answer:
      "Yes. HPMC designs and manufactures high-performance Vented Recycling Plants in India for domestic and international customers.",
  },
  {
    question: "Does HPMC export recycling plants worldwide?",
    answer:
      "Yes. HPMC exports plastic recycling plants and extrusion machinery to customers across various international markets.",
  },
  {
    question: "Can the recycling plant be installed in an existing factory?",
    answer:
      "Yes. HPMC customizes plant layouts to integrate smoothly into existing recycling and manufacturing facilities.",
  },
  {
    question: "Is online technical support available?",
    answer:
      "Yes. HPMC provides remote technical assistance, troubleshooting, and process optimization support.",
  },
  {
    question: "Does HPMC help optimize recycling processes?",
    answer:
      "Yes. HPMC engineers assist customers with machine setup, process optimization, and production efficiency improvements.",
  },
  {
    question: "How quickly can spare parts be delivered?",
    answer:
      "Standard spare parts are generally available for prompt dispatch to reduce production downtime.",
  },
  {
    question: "Can I visit the HPMC manufacturing facility?",
    answer:
      "Yes. Customers are welcome to schedule a factory visit to inspect manufacturing facilities and discuss project requirements.",
  },
  {
    question: "Can recycling trials be conducted using my plastic waste?",
    answer:
      "Yes. HPMC can conduct production trials using customer-supplied plastic materials to evaluate machine performance.",
  },
  {
    question: "Is the recycling plant environmentally friendly?",
    answer:
      "Yes. Recycling plastic waste helps reduce landfill disposal, conserve resources, and support sustainable manufacturing practices.",
  },
  {
    question: "Can the machine help reduce carbon footprint?",
    answer:
      "Yes. By converting plastic waste into reusable raw material, the recycling plant contributes to reducing environmental impact.",
  },
  {
    question: "What certifications can HPMC machines support?",
    answer:
      "HPMC manufactures machinery following strict quality standards. Certification availability depends on customer and regional requirements.",
  },
  {
    question: "Which industries benefit most from recycled plastic pellets?",
    answer:
      "Packaging, automotive, construction, agriculture, furniture, consumer products, and plastic processing industries widely use recycled pellets.",
  },
  {
    question:
      "Why should I choose HPMC over other plastic recycling machine manufacturers?",
    answer:
      "HPMC offers robust engineering, efficient venting technology, customized recycling solutions, dependable after-sales support, and decades of experience in plastic processing machinery.",
  },
  {
    question: "Why choose HPMC Vented Recycling Plants?",
    answer:
      "HPMC Vented Recycling Plants deliver efficient degassing, superior pellet quality, reliable continuous production, energy-efficient operation, customized machine configurations, and comprehensive technical support for modern plastic recycling applications.",
  },
];

const specifications = [
  {
    parameter: "Production (Kg/Hr)",
    values: [
      "80-100",
      "125-150",
      "150-175 / 200-225",
      "200-220 / 250-300",
      "300-350",
      "350-400",
      "400-500",
    ],
  },
  {
    parameter: "Screw Diameter (mm)",
    values: ["90", "100", "110", "120", "130", "140", "150"],
  },
  {
    parameter: "Main Motor (kW)",
    values: ["22.5", "30", "37 / 55", "55 / 75", "75", "90", "110"],
  },
  {
    parameter: "Heating Load (kW)",
    values: ["15", "18", "22", "32", "55", "60", "65"],
  },
  {
    parameter: "Hydraulic Screen Changer (Inch/HP)",
    values: ["8/3", "8/3", "8/3", "10/5", "10/5", "12/5", "12/5"],
  },
  {
    parameter: "L/D Ratio",
    values: ["33:1", "33:1", "33:1", "30:1", "30:1", "30:1", "30:1"],
  },
  {
    parameter: "Heating Zones",
    values: ["6", "7", "10", "10", "12", "13", "15"],
  },
  {
    parameter: "Rotating Speed (RPM)",
    values: ["50-70", "50-70", "50-70", "50-70", "50-70", "50-70", "50-70"],
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

  const [visibleFaqCount, setVisibleFaqCount] = useState(5);
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
      <title>Vented Recycling Plant | HPMC</title>

      <meta
        name="description"
        content="High-performance vented recycling plants designed for effective degassing and improved recycled plastic quality."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/vented-recycling-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/vented.png')",
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
              Vented
              <span className="text-[#65BC4F]"> Recycling Plant</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Vented Type Extruders are engineered for efficient degassing
              and devolatilization of polymers during processing. Suitable for
              PP, PE, HIPS, ABS, PMMA, PA, and other engineering plastics, they
              deliver superior venting, excellent plasticization, and
              cost-effective processing of both virgin and recycled materials.
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
              Vented Recycling Plant
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
                HPMC Vented Type Extruders are specially designed for degassing
                and devolatilization during polymer processing. Suitable for PP,
                LDPE, HDPE, HIPS, PS, ABS, PMMA, PC, PA, and other engineering
                plastics, they ensure superior processing performance and
                product quality.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Equipped with high-efficiency venting screws and advanced mixing
                technology, the extruder effectively removes moisture and
                volatile gases during processing. It is ideal for both virgin
                and reclaimed materials, delivering excellent plasticization,
                improved melt quality, and reduced production costs.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Efficient Degassing",
                  "Devolatilization Technology",
                  "Engineering Plastics Processing",
                  "Excellent Plasticization",
                  "Recycled Material Compatible",
                  "Improved Melt Quality",
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
                  <h4 className="text-xl md:text-2xl font-bold text-[var(--primary)]">
                    PP / PE / ABS
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Material Support
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-xl md:text-2xl font-bold text-[var(--primary)]">
                    Advanced
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Venting System
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-xl md:text-2xl font-bold text-[var(--primary)]">
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
                poster="/videos/vented.png"
                className="w-full h-full object-contain"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/videos/vented.mp4" type="video/mp4" />
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

                  {[
                    "EXTRUDER 90",
                    "EXTRUDER 100",
                    "EXTRUDER 110",
                    "EXTRUDER 120",
                    "EXTRUDER 130",
                    "EXTRUDER 140",
                    "EXTRUDER 150",
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
                  <span className="block text-xs font-semibold uppercase tracking-[2px] text-[var(--primary)]">
                    Explore More
                  </span>
                  <span className="block text-sm font-bold sm:text-base">
                    View next {nextFaqCount} FAQs
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
