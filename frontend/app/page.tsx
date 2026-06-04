"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import CTA from "./components/CTA";
import Clients from "./components/Client";
import PopupForm from "./components/Popup";
import { useEffect, useRef, useState } from "react";
import FloatingContact from "./components/FloatingButton";
import { Quote, Star } from "lucide-react";
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
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const heroSlides = [
  {
    image: "/home-hero3.png",
    tag: "India's Trusted Manufacturer Since 1972",
    title: ["50+ Years", "of Plastic Extrusion", "Excellence."],
    desc: "Delivering complete turnkey solutions for PVC, HDPE, PPR, Recycling, Compounding & Profile Extrusion industries with 1000+ successful installations, global exports, and end-to-end technical support.",
  },
  {
    image: "/home-hero.png",
    tag: "Extrusion Redefined",
    title: ["Precision.", "Performance.", "Possibilities."],
    desc: "Advanced plastic extrusion machinery engineered for superior output and reliability.",
  },
  {
    image: "/home-hero4.png",
    tag: "Global Manufacturing Excellence",
    title: ["Manufacturer", "& Exporter", "Worldwide."],
    desc: "Leading manufacturer and exporter of plastic extrusion machineries serving customers globally.",
  },
];

const stats = [
  { icon: "🏆", value: 50, suffix: "+", label: "Years of Experience" },
  { icon: "⚙️", value: 12000, suffix: "+", label: "Machines Installed" },
  { icon: "🌍", value: 80, suffix: "+", label: "Countries Worldwide" },
  { icon: "👨‍🔧", value: 100, suffix: "+", label: "Expert Engineers" },
  { icon: "🎯", value: 100, suffix: "%", label: "Customer Satisfaction" },
];

