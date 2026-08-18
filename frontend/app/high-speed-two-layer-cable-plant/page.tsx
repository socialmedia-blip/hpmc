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

const galleryImages = [
  "/products/high-speed.png",
  "/products/cable extruder/capstan.jpg",
  "/products/cable extruder/two_layer_die_head.jpg",
];

const features = [
  {
    title: "Two Layer Die Head",
    desc: "Precision-engineered two-layer die head designed for uniform insulation and sheathing applications. Ensures consistent material flow, excellent concentricity, and superior cable quality.",
    image: "/products/cable extruder/two_layer_die_head.jpg",
    highlights: [
      "Two-layer extrusion",
      "Uniform material flow",
      "Superior cable quality",
    ],
  },

  {
    title: "Capstan",
    desc: "Designed for efficient transmission of tractive forces and smooth cable movement. Suitable for cable diameters ranging from 10mm to 50mm, ensuring stable and reliable production.",
    image: "/products/cable extruder/capstan.jpg",
    highlights: [
      "10mm–50mm cable range",
      "Smooth traction control",
      "High production efficiency",
    ],
  },

  {
    title: "Advanced Screw Design",
    desc: "Barrier screw design provides homogeneous mixing, while the grooved barrel design delivers higher output. Equipped with powerful air blowers and cooling jackets for precise temperature control.",
    image: "/products/cable extruder/screw_design.png",
    highlights: [
      "Barrier screw design",
      "Grooved barrel technology",
      "Excellent temperature control",
    ],
  },

  {
    title: "Cross-Head",
    desc: "Available in fixed-center or die-center configurations to ensure accurate insulation and sheathing applications across a wide range of cable manufacturing requirements.",
    image: "/products/cable extruder/cross_head.jpg",
    highlights: [
      "Fixed center option",
      "Die center option",
      "Accurate cable coating",
    ],
  },

  {
    title: "Haul-Off Caterpillar",
    desc: "Pneumatically operated caterpillar haul-off system synchronized with the main extruder. Designed to allow irregularities to pass through smoothly while maintaining stable cable pulling.",
    image: "/products/cable extruder/haul_off_caterpillar.jpg",
    highlights: [
      "Pneumatic operation",
      "Extruder synchronized",
      "Smooth cable handling",
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

const extruderSpecifications = [
  {
    model: "45/30",
    motorLoad: "10/5",
    maxRpm: "70/70",
    ldRatio: "26/26",
    heatingPower: "10/5",
    pvcOutput: "60",
    xlpeOutput: "-",
  },
  {
    model: "45/45",
    motorLoad: "10/10",
    maxRpm: "70/70",
    ldRatio: "26/26",
    heatingPower: "10/10",
    pvcOutput: "80",
    xlpeOutput: "50",
  },
  {
    model: "65/45",
    motorLoad: "20/10",
    maxRpm: "70/70",
    ldRatio: "26/26",
    heatingPower: "12/10",
    pvcOutput: "120",
    xlpeOutput: "85",
  },
  {
    model: "100/65",
    motorLoad: "40/20",
    maxRpm: "60/70",
    ldRatio: "26/26",
    heatingPower: "22/12",
    pvcOutput: "280",
    xlpeOutput: "200",
  },
];
const capstanSpecifications = [
  {
    parameter: "Wheel Dia",
    values: ["400", "630", "800", "1000"],
  },
  {
    parameter: "Max. Traction Force (Kg.)",
    values: ["200", "500", "800", "1000"],
  },
  {
    parameter: "Max. Dia of Cable (mm)",
    values: ["10", "20", "30", "40"],
  },
  {
    parameter: "Max Speed (m/min)",
    values: ["400", "250", "150", "80"],
  },
  {
    parameter: "AC Drive (HP)",
    values: ["2", "3", "5", "75"],
  },
];
const hpmcSpecifications = [
  {
    model: "HPMC30",
    motorLoad: "5",
    maxRpm: "70",
    ldRatio: "26",
    heatingPower: "5",
    pvcOutput: "20",
    xlpeOutput: "-",
  },
  {
    model: "HPMC45",
    motorLoad: "10",
    maxRpm: "70",
    ldRatio: "26",
    heatingPower: "10",
    pvcOutput: "40",
    xlpeOutput: "25",
  },
  {
    model: "HPMC65",
    motorLoad: "20",
    maxRpm: "70",
    ldRatio: "26",
    heatingPower: "12",
    pvcOutput: "80",
    xlpeOutput: "60",
  },
  {
    model: "HPMC75",
    motorLoad: "30",
    maxRpm: "70",
    ldRatio: "26",
    heatingPower: "16",
    pvcOutput: "120",
    xlpeOutput: "90",
  },
  {
    model: "HPMC90",
    motorLoad: "40",
    maxRpm: "60",
    ldRatio: "26",
    heatingPower: "20",
    pvcOutput: "150",
    xlpeOutput: "115",
  },
  {
    model: "HPMC100",
    motorLoad: "40",
    maxRpm: "60",
    ldRatio: "26",
    heatingPower: "22",
    pvcOutput: "200",
    xlpeOutput: "140",
  },
  {
    model: "HPMC120",
    motorLoad: "60",
    maxRpm: "60",
    ldRatio: "26",
    heatingPower: "30",
    pvcOutput: "350",
    xlpeOutput: "250",
  },
];
const caterpillarSpecifications = [
  {
    parameter: "Max Line Speed",
    values: ["200", "160", "125", "100", "80"],
  },
  {
    parameter: "Max Traction Force",
    values: ["400", "800", "1200", "1600", "2000"],
  },
  {
    parameter: "Max Cable Opening",
    values: ["60", "100", "120", "160", "160"],
  },
  {
    parameter: "Gripping Length",
    values: ["900", "1200", "1500", "1800", "2100"],
  },
  {
    parameter: "Width of Belt",
    values: ["80", "100", "120", "160", "160"],
  },
  {
    parameter: "Drive (HP)",
    values: ["3", "5", "7.5", "10", "15"],
  },
];
const faqData = [
  {
    question: "What is a High Speed Two Layer Cable Plant?",
    answer:
      "A High Speed Two Layer Cable Plant is an advanced cable extrusion system designed to simultaneously apply insulation and sheathing on electrical cables, ensuring high production speed, superior concentricity, and excellent cable quality.",
  },
  {
    question: "How does a High Speed Two Layer Cable Plant work?",
    answer:
      "The machine melts cable-grade polymer materials inside the extruder, applies two layers through a precision cross-head and two-layer die head, cools the cable, and continuously pulls it through synchronized downstream equipment.",
  },
  {
    question: "Which materials can be processed using this Cable Plant?",
    answer:
      "The machine can process PVC, XLPE, PE, LDPE, HDPE, and other cable-grade thermoplastic materials depending on cable specifications and production requirements.",
  },
  {
    question: "Which types of cables can be manufactured using this machine?",
    answer:
      "The plant manufactures power cables, control cables, communication cables, automotive cables, building wires, flexible cables, industrial cables, and insulated electrical wires.",
  },
  {
    question: "Which industries use High Speed Two Layer Cable Plants?",
    answer:
      "Cable manufacturers, electrical industries, power transmission companies, construction projects, automotive industries, renewable energy projects, and telecommunication sectors widely use these extrusion plants.",
  },
  {
    question:
      "Which is the best High Speed Two Layer Cable Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best High Speed Two Layer Cable Plant manufacturers in India, offering precision-engineered cable extrusion systems with high productivity and reliable performance.",
  },
  {
    question: "Who is the top Cable Extruder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Cable Extruders trusted by cable manufacturers across India and international markets.",
  },
  {
    question: "What are the advantages of a High Speed Two Layer Cable Plant?",
    answer:
      "The machine offers simultaneous insulation and sheathing, high production efficiency, excellent concentricity, superior cable finish, energy-efficient operation, and consistent production quality.",
  },
  {
    question:
      "Why should manufacturers invest in a High Speed Two Layer Cable Plant?",
    answer:
      "The machine reduces production time, increases manufacturing efficiency, improves cable quality, lowers operating costs, and enhances production capacity.",
  },
  {
    question: "What production capacity does the Cable Plant offer?",
    answer:
      "Production capacity depends on the selected extruder model, processed material, cable diameter, and processing conditions, with models suitable for both medium and high-output cable manufacturing.",
  },
  {
    question: "Which extruder models are available?",
    answer:
      "Hindustan Plastics and Machine Corporation offers HPMC30, HPMC45, HPMC65, HPMC75, HPMC90, HPMC100, and HPMC120 cable extruder models for different production requirements.",
  },
  {
    question: "What cable sizes can be manufactured using this machine?",
    answer:
      "The plant supports cable diameters from approximately 10 mm to 50 mm depending on the selected production line configuration and downstream equipment.",
  },
  {
    question: "Can customized cable sizes be manufactured?",
    answer:
      "Yes. Customized cross-heads, die heads, and tooling can be supplied for different cable diameters, insulation thicknesses, and customer-specific cable designs.",
  },
  {
    question: "What is the function of the Two Layer Die Head?",
    answer:
      "The Two Layer Die Head ensures uniform material flow, excellent concentricity, accurate insulation thickness, and high-quality cable surface finish.",
  },
  {
    question: "What is the function of the Cross Head in cable extrusion?",
    answer:
      "The Cross Head accurately applies insulation or sheathing material around the conductor while maintaining dimensional consistency throughout production.",
  },
  {
    question: "How does the Capstan improve cable manufacturing?",
    answer:
      "The Capstan provides synchronized traction control, stable line speed, smooth cable movement, and consistent cable quality during production.",
  },
  {
    question: "What are the benefits of Barrier Screw Design?",
    answer:
      "Barrier Screw Design improves polymer melting efficiency, provides homogeneous material mixing, increases production output, reduces energy consumption, and enhances cable quality.",
  },
  {
    question: "What is the function of the Caterpillar Haul-Off?",
    answer:
      "The Caterpillar Haul-Off pulls the cable smoothly at controlled speeds, ensuring stable production, accurate dimensions, and reduced cable deformation.",
  },
  {
    question: "Is the High Speed Two Layer Cable Plant energy efficient?",
    answer:
      "Yes. Optimized screw design, efficient heating systems, advanced drives, and modern cooling technology help reduce electricity consumption while maintaining high productivity.",
  },
  {
    question: "Can the Cable Plant operate continuously?",
    answer:
      "Yes. The machine is designed for continuous industrial cable production with stable output, reliable operation, and minimal downtime.",
  },
  {
    question: "Can the High Speed Two Layer Cable Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extruders, die heads, cross-heads, cooling systems, haul-off units, PLC automation, and complete turnkey cable extrusion solutions.",
  },
  {
    question:
      "Is this machine suitable for starting a cable manufacturing business?",
    answer:
      "Yes. The High Speed Two Layer Cable Plant is an excellent investment for entrepreneurs and manufacturers planning to establish or expand cable production.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for a High Speed Two Layer Cable Plant?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered cable extrusion systems, advanced technology, durable construction, customized solutions, and dependable after-sales support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Cable Extruder manufacturers in India?",
    answer:
      "With decades of extrusion expertise, advanced engineering, premium manufacturing standards, innovative extrusion technology, and reliable customer support, Hindustan Plastics and Machine Corporation is trusted worldwide.",
  },
  {
    question:
      "How can I get the best price for a High Speed Two Layer Cable Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your cable specifications, production capacity, material type, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "What is the price of a High Speed Two Layer Cable Plant in India?",
    answer:
      "The price depends on the extruder model, production capacity, cable diameter range, automation level, and downstream equipment. Contact Hindustan Plastics and Machine Corporation for a customized quotation.",
  },
  {
    question: "How do I choose the best High Speed Two Layer Cable Plant?",
    answer:
      "The ideal machine depends on your cable type, insulation material, production capacity, conductor size, automation requirements, and future production expansion.",
  },
  {
    question: "Which is the best Cable Extrusion Machine in India?",
    answer:
      "Cable extrusion systems from Hindustan Plastics and Machine Corporation are engineered for high-speed production, precise insulation, excellent concentricity, energy efficiency, and reliable industrial performance.",
  },
  {
    question: "Can the High Speed Two Layer Cable Plant be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized extruders, cross-heads, two-layer die heads, cooling systems, capstans, caterpillar haul-off units, PLC automation, and turnkey cable manufacturing solutions.",
  },
  {
    question: "Can one Cable Plant manufacture different cable sizes?",
    answer:
      "Yes. By changing dies, cross-head tooling, and machine settings, one extrusion line can manufacture different cable diameters and insulation thicknesses.",
  },
  {
    question: "How much electricity does a Cable Extrusion Plant consume?",
    answer:
      "Power consumption depends on the selected extruder model, production speed, processed material, and cable dimensions. The machine is designed for energy-efficient operation.",
  },
  {
    question:
      "Does the High Speed Two Layer Cable Plant support PLC automation?",
    answer:
      "Yes. PLC-based automation with HMI touchscreen enables operators to monitor production, control temperatures, adjust line speed, manage alarms, and improve manufacturing efficiency.",
  },
  {
    question: "Can production recipes be saved in the PLC system?",
    answer:
      "Yes. The PLC system allows operators to save and recall production settings for different cable sizes and materials, reducing setup time and ensuring consistent cable quality.",
  },
  {
    question: "Does the machine provide automatic temperature control?",
    answer:
      "Yes. Multiple heating zones provide accurate temperature control for stable PVC, XLPE, PE, and other cable-grade polymer processing.",
  },
  {
    question: "Can recycled cable compounds be processed?",
    answer:
      "Depending on product specifications and material quality, the machine can process suitable recycled thermoplastic compounds for selected cable manufacturing applications.",
  },
  {
    question:
      "How often does the High Speed Two Layer Cable Plant require maintenance?",
    answer:
      "Routine preventive maintenance includes inspecting the screw and barrel, gearbox, heaters, cooling system, cross-head, capstan, haul-off unit, lubrication points, and electrical components.",
  },
  {
    question: "Is screw and barrel maintenance easy?",
    answer:
      "Yes. The machine is designed for convenient inspection and preventive maintenance, helping reduce downtime and improve long-term operational efficiency.",
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
    question: "Are genuine spare parts available for the Cable Plant?",
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
      "Can I request a live demonstration of the High Speed Two Layer Cable Plant?",
    answer:
      "Yes. Live machine demonstrations and technical consultations can be arranged to help customers evaluate machine performance before making a purchase.",
  },
  {
    question:
      "Can production trials be conducted before purchasing the machine?",
    answer:
      "Yes. Production trials using customer-supplied raw materials can be conducted to verify machine performance, production capacity, insulation quality, and finished cable quality.",
  },
  {
    question:
      "Can the Cable Plant be integrated into an existing manufacturing facility?",
    answer:
      "Yes. The cable extrusion line can be integrated with existing pay-off systems, cooling troughs, spark testers, capstans, caterpillar haul-offs, take-up systems, and other downstream equipment.",
  },
  {
    question: "Can the machine manufacture multi-color cables?",
    answer:
      "Yes. By using suitable color masterbatches, the machine can manufacture cables in multiple colors according to customer requirements and international standards.",
  },
  {
    question: "Can the machine manufacture flame-retardant cables?",
    answer:
      "Yes. With suitable flame-retardant PVC or XLPE compounds, the plant can manufacture cables for applications requiring enhanced fire safety.",
  },
  {
    question: "Can the machine manufacture automotive and industrial cables?",
    answer:
      "Yes. The High Speed Two Layer Cable Plant is suitable for manufacturing automotive wiring, industrial cables, control cables, communication cables, and electrical power cables.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Cable Extruder manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines precision engineering, advanced cable extrusion technology, customized machine solutions, and dependable after-sales support to deliver reliable cable production systems.",
  },
  {
    question:
      "Can the High Speed Two Layer Cable Plant support future production expansion?",
    answer:
      "Yes. The machine can be upgraded with higher-capacity extruders, advanced PLC automation, online cable printing systems, spark testers, automatic take-up units, and customized tooling.",
  },
  {
    question:
      "How can I get the best quotation for a High Speed Two Layer Cable Plant?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your cable type, insulation material, production capacity, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
  {
    question:
      "Can the High Speed Two Layer Cable Plant process different cable compounds?",
    answer:
      "Yes. The machine is designed to process PVC, XLPE, PE, LDPE, HDPE, and other cable-grade thermoplastic compounds with suitable extrusion configurations.",
  },
  {
    question:
      "Can the machine manufacture different colors of electrical cables?",
    answer:
      "Yes. By using suitable color masterbatches, the machine can manufacture black, red, blue, green, yellow, white, grey, and customized color electrical cables.",
  },
  {
    question:
      "Can the machine manufacture insulated and sheathed cables simultaneously?",
    answer:
      "Yes. The High Speed Two Layer Cable Plant is specially designed to apply insulation and outer sheathing in a single production process, improving productivity and reducing manufacturing time.",
  },
  {
    question: "Can the machine manufacture power and control cables?",
    answer:
      "Yes. The extrusion line is suitable for manufacturing power cables, control cables, communication cables, instrumentation cables, and industrial electrical cables.",
  },
  {
    question:
      "Can the High Speed Two Layer Cable Plant manufacture cables that meet international quality standards?",
    answer:
      "Yes. With premium raw materials, precision cross-head tooling, and controlled processing parameters, the machine can manufacture cables that comply with applicable national and international quality standards.",
  },
  {
    question:
      "How does the High Speed Two Layer Cable Plant improve cable quality?",
    answer:
      "Advanced screw design, precision cross-head technology, accurate temperature control, synchronized line speed, and efficient cooling ensure excellent insulation thickness, concentricity, and surface finish.",
  },
  {
    question:
      "Can cables manufactured on this machine be used for residential and industrial applications?",
    answer:
      "Yes. The machine produces cables widely used in residential buildings, commercial projects, industrial plants, power distribution, infrastructure, renewable energy, and automotive applications.",
  },
  {
    question: "Can this machine reduce cable manufacturing costs?",
    answer:
      "Yes. High production speed, energy-efficient operation, optimized raw material utilization, and reduced production waste help lower the overall manufacturing cost of electrical cables.",
  },
  {
    question:
      "What is the expected lifespan of a High Speed Two Layer Cable Plant?",
    answer:
      "With proper preventive maintenance and genuine spare parts, the machine is designed for reliable long-term industrial operation and continuous cable production.",
  },
  {
    question:
      "Can the High Speed Two Layer Cable Plant be upgraded in the future?",
    answer:
      "Yes. The production line can be upgraded with higher-capacity extruders, PLC automation, laser diameter gauges, spark testers, automatic take-up systems, online printing units, and customized tooling.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation manufacture High Speed Two Layer Cable Plants in India?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation manufactures advanced High Speed Two Layer Cable Plants in India using precision engineering, premium-quality components, and modern cable extrusion technology.",
  },
  {
    question:
      "Does Hindustan Plastics and Machine Corporation export Cable Extrusion Machines worldwide?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation exports High Speed Two Layer Cable Plants and plastic extrusion machinery to customers across India, Asia, Africa, the Middle East, Europe, and other international markets.",
  },
  {
    question:
      "Can the machine be installed in an existing cable manufacturing facility?",
    answer:
      "Yes. The High Speed Two Layer Cable Plant can be integrated into existing cable production facilities with customized layouts and compatible upstream and downstream equipment.",
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
      "Yes. Our technical experts assist customers in optimizing cable compounds, extrusion parameters, line speed, temperature profiles, and overall production efficiency.",
  },
  {
    question: "How quickly are spare parts available?",
    answer:
      "Frequently required genuine spare parts are readily available for quick dispatch, helping minimize downtime and ensure uninterrupted cable production.",
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
      "Yes. Trial production can be arranged using customer-supplied cable compounds to evaluate machine performance, production speed, insulation quality, and finished cable performance.",
  },
  {
    question:
      "Is the High Speed Two Layer Cable Plant environmentally friendly?",
    answer:
      "Yes. The machine uses energy-efficient technology, optimizes raw material utilization, and minimizes production waste, helping manufacturers achieve more sustainable cable production.",
  },
  {
    question:
      "Which industries benefit from High Speed Two Layer Cable Plants?",
    answer:
      "Electrical cable manufacturers, power distribution companies, automotive industries, renewable energy projects, construction companies, telecommunications, railways, defense, and industrial equipment manufacturers benefit from this extrusion system.",
  },
  {
    question:
      "Can this machine manufacture cables for power transmission and infrastructure projects?",
    answer:
      "Yes. The machine is suitable for manufacturing cables used in power transmission, commercial buildings, industrial plants, renewable energy projects, infrastructure development, and electrical distribution systems.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation considered one of the best Cable Extruder manufacturers in India?",
    answer:
      "Hindustan Plastics and Machine Corporation combines decades of extrusion expertise, advanced engineering, precision manufacturing, customized machine solutions, and dependable after-sales support to deliver reliable cable extrusion systems.",
  },
  {
    question:
      "Who is the top High Speed Two Layer Cable Plant manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is recognized for manufacturing high-performance High Speed Two Layer Cable Plants with excellent productivity, energy efficiency, and consistent cable quality.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation as your Cable Extrusion Machine supplier?",
    answer:
      "Customers choose Hindustan Plastics and Machine Corporation for robust machine construction, advanced cable extrusion technology, customized production solutions, responsive technical support, and long-term operational reliability.",
  },
  {
    question:
      "Why is the High Speed Two Layer Cable Plant one of the best solutions for electrical cable manufacturing?",
    answer:
      "Its advanced two-layer extrusion technology, precision cross-head design, stable production process, energy-efficient operation, excellent insulation quality, and high-speed manufacturing capability make it an ideal solution for producing premium-quality electrical cables.",
  },
];

export default function HighSpeedTwoLayerCablePlant() {
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
      <title>High Speed Two Layer Cable Plant | HPMC</title>

      <meta
        name="description"
        content="High-speed two-layer cable extrusion plants designed for efficient cable manufacturing and consistent product quality."
      />

      <link
        rel="canonical"
        href="https://www.hindustanplastics.com/high-speed-two-layer-cable-plant"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/herosection/twolayer.png')",
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
              High Speed Two
              <span className="text-[#65BC4F]"> Layer Cable Plant</span>
            </h1>

            <p className="mt-6 text-gray-700 text-sm md:text-base leading-7 max-w-[500px]">
              We manufacture and export High Speed Two Layer Cable Plants along
              with Plastic Extruders, Twin Screw Extruders, PVC Pipe Plants,
              HDPE Pipe Plants, Recycling Machines, Compounding Extruders, and
              other plastic processing machinery. Our systems are designed for
              high-speed production, reliable performance, and long service
              life.
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
            Cable Extruder -
            <span className="text-[var(--primary)]">
              {" "}
              High Speed Two Layer Cable Plant
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
                We manufacture and export a wide range of plastic processing
                machinery, including Plastic Extruders, Twin Screw Extruders,
                PVC Pipe Plants, HDPE Pipe Plants, Recycling Machines, Plastic
                Reprocessing Plants, Co-Rotating Extruders, Compounding
                Extruders, and Plastic Profile Machinery.
              </p>
              <p className="mt-5 text-[var(--text-secondary)] leading-8">
                Our machinery is engineered for high productivity, reliable
                performance, and efficient processing, providing dependable
                solutions for various extrusion and plastic manufacturing
                applications.
              </p>
              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Plastic Extruders",
                  "Twin Screw Extruders",
                  "PVC Pipe Plants",
                  "HDPE Pipe Plants",
                  "Recycling Machines",
                  "Plastic Profile Machinery",
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
                    15+
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Machine Categories{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    100%
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Quality Assured{" "}
                  </p>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--card)]">
                  {" "}
                  <h4 className="text-2xl font-bold text-[var(--primary)]">
                    24/7
                  </h4>{" "}
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {" "}
                    Technical Support{" "}
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

          {/* TABLE 1 */}
          <div
            className="overflow-x-auto rounded-3xl border mb-12"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-8 py-5 bg-[var(--muted)] font-bold text-xl">
              Extruder Specifications
            </div>

            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="px-6 py-4 border">MODEL</th>
                  <th className="px-6 py-4 border">MOTOR LOAD</th>
                  <th className="px-6 py-4 border">MAX RPM</th>
                  <th className="px-6 py-4 border">L/D RATIO</th>
                  <th className="px-6 py-4 border">HEATING POWER</th>
                  <th className="px-6 py-4 border">PVC OUTPUT</th>
                  <th className="px-6 py-4 border">XLPE OUTPUT</th>
                </tr>
              </thead>

              <tbody>
                {extruderSpecifications.map((item) => (
                  <tr key={item.model}>
                    <td className="px-6 py-4 border text-center">
                      {item.model}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.motorLoad}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.maxRpm}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.ldRatio}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.heatingPower}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.pvcOutput}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.xlpeOutput}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE 2 */}
          <div
            className="overflow-x-auto rounded-3xl border mb-12"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-8 py-5 bg-[var(--muted)] font-bold text-xl">
              Capstan Specifications
            </div>

            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="px-6 py-4 border">PARAMETER</th>
                  {["HC 400", "HC 630", "HC 800", "HC 1000"].map((item) => (
                    <th key={item} className="px-6 py-4 border">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {capstanSpecifications.map((row) => (
                  <tr key={row.parameter}>
                    <td className="px-6 py-4 border font-medium">
                      {row.parameter}
                    </td>

                    {row.values.map((value, index) => (
                      <td key={index} className="px-6 py-4 border text-center">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE 3 */}
          <div
            className="overflow-x-auto rounded-3xl border mb-12"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-8 py-5 bg-[var(--muted)] font-bold text-xl">
              HPMC Extruder Specifications
            </div>

            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="px-6 py-4 border">MODEL</th>
                  <th className="px-6 py-4 border">MOTOR LOAD</th>
                  <th className="px-6 py-4 border">MAX RPM</th>
                  <th className="px-6 py-4 border">L/D RATIO</th>
                  <th className="px-6 py-4 border">HEATING POWER</th>
                  <th className="px-6 py-4 border">PVC OUTPUT</th>
                  <th className="px-6 py-4 border">XLPE OUTPUT</th>
                </tr>
              </thead>

              <tbody>
                {hpmcSpecifications.map((item) => (
                  <tr key={item.model}>
                    <td className="px-6 py-4 border text-center">
                      {item.model}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.motorLoad}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.maxRpm}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.ldRatio}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.heatingPower}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.pvcOutput}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {item.xlpeOutput}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE 4 */}
          <div
            className="overflow-x-auto rounded-3xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-8 py-5 bg-[var(--muted)] font-bold text-xl">
              Caterpillar Specifications
            </div>

            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="px-6 py-4 border">PARAMETER</th>
                  {["CAT-4", "CAT-8", "CAT-12", "CAT-16", "CAT-20"].map(
                    (item) => (
                      <th key={item} className="px-6 py-4 border">
                        {item}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {caterpillarSpecifications.map((row) => (
                  <tr key={row.parameter}>
                    <td className="px-6 py-4 border font-medium">
                      {row.parameter}
                    </td>

                    {row.values.map((value, index) => (
                      <td key={index} className="px-6 py-4 border text-center">
                        {value}
                      </td>
                    ))}
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
              <span className="text-[var(--primary)]">
                {" "}
                High Speed Two Layer Cable Plant
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
