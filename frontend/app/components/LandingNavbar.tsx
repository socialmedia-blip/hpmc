import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./Theme-toggle";

const whatsappMessage = encodeURIComponent(
  "Hello HPMC Team, I’m interested in your extrusion solutions and would like to discuss my requirements. Please assist me with more details.",
);

export default function LandingNavbar() {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-[var(--border)]
        bg-[var(--background)]/95
        text-[var(--foreground)]
        shadow-sm
        backdrop-blur-xl
        transition-colors duration-300
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="HPMC home"
          className="shrink-0 rounded-lg transition-opacity hover:opacity-90"
        >
          <Image
            src="/hp-logo.png"
            alt="HPMC"
            width={162}
            height={55}
            priority
            className="h-auto w-[112px] sm:w-[142px]"
          />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language */}
          <div className="notranslate hidden sm:block">
            <LanguageSelector />
          </div>

          {/* Theme */}
          <ThemeToggle />

          {/* WhatsApp */}
          <a
            href={`https://wa.me/919711956064?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Contact HPMC on WhatsApp"
            className="
              group inline-flex items-center justify-center gap-2
              rounded-lg
              border border-[var(--primary)]/40
              bg-[var(--card)]
              px-3 py-2.5
              text-sm font-bold
              text-[var(--primary)]
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-[var(--primary)]
              hover:bg-[var(--primary)]/10
              hover:shadow-md
              sm:px-4
            "
          >
            <MessageCircle className="h-4 w-4 shrink-0" />

            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#enquire"
            className="
              group inline-flex items-center justify-center gap-2
              rounded-lg
              bg-[var(--primary)]
              px-3 py-2.5
              text-sm font-bold text-white
              shadow-[0_8px_24px_rgba(101,188,79,0.22)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:brightness-90
              hover:shadow-[0_10px_28px_rgba(101,188,79,0.30)]
              sm:px-4
            "
          >
            <Phone className="h-4 w-4 shrink-0" />

            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}
