import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Check,
  ChevronRight,
  CircleGauge,
  Factory,
  Gauge,
  Headphones,
  Layers3,
  Lightbulb,
  PackageCheck,
  Recycle,
  RefreshCw,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Wind,
  Wrench,
} from "lucide-react";

import LandingLeadForm from "../../components/LandingLeadForm";
import LandingNavbar from "../../components/LandingNavbar";
import LandingFooter from "../../components/LandingFooter";

export const metadata: Metadata = {
  title: "Single Screw Vented Extruder for Recycling | HPMC",
  description:
    "HPMC Single Screw Vented Extruder for Recycling is designed for efficient reprocessing of reclaimed thermoplastics with effective degassing, reliable plasticization and production capacities up to 500 kg/hr.",
};

const productName = "Single screw vented extruder for recycling";

const specifications = [
  {
    specification: "Production (Kg/Hr)",
    extruder90: "80-100",
    extruder100: "125-150",
    extruder110: "150-175 / 200-225",
    extruder120: "200-220 / 250-300",
    extruder130: "300-350",
    extruder140: "350-400",
    extruder150: "400-500",
  },
  {
    specification: "Screw Diameter (mm)",
    extruder90: "90",
    extruder100: "100",
    extruder110: "110",
    extruder120: "120",
    extruder130: "130",
    extruder140: "140",
    extruder150: "150",
  },
  {
    specification: "Main Motor (kW)",
    extruder90: "22.5",
    extruder100: "30",
    extruder110: "37 / 55",
    extruder120: "55 / 75",
    extruder130: "75",
    extruder140: "90",
    extruder150: "110",
  },
  {
    specification: "Heating Load (kW)",
    extruder90: "15",
    extruder100: "18",
    extruder110: "22",
    extruder120: "32",
    extruder130: "-",
    extruder140: "-",
    extruder150: "40",
  },
  {
    specification: "Hydraulic Screen Changer (Inch/HP)",
    extruder90: "8/3",
    extruder100: "8/3",
    extruder110: "8/3",
    extruder120: "10/5",
    extruder130: "-",
    extruder140: "-",
    extruder150: "10/5",
  },
  {
    specification: "L/D Ratio",
    extruder90: "33:1",
    extruder100: "33:1",
    extruder110: "33:1",
    extruder120: "30:1",
    extruder130: "-",
    extruder140: "-",
    extruder150: "30:1",
  },
  {
    specification: "Heating Zones",
    extruder90: "6",
    extruder100: "7",
    extruder110: "10",
    extruder120: "10",
    extruder130: "-",
    extruder140: "-",
    extruder150: "14",
  },
  {
    specification: "Rotating Speed (RPM)",
    extruder90: "50-70",
    extruder100: "50-70",
    extruder110: "50-70",
    extruder120: "50-70",
    extruder130: "50-70",
    extruder140: "50-70",
    extruder150: "50-70",
  },
];

