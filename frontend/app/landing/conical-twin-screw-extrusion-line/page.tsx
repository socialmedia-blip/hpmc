import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleGauge,
  Factory,
  Gauge,
  Layers3,
  Lightbulb,
  PackageCheck,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import LandingLeadForm from "../../components/LandingLeadForm";
import LandingNavbar from "../../components/LandingNavbar";
import LandingFooter from "../../components/LandingFooter";

export const metadata: Metadata = {
  title: "Conical Twin Screw Extrusion Line | HPMC",
  description:
    "HPMC Conical Twin Screw Extrusion Lines for PVC pipe, UPVC window profile, PVC profile, WPC profile and PVC compounding applications.",
};

const productName = "Conical Twin Screw Extrusion Line";

const applications = [
  {
    title: "PVC Pipe",
    tag: "Pipe Extrusion",
    description:
      "Designed for reliable PVC pipe production with stable material processing, controlled extrusion and consistent output across different pipe requirements.",
    points: [
      "Stable & consistent extrusion",
      "Suitable for multiple pipe sizes",
      "Reliable continuous production",
    ],
  },
  {
    title: "UPVC Window Profile",
    tag: "Window Profiles",
    description:
      "Conical twin screw extrusion solutions for manufacturing UPVC window profiles with controlled processing, dimensional consistency and dependable production.",
    points: [
      "Consistent profile dimensions",
      "Controlled material processing",
      "Reliable production performance",
    ],
  },
  {
    title: "PVC Profile",
    tag: "Profile Extrusion",
    description:
      "Engineered for manufacturing PVC profiles used across construction, electrical and industrial applications with stable processing and consistent profile quality.",
    points: [
      "Consistent profile quality",
      "Stable material flow",
      "Multiple profile applications",
    ],
  },
  {
    title: "WPC Profile",
    tag: "WPC Processing",
    description:
      "Designed for efficient processing of wood-plastic composite formulations into durable profiles for building, furniture and decorative applications.",
    points: [
      "Excellent surface finish",
      "Stable & reliable processing",
      "Suitable for diverse WPC profiles",
    ],
  },
  {
    title: "PVC Compounding",
    tag: "Compounding",
    description:
      "Efficient processing solutions for PVC compounding applications requiring controlled material handling, consistent mixing and dependable processing performance.",
    points: [
      "Consistent material processing",
      "Controlled mixing performance",
      "Application-specific configuration",
    ],
  },
];

const features = [
  {
    icon: CircleGauge,
    title: "Stable Processing",
    description:
      "Engineered for controlled and consistent material processing across demanding PVC extrusion applications.",
  },
  {
    icon: Settings2,
    title: "Precision Engineering",
    description:
      "Designed with carefully engineered components for reliable operation and consistent production performance.",
  },
  {
    icon: Layers3,
    title: "Application Versatility",
    description:
      "One extrusion platform supporting pipe, profile, window profile, WPC and PVC compounding requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Robust Construction",
    description:
      "Heavy-duty construction designed for dependable operation in continuous industrial production environments.",
  },
  {
    icon: Gauge,
    title: "Process Control",
    description:
      "Designed to support stable temperature, material flow and production control for consistent output.",
  },
  {
    icon: Wrench,
    title: "Custom Configuration",
    description:
      "Machine configuration can be selected according to material, application, dimensions and required production capacity.",
  },
];

const specifications = [
  {
    model: "HPMC 51/105",
    minPipeOD: "16 mm",
    maxPipeOD: "200 mm",
  },
  {
    model: "HPMC 55/120",
    minPipeOD: "16 mm",
    maxPipeOD: "200 mm",
  },
  {
    model: "HPMC 65/132",
    minPipeOD: "63 mm",
    maxPipeOD: "250 mm",
  },
  {
    model: "HPMC 80/156",
    minPipeOD: "110 mm",
    maxPipeOD: "315 mm",
  },
];

const whyHpmc = [
  "Engineering experience since 1972",
  "Application-focused extrusion solutions",
  "Multiple machine configurations",
  "Support from selection to installation",
  "Solutions for diverse PVC & WPC applications",
  "Built for industrial production environments",
];

