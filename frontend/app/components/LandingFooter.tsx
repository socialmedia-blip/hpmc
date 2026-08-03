import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Hello HPMC Team, I’m interested in your extrusion solutions and would like to discuss my requirements. Please assist me with more details.",
);

export default function LandingFooter() {
  return (
    <footer className="bg-[#0B1220] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <Image
            src="/hp-logo.png"
            alt="HPMC"
            width={162}
            height={55}
            className="h-auto w-36"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Engineering extrusion solutions for dependable, efficient plastic
            processing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Call */}
          <a
            href="tel:+919711956064"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:border-[#83d86e] hover:bg-[#83d86e]/10 hover:text-[#83d86e]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#83d86e]/15 text-[#83d86e] transition group-hover:bg-[#83d86e] group-hover:text-white">
              <Phone className="h-5 w-5" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-slate-400">Call Us</span>
              <span>+91 97119 56064</span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:admin@hindustanplastics.com"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:border-[#83d86e] hover:bg-[#83d86e]/10 hover:text-[#83d86e]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#83d86e]/15 text-[#83d86e] transition group-hover:bg-[#83d86e] group-hover:text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-slate-400">Email</span>
              <span>admin@hindustanplastics.com</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/919711956064?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-white/80">Quick Chat</span>
              <span>WhatsApp Us</span>
            </div>
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Hindustan Plastics &amp; Machine
        Corporation. All rights reserved.
      </div>
    </footer>
  );
}
