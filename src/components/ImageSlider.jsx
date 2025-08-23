// src/components/ImageSlider.js
import React, { useState, useEffect } from "react";

// --- You can use your own images here ---
const slides = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // --- Auto-play functionality ---
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Clean up the interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative h-full w-full group">
      {/* Container for the fading images */}
      <div className="w-full h-full rounded-2xl bg-center bg-cover">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer h-3 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? "w-6 bg-white" : "w-3 bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
