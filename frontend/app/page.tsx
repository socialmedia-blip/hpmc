"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import CTA from "./components/CTA";
import Clients from "./components/Client";
import PopupForm from "./components/Popup";
import { useEffect, useState } from "react";
import FloatingContact from "./components/FloatingButton";
import {
  Building2,
  Droplets,
  Quote,
  Star,
  Zap,
  Package,
  FlaskConical,
  Recycle,
  Factory,
  Wheat,
  BadgeCheck,
  HardHat,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import ScrollToTopButton from "./components/ScrollToTop";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ProductCarousel from "./components/Products";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Globe,
  Users,
  Handshake,
  Clock3,
  TrendingUp,
} from "lucide-react";
import DemoPopup from "./components/PopupDemo";

const values = [
  {
    icon: Handshake,
    title: "Transparent Practices",
    description:
      "We believe in honest communication, ethical business practices, and complete transparency throughout every project.",
  },
  {
    icon: Award,
    title: "Superior Engineering Quality",
    description:
      "Every machine is manufactured using premium components, precision engineering, and stringent quality control standards.",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    description:
      "Efficient manufacturing and project planning ensure timely delivery and installation of every extrusion system.",
  },
  {
    icon: HardHat,
    title: "Technical Expertise & Support",
    description:
      "Our experienced engineers provide installation, commissioning, operator training, and dependable after-sales support.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Reliability",
    description:
      "Designed for continuous industrial production, HPMC machines deliver consistent performance,reduced maintenance, and long operational life.",
  },
];

const industries = [
  {
    image: "/industry/water.png",
    title: "Water Infrastructure",
    color: "#0EA5E9",
  },
  {
    image: "/industry/electrical.png",
    title: "Electrical & Cable",
    color: "#F97316",
  },
  {
    image: "/industry/construction.png",
    title: "Construction",
    color: "#65BC4F",
  },
  {
    image: "/industry/packaging.png",
    title: "Packaging",
    color: "#8B5CF6",
  },
  {
    image: "/industry/polymer.png",
    title: "Polymer Processing",
    color: "#06B6D4",
  },
  {
    image: "/industry/plastic.png",
    title: "Plastic Recycling",
    color: "#16A34A",
  },
  {
    image: "/industry/industrial.png",
    title: "Industrial Manufacturing",
    color: "#2563EB",
  },
  {
    image: "/industry/agriculture.png",
    title: "Agriculture & Irrigation",
    color: "#CA8A04",
  },
];

const testimonials = [
  {
    name: "John Smith",
    company: "ABC Industries",
    review:
      "Their team delivered our project ahead of schedule with exceptional quality. Communication was seamless throughout the entire process.",
  },
  {
    name: "Sarah Johnson",
    company: "Global Manufacturing",
    review:
      "Professional, reliable, and highly skilled. We have worked together on multiple projects and the results have always exceeded expectations.",
  },
  {
    name: "Michael Brown",
    company: "Tech Solutions Ltd",
    review:
      "Outstanding service and technical expertise. Their attention to detail and commitment to quality truly set them apart.",
  },
  {
    name: "Emma Wilson",
    company: "Future Engineering",
    review:
      "The entire experience was fantastic. From planning to execution, everything was handled professionally and efficiently.",
  },
];

interface Testimonial {
  _id?: string;
  name: string;
  company?: string;
  review?: string;
  youtubeUrl?: string;
  rating?: number;
}

const heroSlides = [
  {
    image: "/home-hero3.png",
    tag: "India's Leading Plastic Extrusion Machine Manufacturer",
    title: [
      "Precision Plastic Extrusion",
      "Machines Built for",
      "Maximum Performance",
    ],
    desc: "Hindustan Plastics & Machine Corporation (HPMC) is a leading Plastic Extrusion Machine Manufacturer in India, delivering innovative, energy-efficient, and high-performance extrusion machinery for pipe, profile, recycling, and compounding applications. Engineered for precision,productivity, and long-term reliability.",
  },
  {
    image: "/home-hero1.png",
    tag: "Trusted by Manufacturers Across India & Worldwide",
    title: ["Complete Plastic", "Extrusion", "Machinery Solutions."],
    desc: "From PVC and HDPE pipe extrusion plants to recycling systems and compounding extruders,HPMC designs and manufactures advanced plastic extrusion machines that help manufacturers increase production efficiency, reduce downtime, and achieve consistent product quality",
  },
  {
    image: "/home-hero4.png",
    tag: "Manufacturing Excellence Since 1972",
    title: ["50+ Years of Plastic ", " Extrusion", "Engineering Expertise"],
    desc: "With over five decades of experience, HPMC has successfully installed more than 1,000 plasticextrusion machines across India and international markets. We provide complete turnkeyextrusion solutions backed by advanced engineering, technical expertise, and dependableafter-sales support.",
  },
];

