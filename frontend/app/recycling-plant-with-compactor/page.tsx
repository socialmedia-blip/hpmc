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
  "/products/recycling-plant-with-compacter.png",
  "/products/plastic-recycling-plant/Recycling plant with compactor/compacter_prd.jpg",
];

const faqData = [
  {
    question: "What is a Recycling Plant with Compactor?",
    answer:
      "A Recycling Plant with Compactor is an advanced plastic recycling machine that combines compaction, extrusion, filtration, and pelletizing to convert plastic waste into high-quality reusable plastic granules.",
  },
  {
    question: "How does a Recycling Plant with Compactor work?",
    answer:
      "The compactor cuts, dries, densifies, and preheats plastic waste before feeding it into the extruder, producing consistent recycled plastic pellets with higher productivity.",
  },
  {
    question: "Why is a Compactor used in a Plastic Recycling Plant?",
    answer:
      "The compactor improves feeding efficiency, reduces moisture, increases material density, and delivers stable extrusion for superior pellet quality.",
  },
  {
    question:
      "Which plastic materials can be recycled using a Recycling Plant with Compactor?",
    answer:
      "The machine can recycle LDPE, HDPE, LLDPE, PP, ABS, Polycarbonate, BOPP film, woven bags, raffia, industrial plastic scrap, and many engineering plastics.",
  },
  {
    question: "What are the advantages of a Recycling Plant with Compactor?",
    answer:
      "It offers higher production efficiency, lower power consumption, improved pellet quality, better material feeding, and reduced processing costs.",
  },
  {
    question: "Which is the best Recycling Plant with Compactor in India?",
    answer:
      "Hindustan Plastic and Machine Corporation manufactures high-performance Recycling Plants with Compactor designed for efficient plastic waste recycling, reliable operation, and long-term industrial use.",
  },
  {
    question:
      "Who is the best Plastic Recycling Machine manufacturer in India?",
    answer:
      "Hindustan Plastic and Machine Corporation is recognized for manufacturing advanced plastic recycling plants, pelletizing machines, and extrusion systems for a wide range of plastic recycling applications.",
  },
  {
    question: "Can this Recycling Plant recycle plastic film waste?",
    answer:
      "Yes. It efficiently processes LDPE film, LLDPE film, agricultural film, stretch film, shopping bags, and industrial packaging film.",
  },
  {
    question: "Can rigid plastic waste be recycled?",
    answer:
      "Yes. The machine is suitable for recycling HDPE drums, PP crates, ABS components, injection molded products, and rigid industrial plastic waste.",
  },
  {
    question: "Can printed plastic film be recycled?",
    answer:
      "Yes. Printed plastic film and laminated film can be recycled after proper washing and preparation.",
  },
  {
    question: "What industries use Recycling Plants with Compactor?",
    answer:
      "Packaging, automotive, agriculture, furniture, consumer goods, injection molding, extrusion, and plastic recycling industries widely use these recycling plants.",
  },
  {
    question: "What are recycled plastic granules used for?",
    answer:
      "Recycled granules are widely used in pipe manufacturing, blown film, sheet extrusion, injection molding, household products, packaging materials, and industrial plastic products.",
  },
  {
    question: "Can engineering plastics be recycled?",
    answer:
      "Yes. Engineering plastics such as ABS, Polycarbonate, HIPS, and compatible industrial polymers can be recycled efficiently.",
  },
  {
    question: "Can the machine recycle post-consumer plastic waste?",
    answer:
      "Yes. It is designed to process post-consumer plastic waste as well as post-industrial plastic scrap after proper washing and sorting.",
  },
  {
    question: "Can contaminated plastic waste be recycled?",
    answer:
      "Yes. The hydraulic screen changer removes impurities from molten plastic, helping produce cleaner recycled pellets.",
  },
  {
    question:
      "What is the production capacity of a Recycling Plant with Compactor?",
    answer:
      "Production capacity depends on the selected model and application, with machines available for medium and high-capacity industrial recycling operations.",
  },
  {
    question: "How does the compactor improve recycling efficiency?",
    answer:
      "The compactor reduces material volume, removes moisture, improves feeding consistency, and increases extrusion stability for higher output.",
  },
  {
    question:
      "What makes a Recycling Plant with Compactor better than a standard recycling machine?",
    answer:
      "Integrated compaction improves material handling, increases productivity, reduces downtime, and delivers superior pellet quality compared to conventional recycling systems.",
  },
  {
    question: "Can recycled pellets be reused in manufacturing?",
    answer:
      "Yes. High-quality recycled pellets can be reused for injection molding, extrusion, pipe manufacturing, packaging products, and other industrial applications.",
  },
  {
    question: "Is the Recycling Plant suitable for continuous production?",
    answer:
      "Yes. It is designed for continuous industrial operation with stable output, reliable performance, and consistent pellet quality.",
  },
  {
    question: "Does the machine improve recycled plastic quality?",
    answer:
      "Yes. Advanced compaction, filtration, and extrusion technology produce cleaner, denser, and more uniform recycled plastic granules.",
  },
  {
    question:
      "Is this machine suitable for commercial plastic recycling businesses?",
    answer:
      "Yes. It is ideal for commercial recycling companies, plastic manufacturers, and industrial processing units looking for high-output recycling solutions.",
  },
  {
    question:
      "Why choose Hindustan Plastic and Machine Corporation for Plastic Recycling Machines?",
    answer:
      "Hindustan Plastic and Machine Corporation designs high-performance recycling plants with advanced engineering, energy-efficient technology, customized solutions, and dependable after-sales support.",
  },
  {
    question:
      "Why is Hindustan Plastic and Machine Corporation one of the top Plastic Recycling Machine manufacturers in India?",
    answer:
      "With decades of manufacturing experience, advanced extrusion technology, precision engineering, and reliable customer support, Hindustan Plastic and Machine Corporation delivers efficient recycling solutions trusted by customers across India and international markets.",
  },
  {
    question:
      "How can I get the best price for a Recycling Plant with Compactor?",
    answer:
      "Contact Hindustan Plastic and Machine Corporation with your material type, production capacity, and recycling requirements to receive a customized quotation and the most suitable machine recommendation.",
  },
  {
    question: "What is the price of a Recycling Plant with Compactor in India?",
    answer:
      "The price of a Recycling Plant with Compactor depends on production capacity, motor power, automation level, and customization requirements. Contact Hindustan Plastic and Machine Corporation for a customized quotation.",
  },
  {
    question:
      "How do I choose the best Plastic Recycling Machine for my business?",
    answer:
      "Choose a recycling machine based on the type of plastic waste, hourly production capacity, pellet quality requirements, available space, and future production goals.",
  },
  {
    question: "Which is the best Plastic Pelletizing Machine in India?",
    answer:
      "A Recycling Plant with Compactor is among the best plastic pelletizing solutions for processing film waste, rigid plastics, and industrial scrap with high productivity and consistent pellet quality.",
  },
  {
    question: "Can the Recycling Plant with Compactor be customized?",
    answer:
      "Yes. Hindustan Plastic and Machine Corporation offers customized machine configurations, screw designs, pelletizing systems, filtration units, and automation features to match specific recycling applications.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Machines are available in multiple production capacities to suit small, medium, and large-scale plastic recycling businesses.",
  },
  {
    question: "How much electricity does a Plastic Recycling Plant consume?",
    answer:
      "Power consumption depends on machine size, production output, raw material type, and operating conditions.",
  },
  {
    question: "Is the Recycling Plant with Compactor energy efficient?",
    answer:
      "Yes. Advanced compaction technology, optimized screw design, and efficient heating systems help reduce power consumption while increasing production.",
  },
  {
    question: "Can the machine run continuously for industrial production?",
    answer:
      "Yes. The machine is designed for continuous heavy-duty operation with stable output, reliable performance, and minimal downtime.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables easy machine operation, production monitoring, alarm management, and parameter control.",
  },
  {
    question: "Can production settings be saved?",
    answer:
      "Yes. Operators can save and recall machine recipes for different plastic materials, improving production consistency and reducing setup time.",
  },
  {
    question: "Does the machine have automatic temperature control?",
    answer:
      "Yes. Multiple heating zones with precise temperature control ensure consistent melting and superior recycled pellet quality.",
  },
  {
    question: "Which pelletizing systems are available?",
    answer:
      "The machine supports water-ring pelletizing, strand pelletizing, die-face pelletizing, and customized pelletizing systems depending on production requirements.",
  },
  {
    question: "Does the Recycling Plant include a hydraulic screen changer?",
    answer:
      "Yes. A hydraulic screen changer continuously removes contaminants from molten plastic without interrupting production.",
  },
  {
    question: "Can vacuum degassing be added?",
    answer:
      "Yes. Optional vacuum degassing systems can be integrated for better moisture removal and improved recycled material quality.",
  },
  {
    question: "How often does the machine require maintenance?",
    answer:
      "Routine preventive maintenance based on operating hours helps maximize machine life, reduce downtime, and maintain high production efficiency.",
  },
  {
    question: "Is screw maintenance simple?",
    answer:
      "Yes. The modular screw design allows easy inspection, cleaning, and replacement of wear components.",
  },
  {
    question:
      "Does Hindustan Plastic and Machine Corporation provide installation services?",
    answer:
      "Yes. Complete installation, commissioning, machine testing, and production startup support are provided.",
  },
  {
    question: "Is operator training included with the machine?",
    answer:
      "Yes. Professional operator training is provided to ensure safe machine operation, maintenance, and maximum production efficiency.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastic and Machine Corporation supplies genuine spare parts to maintain machine reliability and minimize production downtime.",
  },
  {
    question:
      "Does Hindustan Plastic and Machine Corporation provide after-sales service?",
    answer:
      "Yes. Customers receive technical support, preventive maintenance, troubleshooting, spare parts assistance, and process optimization services.",
  },
  {
    question: "Can I request a live machine demonstration?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate recycling performance.",
  },
  {
    question:
      "Can production trials be performed before purchasing the machine?",
    answer:
      "Yes. Production trials using customer materials can be conducted to verify pellet quality and machine performance.",
  },
  {
    question:
      "Can the Recycling Plant with Compactor be integrated into an existing recycling line?",
    answer:
      "Yes. The machine can be integrated with shredders, washing plants, dryers, conveyors, silos, and downstream packaging equipment.",
  },
  {
    question:
      "Is this Recycling Plant suitable for starting a plastic recycling business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers looking to establish or expand a profitable plastic recycling business.",
  },
  {
    question:
      "How can I get the best quotation for a Recycling Plant with Compactor?",
    answer:
      "Contact Hindustan Plastic and Machine Corporation with your plastic material details, expected production capacity, and business requirements to receive a customized quotation.",
  },
  {
    question:
      "Can the Recycling Plant with Compactor process wet plastic waste?",
    answer:
      "Yes. The integrated compactor helps reduce residual moisture before extrusion, improving feeding efficiency and recycled pellet quality.",
  },
  {
    question: "Can multilayer plastic films be recycled?",
    answer:
      "Compatible multilayer plastic films can be recycled after evaluating their material composition and processing characteristics.",
  },
  {
    question: "Can industrial plastic scrap be recycled using this machine?",
    answer:
      "Yes. The Recycling Plant with Compactor is ideal for processing industrial plastic scrap, production rejects, edge trims, and factory waste.",
  },
  {
    question: "Can the machine recycle packaging film waste?",
    answer:
      "Yes. It efficiently recycles packaging films, shrink films, stretch films, woven bags, raffia, and BOPP materials after proper preparation.",
  },
  {
    question: "How does the compactor improve pellet quality?",
    answer:
      "The compactor densifies and preheats the material before extrusion, ensuring uniform feeding, stable melting, and high-quality recycled pellets.",
  },
  {
    question: "Can recycled pellets be used for injection molding?",
    answer:
      "Yes. Recycled pellets produced by the machine are suitable for injection molding applications, depending on the material and product requirements.",
  },
  {
    question: "Can recycled pellets be used for extrusion applications?",
    answer:
      "Yes. The pellets can be reused in pipe extrusion, sheet extrusion, profile extrusion, blown film, and other compatible manufacturing processes.",
  },
  {
    question: "Can this machine help reduce raw material costs?",
    answer:
      "Yes. Recycling plastic waste into reusable granules significantly reduces dependence on virgin polymers and lowers production costs.",
  },
  {
    question: "Does the Recycling Plant improve production efficiency?",
    answer:
      "Yes. Continuous operation, efficient compaction, stable extrusion, and consistent pellet production improve overall manufacturing efficiency.",
  },
  {
    question:
      "What is the expected lifespan of a Recycling Plant with Compactor?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial performance.",
  },
  {
    question:
      "Is this Plastic Recycling Machine suitable for export-oriented manufacturing?",
    answer:
      "Yes. The machine is suitable for manufacturers supplying recycled plastic granules to domestic and international markets.",
  },
  {
    question:
      "Does Hindustan Plastic and Machine Corporation manufacture Recycling Plants in India?",
    answer:
      "Yes. Hindustan Plastic and Machine Corporation manufactures advanced Recycling Plants with Compactor in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastic and Machine Corporation export Plastic Recycling Machines?",
    answer:
      "Yes. Hindustan Plastic and Machine Corporation supplies plastic recycling machinery to customers across India and international markets.",
  },
  {
    question: "Can the Recycling Plant be installed in an existing factory?",
    answer:
      "Yes. The machine can be integrated into existing recycling and manufacturing facilities with customized layouts and material handling systems.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, and process optimization support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastic and Machine Corporation help optimize recycling processes?",
    answer:
      "Yes. Our technical experts assist customers with machine settings, material processing, and production optimization to achieve better efficiency.",
  },
  {
    question: "How quickly are spare parts delivered?",
    answer:
      "Common spare parts are readily available for quick dispatch to reduce production downtime and maintain uninterrupted operation.",
  },
  {
    question:
      "Can I visit the Hindustan Plastic and Machine Corporation manufacturing facility?",
    answer:
      "Yes. Customers are welcome to schedule a factory visit to inspect machine manufacturing, quality control, and discuss project requirements with our technical team.",
  },
  {
    question: "Can production trials be conducted using my plastic waste?",
    answer:
      "Yes. Production trials can be conducted using customer-supplied materials to evaluate machine performance and pellet quality.",
  },
  {
    question: "Is the Recycling Plant with Compactor environmentally friendly?",
    answer:
      "Yes. The machine supports sustainable manufacturing by converting plastic waste into reusable raw materials and reducing landfill disposal.",
  },
  {
    question: "Can this machine help reduce carbon emissions?",
    answer:
      "Yes. Recycling plastic waste reduces the demand for virgin plastic production and contributes to more sustainable manufacturing practices.",
  },
  {
    question:
      "Why is Hindustan Plastic and Machine Corporation considered one of the best Plastic Recycling Machine manufacturers in India?",
    answer:
      "Hindustan Plastic and Machine Corporation combines decades of manufacturing expertise, advanced recycling technology, customized machine solutions, reliable after-sales support, and precision engineering to deliver high-performance recycling equipment.",
  },
  {
    question: "Which industries benefit from Recycling Plants with Compactor?",
    answer:
      "Plastic recycling companies, packaging manufacturers, automotive suppliers, extrusion plants, injection molding units, and industrial plastic processors benefit from these recycling systems.",
  },
  {
    question:
      "Why choose Hindustan Plastic and Machine Corporation as your Plastic Recycling Machine supplier?",
    answer:
      "Customers choose Hindustan Plastic and Machine Corporation for advanced technology, robust machine construction, customized solutions, dependable service support, and efficient recycling systems designed for long-term industrial performance.",
  },
  {
    question:
      "Why is Hindustan Plastic and Machine Corporation one of India's leading Recycling Plant manufacturers?",
    answer:
      "With decades of experience, innovative engineering, energy-efficient machinery, and comprehensive customer support, Hindustan Plastic and Machine Corporation has become a trusted manufacturer of plastic recycling plants for customers in India and worldwide.",
  },
];

