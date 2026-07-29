"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import PopupForm from "./Popup";
import Link from "next/link";

export default function ProductCarousel() {
  const [selectedCatalogue, setSelectedCatalogue] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const products = [
    {
      id: 1,
      title: "Co-Rotating Twin Screw Extruder",
      image:
        "/products/co-rotating twing screw extruder/corotating-twin-screw-extruder-for-compounding-recycling-engineering-plastic/corotating-twin-screw-extruder-for-compounding-recycling2.jpg",
      link: "/co-rotating-twin-screw-extruder",
      description:
        "High-performance co-rotating twin screw extrusion system designed for efficient plastic compounding, recycling, mixing, and consistent material processing.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 2,
      title: "Corotating Twin Screw Extruder for Compounding & Recycling",
      image: "/products/co-rotating-twin-screw-extruder.png",
      link: "/corotating-twin-screw-extruder-for-compounding-&-recycling",
      description:
        "High-performance twin screw extrusion system developed for plastic compounding and recycling applications, ensuring superior mixing, consistent output, and excellent material dispersion.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 3,
      title:
        "Corotating Triple Screw Extruder for Compounding & Recycling (Engineering Plastic)",
      image:
        "/products/corotating-triple-screw-extruder-for-compounding-recycling.jpg",
      link: "/corotating-triple-screw-extruder-for-compounding-&-recycling",
      description:
        "Innovative triple screw extrusion technology designed for engineering plastics, offering outstanding mixing efficiency, superior dispersion, and high-quality compound production.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 4,
      title: "Soft Cable Grade PVC Compounding Plant",
      image:
        "/products/corotating-twin-screw-extruder-for-compounding-recycling.jpg",
      link: "/soft-cable-grade-pvc-compounding-plant",
      description:
        "Specialized PVC compounding plant engineered for producing soft cable-grade PVC compounds with uniform mixing, consistent quality, and reliable production performance.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 5,
      title: "Vented Recycling Plant",
      image: "/products/vented.png",
      link: "/vented-recycling-plant",
      description:
        "Efficient plastic recycling system designed for processing plastic waste into high-quality reusable granules with effective moisture removal, degassing, and stable output.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 6,
      title: "Two Stage Recycling Plant",
      image: "/products/two-stage.png",
      link: "/two-stage-recycling-plant",
      description:
        "Advanced two-stage recycling plant designed for efficient processing of plastic waste, providing improved filtration, stable extrusion, and high-quality recycled granules.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 7,
      title: "Recycling Plant With Compactor",
      image: "/products/recycling-plant-with-compacter.png",
      link: "/recycling-plant-with-compactor",
      description:
        "Integrated plastic recycling plant featuring an advanced compactor system for better material feeding, uniform melting, and enhanced recycling productivity.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 8,
      title: "Conical Twin Screw Extruder for PVC and UPVC Pipe",
      image: "/products/conical-twin-screw-extruder.jpg",
      link: "/twin-screw-extruder",
      description:
        "Advanced conical twin screw extrusion machine designed for PVC and UPVC pipe production, delivering excellent plasticizing, stable output, and consistent product quality.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 9,
      title: "PVC Conduit Pipe Plant",
      image: "/product.jpg",
      link: "/pvc-conduit-pipe-plant",
      description:
        "Reliable PVC conduit pipe extrusion plant engineered for producing high-quality electrical conduit pipes with consistent dimensions, smooth finish, and efficient production.",
      catalogue: "/catalogue.pdf",
    },
    {
      id: 10,
      title: "PVC Conduit Pipe Plant (Dual Pipes)",
      image: "/products/PVC-CONDUIT-PIPE-PLANT-two-PIPES-1.jpg",
      link: "/pvc-conduit-pipe-plant-two-pipes",
      description:
        "High-speed dual pipe extrusion plant engineered for manufacturing premium-quality PVC conduit pipes with excellent dimensional accuracy, smooth surface finish, and higher production efficiency.",
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
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
        {/* LEFT SIDE */}
        <div className="max-w-3xl">
          <h2 className="text-[var(--primary)] font-semibold uppercase tracking-[2px] text-sm">
            Our Products
          </h2>

          <span className="mt-3 text-3xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight">
            Complete plastic extrusion solutions for pipes, profiles, recycling,
            compounding, and custom industrial applications.
          </span>

          <p className="mt-5 text-[15px] md:text-[17px] leading-8 text-[var(--text-secondary)] max-w-3xl">
            We manufacture a comprehensive range of plastic extrusion machines
            designed to deliver precision, efficiency, and consistent production
            across multiple industrial applications.
          </p>
        </div>
      </div>
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
              {/* Mobile Content */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:hidden">
                <h3 className="mb-3 text-lg font-bold text-white">
                  {product.title}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={product.link}
                    className="
        flex
        h-12
        items-center
        justify-center
        rounded-xl
        border
        border-white/20
        bg-black/30
        text-center
        text-sm
        font-semibold
        text-white
        backdrop-blur-md
        transition-all
        hover:bg-white
        hover:text-black
      "
                  >
                    View More
                  </Link>

                  <button
                    onClick={() => handleDownload(product.catalogue)}
                    className="
        flex
        h-12
        items-center
        justify-center
        rounded-xl
        bg-[var(--primary)]
        text-center
        text-sm
        font-semibold
        text-white
        transition-all
        hover:opacity-90
      "
                  >
                    Catalogue
                  </button>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="absolute bottom-0 left-0 right-0 hidden p-6 md:block">
                <h3 className="text-lg font-semibold text-white">
                  {product.title}
                </h3>
              </div>

              {/* Desktop Hover Overlay */}
              <div
                className="
                  absolute inset-0 z-10
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

                <div className="mt-8 flex items-center justify-center gap-3">
                  <Link
                    href={product.link}
                    className="
      inline-flex
      items-center
      justify-center
      rounded-xl
      border
      border-white/30
      bg-white/10
      px-6
      py-3
      text-sm
      font-semibold
      text-white
      backdrop-blur-sm
      transition-all
      hover:bg-white
      hover:text-black
    "
                  >
                    View More
                  </Link>

                  <button
                    onClick={() => handleDownload(product.catalogue)}
                    className="
      inline-flex
      items-center
      justify-center
      rounded-xl
      bg-[var(--primary)]
      px-6
      py-3
      text-sm
      font-semibold
      text-white
      transition-all
      hover:scale-105
      hover:opacity-90
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