const stats = [
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Years of Manufacturing Excellence",
  },
  {
    icon: Factory,
    value: 1000,
    suffix: "+",
    label: "Machines Installed Worldwide",
  },
  {
    icon: Globe,
    value: 80,
    suffix: "+",
    label: "Countries Served",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Experienced Engineers",
  },
  {
    icon: BadgeCheck,
    value: 100,
    suffix: "%",
    label: "Commitment to Customer Satisfaction",
  },
];

interface CounterProps {
  end: number;
  suffix?: string;
}

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [homepageTestimonials, setHomepageTestimonials] =
    useState<Testimonial[]>(testimonials);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");

    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setOpenPopup2(true);
      sessionStorage.setItem("popupShown", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE}/testimonial?active=true`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok || !data.success) return;

        if (!cancelled && Array.isArray(data.data) && data.data.length > 0) {
          setHomepageTestimonials(data.data);
        }
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    };

    if (API_BASE) void fetchTestimonials();

    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  return (
    <div>
      <title>
        Plastic Extrusion Machine Manufacturer in India | HPMC - Since 1972
      </title>
      <meta
        name="description"
        content="Hindustan Plastics & Machine Corporation (HPMC) is a leading plastic extrusion machine manufacturer in India since 1972. We manufacture PVC Pipe Plants, HDPE Pipe Plants, PPR Pipe Plants, Plastic Recycling Machines, PVC Profile Extrusion Lines and complete extrusion solutions."
      />
      {/* Google Search Console verification */}
      <link rel="canonical" href="https://hindustanplastics.com" />
      <Navbar />
      <section className="relative mt-[72px] w-full">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade"
          loop
          autoHeight
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          className="min-h-[calc(100svh-72px)]"
        >
          {heroSlides.map((slide, index) => {
            const HeadingTag = index === 0 ? "h1" : "h2";

            return (
              <SwiperSlide key={index} className="h-auto">
                <div className="relative flex min-h-[calc(100svh-72px)] w-full items-center overflow-hidden bg-[#f7f7f7] py-6 sm:py-8 lg:py-10">
                  {/* BACKGROUND IMAGE */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                    }}
                  />

                  {/* CONTENT */}
                  <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-[620px] w-full">
                      <span className="block mb-2 text-[#65BC4F] font-semibold uppercase tracking-[2px] text-[10px] sm:text-xs md:text-sm">
                        {slide.tag}
                      </span>

                      <HeadingTag className="text-[clamp(1.75rem,2.75vw,2.5rem)] font-bold leading-[1.1] text-[#0B1220]">
                        {slide.title[0]}
                        <br />
                        {slide.title[1]}
                        <br />
                        <span className="text-[#65BC4F]">{slide.title[2]}</span>
                      </HeadingTag>

                      <p className="mt-3 max-w-[520px] text-[13px] leading-6 text-gray-700 sm:text-sm lg:text-[15px]">
                        {slide.desc}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          onClick={() => setOpenPopup(true)}
                          className="flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition px-5 py-2.5 rounded-lg group"
                        >
                          <span className="uppercase text-white font-semibold text-xs sm:text-sm">
                            Book a Site Visit
                          </span>

                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white text-sm">→</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setOpenVideo(true)}
                          className="flex items-center justify-center gap-3 border border-gray-300 hover:border-[#65BC4F] transition px-5 py-2.5 rounded-lg group bg-white/70 backdrop-blur-sm"
                        >
                          <span className="uppercase font-semibold text-xs sm:text-sm text-black group-hover:text-lime-600">
                            Watch Video
                          </span>

                          <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#65BC4F]">
                            <span className="text-xs text-black group-hover:text-lime-600">
                              ▶
                            </span>
                          </div>
                        </button>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button className="hero-prev w-11 h-11 rounded-full border border-[#65BC4F]/30 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#65BC4F] hover:bg-[#65BC4F] hover:text-white transition-all duration-300">
                          ←
                        </button>

                        <button className="hero-next w-11 h-11 rounded-full border border-[#65BC4F]/30 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#65BC4F] hover:bg-[#65BC4F] hover:text-white transition-all duration-300">
                          →
                        </button>

                        <div className="hidden sm:block h-[1px] w-20 bg-gray-300" />

                        <span className="hidden text-xs uppercase tracking-wider text-gray-500 sm:block">
                          Slide Navigation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <section className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--card)] shadow-[var(--shadow-primary)] border border-[var(--border)] overflow-hidden ">
            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-5">
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`group flex flex-col items-center text-center p-6 border border-[var(--border)] transition-all duration-300 hover:bg-[var(--primary)] hover:-translate-y-1 ${
                      index === 4 ? "hidden md:flex" : ""
                    }`}
                  >
                    <div className="relative w-[60px] h-[60px] rounded-full border-2 border-[var(--border)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-white">
                      <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[64px] h-[32px] border-t-[3px] border-[var(--primary)] rounded-t-full transition-all duration-300 group-hover:border-white" />

                      <Icon className="w-7 h-7 text-[var(--primary)] transition-colors duration-300 group-hover:text-white" />
                    </div>

                    <h3 className="text-3xl font-bold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-white">
                      <Counter end={item.value} suffix={item.suffix} />
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-white/90">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 dark:bg-[var(--gradient-dark)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TOP LABEL */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
              About HPMC
            </span>
          </div>

          {/* HEADING */}
          <h2 className="max-w-5xl text-4xl md:text-5xl font-bold leading-tight text-[var(--foreground)]">
            Engineering Reliable Plastic Extrusion
            <br />
            Machines Since1972.
          </h2>

          {/* BOTTOM CONTENT */}
          <div className="mt-10 grid lg:grid-cols-[180px_1fr_220px] gap-10 items-start">
            {/* PLAY BUTTON */}
            <div className="hidden md:flex justify-center">
              <button
                onClick={() => setOpenVideo(true)}
                className="group relative flex h-28 w-28 items-center justify-center"
              >
                {/* Animated Rings */}
                <span className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping"></span>
                <span className="absolute inset-2 rounded-full border border-red-500/40"></span>

                {/* Main Circle */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-red-500/40">
                  {/* Red Play Button */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 transition-all duration-300 group-hover:bg-red-700">
                    <svg
                      className="ml-1 h-6 w-6 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Play Video Label */}
                <div className="absolute -bottom-10 text-center">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Watch Video
                  </p>
                </div>
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border)]" />

              <div className="pl-8">
                <p className="text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)] max-w-[750px] text-justify">
                  For over 50 years, Hindustan Plastics & Machine Corporation
                  has been recognized as a trustedPlastic Extrusion Machine
                  Manufacturer in India. We specialize in designing,
                  manufacturing,and supplying advanced plastic extrusion
                  machinery for PVC, HDPE, CPVC, PPR, profile extrusion, plastic
                  recycling, and compounding industries.
                </p>
                <p className="text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)] max-w-[750px] text-justify">
                  Our machines are engineered for higher output, lower energy
                  consumption, superior processstability, and long service life.
                  From concept and machine manufacturing to
                  installation,commissioning, and technical support, we deliver
                  complete turnkey solutions tailored to the production needs of
                  plastic manufacturers across India and global markets.
                </p>
              </div>
            </div>

            {/* ROUND CTA */}
            <div className="hidden lg:flex justify-center">
              <Link href="/about">
                <div className="group w-40 h-40 rounded-full border border-[var(--border)] flex items-center justify-center text-center cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)] transition-all duration-300">
                  <span className="text-sm uppercase tracking-wider text-[var(--foreground)] group-hover:text-white transition-colors duration-300">
                    Know More
                    <br />
                    About Us ↗
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel />

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
              Industries We Serve.
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Plastic Extrusion Solutions for Diverse Industries.
            </h2>

            <p className="mt-5 text-[var(--text-secondary)] leading-8">
              HPMC extrusion machinery supports manufacturers across a wide
              range of industries with reliable, high-performance, and
              energy-efficient production solutions.
            </p>
          </div>
          {/* Industries */}

          <div className="grid grid-cols-2 gap-5 mt-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-32 w-32 overflow-hidden  transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-primary)] leading-5">
                  {industry.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16  bg-[var(--background)] overflow-hidden">
        {/* BACKGROUND EFFECT */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--primary)]/5 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TOP CONTENT */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            {/* LEFT */}
            <div className="max-w-3xl">
              <span className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
                Why Choose HPMC
              </span>

              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Trusted Plastic Extrusion Machine Manufacturer
                <br />
                for Over Five Decades.
              </h2>

              <p className="mt-5 text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)] max-w-2xl">
                Our commitment to engineering excellence, product quality, and
                customer satisfaction has made HPMC the preferred partner for
                plastic manufacturers worldwide.
              </p>
            </div>

            {/* RIGHT BUTTON */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-primary)] transition duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] transition">
                    <Icon className="w-8 h-8 text-[var(--primary)] group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[14px] leading-7 text-[var(--text-secondary)] ">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 bg-[var(--background)]">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="text-center md:text-left">
              <span className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
                Testimonials
              </span>

              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
                What Our Partners Say.
              </h2>

              <p className="mt-5 max-w-2xl text-[var(--text-secondary)] leading-8">
                Manufacturers across India and international markets trust HPMC
                for delivering dependable plastic extrusion machinery,
                exceptional service, and long-term manufacturing solutions.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3">
              <button className="testimonial-prev w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300">
                <ArrowLeft size={20} />
              </button>

              <button className="testimonial-next w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              clickable: true,
            }}
            loop
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {homepageTestimonials.map((item, index) => {
              const embedUrl = getYoutubeEmbedUrl(item.youtubeUrl);
              const rating = Math.round(
                Math.min(Math.max(item.rating || 5, 1), 5),
              );

              return (
                <SwiperSlide key={item._id || index}>
                  <div
                    className="group flex h-[430px] flex-col rounded-3xl border p-5 transition-all duration-500 hover:shadow-2xl"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  >
                    {/* Quote */}
                    <div className="mb-6 flex justify-between">
                      <div className="flex gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="fill-[var(--primary)] text-[var(--primary)]"
                          />
                        ))}
                      </div>

                      <Quote
                        size={34}
                        className="text-[var(--primary)] opacity-30"
                      />
                    </div>

                    {embedUrl && (
                      <div className="mb-5 overflow-hidden rounded-2xl border border-[var(--border)] bg-black">
                        <iframe
                          src={embedUrl}
                          title={`${item.name} video testimonial`}
                          className="aspect-video w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* Review */}
                    {item.review ? (
                      <div className="mb-6 flex-1 overflow-y-auto pr-2">
                        <p className="leading-8 text-[var(--text-secondary)]">
                          &quot;{item.review}&quot;
                        </p>
                      </div>
                    ) : (
                      <div className="mb-6 flex-1">
                        <p className="text-sm leading-7 text-[var(--text-secondary)]">
                          Watch the video review from this customer.
                        </p>
                      </div>
                    )}

                    {/* User */}
                    <div className="mt-auto flex items-center gap-4 border-t pt-5 border-[var(--border)]">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-bold"
                        style={{
                          borderColor: "var(--primary)",
                          background: "rgba(132,204,22,0.12)",
                          color: "var(--primary)",
                        }}
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">
                          {item.name}
                        </h4>

                        <p className="text-sm text-[var(--text-secondary)]">
                          {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <CTA />
      <Footer />
      <FloatingContact />
      <ScrollToTopButton />
      <DemoPopup open={openPopup} onClose={() => setOpenPopup(false)} />
      <PopupForm open={openPopup2} onClose={() => setOpenPopup2(false)} />

      {openVideo && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpenVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpenVideo(false)}
              className="absolute -top-12 right-0 text-white text-4xl leading-none hover:text-[#65BC4F]"
            >
              ×
            </button>

            {/* Video */}
            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video controls preload="metadata" className="w-full h-auto">
                <source src="/videos/intro.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    let videoId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.replace("/", "");
    } else if (parsedUrl.pathname.startsWith("/shorts/")) {
      videoId = parsedUrl.pathname.split("/")[2] || "";
    } else if (parsedUrl.pathname.startsWith("/embed/")) {
      videoId = parsedUrl.pathname.split("/")[2] || "";
    } else {
      videoId = parsedUrl.searchParams.get("v") || "";
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch {
    return "";
  }
}

function Counter({ end, suffix = "" }: CounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={2.5}
          separator=","
          suffix={suffix}
        />
      ) : (
        `0${suffix}`
      )}
    </div>
  );
}

interface IndustryNodeProps {
  icon: string;
  title: string;
  className: string;
}

function IndustryNode({ icon, title, className }: IndustryNodeProps) {
  return (
    <div className={`absolute group ${className}`}>
      <div className="w-44 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl mb-3 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
          {icon}
        </div>

        <h3 className="text-sm font-medium text-[var(--text-primary)] leading-6">
          {title}
        </h3>
      </div>
    </div>
  );
}
