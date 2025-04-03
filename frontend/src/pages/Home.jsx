import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PlacementPartners from "./PlacementPartners";
import { Link } from "react-router-dom";

const Home = () => {
  const heroSectionRef = useRef(null);
  const alumniSectionRef = useRef(null);
  const approvalsSectionRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    try {
      // Hero Section Animations
      if (heroSectionRef.current) {
        gsap.fromTo(
          heroSectionRef.current.querySelector("h1"),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
        gsap.fromTo(
          heroSectionRef.current.querySelector("p"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.7 }
        );
        gsap.fromTo(
          heroSectionRef.current.querySelectorAll("button"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.9, stagger: 0.2 }
        );
      }

      // Alumni Section Animations
      if (alumniSectionRef.current) {
        const alumniObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.fromTo(
                  entry.target.querySelectorAll(".alumni-card"),
                  { opacity: 0, y: 50 },
                  { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
                );
                alumniObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        alumniObserver.observe(alumniSectionRef.current);
      }

      // Approvals Section Animations
      if (approvalsSectionRef.current) {
        const approvalsObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.fromTo(
                  entry.target.querySelectorAll(".approval-logo"),
                  { opacity: 0, scale: 0.8 },
                  { opacity: 1, scale: 1, duration: 1, stagger: 0.3 }
                );
                approvalsObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        approvalsObserver.observe(approvalsSectionRef.current);
      }
    } catch (error) {
      console.error("GSAP Animation Error:", error);
    }
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="relative bg-cover bg-center text-center py-32 px-4 md:px-8"
        style={{
          backgroundImage: "url('https://gmitkolkata.org/wp-content/uploads/2024/04/gmit-banner.jpg')",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-3xl text-[#f36f21] animate-fade-in font-bold">
            Gargi Memorial Institute of Technology
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Connect, Collaborate, <span className="text-[#f36f21]">Grow Together</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-200">
            Join the exclusive alumni network of GMIT. Connect with fellow
            graduates, access premium events, and unlock career opportunities.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <button className="bg-[#1a2a5e] text-white px-6 py-3 rounded-lg hover:bg-[#0e1a3a] transition">
                Register Now
              </button>
            </Link>
            <Link to={"https://gmitkolkata.org/"}><button className="bg-[#f36f21] text-white px-6 py-3 rounded-lg hover:bg-[#e65a1a] transition">
              Learn More
            </button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Alumni Placement Section */}
      <section
        ref={alumniSectionRef}
        className="py-16 px-4 md:px-8 bg-gray-100"
        id="alumni_testimonial"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#003366]">
            Our <span className="text-[#f36f21]">Alumni</span>, Our <span className="text-[#f36f21]">Pride</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
            Wherever our students go, they carry the rich legacy and heritage of
            GMIT inside them.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {alumniData.map((alumnus, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md alumni-card hover:shadow-lg
               transition-shadow"
            >
              <img
                src={alumnus.image}
                alt={alumnus.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <h5 className="text-lg font-semibold mt-4 text-center text-[#1a2a5e]">
                {alumnus.name}
              </h5>
              <p className="text-sm text-gray-500 text-center">
                {alumnus.batch}
              </p>
              <p className="text-[#f36f21] font-semibold text-center mt-2">
                {alumnus.company}
              </p>
              <p className="text-gray-600 text-sm mt-2 text-center">
                {alumnus.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Placement Partners Section */}
      <PlacementPartners />

      {/* Approvals Section */}
      <section
        ref={approvalsSectionRef}
        className="py-16 px-4 md:px-8 bg-gray-100"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#003366]">
            Our <span className="text-[#f36f21] ">Approvals</span>
          </h2>
          <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
            Recognized by leading organizations in education and industry.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: "https://gmitkolkata.org/wp-content/uploads/2024/04/approvals_logo-1.png",
                alt: "NIRF",
                link: "https://gmitkolkata.org/wp-content/uploads/2025/02/NIRF-2025-GMIT.pdf",
              },
              {
                src: "https://gmitkolkata.org/wp-content/uploads/2024/04/approvals_logo-2.png",
                alt: "AICTE",
                link: "https://gmitkolkata.org/wp-content/uploads/2024/06/EOA-OF-AICTE-2024-25-to-2026-27.pdf",
              },
              {
                src: "https://gmitkolkata.org/wp-content/uploads/2024/04/approvals_logo-7.png",
                alt: "Utech",
                link: "https://gmitkolkata.org/wp-content/uploads/2024/11/281-B.TECH_.pdf",
              },
            ].map((logo, index) => (
              <a
                key={index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-2xl flex justify-center items-center shadow-md approval-logo hover:shadow-lg transition-shadow"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-24 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#f36f21] text-white p-3 rounded-full shadow-lg 
          hover:bg-[#e65a1a] transition-transform transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

const alumniData = [
  {
    name: "Anupam Banerjee",
    batch: "Computer Sc. & Engg - 2017",
    company: "TCS",
    image: "https://gmitkolkata.org/wp-content/uploads/2024/04/alumni_2-1.jpg",
    description: "India's top IT Services, Consulting and Business Solutions Company with Global presence."
  },
  {
    name: "Gourav Saha",
    batch: "Computer Sc. & Engg - 2019",
    company: "TCS",
    image: "https://gmitkolkata.org/wp-content/uploads/2024/04/GOURAV-SAHA-2019-TCS.jpg",
    description: "India's top IT Services, Consulting and Business Solutions Company with Global presence."
  },
  {
    name: "Sourav Ghoshal",
    batch: "Computer Sc. & Engg - 2015",
    company: "Wipro",
    image: "https://gmitkolkata.org/wp-content/uploads/2024/04/SOURAV-GHOSAL-2015-WIPRO.jpg",
    description: "India's Big name in IT Services world over."
  },
  {
    name: "Amrendra Sahni",
    batch: "Electronics & Comm. Engg - 2018",
    company: "Unilever",
    image: "https://gmitkolkata.org/wp-content/uploads/2024/04/AMRENDRA-SAHNI-2018-HINDUSTAN-UNILEVER-LTD.jpg",
    description: "India's top FMCG Company, a part of MNC Lever Brothers."
  },
  {
    name: "Kazi Abdul Sahid",
    batch: "Mechanical Engg. - 2017",
    company: "Indian Railways",
    image: "https://gmitkolkata.org/wp-content/uploads/2024/04/KAZI-ABDUL-SAHID-2017-Indian-Railway.jpg",
    description: "Indian Railways, nation's Biggest mass transit provider."
  },
  {
    name: "Arindam Mondal",
    batch: "Mechanical Engg. - 2017",
    company: "Indian Railways",
    image: "https://gmitkolkata.org/wp-content/uploads/2024/04/ARINDAM-MONDAL-2017-Indian-Railway.jpg",
    description: "Indian Railways, nation's Biggest mass transit provider."
  }
];

export default Home;