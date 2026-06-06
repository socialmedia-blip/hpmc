"use client";
import Image from "next/image";

import Link from "next/link";

import { useEffect, useState } from "react";
import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScheduleDemoForm from "../components/LeadFormDemo";

export default function RequestDemo() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <ScheduleDemoForm />
      </div>
      <CTA />
      <ScrollToTop />
      <FloatingContact />
      <Footer />
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}
