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
  "/products/single-screw-extruder.jpg",
  "/products/sse/sse2.jpg",
  "/products/sse/sse3.jpg",
  "/products/sse/sse4.jpg",
];

const faqData = [
  {
    question: "What is a Single Screw Extruder?",
    answer:
      "A Single Screw Extruder is a plastic processing machine used to melt, mix, and extrude thermoplastic materials into pipes, profiles, sheets, granules, and other plastic products with consistent quality and high production efficiency.",
  },
  {
    question: "How does a Single Screw Extruder work?",
    answer:
      "The machine feeds plastic raw material through a rotating screw, melts it inside a heated barrel, builds pressure, and pushes the molten polymer through a precision die to manufacture high-quality plastic products.",
  },
  {
    question: "Which materials can be processed using a Single Screw Extruder?",
    answer:
      "The machine can process PVC, HDPE, LDPE, LLDPE, PP, PE, and several other thermoplastic materials depending on the application and extrusion setup.",
  },
  {
    question:
      "Which products can be manufactured using a Single Screw Extruder?",
    answer:
      "A Single Screw Extruder can manufacture PVC pipes, HDPE pipes, LLDPE pipes, plastic profiles, irrigation pipes, conduit pipes, cable ducts, granules, rods, and customized extrusion products.",
  },
  {
    question: "Which industries use Single Screw Extruders?",
    answer:
      "Single Screw Extruders are widely used in water supply, agriculture, irrigation, construction, infrastructure, cable protection, industrial piping, plastic profile manufacturing, and packaging industries.",
  },
  {
    question: "Which is the best Single Screw Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best Single Screw Extruder manufacturers in India, offering advanced extrusion technology, high productivity, energy efficiency, and reliable machine performance.",
  },
  {
    question: "Who is the top Single Screw Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures high-performance Single Screw Extruders trusted by customers across India and international markets.",
  },
  {
    question: "What are the advantages of a Single Screw Extruder?",
    answer:
      "The machine offers excellent plasticization, high production output, energy-efficient operation, stable melt quality, easy maintenance, and reliable long-term industrial performance.",
  },
  {
    question: "Why should manufacturers invest in a Single Screw Extruder?",
    answer:
      "A Single Screw Extruder enables manufacturers to produce premium-quality plastic products with consistent output, low operating costs, excellent efficiency, and high production reliability.",
  },
  {
    question: "What production capacity does the Single Screw Extruder offer?",
    answer:
      "Depending on the machine model and processed material, production output can reach up to 450 kg/hr while maintaining consistent melt quality and dimensional accuracy.",
  },
  {
    question: "Which machine models are available?",
    answer:
      "Hindustan Plastics and Machine Corporation offers HPMC 65, HPMC 75, HPMC 90, and HPMC 100 Single Screw Extruders for different production capacities and applications.",
  },
  {
    question: "What pipe sizes can be manufactured using this machine?",
    answer:
      "The Single Screw Extruder can manufacture PVC pipes ranging from 16 mm to 200 mm depending on the selected machine model and extrusion tooling.",
  },
  {
    question: "Can customized extrusion dies be provided?",
    answer:
      "Yes. Customized dies can be designed for different pipe diameters, profiles, wall thicknesses, and specialized extrusion applications.",
  },
  {
    question:
      "Which industries benefit from Single Screw Extrusion technology?",
    answer:
      "Plastic pipe manufacturers, profile manufacturers, cable duct producers, irrigation companies, infrastructure projects, construction industries, and polymer processing industries benefit from Single Screw Extruders.",
  },
  {
    question: "Can the machine manufacture PVC pipes?",
    answer:
      "Yes. The Single Screw Extruder is widely used for manufacturing high-quality PVC pipes for water supply, agriculture, drainage, and industrial applications.",
  },
  {
    question: "Can the machine manufacture HDPE and LLDPE pipes?",
    answer:
      "Yes. Suitable screw configurations and tooling allow the machine to process HDPE, LLDPE, LDPE, and other thermoplastics for pipe manufacturing.",
  },
  {
    question: "What is Barrier Design Screw Technology?",
    answer:
      "Barrier Design Screw Technology improves plastic melting efficiency, provides better melt homogeneity, increases production output, reduces energy consumption, and enhances finished product quality.",
  },
  {
    question: "Is the Single Screw Extruder energy efficient?",
    answer:
      "Yes. Optimized screw geometry, efficient heating systems, and advanced drive technology reduce electricity consumption while maintaining high production performance.",
  },
  {
    question: "Can the Single Screw Extruder operate continuously?",
    answer:
      "Yes. The machine is engineered for continuous industrial production with stable output, consistent processing, and minimum downtime.",
  },
  {
    question: "Can the Single Screw Extruder be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized screw designs, barrel configurations, dies, cooling systems, haul-off units, cutting systems, and PLC automation according to customer requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a plastic extrusion business?",
    answer:
      "Yes. The Single Screw Extruder is an excellent investment for entrepreneurs and manufacturers planning to establish or expand plastic extrusion production.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for a Single Screw Extruder?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered extrusion machines with advanced technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Single Screw Extruder manufacturers in India?",
    answer:
      "With decades of extrusion expertise, precision engineering, premium manufacturing standards, innovative screw technology, and reliable after-sales support, Hindustan Plastics and Machine Corporation is trusted by customers worldwide.",
  },
  {
    question:
      "Can the Single Screw Extruder manufacture different plastic products using one machine?",
    answer:
      "Yes. By changing dies, tooling, and processing parameters, the machine can manufacture various plastic products including pipes, profiles, rods, and customized extrusion products.",
  },
  {
    question: "How can I get the best price for a Single Screw Extruder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required material, product type, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a Single Screw Extruder in India?",
    answer:
      "The price of a Single Screw Extruder depends on the machine model, screw diameter, production capacity, material compatibility, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best Single Screw Extruder?",
    answer:
      "The ideal Single Screw Extruder depends on the raw material, product type, production capacity, screw diameter, L/D ratio, automation requirements, and future production expansion.",
  },
  {
    question: "Which is the best Single Screw Extrusion Machine in India?",
    answer:
      "Single Screw Extruders from Hindustan Plastics and Machine Corporation are engineered for high productivity, excellent melt quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the Single Screw Extruder be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized screw designs, barrels, extrusion dies, cooling systems, haul-off units, cutting systems, PLC automation, and complete turnkey extrusion solutions.",
  },
  {
    question: "Can one Single Screw Extruder manufacture different products?",
    answer:
      "Yes. By changing the die head, tooling, and processing parameters, one machine can manufacture various plastic pipes, profiles, rods, and customized extrusion products.",
  },
  {
    question: "How much electricity does a Single Screw Extruder consume?",
    answer:
      "Power consumption depends on the machine model, screw size, production capacity, processed material, and operating conditions. The machine is designed for energy-efficient production.",
  },
  {
    question: "Does the Single Screw Extruder support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables operators to monitor production, control machine parameters, store recipes, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall machine settings for different products, reducing setup time and ensuring consistent product quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable plastic processing and premium-quality extrusion.",
  },
  {
    question: "Can recycled plastic materials be processed?",
    answer:
      "Yes. Depending on the application, the Single Screw Extruder can process recycled PVC, PE, PP, HDPE, LLDPE, and other thermoplastic materials while maintaining reliable performance.",
  },
  {
    question: "How often does the Single Screw Extruder require maintenance?",
    answer:
      "Routine preventive maintenance includes checking the screw and barrel, gearbox, heaters, cooling systems, lubrication points, electrical components, and drive systems.",
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
    question:
      "Are genuine spare parts available for the Single Screw Extruder?",
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
      "Can I request a live demonstration of the Single Screw Extruder?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before purchasing.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance, production capacity, melt quality, and finished product quality.",
  },
  {
    question:
      "Can the Single Screw Extruder be integrated into an existing manufacturing facility?",
    answer:
      "Yes. The extrusion system can be integrated with existing material handling systems, downstream equipment, cooling systems, haul-off units, cutting systems, and automation.",
  },
  {
    question: "Can the machine manufacture plastic profiles?",
    answer:
      "Yes. The Single Screw Extruder can manufacture plastic profiles used in doors, windows, cable ducts, furniture, construction, and industrial applications.",
  },
  {
    question: "Can the machine manufacture plastic granules and rods?",
    answer:
      "Yes. With suitable dies and downstream equipment, the machine can manufacture plastic rods, granules, and various customized extrusion products.",
  },
  {
    question:
      "What makes Barrier Design Screw Technology better than a conventional screw?",
    answer:
      "Barrier Design Screw Technology provides better melting efficiency, improved plasticization, higher output, reduced power consumption, superior melt homogeneity, and excellent finished product quality.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Single Screw Extruder manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced screw technology, customized machine solutions, and dependable after-sales support to deliver reliable extrusion systems.",
  },
  {
    question:
      "Can the Single Screw Extruder support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity screws, PLC automation, advanced drives, additional downstream equipment, and customized tooling as production requirements increase.",
  },
  {
    question: "How can I get the best quotation for a Single Screw Extruder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required material, product type, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the Single Screw Extruder process different thermoplastic materials?",
    answer:
      "Yes. The Single Screw Extruder is designed to process PVC, HDPE, LDPE, LLDPE, PP, PE, and other thermoplastic materials with suitable screw configurations and processing parameters.",
  },
  {
    question: "Can the machine manufacture different pipe sizes?",
    answer:
      "Yes. By changing the extrusion die and sizing system, the machine can manufacture pipes in different diameters and wall thicknesses according to production requirements.",
  },
  {
    question: "Can the machine manufacture plastic profiles and rods?",
    answer:
      "Yes. The Single Screw Extruder can manufacture plastic profiles, rods, cable ducts, construction profiles, furniture profiles, and other customized extrusion products.",
  },
  {
    question: "Can the machine manufacture industrial plastic products?",
    answer:
      "Yes. The extrusion system is suitable for manufacturing industrial plastic products used in construction, infrastructure, agriculture, cable protection, packaging, and engineering applications.",
  },
  {
    question:
      "Can the Single Screw Extruder manufacture products that meet international quality standards?",
    answer:
      "Yes. With quality raw materials, precision extrusion tooling, and controlled processing parameters, the machine can manufacture plastic products that comply with applicable national and international quality standards.",
  },
  {
    question: "How does the Single Screw Extruder improve product quality?",
    answer:
      "Optimized screw geometry, stable melt pressure, accurate temperature control, superior plasticization, and precision extrusion technology ensure excellent surface finish, dimensional accuracy, and consistent product quality.",
  },
  {
    question:
      "Can products manufactured on this machine be used in residential and industrial applications?",
    answer:
      "Yes. Products manufactured using the Single Screw Extruder are widely used in residential construction, commercial buildings, agriculture, water supply, cable protection, infrastructure, and industrial applications.",
  },
  {
    question: "Can this machine reduce plastic product manufacturing costs?",
    answer:
      "Yes. High production efficiency, energy-saving operation, optimized raw material utilization, and reduced production waste help lower the overall manufacturing cost.",
  },
  {
    question: "What is the expected lifespan of a Single Screw Extruder?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation and continuous production.",
  },
  {
    question: "Can the Single Screw Extruder be upgraded in the future?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity screws, PLC automation, advanced drive systems, additional downstream equipment, and customized tooling as production requirements grow.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture Single Screw Extruders in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced Single Screw Extruders in India using precision engineering, premium-quality components, and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export Single Screw Extruders worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports Single Screw Extruders and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The Single Screw Extruder can be integrated into existing production facilities with customized layouts and compatible upstream and downstream equipment.",
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
      "Yes. Our technical experts help optimize raw material formulations, machine settings, extrusion parameters, and production efficiency to maximize output and improve finished product quality.",
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
      "Yes. Trial production can be arranged using customer-supplied raw materials to evaluate machine performance, production capacity, and finished product quality.",
  },
  {
    question: "Is the Single Screw Extruder environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology, supports optimized raw material utilization, and can process suitable recyclable thermoplastic materials, helping reduce manufacturing waste.",
  },
  {
    question: "Which industries benefit from Single Screw Extruders?",
    answer:
      "Plastic pipe manufacturers, profile manufacturers, packaging companies, cable protection industries, agriculture, construction, infrastructure, automotive suppliers, and polymer processing industries benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture products for water supply and infrastructure projects?",
    answer:
      "Yes. The Single Screw Extruder is suitable for manufacturing pipes and extrusion products used in water supply systems, irrigation, drainage, cable protection, infrastructure, and industrial applications.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best Single Screw Extruder manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable extrusion systems.",
  },
  {
    question: "Who is the top Single Screw Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance Single Screw Extruders with excellent productivity, energy efficiency, and consistent processing quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your Single Screw Extruder supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the Single Screw Extruder one of the best solutions for plastic extrusion manufacturing?",
    answer:
      "Its advanced Barrier Design Screw Technology, stable extrusion process, energy-efficient operation, excellent melt quality, high production capacity, and reliable industrial performance make it an ideal solution for manufacturing premium-quality plastic extrusion products.",
  },
];

