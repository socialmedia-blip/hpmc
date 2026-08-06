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
  "/products/single-screw-extruder.jpg",
  "/products/pvc profile extruder/single screw/cooling_unit.jpg",
  "/products/pvc profile extruder/single screw/caterpuller.jpg",
  "/products/pvc profile extruder/single screw/AUTOMATIC-CUTTING-UNIT-UPTO-200-MM.jpg",
];

const features = [
  {
    title: "Die Head",
    desc: "Precision-engineered die heads are available for pipe sizes ranging from 16mm to 160mm. Equipped with stainless steel spiders, they ensure smooth material flow, accurate sizing, and superior pipe quality.",
    image:
      "/products/pvc profile extruder/single screw/single_screw_extruder_die_head.jpg",
    highlights: [
      "16mm–160mm pipe range",
      "Stainless steel spider",
      "Accurate pipe sizing",
    ],
  },

  {
    title: "Cooling Unit",
    desc: "The cooling system includes a vacuum tank for smaller pipe sizes and water tanks with spray cooling options, ensuring proper pipe sizing, uniform cooling, and dimensional stability.",
    image: "/products/pvc profile extruder/single screw/cooling_unit.jpg",
    highlights: [
      "Vacuum sizing tank",
      "Spray cooling system",
      "Uniform pipe cooling",
    ],
  },

  {
    title: "Caterpuller",
    desc: "Driven by separate geared motors for both haul-off rollers, the caterpuller provides smooth pipe movement, prevents wrinkles, and ensures consistent production quality.",
    image: "/products/pvc profile extruder/single screw/caterpuller.jpg",
    highlights: [
      "Dual geared motors",
      "Smooth pipe flow",
      "Wrinkle-free operation",
    ],
  },

  {
    title: "Automatic Cutting Unit",
    desc: "Equipped with pneumatic cylinders for secure gripping and a limit switch for accurate length sensing, ensuring precise and automated pipe cutting.",
    image:
      "/products/pvc profile extruder/single screw/AUTOMATIC-CUTTING-UNIT-UPTO-200-MM.jpg",
    highlights: [
      "Pneumatic gripping system",
      "Preset length sensing",
      "Automatic operation",
    ],
  },

  {
    title: "Tipping Chute",
    desc: "The tipping chute uses pneumatic cylinders and limit switch controls for efficient handling, collection, and stacking of finished pipes.",
    image: "/products/pvc profile extruder/single screw/tipping_chute.jpg",
    highlights: [
      "Automatic pipe stacking",
      "Pneumatic operation",
      "Efficient material handling",
    ],
  },
];