const specifications = [
  {
    model: "Extruder 100",
    beltConveyor: "Magnetic frame with 1.1 kw Motor",
    compactorMotor: "55",
    production: "200",
    diaScrew: "100",
    mainMotor: "45",
    ldRatio: "33.1",
    hydraulicScreenChanger: "8/3",
    waterRingPelletizer: "2.2",
    vibratingScreenMotor: "1.75",
    dehydratingMachineMotor: "5",
    pumpConveyingSystemMotor: "3",
  },
  {
    model: "Extruder 110",
    beltConveyor: "Magnetic frame with 1.5 kw Motor",
    compactorMotor: "55",
    production: "300",
    diaScrew: "110",
    mainMotor: "75",
    ldRatio: "33.1",
    hydraulicScreenChanger: "10/3",
    waterRingPelletizer: "2.2",
    vibratingScreenMotor: "2.2",
    dehydratingMachineMotor: "5",
    pumpConveyingSystemMotor: "3",
  },
  {
    model: "Extruder 120",
    beltConveyor: "Magnetic frame with 1.5 kw Motor",
    compactorMotor: "75",
    production: "400",
    diaScrew: "120",
    mainMotor: "100",
    ldRatio: "30.1",
    hydraulicScreenChanger: "10/3",
    waterRingPelletizer: "3.7",
    vibratingScreenMotor: "3.7",
    dehydratingMachineMotor: "5",
    pumpConveyingSystemMotor: "3.7",
  },
];

