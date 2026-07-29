import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleGauge,
  Layers3,
  Settings2,
} from "lucide-react";
import LandingLeadForm from "../../components/LandingLeadForm";
import LandingNavbar from "../../components/LandingNavbar";
import LandingFooter from "../../components/LandingFooter";

export const metadata: Metadata = {
  title: "Co-Rotating Twin Screw Extruder | HPMC",
  description:
    "High-performance co-rotating twin screw extruders for polymer compounding, masterbatch, reinforced composites and recycling.",
};

const productName = "Co-Rotating Twin Screw Extruder";

const applications = [
  "Direct and inline polymer compounding",
  "PVC soft cable-grade compounding",
  "Compression and injection moulding compounds",
  "Film and sheet extrusion",
  "Masterbatches, plastic alloys and natural fibre composites",
  "Plastic recycling and granulation",
];

const features = [
  "Building-block screw and barrel design, configured around your material and process.",
  "High-precision hardened gear teeth and an interlocking lubrication system for dependable gearbox operation.",
  "Single- or twin-screw feeder options for smooth, simple material feeding.",
  "Die-face cutter and vibratory sieve integration for a streamlined granulation line.",
];

const benefits = [
  {
    icon: CircleGauge,
    title: "Efficient output",
    text: "A longer L/D ratio helps achieve high production with optimised power consumption.",
  },
  {
    icon: Layers3,
    title: "Intensive mixing",
    text: "Built for demanding masterbatch, compounding and polymer-alloy formulations.",
  },
  {
    icon: Settings2,
    title: "Flexible formulation",
    text: "Fit up to three side feeders for fillers, glass fibre and performance additives.",
  },
];

const technicalSpecifications = [
  { label: "Screw Diameter (mm)", values: ["21.7", "30", "35.6", "50.5", "62.4", "71.2", "91"] },
  { label: "Rotary Speed (RPM) Max", values: ["600", "400", "600", "500/600", "400/500", "400/500", "400/500"] },
  { label: "Main Motor Power (kW)", values: ["4", "11", "11/15", "37/45", "55/75", "90/110", "220/250"] },
  { label: "L/D", values: ["32-40", "28-48", "32-48", "32-48", "32-48", "32-48", "32-40"] },
  { label: "Capacity (kg/h)", values: ["2-10", "5-30", "10-80", "20-150", "100-300", "300-600", "600-1000"] },
];

const models = ["20", "30", "35", "50", "65", "72", "92"];

