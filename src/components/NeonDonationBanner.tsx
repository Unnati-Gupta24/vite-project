import React, { useState, useEffect } from "react";

const NeonDonationBanner = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [glowing, setGlowing] = useState(false);

  const motivationalQuotes = [
    "Your donation today creates a better tomorrow",
    "Be the light in someone's darkness",
    "Small acts of kindness, multiplied by many, equal big change",
    "Together we can make a difference",
    "Your generosity powers our mission",
  ];

  // Change quote every 5 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 5000);

    // Glow effect interval
    const glowInterval = setInterval(() => {
      setGlowing((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden relative py-6 px-4 bg-black rounded-lg mb-12">
      {/* Neon border effect */}
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-1000 ${
          glowing ? "opacity-100" : "opacity-50"
        }`}
        style={{
          boxShadow: "inset 0 0 10px #0ff, inset 0 0 20px #0ff, 0 0 10px #0ff",
          border: "2px solid #0ff",
        }}
      ></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated heading */}
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-4 text-center"
          style={{
            textShadow: glowing
              ? "0 0 5px #f0f, 0 0 10px #f0f, 0 0 15px #f0f"
              : "0 0 5px #0ff, 0 0 10px #0ff",
          }}
        >
          DONATE TODAY
        </h2>

        {/* Animated quote */}
        <div className="h-16 flex items-center justify-center">
          <p
            className="text-center text-lg transition-all duration-500 animate-fade-in text-white"
            style={{
              textShadow: "0 0 5px #0ff, 0 0 10px #0ff",
              animation: "fadeIn 0.5s ease-in",
            }}
          >
            {motivationalQuotes[quoteIndex]}
          </p>
        </div>

        {/* Donate button */}
        <button
          className="mt-4 px-8 py-2 bg-transparent rounded-full transition-all duration-300 transform hover:scale-105"
          style={{
            border: "2px solid #f0f",
            boxShadow: "0 0 10px #f0f, 0 0 5px #f0f inset",
            textShadow: "0 0 5px #f0f",
            color: "#fff",
          }}
        >
          SUPPORT US
        </button>
      </div>

      {/* Decorative neon lines */}
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
      <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"></div>
    </div>
  );
};

export default NeonDonationBanner;
