"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import PopupForm from "./Popup";

export default function ProductCarousel() {
  const [selectedCatalogue, setSelectedCatalogue] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const products = [
    {
      id: 1,
      title: "Pipe Extrusion Lines",
      image: "/product.jpg",
      description:
        "High-performance industrial extrusion solutions designed for reliability, efficiency and long-term productivity.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 2,
      title: "Profile Extrusion",
      image: "/product.jpg",
      description:
        "High-performance industrial extrusion solutions designed for reliability, efficiency and long-term productivity.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 3,
      title: "Recycling Machines",
      image: "/product.jpg",
      description:
        "High-performance industrial extrusion solutions designed for reliability, efficiency and long-term productivity.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 4,
      title: "Sheet & Board Lines",
      image: "/product.jpg",
      description:
        "High-performance industrial extrusion solutions designed for reliability, efficiency and long-term productivity.",
      catalogue: "/catalogue.pdf",
    },
  ];

  const handleDownload = (catalogue: string) => {
    const access = localStorage.getItem("catalogue_access");

    if (access) {
      window.open(catalogue, "_blank");
      return;
    }

    setSelectedCatalogue(catalogue);
    setOpenForm(true);
  };

  const handleFormSuccess = () => {
    window.open(selectedCatalogue, "_blank");
  };

  return (
    <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.2}
        spaceBetween={20}
        loop
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group relative h-[380px] overflow-hidden rounded-3xl border border-[var(--border)]">
              {/* Image */}
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />

              {/* Mobile Content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:hidden">
                <h3 className="text-lg font-bold text-white">
                  {product.title}
                </h3>

                <div className="mt-3 flex gap-2">
                  <button
                    className="
                      flex-1
                      rounded-xl
                      border
                      border-white/30
                      bg-white/10
                      py-2.5
                      text-sm
                      font-medium
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    View More
                  </button>

                  <button
                    onClick={() => handleDownload(product.catalogue)}
                    className="
                      flex-1
                      rounded-xl
                      bg-[var(--primary)]
                      py-2.5
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    Catalogue
                  </button>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="absolute bottom-0 left-0 right-0 z-10 hidden p-6 md:block">
                <h3 className="text-2xl font-bold text-white">
                  {product.title}
                </h3>
              </div>

              {/* Desktop Hover Overlay */}
              <div
                className="
                  absolute inset-0
                  hidden md:flex
                  flex-col items-center justify-center
                  bg-black/70
                  backdrop-blur-md
                  p-6
                  text-center

                  -translate-y-full
                  group-hover:translate-y-0

                  transition-transform
                  duration-500
                  ease-out
                "
              >
                <h3 className="text-2xl font-bold text-white">
                  {product.title}
                </h3>

                <p className="mt-4 max-w-xs text-white/80">
                  {product.description}
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    className="
                      rounded-xl
                      border
                      border-white/30
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-white
                      hover:text-black
                    "
                  >
                    View More
                  </button>

                  <button
                    onClick={() => handleDownload(product.catalogue)}
                    className="
                      rounded-xl
                      bg-[var(--primary)]
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:scale-105
                    "
                  >
                    Catalogue
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <PopupForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
