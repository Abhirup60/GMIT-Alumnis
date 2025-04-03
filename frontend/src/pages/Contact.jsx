import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#1a2a5e] mb-6">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-8">
          Have questions? Fill out the form below and we’ll get back to you soon!
        </p>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f36f21] focus:border-transparent"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f36f21] focus:border-transparent"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Enter your message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f36f21] focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1a2a5e] text-white font-semibold py-3 rounded-lg hover:bg-[#0e1a3a] transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-700">📍 Kolkata, India</p>
          <p className="text-gray-700">📧 alumni@gmit.edu.in</p>
          <p className="text-gray-700">📞 +91 83369 42309</p>
        </div>

        {/* Google Map Embed */}
        <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3545.2379709957877!2d88.43836657529476!3d22.378033479630844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026d0097533aed%3A0xe18407a46f2e97f6!2sGargi%20Memorial%20Institute%20of%20Technology!5e1!3m2!1sen!2sin!4v1742119218386!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GMIT Location"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;