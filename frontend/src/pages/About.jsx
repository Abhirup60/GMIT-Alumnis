import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState("recentPlacement");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false); // State for scroll button visibility

  const alumniImages = [
    "https://gmitkolkata.org/wp-content/uploads/2025/03/34.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/10-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/11.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/32.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/13.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/36.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/40.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/44.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/8-2.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/45.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/3-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/2-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/1-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2024/04/placement-1.jpg",
  ];

  const recruiterImages = [
    "https://gmitkolkata.org/wp-content/uploads/2024/04/22.png",
    "https://gmitkolkata.org/wp-content/uploads/2024/04/23.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/15-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/Untitled-design-2.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/18.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/19.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/20.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/17-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/9-2.png",
    "https://gmitkolkata.org/wp-content/uploads/2025/03/13-1.png",
    "https://gmitkolkata.org/wp-content/uploads/2024/04/9-2.png",
    "https://gmitkolkata.org/wp-content/uploads/2024/04/10-2.png",
    "https://gmitkolkata.org/wp-content/uploads/2024/04/11-2.png",
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show/hide scroll button based on scroll position
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

  // Existing functions and logic...

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 bg-cover bg-center p-16 rounded-lg relative"
          style={{ backgroundImage: "url(https://gmitkolkata.org/wp-content/uploads/2024/04/breadcrumb.png)" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About GMIT Alumni Association
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Building a community of successful graduates who are proud to be part of the GMIT legacy.
            </p>
          </div>
        </motion.div>

        {/* Placement Section */}
        <section className="placement py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tab Navigation */}
              <div className="bg-white shadow-lg p-6 rounded-lg">
                <ul className="space-y-4 text-lg font-semibold">
                  {[
                    { id: "recentPlacement", label: "Recent Placement" },
                    { id: "recruiters", label: "Our Recruiters" },
                    { id: "tpoDesk", label: "TPO's Desk" },
                    { id: "placementStatus", label: "Placement Status" },
                  ].map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex justify-between items-center py-3 px-6 rounded-lg transition-colors 
                          ${
                            activeTab === tab.id
                              ? "bg-[#1a2a5e] text-white shadow-lg"
                              : "bg-[#f36f21] text-white hover:bg-[#1a2a5e] hover:shadow-lg"
                          }`}
                      >
                        {tab.label} <span>→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tab Content */}
              <div className="md:col-span-2 bg-white shadow-lg p-6 rounded-lg">
                {activeTab === "recentPlacement" && (
                  <div className="each_placement_tab">
                    <h4 className="text-2xl font-bold text-[#1a2a5e] mb-6">Recent Placement</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {(showMore ? alumniImages : alumniImages.slice(0, 6)).map((img, index) => (
                        <motion.div
                          key={index}
                          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleImageClick(index)}
                        >
                          <img src={img} alt="placement" className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </div>
                    {!showMore && (
                      <button
                        onClick={() => setShowMore(true)}
                        className="mt-6 px-6 py-3 bg-[#f36f21] text-white rounded-lg hover:bg-[#1a2a5e] transition"
                      >
                        See More
                      </button>
                    )}
                  </div>
                )}

                {activeTab === "recruiters" && (
                  <div className="each_placement_tab">
                    <h4 className="text-2xl font-bold text-[#1a2a5e] mb-6">Our Recruiters</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {recruiterImages.map((img, index) => (
                        <motion.div
                          key={index}
                          className="relative border border-gray-300 p-2 rounded-lg hover:shadow-lg transition-shadow"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img src={img} alt="recruiter" className="w-[118px] h-[53px] object-contain mx-auto" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "tpoDesk" && (
                  <div className="each_placement_tab flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Text Content */}
                    <div className="md:w-2/3 text-left">
                      <h4 className="text-2xl font-bold text-[#1a2a5e] mb-6">TPO's Desk</h4>
                      <p className="mb-4 text-[#333333]">
                        GMIT is one of the fastest emerging engineering colleges of the country and has been engaging
                        with leaders as well as updating internally to cut through the employability challenges.
                      </p>
                      <p className="mb-4 text-[#333333]">
                        Keeping in mind the current recruitment trend of the industry, we have offered many placement
                        opportunities to our final year students with prestigious organizations.
                      </p>
                      <p className="text-[#333333]">
                        We cultivate an inclusive mindset amongst our students in terms of their employability. Our
                        best-in-class employability orientation program focuses on developing both their domain
                        competence and interpersonal skills.
                      </p>
                    </div>

                    {/* Image Container */}
                    <div className="md:w-1/3 flex justify-end">
                      <motion.img
                        className="w-full max-w-[250px] h-auto object-cover border border-gray-300 rounded-lg shadow-lg"
                        src="https://gmitkolkata.org/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-24-at-11.47.21-PM.jpeg"
                        alt="TPO's Desk"
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "placementStatus" && (
                  <div className="each_placement_tab">
                    <h4 className="text-2xl font-bold text-[#1a2a5e] mb-6">Placement Status</h4>
                    <ul className="recruiter_list">
                      <li>
                        <img
                          src="https://gmitkolkata.org/wp-content/uploads/2024/04/Untitled-1080-x-1300-px-1.png"
                          alt="Placement Status"
                        />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Enlarged Placement"
                  className="max-w-full max-h-[80vh] object-contain"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-[#f36f21] text-white p-3 rounded-full shadow-lg hover:bg-[#1a2a5e] transition-transform transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </main>
    </div>
  );
};

export default About;