import React from "react";
import { motion } from "framer-motion";

const PlacementPartners = () => {
  const partnerLogos = [
    // { src: "https://gmitkolkata.org/wp-content/uploads/2024/04/copper.png", alt: "Copper Technologies" },
    // { src: "https://gmitkolkata.org/wp-content/uploads/2024/04/rivigo.png", alt: "Rivigo" },
    { src: "	https://gmitkolkata.org/wp-content/uploads/2024/04/8-3.png", alt: "Indian Oil" },
    { src: "https://gmitkolkata.org/wp-content/uploads/2024/04/6-3.png", alt: "Hind Rectifiers Ltd." },
    // { src: "https://gmitkolkata.org/wp-content/uploads/2024/04/captain.png", alt: "Captain" },
    { src: "https://gmitkolkata.org/wp-content/uploads/2024/04/tcs.png", alt: "TCS" },
    { src: "	https://gmitkolkata.org/wp-content/uploads/2024/04/7-3.png", alt: "PS Group" },
    { src: "dalmia.jpg", alt: "Dalmia Bharat" },
    { src: "runtime.jfif", alt: "Runtime solution" },
    { src: "captaintmt.jpeg", alt: "Captain TMT" },
    { src: "atnt.png", alt: "AT&T" },
    { src: "flipkart.png", alt: "Flipkart" },
    { src: "amazon.webp", alt: "Amazon" },
    // { src: "https://gmitkolkata.org/wp-content/uploads/2024/04/jmc.png", alt: "JMC Projects" },
    { src: "/bassetti.jfif", alt: "EY" },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white text-center">
      <h2 className="text-3xl font-bold text-[#003366]">
        Our Placement <span className="text-orange-500">Partners</span>
      </h2>
      <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
        Connecting talent with opportunity, our placement partners pave the way for bright futures, making us one of the best
        engineering colleges in South 24 Parganas.
      </p>

      {/* Auto Scrolling Logos */}
      <div className="overflow-hidden mt-6">
        <motion.div
          className="flex space-x-10 items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {/* Duplicating Logos for Seamless Scrolling */}
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className="h-16 sm:h-20 object-contain" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlacementPartners;
