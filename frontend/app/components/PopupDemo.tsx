"use client";

import { useEffect } from "react";
import ScheduleDemoForm from "./LeadFormDemo";

interface DemoPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoPopup({ open, onClose }: DemoPopupProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          overflow-hidden
          rounded-[32px]
          border
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-300
        "
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-primary)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            z-50
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            hover:rotate-90
          "
          style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
          }}
        >
          ✕
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-4 md:p-8">
            <ScheduleDemoForm />
          </div>
        </div>
      </div>
    </div>
  );
}