export default function CoRotatingTwinScrewLandingPage() {
  return (
    <>
      <LandingNavbar />
      <main className="overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <section className="relative isolate overflow-hidden bg-[var(--landing-soft-bg)]">
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(circle_at_72%_42%,rgba(101,188,79,0.2),transparent_34%)]" />
          <div className="absolute -right-40 top-8 h-96 w-96 rounded-full border-[40px] border-[#65BC4F]/10" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-24 lg:pt-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#65BC4F]/25 bg-[var(--card)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-[#438f32]">
                <BadgeCheck className="h-4 w-4" /> Engineering excellence since
                1972
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[58px]">
                Co-Rotating Twin Screw{" "}
                <span className="text-[#579f42]">Extruder</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                Precision compounding for polymers, high-filler masterbatches,
                reinforced composites and recycling—engineered for consistent
                quality, robust mixing and productive operation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quick-enquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65BC4F] px-6 py-3.5 font-bold text-white transition hover:bg-[#4fa23a]"
                >
                  Get a custom solution <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#applications"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 font-bold text-[var(--text-primary)] transition hover:border-[#65BC4F] hover:text-[#438f32]"
                >
                  Explore applications
                </a>
              </div>
              <div className="mt-9 grid max-w-xl grid-cols-3 border-t border-[var(--border)] pt-6">
                {[
                  ["80%", "Talc loading"],
                  ["50%", "Glass fibre"],
                  ["3", "Side feeders"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-r border-[var(--border)] px-3 first:pl-0 last:border-0"
                  >
                    <p className="text-2xl font-bold text-[#438f32] sm:text-3xl">
                      {value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="quick-enquiry" className="w-full">
              <LandingLeadForm product={productName} className="relative mx-auto w-full max-w-xl border border-white/70" />
            </div>
          </div>
        </section>

        <section
          id="applications"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
        >
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#579f42]">
                Product overview
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Compounding capability that adapts to your process.
              </h2>
              <p className="mt-5 leading-8 text-[var(--text-secondary)]">
                HPMC co-rotating twin screw extruders combine controlled
                plasticisation, homogeneous dispersion, filling modification,
                enhancement, recovery and granulation in one adaptable platform.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {applications.map((application) => (
                <div
                  key={application}
                  className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[#65BC4F]/50 hover:shadow-lg hover:shadow-green-950/5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#65BC4F]/15 text-[#438f32]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="font-semibold leading-6 text-[var(--text-primary)]">
                    {application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--card)] py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#579f42]">
                Designed for reliability
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Configured around your formulation.
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-[var(--text-secondary)]">
                Every configuration is optimally adjusted to material properties
                and process requirements, while preserving the versatility to
                support future applications.
              </p>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#65BC4F] text-sm font-bold text-white">
                    0{index + 1}
                  </span>
                  <p className="leading-7 text-[var(--text-secondary)]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#579f42]">
              Performance benefits
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              More control for demanding compounds.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#65BC4F]/50 hover:shadow-xl hover:shadow-green-950/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#65BC4F]/15 text-[#438f32]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border border-[#65BC4F]/25 bg-[var(--landing-callout-bg)] p-7 text-center sm:p-10">
            <p className="text-xl font-bold leading-8 text-[var(--text-primary)] sm:text-2xl">
              HPMC introduces co-rotating twin screw extruders for the
              economical production of long-fibre reinforced components.
            </p>
            <p className="mt-3 text-[var(--text-secondary)]">
              Process polymers with up to 80% talc or 50% glass fibre in a
              single process.
            </p>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--muted)] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#579f42]">
                Technical specifications
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Configurations for every production scale.
              </h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                Select the model that suits your material, output and process requirements. Specifications are subject to final application configuration.
              </p>
            </div>
            <div className="mt-9 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
              <table className="min-w-[760px] w-full border-collapse text-center text-sm sm:text-base">
                <thead>
                  <tr className="bg-[var(--card)] text-[var(--text-primary)]">
                    <th scope="col" className="min-w-40 border-b border-r border-[var(--border)] px-4 py-5 font-bold">MODEL</th>
                    {models.map((model) => <th key={model} scope="col" className="border-b border-r border-[var(--border)] px-4 py-5 font-bold last:border-r-0">{model}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {technicalSpecifications.map((specification) => (
                    <tr key={specification.label} className="text-[var(--text-secondary)] even:bg-[var(--muted)]">
                      <th scope="row" className="border-b border-r border-[var(--border)] px-4 py-5 font-semibold leading-6 text-[var(--text-primary)] last:border-b-0">{specification.label}</th>
                      {specification.values.map((value, index) => <td key={`${specification.label}-${models[index]}`} className="border-b border-r border-[var(--border)] px-4 py-5 font-semibold last:border-r-0 last:border-b-0">{value}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          id="enquire"
          className="bg-[var(--landing-accent-bg)] px-5 py-16 sm:px-8 lg:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#579f42]">
                Plan your extrusion line
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Get a configuration built for your material.
              </h2>
              <p className="mt-5 leading-8 text-[var(--text-secondary)]">
                Share your resin, fillers, target output and end use. Our team
                will help define a co-rotating twin screw solution matched to
                your production goals.
              </p>
              <ul className="mt-7 space-y-3 text-[var(--text-primary)]">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#438f32]" />
                  Application-focused recommendations
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#438f32]" />
                  Expert technical consultation
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#438f32]" />
                  Fast response from the HPMC team
                </li>
              </ul>
            </div>
            <LandingLeadForm product={productName} />
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
