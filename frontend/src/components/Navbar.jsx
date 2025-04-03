import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const location = useLocation();

  const toggleDropdown = (index) => {
    setDropdown(dropdown === index ? null : index);
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-[#f36f21]" : "text-white";
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#1a2a5e] shadow-md">
      {/* Logo Section */}
      <div className="text-2xl font-bold text-white flex gap-3">
        <Link to={"/"}>
          <img
            src="https://gmitkolkata.org/wp-content/uploads/2024/04/gmit-logo-e1713306262413.png"
            alt="GMIT Logo"
            style={{ height: "60px", width: "100%", borderRadius: "8px" }}
          />
        </Link>
        <Link to={"https://www.jisuniversity.ac.in/"}>
          <img
            src="https://gmitkolkata.org/wp-content/uploads/2024/04/jis-logo-e1713306293781.png"
            alt="JIS Logo"
            style={{ height: "60px", width: "100%", borderRadius: "8px" }}
          />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex flex-grow justify-center">
        <ul className="flex space-x-6">
          <li className="hover:text-[#f36f21] transition duration-300 font-bold text-xl">
            <Link to="/" className={`hover:text-[#f36f21] ${isActive("/")}`}>
              Home
            </Link>
          </li>
          <li className="hover:text-[#f36f21] transition duration-300 font-bold text-xl">
            <Link to="/about" className={`hover:text-[#f36f21] ${isActive("/about")}`}>
              About
            </Link>
          </li>
          <li className="hover:text-[#f36f21] transition duration-300 font-bold text-xl">
            <Link to="/events" className={`hover:text-[#f36f21] ${isActive("/events")}`}>
              Events
            </Link>
          </li>
          <li className="hover:text-[#f36f21] transition duration-300 font-bold text-xl">
            <Link to="/gallery" className={`hover:text-[#f36f21] ${isActive("/gallery")}`}>
              Gallery
            </Link>
          </li>
          <li className="hover:text-[#f36f21] transition duration-300 font-bold text-xl">
            <Link to="/job-board" className={`hover:text-[#f36f21] ${isActive("/job-board")}`}>
              Job Board
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Register Button */}
      <button className="hidden md:block bg-[#f36f21] text-white px-4 py-2 rounded-lg hover:bg-[#e65a1a] transition font-bold">
        <Link to="/register">Register</Link>
      </button>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={28} className="text-white" />
      </button>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-[#1a2a5e] text-white shadow-lg flex flex-col p-6 z-50">
          <button className="self-end mb-4" onClick={() => setIsOpen(false)}>
            <X size={28} className="text-white" />
          </button>
          <ul className="space-y-4">
            <li className="text-xl">
              <Link
                to="/"
                className={`${isActive("/")} hover:text-[#f97316] font-bold`}
                onClick={() => setIsOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li className="relative text-xl">
              <Link to={"/about"}>
                <button
                  className={`flex items-center justify-between w-full ${isActive("/about")} hover:text-[#f36f21] font-bold`}
                  onClick={() => toggleDropdown(1)}
                >
                  ABOUT
                </button>
              </Link>
            </li>
            <li className="text-xl">
              <Link
                to="/events"
                className={`${isActive("/events")} hover:text-[#f36f21] font-bold`}
                onClick={() => setIsOpen(false)}
              >
                EVENT
              </Link>
            </li>
            <li className="text-xl">
              <Link
                to="/gallery"
                className={`${isActive("/gallery")} hover:text-[#f36f21] font-bold`}
                onClick={() => setIsOpen(false)}
              >
                GALLERY
              </Link>
            </li>
            <li className="text-xl">
              <Link
                to="/job-board"
                className={`${isActive("/job-board")} hover:text-[#f36f21] font-bold`}
                onClick={() => setIsOpen(false)}
              >
                JOB BOARD
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block w-full text-center bg-[#f36f21] text-white px-4 py-2 rounded-lg hover:bg-[#e65a1a] transition font-bold text-xl"
                onClick={() => setIsOpen(false)}
              >
                REGISTER
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;