const features = [
  {
    title: "Precision Die Head",
    desc: "Engineered for accurate pipe formation, the die head is available for pipe sizes ranging from 16mm to 160mm and is equipped with a stainless-steel spider for superior flow distribution and dimensional accuracy.",
    image: "/products/sse/sse1.jpg",

    highlights: [
      "16mm – 160mm pipe range",
      "Stainless steel spider",
      "Uniform material flow",
    ],
  },

  {
    title: "Advanced Cooling Unit",
    desc: "The vacuum and water cooling system ensures precise pipe dimensions, excellent surface finish, and efficient cooling performance for consistent production quality.",
    image: "/products/sse/sse2.jpg",

    highlights: [
      "Vacuum tank for 16mm – 50mm pipes",
      "Accurate pipe sizing",
      "Spray & non-spray cooling options",
    ],
  },

  {
    title: "Heavy-Duty Caterpuller",
    desc: "Equipped with independent geared motors for both rollers, the caterpuller delivers smooth pipe movement while preventing wrinkles and maintaining stable production speed.",
    image: "/products/sse/sse3.jpg",

    highlights: [
      "Dual geared motor drive",
      "Smooth pipe handling",
      "Wrinkle-free operation",
    ],
  },

  {
    title: "Automatic Cutting Saw",
    desc: "The automatic cutting unit features pneumatic clamping and length sensing technology to provide accurate, clean, and repeatable pipe cutting operations.",
    image: "/products/sse/sse4.jpg",

    highlights: [
      "Pneumatic holding system",
      "Preset length control",
      "Consistent cutting accuracy",
    ],
  },

  {
    title: "Tipping",
    desc: "Designed for reliable and clean pipe cutting, the cutting saw is equipped with a pneumatic cylinder and limit switch mechanism for precise length measurement and operation.",
    image: "/products/sse/sse5.jpg",

    highlights: [
      "Clean & accurate cuts",
      "Pneumatic clamping",
      "Limit switch controlled",
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
    values: ["16", "40", "63", "63"],
  },
  {
    parameter: "Max Pipe OD (mm)",
    values: ["50", "110", "160", "200"],
  },
  {
    parameter: "Max Plasticizing Capacity (Kg/hr)",
    values: ["50", "80", "120", "140"],
  },
  {
    parameter: "Max Output (Kg/hr)",
    values: ["40", "60", "90", "120"],
  },
  {
    parameter: "Main Drive (Kw)",
    values: ["11", "15", "22.5", "36"],
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
    values: ["8", "12", "15", "18"],
  },
  {
    parameter: "Die (Kw)",
    values: ["2", "5", "5", "5"],
  },
  {
    parameter: "Screw Speed Variation (RPM)",
    values: ["15 - 35", "15 - 35", "15 - 35", "15 - 35"],
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
    values: ["0.75", "-", "-", "-"],
  },
  {
    parameter: "Length (Mtrs)",
    values: ["3", "-", "-", "-"],
  },
  {
    parameter: "Water Circulating Requirement (Ltrs/min)",
    values: ["450", "-", "-", "-"],
  },

  // Blank Row
  {
    type: "blank",
  },

  // Section Header
  {
    type: "section",
    parameter: "Cooling Tanks",
  },
  {
    parameter: "Length (Ltrs)",
    values: ["-", "3.0", "4.0", "4.0"],
  },
  {
    parameter: "Water Circulating Requirement (Ltrs/Min)",
    values: ["-", "450", "500", "500"],
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
    parameter: "Drive Range (KW)",
    values: ["0.75", "1.5", "2.2", "2.2"],
  },
  {
    parameter: "Pulling Speed (mtr/min) Range 1",
    values: ["0.5 to 2.0", "0.4 to 2.0", "2 to 6", "2 to 6"],
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
    values: ["300", "400", "500", "500"],
  },
  {
    parameter: "Saw Drive Load (KW)",
    values: ["0.75/2800", "0.75/2800", "1.5/2800", "1.5/2800"],
  },
];

export default function SingleScrewExtruder() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [, setCatalogueToDownload] = useState("");
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
      <title>Single Screw Extruder Manufacturer | HPMC</title>

      <meta
        name="description"
        content="High-performance single screw extruders for plastic processing applications with superior efficiency, output, and reliability from HPMC."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/single-screw-extruder"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroSection/sseHero.png')",
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
              Single Screw
              <span className="text-[#65BC4F]"> Extrusion</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC Single Screw Extruders deliver reliable performance for PVC
              pipe and profile production. Suitable for water supply, sewage,
              agricultural, and industrial applications, the series is available
              in HPMC 65, HPMC 75, HPMC 90, and HPMC 100 models.
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
              Single Screw Extruder
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
                HPMC Single Screw Extruders are engineered for high-performance
                PVC pipe and profile extrusion applications. Available in HPMC
                65, HPMC 75, HPMC 90, and HPMC 100 models, the series delivers
                reliable output, excellent melt quality, and consistent
                processing performance.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Featuring advanced Barrier Design (Double Thread) screw
                technology, the system ensures superior melt homogeneity,
                precise process control, and exceptional product quality.
                Suitable for pelletized materials, it offers output capacities
                up to 450 Kg/hr for polyolefin processing.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Up to 450 Kg/hr Output",
                  "Barrier Design Screw",
                  "Excellent Melt Quality",
                  "Low Energy Consumption",
                  "Stable Processing",
                  "Models HPMC 65–100",
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
                    150mm
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Screw Diameter
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    450+
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Kg/hr Output
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
                Single Screw Extruder
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
                    <div className="relative bg-gradient-to-br from-white to-[#f5f7f8]">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain p-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

                  {["HPMC 65", "HPMC 75", "HPMC 90", "HPMC 100"].map(
                    (model) => (
                      <th
                        key={model}
                        className="px-8 py-6 text-center font-semibold border"
                        style={{ borderColor: "rgba(255,255,255,0.2)" }}
                      >
                        {model}
                      </th>
                    ),
                  )}
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
                Single Screw Extruder
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
