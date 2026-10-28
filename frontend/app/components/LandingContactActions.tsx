import { MessageCircle, Phone } from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Hello HPMC Team, I’m interested in your extrusion solutions and would like to discuss my requirements. Please assist me with more details.",
);

const whatsappHref = `https://wa.me/919560596392?text=${whatsappMessage}`;
const phoneHref = "tel:+919560596392";

type LandingContactActionsProps = {
  className?: string;
  compact?: boolean;
  prominent?: boolean;
};

export default function LandingContactActions({
  className = "",
  compact = false,
  prominent = false,
}: LandingContactActionsProps) {
  return (
    <div
      className={`flex flex-wrap gap-3 ${prominent ? "sm:flex-nowrap" : ""} ${className}`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with HPMC on WhatsApp"
        className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] font-bold text-white transition hover:bg-[#1da851] ${prominent ? "min-w-[170px] flex-1 rounded-2xl px-5 py-4 shadow-[0_12px_24px_rgba(37,211,102,0.2)] hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(37,211,102,0.28)]" : compact ? "px-3 py-2 text-sm" : "px-5 py-3.5"}`}
      >
        <span
          className={
            prominent
              ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/20"
              : ""
          }
        >
          <MessageCircle className="h-4 w-4" />
        </span>
        <span className={compact ? "hidden sm:inline" : ""}>WhatsApp</span>
      </a>
      <a
        href={phoneHref}
        aria-label="Call HPMC"
        className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-(--primary) font-bold text-white transition hover:opacity-90 ${prominent ? "min-w-[170px] flex-1 rounded-2xl px-5 py-4 shadow-[0_12px_24px_rgba(101,188,79,0.2)] hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(101,188,79,0.28)]" : compact ? "px-3 py-2 text-sm" : "px-5 py-3.5"}`}
      >
        <span
          className={
            prominent
              ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/20"
              : ""
          }
        >
          <Phone className="h-4 w-4" />
        </span>
        <span className={compact ? "hidden sm:inline" : ""}>Call us</span>
      </a>
    </div>
  );
}