export default function ConicalTwinScrewExtrusionLine() {
  return (
    <>
      <LandingNavbar />

      <main className="overflow-hidden ">
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative isolate min-h-[720px] overflow-hidden  lg:min-h-[760px]">
          {/* =====================================================
      FULL HERO BACKGROUND IMAGE
  ===================================================== */}

          {/* 
    Main readability overlay:
    Strong white on left where content sits,
    gradually transparent towards machine on right.
  */}

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
                Single Screw Vented
                <span className="mt-1 block text-[#579f42]">
                  Extruder for Recycling
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-[610px] text-base leading-8 text-slate-600 sm:text-lg lg:text-[19px]">
                Engineered for efficient plastic reprocessing with effective
                removal of moisture and volatile gases, reliable plasticization
                and consistent processing of reclaimed thermoplastic materials.
              </p>

              {/* Small Trust Points */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Efficient Degassing",
                  "Reclaimed Material Processing",
                  "Reliable Plasticization",
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
                      value: "1500",
                      label: "kg/hr Max. Output",
                    },
                    {
                      value: "5",
                      label: "Machine Models",
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
                      <p className="text-2xl font-bold leading-none text-[#438f32] sm:text-3xl">
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
                  HPMC Recycling Technology
                </p>

                <p className="mt-0.5 text-xs font-semibold text-slate-700">
                  Engineered for efficient reclaimed material processing
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
          className="relative overflow-hidden bg-[var(--background)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8"
        >
          {/* Background Decoration */}
          <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
              {/* =====================================================
          IMAGE SIDE
      ===================================================== */}
              {/* IMAGE SIDE */}
              <div className="relative order-2 lg:order-1">
                {/* Background Glow */}
                <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />
                <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />

                {/* MAIN IMAGE */}
                <div className="group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-primary)] sm:p-7">
                  {/* Green Gradient */}
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

                  <div className="relative flex min-h-[330px] items-center justify-center sm:min-h-[390px]">
                    <Image
                      src="/products/lvented1.png"
                      alt="HPMC Single Screw Vented Extruder"
                      width={700}
                      height={500}
                      className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-5 left-5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 px-4 py-3 shadow-lg backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                      HPMC Recycling Technology
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-[var(--text-primary)]">
                      Single Screw Vented Extruder
                    </p>
                  </div>
                </div>

                {/* SECOND IMAGE */}
                <div className="mt-4 grid grid-cols-[1.25fr_0.75fr] gap-4">
                  <div className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.06] to-transparent" />

                    <div className="relative flex h-[190px] items-center justify-center">
                      <Image
                        src="/products/lvented2.png"
                        alt="HPMC Vented Extruder Recycling Machine"
                        width={500}
                        height={350}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Small info block */}
                  <div className="flex flex-col justify-between rounded-[1.5rem] border border-[var(--primary)]/20 bg-[var(--primary)]/[0.06] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Factory className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-lg font-bold text-[var(--text-primary)]">
                        Industrial
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                        Built for reliable plastic reprocessing.
                      </p>
                    </div>
                  </div>
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
                  Efficient Plastic Reprocessing
                  <span className="mt-1 block text-[var(--primary)]">
                    with Advanced Venting
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  HPMC Single Screw Vented Extruders are designed for efficient
                  reprocessing of reclaimed thermoplastic materials. The vented
                  barrel configuration helps remove trapped moisture and
                  volatile gases during processing, supporting cleaner and more
                  consistent recycled material.
                </p>

                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  Engineered for reliable plasticization and controlled material
                  flow, the system can be configured according to the material
                  being processed, required production output and recycling
                  requirements.
                </p>

                {/* =================================================
            PROCESSING HIGHLIGHTS
        ================================================= */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Moisture & Volatile Removal",
                    "Reliable Plasticization",
                    "Reclaimed Plastic Processing",
                    "Consistent Material Output",
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
            TRUST / PRODUCT STATS
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
                      1500
                    </p>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      kg/hr max. output
                    </p>
                  </div>

                  <div className="hidden h-9 w-px bg-[var(--border)] sm:block" />

                  <div>
                    <p className="text-xl font-bold text-[var(--primary)]">5</p>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      Machine models
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
                    href="#specifications"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-7 py-3.5 text-sm font-bold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--primary)]/60 hover:text-[var(--primary)] sm:text-base"
                  >
                    View Specifications
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FEATURES & BENEFITS
        ========================================================= */}

        <section
          id="features"
          className="relative overflow-hidden bg-[var(--muted)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8 lg:py-28"
        >
          {/* Background Decoration */}
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl">
            {/* =====================================================
        SECTION HEADING
    ===================================================== */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)] sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                Key Features & Benefits
              </span>

              <h2 className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[48px]">
                Designed for Efficient
                <span className="mt-1 block text-[var(--primary)]">
                  Plastic Reprocessing
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                HPMC vented extrusion systems combine controlled material
                processing, effective venting and robust machine construction to
                support reliable recycling production.
              </p>
            </div>

            {/* =====================================================
        FEATURE CARDS
    ===================================================== */}
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Wind,
                  number: "01",
                  title: "Effective Venting & Degassing",
                  description:
                    "The vented barrel configuration helps release trapped moisture and volatile gases from the material during extrusion.",
                  benefit:
                    "Supports cleaner and more consistent reprocessed material",
                },
                {
                  icon: Settings2,
                  number: "02",
                  title: "Reliable Plasticization",
                  description:
                    "Optimized screw and barrel processing helps achieve controlled melting and uniform plasticization of reclaimed thermoplastics.",
                  benefit: "Improves processing consistency during production",
                },
                {
                  icon: RefreshCw,
                  number: "03",
                  title: "Reclaimed Material Processing",
                  description:
                    "Designed specifically for plastic reprocessing applications where reclaimed thermoplastic material needs to be processed efficiently.",
                  benefit: "Suitable for a range of recycling requirements",
                },
                {
                  icon: CircleGauge,
                  number: "04",
                  title: "Controlled Processing",
                  description:
                    "Multiple heating zones and process controls help maintain suitable operating conditions throughout the extrusion process.",
                  benefit: "Better control over production parameters",
                },
                {
                  icon: Factory,
                  number: "05",
                  title: "Industrial Construction",
                  description:
                    "Robust machine construction is designed to support demanding recycling operations and regular industrial production.",
                  benefit: "Dependable performance for continuous operation",
                },
                {
                  icon: SlidersHorizontal,
                  number: "06",
                  title: "Multiple Configurations",
                  description:
                    "Available machine configurations allow the system to be selected according to material type, processing needs and required output.",
                  benefit: "A solution matched to your production requirement",
                },
              ].map(({ icon: Icon, number, title, description, benefit }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-primary)] sm:p-7"
                >
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--primary)]/0 blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/10" />

                  {/* Feature Number */}
                  <span className="absolute right-6 top-5 text-4xl font-bold leading-none text-[var(--primary)]/[0.08] transition-colors duration-300 group-hover:text-[var(--primary)]/[0.14]">
                    {number}
                  </span>

                  <div className="relative">
                    {/* Icon */}
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-xl font-bold leading-snug text-[var(--text-primary)]">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      {description}
                    </p>

                    {/* Benefit */}
                    <div className="mt-5 border-t border-[var(--border)] pt-4">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">
                          <Check className="h-3 w-3 text-[var(--primary)]" />
                        </span>

                        <p className="text-xs font-semibold leading-5 text-[var(--text-primary)] sm:text-sm">
                          {benefit}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="mt-5 h-[2px] w-10 rounded-full bg-[var(--primary)]/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[var(--primary)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* =====================================================
        BOTTOM CTA
    ===================================================== */}
            <div className="mt-12 flex flex-col items-center text-center">
              <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                Machine configuration can be selected according to your raw
                material, required output and plastic reprocessing requirements.
              </p>

              <a
                href="#enquire"
                className="group mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(101,188,79,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_14px_32px_rgba(101,188,79,0.30)] sm:text-base"
              >
                Discuss Your Recycling Requirement
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            Materials & Processing
        ========================================================= */}

        <section
          id="materials"
          className="relative overflow-hidden bg-[var(--background)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8 lg:py-28"
        >
          {/* Background Effects */}
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl">
            {/* =====================================================
        SECTION HEADER
    ===================================================== */}
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)] sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                  Materials & Processing
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[48px]">
                  Built to Process a Wide Range of
                  <span className="mt-1 block text-[var(--primary)]">
                    Reclaimed Thermoplastics
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  HPMC Single Screw Vented Extruders can be configured for
                  reprocessing different thermoplastic materials, with machine
                  selection based on material characteristics, processing
                  conditions and required production output.
                </p>
              </div>

              {/* Small Info */}
              <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.06] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Recycle className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="font-bold text-[var(--text-primary)]">
                      Material-specific configuration
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      Final machine configuration depends on the material,
                      formulation, condition and expected production capacity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
        MATERIAL CARDS
    ===================================================== */}
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {/* Polyolefins */}
              <div className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-primary)] sm:p-7">
                <span className="absolute right-5 top-4 text-5xl font-bold text-[var(--primary)]/[0.06]">
                  01
                </span>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                    Common Recycling Materials
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                    Polyolefins
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Suitable configurations for commonly reprocessed polyolefin
                    materials used across a wide range of plastic products.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["PP", "PE", "LDPE", "HDPE"].map((material) => (
                      <span
                        key={material}
                        className="rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/[0.07] px-4 py-2 text-sm font-bold text-[var(--primary)]"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Styrenic Plastics */}
              <div className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-primary)] sm:p-7">
                <span className="absolute right-5 top-4 text-5xl font-bold text-[var(--primary)]/[0.06]">
                  02
                </span>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                    <Boxes className="h-5 w-5" />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                    Reprocessing Materials
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                    Styrenic Plastics
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Vented extrusion supports controlled reprocessing of
                    styrenic thermoplastics where consistent melting and
                    material handling are important.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["HIPS", "PS", "ABS"].map((material) => (
                      <span
                        key={material}
                        className="rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/[0.07] px-4 py-2 text-sm font-bold text-[var(--primary)]"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engineering Plastics */}
              <div className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-primary)] sm:p-7">
                <span className="absolute right-5 top-4 text-5xl font-bold text-[var(--primary)]/[0.06]">
                  03
                </span>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                    <Settings2 className="h-5 w-5" />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                    Specialized Processing
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                    Engineering Plastics
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Configurations can also support selected engineering
                    thermoplastics based on their processing characteristics and
                    production requirements.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["PMMA", "PC", "PA"].map((material) => (
                      <span
                        key={material}
                        className="rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/[0.07] px-4 py-2 text-sm font-bold text-[var(--primary)]"
                      >
                        {material}
                      </span>
                    ))}

                    <span className="rounded-lg border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">
                      Other Engineering Plastics
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
        PROCESSING BENEFIT STRIP
    ===================================================== */}
            <div className="mt-6 grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] md:grid-cols-3">
              {[
                {
                  title: "Material",
                  text: "Reclaimed thermoplastics",
                },
                {
                  title: "Processing",
                  text: "Venting & plasticization",
                },
                {
                  title: "Configuration",
                  text: "Selected for required output",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`p-5 sm:p-6 ${
                    index !== 0
                      ? "border-t border-[var(--border)] md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* =====================================================
        CTA
    ===================================================== */}
            <div className="mt-10 flex flex-col items-center text-center">
              <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                Processing a different material or unsure which machine
                configuration you need? Share your material and target output
                with our team.
              </p>

              <a
                href="#enquire"
                className="group mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(101,188,79,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_14px_32px_rgba(101,188,79,0.30)] sm:text-base"
              >
                Discuss Your Material
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="specifications"
          className="relative overflow-hidden bg-[var(--muted)] px-5 py-20 text-[var(--foreground)] transition-colors duration-300 sm:px-8 lg:py-28"
        >
          {/* Background */}
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl">
            {/* =====================================================
        HEADER
    ===================================================== */}
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)] sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                  Technical Specifications
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[48px]">
                  Select the Right Extruder
                  <span className="mt-1 block text-[var(--primary)]">
                    for Your Production
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  HPMC Single Screw Vented Extruders are available in multiple
                  configurations to support different processing capacities and
                  recycling requirements.
                </p>
              </div>

              <a
                href="#enquire"
                className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--primary)] sm:text-base"
              >
                Need help selecting a model?
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* =====================================================
        TABLE
    ===================================================== */}
            <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-primary)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse text-left">
                  {/* TABLE HEAD */}
                  <thead>
                    <tr className="bg-[var(--primary)] text-white">
                      <th className="w-[250px] px-6 py-5 text-sm font-bold uppercase tracking-[0.06em]">
                        Machine Models
                      </th>

                      {[
                        "Extruder 90",
                        "Extruder 100",
                        "Extruder 110",
                        "Extruder 120",
                        "Extruder 130",
                        "Extruder 140",
                        "Extruder 150",
                      ].map((model) => (
                        <th
                          key={model}
                          className="border-l border-white/15 px-5 py-5 text-center text-sm font-bold uppercase tracking-[0.04em]"
                        >
                          {model}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr
                        key={spec.specification}
                        className={`border-b border-[var(--border)] transition-colors duration-200 last:border-b-0 hover:bg-[var(--primary)]/[0.06] ${
                          index % 2 === 0
                            ? "bg-[var(--card)]"
                            : "bg-[var(--muted)]"
                        }`}
                      >
                        <td className="px-6 py-5 text-sm font-bold leading-6 text-[var(--text-primary)]">
                          {spec.specification}
                        </td>

                        {[
                          spec.extruder90,
                          spec.extruder100,
                          spec.extruder110,
                          spec.extruder120,
                          spec.extruder130,
                          spec.extruder140,
                          spec.extruder150,
                        ].map((value, valueIndex) => (
                          <td
                            key={valueIndex}
                            className="border-l border-[var(--border)] px-5 py-5 text-center text-sm font-medium text-[var(--text-secondary)] sm:text-base"
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

            {/* Mobile Scroll Message */}
            <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-secondary)] lg:hidden">
              <ChevronRight className="h-4 w-4 text-[var(--primary)]" />
              Swipe horizontally to compare all machine models
            </div>

            {/* =====================================================
        BOTTOM INFO
    ===================================================== */}
            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.06] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                    <Settings2 className="h-4 w-4 text-[var(--primary)]" />
                  </span>

                  <div>
                    <p className="font-bold text-[var(--text-primary)]">
                      Configuration depends on your application
                    </p>

                    <p className="mt-1.5 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                      Final machine configuration and production capacity may
                      vary depending on the material being processed,
                      formulation and operating conditions.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#enquire"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(101,188,79,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] sm:text-base"
              >
                Get Machine Recommendation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY HPMC
        ========================================================= */}
        <section
          id="why-hpmc"
          className="relative overflow-hidden bg-[var(--secondary)] px-5 py-20 text-white sm:px-8 lg:py-28"
        >
          {/* Background Effects */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/[0.06] blur-[120px]" />

          {/* Grid Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
              {/* =====================================================
          LEFT CONTENT
      ===================================================== */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8cdd78] sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                  Why Choose HPMC
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[50px]">
                  Engineering Experience
                  <span className="mt-1 block text-[#78d660]">
                    Behind Every Solution
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                  Since 1972, Hindustan Plastic & Machine Corporation has been
                  developing extrusion machinery for the plastics processing
                  industry, combining decades of engineering experience with
                  practical, application-focused machine solutions.
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  From understanding your raw material and production
                  requirement to selecting a suitable machine configuration, our
                  approach is focused on helping manufacturers build reliable
                  and efficient processing operations.
                </p>

                {/* Experience */}
                <div className="mt-8 flex items-center gap-5 border-t border-white/10 pt-7">
                  <div>
                    <p className="text-4xl font-bold leading-none text-[#78d660] sm:text-5xl">
                      50+
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                      Years of Experience
                    </p>
                  </div>

                  <div className="h-14 w-px bg-white/10" />

                  <p className="max-w-[250px] text-sm leading-6 text-slate-400">
                    Decades of experience in plastic extrusion machinery and
                    processing applications.
                  </p>
                </div>

                <a
                  href="#enquire"
                  className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(101,188,79,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#55a940] hover:shadow-[0_16px_35px_rgba(101,188,79,0.28)] sm:text-base"
                >
                  Discuss Your Requirement
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* =====================================================
          RIGHT FEATURES
      ===================================================== */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Award,
                    number: "01",
                    title: "Established Since 1972",
                    description:
                      "More than five decades of experience in designing and developing extrusion machinery for plastic processing applications.",
                  },
                  {
                    icon: Settings2,
                    number: "02",
                    title: "Application-Focused Engineering",
                    description:
                      "Machine configurations are selected around your material, processing conditions, required output and production objectives.",
                  },
                  {
                    icon: Factory,
                    number: "03",
                    title: "Industrial Machine Design",
                    description:
                      "Extrusion systems engineered for practical manufacturing environments with focus on dependable processing and operation.",
                  },
                  {
                    icon: SlidersHorizontal,
                    number: "04",
                    title: "Multiple Configurations",
                    description:
                      "A range of extruder models and configurations helps manufacturers select equipment suited to different production capacities.",
                  },
                  {
                    icon: Wrench,
                    number: "05",
                    title: "Technical Guidance",
                    description:
                      "Our team works with customers to understand their processing requirements and identify an appropriate extrusion solution.",
                  },
                  {
                    icon: Headphones,
                    number: "06",
                    title: "Customer Support",
                    description:
                      "Technical assistance and support help customers operate and maintain their extrusion systems effectively.",
                  },
                ].map(({ icon: Icon, number, title, description }) => (
                  <div
                    key={title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/35 hover:bg-white/[0.09]"
                  >
                    {/* Number */}
                    <span className="absolute right-5 top-4 text-4xl font-bold text-white/[0.05] transition-colors duration-300 group-hover:text-[var(--primary)]/10">
                      {number}
                    </span>

                    {/* Icon */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[#78d660] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                      {description}
                    </p>

                    <div className="mt-5 h-[2px] w-8 rounded-full bg-[var(--primary)]/40 transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--primary)]" />
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================
        BOTTOM TRUST STRIP
    ===================================================== */}
            <div className="mt-14 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  value: "1972",
                  label: "Established",
                },
                {
                  value: "50+",
                  label: "Years Experience",
                },
                {
                  value: "5",
                  label: "Vented Extruder Models",
                },
                {
                  value: "500",
                  label: "kg/hr Max. Listed Output",
                },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`px-6 py-6 text-center ${
                    index !== 0
                      ? "border-t border-white/10 sm:border-l sm:border-t-0"
                      : ""
                  } ${
                    index === 2
                      ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0"
                      : ""
                  }`}
                >
                  <p className="text-2xl font-bold text-[#78d660] sm:text-3xl">
                    {item.value}
                  </p>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {item.label}
                  </p>
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
                Find the Right Vented Extruder
                <span className="mt-1 block text-[var(--primary)]">
                  for Your Recycling Process
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                Share your raw material, processing requirement and target
                production capacity. Our team will help you identify a suitable
                HPMC Single Screw Vented Extruder configuration for your plastic
                reprocessing requirements.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  "Material-specific recommendations",
                  "Extruder model selection assistance",
                  "Processing & configuration guidance",
                  "Technical consultation from HPMC",
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
                        Mention the type of plastic material you want to
                        reprocess, its condition, your current recycling process
                        and expected production capacity for a more relevant
                        machine recommendation.
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