interface CounterProps {
  end: number;
  suffix?: string;
}

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");

    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setOpenPopup(true);
      sessionStorage.setItem("popupShown", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Navbar />
      <section className="mt-10 relative w-full h-[60vh] lg:h-screen overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade"
          loop
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[60vh] lg:h-[100vh] overflow-hidden">
                {/* BACKGROUND IMAGE */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                />

                {/* CONTENT */}
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-[580px] w-full mt-16 sm:mt-20 md:mt-24 lg:mt-0">
                    <p className="text-[#65BC4F] font-semibold uppercase tracking-[2px] mb-2 text-[10px] sm:text-xs md:text-sm">
                      {slide.tag}
                    </p>

                    <h1 className="text-[22px] sm:text-[34px] md:text-[46px] lg:text-[60px] leading-[1.05] font-bold text-[#0B1220]">
                      {slide.title[0]}
                      <br />
                      {slide.title[1]}
                      <br />
                      <span className="text-[#65BC4F]">{slide.title[2]}</span>
                    </h1>

                    <p className="mt-3 sm:mt-4 text-[12px] sm:text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-gray-700 max-w-[520px]">
                      {slide.desc}
                    </p>

                    <div className="flex flex-row gap-3 mt-5">
                      <Link href="/products">
                        <button className="flex items-center justify-center gap-3 bg-[#65BC4F] hover:bg-lime-600 transition px-5 py-2.5 rounded-lg group w-full sm:w-auto">
                          <span className="uppercase text-white font-semibold text-xs sm:text-sm">
                            Explore Products
                          </span>

                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white text-sm">→</span>
                          </div>
                        </button>
                      </Link>

                      <button
                        onClick={() => setOpenVideo(true)}
                        className="flex items-center justify-center gap-3 border border-gray-300 hover:border-[#65BC4F] transition px-5 py-2.5 rounded-lg group bg-white/70 backdrop-blur-sm w-full sm:w-auto"
                      >
                        {" "}
                        <span className="uppercase font-semibold text-xs sm:text-sm text-black group-hover:text-lime-600">
                          {" "}
                          Watch Video{" "}
                        </span>{" "}
                        <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#65BC4F]">
                          {" "}
                          <span className="text-xs text-black group-hover:text-lime-600">
                            {" "}
                            ▶{" "}
                          </span>{" "}
                        </div>{" "}
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                      <button className="hero-prev w-11 h-11 rounded-full border border-[#65BC4F]/30 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#65BC4F] hover:bg-[#65BC4F] hover:text-white transition-all duration-300">
                        ←
                      </button>

                      <button className="hero-next w-11 h-11 rounded-full border border-[#65BC4F]/30 bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#65BC4F] hover:bg-[#65BC4F] hover:text-white transition-all duration-300">
                        →
                      </button>

                      <div className="h-[1px] w-20 bg-gray-300"></div>

                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        Slide Navigation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--card)] shadow-[var(--shadow-primary)] border border-[var(--border)] overflow-hidden ">
            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-5">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center p-6 border border-[var(--border)] transition-all duration-300 hover:bg-[var(--primary)] hover:-translate-y-1"
                >
                  <div className="relative w-[60px] h-[60px] rounded-full border-2 border-[var(--border)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-white">
                    <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[64px] h-[32px] border-t-[3px] border-[var(--primary)] rounded-t-full transition-all duration-300 group-hover:border-white" />
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-white">
                    <Counter end={item.value} suffix={item.suffix} />
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-white/90">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 dark:bg-[var(--gradient-dark)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TOP LABEL */}
          <div className="flex items-center gap-4 mb-4">
            <p className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
              About HPMC
            </p>
          </div>

          {/* HEADING */}
          <h2 className="max-w-5xl text-4xl md:text-5xl font-bold leading-tight text-[var(--foreground)]">
            Engineering Excellence
            <br />
            in Plastic Extrusion
            <br />
            Since 1972.
          </h2>

          {/* BOTTOM CONTENT */}
          <div className="mt-10 grid lg:grid-cols-[180px_1fr_220px] gap-10 items-start">
            {/* PLAY BUTTON */}
            <div className="hidden md:flex justify-center">
              <button
                onClick={() => setOpenVideo(true)}
                className="w-28 h-28 rounded-full border-2 border-[var(--primary)] flex items-center justify-center group hover:bg-[var(--primary)] transition-all"
              >
                <span className="text-3xl text-[var(--primary)] group-hover:text-white ml-1">
                  ▶
                </span>
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border)]" />

              <div className="pl-8">
                <p className="text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)] max-w-[750px]">
                  For more than five decades, Hindustan Plastics & Machine
                  Corporation has been a trusted leader in India's plastic
                  processing and extrusion machinery industry. Since 1972, we
                  have delivered innovative, reliable, and high-performance
                  manufacturing solutions built on engineering precision,
                  uncompromising quality, and customer-focused innovation.
                  Today, HPMC proudly serves manufacturers across India and
                  global markets with advanced extrusion technologies and
                  complete turnkey solutions.
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

      <section className="relative py-16 bg-[var(--background)] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-[var(--primary)]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[var(--primary)]/5 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[420px_1fr] gap-16 items-start">
            {/* LEFT CONTENT */}
            <div className="sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <p className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
                  Industries We Serve
                </p>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Trusted Across
                <br />
                Diverse Industries
              </h2>

              <p className="mt-6 text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)]">
                From infrastructure and agriculture to recycling and polymer
                processing, HPMC delivers reliable extrusion solutions tailored
                to the evolving needs of modern industries.
              </p>

              <div className="mt-8 p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)]">
                <p className="text-[var(--text-secondary)] leading-7">
                  Whether you are launching a new manufacturing venture or
                  expanding an existing production facility, our team provides
                  complete turnkey solutions aligned with your business goals.
                </p>
              </div>
            </div>

            {/* RIGHT GRID */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: "💧",
                  title: "Water Supply & Infrastructure",
                },
                {
                  icon: "🌾",
                  title: "Agriculture & Irrigation",
                },
                {
                  icon: "🏗️",
                  title: "Construction & Building Materials",
                },
                {
                  icon: "⚡",
                  title: "Electrical & Cable Industries",
                },
                {
                  icon: "📦",
                  title: "Packaging & Consumer Products",
                },
                {
                  icon: "🏭",
                  title: "Industrial Components Manufacturing",
                },
                {
                  icon: "♻️",
                  title: "Plastic Recycling & Sustainability",
                },
                {
                  icon: "🧪",
                  title: "PVC Compounding & Polymer Processing",
                },
              ].map((industry, index) => (
                <div
                  key={index}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-4 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[var(--shadow-primary)]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                    {industry.icon}
                  </div>

                  <h3 className="text-base  text-[var(--text-primary)] leading-7">
                    {industry.title}
                  </h3>
                </div>
              ))}
            </div>
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
              <p className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
                Why Choose HPMC
              </p>

              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Trusted By Manufacturers
                <br />
                For Over 50 Years
              </h2>

              <p className="mt-5 text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)] max-w-2xl">
                Combining engineering excellence, superior quality, and
                dedicated support to deliver reliable extrusion solutions that
                drive long-term business growth.
              </p>
            </div>

            {/* RIGHT BUTTON */}
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* CARD */}
            <div className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-primary)] transition duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-[var(--primary)] transition">
                <span className="group-hover:scale-110 transition">🤝</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Transparent Practices
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                Honest communication, ethical dealings, and complete
                transparency at every stage.
              </p>
            </div>

            {/* CARD */}
            <div className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-primary)] transition duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-[var(--primary)] transition">
                <span className="group-hover:scale-110 transition">🏆</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Superior Quality
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                Precision-engineered machinery built for durability, efficiency,
                and performance.
              </p>
            </div>

            {/* CARD */}
            <div className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-primary)] transition duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-[var(--primary)] transition">
                <span className="group-hover:scale-110 transition">⏱️</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Timely Delivery
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                Efficient planning and execution ensure projects are completed
                on schedule.
              </p>
            </div>

            {/* CARD */}
            <div className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-primary)] transition duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-[var(--primary)] transition">
                <span className="group-hover:scale-110 transition">👨‍🔧</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Technical Support
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                Expert guidance, installation assistance, and responsive
                after-sales service.
              </p>
            </div>

            <div className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 hover:-translate-y-2 hover:shadow-[var(--shadow-primary)] transition duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-[var(--primary)] transition">
                <span className="group-hover:scale-110 transition">📈</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Long-Term Reliability
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                Trusted by customers for repeat projects, expansions, and new
                production lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 bg-[var(--background)]">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="text-center md:text-left">
              <p className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
                Testimonials
              </p>

              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
                What Our Clients Say
              </h2>

              <p className="mt-5 max-w-2xl text-[var(--text-secondary)] leading-8">
                Trusted by businesses worldwide for delivering quality,
                reliability, and innovation.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3">
              <button
                ref={prevRef}
                className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                ref={nextRef}
                className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
              >
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
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
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
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="group flex h-[340px] flex-col rounded-3xl border p-6 transition-all duration-500 hover:shadow-2xl"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Quote */}
                  <div className="mb-6 flex justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
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

                  {/* Review */}
                  <div className="mb-6 flex-1 overflow-y-auto pr-2">
                    <p className="leading-8 text-[var(--text-secondary)]">
                      "{item.review}"
                    </p>
                  </div>

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
            ))}
          </Swiper>
        </div>
      </section>
      <CTA />
      <Footer />
      <FloatingContact />
      <ScrollToTopButton />
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />

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
                <source src="/abc.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
