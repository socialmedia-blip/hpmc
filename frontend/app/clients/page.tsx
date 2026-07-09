"use client";

import Image from "next/image";
import { Building2, Globe2, Handshake, Award } from "lucide-react";

import CTA from "../components/CTA";
import FloatingContact from "../components/FloatingButton";
import PopupForm from "../components/Popup";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useState } from "react";

interface Client {
  _id: string;
  name: string;
  image: string;
}

export default function Clients() {
  const [openPopup, setOpenPopup] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_BASE}/client`);

        const data = await res.json();
        console.log(data);

        setClients(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="bg-[var(--background)]">
      <Navbar />

      {/* CLIENT LOGO WALL */}
      <section className="mt-24 pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--primary)]">
              Companies That Trust Us
            </h2>

            <p className="mt-4 text-[var(--text-secondary)]">
              Building long-term partnerships through quality and reliability.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[190px] animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--card)]"
                >
                  <div className="flex h-full items-center justify-center">
                    <div className="h-20 w-36 rounded-xl bg-[var(--background-secondary)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : clients.length ? (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
              {clients.map((client) => (
                <div
                  key={client._id}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[var(--shadow-primary)]"
                >
                  <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent" />
                  </div>

                  <div className="relative flex h-[170px] items-center justify-center">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      sizes="(max-width:768px) 100vw,25vw"
                      className="object-contain p-5 transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--card)] py-24 text-center">
              <Building2
                size={60}
                className="mx-auto text-[var(--text-secondary)]"
              />

              <h3 className="mt-6 text-2xl font-semibold">
                No Clients Available
              </h3>

              <p className="mt-3 text-[var(--text-secondary)]">
                Clients will appear here once added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* TRUST MESSAGE */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[32px] p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Built On Trust & Long-Term Relationships
            </h2>

            <p className="mt-6 text-[var(--text-secondary)] leading-8">
              Many of our customers continue to partner with us for multiple
              projects, capacity expansions, and new production lines. Their
              continued trust reflects our commitment to quality, innovation,
              and dependable technical support.
            </p>
          </div>
        </div>
      </section>

      <CTA />
      <ScrollToTop />
      <FloatingContact />
      <Footer />
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}
