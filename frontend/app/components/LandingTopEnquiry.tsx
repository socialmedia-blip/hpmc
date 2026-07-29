import { CheckCircle2 } from "lucide-react";
import LandingLeadForm from "./LandingLeadForm";

type LandingTopEnquiryProps = {
  product: string;
};

export default function LandingTopEnquiry({ product }: LandingTopEnquiryProps) {
  return (
    <section
      id="quick-enquiry"
      className="relative overflow-hidden border-y border-[#65BC4F]/20 bg-[var(--landing-accent-bg)] px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
    >
      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#65BC4F]/15 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#65BC4F]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#579f42]">
            Quick enquiry
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
            Get expert guidance for your production line.
          </h2>
          <p className="mt-5 leading-8 text-[var(--text-secondary)]">
            Tell us about your material, application and required output. Our
            extrusion specialists will help you select the right {product} configuration.
          </p>
          <ul className="mt-7 space-y-3 text-[var(--text-primary)]">
            {[
              "Application-focused machine recommendation",
              "Technical guidance from the HPMC team",
              "Fast response to your verified enquiry",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#579f42]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <LandingLeadForm product={product} className="border border-white/70" />
      </div>
    </section>
  );
}
