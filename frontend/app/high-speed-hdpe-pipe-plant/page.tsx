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

const galleryImages = ["/products/HDPE pipe plant/image-7.jpg"];

const features = [
  {
    title: "Spiral Type Die Head",
    desc: "Advanced spiral type die head designed to maintain stable wall thickness even at high production outputs. The low-pressure diagonal channel and spiral mixing section ensure homogeneous plasticization and efficient extrusion at lower temperatures.",
    image: "/products/HDPE pipe plant/SPIRAL-TYPE-DIE-HEAD.jpg",
    highlights: [
      "Pipe production up to 630mm",
      "Stable wall thickness",
      "Homogeneous plasticization",
    ],
  },

  {
    title: "Screw & Barrel",
    desc: "Equipped with a barrier-type mixing screw and hard-alloy groove feed bush, the system delivers higher output rates, consistent material flow, and excellent plasticizing performance while reducing material slippage.",
    image: "/products/HDPE pipe plant/screw-barrel.jpg",
    highlights: [
      "Barrier-type mixing screw",
      "Hard alloy feed bush",
      "Higher output rates",
    ],
  },

  {
    title: "PLC Control System",
    desc: "Integrated PLC-based control system with a large liquid crystal display provides convenient operation, precise process monitoring, and easy adjustment of production parameters.",
    image: "/products/HDPE pipe plant/plccontrol-system.jpg",
    highlights: [
      "PLC controlled operation",
      "Large LCD interface",
      "Easy process monitoring",
    ],
  },

  {
    title: "Vacuum Tank",
    desc: "Specially designed vacuum sizing tank ensures excellent pipe diameter accuracy and roundness, even for pipes with higher wall thickness. The high-speed spray vortex system provides uniform and efficient cooling.",
    image: "/products/HDPE pipe plant/Vacuum-Tank.jpg",
    highlights: [
      "Accurate pipe sizing",
      "Excellent roundness",
      "High-speed spray cooling",
    ],
  },

  {
    title: "Multiple Arm Haul-Off",
    desc: "Heavy-duty haul-off unit with up to six arms for pipes up to 630mm diameter. Designed to maintain perfect pipe roundness while delivering smooth traction, durability, and energy-efficient performance.",
    image: "/products/HDPE pipe plant/Multiple-Arm-Haul-Off.jpg",
    highlights: [
      "Up to 630mm pipe diameter",
      "Six-arm configuration",
      "Low power consumption",
    ],
  },

  {
    title: "Planetary Cutting Saw",
    desc: "High-performance planetary cutting system engineered for smooth and precise pipe cutting. Designed to complement high-output extrusion lines while ensuring consistent cut quality and operational reliability.",
    image: "/products/HDPE pipe plant/PlANETARY-CUTTING-SAW.jpg",
    highlights: [
      "Smooth pipe cutting",
      "High cutting precision",
      "Reliable operation",
    ],
  },

  {
    title: "Double / Single Station Coiler",
    desc: "Available in both double and single station configurations for efficient pipe collection and winding. Suitable for different pipe diameters to support continuous production and easy handling.",
    image: "/products/HDPE pipe plant/DOUBLE-SINGLE-STATION-COILER.jpg",
    highlights: [
      "Double station up to 63mm",
      "Single station up to 110mm",
      "Continuous pipe winding",
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
    values: ["15-35", "15-35", "15-35", "15-35"],
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

const faqData = [
  {
    question: "What is a High Speed HDPE Pipe Plant?",
    answer:
      "A High Speed HDPE Pipe Plant is an advanced extrusion system designed to manufacture HDPE pipes with high production output, precise dimensions, and excellent pipe quality for industrial and infrastructure applications.",
  },
  {
    question: "How does a High Speed HDPE Pipe Plant work?",
    answer:
      "The plant melts HDPE raw material using a high-performance single screw extruder, followed by a spiral die head, vacuum sizing tank, cooling system, haul-off unit, and cutting machine to produce high-quality HDPE pipes.",
  },
  {
    question:
      "Which materials can be processed using a High Speed HDPE Pipe Plant?",
    answer:
      "The machine is designed to process HDPE (High Density Polyethylene) materials used for water supply, gas distribution, irrigation, telecom ducting, sewage systems, and industrial piping.",
  },
  {
    question: "Which products can be manufactured using this machine?",
    answer:
      "The machine manufactures HDPE water pipes, gas pipes, irrigation pipes, telecom ducts, sewer pipes, industrial pressure pipes, conduit pipes, and infrastructure piping systems.",
  },
  {
    question: "What are HDPE pipes used for?",
    answer:
      "HDPE pipes are widely used for drinking water supply, gas distribution, agricultural irrigation, telecom cable protection, sewage systems, mining operations, chemical transportation, and industrial applications.",
  },
  {
    question:
      "Which is the best High Speed HDPE Pipe Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best High Speed HDPE Pipe Plant manufacturers in India, offering precision-engineered extrusion lines with high productivity, energy efficiency, and long service life.",
  },
  {
    question:
      "Who is the top HDPE Pipe Extrusion Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is a trusted HDPE Pipe Extrusion Machine manufacturer known for advanced technology, robust machine construction, and dependable after-sales support.",
  },
  {
    question: "What are the advantages of a High Speed HDPE Pipe Plant?",
    answer:
      "The machine delivers higher production output, excellent dimensional accuracy, lower energy consumption, stable wall thickness, reliable operation, and superior pipe quality.",
  },
  {
    question: "Why should manufacturers choose a High Speed HDPE Pipe Plant?",
    answer:
      "High-speed production, lower manufacturing costs, improved productivity, reduced downtime, and consistent pipe quality make it an excellent investment for HDPE pipe manufacturers.",
  },
  {
    question: "What pipe sizes can be manufactured?",
    answer:
      "Depending on the selected model and tooling configuration, the plant can manufacture HDPE pipes ranging from 16 mm to 630 mm.",
  },
  {
    question:
      "What is the maximum output capacity of the High Speed HDPE Pipe Plant?",
    answer:
      "Depending on the machine model, the High Speed HDPE Pipe Plant can deliver production capacities up to approximately 600 Kg/hr.",
  },
  {
    question: "What is the advantage of the Spiral Type Die Head?",
    answer:
      "The Spiral Type Die Head provides uniform melt flow, excellent wall thickness control, homogeneous plasticization, and superior pipe quality even at high production speeds.",
  },
  {
    question: "How does the Barrier-Type Screw improve production?",
    answer:
      "The barrier-type mixing screw improves plasticization, increases material output, ensures consistent melt quality, and reduces material slippage during extrusion.",
  },
  {
    question: "Why is the PLC Control System important?",
    answer:
      "The PLC Control System provides real-time process monitoring, precise parameter control, production data management, and simplified machine operation.",
  },
  {
    question: "How does the Vacuum Sizing Tank improve pipe quality?",
    answer:
      "The vacuum sizing tank maintains accurate pipe diameter, excellent roundness, stable calibration, and efficient cooling for superior finished pipe quality.",
  },
  {
    question: "What is the function of the Multiple Arm Haul-Off Unit?",
    answer:
      "The Multiple Arm Haul-Off provides smooth traction, stable pulling force, and maintains pipe roundness without deformation during high-speed production.",
  },
  {
    question: "Why is the Planetary Cutting Saw used?",
    answer:
      "The Planetary Cutting Saw delivers smooth, accurate, burr-free pipe cutting while maintaining production speed and excellent cut quality.",
  },
  {
    question: "Can the machine operate continuously?",
    answer:
      "Yes. The High Speed HDPE Pipe Plant is designed for continuous industrial operation with reliable performance and minimal downtime.",
  },
  {
    question: "Is the High Speed HDPE Pipe Plant energy efficient?",
    answer:
      "Yes. Advanced screw technology, efficient drive systems, and optimized process control help reduce power consumption while maximizing production output.",
  },
  {
    question: "Can the HDPE Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, die heads, haul-off units, automation systems, and downstream equipment based on customer requirements.",
  },
  {
    question: "Which industries use HDPE Pipe Plants?",
    answer:
      "Water supply companies, gas distribution networks, irrigation projects, telecom infrastructure, mining companies, construction firms, municipalities, and industrial manufacturers widely use HDPE Pipe Plants.",
  },
  {
    question:
      "Is this machine suitable for starting an HDPE pipe manufacturing business?",
    answer:
      "Yes. It is an excellent investment for entrepreneurs and manufacturers planning to establish or expand an HDPE pipe manufacturing business.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for HDPE Pipe Plants?",
    answer:
      "Hindustan Plastics and Machine Corporation provides precision-engineered HDPE Pipe Plants with advanced extrusion technology, durable construction, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best HDPE Pipe Machine manufacturers in India?",
    answer:
      "With decades of experience in plastic extrusion machinery, innovative engineering, premium manufacturing standards, and excellent after-sales service, Hindustan Plastics and Machine Corporation is trusted by customers across India and international markets.",
  },
  {
    question: "How can I get the best price for a High Speed HDPE Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe sizes, production capacity, and project details to receive a customized quotation and expert machine recommendation.",
  },
  {
    question: "What is the price of a High Speed HDPE Pipe Plant in India?",
    answer:
      "The price of a High Speed HDPE Pipe Plant depends on the machine model, pipe diameter range, production capacity, automation level, and optional equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best HDPE Pipe Plant?",
    answer:
      "The ideal HDPE Pipe Plant depends on your required pipe diameter, production capacity, raw material grade, automation requirements, and future expansion plans.",
  },
  {
    question: "Which is the best HDPE Pipe Extrusion Machine in India?",
    answer:
      "High Speed HDPE Pipe Plants from Hindustan Plastics and Machine Corporation are designed for maximum productivity, excellent pipe quality, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the High Speed HDPE Pipe Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extrusion lines, die heads, vacuum tanks, haul-off units, cutting systems, coilers, and PLC automation based on production requirements.",
  },
  {
    question: "What production capacities are available?",
    answer:
      "Different machine models are available to support small, medium, and high-capacity HDPE pipe manufacturing with outputs up to approximately 600 Kg/hr.",
  },
  {
    question: "How much electricity does a High Speed HDPE Pipe Plant consume?",
    answer:
      "Power consumption depends on the selected machine model, pipe size, output capacity, and production conditions. The machine is designed for energy-efficient operation.",
  },
  {
    question: "Does the machine support PLC automation?",
    answer:
      "Yes. A PLC-based control system with a large LCD interface allows operators to monitor production, adjust parameters, manage alarms, and improve process accuracy.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system can store production parameters for different HDPE pipe sizes, reducing setup time and improving production consistency.",
  },
  {
    question: "How does the Spiral Type Die Head improve production?",
    answer:
      "The Spiral Type Die Head ensures balanced melt distribution, stable wall thickness, homogeneous plasticization, and smooth extrusion even at high production speeds.",
  },
  {
    question: "Why is the Barrier-Type Mixing Screw important?",
    answer:
      "The Barrier-Type Mixing Screw improves melting efficiency, enhances material mixing, increases production output, and delivers uniform HDPE melt quality.",
  },
  {
    question: "Can different HDPE pipe diameters be produced on one machine?",
    answer:
      "Yes. By changing the die head, calibration sleeves, and related tooling, the machine can manufacture different HDPE pipe sizes within its operating range.",
  },
  {
    question: "How often does the HDPE Pipe Plant require maintenance?",
    answer:
      "Routine preventive maintenance, lubrication, inspection of the screw and barrel, gearbox, vacuum systems, and electrical components helps ensure reliable long-term operation.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for easy inspection and maintenance, helping reduce downtime and maintenance costs.",
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
      "Yes. Professional operator training is provided to ensure safe machine operation, efficient production, and proper preventive maintenance.",
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
      "Yes. Production trials using customer-supplied HDPE raw materials can be conducted to verify machine performance, output, and finished pipe quality.",
  },
  {
    question:
      "Can the High Speed HDPE Pipe Plant be integrated into an existing production line?",
    answer:
      "Yes. The extrusion line can be integrated with existing downstream equipment, pipe handling systems, printing units, coilers, and storage systems.",
  },
  {
    question:
      "Can the machine manufacture HDPE pipes for drinking water applications?",
    answer:
      "Yes. The machine manufactures HDPE pipes widely used in potable water supply systems when processed with suitable HDPE grades.",
  },
  {
    question: "Can the machine manufacture HDPE gas pipes?",
    answer:
      "Yes. With the appropriate raw material and tooling, the machine produces HDPE pipes suitable for gas distribution networks.",
  },
  {
    question: "Can the High Speed HDPE Pipe Plant manufacture telecom ducts?",
    answer:
      "Yes. The extrusion line is widely used for manufacturing HDPE telecom ducts and cable protection pipes for communication infrastructure.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best High Speed HDPE Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable HDPE pipe production systems.",
  },
  {
    question:
      "How can I get the best quotation for a High Speed HDPE Pipe Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your required pipe diameter, production capacity, raw material specifications, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the High Speed HDPE Pipe Plant process different HDPE grades?",
    answer:
      "Yes. The machine is designed to process various HDPE grades suitable for water supply, gas distribution, irrigation, telecom ducts, sewer systems, and industrial piping applications.",
  },
  {
    question: "Can the machine manufacture PE80 and PE100 HDPE pipes?",
    answer:
      "Yes. With suitable raw materials and processing parameters, the High Speed HDPE Pipe Plant can manufacture PE80 and PE100 HDPE pipes for pressure applications.",
  },
  {
    question:
      "Can the machine manufacture HDPE pipes for drinking water projects?",
    answer:
      "Yes. The machine produces HDPE pipes used in potable water supply systems when processed with approved HDPE raw materials.",
  },
  {
    question: "Can the machine manufacture HDPE pipes for gas distribution?",
    answer:
      "Yes. The extrusion line is suitable for producing HDPE gas pipes using the appropriate material grades and production parameters.",
  },
  {
    question:
      "Can the High Speed HDPE Pipe Plant manufacture pipes that comply with international standards?",
    answer:
      "Yes. With proper tooling, quality raw materials, and process control, the machine can manufacture HDPE pipes that meet applicable national and international standards.",
  },
  {
    question: "How does the High Speed HDPE Pipe Plant improve pipe quality?",
    answer:
      "The Spiral Type Die Head, Barrier-Type Mixing Screw, precise temperature control, and advanced vacuum calibration system ensure smooth surfaces, uniform wall thickness, and excellent dimensional accuracy.",
  },
  {
    question:
      "Can HDPE pipes produced on this machine be used in infrastructure projects?",
    answer:
      "Yes. The machine manufactures HDPE pipes suitable for water supply networks, irrigation systems, gas pipelines, sewage projects, telecom infrastructure, mining, and industrial applications.",
  },
  {
    question: "Can this machine reduce HDPE pipe manufacturing costs?",
    answer:
      "Yes. High-speed production, optimized energy consumption, reduced material waste, and automated process control help lower the overall manufacturing cost per pipe.",
  },
  {
    question: "What is the expected lifespan of a High Speed HDPE Pipe Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation.",
  },
  {
    question: "Can the High Speed HDPE Pipe Plant be upgraded in the future?",
    answer:
      "Yes. Automation systems, die heads, vacuum tanks, haul-off units, cutting systems, and downstream equipment can be upgraded as production requirements increase.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture High Speed HDPE Pipe Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced High Speed HDPE Pipe Plants in India using precision engineering and modern extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export HDPE Pipe Plants worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports High Speed HDPE Pipe Plants and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing manufacturing facility?",
    answer:
      "Yes. The High Speed HDPE Pipe Plant can be integrated into existing manufacturing facilities with customized layouts and compatible downstream equipment.",
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
      "Yes. Our technical experts assist customers in optimizing machine settings, HDPE processing parameters, production efficiency, and overall extrusion performance.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required spare parts are readily available for quick dispatch, helping minimize downtime and maintain uninterrupted production.",
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
      "Yes. Trial production can be arranged using customer-supplied HDPE raw materials to evaluate machine performance, production output, and finished pipe quality.",
  },
  {
    question: "Is the High Speed HDPE Pipe Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology that helps reduce power consumption, optimize raw material utilization, and minimize production waste.",
  },
  {
    question: "Which industries benefit from High Speed HDPE Pipe Plants?",
    answer:
      "Water utilities, gas distribution companies, irrigation projects, telecom infrastructure providers, municipalities, construction companies, mining industries, and industrial pipe manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture HDPE pipes for smart city and infrastructure projects?",
    answer:
      "Yes. The machine is ideal for manufacturing HDPE pipes used in smart cities, urban water supply systems, industrial parks, highways, airports, irrigation projects, and large-scale infrastructure developments.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best High Speed HDPE Pipe Plant manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable HDPE pipe production systems.",
  },
  {
    question:
      "Who is the top High Speed HDPE Pipe Machine manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance HDPE Pipe Plants with excellent productivity, energy efficiency, and consistent pipe quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your HDPE Pipe Plant supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the High Speed HDPE Pipe Plant one of the best solutions for HDPE pipe manufacturing?",
    answer:
      "Its high-speed extrusion capability, superior melt distribution, energy-efficient operation, consistent pipe quality, and reliable industrial performance make it an ideal solution for manufacturers looking to maximize productivity and profitability.",
  },
];

export default function HighSpeedHDPEPipePlant() {
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
      <title>High Speed HDPE Pipe Plant | HPMC</title>

      <meta
        name="description"
        content="High-speed HDPE pipe extrusion plants delivering maximum productivity, precision, and long-lasting performance."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/high-speed-hdpe-pipe-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/hdpe.png')",
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
              High Speed
              <span className="text-[#65BC4F]"> HDPE Pipe Plant</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              HPMC High Speed HDPE Pipe Plant is advanced extrusion machinery
              designed for manufacturing HDPE pipes and utility products with
              high productivity and consistent quality. Available in HPMC 45G,
              65G, 75G, and 90G models, it delivers output capacities up to 600
              Kg/hr for a wide range of pipe applications.
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
            HDPE Pipe Plant -
            <span className="text-[var(--primary)]">
              {" "}
              High Speed HDPE Pipe Plant
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
                HPMC High Speed HDPE Pipe Plants are available in HPMC 45G, HPMC
                65G, HPMC 75G, and HPMC 90G models. Designed for manufacturing a
                wide range of HDPE pipes and utility products, these plants
                deliver reliable performance, easy operation, and optimized
                productivity across diverse industrial applications.
              </p>

              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Equipped with advanced Screw & Barrel technology, PLC control
                systems, and Spiral Type Die Heads, the plant ensures superior
                output quality, energy-efficient operation, corrosion
                resistance, and extended service life. Its robust construction
                supports continuous production with output capacities ranging
                from 550 Kg/hr to 600 Kg/hr.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "550–600 Kg/hr Output",
                  "PLC Control System",
                  "Spiral Type Die Head",
                  "Energy Efficient Design",
                  "Corrosion Resistant",
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
                    HDPE
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Pipe Production
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    600
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
              Sections of
              <span className="text-[var(--primary)]">
                {" "}
                High Speed HDPE Pipe Plant
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
                poster="/videos/capture.png"
                className="w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source
                  src="/videos/HDPE-PIPE-MACHINE-2.mp4"
                  type="video/mp4"
                />
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

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] uppercase tracking-[4px] text-sm font-semibold">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Everything About Our
              <span className="text-[var(--primary)]"> HDPE Pipe Plant</span>
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
                    {showAllFaqs ? "View less FAQs" : `View  more FAQs`}
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
