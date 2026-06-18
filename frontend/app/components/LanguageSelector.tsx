"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN", title: "English" },
  { code: "hi", label: "HI", title: "Hindi" },
  { code: "bn", label: "BN", title: "Bengali" },
  { code: "te", label: "TE", title: "Telugu" },
  { code: "mr", label: "MR", title: "Marathi" },
  { code: "ta", label: "TA", title: "Tamil" },
  { code: "ur", label: "UR", title: "Urdu" },
  { code: "gu", label: "GU", title: "Gujarati" },
  { code: "kn", label: "KN", title: "Kannada" },
  { code: "ml", label: "ML", title: "Malayalam" },
  { code: "pa", label: "PA", title: "Punjabi" },
  { code: "or", label: "OR", title: "Odia" },
  { code: "as", label: "AS", title: "Assamese" },

  { code: "ar", label: "AR", title: "Arabic" },
  { code: "fa", label: "FA", title: "Persian (Farsi)" },
  { code: "tr", label: "TR", title: "Turkish" },

  { code: "fr", label: "FR", title: "French" },
  { code: "de", label: "DE", title: "German" },
  { code: "es", label: "ES", title: "Spanish" },
  { code: "it", label: "IT", title: "Italian" },
  { code: "pt", label: "PT", title: "Portuguese" },
  { code: "ru", label: "RU", title: "Russian" },
  { code: "nl", label: "NL", title: "Dutch" },
  { code: "pl", label: "PL", title: "Polish" },

  { code: "zh-CN", label: "ZH", title: "Chinese (Simplified)" },
  { code: "zh-TW", label: "ZT", title: "Chinese (Traditional)" },
  { code: "ja", label: "JA", title: "Japanese" },
  { code: "ko", label: "KO", title: "Korean" },

  { code: "id", label: "ID", title: "Indonesian" },
  { code: "th", label: "TH", title: "Thai" },
  { code: "vi", label: "VI", title: "Vietnamese" },
  { code: "ms", label: "MS", title: "Malay" },

  { code: "sw", label: "SW", title: "Swahili" },
  { code: "af", label: "AF", title: "Afrikaans" },
  { code: "am", label: "AM", title: "Amharic" },

  { code: "uk", label: "UK", title: "Ukrainian" },
  { code: "he", label: "HE", title: "Hebrew" },
];

export default function LanguageSelector() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (selectedLang: string) => {
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);

    if (selectedLang === "en") {
      document.cookie =
        "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      window.location.hash = "";
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${selectedLang};path=/`;
    window.location.hash = `#googtrans=en/${selectedLang}`;

    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
      flex h-10 w-14 items-center justify-center
      rounded-full
      bg-[var(--card)]
      text-[var(--text-primary)]
      border border-[var(--border)]
      shadow-sm
      transition-all duration-200
      hover:bg-[var(--muted)]
    "
      >
        <Globe size={16} />
      </button>

      {open && (
        <div
          className="
        absolute left-0 top-14 z-50
        w-48 overflow-hidden
        
        border border-[var(--border)]
        bg-[var(--card)]
        shadow-2xl
      "
        >
          <div className="max-h-[580px] md:max-h-96 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                title={language.title}
                onClick={() => {
                  changeLanguage(language.code);
                  setOpen(false);
                }}
                className={`
              flex w-full items-center justify-between
              px-4 py-1 text-left
              transition-colors duration-200
              hover:bg-[var(--muted)]
              ${lang === language.code ? "bg-[var(--muted)]" : ""}
            `}
              >
                <span
                  className={`
                text-sm
                ${
                  lang === language.code
                    ? "text-[var(--primary)] font-semibold"
                    : "text-[var(--text-primary)]"
                }
              `}
                >
                  {language.title}
                </span>

                {lang === language.code && (
                  <span className="text-[var(--primary)] text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
