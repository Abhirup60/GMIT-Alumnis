import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2a5e] text-white pt-16 pb-6 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo and intro */}
          <div className="space-y-4">
            {/* College Logo */}
            <img
              src="https://gmitkolkata.org/wp-content/uploads/2024/04/gmit-logo-e1713306262413.png"
              alt="GMIT Logo"
              className="w-24 h-auto mb-4" // Adjust size as needed
            />
            <h3 className="text-xl font-bold text-[#f36f21]">GMIT Alumni Association</h3>
            <p className="text-gray-300 text-sm max-w-xs">
              Connecting graduates from Gargi Memorial Institute of Technology to build a global network of innovation and excellence.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/gmitcollege"
                className="text-gray-300 hover:text-[#f36f21] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/gmitkolkata/"
                className="text-gray-300 hover:text-[#f36f21] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@gmitkolkata9593?si=DC3-eW_DQ7QnsFI6"
                className="text-gray-300 hover:text-[#f36f21] transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/gargi-memorial-institute-of-technology-gmit/"
                className="text-gray-300 hover:text-[#f36f21] transition-colors"
                aria-label="Linkedin"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#f36f21] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Events", "Gallery", "Register"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#f36f21] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-[#f36f21] mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", url: "https://gmitkolkata.org/privacy-policy/" },
                { name: "Contact Support", url: "https://gmitkolkata.org/contact-us/" }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    className="text-gray-300 hover:text-[#f36f21] transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#f36f21] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-300 mr-2 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Balarampur, Mouza Beralia, Baruipur, Kolkata - 700144
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-300 mr-2" />
                <a
                  href="tel:+918336942309"
                  className="text-gray-300 hover:text-[#f36f21] transition-colors text-sm"
                >
                  +91 83369 42309
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-300 mr-2" />
                <a
                  href="mailto:alumni@gmit.edu.in"
                  className="text-gray-300 hover:text-[#f36f21] transition-colors text-sm"
                >
                  marketing_gmit@jisgroup.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} GMIT Alumni Association. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              to="/admin"
              className="text-gray-300 hover:text-[#f36f21] transition-colors text-sm"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;