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

const galleryImages = ["/products/shredder/shredder.png"];

const machineGallery = [
  "/products/shredder/SK7A9375.JPG",
  "/products/shredder/SK7A9376.JPG",
  "/products/shredder/SK7A9378.JPG",
  "/products/shredder/SK7A9379.JPG",
  "/products/shredder/SK7A9380.JPG",
  "/products/shredder/SK7A9381.JPG",
];

const specifications = [
  [
    "Size of crushing chamber",
    "600 × 600 mm (L × W)",
    "800 × 900 mm (L × W)",
    "1200 × 1200 mm (L × W)",
  ],
  ["Blade material", "SKD 11", "SKD 11", "SKD 11"],
  ["Hardness of blade", "HRC60", "HRC60", "HRC60"],
  ["Qty of rotary blade", "26 pcs", "38 pcs", "64 pcs"],
  ["Power of drive motor", "22 kW AC", "37 kW AC", "45 kW AC"],
  ["Oil pump motor", "2.2 kW", "3 kW", "4 kW AC"],
  ["Size of screen sieve", "16 mm", "40 mm", "40 mm"],
];

const faqData = [
  {
    question: "What is a Single Shaft Shredder?",
    answer:
      "A Single Shaft Shredder is an industrial recycling machine designed to reduce the size of plastic waste, pipes, lumps, films, containers, and other materials into uniform shredded pieces for efficient recycling and reprocessing.",
  },
  {
    question: "How does a Single Shaft Shredder work?",
    answer:
      "The machine feeds material into a shredding chamber where a high-torque rotating shaft equipped with SKD11 blades cuts the material against stationary knives until the desired particle size passes through the screen.",
  },
  {
    question: "Which materials can be processed using a Single Shaft Shredder?",
    answer:
      "The machine can process PVC, HDPE, LDPE, LLDPE, PP, PET, plastic pipes, plastic lumps, films, woven bags, pallets, containers, and various industrial plastic waste materials.",
  },
  {
    question: "Which products can be shredded using this machine?",
    answer:
      "The machine can shred plastic pipes, profiles, drums, bottles, plastic blocks, injection molding rejects, woven sacks, plastic films, cable waste, and recycled plastic scrap.",
  },
  {
    question: "Which industries use Single Shaft Shredders?",
    answer:
      "Plastic recycling plants, extrusion manufacturers, injection molding companies, packaging industries, cable manufacturers, automotive industries, waste management companies, and recycling facilities widely use Single Shaft Shredders.",
  },
  {
    question: "Which is the best Single Shaft Shredder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation is one of the best Single Shaft Shredder manufacturers in India, offering heavy-duty shredding machines with robust construction, high efficiency, and reliable performance.",
  },
  {
    question: "Who is the top Single Shaft Shredder manufacturer in India?",
    answer:
      "Hindustan Plastics and Machine Corporation manufactures advanced Single Shaft Shredders trusted by plastic recycling companies across India and international markets.",
  },
  {
    question: "What are the advantages of a Single Shaft Shredder?",
    answer:
      "The machine offers high shredding efficiency, uniform output size, low operating cost, durable SKD11 blades, energy-efficient operation, and reliable long-term industrial performance.",
  },
  {
    question: "Why should manufacturers invest in a Single Shaft Shredder?",
    answer:
      "A Single Shaft Shredder helps reduce plastic waste volume, improve recycling efficiency, lower raw material costs, and maximize the reuse of valuable plastic materials.",
  },
  {
    question: "What shredding capacity does the Single Shaft Shredder offer?",
    answer:
      "Shredding capacity depends on the selected machine model, material type, feed size, blade configuration, and screen size, ensuring efficient industrial recycling.",
  },
  {
    question: "Which machine models are available?",
    answer:
      "Hindustan Plastics and Machine Corporation offers WT 600, WT 800, and WT 1000 Single Shaft Shredder models for different industrial recycling capacities.",
  },
  {
    question: "What is the crushing chamber size of the Single Shaft Shredder?",
    answer:
      "The machine is available with crushing chamber sizes of 600 × 600 mm, 800 × 900 mm, and 1200 × 1200 mm depending on the selected model.",
  },
  {
    question: "What blade material is used in the Single Shaft Shredder?",
    answer:
      "The machine uses premium-quality SKD11 blades with approximately HRC60 hardness, providing excellent wear resistance, long blade life, and superior cutting performance.",
  },
  {
    question: "Why are SKD11 blades used in shredders?",
    answer:
      "SKD11 blades provide high hardness, excellent wear resistance, superior cutting efficiency, and long service life even during continuous industrial operation.",
  },
  {
    question: "Which industries benefit from Single Shaft Shredders?",
    answer:
      "Plastic recycling industries, extrusion plants, packaging manufacturers, cable manufacturers, plastic processors, waste management companies, and industrial recycling facilities benefit from Single Shaft Shredders.",
  },
  {
    question: "Can the machine shred plastic pipes?",
    answer:
      "Yes. The Single Shaft Shredder is designed to shred PVC, HDPE, PE, PP, and other plastic pipes into uniformly sized recyclable pieces.",
  },
  {
    question:
      "Can the machine shred plastic lumps and injection molding waste?",
    answer:
      "Yes. The machine efficiently shreds plastic lumps, injection molding rejects, thick plastic blocks, and industrial plastic scrap.",
  },
  {
    question: "Can the machine shred plastic films and woven bags?",
    answer:
      "Yes. With appropriate feeding conditions, the machine can shred plastic films, woven sacks, raffia materials, and flexible plastic waste.",
  },
  {
    question: "Is the Single Shaft Shredder energy efficient?",
    answer:
      "Yes. The machine features optimized drive systems, efficient hydraulic technology, and precision blade design to reduce energy consumption while maintaining high shredding performance.",
  },
  {
    question: "Can the Single Shaft Shredder operate continuously?",
    answer:
      "Yes. The machine is designed for continuous industrial operation with stable performance, high reliability, and minimal downtime.",
  },
  {
    question: "Can the Single Shaft Shredder be customized?",
    answer:
      "Yes. Hindustan Plastics and Machine Corporation offers customized chamber sizes, blade configurations, screen sizes, hydraulic systems, motors, and automation according to customer requirements.",
  },
  {
    question:
      "Is this machine suitable for starting a plastic recycling business?",
    answer:
      "Yes. The Single Shaft Shredder is an excellent investment for entrepreneurs and recycling companies planning to establish or expand plastic recycling operations.",
  },
  {
    question:
      "Why choose Hindustan Plastics and Machine Corporation for a Single Shaft Shredder?",
    answer:
      "Hindustan Plastics and Machine Corporation offers precision-engineered shredding machines with heavy-duty construction, advanced engineering, customized solutions, and dependable technical support.",
  },
  {
    question:
      "Why is Hindustan Plastics and Machine Corporation one of the best Single Shaft Shredder manufacturers in India?",
    answer:
      "With decades of machinery manufacturing experience, precision engineering, premium manufacturing standards, robust machine construction, and reliable after-sales support, Hindustan Plastics and Machine Corporation is trusted worldwide.",
  },
  {
    question: "How can I get the best price for a Single Shaft Shredder?",
    answer:
      "Contact Hindustan Plastics and Machine Corporation with your material type, required shredding capacity, feed size, and project requirements to receive a customized quotation and expert machine recommendation.",
  },
];

