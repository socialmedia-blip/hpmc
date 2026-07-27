import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Hello HPMC Team, I would like to know more about the Co-Rotating Twin Screw Extruder.",
);

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 lg:px-10">
        <Link href="/" aria-label="HPMC home" className="shrink-0">
          <Image
            src="/hp-logo.png"
            alt="HPMC"
            width={162}
            height={55}
            priority
            className="h-auto w-[112px] sm:w-[142px]"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`https://wa.me/919711956064?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#65BC4F]/45 px-3 py-2.5 text-sm font-bold text-[#438f32] transition hover:bg-[#65BC4F]/10 sm:px-4"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href="#enquire"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#65BC4F] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#4fa23a] sm:px-4"
          >
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}