export default function ConicalTwinScrewExtrusionLine() {
  return (
    <>
      <LandingNavbar />
      <Script id="landing-phone-conversion-config" strategy="afterInteractive">
        {`
          gtag('config', 'AW-18372765916/O7I5COS2pOMcENzR6LhE', {
            'phone_conversion_number': '9560596392'
          });
        `}
      </Script>
      <Script id="landing-click-to-call-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-18372765916/6XCdCOq2pOMcENzR6LhE',
              'value': 1.0,
              'currency': 'INR',
              'event_callback': callback
            });
            return false;
          }
        `}
      </Script>
      <main className="overflow-hidden ">
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative isolate min-h-[720px] overflow-hidden  lg:min-h-[760px]">
          {/* =====================================================
      FULL HERO BACKGROUND IMAGE
  ===================================================== */}

          {/* Soft vertical overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20" />

          {/* HPMC Green Ambient Glow */}
          <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-[#65BC4F]/10 blur-[120px]" />

          {/* Bottom fade helps hero blend into next section */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

          {/* =====================================================
      CONTENT
  ===================================================== */}
          <div className="relative z-10 mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:min-h-[760px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:py-24">
            <div className="w-full max-w-[670px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#65BC4F]/25 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-[#438f32] shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-md">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#65BC4F]/10">
                  <BadgeCheck className="h-4 w-4 text-[#579f42]" />
                </span>
                Engineering excellence since 1972
              </div>

              {/* Heading */}
              <h1 className="mt-7 max-w-[650px] text-[42px] font-bold leading-[1.05] tracking-[-0.035em] text-[#0B1220] sm:text-5xl md:text-6xl lg:text-[68px]">
                Conical Twin Screw
                <span className="mt-1 block text-[#579f42]">
                  Extrusion Line
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-[610px] text-base leading-8 text-slate-600 sm:text-lg lg:text-[19px]">
                Engineered for reliable and consistent processing of PVC and WPC
                materials across pipe, profile, window profile and compounding
                applications.
              </p>

              {/* Small Trust Points */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "PVC & WPC Processing",
                  "Multiple Configurations",
                  "Industrial Production",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#65BC4F]/15">
                      <Check className="h-3.5 w-3.5 text-[#438f32]" />
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quick-enquiry"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#65BC4F] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(101,188,79,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#55a940] hover:shadow-[0_16px_35px_rgba(101,188,79,0.32)] sm:text-base"
                >
                  Discuss Your Requirement
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#applications"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white/80 px-7 py-4 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#65BC4F]/60 hover:bg-white hover:text-[#438f32] sm:text-base"
                >
                  Explore Applications
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* =================================================
          STATS
      ================================================= */}
              <div className="mt-10 max-w-[620px] border-t border-slate-200/80 pt-7">
                <div className="grid grid-cols-3">
                  {[
                    {
                      value: "50+",
                      label: "Years Experience",
                    },
                    {
                      value: "5+",
                      label: "Applications",
                    },
                    {
                      value: "PVC & WPC",
                      label: "Processing",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`${
                        index !== 0
                          ? "border-l border-slate-200 pl-5 sm:pl-7"
                          : ""
                      } ${index !== 2 ? "pr-3 sm:pr-7" : ""}`}
                    >
                      <p
                        className={`font-bold leading-none text-[#438f32] ${
                          item.value === "PVC & WPC"
                            ? "text-lg sm:text-xl"
                            : "text-2xl sm:text-3xl"
                        }`}
                      >
                        {item.value}
                      </p>

                      <p className="mt-2 text-[11px] font-medium leading-4 text-slate-500 sm:text-xs">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="quick-enquiry" className="w-full">
              <LandingLeadForm
                product={productName}
                className="mx-auto w-full max-w-xl border border-white/70 bg-white/95"
              />
            </div>
          </div>

          {/* =====================================================
      MACHINE LABEL - DESKTOP ONLY
  ===================================================== */}
          <div className="absolute bottom-12 right-8 z-10 hidden xl:block">
            <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#65BC4F] opacity-50" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#65BC4F]" />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#579f42]">
                  HPMC Extrusion Technology
                </p>

                <p className="mt-0.5 text-xs font-semibold text-slate-700">
                  Engineered for reliable PVC processing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            OVERVIEW
        ========================================================= */}
        <section
          id="overview"
          className="relative overflow-hidden bg-[var(--background)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8 lg:py-28"
        >
          {/* Background Decoration */}
          <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
              {/* =====================================================
          IMAGE SIDE
      ===================================================== */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />
                <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />

                {/* Machine Image */}
                <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-primary)] sm:p-7">
                  {/* Soft green gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.08] via-transparent to-transparent" />

                  {/* Grid Pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
                    style={{
                      backgroundImage: `
                linear-gradient(var(--foreground) 1px, transparent 1px),
                linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
              `,
                      backgroundSize: "28px 28px",
                    }}
                  />

                  <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[380px]">
                    <Image
                      src="/products/conical-twin-screw-extruder.jpg"
                      alt="HPMC Conical Twin Screw Extrusion Line"
                      width={700}
                      height={500}
                      className="h-auto w-full object-contain"
                    />
                  </div>

                  {/* Machine Label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 px-4 py-3 shadow-lg backdrop-blur-md sm:left-6 sm:right-auto">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-40" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--primary)]" />
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                        HPMC Extrusion Technology
                      </p>

                      <p className="mt-0.5 text-xs font-semibold text-[var(--text-primary)]">
                        Built for industrial PVC processing
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
            FEATURE CARDS
        ================================================= */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      icon: CircleGauge,
                      title: "Stable Processing",
                      desc: "Consistent material flow",
                    },
                    {
                      icon: Settings2,
                      title: "Process Control",
                      desc: "Controlled performance",
                    },
                    {
                      icon: Factory,
                      title: "Industrial Design",
                      desc: "Built for production",
                    },
                    {
                      icon: Layers3,
                      title: "Flexible Setup",
                      desc: "Application focused",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-lg sm:p-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-[var(--text-primary)] sm:text-base">
                        {title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* =====================================================
          CONTENT SIDE
      ===================================================== */}
              <div className="order-1 lg:order-2">
                {/* Eyebrow */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary)] sm:text-sm">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                    Product Overview
                  </span>
                </div>

                {/* Heading */}
                <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[48px]">
                  Engineered for Reliable
                  <span className="mt-1 block text-[var(--primary)]">
                    PVC & WPC Processing
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  HPMC Conical Twin Screw Extrusion Lines are engineered for
                  efficient and consistent processing of PVC and WPC materials.
                  Designed for stable material flow and dependable operation,
                  the system supports demanding extrusion applications and
                  continuous production requirements.
                </p>

                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  Multiple machine configurations allow the extrusion line to be
                  matched to your raw material, end product, required dimensions
                  and production capacity.
                </p>

                {/* =================================================
            APPLICATION HIGHLIGHTS
        ================================================= */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "PVC Pipe Extrusion",
                    "UPVC Window Profiles",
                    "PVC & WPC Profiles",
                    "PVC Compounding",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 transition duration-300 hover:border-[var(--primary)]/40"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">
                        <Check className="h-4 w-4 text-[var(--primary)]" />
                      </span>

                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* =================================================
            TRUST STRIP
        ================================================= */}
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-[var(--border)] py-4">
                  <div>
                    <p className="text-xl font-bold text-[var(--primary)]">
                      50+
                    </p>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      Years of experience
                    </p>
                  </div>

                  <div className="hidden h-9 w-px bg-[var(--border)] sm:block" />

                  <div>
                    <p className="text-xl font-bold text-[var(--primary)]">
                      5+
                    </p>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      Applications
                    </p>
                  </div>

                  <div className="hidden h-9 w-px bg-[var(--border)] sm:block" />

                  <div>
                    <p className="text-xl font-bold text-[var(--primary)]">
                      PVC & WPC
                    </p>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      Processing solutions
                    </p>
                  </div>
                </div>

                {/* =================================================
            CTA
        ================================================= */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#enquire"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(101,188,79,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_14px_32px_rgba(101,188,79,0.30)] sm:text-base"
                  >
                    Discuss Your Requirement
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#applications"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-7 py-3.5 text-sm font-bold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--primary)]/60 hover:text-[var(--primary)] sm:text-base"
                  >
                    Explore Applications
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            APPLICATIONS
        ========================================================= */}
        <section
          id="applications"
          className="relative overflow-hidden bg-[var(--background)] px-5 py-20 sm:px-8 "
        >
          {/* Background Effects */}
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl">
            {/* Section Heading */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)] sm:text-sm">
                  Applications
                </p>
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                One Extrusion Platform.
                <span className="block text-[var(--primary)]">
                  Multiple Applications.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                HPMC Conical Twin Screw Extrusion Lines can be configured for
                different PVC and WPC processing requirements, from pipe and
                profile production to compounding applications.
              </p>
            </div>

            {/* Application Cards */}
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              {applications.map((application, index) => (
                <div
                  key={application.title}
                  className={`
            group relative overflow-hidden rounded-2xl
            border border-[var(--border)]
            bg-[var(--card)]
            p-6
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[var(--primary)]/40
            hover:shadow-[var(--shadow-primary)]
            sm:p-7

            ${
              index < 3
                ? "lg:col-span-2"
                : index === 3
                  ? "lg:col-span-3"
                  : "lg:col-span-3"
            }
          `}
                >
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--primary)]/0 blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/10" />

                  {/* Number */}
                  <span className="absolute right-6 top-6 text-4xl font-bold leading-none text-[var(--primary)]/[0.08] transition-colors group-hover:text-[var(--primary)]/[0.14]">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--primary)]/15 bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                      <Layers3 className="h-5 w-5" />
                    </div>

                    {/* Tag */}
                    <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                      {application.tag}
                    </p>

                    {/* Title */}
                    <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                      {application.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                      {application.description}
                    </p>

                    {/* Divider */}
                    <div className="my-5 h-px bg-[var(--border)]" />

                    {/* Points */}
                    <ul className="space-y-3">
                      {application.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm font-medium leading-6 text-[var(--text-primary)]"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">
                            <Check className="h-3 w-3 text-[var(--primary)]" />
                          </span>

                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Accent */}
                    <div className="mt-6 h-[2px] w-10 rounded-full bg-[var(--primary)]/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[var(--primary)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 flex flex-col items-center text-center">
              <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                Not sure which extrusion configuration is suitable for your
                application? Share your material, product and production
                requirements with our team.
              </p>

              <a
                href="#enquire"
                className="group mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(101,188,79,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_14px_32px_rgba(101,188,79,0.30)] sm:text-base"
              >
                Discuss Your Application
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            FEATURES
        ========================================================= */}
        <section className="relative overflow-hidden bg-[var(--background)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            {/* Heading */}
            <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)] sm:text-sm">
                  Key Features & Benefits
                </p>
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                Built for{" "}
                <span className="text-[var(--primary)]">
                  Consistent Production
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                Every extrusion requirement is different. HPMC systems are
                configured around your material, application and production
                requirements to deliver reliable processing and consistent
                performance.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={title}
                  className="
            group relative overflow-hidden rounded-[1.5rem]
            border border-[var(--border)]
            bg-[var(--card)]
            p-7
            transition-all duration-300
            hover:-translate-y-1.5
            hover:border-[var(--primary)]/40
            hover:shadow-[var(--shadow-primary)]
            sm:p-8
          "
                >
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--primary)]/0 blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/10" />

                  {/* Number */}
                  <span className="absolute right-6 top-6 text-xs font-bold tracking-widest text-[var(--text-light)] opacity-60">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                      {description}
                    </p>

                    {/* Bottom Accent */}
                    <div className="mt-6 h-[2px] w-10 rounded-full bg-[var(--primary)]/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[var(--primary)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 flex flex-col items-center text-center lg:mt-16">
              <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                Need help selecting the right extrusion configuration for your
                production requirements?
              </p>

              <a
                href="#enquire"
                className="
          group mt-5 inline-flex items-center justify-center gap-2
          rounded-xl
          bg-[var(--secondary)]
          px-7 py-3.5
          font-bold text-white
          shadow-lg
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-[var(--secondary-light)]
          hover:shadow-xl
        "
              >
                Request Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            TECHNICAL SPECIFICATIONS
        ========================================================= */}
        <section className="relative overflow-hidden bg-[var(--background)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8">
          {/* Background Effects */}
          <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            {/* =====================================================
        SECTION HEADER
    ===================================================== */}
            <div className="mb-14 flex flex-col justify-between gap-7 lg:mb-16 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)] sm:text-sm">
                    Technical Specifications
                  </p>
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                  Typical PVC Pipe
                  <span className="block text-[var(--primary)]">
                    Configurations
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  Available configurations support different pipe dimensions and
                  production requirements. Final machine selection depends on
                  your material, application, pipe size and required production
                  output.
                </p>
              </div>

              {/* Help CTA */}
              <a
                href="#enquire"
                className="group inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-bold text-[var(--primary)] transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-lg sm:text-base"
              >
                Need help selecting a model?
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* =====================================================
        SPECIFICATION TABLE
    ===================================================== */}
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-primary)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-[var(--secondary)] text-white">
                      <th className="px-6 py-5 text-sm font-bold sm:px-8 sm:text-base">
                        Machine Model
                      </th>

                      <th className="px-6 py-5 text-sm font-bold sm:px-8 sm:text-base">
                        Minimum Pipe OD
                      </th>

                      <th className="px-6 py-5 text-sm font-bold sm:px-8 sm:text-base">
                        Maximum Pipe OD
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr
                        key={spec.model}
                        className={`
                  group
                  border-b border-[var(--border)]
                  transition-colors duration-200
                  last:border-b-0
                  hover:bg-[var(--primary)]/[0.06]
                  ${index % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--muted)]"}
                `}
                      >
                        {/* Model */}
                        <td className="px-6 py-5 sm:px-8">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />

                            <span className="text-base font-bold text-[var(--primary)] sm:text-lg">
                              {spec.model}
                            </span>
                          </div>
                        </td>

                        {/* Minimum OD */}
                        <td className="px-6 py-5 text-sm font-medium text-[var(--text-secondary)] sm:px-8 sm:text-base">
                          {spec.minPipeOD}
                        </td>

                        {/* Maximum OD */}
                        <td className="px-6 py-5 text-sm font-medium text-[var(--text-secondary)] sm:px-8 sm:text-base">
                          {spec.maxPipeOD}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =====================================================
        TABLE INFO
    ===================================================== */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1">
              <p className="text-xs text-[var(--text-light)] sm:text-sm">
                Configuration shown for typical PVC pipe extrusion requirements.
              </p>

              <a
                href="#enquire"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] sm:text-sm"
              >
                Request detailed specifications
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* =====================================================
        IMPORTANT NOTE
    ===================================================== */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--primary)]/25 bg-[var(--card)]">
              <div className="flex">
                {/* Accent */}
                <div className="w-1 shrink-0 bg-[var(--primary)]" />

                <div className="flex gap-4 p-5 sm:p-6">
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                    <Settings2 className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]">
                      Configuration Note
                    </h3>

                    <p className="mt-2 max-w-4xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                      These are typical PVC pipe configurations. Machine
                      specifications and configuration may vary depending on the
                      application, material formulation, required dimensions and
                      production capacity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY HPMC
        ========================================================= */}
        <section className="relative overflow-hidden bg-[var(--secondary)] px-5 py-20 text-white transition-colors duration-300 sm:px-8">
          {/* Background Effects */}
          <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[var(--primary)]/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

          {/* Subtle Grid Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
      `,
              backgroundSize: "45px 45px",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            {/* =====================================================
        LEFT CONTENT
    ===================================================== */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/25 bg-[var(--primary)]/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#78d660] sm:text-sm">
                  Why HPMC
                </p>
              </div>

              {/* Heading */}
              <h2 className="mt-6 max-w-xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[52px]">
                More Than a Machine.
                <span className="mt-1 block text-[#78d660]">
                  An Extrusion Partner.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Since 1972, Hindustan Plastic & Machine Corporation has been
                developing extrusion solutions for the plastics processing
                industry, combining decades of engineering experience with
                application-focused machine configurations.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                From understanding your material and production requirements to
                selecting a suitable extrusion configuration, our focus is on
                delivering dependable solutions built around your application.
              </p>

              {/* Small Stats */}
              <div className="mt-8 flex flex-wrap gap-8 border-y border-white/10 py-5">
                <div>
                  <p className="text-2xl font-bold text-[#78d660]">50+</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Years of experience
                  </p>
                </div>

                <div className="hidden w-px bg-white/10 sm:block" />

                <div>
                  <p className="text-2xl font-bold text-[#78d660]">
                    Since 1972
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Engineering excellence
                  </p>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#enquire"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(101,188,79,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_16px_35px_rgba(101,188,79,0.30)] sm:text-base"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* =====================================================
        RIGHT BENEFITS
    ===================================================== */}
            <div className="grid gap-4 sm:grid-cols-2">
              {whyHpmc.map((item, index) => (
                <div
                  key={item}
                  className="
            group relative overflow-hidden rounded-2xl
            border border-white/10
            bg-white/[0.05]
            p-5
            backdrop-blur-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[var(--primary)]/40
            hover:bg-white/[0.09]
            sm:p-6
          "
                >
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--primary)]/0 blur-3xl transition duration-500 group-hover:bg-[var(--primary)]/15" />

                  {/* Number */}
                  <span className="absolute right-5 top-5 text-[11px] font-bold tracking-[0.15em] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    {/* Check Icon */}
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]">
                      <Check className="h-5 w-5 text-[#78d660] transition group-hover:text-white" />
                    </span>

                    <p className="mt-5 max-w-[250px] text-sm font-semibold leading-6 text-slate-200 transition-colors group-hover:text-white sm:text-base sm:leading-7">
                      {item}
                    </p>

                    {/* Accent */}
                    <div className="mt-5 h-[2px] w-8 rounded-full bg-[var(--primary)]/40 transition-all duration-300 group-hover:w-14 group-hover:bg-[var(--primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            ENQUIRY FORM
        ========================================================= */}
        <section
          id="enquire"
          className="scroll-mt-20 relative overflow-hidden bg-[var(--muted)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8 lg:py-32"
        >
          {/* Background Effects */}
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            {/* =====================================================
        LEFT CONTENT
    ===================================================== */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)] sm:text-sm">
                  Discuss Your Requirement
                </p>
              </div>

              {/* Heading */}
              <h2 className="mt-6 max-w-xl text-3xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[52px]">
                Get the Right Extrusion Line
                <span className="mt-1 block text-[var(--primary)]">
                  for Your Application
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                Share your material, end product, required dimensions and target
                production capacity. Our team will help you identify a suitable
                HPMC Conical Twin Screw Extrusion Line for your manufacturing
                requirements.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  "Application-focused recommendations",
                  "Machine configuration assistance",
                  "Expert technical consultation",
                  "Fast response from the HPMC team",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <Check className="h-4 w-4 text-[var(--primary)]" />
                    </span>

                    <span className="text-sm font-semibold leading-5 text-[var(--text-primary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* =====================================================
          REQUIREMENT TIP
      ===================================================== */}
              <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--primary)]/25 bg-[var(--card)] shadow-sm">
                <div className="flex">
                  {/* Green Accent */}
                  <div className="w-1 shrink-0 bg-[var(--primary)]" />

                  <div className="flex gap-4 p-5 sm:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                      <Lightbulb className="h-5 w-5 text-[var(--primary)]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)] sm:text-base">
                        Help us recommend the right configuration
                      </p>

                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                        Include your raw material, final product, required size
                        range and expected production capacity in your enquiry
                        for a more relevant recommendation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--primary)]" />
                  Technical guidance
                </div>

                <span className="hidden h-4 w-px bg-[var(--border)] sm:block" />

                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--primary)]" />
                  Application-based solution
                </div>
              </div>
            </div>

            {/* =====================================================
        FORM
    ===================================================== */}
            <div className="relative">
              {/* Form Glow */}
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[var(--primary)]/10 blur-3xl" />

              {/* Form Wrapper */}
              <div className="relative">
                <LandingLeadForm product={productName} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}
