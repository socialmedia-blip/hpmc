"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const clients = [
  "/clients/client (1).jpg",
  "/clients/client (2).jpg",
  "/clients/client (3).jpg",
  "/clients/client (4).jpg",
  "/clients/client (5).jpg",
  "/clients/client (6).jpg",
  "/clients/client (8).jpg",
];

export default function Clients() {
  return (
    <section className="py-16 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP CONTENT */}
        <div className="text-center mb-14">
          <p className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
            Trusted By Industry Leaders
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
            Our Clients
          </h2>

          <div className="w-16 h-[3px] bg-[var(--primary)] mx-auto mt-4 rounded-full" />

          <p className="mt-5 max-w-2xl mx-auto text-[var(--text-secondary)] leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            officiis expedita laborum consequatur.
          </p>
        </div>

        {/* LOGO SLIDER */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          speed={1000}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {clients.map((logo, index) => (
            <SwiperSlide key={index}>
              <div
                className="
    h-[120px] w-full rounded-2xl border
    border-[var(--border)] bg-[var(--card)]
    p-4 flex items-center
    justify-center transition-all
    duration-300
    hover:shadow-[var(--shadow-primary)]
  "
              >
                <div className="relative w-[200px] h-[100px]">
                  <Image
                    src={logo}
                    alt="client"
                    fill
                    className="
        object-contain
        grayscale
        hover:grayscale-0
        transition-all
        duration-300
      "
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