const specifications = [
  {
    parameter: "Min Pipe OD (mm)",
    values: ["16", "40", "63"],
  },
  {
    parameter: "Max Pipe OD (mm)",
    values: ["50", "110", "160"],
  },
  {
    parameter: "Max Plasticizing Capacity (Kg/hr)",
    values: ["50", "80", "120"],
  },
  {
    parameter: "Max Output (Kg/hr)",
    values: ["40", "60", "90"],
  },
  {
    parameter: "Main Drive (Kw)",
    values: ["11", "15", "22.5"],
  },

  // Blank Row
  {
    type: "blank",
  },

  {
    type: "section",
    parameter: "Heating",
  },
  {
    parameter: "Barrel (Kw)",
    values: ["8", "12", "12"],
  },
  {
    parameter: "Die (Kw)",
    values: ["2", "5", "5"],
  },

  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["15-45", "15-45", "15-45"],
  },

  // Blank Row
  {
    type: "blank",
  },

  {
    type: "section",
    parameter: "Vacuum Sizing Tank",
  },
  {
    parameter: "Pump Drive (KW)",
    values: ["0.75", "-", "-"],
  },
  {
    parameter: "Length (Mtrs)",
    values: ["2.0", "-", "-"],
  },
  {
    parameter: "Water Circulating Requirement (Ltrs/min)",
    values: ["450", "-", "-"],
  },

  // Blank Row
  {
    type: "blank",
  },

  {
    type: "section",
    parameter: "Cooling Tanks",
  },
  {
    parameter: "Length (Mtrs)",
    values: ["-", "3", "4"],
  },
  {
    parameter: "Water Circulating Requirement (Ltrs/min)",
    values: ["-", "450", "500"],
  },

  // Blank Row
  {
    type: "blank",
  },

  {
    type: "section",
    parameter: "Haul Off",
  },
  {
    parameter: "Drive Range (KW)",
    values: ["0.75", "1.5", "1.5"],
  },
  {
    parameter: "Pulling Speed (mts/min) Range 1",
    values: ["0.735 to 1.147", "0.4 to 2.0", "0.4 to 2.0"],
  },
  {
    parameter: "Pulling Speed (mts/min) Range 2",
    values: ["0.71 to 3.55", "1.4 to 7.2", "1.4 to 7.2"],
  },

  // Blank Row
  {
    type: "blank",
  },

  {
    type: "section",
    parameter: "Cutting Saw",
  },
  {
    parameter: "Saw Diameter (mm)",
    values: ["300", "400", "500"],
  },
  {
    parameter: "Saw Drive Load (KW)",
    values: ["0.75/2800", "0.75/2800", "0.75/2800"],
  },
];
const faqData = [
  {
    question: "What is a Single Screw Plant for PVC Profile?",
    answer:
      "A Single Screw Plant for PVC Profile is a high-performance extrusion system designed to manufacture PVC profiles used in doors, windows, partitions, wall panels, decorative trims, and interior construction applications.",
  },
  {
    question: "How does a Single Screw PVC Profile Extrusion Machine work?",
    answer:
      "The machine melts PVC compounds through a precision single screw extruder, shapes the material using a profile die, and then passes it through cooling, haul-off, cutting, and stacking systems to produce high-quality PVC profiles.",
  },
  {
    question: "Which materials can be processed using this PVC Profile Plant?",
    answer:
      "The machine is designed to process rigid PVC compounds, profile-grade PVC materials, high-calcium PVC formulations, and customized PVC compounds for profile manufacturing.",
  },
  {
    question:
      "Which products can be manufactured using a PVC Profile Extrusion Machine?",
    answer:
      "The machine manufactures PVC door profiles, window profiles, partitions, wall panels, decorative trims, sealing profiles, furniture profiles, and various customized PVC sections.",
  },
  {
    question: "What are PVC profiles used for?",
    answer:
      "PVC profiles are widely used in residential buildings, commercial complexes, offices, hotels, hospitals, modular furniture, interior decoration, and construction projects.",
  },
  {
    question:
      "Which is the best Single Screw PVC Profile Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best Single Screw PVC Profile Machine manufacturers in India, offering reliable extrusion technology, high productivity, and excellent profile quality.",
  },
  {
    question:
      "Who is the top PVC Profile Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced PVC Profile Extrusion Machines trusted by profile manufacturers across India and international markets.",
  },
  {
    question: "What are the advantages of a Single Screw PVC Profile Plant?",
    answer:
      "The machine provides excellent plasticization, stable extrusion, superior profile finish, accurate dimensions, energy-efficient operation, and reliable long-term performance.",
  },
  {
    question:
      "Why choose a Single Screw Extruder for PVC profile manufacturing?",
    answer:
      "Single Screw Extruders deliver stable material flow, efficient melting, excellent melt homogeneity, lower maintenance requirements, and consistent production quality.",
  },
  {
    question:
      "What are the benefits of the Barrier Design Double Thread Screw?",
    answer:
      "The Barrier Design Double Thread Screw improves melting efficiency, enhances material mixing, increases production output, and produces smooth, high-quality PVC profiles.",
  },
  {
    question: "Can the machine process high-calcium PVC formulations?",
    answer:
      "Yes. The extrusion system is engineered to process higher calcium-loaded PVC compounds while maintaining excellent profile quality and dimensional stability.",
  },
  {
    question: "What production capacity does the PVC Profile Plant offer?",
    answer:
      "Depending on the selected machine model, the extrusion plant delivers efficient production with outputs suitable for small, medium, and high-volume PVC profile manufacturing.",
  },
  {
    question: "Can customized PVC profile sections be manufactured?",
    answer:
      "Yes. Customized extrusion dies can be developed to manufacture unique PVC profile designs according to customer drawings and project requirements.",
  },
  {
    question: "Which industries use PVC Profile Extrusion Plants?",
    answer:
      "Construction companies, interior designers, furniture manufacturers, window and door manufacturers, electrical industries, and infrastructure developers widely use PVC Profile Plants.",
  },
  {
    question: "Can the machine manufacture PVC door and window profiles?",
    answer:
      "Yes. The machine is specially designed for manufacturing PVC door frames, window frames, sliding window profiles, and customized architectural sections.",
  },
  {
    question: "Can the machine manufacture PVC wall panel profiles?",
    answer:
      "Yes. The extrusion line produces PVC wall panels and decorative interior profiles for residential and commercial buildings.",
  },
  {
    question: "How does the Cooling Unit improve PVC profile quality?",
    answer:
      "The Cooling Unit provides uniform cooling and proper profile sizing, ensuring dimensional accuracy, smooth surface finish, and improved product stability.",
  },
  {
    question: "What is the function of the Caterpuller in a PVC Profile Plant?",
    answer:
      "The Caterpuller moves the PVC profile smoothly through the production line, preventing deformation while maintaining stable production speed and consistent quality.",
  },
  {
    question: "How does the Automatic Cutting Unit improve production?",
    answer:
      "The Automatic Cutting Unit uses preset length sensing and pneumatic gripping to cut PVC profiles accurately, reducing wastage and improving production efficiency.",
  },
  {
    question: "What is the purpose of the Tipping Chute?",
    answer:
      "The Tipping Chute automatically collects and stacks finished PVC profiles, reducing manual handling and improving production efficiency.",
  },
  {
    question:
      "Is the Single Screw PVC Profile Plant suitable for continuous production?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with stable extrusion, consistent quality, and minimal downtime.",
  },
  {
    question: "Is the PVC Profile Extrusion Machine energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient heating systems, and modern drive technology help reduce power consumption while maintaining high production output.",
  },
  {
    question: "Can the PVC Profile Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, profile dies, automation systems, downstream equipment, and complete production solutions based on customer requirements.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for PVC Profile Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation provides precision-engineered PVC Profile Plants with advanced extrusion technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "How can I get the best price for a Single Screw PVC Profile Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your profile design, production capacity, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a Single Screw PVC Profile Plant in India?",
    answer:
      "The price of a Single Screw PVC Profile Plant depends on the machine model, profile design, production capacity, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best PVC Profile Extrusion Machine?",
    answer:
      "The ideal PVC Profile Extrusion Machine depends on your profile dimensions, production capacity, PVC formulation, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best Single Screw PVC Profile Machine in India?",
    answer:
      "Single Screw PVC Profile Plants from Hindustan Plastics and Machine Corporation are engineered for high productivity, energy efficiency, superior profile quality, and reliable industrial performance.",
  },
  {
    question: "Can the Single Screw PVC Profile Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized profile dies, cooling systems, haul-off units, cutting systems, stacking solutions, and PLC automation based on customer production requirements.",
  },
  {
    question: "Can one machine manufacture different PVC profile designs?",
    answer:
      "Yes. By changing the extrusion die and calibration tooling, the machine can manufacture multiple PVC profile designs using the same extrusion line.",
  },
  {
    question:
      "How much electricity does a Single Screw PVC Profile Machine consume?",
    answer:
      "Power consumption depends on the machine model, profile dimensions, production output, and operating conditions. The machine is designed for energy-efficient manufacturing.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen can be integrated for production monitoring, machine parameter control, alarm management, and improved productivity.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different PVC profile designs, reducing setup time and ensuring consistent quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones maintain accurate temperature control for stable PVC processing and excellent profile quality.",
  },
  {
    question: "Can recycled PVC materials be processed?",
    answer:
      "Yes. Depending on the formulation and application, the machine can process recycled PVC blends along with virgin PVC compounds.",
  },
  {
    question: "How often does the PVC Profile Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of the screw, barrel, gearbox, heaters, cooling systems, and electrical components help ensure reliable long-term performance.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient inspection and maintenance, reducing downtime and operating costs.",
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
      "Yes. Professional operator training is provided to ensure safe operation, efficient production, and proper preventive maintenance.",
  },
  {
    question: "Are genuine spare parts available?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation supplies genuine spare parts to ensure reliable machine performance and minimum production downtime.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide after-sales support?",
    answer:
      "Yes. Customers receive technical support, troubleshooting, preventive maintenance, spare parts assistance, and production optimization services.",
  },
  {
    question: "Can I request a live machine demonstration?",
    answer:
      "Yes. Live demonstrations and technical consultations can be arranged to help customers evaluate machine performance before making a purchase decision.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied PVC compounds can be conducted to verify machine performance, production output, and finished profile quality.",
  },
  {
    question:
      "Can the PVC Profile Plant be integrated into an existing production line?",
    answer:
      "Yes. The extrusion line can be integrated with existing material feeding systems, printing units, stacking systems, packaging equipment, and downstream handling systems.",
  },
  {
    question: "Can the machine manufacture decorative PVC mouldings and trims?",
    answer:
      "Yes. The machine is suitable for manufacturing decorative trims, mouldings, edge profiles, ceiling profiles, skirting profiles, and customized architectural PVC sections.",
  },
  {
    question: "Can the machine manufacture PVC furniture profiles?",
    answer:
      "Yes. The extrusion line produces PVC furniture profiles used in wardrobes, cabinets, modular kitchens, office furniture, and interior decoration.",
  },
  {
    question: "Can the machine manufacture sealing and partition profiles?",
    answer:
      "Yes. The machine is widely used for manufacturing PVC sealing profiles, office partition profiles, glazing profiles, and customized construction profiles.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best PVC Profile Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable PVC profile production systems.",
  },
  {
    question: "Can the PVC Profile Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with PLC automation, customized tooling, additional downstream equipment, and higher-capacity components as production requirements grow.",
  },
  {
    question:
      "How can I get the best quotation for a Single Screw PVC Profile Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your profile drawings, production capacity, and application requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Single Screw PVC Profile Plant process different PVC formulations?",
    answer:
      "Yes. The machine can process rigid PVC compounds, profile-grade PVC materials, high-calcium PVC formulations, recycled PVC blends, and customized PVC compounds for various profile applications.",
  },
  {
    question: "Can the machine manufacture uPVC door and window profiles?",
    answer:
      "Yes. The extrusion line is suitable for manufacturing uPVC door frames, window frames, sliding window profiles, ventilation profiles, and customized architectural sections.",
  },
  {
    question:
      "Can the machine manufacture PVC wall panels and ceiling profiles?",
    answer:
      "Yes. The machine produces PVC wall panels, ceiling profiles, decorative interior panels, and false ceiling profiles for residential and commercial projects.",
  },
  {
    question: "Can the machine manufacture PVC furniture and cabinet profiles?",
    answer:
      "Yes. The extrusion line manufactures PVC furniture profiles for wardrobes, modular kitchens, office furniture, cabinets, shelves, and interior applications.",
  },
  {
    question:
      "Can the Single Screw PVC Profile Plant manufacture products that meet international quality standards?",
    answer:
      "Yes. With suitable tooling, quality PVC compounds, and controlled processing parameters, the machine can manufacture PVC profiles that comply with applicable national and international standards.",
  },
  {
    question:
      "How does the Single Screw PVC Profile Plant improve profile quality?",
    answer:
      "The Barrier Design Double Thread Screw, stable extrusion pressure, efficient cooling, and accurate profile calibration produce smooth surfaces, excellent dimensional accuracy, and consistent product quality.",
  },
  {
    question:
      "Can PVC profiles manufactured on this machine be used in residential and commercial buildings?",
    answer:
      "Yes. The machine manufactures PVC profiles widely used in apartments, villas, offices, hospitals, hotels, shopping malls, schools, factories, and commercial buildings.",
  },
  {
    question: "Can this machine reduce PVC profile manufacturing costs?",
    answer:
      "Yes. Energy-efficient operation, stable production, optimized raw material utilization, and reduced production wastage help lower the overall manufacturing cost.",
  },
  {
    question:
      "What is the expected lifespan of a Single Screw PVC Profile Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the PVC Profile Plant be upgraded in the future?",
    answer:
      "Yes. The machine can be upgraded with PLC automation, customized profile dies, additional downstream equipment, and higher-capacity production systems as business requirements grow.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture Single Screw PVC Profile Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Single Screw PVC Profile Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export PVC Profile Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports PVC Profile Extrusion Machines and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The PVC Profile Plant can be integrated into existing manufacturing facilities with customized layouts and compatible downstream equipment.",
  },
  {
    question: "Is online technical support available after installation?",
    answer:
      "Yes. Remote technical assistance, troubleshooting, production guidance, and machine optimization support are available whenever required.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation provide process optimization support?",
    answer:
      "Yes. Our technical experts assist customers in optimizing machine settings, PVC formulations, extrusion parameters, production efficiency, and overall profile quality.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required genuine spare parts are readily available for quick dispatch, helping minimize downtime and ensure uninterrupted production.",
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
      "Yes. Trial production can be arranged using customer-supplied PVC compounds and profile dies to evaluate machine performance and finished profile quality.",
  },
  {
    question: "Is the Single Screw PVC Profile Plant environmentally friendly?",
    answer:
      "Yes. The machine is designed with energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question: "Which industries benefit from Single Screw PVC Profile Plants?",
    answer:
      "Window and door manufacturers, furniture industries, construction companies, modular building manufacturers, interior designers, infrastructure developers, and plastic profile manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture PVC profiles for smart buildings and modern infrastructure projects?",
    answer:
      "Yes. The machine is ideal for manufacturing PVC profiles used in smart buildings, commercial complexes, residential projects, hospitals, educational institutions, industrial facilities, and modern infrastructure developments.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best Single Screw PVC Profile Machine manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable PVC profile production systems.",
  },
  {
    question:
      "Who is the top Single Screw PVC Profile Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance Single Screw PVC Profile Plants with excellent productivity, energy efficiency, and consistent profile quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your PVC Profile Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Single Screw PVC Profile Plant one of the best solutions for PVC profile manufacturing?",
    answer:
      "Its efficient Barrier Design Double Thread Screw, stable extrusion process, excellent dimensional accuracy, energy-efficient operation, and reliable industrial performance make it an ideal solution for manufacturing premium-quality PVC profiles.",
  },
];

