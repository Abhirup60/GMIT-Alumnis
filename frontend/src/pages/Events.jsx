import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = [
    {
      title: "Annual Alumni Meet 2024",
      date: "August 15, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "GMIT Main Campus, Balarampur",
      description:
        "Join us for our flagship annual event where alumni from all batches come together to reconnect, network, and celebrate the GMIT legacy.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Tech Symposium 2024",
      date: "September 10, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "GMIT Auditorium",
      description:
        "A day-long symposium featuring talks from GMIT alumni who have made significant contributions to the technology industry.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Career Mentorship Workshop",
      date: "October 5, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "Virtual (Zoom)",
      description:
        "An interactive online workshop where experienced alumni mentor recent graduates on career planning and professional development.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const pastEvents = [
    {
      title: "Hackathon 2023",
      date: "December 10, 2023",
      time: "9:00 AM - 6:00 PM",
      location: "GMIT Innovation Lab",
      description:
        "A 24-hour hackathon where students and alumni collaborated to create innovative solutions for real-world problems.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#003366]">
          Alumni <span className="text-[#f36f21]">Events</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          Stay connected with your alma mater through our diverse range of events.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-6"
      >
        <button
          className={`px-6 py-2 text-lg font-medium rounded-lg transition-all duration-300 ${
            activeTab === "upcoming"
              ? "bg-[#003366] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`px-6 py-2 text-lg font-medium rounded-lg ml-4 transition-all duration-300 ${
            activeTab === "past"
              ? "bg-[#003366] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past Events
        </button>
      </motion.div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <AnimatePresence>
          {(activeTab === "upcoming" ? upcomingEvents : pastEvents).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4 text-[#003366]">{event.title}</h3>
              <p className="text-gray-600 mt-1">📅 {event.date} | ⏰ {event.time}</p>
              <p className="text-gray-600 mt-1">📍 {event.location}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>
              <button className="mt-4 bg-[#f36f21] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e65c1a] transition-all duration-300">
                Register Now
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Suggest an Event Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 bg-white shadow-lg rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-[#003366]">Have an event idea?</h3>
        <p className="text-gray-600 mt-2">
          We're always looking for fresh ideas to bring our alumni community together.
        </p>
        <button className="mt-4 bg-[#f36f21] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#e65c1a] transition-all duration-300">
          Submit Event Proposal
        </button>
      </motion.div>
    </div>
  );
};

export default Events;