export default function RecyclingPlantWithCompactor() {
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
      <title>Recycling Plant with Compactor | HPMC</title>

      <meta
        name="description"
        content="Plastic recycling plants with integrated compactor for improved material feeding, productivity, and processing efficiency."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/recycling-plant-with-compactor"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroSection/compactor.png')",
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
              Recycling Plant
              <span className="text-[#65BC4F]"> With Compactor</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Recycling Plants with Compactor efficiently process plastic
              waste into high-quality reusable granules, supporting a wide range
              of packaging, automotive, consumer, and industrial applications.
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
              Recycling Plant With Compactor
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
                HPMC Recycling Plants with Compactor are designed to convert
                plastic waste into high-quality reusable granules. The system
                efficiently processes LDPE, HDPE, LLDPE, PP, ABS, Polycarbonate,
                and other engineering plastics, ensuring superior material
                recovery and cost-effective production.
              </p>

              {/* Application Categories */}
              <div className="grid md:grid-cols-2 gap-5 mt-10">
                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h3 className="font-semibold text-lg text-[var(--primary)]">
                    HDPE & LLDPE
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                    <li>• Pipes & Drums</li>
                    <li>• Carry Bags</li>
                    <li>• Packaging Containers</li>
                    <li>• Buckets & Chairs</li>
                    <li>• Household Products</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h3 className="font-semibold text-lg text-[var(--primary)]">
                    PP Applications
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                    <li>• BOPP Packaging Films</li>
                    <li>• Adhesive Tapes</li>
                    <li>• Labels & Laminations</li>
                    <li>• Reusable Containers</li>
                    <li>• Kitchenware Products</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h3 className="font-semibold text-lg text-[var(--primary)]">
                    ABS Applications
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                    <li>• Electronic Components</li>
                    <li>• Automotive Parts</li>
                    <li>• Wheel Covers</li>
                    <li>• Instrument Panels</li>
                    <li>• TV Back Plates</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h3 className="font-semibold text-lg text-[var(--primary)]">
                    Polycarbonate
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                    <li>• Safety Glasses & Lenses</li>
                    <li>• Medical Applications</li>
                    <li>• Computer Cases</li>
                    <li>• CD / DVD / Blu-ray Discs</li>
                    <li>• Security Components</li>
                  </ul>
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
                poster="/videos/compactor.png"
                className="w-full h-full object-contain"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/videos/COMPACTOR.mp4" type="video/mp4" />
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

      <section className="bg-[var(--background)] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Heading */}
          <div className="mb-12 text-center lg:mb-16">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-[var(--primary)]">
              Machine Models
            </span>

            <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              Technical
              <span className="text-[var(--primary)]"> Specifications</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Compare available extruder models and their technical
              specifications to select the right configuration for your
              production requirements.
            </p>
          </div>

          {/* Table */}
          <div
            className="overflow-hidden rounded-3xl border bg-[var(--card)] shadow-sm"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Mobile scroll hint */}
            <div
              className="flex items-center justify-between border-b px-5 py-4 lg:hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Swipe to view all specifications
              </span>

              <span className="text-[var(--primary)]">→</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1700px] border-collapse">
                <thead>
                  <tr className="bg-[var(--primary)] text-white">
                    {[
                      "Model",
                      "Belt Conveyor",
                      "Compactor Motor (kW)",
                      "Production (kg/hr)",
                      "Dia Screw (mm)",
                      "Main Motor (kW)",
                      "L/D Ratio",
                      "Hydraulic Screen Changer",
                      "Water-Ring Pelletizer Load (kW)",
                      "Vibrating Screen Motor Power (kW)",
                      "Dehydrating Machine Motor Power",
                      "Pump Conveying System Motor",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="border px-5 py-5 text-center text-xs font-semibold uppercase leading-5 tracking-wide"
                        style={{
                          borderColor: "rgba(255,255,255,0.2)",
                        }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {specifications.map((item, index) => (
                    <tr
                      key={item.model}
                      className={`
                  transition-colors hover:bg-[var(--muted)]
                  ${
                    index % 2 === 0
                      ? "bg-[var(--card)]"
                      : "bg-[var(--background)]"
                  }
                `}
                    >
                      {/* Model */}
                      <td
                        className="whitespace-nowrap border px-6 py-6 text-center font-semibold text-[var(--text-primary)]"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <span className="rounded-full bg-[#65BC4F]/10 px-4 py-2 text-sm text-[var(--primary)]">
                          {item.model}
                        </span>
                      </td>

                      {/* Belt Conveyor */}
                      <td
                        className="min-w-[180px] border px-5 py-6 text-center text-sm leading-6 text-[var(--text-secondary)]"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {item.beltConveyor}
                      </td>

                      {[
                        item.compactorMotor,
                        item.production,
                        item.diaScrew,
                        item.mainMotor,
                        item.ldRatio,
                        item.hydraulicScreenChanger,
                        item.waterRingPelletizer,
                        item.vibratingScreenMotor,
                        item.dehydratingMachineMotor,
                        item.pumpConveyingSystemMotor,
                      ].map((value, idx) => (
                        <td
                          key={idx}
                          className="whitespace-nowrap border px-5 py-6 text-center text-sm font-medium text-[var(--text-primary)]"
                          style={{ borderColor: "var(--border)" }}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-5 flex items-start gap-2">
            <span className="mt-[2px] text-[var(--primary)]">*</span>

            <p className="text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
              Specifications may vary depending on material, application, and
              production requirements. Contact our technical team for a
              customized machine configuration.
            </p>
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
                Recycling Plant With Compactor
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
