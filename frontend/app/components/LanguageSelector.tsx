"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

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

  const currentLanguage =
    languages.find((l) => l.code === lang) || languages[0];

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
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          h-11
          min-w-[90px]
          items-center
          justify-between
          gap-2
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--card)]
          px-3
          text-sm
          font-medium
          text-[var(--text-primary)]
          shadow-sm
          transition-all
          duration-300
          hover:border-[var(--primary)]
          hover:shadow-lg
        "
      >
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[var(--primary)]" />

          <span>{currentLanguage.label}</span>
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-14
            z-50
            w-64
            overflow-hidden
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            shadow-[0_20px_60px_rgba(0,0,0,.18)]
          "
        >
          {/* Header */}
          <div className="border-b border-[var(--border)] p-4">
            <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              Current Language
            </p>

            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10">
                <Globe size={18} className="text-[var(--primary)]" />
              </div>

              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {currentLanguage.title}
                </p>

                <p className="text-xs text-[var(--text-secondary)]">
                  {currentLanguage.label}
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="max-h-[380px] overflow-y-auto py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setOpen(false);
                }}
                className={`
                  mx-2
                  flex
                  w-[calc(100%-16px)]
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-3
                  transition-all
                  duration-200
                  ${
                    lang === language.code
                      ? "bg-[var(--primary)]/10"
                      : "hover:bg-[var(--muted)]"
                  }
                `}
              >
                <div className="text-left">
                  <p
                    className={`font-medium ${
                      lang === language.code
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {language.title}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)]">
                    {language.label}
                  </p>
                </div>

                {lang === language.code && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Check size={15} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