export default function SingleScrewPlantForPvcProfile() {
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
      <title>Single Screw Plant for PVC Profile | HPMC</title>

      <meta
        name="description"
        content="Single screw extrusion plants for manufacturing high-quality PVC profiles with excellent production efficiency."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/single-screw-plant-for-pvc-profile"
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
              Single Screw Plant
              <span className="text-[#65BC4F]"> For PVC Profile</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              PVC Profiles are widely used for bath doors, windows, office
              partitions, sealing applications, and interior decoration. HPMC
              manufactures complete PVC Profile Extrusion Plants with production
              capacities up to 200 kg/hr, delivering reliable performance,
              superior profile quality, and cost-effective production for a wide
              range of applications.
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
            PVC Profile Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              Single Screw PlantFor PVC Profile
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
                PVC Profiles are widely used in bath doors, windows, office
                partitions, sealing applications, and interior decoration. HPMC
                manufactures complete PVC Profile Extrusion Plants designed for
                high-quality production with capacities up to 200 kg/hr and
                panel sizes up to 32 inches.
              </p>
              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Our extrusion systems are engineered for superior performance,
                higher calcium loading, and reduced manufacturing costs. With
                over 200 Conical Twin Screw Extruders and 2000+ Single Screw
                Extruders installed worldwide, HPMC delivers reliable and
                efficient profile extrusion solutions.
              </p>
              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Up to 200 Kg/hr Output",
                  "Barrier Design Double Thread Screw",
                  "Excellent Melt Homogeneity",
                  "Superior Process Stability",
                  "20mm–150mm Screw Range",
                  "Suitable for Pelletized Materials",
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
              {/* Stats Cards */}{" "}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    200+
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Twin Screw Installations{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    2000+
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Single Screw Installations{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    200
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Kg/hr Capacity{" "}
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
              Why Choose Our
              <span className="text-[var(--primary)]">
                {" "}
                Twin Screw Extruder
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

                  {["HPMC 65", "HPMC 75", "HPMC 90"].map((model) => (
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
                Single Screw Plant For PVC Profile
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
