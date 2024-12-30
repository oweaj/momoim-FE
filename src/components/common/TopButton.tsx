"use client";

import { useState, useEffect } from "react";
import { ArrowUpToLine } from "lucide-react";

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`group fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(90,37,233,0.5)] drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpToLine className="text-white" />
    </button>
  );
}
