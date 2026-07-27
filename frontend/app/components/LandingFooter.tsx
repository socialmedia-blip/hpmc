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
            className="h-auto w-36 brightness-0 invert"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Engineering extrusion solutions for dependable, efficient plastic
            processing.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
          <a
            href="tel:919711956064"
            className="inline-flex items-center gap-2 text-slate-200 transition hover:text-[#83d86e]"
          >
            <Phone className="h-4 w-4" />
            +91 9711956064
          </a>
          <a
            href="mailto:admin@hindustanpalstics.com"
            className="inline-flex items-center gap-2 text-slate-200 transition hover:text-[#83d86e]"
          >
            <Mail className="h-4 w-4" />
            Email HPMC
          </a>
          <a
            href={`https://wa.me/919711956064?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[#83d86e] transition hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us
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