export default function SingleShaftShredder() {
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
      <title>Single Shaft Shredder | HPMC</title>

      <meta
        name="description"
        content="Industrial single shaft shredders for efficient plastic waste size reduction and recycling applications."
      />

      <link
        rel="canonical"
        href="https://hindustanplastics.com/single-shaft-shredder"
      />
      <Navbar />

      <section className="relative w-full min-h-[650px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/home-hero1.png')",
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
              Single Shaft
              <span className="block text-[#65BC4F]">Shredder</span>
            </h1>

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
            Single Shaft Shredder -
            <span className="text-[var(--primary)]">
              {" "}
              Single Shaft Shredder
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
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[var(--primary)] uppercase tracking-[3px] font-semibold text-sm">
              Technical Specifications
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Choose the Right{" "}
              <span className="text-[var(--primary)]">Model</span>
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-[var(--border)] bg-white shadow-[var(--shadow-primary)]">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-[var(--primary)] text-white">
                <tr>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    Machine model
                  </th>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    WT 600
                  </th>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    WT 800
                  </th>
                  <th scope="col" className="px-6 py-5 font-semibold">
                    WT 1000
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                {specifications.map(([label, wt600, wt800, wt1000]) => (
                  <tr key={label} className="even:bg-[var(--surface)]">
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-[var(--text-primary)]"
                    >
                      {label}
                    </th>
                    <td className="px-6 py-4">{wt600}</td>
                    <td className="px-6 py-4">{wt800}</td>
                    <td className="px-6 py-4">{wt1000}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[var(--primary)] uppercase tracking-[3px] font-semibold text-sm">
              Gallery
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
              Machine <span className="text-[var(--primary)]">Gallery</span>
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] leading-8">
              Explore different views of the HPMC Single Shaft Shredder,
              showcasing its robust construction, precision engineering, and
              industrial-grade components.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {machineGallery.map((image, index) => (
              <div
                key={index}
                className="
            group
            overflow-hidden
            rounded-3xl
            border
            border-[var(--border)]
            bg-white
            shadow-[var(--shadow-primary)]
            hover:shadow-2xl
            transition-all
            duration-500
          "
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={image}
                    alt={`Single Shaft Shredder ${index + 1}`}
                    fill
                    className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
                  />
                </div>
              </div>
            ))}
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
                Single Shaft Shredder
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
                  <span className="block text-xs font-semibold uppercase tracking-[2px] text-[var(--primary)]">
                    {showAllFaqs ? "Collapse List" : "Explore More"}
                  </span>
                  <span className="block text-sm font-bold sm:text-base">
                    {showAllFaqs
                      ? "Show fewer questions"
                      : `View ${faqData.length - displayedFaqs.length} more FAQs`}
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
