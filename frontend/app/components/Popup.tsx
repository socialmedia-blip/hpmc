"use client";

import { useEffect } from "react";
import Image from "next/image";
import LeadForm from "./LeadForm";

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PopupForm({
  open,
  onClose,
  onSuccess,
}: PopupFormProps) {
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl border shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        style={{
          background: "var(--card)",
          color: "var(--card-foreground)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-primary)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{
            background: "var(--card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          }}
        >
          ✕
        </button>

        <div className="grid max-h-[90vh] grid-cols-1 overflow-y-auto">
          {/* Right Side */}
          <div
            className="p-3 md:p-5"
            style={{
              background: "var(--card)",
              color: "var(--card-foreground)",
            }}
          >
            <LeadForm onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
