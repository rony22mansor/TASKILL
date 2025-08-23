import React, { useState, useEffect } from "react";

// 1. Import your SVGs from the assets folder
import illustration1 from "@/assets/illustration-1.svg";
import illustration2 from "@/assets/illustration-2.svg";
import illustration3 from "@/assets/illustration-3.svg";

// 2. Update the slides array to include text and the imported images
const slides = [
  {
    src: illustration1,
    headline: "Reclaim Your Time. Let AI Handle the Logistics.",
    body: "Stop spending hours manually distributing work. Our platform automates the entire assignment process.",
  },
  {
    src: illustration2,
    headline: "The Perfect Match for Every Task.",
    body: "The platform intelligently matches tasks to team members based on their unique skills, experience, and past performance.",
  },
  {
    src: illustration3,
    headline: "Your Team's Skills, All in One Place.",
    body: "Easily manage detailed profiles for every team member. This rich data fuels our AI to make smarter, more accurate assignments.",
  },
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
    const slideInterval = setInterval(nextSlide, 3000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Clean up the interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full p-8 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* SVG Image */}
          <img
            src={slide.src}
            alt={slide.headline}
            className="w-full h-auto max-w-sm mb-8"
          />

          {/* Text Content */}
          <div className="">
            <h2 className=" text-foreground text-3xl font-bold mb-2">
              {slide.headline}
            </h2>
            <p className="text-lg  text-foreground max-w-md mx-auto">
              {slide.body}
            </p>
          </div>
        </div>
      ))}

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer h-2  rounded-full transition-all duration-300 ${
              currentIndex === slideIndex
                ? "w-6 bg-primary shadow-md"
                : "w-3 bg-primary/30 shadow-md"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
