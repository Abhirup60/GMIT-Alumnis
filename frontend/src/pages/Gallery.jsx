import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Define the gallery categories and images
const galleryData = {
  all: [
    { id: 1, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94", alt: "Annual Alumni Meet 2023", category: "events" },
    { id: 2, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", alt: "Tech Symposium", category: "events" },
    { id: 3, src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a", alt: "Alumni Networking", category: "networking" },
    { id: 4, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2", alt: "Entrepreneurship Summit", category: "events" },
    { id: 5, src: "https://images.unsplash.com/photo-1511578314322-379afb476865", alt: "Homecoming Weekend", category: "events" },
    { id: 6, src: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca", alt: "Alumni Award Ceremony", category: "awards" },
    { id: 7, src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", alt: "Sports Tournament", category: "sports" },
    { id: 8, src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86", alt: "Cultural Program", category: "cultural" },
    { id: 9, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1", alt: "Volunteer Day", category: "community" },
    { id: 10, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678", alt: "Campus Tour", category: "campus" },
    { id: 11, src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", alt: "Graduation Ceremony", category: "campus" },
    { id: 12, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952", alt: "Business Meet", category: "networking" },
  ],
  events: [
    { id: 1, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94", alt: "Annual Alumni Meet 2023", category: "events" },
    { id: 2, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", alt: "Tech Symposium", category: "events" },
    { id: 4, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2", alt: "Entrepreneurship Summit", category: "events" },
    { id: 5, src: "https://images.unsplash.com/photo-1511578314322-379afb476865", alt: "Homecoming Weekend", category: "events" },
  ],
  campus: [
    { id: 10, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678", alt: "Campus Tour", category: "campus" },
    { id: 11, src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", alt: "Graduation Ceremony", category: "campus" },
  ],
  networking: [
    { id: 3, src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a", alt: "Alumni Networking", category: "networking" },
    { id: 12, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952", alt: "Business Meet", category: "networking" },
  ],
  sports: [
    { id: 7, src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", alt: "Sports Tournament", category: "sports" },
  ],
  cultural: [
    { id: 8, src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86", alt: "Cultural Program", category: "cultural" },
  ],
  community: [
    { id: 9, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1", alt: "Volunteer Day", category: "community" },
  ],
  awards: [
    { id: 6, src: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca", alt: "Alumni Award Ceremony", category: "awards" },
  ],
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const categories = [
    { id: "all", label: "All" },
    { id: "events", label: "Events" },
    { id: "campus", label: "Campus" },
    { id: "networking", label: "Networking" },
    { id: "sports", label: "Sports" },
    { id: "cultural", label: "Cultural" },
    { id: "community", label: "Community" },
    { id: "awards", label: "Awards" },
  ];

  const handleImageClick = (src, alt, index) => {
    setSelectedImage({ src, alt });
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const images = galleryData[activeCategory];
    if (!images || images.length === 0) return;
    
    let newIndex = currentImageIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % images.length;
    } else {
      newIndex = (currentImageIndex - 1 + images.length) % images.length;
    }
    
    const newImage = images[newIndex];
    setCurrentImageIndex(newIndex);
    setSelectedImage({ 
      src: `${newImage.src}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`, 
      alt: newImage.alt 
    });
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      navigateImage('next');
    } else if (touchEnd - touchStart > 50) {
      // Swipe right
      navigateImage('prev');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      
      <main className="flex-grow px-6 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#003366]">
              Photo <span className="text-[#f36f21]">Gallery</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore memories from our alumni events, campus activities, and community initiatives through the years.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#003366] text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryData[activeCategory]?.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="overflow-hidden rounded-lg shadow-sm aspect-square cursor-pointer group"
                onClick={() => handleImageClick(`${image.src}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`, image.alt, index)}
              >
                <div className="w-full h-full relative">
                  <img
                    src={`${image.src}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <div 
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={closeModal}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
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
                    src={selectedImage.src}
                    alt={selectedImage.alt}
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
                      navigateImage('prev');
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  
                  <p className="text-white text-center mt-4 text-lg">{selectedImage.alt}</p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Gallery;